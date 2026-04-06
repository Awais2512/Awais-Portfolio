import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary:   "var(--bg-primary)",
          secondary: "var(--bg-secondary)",
          tertiary:  "var(--bg-tertiary)",
        },
        accent: {
          primary:   "var(--accent-primary)",
          secondary: "var(--accent-secondary)",
        },
        text: {
          primary:   "var(--text-primary)",
          secondary: "var(--text-secondary)",
          tertiary:  "var(--text-tertiary)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      maxWidth: {
        content: "1200px",
      },
      borderRadius: {
        card: "12px",
      },
      animation: {
        "fade-in":     "fadeIn 0.6s ease-out forwards",
        "slide-up":    "slideUp 0.6s ease-out forwards",
        "blink":       "blink 1s step-end infinite",
      },
      keyframes: {
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
