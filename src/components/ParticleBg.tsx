import { useCallback } from "react";
import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

export default function ParticleBg() {
  const init = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={init}
      className="fixed inset-0 z-0 pointer-events-none"
      options={{
        background: { color: { value: "transparent" } },
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: { enable: true, mode: "attract" },
          },
          modes: {
            attract: { distance: 150, duration: 0.4, speed: 1 },
          },
        },
        particles: {
          color: { value: ["#00D4FF", "#7C3AED", "#10B981"] },
          links: {
            color: "#00D4FF",
            distance: 130,
            enable: true,
            opacity: 0.08,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: { default: "bounce" },
            random: true,
            speed: 0.6,
            straight: false,
          },
          number: {
            density: { enable: true, area: 900 },
            value: 70,
          },
          opacity: {
            value: { min: 0.05, max: 0.35 },
            animation: { enable: true, speed: 0.8, minimumValue: 0.05 },
          },
          shape: { type: "circle" },
          size: {
            value: { min: 1, max: 2.5 },
          },
        },
        detectRetina: true,
      }}
    />
  );
}
