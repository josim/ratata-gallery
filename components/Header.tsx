"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { strings } from "@/lib/strings";
import { NAV_ITEMS } from "@/lib/nav";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper">
      <div className="mx-auto flex h-14 max-w-container items-center justify-between px-[clamp(20px,5vw,64px)] md:h-16">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex items-baseline gap-1"
        >
          <span className="font-serif text-[1.25rem] font-medium tracking-[-0.01em] text-ink">
            {strings.site.wordmark}
          </span>
          <span className="text-meta uppercase text-ink-muted">
            {strings.site.wordmarkSuffix}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {NAV_ITEMS.map((item) => {
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
            <span className="text-ink">{strings.nav.langEn}</span>
            <span className="text-ink-muted/50" aria-disabled="true">
              {strings.nav.langDe}
            </span>
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
            {NAV_ITEMS.map((item) => {
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
            <span className="text-ink">{strings.nav.langEn}</span>
            <span className="text-ink-muted/50" aria-disabled="true">
              {strings.nav.langDe}
            </span>
          </div>
        </nav>
      )}
    </header>
  );
}
