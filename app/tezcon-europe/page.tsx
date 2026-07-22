import type { Metadata } from "next";
import { strings } from "@/lib/strings";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: `${strings.site.name} — ${strings.tezcon.heading}`,
  description: strings.tezcon.body,
};

export default function TezconEuropePage() {
  return (
    <div>
      <PageHero title={strings.tezcon.heading} intro={strings.tezcon.body} />

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
  );
}
