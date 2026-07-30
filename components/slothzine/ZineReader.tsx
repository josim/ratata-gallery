"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { PDFDocumentProxy } from "pdfjs-dist/types/src/display/api";
import type { SlothIssue } from "@/lib/slothzineArchive";
import { loadDocument, renderPage, type RenderedPage } from "./pdf";
import type { ReaderCopy } from "./copy";

type PageSpec = number | "random" | "last";
type Pending = { index: number; spec: PageSpec; dir: 1 | -1; token: number };

type Props = {
  issues: SlothIssue[];
  start: { index: number; spec: PageSpec };
  copy: ReaderCopy;
  onClose: () => void;
};

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export default function ZineReader({ issues, start, copy, onClose }: Props) {
  const [index, setIndex] = useState(start.index);
  const [page, setPage] = useState(1);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [rendered, setRendered] = useState<RenderedPage | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );
  const [dir, setDir] = useState<1 | -1>(1);
  // True while the loader is on a different issue than the last painted page —
  // that's when we show the incoming cover as a title-card poster.
  const [issueSwitch, setIssueSwitch] = useState(true);

  const [pending, setPending] = useState<Pending>({
    ...start,
    dir: 1,
    token: 0,
  });
  const tokenRef = useRef(0);
  const docRef = useRef<{ number: number; doc: PDFDocumentProxy } | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const paintedIssueRef = useRef<number>(-1);

  const issue = issues[index];
  const pendingIssue = issues[pending.index];

  const stageWidth = () => stageRef.current?.clientWidth ?? 900;

  // Warm the neighbouring pages (and the next issue's document) so a turn is
  // instant. Fire-and-forget; failures here are silent.
  const prefetch = useCallback(
    (doc: PDFDocumentProxy, num: number, p: number, n: number, i: number) => {
      const w = stageWidth();
      if (p + 1 <= n) void renderPage(doc, num, p + 1, w).catch(() => {});
      if (p - 1 >= 1) void renderPage(doc, num, p - 1, w).catch(() => {});
      if (p >= n - 1) {
        const next = issues[(i + 1) % issues.length];
        void loadDocument(next.number, next.pdfUrls).catch(() => {});
      }
    },
    [issues],
  );

  // The single navigation effect: resolve `pending` into a concrete rendered
  // page. Everything (turns, jumps, shuffle, issue crossings) routes here.
  useEffect(() => {
    const my = ++tokenRef.current;
    const target = issues[pending.index];
    const switching = paintedIssueRef.current !== target.number;
    setIssueSwitch(switching);
    setDir(pending.dir);
    setStatus("loading");

    (async () => {
      try {
        const doc = await loadDocument(target.number, target.pdfUrls);
        if (tokenRef.current !== my) return;
        docRef.current = { number: target.number, doc };
        const n = doc.numPages;
        const p =
          pending.spec === "random"
            ? 1 + Math.floor(Math.random() * n)
            : pending.spec === "last"
              ? n
              : Math.min(Math.max(1, pending.spec), n);

        const r = await renderPage(doc, target.number, p, stageWidth());
        if (tokenRef.current !== my) return;

        setNumPages(n);
        setIndex(pending.index);
        setPage(p);
        setRendered(r);
        setStatus("ready");
        paintedIssueRef.current = target.number;
        prefetch(doc, target.number, p, n, pending.index);
      } catch {
        if (tokenRef.current === my) setStatus("error");
      }
    })();
  }, [pending, issues, prefetch]);

  const go = useCallback((index: number, spec: PageSpec, dir: 1 | -1) => {
    setPending({ index, spec, dir, token: ++tokenRef.current });
  }, []);

  const next = useCallback(() => {
    if (status === "loading") return;
    if (numPages && page < numPages) go(index, page + 1, 1);
    else go((index + 1) % issues.length, 1, 1);
  }, [status, numPages, page, index, issues.length, go]);

  const prev = useCallback(() => {
    if (status === "loading") return;
    if (page > 1) go(index, page - 1, -1);
    else go((index - 1 + issues.length) % issues.length, "last", -1);
  }, [status, page, index, issues.length, go]);

  const shuffle = useCallback(() => {
    let r = Math.floor(Math.random() * issues.length);
    if (issues.length > 1 && r === index) r = (r + 1) % issues.length;
    go(r, "random", 1);
  }, [issues.length, index, go]);

  // Keyboard: ← → / space turn pages, S shuffles, Esc leaves. Ignore repeats
  // while a page is still streaming so we don't queue a burst of turns.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") return onClose();
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        return next();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        return prev();
      }
      if (e.key === "s" || e.key === "S") return shuffle();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, shuffle, onClose]);

  // Lock the page behind the reader while it's open.
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  // Keep the active cover centred in the filmstrip.
  const stripRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = stripRef.current?.querySelector<HTMLElement>(
      `[data-issue-index="${index}"]`,
    );
    el?.scrollIntoView({ inline: "center", block: "nearest" });
  }, [index]);

  const turnClass =
    status === "ready"
      ? dir === 1
        ? "sloth-turn-fwd"
        : "sloth-turn-back"
      : "";

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-paper"
      role="dialog"
      aria-modal="true"
      aria-label={copy.readerLabel}
    >
      {/* Top bar */}
      <div className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-line px-[clamp(12px,3vw,28px)]">
        <button
          type="button"
          onClick={onClose}
          className="group flex items-center gap-2 text-nav text-ink-secondary hover:text-ink"
        >
          <span aria-hidden="true" className="text-ink-muted group-hover:text-accent">
            ←
          </span>
          {copy.backToShelf}
        </button>

        <div className="flex min-w-0 items-baseline gap-2 truncate">
          <span className="font-serif text-title-s text-ink">
            {copy.slothN}
            {issue.number}
          </span>
          <span className="hidden truncate text-meta uppercase text-ink-muted sm:inline">
            {issue.monthLabel}
          </span>
          <span className="ml-1 shrink-0 text-meta uppercase tabular-nums text-ink-muted">
            {status === "ready" && numPages
              ? `${pad(page)} / ${pad(numPages)}`
              : "— / —"}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={shuffle}
            className="text-nav text-ink-secondary hover:text-accent"
            title={copy.shuffleHint}
          >
            {copy.shuffle} <span aria-hidden="true">↝</span>
          </button>
          <a
            href={issue.teiaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden text-nav text-ink-secondary underline decoration-1 underline-offset-[0.18em] hover:text-accent sm:inline"
          >
            {copy.teia} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      {/* Stage */}
      <div
        ref={stageRef}
        className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-[clamp(8px,4vw,64px)] py-[clamp(12px,3vh,40px)]"
      >
        {/* Click zones for turning (below the visible chrome). */}
        <button
          type="button"
          aria-label={copy.prevPage}
          onClick={prev}
          className="absolute inset-y-0 left-0 z-10 w-[38%] cursor-w-resize focus-visible:outline-none"
        />
        <button
          type="button"
          aria-label={copy.nextPage}
          onClick={next}
          className="absolute inset-y-0 right-0 z-10 w-[38%] cursor-e-resize focus-visible:outline-none"
        />

        {/* Edge chevrons (keyboard-reachable, always visible affordance). */}
        <button
          type="button"
          aria-label={copy.prevPage}
          onClick={prev}
          className="absolute left-[clamp(6px,2vw,20px)] top-1/2 z-20 -translate-y-1/2 border border-line bg-paper/80 px-2 py-3 text-ink-muted backdrop-blur-none hover:border-control-line hover:text-ink"
        >
          ←
        </button>
        <button
          type="button"
          aria-label={copy.nextPage}
          onClick={next}
          className="absolute right-[clamp(6px,2vw,20px)] top-1/2 z-20 -translate-y-1/2 border border-line bg-paper/80 px-2 py-3 text-ink-muted hover:border-control-line hover:text-ink"
        >
          →
        </button>

        {/* Streaming progress bar. */}
        {status === "loading" && (
          <div className="sloth-develop-bar absolute inset-x-0 top-0 z-30 h-[2px] overflow-hidden bg-transparent" />
        )}

        {/* Poster while an issue's first sight is loading: its cover as a
            title card. Mid-issue turns keep the previous page instead. */}
        {status === "loading" && issueSwitch && (
          <figure className="sloth-fade relative flex max-h-full flex-col items-center">
            <div className="relative h-[62vh] max-h-full w-auto border border-line bg-card">
              <Image
                src={pendingIssue.cover}
                alt=""
                width={520}
                height={735}
                className="h-full w-auto object-contain opacity-95"
                priority
              />
            </div>
            <figcaption className="mt-4 text-center">
              <span className="block font-serif text-title-m text-ink">
                {copy.slothN}
                {pendingIssue.number}
              </span>
              <span className="mt-1 block text-meta uppercase text-ink-muted">
                {pendingIssue.monthLabel}
              </span>
            </figcaption>
          </figure>
        )}

        {/* The current page. It's a client-rendered blob: URL (a canvas the
            PDF was painted onto), so next/image can't optimize it — a plain
            <img> is correct here. */}
        {rendered && !(status === "loading" && issueSwitch) && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={`${index}:${page}:${rendered.url}`}
            src={rendered.url}
            alt={`${copy.slothN}${issue.number} — ${copy.pageWord} ${page}`}
            className={`max-h-full max-w-full border border-line bg-card object-contain ${turnClass} ${
              status === "loading" ? "opacity-55" : ""
            }`}
            style={{ transition: "opacity 200ms ease-out" }}
          />
        )}

        {status === "error" && (
          <div className="relative z-40 max-w-[42ch] border border-line bg-paper-sunk p-8 text-center">
            <p className="font-serif text-title-s text-ink">{copy.errorTitle}</p>
            <p className="mt-3 text-body-s text-ink-secondary">{copy.errorBody}</p>
            <div className="mt-5 flex justify-center gap-4">
              <button
                type="button"
                onClick={() => go(index, page, dir)}
                className="text-nav text-accent underline decoration-1 underline-offset-[0.18em] hover:text-accent-hover"
              >
                {copy.retry}
              </button>
              <a
                href={issue.teiaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-nav text-ink-secondary underline decoration-1 underline-offset-[0.18em] hover:text-ink"
              >
                {copy.teia} <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Filmstrip — every issue, newest first; the archive navigator. */}
      <div className="shrink-0 border-t border-line bg-paper-sunk">
        <div
          ref={stripRef}
          className="sloth-filmstrip flex items-end gap-2 overflow-x-auto px-[clamp(12px,3vw,28px)] py-3"
        >
          {issues.map((it, i) => {
            const active = i === index;
            return (
              <button
                key={it.number}
                type="button"
                data-issue-index={i}
                onClick={() => go(i, 1, i >= index ? 1 : -1)}
                aria-label={`${copy.slothN}${it.number} — ${it.monthLabel}`}
                aria-current={active ? "true" : undefined}
                className={`group relative block shrink-0 ${
                  active ? "" : "opacity-70 hover:opacity-100"
                }`}
              >
                <span
                  className={`relative block h-[58px] w-[42px] overflow-hidden border bg-card sm:h-[64px] sm:w-[46px] ${
                    active ? "border-ink" : "border-line group-hover:border-control-line"
                  }`}
                >
                  <Image
                    src={it.cover}
                    alt=""
                    fill
                    sizes="46px"
                    className="object-cover"
                  />
                </span>
                <span
                  className={`mt-1 block text-center text-[10px] font-medium tabular-nums ${
                    active ? "text-accent" : "text-ink-muted"
                  }`}
                >
                  {it.number}
                </span>
                {active && (
                  <span className="absolute -bottom-[1px] left-0 right-0 mx-auto h-[2px] w-4 bg-accent" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
