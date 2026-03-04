import { motion } from "framer-motion";

export default function TypingIndicator() {
  const dots = [0, 1, 2];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.25 }}
      className="flex items-start gap-3 px-4 py-2"
    >
      {/* Tiani mini avatar */}
      <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, rgba(0,212,255,0.2) 0%, rgba(124,58,237,0.2) 100%)",
          border: "1px solid rgba(0,212,255,0.25)",
        }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="url(#dotGrad)"/>
          <defs>
            <linearGradient id="dotGrad" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#00D4FF"/>
              <stop offset="1" stopColor="#7C3AED"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Bubble */}
      <div className="bubble-tiani rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
        {dots.map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full"
            style={{ background: "rgba(0,212,255,0.6)" }}
            animate={{
              y: [0, -6, 0],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 1.0,
              repeat: Infinity,
              delay: i * 0.18,
              ease: "easeInOut",
            }}
          />
        ))}
        <span className="ml-1 text-xs" style={{ color: "var(--text-muted)" }}>Tiani está escribiendo…</span>
      </div>
    </motion.div>
  );
}
