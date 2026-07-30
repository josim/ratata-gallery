import Image from "next/image";
import type { Lang } from "@/lib/strings";
import { slothzineIssues } from "@/lib/slothzines";

const copy = {
  en: {
    filmEyebrow: "Continuous screening · approximately 4 hours",
    filmHeading: "A deliberately slow way to read a growing archive.",
    filmBody:
      "For TezCon Seattle, ratata assembled the Slothzine issues published up to the event into one uninterrupted film. The long format carried the zine’s laid-back rhythm onto the exhibition screens without asking visitors to begin at a fixed point.",
    durationLabel: "Duration",
    filmStatLabel: "TezCon presentation",
    filmStatValue: "Issues published by 1 June 2024",
    filmAction: "Watch the complete film on YouTube",
    wallEyebrow: "Living archive · May 2022—July 2026",
    wallHeading: "The Slothzine reading wall",
    wallBody:
      "The series has continued since TezCon. This wall shows all 50 issues currently published by Slothzine; each cover opens its edition on Teia.",
    countLabel: "50 issues",
    issueLink: "View on Teia",
  },
  de: {
    filmEyebrow: "Durchgehende Projektion · etwa 4 Stunden",
    filmHeading: "Ein bewusst langsamer Weg durch ein wachsendes Archiv.",
    filmBody:
      "Für die TezCon Seattle montierte ratata die bis zur Veranstaltung erschienenen Slothzine-Ausgaben zu einem ununterbrochenen Film. Das lange Format übertrug den gelassenen Rhythmus des Zines auf die Ausstellungsdisplays, ohne einen festen Einstiegspunkt vorzugeben.",
    durationLabel: "Laufzeit",
    filmStatLabel: "Präsentation zur TezCon",
    filmStatValue: "Bis 1. Juni 2024 erschienene Ausgaben",
    filmAction: "Den vollständigen Film auf YouTube ansehen",
    wallEyebrow: "Lebendiges Archiv · Mai 2022—Juli 2026",
    wallHeading: "Die Slothzine Reading Wall",
    wallBody:
      "Die Reihe wurde nach der TezCon fortgeführt. Diese Wand zeigt alle 50 derzeit veröffentlichten Slothzine-Ausgaben; jedes Cover führt zur jeweiligen Edition auf Teia.",
    countLabel: "50 Ausgaben",
    issueLink: "Auf Teia ansehen",
  },
} satisfies Record<Lang, Record<string, string>>;

export default function SlothzineCatalogue({ lang }: { lang: Lang }) {
  const text = copy[lang];

  return (
    <div className="space-y-20 md:space-y-24">
      <section
        aria-labelledby="slothzine-film-heading"
        className="border-y border-line bg-paper-sunk px-6 py-10 md:grid md:grid-cols-12 md:gap-8 md:px-8 md:py-12"
      >
        <div className="md:col-span-7">
          <p className="text-meta uppercase text-ink-muted">
            {text.filmEyebrow}
          </p>
          <h2
            id="slothzine-film-heading"
            className="mt-4 max-w-[18ch] font-serif text-title-l font-medium text-ink"
          >
            {text.filmHeading}
          </h2>
          <p className="mt-5 max-w-measure text-body text-ink-secondary">
            {text.filmBody}
          </p>
          <a
            href="https://www.youtube.com/watch?v=G6K3LOE7cwo&t=684s"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex min-h-12 items-center border border-accent px-4 py-3 text-nav text-accent underline decoration-1 underline-offset-[0.18em] transition-colors duration-150 hover:bg-accent-tint hover:text-accent-hover hover:decoration-2"
          >
            {text.filmAction} <span aria-hidden="true" className="ml-2">↗</span>
          </a>
        </div>
        <dl className="mt-10 border-t border-line md:col-span-4 md:col-start-9 md:mt-0">
          <div className="border-b border-line py-4">
            <dt className="text-meta uppercase text-ink-muted">
              {text.durationLabel}
            </dt>
            <dd className="mt-2 font-serif text-[clamp(2.5rem,5vw,4rem)] font-normal leading-none tracking-[-0.02em] text-ink">
              04:00:00
            </dd>
          </div>
          <div className="border-b border-line py-4">
            <dt className="text-meta uppercase text-ink-muted">
              {text.filmStatLabel}
            </dt>
            <dd className="mt-2 text-body text-ink">{text.filmStatValue}</dd>
          </div>
        </dl>
      </section>

      <section aria-labelledby="slothzine-wall-heading">
        <div className="grid gap-6 border-t border-line pt-8 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <p className="text-meta uppercase text-ink-muted">
              {text.wallEyebrow}
            </p>
            <h2
              id="slothzine-wall-heading"
              className="mt-3 font-serif text-title-l font-medium text-ink"
            >
              {text.wallHeading}
            </h2>
            <p className="mt-4 max-w-measure text-body text-ink-secondary">
              {text.wallBody}
            </p>
          </div>
          <p className="self-end text-meta uppercase text-ink-muted md:col-span-5 md:text-right">
            {text.countLabel}
          </p>
        </div>

        <ol className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-5">
          {slothzineIssues.map((issue) => (
            <li key={issue.objkt}>
              <a
                href={`https://teia.art/objkt/${issue.objkt}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${issue.title} — ${text.issueLink}`}
                className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                <span className="relative block aspect-square overflow-hidden border border-line bg-card">
                  <Image
                    src={`/images/slothzine/sloth-${issue.number}.webp`}
                    alt={`Cover of ${issue.title}`}
                    fill
                    sizes="(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 46vw"
                    className="object-cover transition-opacity duration-150 group-hover:opacity-90"
                  />
                </span>
                <span className="mt-3 block border-t border-line pt-2">
                  <span className="block text-meta uppercase text-ink-muted">
                    No. {issue.number.toString().padStart(2, "0")}
                  </span>
                  <span className="mt-1 block text-body-s text-ink group-hover:text-accent">
                    {issue.title.replace(/^Sloth #\d+ — /i, "")}
                    <span aria-hidden="true"> ↗</span>
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
