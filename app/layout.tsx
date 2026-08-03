import type { Metadata } from "next";
import "./globals.css";
import { serif, sans } from "@/app/fonts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
    <html lang={lang} className={`${serif.variable} ${sans.variable}`}>
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
        <LangProvider lang={lang}>
          <Header />
          <main className="mx-auto w-full max-w-container flex-1 px-[clamp(20px,5vw,64px)] py-16 md:py-24">
            {children}
          </main>
          <Footer />
        </LangProvider>
      </body>
    </html>
  );
}
