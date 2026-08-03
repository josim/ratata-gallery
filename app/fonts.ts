import { Newsreader, Archivo, JetBrains_Mono } from "next/font/google";

// Self-hosted at build time via next/font — no runtime Google request.
// Keep to the weights actually used in the type scale (see DESIGN.md §2).
export const serif = Newsreader({
  subsets: ["latin", "latin-ext"], // latin-ext = German umlauts, ß
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-serif",
});

// 700–900 carry the "Zwei Spuren" homepage display type
// (docs/Redesign_2a handoff); 400–600 carry the archive pages.
export const sans = Archivo({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-sans",
});

// Homepage kickers, nav, meta rows, and stat labels.
export const mono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-mono",
});
