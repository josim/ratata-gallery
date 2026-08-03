import Link from "next/link";
import BrandWordmark from "@/components/BrandWordmark";
import { getStrings } from "@/lib/lang";

// Dark footer band of the "Zwei Spuren" homepage (docs/Redesign_2a handoff
// §8). Keeps the live site's Impressum/Datenschutz links alongside the
// design's social row.
export default function HomeFooter() {
  const s = getStrings();

  const links = [
    {
      label: "info@ratata.gallery",
      href: "mailto:info@ratata.gallery",
      external: false,
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/ratata.gallery/",
      external: true,
    },
    { label: "X", href: "https://x.com/ratata_nft", external: true },
    { label: "YouTube", href: s.footer.youtubeUrl, external: true },
  ];

  return (
    <footer className="spur-dark flex flex-col justify-between gap-8 bg-spur-ink px-5 py-8 font-mono text-[11px] tracking-[0.08em] text-spur-dark-mut md:px-10 duo:flex-row duo:items-end">
      <div>
        <Link href="/" className="inline-flex">
          <BrandWordmark
            title={s.site.wordmark}
            className="h-10 w-auto text-spur-paper"
          />
        </Link>
        <p className="mt-2">{s.home.tagline}</p>
      </div>
      <div className="flex flex-wrap items-baseline gap-x-[22px] gap-y-2 uppercase">
        {links.map((link) =>
          link.external ? (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-150 hover:text-spur-accent-dark"
            >
              {link.label}
            </a>
          ) : (
            <a
              key={link.label}
              href={link.href}
              className="normal-case transition-colors duration-150 hover:text-spur-accent-dark"
            >
              {link.label}
            </a>
          )
        )}
        <Link
          href="/impressum"
          className="transition-colors duration-150 hover:text-spur-accent-dark"
        >
          {s.footer.impressum}
        </Link>
        <Link
          href="/datenschutz"
          className="transition-colors duration-150 hover:text-spur-accent-dark"
        >
          {s.footer.datenschutz}
        </Link>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
