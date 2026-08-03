import type { Metadata } from "next";
import "./globals.css";
import { serif, sans, mono } from "@/app/fonts";
import { LangProvider } from "@/components/LangProvider";
import { getLang, getStrings } from "@/lib/lang";

export function generateMetadata(): Metadata {
  const s = getStrings();
  return {
    title: s.site.name,
    description: s.site.tagline,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = getLang();

  return (
    <html lang={lang} className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <head>
        {/* The scroll reveal (globals.css) holds content back until JS scrolls
            it into view, so without scripting it would never arrive. Hand it
            straight to readers who have JS off. */}
        <noscript>
          <style>{`
            .reveal-rise { opacity: 1 !important; transform: none !important; }
            .reveal-rule { transform: none !important; }
            .reveal-wipe { clip-path: none !important; }
          `}</style>
        </noscript>
      </head>
      <body className="flex min-h-screen flex-col bg-paper font-sans text-ink antialiased">
        <LangProvider lang={lang}>{children}</LangProvider>
      </body>
    </html>
  );
}
