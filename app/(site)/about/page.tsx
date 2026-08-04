import type { Metadata } from "next";
import Image from "next/image";
import { getStrings } from "@/lib/lang";
import PageHero from "@/components/PageHero";

const PARTNER_ORDER = [
  "Galerie Greulich",
  "Merzmensch",
  "Tezos Commons",
  "thetezos.com",
  "AI Hub Frankfurt",
  "theVERSEverse",
  "teia.cafe",
  "Tesserart",
  "HOXID",
  "TZ APAC",
  "Der MIXER",
  "Luca Martinelli — Vandalo Ruins",
];

export function generateMetadata(): Metadata {
  const strings = getStrings();
  return {
    title: `${strings.site.name} - ${strings.about.heading}`,
    description: strings.about.body,
  };
}

export default function AboutPage() {
  const strings = getStrings();
  const partners = [...strings.about.partners].sort(
    (a, b) => PARTNER_ORDER.indexOf(a.name) - PARTNER_ORDER.indexOf(b.name)
  );

  return (
    <div>
      <PageHero title={strings.about.heading} intro={strings.about.body} />

      <section aria-labelledby="people-heading">
        <h2
          id="people-heading"
          className="border-b border-line pb-4 font-serif text-title-m font-medium text-ink"
        >
          {strings.about.peopleHeading}
        </h2>
        <div className="grid gap-10 pt-8 md:grid-cols-2 md:gap-16">
          {strings.about.people.map((person) => (
            <article key={person.name}>
              <p className="text-meta uppercase text-ink-muted">{person.role}</p>
              <h3 className="mt-2 font-serif text-title-l font-medium text-ink">
                {person.name}
              </h3>
              <p className="mt-4 max-w-measure text-body text-ink-secondary">
                {person.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="roots-heading"
        className="mt-16 border-t border-line pt-12 md:mt-24 md:grid md:grid-cols-12 md:gap-8 md:pt-16"
      >
        <h2
          id="roots-heading"
          className="font-serif text-title-m font-medium text-ink md:col-span-4"
        >
          {strings.about.rootsHeading}
        </h2>
        <div className="mt-5 md:col-span-8 md:mt-0">
          <p className="max-w-measure text-body text-ink-secondary">
            {strings.about.rootsBody}
          </p>

          <div className="mt-8 border-t border-line">
            <h3 className="py-3 text-meta uppercase text-ink-muted">
              {strings.about.archiveHeading}
            </h3>
            <ul>
              {strings.about.archiveLinks.map((link) => (
                <li key={link.url} className="border-t border-line py-3">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-body text-accent underline decoration-1 underline-offset-[0.15em] hover:text-accent-hover hover:decoration-2"
                  >
                    {link.label} <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        id="partners"
        aria-labelledby="partners-heading"
        className="mt-16 scroll-mt-24 border-t border-line pt-12 md:mt-24 md:grid md:grid-cols-12 md:gap-8 md:pt-16"
      >
        <h2
          id="partners-heading"
          className="font-serif text-title-m font-medium text-ink md:col-span-4"
        >
          {strings.about.partnersHeading}
        </h2>
        <div className="mt-5 md:col-span-8 md:mt-0">
          <p className="max-w-measure text-body text-ink-secondary">
            {strings.about.partnersBody}
          </p>
        </div>
        <ul className="mt-10 grid border-t border-line sm:col-span-12 sm:grid-cols-2 sm:gap-x-8 md:mt-12 lg:grid-cols-3">
          {partners.map((partner) => (
            <li key={partner.url} className="border-b border-line">
              <a
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid min-h-32 grid-cols-[5rem_minmax(0,1fr)] items-center gap-5 py-5 outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-paper sm:min-h-36 sm:grid-cols-[6rem_minmax(0,1fr)]"
              >
                <span
                  className={`relative flex aspect-square w-full items-center justify-center overflow-hidden border border-line ${
                    partner.imageSurface === "dark" ? "bg-ink" : "bg-card"
                  }`}
                >
                  {partner.image ? (
                    <Image
                      src={partner.image}
                      alt={partner.imageAlt}
                      fill
                      sizes="96px"
                      className={`transition-opacity duration-150 group-hover:opacity-90 ${
                        partner.imageFit === "contain"
                          ? partner.imageInset === "wide"
                            ? "object-contain p-3"
                            : "object-contain p-2"
                          : "object-cover"
                      }`}
                    />
                  ) : (
                    <span className="max-w-[8ch] text-center font-serif text-title-s font-medium text-ink transition-colors duration-150 group-hover:text-accent">
                      {partner.mark}
                    </span>
                  )}
                </span>
                <span className="min-w-0">
                  <span className="flex items-baseline justify-between gap-3 font-serif text-title-s font-medium text-ink transition-colors duration-150 group-hover:text-accent">
                    <span>{partner.name}</span>
                    <span
                      aria-hidden="true"
                      className="shrink-0 font-sans text-body-s text-ink-muted transition-colors duration-150 group-hover:text-accent"
                    >
                      ↗
                    </span>
                  </span>
                  <span className="mt-2 block text-meta uppercase text-ink-muted">
                    {partner.relationship}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16 border-t border-line pt-12 md:mt-24 md:pt-16">
        <h2 className="mb-3 font-serif text-title-s font-medium text-ink">
          {strings.about.contactHeading}
        </h2>
        <p className="max-w-measure text-body text-ink-secondary">
          {strings.about.contactBody}{" "}
          <a
            href={`mailto:${strings.about.contactEmail}`}
            className="text-accent underline decoration-1 underline-offset-[0.15em] hover:text-accent-hover hover:decoration-2"
          >
            {strings.about.contactEmail}
          </a>
          .
        </p>
      </section>
    </div>
  );
}
