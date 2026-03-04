/**
 * server/supabase.ts
 * Supabase client + conversation logging
 *
 * SQL para crear la tabla (ejecutar en Supabase SQL Editor):
 * ──────────────────────────────────────────────────────────
 * create table if not exists conversations (
 *   id          uuid primary key default gen_random_uuid(),
 *   session_id  text,
 *   user_msg    text not null,
 *   tiani_reply text not null,
 *   model       text default 'deepseek/deepseek-chat',
 *   center      text default 'VitalBahía',
 *   created_at  timestamptz default now()
 * );
 * -- Enable Row Level Security (optional but recommended)
 * alter table conversations enable row level security;
 * ──────────────────────────────────────────────────────────
 */
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL || "";
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || "";

// Only initialise if credentials are present
const supabase =
  SUPABASE_URL && SUPABASE_SERVICE_KEY
    ? createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)
    : null;

interface LogPayload {
  sessionId?: string;
  userMessage: string;
  assistantReply: string;
  model: string;
}

/**
 * Logs a conversation turn to Supabase.
 * Silently no-ops when Supabase is not configured.
 */
export async function logConversation(payload: LogPayload): Promise<void> {
  if (!supabase) return;

  const { error } = await supabase.from("conversations").insert({
    session_id: payload.sessionId ?? null,
    user_msg: payload.userMessage,
    tiani_reply: payload.assistantReply,
    model: payload.model,
    center: "VitalBahía",
  });

  if (error) {
    console.warn("[Supabase] Error al loguear conversación:", error.message);
  }
}

/**
 * Retrieves recent conversation history for a session.
 * Used for future memory/persistence features.
 */
export async function getSessionHistory(
  sessionId: string,
  limit = 20
): Promise<{ userMsg: string; tianiReply: string }[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("conversations")
    .select("user_msg, tiani_reply")
    .eq("session_id", sessionId)
    .order("created_at", { ascending: true })
    .limit(limit);

  if (error || !data) return [];

  return data.map((row) => ({
    userMsg: row.user_msg as string,
    tianiReply: row.tiani_reply as string,
  }));
}

export { supabase };
