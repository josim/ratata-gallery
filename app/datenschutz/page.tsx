import type { Metadata } from "next";
import { strings } from "@/lib/strings";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: `${strings.site.name} - ${strings.legal.datenschutz.heading}`,
  description: strings.legal.datenschutz.description,
};

export default function DatenschutzPage() {
  return (
    <div>
      <PageHero title={strings.legal.datenschutz.heading} />

      <div className="max-w-measure space-y-10 text-body text-ink-secondary">
        <section className="space-y-2">
          <h2 className="font-sans text-title-s font-semibold text-ink">
            1. Verantwortlicher
          </h2>
          <p>
            Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO)
            ist:
          </p>
          <p>[TODO: Name des Verantwortlichen]</p>
          <p>[TODO: Anschrift]</p>
          <p>[TODO: E-Mail-Adresse]</p>
        </section>

        <section className="space-y-2">
          <h2 className="font-sans text-title-s font-semibold text-ink">
            2. Allgemeines zur Datenverarbeitung
          </h2>
          <p>
            [TODO: Beschreibung, in welchem Umfang personenbezogene Daten
            verarbeitet werden und auf welcher Rechtsgrundlage.]
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-sans text-title-s font-semibold text-ink">
            3. Erhebung von Daten beim Besuch der Website
          </h2>
          <p>
            [TODO: Angaben zu Server-Log-Files, Hosting-Anbieter und
            Speicherdauer.]
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-sans text-title-s font-semibold text-ink">
            4. Cookies
          </h2>
          <p>
            [TODO: Angaben zu eingesetzten Cookies bzw. Bestätigung, dass keine
            Cookies gesetzt werden.]
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-sans text-title-s font-semibold text-ink">
            5. Kontaktaufnahme
          </h2>
          <p>
            [TODO: Angaben zur Verarbeitung von Daten bei Kontaktaufnahme per
            E-Mail oder Kontaktformular.]
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-sans text-title-s font-semibold text-ink">
            6. Ihre Rechte
          </h2>
          <p>
            Sie haben das Recht auf Auskunft, Berichtigung, Löschung,
            Einschränkung der Verarbeitung, Datenübertragbarkeit sowie
            Widerspruch gegen die Verarbeitung Ihrer personenbezogenen Daten.
            Sie haben zudem das Recht, sich bei einer Aufsichtsbehörde zu
            beschweren.
          </p>
          <p>[TODO: Zuständige Aufsichtsbehörde]</p>
        </section>
      </div>
    </div>
  );
}
