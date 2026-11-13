/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        night: {
          950: "#040404",
          900: "#080808",
          850: "#0d0d0d",
          800: "#121212",
          700: "#1a1a1a",
          600: "#262626",
          500: "#404040",
        },
        gold: {
          warm: "#d4af37",
          light: "#e6c66e",
          dark: "#997d26",
          faint: "rgba(212, 175, 55, 0.12)",
        },
        crimson: {
          DEFAULT: "#c43828",
          faint: "rgba(196, 56, 40, 0.15)",
        },
        warm: {
          white: "#f5f5f0",
          cream: "#eae6df",
          gray: "#a3a3a3",
          dark: "#737373",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "Cinzel", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-display)", "Cinzel", "Playfair Display", "serif"],
      },
      letterSpacing: {
        widest: "0.2em",
        ultra: "0.3em",
      },
      backgroundImage: {
        "radial-vignette": "radial-gradient(circle at center, transparent 40%, #080808 100%)",
        "fade-bottom": "linear-gradient(to bottom, transparent 0%, #080808 100%)",
        "fade-top": "linear-gradient(to top, transparent 0%, #080808 100%)",
      },
    },
  },
  plugins: [],
};
