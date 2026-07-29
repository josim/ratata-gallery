import type { Metadata } from "next";
import { getStrings } from "@/lib/lang";
import PageHero from "@/components/PageHero";

export function generateMetadata(): Metadata {
  const strings = getStrings();
  return {
    title: `${strings.site.name} - ${strings.legal.impressum.heading}`,
    description: strings.legal.impressum.description,
  };
}

export default function ImpressumPage() {
  const strings = getStrings();
  return (
    <div>
      <PageHero title={strings.legal.impressum.heading} />

      <div className="max-w-measure space-y-10 text-body text-ink-secondary">
        <section className="space-y-2">
          <h2 className="font-sans text-title-s font-semibold text-ink">
            Unternehmensinformationen
          </h2>
          <address className="not-italic">
            Philipp Coufal
            <br />
            Am Eichenloh 20
            <br />
            60431 Frankfurt am Main
            <br />
            Deutschland
          </address>
        </section>

        <section className="space-y-2">
          <h2 className="font-sans text-title-s font-semibold text-ink">
            Kontakt
          </h2>
          <p>
            Telefon:{" "}
            <a
              href="tel:+491741864217"
              className="text-accent underline decoration-1 underline-offset-[0.15em] hover:text-accent-hover hover:decoration-2"
            >
              +49 (0)174 1864217
            </a>
          </p>
          <p>
            E-Mail:{" "}
            <a
              href="mailto:info@ratata.gallery"
              className="text-accent underline decoration-1 underline-offset-[0.15em] hover:text-accent-hover hover:decoration-2"
            >
              info@ratata.gallery
            </a>
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-sans text-title-s font-semibold text-ink">
            Technischer Support
          </h2>
          <p>Kontaktperson: Johannes Simon</p>
          <p>
            E-Mail:{" "}
            <a
              href="mailto:info@ratata.gallery"
              className="text-accent underline decoration-1 underline-offset-[0.15em] hover:text-accent-hover hover:decoration-2"
            >
              info@ratata.gallery
            </a>
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-sans text-title-s font-semibold text-ink">
            Rechtliche Hinweise
          </h2>
          <p>
            Alle Inhalte auf dieser Website unterliegen dem Urheberrecht und
            anderen Gesetzen zum Schutz des geistigen Eigentums.
          </p>
          <p>
            Für Links auf externe Webseiten und deren Inhalte wird keine
            Verantwortung übernommen.
          </p>
        </section>
      </div>
    </div>
  );
}
