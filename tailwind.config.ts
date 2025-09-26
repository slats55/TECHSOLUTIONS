import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Dark theme with neon accents
        background: "hsl(0 0% 3%)", // Very dark black
        foreground: "hsl(0 0% 95%)", // Light gray
        card: {
          DEFAULT: "hsl(0 0% 8%)", // Dark gray
          foreground: "hsl(0 0% 90%)",
        },
        popover: {
          DEFAULT: "hsl(0 0% 8%)",
          foreground: "hsl(0 0% 90%)",
        },
        primary: {
          DEFAULT: "hsl(142 76% 36%)", // Neon green
          foreground: "hsl(0 0% 3%)",
        },
        secondary: {
          DEFAULT: "hsl(0 0% 15%)", // Dark gray
          foreground: "hsl(0 0% 90%)",
        },
        muted: {
          DEFAULT: "hsl(0 0% 12%)",
          foreground: "hsl(0 0% 65%)",
        },
        accent: {
          DEFAULT: "hsl(199 89% 48%)", // Neon blue
          foreground: "hsl(0 0% 3%)",
        },
        destructive: {
          DEFAULT: "hsl(0 84% 60%)",
          foreground: "hsl(0 0% 3%)",
        },
        border: "hsl(0 0% 20%)",
        input: "hsl(0 0% 15%)",
        ring: "hsl(142 76% 36%)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px hsl(142 76% 36%)" },
          "100%": { boxShadow: "0 0 20px hsl(142 76% 36%), 0 0 30px hsl(142 76% 36%)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;