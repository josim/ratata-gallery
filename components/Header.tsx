"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { LANG_COOKIE, type Lang } from "@/lib/strings";
import { useLang, useStrings } from "@/components/LangProvider";
import { getNavItems } from "@/lib/nav";

// DE first — the site is German-first, English beside it.
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
    <>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          lang={option.value}
          aria-pressed={lang === option.value}
          onClick={() => switchTo(option.value)}
          className={`border-0 bg-transparent p-0 uppercase ${
            lang === option.value
              ? "text-ink"
              : "text-ink-muted hover:text-ink-secondary"
          }`}
        >
          {option.label}
        </button>
      ))}
    </>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const s = useStrings();
  const navItems = getNavItems(s);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper">
      <div className="mx-auto flex h-14 max-w-container items-center justify-between px-[clamp(20px,5vw,64px)] md:h-16">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex items-baseline gap-1"
        >
          <span className="font-serif text-[1.25rem] font-medium tracking-[-0.01em] text-ink">
            {s.site.wordmark}
          </span>
          <span className="text-meta uppercase text-ink-muted">
            {s.site.wordmarkSuffix}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`border-b-2 pb-1 text-nav ${
                  active
                    ? "border-accent text-ink"
                    : "border-transparent text-ink-secondary hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="flex items-center gap-2 border-l border-line pl-4 text-meta uppercase">
            <LangSwitch />
          </div>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="text-nav text-ink md:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className="border-t border-line bg-paper px-[clamp(20px,5vw,64px)] py-6 md:hidden"
        >
          <ul className="space-y-4">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`font-serif text-title-s ${
                      active ? "text-ink" : "text-ink-secondary"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-6 flex gap-3 text-meta uppercase">
            <LangSwitch />
          </div>
        </nav>
      )}
    </header>
  );
}
