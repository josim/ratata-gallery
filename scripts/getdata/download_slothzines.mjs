import { createWriteStream } from "node:fs";
import { access, mkdir, rename, rm, stat, writeFile } from "node:fs/promises";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import path from "node:path";
import process from "node:process";

const CREATOR = "tz1gw1zX1MRDBoh9CrefzkJx8qhuqaTQ7jEm";
const TZKT_API = "https://api.tzkt.io/v1/tokens";
const ISSUE_COUNT = 50;
const IPFS_GATEWAY = (
  process.env.SLOTHZINE_IPFS_GATEWAY ?? "https://ipfs.io/ipfs/"
).replace(/\/?$/, "/");
const root = process.cwd();
const metadataPath = path.join(root, "data", "slothzines.json");
const pdfDirectory = path.join(root, "public", "slothzines", "pdfs");

function ipfsToHttp(uri) {
  if (!uri?.startsWith("ipfs://")) {
    throw new Error(`Expected an IPFS URI, received: ${uri ?? "(missing)"}`);
  }

  return `${IPFS_GATEWAY}${uri.slice("ipfs://".length)}`;
}

function issueNumber(token) {
  const match = token.metadata?.name?.match(/^sloth\s*#(\d+)/i);
  return match ? Number(match[1]) : null;
}

async function fetchWithRetry(url, options = {}, attempts = 4) {
  let lastError;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, {
        ...options,
        signal: AbortSignal.timeout(120_000),
      });

      if (response.ok) return response;
      if (response.status < 500 && response.status !== 429) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      lastError = new Error(`${response.status} ${response.statusText}`);
    } catch (error) {
      lastError = error;
    }

    if (attempt < attempts) {
      await new Promise((resolve) => setTimeout(resolve, attempt * 1_500));
    }
  }

  throw new Error(`Request failed for ${url}: ${lastError?.message}`);
}

async function getIssues() {
  const query = new URLSearchParams({
    firstMinter: CREATOR,
    limit: "100",
    "sort.desc": "firstLevel",
  });
  const response = await fetchWithRetry(`${TZKT_API}?${query}`);
  const tokens = await response.json();
  const unique = new Map();

  // TzKT returns newest first. Keeping the first token for an issue removes
  // accidental/reminted duplicates while retaining the canonical Teia objkt.
  for (const token of tokens) {
    const number = issueNumber(token);
    const artifactUri = token.metadata?.artifactUri;
    const pdf = token.metadata?.formats?.find(
      (format) => format.mimeType === "application/pdf",
    );

    if (
      number === null ||
      number < 1 ||
      number > ISSUE_COUNT ||
      !artifactUri ||
      !pdf ||
      unique.has(number)
    ) {
      continue;
    }

    const displayUri = token.metadata.displayUri ?? token.metadata.thumbnailUri;
    unique.set(number, {
      number,
      tokenId: token.tokenId,
      contract: token.contract.address,
      name: token.metadata.name,
      description: token.metadata.description ?? "",
      tags: Array.isArray(token.metadata.tags) ? token.metadata.tags : [],
      artifactUri,
      artifactUrl: ipfsToHttp(artifactUri),
      displayUri,
      displayUrl: displayUri ? ipfsToHttp(displayUri) : null,
      teiaUrl: `https://teia.art/objkt/${token.tokenId}`,
      localPdfUrl: `/slothzines/pdfs/sloth-${number}.pdf`,
      mimeType: pdf.mimeType,
      fileName: pdf.fileName ?? `sloth-${number}.pdf`,
      fileSize: pdf.fileSize ? Number(pdf.fileSize) : null,
      mintedAt: token.firstTime,
    });
  }

  const issues = [...unique.values()].sort((a, b) => b.number - a.number);
  const missing = Array.from(
    { length: ISSUE_COUNT },
    (_, index) => index + 1,
  ).filter((number) => !unique.has(number));

  if (missing.length > 0) {
    throw new Error(`TzKT response is missing Slothzine issues: ${missing.join(", ")}`);
  }

  return issues;
}

async function fileIsComplete(filePath, expectedSize) {
  try {
    const file = await stat(filePath);
    return expectedSize ? file.size === expectedSize : file.size > 0;
  } catch {
    return false;
  }
}

async function downloadPdf(issue) {
  const outputPath = path.join(pdfDirectory, `sloth-${issue.number}.pdf`);
  const partialPath = `${outputPath}.part`;

  if (await fileIsComplete(outputPath, issue.fileSize)) {
    console.log(`✓ Sloth #${issue.number} already downloaded`);
    return;
  }

  await rm(partialPath, { force: true });
  const response = await fetchWithRetry(issue.artifactUrl);
  if (!response.body) throw new Error(`Empty PDF response for Sloth #${issue.number}`);

  await pipeline(
    Readable.fromWeb(response.body),
    createWriteStream(partialPath, { flags: "wx" }),
  );

  if (!(await fileIsComplete(partialPath, issue.fileSize))) {
    const downloaded = await stat(partialPath);
    await rm(partialPath, { force: true });
    throw new Error(
      `Incomplete Sloth #${issue.number}: downloaded ${downloaded.size}, expected ${issue.fileSize}`,
    );
  }

  await rename(partialPath, outputPath);
  console.log(`↓ Sloth #${issue.number} downloaded`);
}

async function runPool(items, concurrency, task) {
  let cursor = 0;
  const workers = Array.from({ length: concurrency }, async () => {
    while (cursor < items.length) {
      const item = items[cursor];
      cursor += 1;
      await task(item);
    }
  });
  await Promise.all(workers);
}

await mkdir(path.dirname(metadataPath), { recursive: true });
await mkdir(pdfDirectory, { recursive: true });

const issues = await getIssues();
await writeFile(metadataPath, `${JSON.stringify(issues, null, 2)}\n`, "utf8");
await runPool(issues, 3, downloadPdf);

// Fail loudly if an interrupted earlier run left partial files behind.
await access(metadataPath);
console.log(`Saved ${issues.length} issues to ${path.relative(root, metadataPath)}`);
