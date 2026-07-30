import { getStrings } from "@/lib/lang";
import type { ProjectLink } from "@/lib/projects";

// Source tag derived from the link's own domain (DESIGN.md §5.8: OBJKT · X ·
// PRESS · MALLOW) — no extra frontmatter field needed.
function sourceTag(url: string): string {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    if (host.includes("objkt.com")) return "OBJKT";
    if (host.includes("teia.art")) return "TEIA";
    if (host.includes("x.com") || host.includes("twitter.com")) return "X";
    if (host.includes("mallow.art")) return "MALLOW";
    if (host.includes("infiniteink.art")) return "INFINITEINK";
    if (host.includes("8scribo.xyz")) return "8SCRIBO";
    if (host.includes("farcaster") || host.includes("warpcast.com"))
      return "FARCASTER";
  } catch {
    // malformed URL — fall through to the default tag
  }
  return "PRESS";
}

// Social post links are grouped separately so press and collection links
// aren't buried under long lists of X posts.
function isSocial(url: string): boolean {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    return ["x.com", "twitter.com", "instagram.com", "farcaster.xyz", "warpcast.com", "youtube.com"].some(
      (social) => host === social || host.endsWith(`.${social}`)
    );
  } catch {
    return false;
  }
}

function isCrypto(url: string): boolean {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    return [
      "objkt.com",
      "objkt.media",
      "teia.art",
      "mallow.art",
      "fxhash.xyz",
      "versum.xyz",
      "infiniteink.art",
      "8scribo.xyz",
    ].some((crypto) => host === crypto || host.endsWith(`.${crypto}`));
  } catch {
    return false;
  }
}

function LinkRows({ links }: { links: ProjectLink[] }) {
  return (
    <ul className="border-t border-line">
      {links.map((link) => (
        <li
          key={link.url}
          className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1 border-b border-line py-3"
        >
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="min-w-0 text-body text-accent underline decoration-1 underline-offset-[0.15em] hover:text-accent-hover hover:decoration-2"
          >
            {link.label} <span aria-hidden="true">↗</span>
          </a>
          <span className="whitespace-nowrap text-meta uppercase text-ink-muted">
            {sourceTag(link.url)}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function LinksList({ links }: { links: ProjectLink[] }) {
  if (!links.length) return null;

  const strings = getStrings();
  const social = links.filter((link) => isSocial(link.url));
  const crypto = links.filter((link) => isCrypto(link.url));
  const press = links.filter(
    (link) => !isSocial(link.url) && !isCrypto(link.url)
  );

  const groups = [
    { heading: strings.project.linksPress, items: press },
    { heading: strings.project.linksSocial, items: social },
    { heading: strings.project.linksCrypto, items: crypto },
  ].filter((group) => group.items.length > 0);

  return (
    <section className="space-y-4">
      <h2 className="font-serif text-title-s font-medium text-ink">
        {strings.project.linksHeading}
      </h2>
      {groups.length === 1 ? (
        <LinkRows links={groups[0].items} />
      ) : (
        groups.map((group) => (
          <div key={group.heading}>
            <h3 className="mb-2 text-meta uppercase text-ink-muted">
              {group.heading}
            </h3>
            <LinkRows links={group.items} />
          </div>
        ))
      )}
    </section>
  );
}
