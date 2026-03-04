import { motion } from "framer-motion";
import { useTypewriter } from "../hooks/useTypewriter";
import type { Message } from "../hooks/useChat";

interface MessageBubbleProps {
  message: Message;
}

function formatTime(date: Date) {
  return date.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });
}

// Render text with basic markdown: **bold**, *italic*, line breaks, emojis
function renderText(text: string) {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    // Bold: **text**
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    const rendered = parts.map((part, j) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={j} style={{ color: "rgba(240,244,255,0.95)", fontWeight: 600 }}>{part.slice(2, -2)}</strong>;
      }
      return <span key={j}>{part}</span>;
    });
    return (
      <span key={i}>
        {rendered}
        {i < lines.length - 1 && <br />}
      </span>
    );
  });
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";
  const shouldAnimate = !isUser && (message.isLatest ?? false);

  const { displayed, isDone } = useTypewriter(
    message.content,
    15,
    shouldAnimate
  );

  const textToShow = shouldAnimate ? displayed : message.content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex items-end gap-2.5 px-4 py-1 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Avatar — only for Tiani */}
      {!isUser && (
        <div
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mb-1"
          style={{
            background: "linear-gradient(135deg, rgba(0,212,255,0.18) 0%, rgba(124,58,237,0.18) 100%)",
            border: "1px solid rgba(0,212,255,0.2)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <rect x="9" y="2" width="6" height="20" rx="2" fill="url(#bGrad)" />
            <rect x="2" y="9" width="20" height="6" rx="2" fill="url(#bGrad)" />
            <defs>
              <linearGradient id="bGrad" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#00D4FF" />
                <stop offset="1" stopColor="#7C3AED" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      )}

      {/* Bubble */}
      <div
        className={`
          max-w-[78%] rounded-2xl px-4 py-3 relative
          ${isUser
            ? "bubble-user rounded-br-sm"
            : "bubble-tiani rounded-bl-sm"
          }
        `}
      >
        {/* Message text */}
        <p
          className="text-sm leading-relaxed"
          style={{ color: isUser ? "rgba(240,244,255,0.95)" : "var(--text-primary)" }}
        >
          {renderText(textToShow)}
          {/* Cursor while typing */}
          {shouldAnimate && !isDone && (
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.6, repeat: Infinity }}
              className="inline-block w-0.5 h-3.5 ml-0.5 rounded-full align-middle"
              style={{ background: "rgba(0,212,255,0.8)" }}
            />
          )}
        </p>

        {/* Timestamp */}
        <p
          className="text-right mt-1.5 text-xs"
          style={{ color: "var(--text-muted)" }}
        >
          {formatTime(message.timestamp)}
        </p>
      </div>

      {/* User avatar placeholder */}
      {isUser && (
        <div
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mb-1"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="4" fill="rgba(240,244,255,0.5)" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="rgba(240,244,255,0.5)" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      )}
    </motion.div>
  );
}
