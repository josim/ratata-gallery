import type { Metadata } from "next";
import Link from "next/link";
import { getLang, getStrings } from "@/lib/lang";
import { getUpcomingEntries } from "@/lib/upcoming";
import PageHero from "@/components/PageHero";

export function generateMetadata(): Metadata {
  const strings = getStrings();
  return {
    title: `${strings.site.name} - ${strings.pages.upcoming.heading}`,
    description: strings.pages.upcoming.description,
  };
}

export default function UpcomingPage() {
  const strings = getStrings();
  const entries = getUpcomingEntries(getLang(), strings);

  return (
    <div>
      <PageHero
        eyebrow={strings.pages.upcoming.eyebrow}
        title={strings.pages.upcoming.heading}
        intro={strings.pages.upcoming.intro}
      />

      {/* Index view (DESIGN.md §4.4): DATE · title · venue/city, hairline
          rows, tabular-nums — complete-looking with or without images. */}
      <ul className="border-t border-line">
        {entries.map((entry) => (
          <li key={entry.key} className="border-b border-line">
            <Link
              href={entry.href}
              className="group grid gap-2 py-6 sm:grid-cols-[11rem_1fr_auto] sm:items-baseline sm:gap-6"
            >
              <span className="text-meta uppercase text-ink-muted [font-variant-numeric:tabular-nums]">
                {entry.dates}
              </span>
              <span>
                <span className="font-serif text-title-m font-medium text-ink transition-colors duration-150 ease-out group-hover:text-accent">
                  {entry.title}
                </span>
                {entry.place && (
                  <span className="mt-1 block text-meta uppercase text-ink-muted">
                    {entry.place}
                  </span>
                )}
              </span>
              <span
                aria-hidden="true"
                className="hidden text-body text-ink-muted transition-colors duration-150 ease-out group-hover:text-accent sm:block"
              >
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
