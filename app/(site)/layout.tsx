import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomeHeader from "@/components/home/HomeHeader";

// The redesign's menu (HomeHeader) now runs on every page. The old shared
// Header stays in the codebase — flip USE_OLD_HEADER to bring it back.
const USE_OLD_HEADER = false;

// Chrome for the archive/detail pages. The homepage (app/page.tsx) is the
// "Zwei Spuren" redesign with its own full-bleed header and footer, so the
// shared chrome and the contained main column live here instead of in the
// root layout.
export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {USE_OLD_HEADER ? <Header /> : <HomeHeader />}
      <main className="mx-auto w-full max-w-container flex-1 px-[clamp(20px,5vw,64px)] py-16 md:py-24">
        {children}
      </main>
      <Footer />
    </>
  );
}
