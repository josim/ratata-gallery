// Reader model for the Slothzine Reading Room (app/slothzine).
//
// Source of truth is data/slothzines.json (the minted-NFT metadata). The zine
// PDFs themselves are ~1.5 GB in total and are NOT shipped with the site — the
// reader streams each one, page by page, from IPFS via range requests. Covers
// are the already-optimized webp masters in /public/images/slothzine, so the
// first impression of every issue paints instantly while its pages load.

import raw from "@/data/slothzines.json";

export type SlothIssue = {
  number: number;
  /** Short title, e.g. "November 2025" (the month the issue collects). */
  monthLabel: string;
  /** IPFS content id of the zine PDF. */
  cid: string;
  /** Ordered gateway URLs to try for the PDF (range-request friendly). */
  pdfUrls: string[];
  /** Local optimized cover master — paints immediately. */
  cover: string;
  /** Editorial page on Teia (the honest "buy / collect" trail). */
  teiaUrl: string;
  /** Contributing artists, parsed from the mint description. */
  artists: string[];
  /** PDF size in bytes — shown as an honest "weight" of the issue. */
  fileSize: number;
};

type RawIssue = {
  number: number;
  name: string;
  description: string;
  artifactUri: string;
  teiaUrl: string;
  fileSize: number;
};

// Range-request friendly public gateways, tried in order. All send
// Access-Control-Allow-Origin:* and honor HTTP Range, which lets pdf.js pull
// only the bytes of the page you are actually reading.
const GATEWAYS = [
  "https://ipfs.io/ipfs/",
  "https://dweb.link/ipfs/",
  "https://cloudflare-ipfs.com/ipfs/",
];

// "Sloth #42 - November 2025" -> "November 2025"
function monthFromName(name: string): string {
  const dash = name.split(/\s[-—]\s/);
  return (dash[1] ?? name).trim();
}

// The description lists contributors one per line as "Name (@handle)". Pull the
// human names out of the block that follows an "Artists:" header (falling back
// to any parenthesised-handle lines when the header is absent).
function artistsFromDescription(description: string): string[] {
  const lines = description.split("\n").map((l) => l.trim());
  const names: string[] = [];
  const stop = /^(twitter|instagram|cover|created by|\d{4}$)/i;
  let inList = false;

  for (const line of lines) {
    if (/^artists:/i.test(line)) {
      inList = true;
      continue;
    }
    if (!line) continue;
    if (stop.test(line)) {
      if (inList) break;
      continue;
    }
    const looksLikeContributor = /\(@?[^)]+\)/.test(line) || inList;
    if (!looksLikeContributor) continue;
    const name = line.replace(/\s*\(@?[^)]*\)\s*$/, "").trim();
    if (name && !/zine!?$/i.test(name)) names.push(name);
  }
  return names;
}

function toIssue(r: RawIssue): SlothIssue {
  const cid = r.artifactUri.replace(/^ipfs:\/\//, "");
  return {
    number: r.number,
    monthLabel: monthFromName(r.name),
    cid,
    pdfUrls: GATEWAYS.map((g) => g + cid),
    cover: `/images/slothzine/sloth-${r.number}.webp`,
    teiaUrl: r.teiaUrl,
    artists: artistsFromDescription(r.description),
    fileSize: r.fileSize,
  };
}

// Newest issue first — the archive reads back through time, and "the latest"
// is the natural front of the shelf.
export const slothIssues: SlothIssue[] = (raw as RawIssue[])
  .map(toIssue)
  .sort((a, b) => b.number - a.number);

export const issueCount = slothIssues.length;

const first = slothIssues[slothIssues.length - 1];
const last = slothIssues[0];

// "May 2022" / "July 2026" — the span the archive covers, for the hero.
export const archiveSpan = {
  from: first.monthLabel,
  to: last.monthLabel,
};

// Total pounds of paper, so to speak — sum of every PDF, shown once as a
// tactile fact about how much zine there is to read.
export const totalBytes = slothIssues.reduce((sum, i) => sum + i.fileSize, 0);
