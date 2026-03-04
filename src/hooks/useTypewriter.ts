import { useState, useEffect, useRef } from "react";

export function useTypewriter(text: string, speed = 18, enabled = true) {
  const [displayed, setDisplayed] = useState("");
  const [isDone, setIsDone] = useState(false);
  const indexRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!enabled) {
      setDisplayed(text);
      setIsDone(true);
      return;
    }

    setDisplayed("");
    setIsDone(false);
    indexRef.current = 0;

    function type() {
      if (indexRef.current < text.length) {
        setDisplayed(text.slice(0, indexRef.current + 1));
        indexRef.current += 1;
        // Speed varies slightly for natural feel
        const variance = Math.random() * 12 - 6;
        timeoutRef.current = setTimeout(type, speed + variance);
      } else {
        setIsDone(true);
      }
    }

    timeoutRef.current = setTimeout(type, 60);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [text, speed, enabled]);

  return { displayed, isDone };
}
