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
        paper: { DEFAULT: "#FBFAF8", sunk: "#F4F2EC", card: "#FFFFFF" },
        ink: { DEFAULT: "#1A1918", secondary: "#55524D", muted: "#767169" },
        line: { DEFAULT: "#E4E0D9", control: "#948C7E" },
        accent: { DEFAULT: "#A5372A", hover: "#8A2C21", tint: "#F5E7E4" },
        role: {
          curated: "#A5372A",
          booth: "#3E5C50",
          tech: "#2E4A6B",
          platform: "#6B4A7A",
          "curated-tint": "#F5E7E4",
          "booth-tint": "#E6EDE9",
          "tech-tint": "#E5EAF1",
          "platform-tint": "#ECE6F0",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": [
          "clamp(2.5rem, 5vw, 4rem)",
          { lineHeight: "1.05", letterSpacing: "-0.02em" },
        ],
        "display-l": [
          "clamp(2rem, 3.5vw, 3rem)",
          { lineHeight: "1.08", letterSpacing: "-0.015em" },
        ],
        "title-l": ["1.75rem", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "title-m": ["1.375rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "title-s": ["1.125rem", { lineHeight: "1.25", letterSpacing: "0" }],
        "body-l": ["1.125rem", { lineHeight: "1.6" }],
        body: ["1rem", { lineHeight: "1.6" }],
        "body-s": ["0.875rem", { lineHeight: "1.55" }],
        meta: ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.08em" }],
        nav: ["0.9375rem", { lineHeight: "1", letterSpacing: "0.01em" }],
      },
      maxWidth: {
        container: "1200px",
        wide: "1440px",
        measure: "68ch",
      },
    },
  },
  plugins: [],
};
export default config;
