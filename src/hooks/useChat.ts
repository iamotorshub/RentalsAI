import { useState, useCallback, useRef } from "react";
import { sendMessage, type ChatMessage } from "../lib/api";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isLatest: boolean;
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const historyRef = useRef<ChatMessage[]>([]);

  const send = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;

    setError(null);

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      content: text.trim(),
      timestamp: new Date(),
      isLatest: false,
    };

    setMessages((prev) => [...prev.map((m) => ({ ...m, isLatest: false })), userMsg]);
    setIsLoading(true);

    try {
      const { reply, history } = await sendMessage(text.trim(), historyRef.current);
      historyRef.current = history;

      const assistantMsg: Message = {
        id: `a-${Date.now()}`,
        role: "assistant",
        content: reply,
        timestamp: new Date(),
        isLatest: true,
      };

      setMessages((prev) => [...prev.map((m) => ({ ...m, isLatest: false })), assistantMsg]);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error de conexión";
      setError(msg);

      const errorMsg: Message = {
        id: `e-${Date.now()}`,
        role: "assistant",
        content:
          "Lo siento, tuve un inconveniente técnico. Por favor intentá nuevamente en unos segundos. 🙏",
        timestamp: new Date(),
        isLatest: true,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  const reset = useCallback(() => {
    setMessages([]);
    historyRef.current = [];
    setError(null);
    setIsLoading(false);
  }, []);

  return { messages, isLoading, error, send, reset };
}
