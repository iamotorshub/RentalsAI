/**
 * server/claude.ts
 * AI provider: OpenRouter → DeepSeek (OpenAI-compatible API)
 * Conversation logging: Supabase
 */
import OpenAI from "openai";
import { TIANI_SYSTEM_PROMPT } from "./tiani-prompt.js";
import { logConversation } from "./supabase.js";

const openrouter = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY || "",
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": "https://vitalbahia.motorshub.ar",
    "X-Title": "Tiani — Centro Médico VitalBahía",
  },
});

// DeepSeek via OpenRouter — great at Spanish, very cost-efficient
const MODEL = process.env.AI_MODEL || "deepseek/deepseek-chat";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function tianiChat(
  message: string,
  history: ChatMessage[],
  sessionId?: string
): Promise<{ reply: string; error?: string }> {
  try {
    const messages: OpenAI.ChatCompletionMessageParam[] = [
      // System prompt as first message (OpenRouter/DeepSeek style)
      { role: "system", content: TIANI_SYSTEM_PROMPT },
      // Conversation history
      ...history.map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
      // Current user message
      { role: "user", content: message },
    ];

    const completion = await openrouter.chat.completions.create({
      model: MODEL,
      messages,
      max_tokens: 1024,
      temperature: 0.7,
    });

    const reply = completion.choices[0]?.message?.content ?? "";

    // Log to Supabase — non-blocking, fails silently if not configured
    logConversation({
      sessionId,
      userMessage: message,
      assistantReply: reply,
      model: MODEL,
    }).catch(() => {});

    return { reply };
  } catch (err) {
    console.error("Error OpenRouter API:", err);
    return {
      reply: "",
      error: err instanceof Error ? err.message : "Error desconocido",
    };
  }
}
