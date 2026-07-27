// Downloads all token assets from the two The Frame contract exports
// (theframe_basel.json / theframe_burssels.json) and writes a review
// markdown file (theframe_assets.md) with name / description / artist / asset.
//
// Usage: node scripts/getdata/download_assets.mjs

import { readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import { createWriteStream } from 'node:fs';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));

const SOURCES = [
  { key: 'basel', label: 'The Frame — Art Basel', file: 'theframe_basel.json' },
  { key: 'brussels', label: 'The Frame — Brussels', file: 'theframe_burssels.json' },
];

const GATEWAYS = [
  'https://ipfs.io/ipfs/',
  'https://dweb.link/ipfs/',
  'https://nftstorage.link/ipfs/',
];

const CONCURRENCY = 4;
const TIMEOUT_MS = 120_000;

const EXT_BY_MIME = {
  'image/png': '.png',
  'image/jpg': '.jpg',
  'image/jpeg': '.jpg',
  'image/gif': '.gif',
  'image/webp': '.webp',
  'video/mp4': '.mp4',
  'video/quicktime': '.mov',
};

function slugify(name, fallback) {
  const slug = (name || '')
    .normalize('NFKD')
    .replace(/[^\x00-\x7F]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
    .slice(0, 60);
  return slug || fallback;
}

function artistOf(token) {
  const names = (token.creators || [])
    .map((c) => c.holder?.alias || c.creator_address)
    .filter(Boolean);
  return names.join(', ') || 'unknown';
}

async function download(ipfsUri, destPath) {
  const cid = ipfsUri.replace('ipfs://', '');
  try {
    const s = await stat(destPath);
    if (s.size > 0) return 'cached';
  } catch {}
  let lastErr;
  for (const gw of GATEWAYS) {
    try {
      const res = await fetch(gw + cid, { signal: AbortSignal.timeout(TIMEOUT_MS) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await pipeline(Readable.fromWeb(res.body), createWriteStream(destPath));
      return 'ok';
    } catch (err) {
      lastErr = err;
    }
  }
  throw new Error(`all gateways failed for ${ipfsUri}: ${lastErr?.message}`);
}

async function runPool(jobs, limit) {
  const queue = [...jobs];
  const workers = Array.from({ length: limit }, async () => {
    while (queue.length) await queue.shift()();
  });
  await Promise.all(workers);
}

const failures = [];
const sections = [];

for (const source of SOURCES) {
  const raw = JSON.parse(await readFile(path.join(HERE, source.file), 'utf8'));
  const tokens = raw.data.token;
  const assetDir = path.join(HERE, 'assets', source.key);
  await mkdir(assetDir, { recursive: true });

  const entries = tokens.map((token, i) => {
    const num = String(i + 1).padStart(2, '0');
    const base = `${num}-${slugify(token.name, `token-${num}`)}`;
    const artifactExt = EXT_BY_MIME[token.mime] || '';
    const entry = {
      token,
      artist: artistOf(token),
      artifactFile: token.artifact_uri ? `${base}${artifactExt}` : null,
      displayFile:
        token.display_uri && token.display_uri !== token.artifact_uri
          ? `${base}-display.png`
          : null,
    };
    return entry;
  });

  const jobs = [];
  for (const e of entries) {
    if (e.artifactFile)
      jobs.push(() =>
        download(e.token.artifact_uri, path.join(assetDir, e.artifactFile)).then(
          (r) => console.log(`[${source.key}] ${r === 'cached' ? 'cached ' : 'fetched'} ${e.artifactFile}`),
          (err) => {
            failures.push(`${source.key}/${e.artifactFile}: ${err.message}`);
            e.artifactFile = null;
          },
        ),
      );
    if (e.displayFile)
      jobs.push(() =>
        download(e.token.display_uri, path.join(assetDir, e.displayFile)).then(
          (r) => console.log(`[${source.key}] ${r === 'cached' ? 'cached ' : 'fetched'} ${e.displayFile}`),
          (err) => {
            failures.push(`${source.key}/${e.displayFile}: ${err.message}`);
            e.displayFile = null;
          },
        ),
      );
  }
  await runPool(jobs, CONCURRENCY);

  const lines = [`## ${source.label}`, '', `${tokens.length} tokens · source: \`${source.file}\``, ''];
  entries.forEach((e, i) => {
    const t = e.token;
    lines.push(`### ${i + 1}. ${t.name || 'Untitled'}`);
    lines.push('');
    lines.push(`- **Artist:** ${e.artist}`);
    lines.push(`- **Mime:** ${t.mime} · **Supply:** ${t.supply} · **Minted:** ${t.timestamp}`);
    if (e.artifactFile) lines.push(`- **Asset:** [assets/${source.key}/${e.artifactFile}](assets/${source.key}/${e.artifactFile})`);
    if (e.displayFile) lines.push(`- **Preview:** [assets/${source.key}/${e.displayFile}](assets/${source.key}/${e.displayFile})`);
    lines.push(`- **IPFS:** \`${t.artifact_uri}\``);
    lines.push('');
    lines.push('**Description:**');
    lines.push('');
    lines.push((t.description || '_none_').trim().split('\n').map((l) => `> ${l}`).join('\n'));
    lines.push('');
    const img = e.displayFile || (t.mime?.startsWith('image/') ? e.artifactFile : null);
    if (img) {
      lines.push(`<img src="assets/${source.key}/${img}" width="400" alt="${(t.name || '').replace(/"/g, '')}">`);
      lines.push('');
    }
  });
  sections.push(lines.join('\n'));
}

const md = [
  '# The Frame — asset review',
  '',
  `Generated from the two The Frame contract exports (Basel & Brussels).`,
  '',
  sections.join('\n\n---\n\n'),
  '',
].join('\n');

await writeFile(path.join(HERE, 'theframe_assets.md'), md);
console.log(`\nWrote theframe_assets.md`);
if (failures.length) {
  console.log(`\n${failures.length} downloads FAILED:`);
  failures.forEach((f) => console.log(`  - ${f}`));
} else {
  console.log('All downloads succeeded.');
}
