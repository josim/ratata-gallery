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

      <section>
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
