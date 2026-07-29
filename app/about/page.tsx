import type { Metadata } from "next";
import { getStrings } from "@/lib/lang";
import PageHero from "@/components/PageHero";

export function generateMetadata(): Metadata {
  const strings = getStrings();
  return {
    title: `${strings.site.name} - ${strings.about.heading}`,
    description: strings.about.body,
  };
}

export default function AboutPage() {
  const strings = getStrings();
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
