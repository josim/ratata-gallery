import type { Metadata } from "next";
import Image from "next/image";
import { getStrings } from "@/lib/lang";
import PageHero from "@/components/PageHero";

export function generateMetadata(): Metadata {
  const strings = getStrings();
  return {
    title: `${strings.site.name} - ${strings.tezcon.heading}`,
    description: strings.tezcon.body,
  };
}

export default function TezconEuropePage() {
  const strings = getStrings();
  return (
    <div>
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-8">
          <PageHero
            eyebrow={strings.tezcon.eyebrow}
            title={strings.tezcon.heading}
            intro={strings.tezcon.body}
          />
        </div>

        <figure className="mb-12 md:mb-16 lg:col-span-4">
          <div className="relative aspect-[2/1] w-full border border-line bg-paper-card">
            <Image
              src={strings.tezcon.heroImage}
              alt={strings.tezcon.heroImageAlt}
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover"
            />
          </div>
          <figcaption className="mt-2 text-meta text-ink-muted">
            {strings.tezcon.heroImageCredit},{" "}
            <a
              href={strings.tezcon.heroImageLicenseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-1 underline-offset-[0.15em] hover:text-ink"
            >
              {strings.tezcon.heroImageLicense}
            </a>
            ,{" "}
            <a
              href={strings.tezcon.heroImageSourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-1 underline-offset-[0.15em] hover:text-ink"
            >
              {strings.tezcon.heroImageSourceLabel}
            </a>
          </figcaption>
        </figure>
      </div>

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="space-y-16 lg:col-span-8">
          <section className="max-w-measure space-y-4">
            <h2 className="font-serif text-title-s font-medium text-ink">
              {strings.tezcon.seattleHeading}
            </h2>
            {strings.tezcon.seattleBody.map((paragraph) => (
              <p key={paragraph} className="text-body text-ink">
                {paragraph}
              </p>
            ))}
            <ul className="border-t border-line">
              {strings.tezcon.seattleLinks.map((link) => (
                <li
                  key={link.url}
                  className="border-b border-line py-3"
                >
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
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-title-s font-medium text-ink">
              {strings.tezcon.programHeading}
            </h2>
            <ul className="border-t border-line">
              {strings.tezcon.program.map((item) => (
                <li
                  key={item.title}
                  className="grid gap-1 border-b border-line py-3 sm:grid-cols-[12rem_1fr] sm:gap-4"
                >
                  <span className="text-meta uppercase text-ink-muted">
                    {item.title}
                  </span>
                  <span className="text-body text-ink">{item.description}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-title-s font-medium text-ink">
              {strings.tezcon.contactHeading}
            </h2>
            <a
              href={`mailto:${strings.tezcon.contactEmail}`}
              className="text-body text-accent underline decoration-1 underline-offset-[0.15em] hover:text-accent-hover hover:decoration-2"
            >
              {strings.tezcon.contactEmail}
            </a>
          </section>
        </div>

        <aside className="lg:col-span-4">
          <dl className="border-t border-line">
            {strings.tezcon.facts.map((fact) => (
              <div key={fact.label} className="space-y-1 border-b border-line py-3">
                <dt className="text-meta uppercase text-ink-muted">
                  {fact.label}
                </dt>
                <dd className="text-body text-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </div>
  );
}
