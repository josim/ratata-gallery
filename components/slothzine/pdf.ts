// Client-only PDF engine for the Reading Room.
//
// The zines live on IPFS (~15–35 MB each). We never download a whole file:
// pdf.js opens each document with range requests disabled-auto-fetch, so it
// pulls only the bytes needed for the page currently on screen. Rendered pages
// are cached as object URLs (keyed by issue + page + width bucket) so turning
// back a page is instant and cheap.

import type {
  PDFDocumentProxy,
  RenderParameters,
} from "pdfjs-dist/types/src/display/api";

type Pdfjs = typeof import("pdfjs-dist");

let pdfjsPromise: Promise<Pdfjs> | null = null;

async function getPdfjs(): Promise<Pdfjs> {
  if (!pdfjsPromise) {
    pdfjsPromise = import("pdfjs-dist").then((lib) => {
      // Self-hosted worker — no external CDN (DSGVO + the site's own origin).
      lib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
      return lib;
    });
  }
  return pdfjsPromise;
}

// ---- document loading (with gateway fallback) --------------------------------

const docCache = new Map<number, Promise<PDFDocumentProxy>>();

function loadFromUrl(lib: Pdfjs, url: string): Promise<PDFDocumentProxy> {
  const task = lib.getDocument({
    url,
    // Stream page-by-page instead of pulling the entire multi-MB file.
    disableAutoFetch: true,
    disableStream: false,
    rangeChunkSize: 262144,
    // Comic zines carry no fonts/CMaps we need to fetch remotely.
    isEvalSupported: false,
  });
  return task.promise;
}

/** Load an issue's document, trying each IPFS gateway in turn. Cached per issue. */
export function loadDocument(
  issueNumber: number,
  urls: string[],
): Promise<PDFDocumentProxy> {
  const cached = docCache.get(issueNumber);
  if (cached) return cached;

  const attempt = (async () => {
    const lib = await getPdfjs();
    let lastErr: unknown;
    for (const url of urls) {
      try {
        return await withTimeout(loadFromUrl(lib, url), 20000);
      } catch (err) {
        lastErr = err;
      }
    }
    throw lastErr ?? new Error("Could not open this issue.");
  })();

  // Don't cache a rejected load — let a later retry start fresh.
  attempt.catch(() => docCache.delete(issueNumber));
  docCache.set(issueNumber, attempt);
  return attempt;
}

function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error("timeout")), ms);
    p.then(
      (v) => {
        clearTimeout(t);
        resolve(v);
      },
      (e) => {
        clearTimeout(t);
        reject(e);
      },
    );
  });
}

// ---- page rendering (with an LRU of object URLs) -----------------------------

export type RenderedPage = { url: string; width: number; height: number };

const MAX_CACHED_PAGES = 28;
const pageCache = new Map<string, RenderedPage>();
const inflight = new Map<string, Promise<RenderedPage>>();

// Bucket the requested width so a few px of resize doesn't invalidate the cache.
function bucket(cssWidth: number): number {
  return Math.min(1600, Math.max(600, Math.ceil(cssWidth / 200) * 200));
}

function evictIfNeeded() {
  while (pageCache.size > MAX_CACHED_PAGES) {
    const oldestKey = pageCache.keys().next().value as string | undefined;
    if (oldestKey === undefined) break;
    const old = pageCache.get(oldestKey);
    pageCache.delete(oldestKey);
    if (old) URL.revokeObjectURL(old.url);
  }
}

/**
 * Render one page of an issue to an object URL, sized to fit `cssWidth`
 * (device-pixel-ratio aware, capped). Results are cached and de-duplicated.
 */
export async function renderPage(
  doc: PDFDocumentProxy,
  issueNumber: number,
  pageNumber: number,
  cssWidth: number,
): Promise<RenderedPage> {
  const targetPx = Math.floor(bucket(cssWidth) * Math.min(2, dpr()));
  const key = `${issueNumber}:${pageNumber}:${targetPx}`;

  const hit = pageCache.get(key);
  if (hit) {
    // Touch for LRU recency.
    pageCache.delete(key);
    pageCache.set(key, hit);
    return hit;
  }
  const pending = inflight.get(key);
  if (pending) return pending;

  const job = (async () => {
    const page = await doc.getPage(pageNumber);
    const base = page.getViewport({ scale: 1 });
    const scale = targetPx / base.width;
    const viewport = page.getViewport({ scale });

    const canvas = document.createElement("canvas");
    canvas.width = Math.floor(viewport.width);
    canvas.height = Math.floor(viewport.height);
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) throw new Error("no 2d context");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const params: RenderParameters = { canvasContext: ctx, viewport };
    await page.render(params).promise;
    page.cleanup();

    const blob = await new Promise<Blob | null>((res) =>
      canvas.toBlob(res, "image/webp", 0.9),
    );
    if (!blob) throw new Error("encode failed");
    const rendered: RenderedPage = {
      url: URL.createObjectURL(blob),
      width: canvas.width,
      height: canvas.height,
    };
    pageCache.set(key, rendered);
    evictIfNeeded();
    return rendered;
  })();

  inflight.set(key, job);
  job.finally(() => inflight.delete(key));
  return job;
}

function dpr(): number {
  return typeof window === "undefined" ? 1 : window.devicePixelRatio || 1;
}
