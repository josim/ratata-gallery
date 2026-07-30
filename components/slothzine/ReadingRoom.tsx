"use client";

import Image from "next/image";
import { useState } from "react";
import type { Lang } from "@/lib/strings";
import type { SlothIssue } from "@/lib/slothzineArchive";
import { readerCopy, shelfCopy } from "./copy";
import ZineReader from "./ZineReader";

type Entry = { index: number; spec: number | "random" | "last" };

export default function ReadingRoom({
  issues,
  span,
  lang,
}: {
  issues: SlothIssue[];
  span: { from: string; to: string };
  lang: Lang;
}) {
  const [entry, setEntry] = useState<Entry | null>(null);
  const s = shelfCopy[lang];

  const latestIndex = 0; // issues are newest-first
  const firstIndex = issues.length - 1;

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="border-b border-line pb-12 md:pb-16">
        <p className="text-meta uppercase text-ink-muted">
          {s.eyebrow(span.from, span.to)}
        </p>
        <h1 className="mt-4 max-w-[16ch] font-serif text-display-l text-ink text-balance">
          {s.title}
        </h1>
        <p className="mt-6 max-w-measure text-body-l text-ink-secondary">
          {s.lead}
        </p>
        <p className="mt-3 max-w-measure text-body-s text-ink-muted">{s.note}</p>

        <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-3">
          <button
            type="button"
            onClick={() => setEntry({ index: latestIndex, spec: 1 })}
            className="inline-flex min-h-12 items-center border border-accent bg-accent px-5 py-3 text-nav text-paper transition-colors duration-150 hover:bg-accent-hover"
          >
            {s.openLatest} <span aria-hidden="true" className="ml-2">→</span>
          </button>
          <button
            type="button"
            onClick={() => setEntry({ index: rand(issues.length), spec: "random" })}
            className="inline-flex min-h-12 items-center border border-accent px-5 py-3 text-nav text-accent transition-colors duration-150 hover:bg-accent-tint hover:text-accent-hover"
          >
            {s.shuffle} <span aria-hidden="true" className="ml-2">↝</span>
          </button>
          <button
            type="button"
            onClick={() => setEntry({ index: firstIndex, spec: 1 })}
            className="inline-flex min-h-12 items-center px-2 py-3 text-nav text-ink-secondary underline decoration-1 underline-offset-[0.18em] hover:text-ink"
          >
            {s.beginAtOne}
          </button>
        </div>
      </section>

      {/* ── The wall — every issue, newest first ─────────────────────── */}
      <section aria-labelledby="sloth-wall" className="pt-10 md:pt-14">
        <div className="flex items-baseline justify-between gap-4">
          <h2 id="sloth-wall" className="font-serif text-title-m text-ink">
            {s.wallHeading}
          </h2>
          <span className="text-meta uppercase tabular-nums text-ink-muted">
            {s.countLabel(issues.length)}
          </span>
        </div>

        <ul className="mt-6 grid grid-cols-4 gap-2 sm:grid-cols-6 sm:gap-2.5 md:grid-cols-8 lg:grid-cols-10">
          {issues.map((it, i) => (
            <li key={it.number}>
              <button
                type="button"
                onClick={() => setEntry({ index: i, spec: 1 })}
                aria-label={`${readerCopy[lang].slothN}${it.number} — ${it.monthLabel} — ${s.hoverRead}`}
                className="group relative block aspect-square w-full overflow-hidden border border-line bg-card transition-colors duration-150 hover:border-ink focus-visible:border-ink"
              >
                <Image
                  src={it.cover}
                  alt={`${readerCopy[lang].slothN}${it.number}`}
                  fill
                  sizes="(min-width:1024px) 10vw, (min-width:768px) 12vw, (min-width:640px) 16vw, 24vw"
                  className="object-cover"
                />
                {/* Hover/focus caption — fades in, no motion/lift. */}
                <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-1 bg-paper/95 px-1.5 py-1 opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span className="text-[10px] font-medium tabular-nums text-ink">
                    #{it.number}
                  </span>
                  <span className="text-[10px] font-medium uppercase tracking-[0.08em] text-accent">
                    {s.hoverRead} →
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      {entry && (
        <ZineReader
          issues={issues}
          start={entry}
          copy={readerCopy[lang]}
          onClose={() => setEntry(null)}
        />
      )}
    </>
  );
}

function rand(n: number) {
  return Math.floor(Math.random() * n);
}
