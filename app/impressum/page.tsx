import type { Metadata } from "next";
import { strings } from "@/lib/strings";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: `${strings.site.name} - ${strings.legal.impressum.heading}`,
  description: strings.legal.impressum.description,
};

export default function ImpressumPage() {
  return (
    <div>
      <PageHero title={strings.legal.impressum.heading} />

      <div className="max-w-measure space-y-10 text-body text-ink-secondary">
        <section className="space-y-2">
          <h2 className="font-sans text-title-s font-semibold text-ink">
            Angaben gemäß § 5 TMG
          </h2>
          <p>[TODO: Name des Diensteanbieters]</p>
          <p>[TODO: Straße und Hausnummer]</p>
          <p>[TODO: PLZ und Ort]</p>
          <p>[TODO: Land]</p>
        </section>

        <section className="space-y-2">
          <h2 className="font-sans text-title-s font-semibold text-ink">
            Vertreten durch
          </h2>
          <p>[TODO: Vertretungsberechtigte Person(en) / Geschäftsführung]</p>
        </section>

        <section className="space-y-2">
          <h2 className="font-sans text-title-s font-semibold text-ink">
            Kontakt
          </h2>
          <p>[TODO: Telefonnummer]</p>
          <p>[TODO: E-Mail-Adresse]</p>
        </section>

        <section className="space-y-2">
          <h2 className="font-sans text-title-s font-semibold text-ink">
            Registereintrag
          </h2>
          <p>[TODO: Eintragung im Register, Registergericht]</p>
          <p>[TODO: Registernummer]</p>
        </section>

        <section className="space-y-2">
          <h2 className="font-sans text-title-s font-semibold text-ink">
            Umsatzsteuer-Identifikationsnummer
          </h2>
          <p>
            [TODO: Umsatzsteuer-Identifikationsnummer gemäß § 27a
            Umsatzsteuergesetz, falls vorhanden]
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-sans text-title-s font-semibold text-ink">
            Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
          </h2>
          <p>[TODO: Name und Anschrift der inhaltlich verantwortlichen Person]</p>
        </section>
      </div>
    </div>
  );
}
