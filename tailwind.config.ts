import type { Config } from "tailwindcss";

export default {
  content: [
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
  "./contexts/**/*.{js,ts,jsx,tsx,mdx}",
  "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: { DEFAULT: "#0a0a0f", elevated: "#13131a", card: "#1a1a24" },
        brand: {
          50: "#f5f0ff", 100: "#ebe0ff", 200: "#d4bcff", 300: "#b58cff",
          400: "#9b5cff", 500: "#8a2be2", 600: "#7a1fd4", 700: "#6418b0",
          800: "#4e128a", 900: "#3a0d66",
        },
        line: "#272730",
      },
      boxShadow: {
        soft: "0 4px 20px -4px rgba(138, 43, 226, 0.15)",
        card: "0 8px 32px -8px rgba(0, 0, 0, 0.6)",
        glow: "0 0 40px -10px rgba(155, 92, 255, 0.4)",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        shimmer: "shimmer 1.8s linear infinite",
      },
      keyframes: {
        fadeIn: { from: { opacity: "0" }, to: { opacity: "1" } },
        slideUp: { from: { opacity: "0", transform: "translateY(12px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        shimmer: { from: { backgroundPosition: "-1000px 0" }, to: { backgroundPosition: "1000px 0" } },
      },
    },
  },
  plugins: [],
} satisfies Config;
