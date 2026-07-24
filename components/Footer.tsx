import Link from "next/link";
import { strings } from "@/lib/strings";
import { NAV_ITEMS } from "@/lib/nav";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper-sunk">
      <div className="mx-auto grid max-w-container gap-10 px-[clamp(20px,5vw,64px)] py-16 sm:grid-cols-3">
        <div className="space-y-3">
          <Link href="/" className="flex items-baseline gap-1">
            <span className="font-serif text-[1.25rem] font-medium tracking-[-0.01em] text-ink">
              {strings.site.wordmark}
            </span>
            <span className="text-meta uppercase text-ink-muted">
              {strings.site.wordmarkSuffix}
            </span>
          </Link>
          <p className="max-w-[32ch] text-body-s text-ink-secondary">
            {strings.site.tagline}
          </p>
        </div>

        <nav aria-label="Site map" className="flex flex-col gap-3 text-body-s">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-ink-secondary underline-offset-4 hover:underline"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3 text-body-s">
          <Link
            href="/impressum"
            className="text-ink-secondary underline-offset-4 hover:underline"
          >
            {strings.footer.impressum}
          </Link>
          <Link
            href="/datenschutz"
            className="text-ink-secondary underline-offset-4 hover:underline"
          >
            {strings.footer.datenschutz}
          </Link>
          <a
            href={`mailto:${strings.tezcon.contactEmail}`}
            className="text-ink-secondary underline-offset-4 hover:underline"
          >
            {strings.tezcon.contactEmail}
          </a>
          <a
            href={strings.footer.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink-secondary underline-offset-4 hover:underline"
          >
            {strings.footer.youtube}
          </a>
        </div>
      </div>

      <div className="border-t border-line px-[clamp(20px,5vw,64px)] py-6">
        <p className="mx-auto max-w-container text-meta uppercase text-ink-muted">
          {strings.footer.copyright}
        </p>
      </div>
    </footer>
  );
}
