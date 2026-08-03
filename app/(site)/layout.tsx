import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Chrome for the archive/detail pages. The homepage (app/page.tsx) is the
// "Zwei Spuren" redesign with its own full-bleed header and footer, so the
// shared Header/Footer and the contained main column live here instead of in
// the root layout.
export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-container flex-1 px-[clamp(20px,5vw,64px)] py-16 md:py-24">
        {children}
      </main>
      <Footer />
    </>
  );
}
