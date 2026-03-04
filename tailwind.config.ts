import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        glass: {
          bg: "rgba(255, 255, 255, 0.04)",
          border: "rgba(255, 255, 255, 0.08)",
          hover: "rgba(255, 255, 255, 0.07)",
        },
        navy: {
          950: "#020812",
          900: "#050A14",
          800: "#080F1E",
          700: "#0D1829",
        },
        cyan: {
          400: "#22D3EE",
          neon: "#00D4FF",
        },
        violet: {
          tech: "#7C3AED",
        },
        mint: "#10B981",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Space Grotesk", "Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-glass":
          "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
        "gradient-tiani":
          "linear-gradient(135deg, #00D4FF 0%, #7C3AED 100%)",
        "gradient-card":
          "linear-gradient(145deg, rgba(0,212,255,0.08) 0%, rgba(124,58,237,0.08) 100%)",
      },
      animation: {
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "blob": "blob 7s infinite",
        "spin-slow": "spin 8s linear infinite",
        "gradient-shift": "gradientShift 4s ease infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(0, 212, 255, 0.3)" },
          "100%": { boxShadow: "0 0 20px rgba(0, 212, 255, 0.7), 0 0 40px rgba(0, 212, 255, 0.3)" },
        },
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      backdropBlur: {
        xs: "2px",
        "4xl": "72px",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
        "glass-hover": "0 16px 48px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
        neon: "0 0 20px rgba(0, 212, 255, 0.5), 0 0 60px rgba(0, 212, 255, 0.2)",
        "neon-violet": "0 0 20px rgba(124, 58, 237, 0.5), 0 0 60px rgba(124, 58, 237, 0.2)",
        "message-user": "0 4px 24px rgba(0, 212, 255, 0.15)",
        "message-tiani": "0 4px 24px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
};

export default config;
