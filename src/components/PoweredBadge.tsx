import { motion } from "framer-motion";
import mhLogo from "../assets/motorshub-logo-white.png";

export default function PoweredBadge() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      className="flex items-center justify-center gap-3 py-2"
    >
      {/* Lock icon */}
      <motion.span
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="text-xs"
        style={{ color: "var(--text-muted)" }}
      >
        🔒
      </motion.span>

      {/* Badge pill with MH logo */}
      <div className="powered-badge" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <motion.span
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ color: "#10B981", fontSize: 8 }}
        >
          ◆
        </motion.span>
        RAG Powered by
        <img
          src={mhLogo}
          alt="IA MotorsHub"
          style={{ height: "14px", objectFit: "contain", opacity: 0.85, verticalAlign: "middle" }}
        />
        <motion.span
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          style={{ color: "#10B981", fontSize: 8 }}
        >
          ◆
        </motion.span>
      </div>

      {/* Info */}
      <span className="text-xs hidden sm:block" style={{ color: "var(--text-muted)" }}>
        Conversación cifrada
      </span>
    </motion.div>
  );
}
