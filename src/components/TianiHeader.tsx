import { motion } from "framer-motion";
import vbLogo from "../assets/vitalbahia-logo.png";

export default function TianiHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex items-center justify-between px-5 py-4 glass-dark border-b"
      style={{ borderColor: "var(--glass-border)" }}
    >
      {/* Left: avatar + info */}
      <div className="flex items-center gap-3">
        {/* Avatar with gradient ring */}
        <div className="relative">
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, rgba(0,212,255,0.2) 0%, rgba(124,58,237,0.2) 100%)",
              border: "2px solid transparent",
              backgroundClip: "padding-box",
              boxShadow: "0 0 0 2px rgba(0,212,255,0.35), 0 0 20px rgba(0,212,255,0.15)",
            }}
          >
            {/* Medical cross icon */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <rect x="9" y="2" width="6" height="20" rx="2" fill="url(#hGrad)" />
              <rect x="2" y="9" width="20" height="6" rx="2" fill="url(#hGrad)" />
              <defs>
                <linearGradient id="hGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop stopColor="#00D4FF" />
                  <stop offset="1" stopColor="#7C3AED" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          {/* Online indicator */}
          <div
            className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2"
            style={{
              background: "var(--mint)",
              borderColor: "var(--bg-card)",
              boxShadow: "0 0 8px rgba(16,185,129,0.8)",
              animation: "pulse-online 2s ease-in-out infinite",
            }}
          />
        </div>

        {/* Name + subtitle */}
        <div>
          <h1
            className="font-heading font-700 text-base leading-tight gradient-text"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}
          >
            Tiani
          </h1>
          <div className="flex items-center gap-1.5 mt-0.5">
            <div className="online-dot" style={{ width: 6, height: 6 }} />
            <span className="text-xs" style={{ color: "var(--mint)", fontWeight: 500 }}>
              En línea
            </span>
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
              · Recepcionista Virtual
            </span>
          </div>
        </div>
      </div>

      {/* Right: VitalBahía logo */}
      <div className="flex flex-col items-end gap-1">
        <img
          src={vbLogo}
          alt="Centro Médico VitalBahía"
          style={{ height: "36px", objectFit: "contain", opacity: 0.92 }}
        />
        <span className="text-xs" style={{ color: "var(--text-muted)" }}>
          Alsina 450, Bahía Blanca
        </span>
      </div>
    </motion.div>
  );
}
