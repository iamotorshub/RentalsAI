import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ChatInterface from "./components/ChatInterface";
import IntroSequence from "./components/IntroSequence";
import ParticleBg from "./components/ParticleBg";

export default function App() {
  const [introComplete, setIntroComplete] = useState(false);

  // Safety fallback — ensure intro never blocks the app
  useEffect(() => {
    const t = setTimeout(() => setIntroComplete(true), 5000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden" style={{ background: "var(--bg-base)" }}>
      {/* Animated ambient background blobs */}
      <div className="bg-blob-1" />
      <div className="bg-blob-2" />
      <div className="bg-blob-3" />

      {/* Subtle grid overlay */}
      <div className="bg-grid fixed inset-0 pointer-events-none z-0 opacity-60" />

      {/* Particle constellation background */}
      <ParticleBg />

      {/* Intro sequence (Remotion Player) */}
      <AnimatePresence>
        {!introComplete && (
          <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="intro-overlay"
          >
            <IntroSequence onComplete={() => setIntroComplete(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main chat interface */}
      <AnimatePresence>
        {introComplete && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative z-10 flex items-center justify-center min-h-screen p-4"
          >
            <ChatInterface />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
