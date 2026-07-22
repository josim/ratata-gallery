import type { Metadata } from "next";
import "./globals.css";
import { serif, sans } from "@/app/fonts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { strings } from "@/lib/strings";

export const metadata: Metadata = {
  title: strings.site.name,
  description: strings.site.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="flex min-h-screen flex-col bg-paper font-sans text-ink antialiased">
        <Header />
        <main className="mx-auto w-full max-w-container flex-1 px-[clamp(20px,5vw,64px)] py-16 md:py-24">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
