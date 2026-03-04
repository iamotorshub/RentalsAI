import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Player } from "@remotion/player";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

// ── Remotion Composition ────────────────────────────────────────
function VitalBahiaIntro() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const logoScale = spring({ frame, fps, config: { damping: 14, stiffness: 120 }, from: 0.7, to: 1 });

  const taglineOpacity = interpolate(frame, [25, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const taglineY = interpolate(frame, [25, 50], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const badgeOpacity = interpolate(frame, [55, 80], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const badgeY = interpolate(frame, [55, 80], [16, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const crossScale = spring({ frame: Math.max(0, frame - 5), fps, config: { damping: 12, stiffness: 100 }, from: 0.5, to: 1 });

  return (
    <AbsoluteFill
      style={{
        background: "#020812",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      {/* Medical cross + logo */}
      <div style={{ opacity: logoOpacity, transform: `scale(${logoScale})`, textAlign: "center" }}>
        <div style={{
          width: 80,
          height: 80,
          borderRadius: 20,
          background: "linear-gradient(135deg, rgba(0,212,255,0.15) 0%, rgba(124,58,237,0.15) 100%)",
          border: "1px solid rgba(0,212,255,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 20px",
          boxShadow: "0 0 40px rgba(0,212,255,0.2)",
          transform: `scale(${crossScale})`,
        }}>
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
            <rect x="16" y="4" width="12" height="36" rx="4" fill="url(#g1)" />
            <rect x="4" y="16" width="36" height="12" rx="4" fill="url(#g1)" />
            <defs>
              <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#00D4FF" />
                <stop offset="1" stopColor="#7C3AED" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div style={{
          fontSize: 42,
          fontWeight: 800,
          background: "linear-gradient(135deg, #00D4FF 0%, #7C3AED 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: "-1px",
          lineHeight: 1,
        }}>
          VitalBahía
        </div>
        <div style={{
          fontSize: 13,
          color: "rgba(240,244,255,0.4)",
          letterSpacing: "3px",
          textTransform: "uppercase",
          marginTop: 6,
          fontWeight: 500,
        }}>
          Centro Médico
        </div>
      </div>

      {/* Tagline */}
      <div style={{
        opacity: taglineOpacity,
        transform: `translateY(${taglineY}px)`,
        textAlign: "center",
      }}>
        <p style={{
          fontSize: 18,
          color: "rgba(240,244,255,0.75)",
          fontWeight: 400,
          letterSpacing: "0.01em",
        }}>
          Tu salud, nuestra prioridad
        </p>
      </div>

      {/* RAG Badge */}
      <div style={{
        opacity: badgeOpacity,
        transform: `translateY(${badgeY}px)`,
        background: "linear-gradient(135deg, rgba(0,212,255,0.1) 0%, rgba(124,58,237,0.1) 100%)",
        border: "1px solid rgba(0,212,255,0.25)",
        borderRadius: 99,
        padding: "6px 16px",
        display: "flex",
        alignItems: "center",
        gap: 8,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11,
        color: "rgba(0,212,255,0.9)",
        letterSpacing: "0.06em",
      }}>
        <span style={{ fontSize: 9, color: "#10B981" }}>◆</span>
        RAG POWERED BY MOTORSHUB
        <span style={{ fontSize: 9, color: "#10B981" }}>◆</span>
      </div>
    </AbsoluteFill>
  );
}

// ── Intro Sequence Component ────────────────────────────────────
interface IntroSequenceProps {
  onComplete: () => void;
}

export default function IntroSequence({ onComplete }: IntroSequenceProps) {
  const [phase, setPhase] = useState<"playing" | "done">("playing");

  useEffect(() => {
    // Remotion Player runs for ~3.5s (105 frames @ 30fps), then we close
    const t = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 3600);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <Player
        component={VitalBahiaIntro}
        durationInFrames={105}
        compositionWidth={640}
        compositionHeight={400}
        fps={30}
        style={{ width: "min(640px, 90vw)", borderRadius: 24 }}
        autoPlay
        loop={false}
      />
    </div>
  );
}
