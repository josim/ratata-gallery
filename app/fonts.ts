import { Newsreader, Archivo } from "next/font/google";

// Self-hosted at build time via next/font — no runtime Google request.
// Keep to the weights actually used in the type scale (see DESIGN.md §2).
export const serif = Newsreader({
  subsets: ["latin", "latin-ext"], // latin-ext = German umlauts, ß
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-serif",
});

export const sans = Archivo({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-sans",
});
