import { useRef, useEffect, useState, KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useChat } from "../hooks/useChat";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import TianiHeader from "./TianiHeader";
import PoweredBadge from "./PoweredBadge";

export default function ChatInterface() {
  const { messages, isLoading, send, reset } = useChat();
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 120) + "px";
  }, [inputText]);

  const handleSend = () => {
    if (!inputText.trim() || isLoading) return;
    send(inputText);
    setInputText("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isEmpty = messages.length === 0;

  return (
    <div
      className="chat-container w-full max-w-2xl flex flex-col rounded-3xl overflow-hidden"
      style={{
        height: "min(88vh, 800px)",
        background: "rgba(8, 15, 30, 0.75)",
        backdropFilter: "blur(32px)",
        WebkitBackdropFilter: "blur(32px)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,212,255,0.06), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
    >
      {/* ── Header ─────────────────────────────────────── */}
      <TianiHeader />

      {/* ── Messages area ─────────────────────────────── */}
      <div className="flex-1 overflow-y-auto py-4" style={{ scrollBehavior: "smooth" }}>
        {/* Empty state */}
        <AnimatePresence>
          {isEmpty && (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center justify-center h-full px-8 text-center"
              style={{ minHeight: "300px" }}
            >
              {/* Animated icon */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="mb-6"
              >
                <div
                  className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto"
                  style={{
                    background: "linear-gradient(135deg, rgba(0,212,255,0.12) 0%, rgba(124,58,237,0.12) 100%)",
                    border: "1px solid rgba(0,212,255,0.2)",
                    boxShadow: "0 0 40px rgba(0,212,255,0.1)",
                  }}
                >
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                    <rect x="9" y="2" width="6" height="20" rx="2" fill="url(#eGrad)" />
                    <rect x="2" y="9" width="20" height="6" rx="2" fill="url(#eGrad)" />
                    <defs>
                      <linearGradient id="eGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop stopColor="#00D4FF" />
                        <stop offset="1" stopColor="#7C3AED" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </motion.div>

              <h2
                className="text-2xl font-bold mb-2 gradient-text"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                ¡Hola! Soy Tiani 👋
              </h2>
              <p className="text-sm mb-6 max-w-sm" style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Tu asistente virtual del <strong style={{ color: "var(--text-primary)" }}>Centro Médico VitalBahía</strong>.
                Escribime tu consulta y te ayudo con turnos, horarios y más.
              </p>

              {/* Quick suggestion chips */}
              <div className="flex flex-wrap gap-2 justify-center">
                {[
                  "¿Cuáles son los horarios de Cardiología?",
                  "Quiero un turno de RMI",
                  "Información sobre Odontología",
                  "Turno de Clínica Médica",
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => {
                      setInputText(suggestion);
                      textareaRef.current?.focus();
                    }}
                    className="text-xs px-3 py-2 rounded-xl transition-all duration-200"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "var(--text-secondary)",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,212,255,0.08)";
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(0,212,255,0.25)";
                      (e.currentTarget as HTMLButtonElement).style.color = "rgba(0,212,255,0.9)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.04)";
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.08)";
                      (e.currentTarget as HTMLButtonElement).style.color = "var(--text-secondary)";
                    }}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Messages */}
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        <AnimatePresence>
          {isLoading && <TypingIndicator key="typing" />}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* ── Input area ────────────────────────────────── */}
      <div
        className="px-4 py-3"
        style={{
          borderTop: "1px solid var(--glass-border)",
          background: "rgba(5,10,20,0.5)",
        }}
      >
        {/* Main input row */}
        <div
          className="neon-border flex items-end gap-3 rounded-2xl px-4 py-3"
          style={{ background: "rgba(255,255,255,0.03)" }}
        >
          <textarea
            ref={textareaRef}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribí tu consulta… (Enter para enviar)"
            className="chat-input flex-1"
            rows={1}
            disabled={isLoading}
            style={{ maxHeight: "120px" }}
          />

          {/* Reset button */}
          {messages.length > 0 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={reset}
              className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                cursor: "pointer",
                color: "var(--text-muted)",
              }}
              title="Nueva conversación"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.04)";
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="1 4 1 10 7 10" />
                <path d="M3.51 15a9 9 0 1 0 .49-4.6" />
              </svg>
            </motion.button>
          )}

          {/* Send button */}
          <button
            className="send-btn flex-shrink-0 w-9 h-9"
            onClick={handleSend}
            disabled={!inputText.trim() || isLoading}
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
              />
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </div>

        {/* Keyboard hint */}
        <p className="text-center mt-2 text-xs" style={{ color: "var(--text-muted)" }}>
          <kbd className="px-1.5 py-0.5 rounded text-xs" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>Enter</kbd>
          {" "}para enviar · {" "}
          <kbd className="px-1.5 py-0.5 rounded text-xs" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>Shift + Enter</kbd>
          {" "}para nueva línea
        </p>
      </div>

      {/* ── Footer badge ─────────────────────────────── */}
      <PoweredBadge />
    </div>
  );
}
