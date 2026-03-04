import type { Express, Request, Response } from "express";
import { tianiChat, type ChatMessage } from "./claude.js";

export function registerRoutes(app: Express): void {
  app.post("/api/medical/chat", async (req: Request, res: Response) => {
    const {
      message,
      history = [],
      sessionId,
    } = req.body as {
      message: string;
      history: ChatMessage[];
      sessionId?: string;
    };

    if (!message || typeof message !== "string") {
      res.status(400).json({ error: "El campo 'message' es requerido." });
      return;
    }

    const { reply, error } = await tianiChat(message, history, sessionId);

    if (error) {
      res.status(500).json({ error });
      return;
    }

    const updatedHistory: ChatMessage[] = [
      ...history,
      { role: "user", content: message },
      { role: "assistant", content: reply },
    ];

    res.json({ reply, history: updatedHistory });
  });

  app.get("/api/health", (_req: Request, res: Response) => {
    res.json({
      status: "ok",
      agent: "Tiani",
      center: "Centro Médico VitalBahía",
      provider: "OpenRouter / DeepSeek",
    });
  });
}
