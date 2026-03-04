export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatResponse {
  reply: string;
  history: ChatMessage[];
}

export async function sendMessage(
  message: string,
  history: ChatMessage[]
): Promise<ChatResponse> {
  const res = await fetch("/api/medical/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, history }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({})) as { error?: string };
    throw new Error(errorData.error || `HTTP ${res.status}`);
  }

  return res.json() as Promise<ChatResponse>;
}
