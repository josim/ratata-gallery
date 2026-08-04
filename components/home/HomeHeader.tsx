"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LANG_COOKIE, type Lang } from "@/lib/strings";
import { useLang, useStrings } from "@/components/LangProvider";
import BrandWordmark from "@/components/BrandWordmark";

// "Zwei Spuren" homepage header (docs/Redesign_2a handoff §1). The archive
// pages keep components/Header.tsx; this one carries the redesign's mono nav
// and boxed DE/EN switch. Same cookie mechanism as the shared header.
function LangSwitch() {
  const lang = useLang();
  const s = useStrings();
  const router = useRouter();

  function switchTo(next: Lang) {
    if (next === lang) return;
    document.cookie = `${LANG_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    router.refresh();
  }

  const options: { value: Lang; label: string }[] = [
    { value: "de", label: s.nav.langDe },
    { value: "en", label: s.nav.langEn },
  ];

  return (
    <div className="flex gap-[2px] font-mono text-[11px] tracking-[0.1em]">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          lang={option.value}
          aria-pressed={lang === option.value}
          onClick={() => switchTo(option.value)}
          className={`border border-spur-ctrl bg-transparent px-[9px] py-[5px] uppercase text-spur-ink ${
            lang === option.value ? "opacity-100" : "opacity-70"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default function HomeHeader() {
  const [open, setOpen] = useState(false);
  const s = useStrings();

  // "Leistungen" has no page of its own yet — it anchors to the services
  // block further down the homepage.
  const navItems = [
    { href: "/exhibitions", label: s.nav.exhibitions },
    { href: "/production", label: s.nav.production },
    { href: "/#leistungen", label: s.home.navServices },
    { href: "/tezcon-europe", label: s.nav.tezconEurope },
    { href: "/about", label: s.nav.about },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-spur-ink bg-spur-paper">
      <div className="flex h-[76px] items-center justify-between px-5 md:px-10">
        <Link href="/" onClick={() => setOpen(false)} className="flex items-center">
          <BrandWordmark
            title={s.site.wordmark}
            className="h-[26px] w-auto text-spur-ink"
          />
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-7 font-mono text-[11px] uppercase tracking-[0.14em] md:flex"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-spur-ink transition-colors duration-150 hover:text-spur-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <LangSwitch />
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="home-mobile-nav"
          className="font-mono text-[11px] uppercase tracking-[0.14em] text-spur-ink md:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav
          id="home-mobile-nav"
          aria-label="Primary"
          className="border-t border-spur-ink bg-spur-paper px-5 py-6 md:hidden"
        >
          <ul className="space-y-4 font-mono text-[12px] uppercase tracking-[0.14em]">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-spur-ink hover:text-spur-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <LangSwitch />
          </div>
        </nav>
      )}
    </header>
  );
}
