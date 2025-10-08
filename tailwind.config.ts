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
        // Cinematic dark theme - graphite to obsidian
        background: "#0A0A0A", // Obsidian black
        foreground: "#FAFAFA", // Pure white
        card: {
          DEFAULT: "#121212", // Graphite
          foreground: "#F5F5F5",
        },
        popover: {
          DEFAULT: "#121212",
          foreground: "#F5F5F5",
        },
        primary: {
          DEFAULT: "#00FF94", // Neon green accent
          foreground: "#0A0A0A",
        },
        secondary: {
          DEFAULT: "#1A1A1A", // Dark graphite
          foreground: "#F0F0F0",
        },
        muted: {
          DEFAULT: "#171717",
          foreground: "#A3A3A3",
        },
        accent: {
          DEFAULT: "#00FFFF", // Neon cyan
          foreground: "#0A0A0A",
        },
        destructive: {
          DEFAULT: "#FF4444",
          foreground: "#0A0A0A",
        },
        border: "#262626",
        input: "#1A1A1A",
        ring: "#00FF94",
        // Brand colors for cinematic design
        brand: {
          accent: "#00FF94",
          cyan: "#00FFFF",
          obsidian: "#0A0A0A",
          graphite: "#121212",
        }
      },
      fontFamily: {
        sans: ["Inter", "SF Pro Display", "-apple-system", "BlinkMacSystemFont", "system-ui", "sans-serif"],
        mono: ["SF Mono", "Monaco", "Inconsolata", "Roboto Mono", "monospace"],
      },
      boxShadow: {
        // Cinematic shadows
        'depth': '0 20px 60px rgba(0, 0, 0, 0.8)',
        'glow': '0 0 40px rgba(0, 255, 200, 0.4)',
        'glow-green': '0 0 40px rgba(0, 255, 148, 0.4)',
        'glow-cyan': '0 0 40px rgba(0, 255, 255, 0.4)',
        'inner-glow': 'inset 0 0 20px rgba(0, 255, 148, 0.1)',
        'cinematic': '0 10px 40px rgba(0, 0, 0, 0.6)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out",
        "fade-up": "fadeUp 0.8s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
        "glow": "glow 2s ease-in-out infinite alternate",
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(0, 255, 148, 0.5)" },
          "100%": { boxShadow: "0 0 20px rgba(0, 255, 148, 0.8), 0 0 30px rgba(0, 255, 148, 0.6)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0, 255, 148, 0.4)" },
          "50%": { boxShadow: "0 0 40px rgba(0, 255, 148, 0.8), 0 0 60px rgba(0, 255, 148, 0.6)" },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} satisfies Config;