import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Real viagogo palette (sampled from viagogo.fr computed styles)
        ink: {
          DEFAULT: "#191c1f", // near-black primary text (rgb 25,28,31)
          strong: "#091218", // card titles / strong headings (rgb 9,18,24)
          soft: "#3d444d",
          date: "#606970", // date / meta text (rgb 96,105,112)
          muted: "#677383", // secondary text (rgb 103,115,131)
          faint: "#8b94a3",
        },
        brand: {
          DEFAULT: "#4c7a02", // olive/leaf green — primary buttons & accents
          dark: "#3f6600", // rgb 63,102,0
          light: "#6ba714", // logo green
          tint: "#e7ffc3", // light green pill bg (rgb 231,255,195)
        },
        blue: {
          DEFAULT: "#0075c4", // link blue (rgb 0,117,196)
          dark: "#005fa0",
          tint: "#eaf4fb",
        },
        announce: "#091218", // top announcement bar / dark surfaces (rgb 9,18,24)
        pink: {
          DEFAULT: "#c4187a", // urgency badge "billets restants"
          soft: "#fdeaf4",
        },
        line: "#e2e8ee",
        surface: "#eff5f8", // light section / search fill (rgb 239,245,248)
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "Arial", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 3px rgba(16,24,40,0.08), 0 1px 2px rgba(16,24,40,0.05)",
        cardHover: "0 10px 28px rgba(16,24,40,0.14)",
        pill: "0 1px 2px rgba(16,24,40,0.06)",
      },
      maxWidth: {
        page: "1200px",
      },
      borderRadius: {
        pill: "9999px",
      },
    },
  },
  plugins: [],
};

export default config;
