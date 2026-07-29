import type { Metadata } from "next";
import { getStrings } from "@/lib/lang";
import PageHero from "@/components/PageHero";

export function generateMetadata(): Metadata {
  const strings = getStrings();
  return {
    title: `${strings.site.name} - ${strings.legal.datenschutz.heading}`,
    description: strings.legal.datenschutz.description,
  };
}

export default function DatenschutzPage() {
  const strings = getStrings();
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
          <address className="not-italic">
            Philipp Coufal
            <br />
            Am Eichenloh 20
            <br />
            60431 Frankfurt am Main
            <br />
            Deutschland
            <br />
            <a
              href="mailto:info@ratata.gallery"
              className="text-accent underline decoration-1 underline-offset-[0.15em] hover:text-accent-hover hover:decoration-2"
            >
              info@ratata.gallery
            </a>
          </address>
        </section>

        <section className="space-y-2">
          <h2 className="font-sans text-title-s font-semibold text-ink">
            2. Allgemeines zur Datenverarbeitung
          </h2>
          <p>
            Wir erheben über diese Website keine personenbezogenen Daten aktiv.
            Es gibt keine Benutzerkonten, Formulare, Bestellfunktionen,
            Analyse- oder Tracking-Tools.
          </p>
          <p>
            Wir verkaufen keine personenbezogenen Daten und geben sie nicht zu
            Werbezwecken an Dritte weiter.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-sans text-title-s font-semibold text-ink">
            3. Erhebung von Daten beim Besuch der Website
          </h2>
          <p>
            Beim Aufruf einer Website werden technisch notwendige
            Verbindungsdaten, etwa die IP-Adresse, an den Hosting-Anbieter
            übermittelt. Dies ist erforderlich, um die Website auszuliefern
            und ihre Sicherheit zu gewährleisten. Wir greifen nicht auf diese
            Daten zu, werten sie nicht zu Analyse- oder Werbezwecken aus und
            erstellen keine Nutzungsprofile.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-sans text-title-s font-semibold text-ink">
            4. Cookies
          </h2>
          <p>
            Diese Website verwendet ausschließlich einen funktionalen Cookie
            namens <code className="font-sans text-ink">lang</code>. Er
            speichert die gewählte Sprache für höchstens ein Jahr und wird
            nicht für Tracking, Analyse oder Werbung verwendet.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-sans text-title-s font-semibold text-ink">
            5. Kontaktaufnahme
          </h2>
          <p>
            Wenn Sie uns per E-Mail kontaktieren, verarbeiten wir die von Ihnen
            übermittelten Angaben ausschließlich, um Ihre Anfrage zu
            beantworten. Eine Weitergabe zu Werbezwecken oder ein Verkauf
            dieser Daten findet nicht statt. Die Daten werden gelöscht, sobald
            sie für die Bearbeitung nicht mehr erforderlich sind und keine
            gesetzlichen Aufbewahrungspflichten entgegenstehen.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-sans text-title-s font-semibold text-ink">
            6. Externe Links
          </h2>
          <p>
            Diese Website enthält Links zu externen Angeboten. Erst wenn Sie
            einen solchen Link aufrufen, werden Daten an den jeweiligen
            Anbieter übertragen. Für die Datenverarbeitung auf diesen externen
            Websites gelten deren eigene Datenschutzhinweise.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-sans text-title-s font-semibold text-ink">
            7. Ihre Rechte
          </h2>
          <p>
            Sie haben das Recht auf Auskunft, Berichtigung, Löschung,
            Einschränkung der Verarbeitung, Datenübertragbarkeit sowie
            Widerspruch gegen die Verarbeitung Ihrer personenbezogenen Daten.
            Sie haben zudem das Recht, sich bei einer Aufsichtsbehörde zu
            beschweren.
          </p>
        </section>

        <section className="border-t border-line pt-4">
          <p className="text-body-s text-ink-muted">Stand: Juli 2026</p>
        </section>
      </div>
    </div>
  );
}
