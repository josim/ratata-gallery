// Prepares The Frame artwork previews for the website:
// - re-encodes each token's display image (max 800px wide, webp) into
//   public/images/the-frame/{basel,brussels}/
// - prints the artworkSections frontmatter YAML for content/projects/the-frame.mdx
//
// Tokens whose creator has no alias are left off the site for now, except
// where OVERRIDES supplies the artist name.
//
// Usage (from web-app root, needs sharp): node scripts/getdata/build_site_assets.mjs

import { readFile, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(HERE, '..', '..', 'public', 'images', 'the-frame');

const SOURCES = [
  { key: 'basel', heading: 'Art Meta Basel 2024', file: 'theframe_basel.json' },
  { key: 'brussels', heading: 'TezDev Brussels 2024', file: 'theframe_burssels.json' },
];

const OVERRIDES = { 'A Pinch of Sunset': 'silentman' };

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

async function exists(p) {
  try {
    return (await stat(p)).size > 0;
  } catch {
    return false;
  }
}

const yaml = ['artworkSections:'];
const skipped = [];

for (const source of SOURCES) {
  const raw = JSON.parse(await readFile(path.join(HERE, source.file), 'utf8'));
  const tokens = raw.data.token;
  const assetDir = path.join(HERE, 'assets', source.key);
  const outDir = path.join(PUBLIC_DIR, source.key);
  await mkdir(outDir, { recursive: true });

  yaml.push(`  - heading: ${JSON.stringify(source.heading)}`);
  yaml.push('    items:');

  for (const [i, token] of tokens.entries()) {
    const alias = token.creators?.[0]?.holder?.alias;
    const artist = OVERRIDES[token.name] || alias;
    if (!artist) {
      skipped.push(`${source.key}: ${token.name}`);
      continue;
    }

    const num = String(i + 1).padStart(2, '0');
    const base = `${num}-${slugify(token.name, `token-${num}`)}`;
    const displaySrc = path.join(assetDir, `${base}-display.png`);
    const artifactSrc = path.join(assetDir, `${base}${EXT_BY_MIME[token.mime] || ''}`);
    const src = (await exists(displaySrc))
      ? displaySrc
      : token.mime?.startsWith('image/') && (await exists(artifactSrc))
        ? artifactSrc
        : null;
    if (!src) {
      skipped.push(`${source.key}: ${token.name} (no image source)`);
      continue;
    }

    const outFile = `${base}.webp`;
    await sharp(src)
      .resize({ width: 800, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(path.join(outDir, outFile));

    yaml.push(`      - title: ${JSON.stringify(token.name)}`);
    yaml.push(`        artist: ${JSON.stringify(artist)}`);
    yaml.push(`        image: ${JSON.stringify(`/images/the-frame/${source.key}/${outFile}`)}`);
  }
}

console.log(yaml.join('\n'));
console.error(`\nSkipped (no artist name yet):\n${skipped.map((s) => `  - ${s}`).join('\n')}`);
