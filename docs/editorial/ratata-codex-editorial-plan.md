# ratata: Codex-Plan für die redaktionelle Überarbeitung

## Ziel

Codex soll sämtliche Website-Texte für **Exhibitions**, **Events** und **Products** systematisch überarbeiten. Grundlage ist der zweisprachige `ratata Editorial Style Guide`. Die englischen Texte verwenden UK English; die deutschen Fassungen werden idiomatisch geschrieben und nicht wörtlich übersetzt.

Die Arbeit erfolgt kontrolliert in drei Stufen:

1. Inhalte und technische Struktur erfassen.
2. *What hot Sh!t* als Pilotprojekt überarbeiten und gemeinsam abnehmen.
3. Den bestätigten Ansatz auf die übrigen Inhalte ausrollen und technisch prüfen.

## Vorbereitung

### Projekt öffnen

Den Stammordner der Ratata-Website in Codex öffnen. Der richtige Ordner enthält typischerweise `package.json`, die Anwendung und die Content-Verzeichnisse.

Vor Beginn:

- einen sauberen Git-Arbeitsstand herstellen oder bestehende Änderungen klar identifizieren;
- optional einen Branch wie `content/ratata-editorial-rewrite` anlegen;
- keine fremden oder bereits vorhandenen Änderungen überschreiben;
- vorhandene `AGENTS.md`-Dateien lesen und befolgen.

### Style Guide in das Repository legen

Den Style Guide unter einem stabilen Pfad speichern, zum Beispiel:

```text
docs/editorial/ratata-editorial-style-guide.md
```

So kann Codex ihn in jeder Sitzung als verbindliche Quelle lesen. Der vollständige Guide sollte nicht direkt in `AGENTS.md` kopiert werden; dort genügt später ein kurzer Verweis.

## Arbeitsphasen

### Phase 1: Repository und Inhalte inventarisieren

Codex arbeitet zunächst ausschließlich lesend.

#### 1. Technische Struktur verstehen

Codex soll:

- den Projekt- und Content-Aufbau untersuchen;
- alle `AGENTS.md`- und `AGENTS.override.md`-Dateien berücksichtigen;
- herausfinden, wie Markdown- und MDX-Dateien geladen, validiert und gerendert werden;
- die vorhandenen Frontmatter-Felder und deren Datentypen dokumentieren;
- Sprach-, Kategorie- und Routing-Logik identifizieren;
- relevante Build-, Typecheck-, Lint- und Content-Validierungsbefehle aus `package.json` oder der Projektdokumentation ermitteln.

#### 2. Alle redaktionellen Dateien erfassen

Mit einer schnellen Dateisuche alle relevanten `.md`- und `.mdx`-Dateien finden und klassifizieren:

- Exhibition
- Event
- Product
- UK English
- Deutsch
- ungeklärte Kategorie oder Sprache

Für jede Datei festhalten:

- Pfad
- Slug
- Inhaltstyp
- Sprache
- Titel
- Status: upcoming, current oder archive
- zugehörige Übersetzung
- fehlende oder abweichende Frontmatter-Felder
- auffällige Duplikate
- fehlende Fakten oder unklare Aussagen

#### 3. Audit-Bericht erstellen

Noch keine Content-Dateien verändern. Zuerst einen Bericht unter folgendem Pfad anlegen:

```text
docs/editorial/content-audit.md
```

Der Bericht enthält:

- gefundene Content-Verzeichnisse;
- verwendete Frontmatter-Schemata;
- vollständige Dateiliste nach Inhaltstyp und Sprache;
- Zuordnung der englisch-deutschen Paare;
- Dateien ohne Übersetzung;
- mögliche Duplikate;
- erkennbare Inkonsistenzen bei Namen, Daten, Orten, Credits und Schreibweisen;
- technische Risiken beim Editieren;
- vorgeschlagene Reihenfolge der Überarbeitung.

Offene Fakten werden nicht geraten. Sie werden als `NEEDS REVIEW` markiert.

### Phase 2: *What hot Sh!t* als Pilot

Codex wählt die zusammengehörigen deutschen und englischen Dateien für *What hot Sh!t* aus.

#### 1. Faktenbasis sichern

Vor der sprachlichen Bearbeitung eine kleine Faktentabelle erstellen:

| Feld | Bestätigter Inhalt |
| --- | --- |
| Titel | What hot Sh!t |
| Format | hic et nunc Ausstellung |
| Ort | Galerie Greulich, Frankfurt |
| Zeitraum | 9. Juli–6. August 2021 |
| Anzahl Kunstschaffende | 14 |
| Genannte Künstler:innen | Mario Klingemann, Ivona Tau |
| Rolle von ratata | kuratiert und organisiert/realisiert |

Codex soll die Angaben mit den vorhandenen Dateien abgleichen und Widersprüche sichtbar machen. Die Tabelle ist eine Arbeitsgrundlage, kein Ersatz für eine menschliche Faktenprüfung.

#### 2. Texte redigieren

Für beide Sprachen:

- den offiziellen Titel unverändert lassen;
- Inhalt und Aussagekraft erhalten;
- generische Werbesprache, Krypto-Hype und unbelegte Superlative entfernen;
- mit einer klaren redaktionellen Aussage beginnen;
- konkrete Angaben zu Künstler:innen, Ort, Zeitraum und Rolle von ratata bevorzugen;
- UK-English-Schreibweisen und Datumsformate verwenden;
- die deutsche Fassung idiomatisch und eigenständig formulieren;
- Fakten, Credits, Eigennamen, Slugs und URLs nicht verändern;
- Frontmatter-Struktur und MDX-Komponenten unverändert erhalten, sofern kein technischer Fehler vorliegt.

#### 3. Pilot zur Prüfung vorlegen

Codex zeigt:

- die bisherigen Texte;
- die vorgeschlagenen neuen Texte;
- eine kurze Begründung der wichtigsten Änderungen;
- den vollständigen Diff;
- offene Faktenfragen.

Erst nach Freigabe wird der Ansatz auf weitere Dateien übertragen.

### Phase 3: Batch-Überarbeitung

Nach Freigabe des Pilottons erfolgt die Bearbeitung in kleinen, prüfbaren Gruppen.

#### Reihenfolge

1. übrige Exhibitions;
2. Events;
3. Products;
4. Karten-, Teaser-, CTA- und Metatexte.

Maximal fünf zusammengehörige Sprachpaare pro Batch bearbeiten. Nach jedem Batch:

- Faktenparität zwischen Deutsch und Englisch prüfen;
- Diff zusammenfassen;
- unklare Stellen separat auflisten;
- relevante Validierungen ausführen.

#### Regeln für Exhibitions

- zentrale kuratorische Idee früh benennen;
- Gegenstand und Kontext vor abstrakte Interpretation stellen;
- Arbeiten, Medien, Beteiligte und Ort konkret benennen;
- Zeitform am Projektstatus ausrichten;
- Rollen wie curated by, produced by und organised by korrekt unterscheiden;
- lange Künstler:innenlisten vollständig und konsistent formatieren;
- Archivtexte in der Vergangenheit schreiben.

#### Regeln für Events

Jeder Eventtext beantwortet sichtbar:

- Was passiert?
- Wer ist beteiligt?
- Wann und wo findet es statt?
- Welche Sprache wird gesprochen?
- Wie lange dauert das Format?
- Was kostet die Teilnahme?
- Ist eine Anmeldung erforderlich?
- Welche bestätigten Informationen zur Zugänglichkeit gibt es?

Keine künstliche Dringlichkeit erzeugen. Ein CTA muss genau beschreiben, was als Nächstes geschieht.

#### Regeln für Products

Die Reihenfolge lautet:

1. Objekt oder digitale Edition;
2. Idee und Verbindung zum Programm;
3. überprüfbare Spezifikationen.

Codex darf Preise, Materialien, Maße, Auflagen, Signaturen, Lieferzeiten, Rechte, Blockchain- oder Tokenangaben niemals ergänzen oder erschließen. Fehlende Angaben werden als `NEEDS REVIEW` gemeldet.

Keine Investmentversprechen, künstliche Verknappung oder Formulierungen wie „must-have drop“, „revolutionary“ oder „the future of art“.

### Phase 4: Technische und redaktionelle Qualitätssicherung

Nach der Bearbeitung aller freigegebenen Inhalte:

#### Technische Prüfung

- Frontmatter aller geänderten Dateien parsen;
- sicherstellen, dass Pflichtfelder, Feldnamen und Datentypen erhalten sind;
- MDX-Syntax validieren;
- interne Links, Slugs, Asset-Pfade und Imports prüfen;
- vorhandene Format-, Lint-, Typecheck-, Test- und Build-Befehle ausführen;
- keine neuen Abhängigkeiten installieren, sofern dies nicht ausdrücklich freigegeben wurde.

#### Redaktionelle Prüfung

- UK English statt US English;
- deutsche Texte sind idiomatisch und keine Satz-für-Satz-Übersetzungen;
- gleiche Fakten und gleich starke Aussagen in beiden Sprachen;
- korrekte Namen, Titel, Diakritika, Daten und Credits;
- konsistente Schreibweise von `ratata`;
- Datum, Uhrzeit, Preis und Maße nach Style Guide;
- keine unbelegten Superlative oder leeren Kunstphrasen;
- keine erfundenen Fakten;
- aussagekräftige Link- und Buttontexte;
- Bildunterschriften und Alt-Texte getrennt behandeln.

#### Diff-Prüfung

Codex prüft abschließend den gesamten Diff auf:

- versehentlich veränderte Slugs;
- gelöschte Frontmatter-Felder;
- unbeabsichtigte Code- oder Layoutänderungen;
- veränderte URLs oder Asset-Pfade;
- doppelte Inhalte;
- Änderungen außerhalb des vereinbarten Scopes.

### Phase 5: Übergabe

Codex liefert:

- Anzahl der geprüften und geänderten Dateien;
- Liste der geänderten Dateien nach Inhaltstyp und Sprache;
- Zusammenfassung der redaktionellen Entscheidungen;
- alle `NEEDS REVIEW`-Punkte in einer kompakten Tabelle;
- ausgeführte Tests und deren Ergebnis;
- nicht ausgeführte Prüfungen mit Begründung;
- Hinweise auf Dateien ohne Sprachpaar;
- Empfehlung für den nächsten redaktionellen Batch.

Codex erstellt keinen Commit und pusht nichts, solange dies nicht ausdrücklich beauftragt wurde.

## Definition of Done

Die Aufgabe ist abgeschlossen, wenn:

- alle vereinbarten Inhalte nach dem ratata Style Guide bearbeitet wurden;
- englische und deutsche Fassungen dieselben bestätigten Fakten enthalten;
- Frontmatter, Slugs, Komponenten und Asset-Pfade intakt sind;
- alle verfügbaren Prüfungen erfolgreich laufen;
- jeder verbleibende Faktfehler oder Informationsbedarf als `NEEDS REVIEW` dokumentiert ist;
- der finale Diff ausschließlich beabsichtigte Änderungen enthält.

## Empfohlene dauerhafte Anweisung für `AGENTS.md`

Nach erfolgreicher Pilotphase kann der folgende kompakte Abschnitt in die `AGENTS.md` des Repositories aufgenommen werden:

```md
## Editorial content

- Apply `docs/editorial/ratata-editorial-style-guide.md` to all Exhibition,
  Event and Product copy.
- Use UK English for English content and idiomatic German for German content.
- Keep facts, frontmatter, slugs, URLs, MDX components and asset paths unchanged
  unless the task explicitly requires a structural change.
- Never invent missing dates, credits, prices, materials, edition details or
  accessibility information. Report them as `NEEDS REVIEW`.
- Validate factual parity between language versions and run the repository's
  content, lint, typecheck and build checks after editing.
```

## Prompt zum Einfügen in Codex

In Codex zunächst den **Plan-Modus** aktivieren und anschließend den folgenden Prompt einfügen:

```text
Überarbeite die redaktionellen Inhalte der Ratata-Website für Exhibitions,
Events und Products.

Ziel
Alle Texte sollen dem Style Guide unter
docs/editorial/ratata-editorial-style-guide.md entsprechen. Englische Inhalte
verwenden UK English. Deutsche Inhalte müssen idiomatisch formuliert sein und
dürfen keine wörtlichen Übersetzungen sein.

Kontext
- Lies zuerst alle anwendbaren AGENTS.md-Dateien.
- Untersuche die Content-Loader, Frontmatter-Schemata, Sprachlogik und
  verfügbaren Validierungsbefehle.
- Finde alle relevanten Markdown- und MDX-Dateien im Repository.

Grenzen
- Arbeite zunächst nur lesend.
- Verändere keine Dateien, bevor du die Bestandsaufnahme und den Plan
  vorgelegt hast.
- Bewahre Frontmatter, Slugs, URLs, MDX-Komponenten, Asset-Pfade und bestätigte
  Fakten.
- Verändere keine React-, TypeScript-, Styling- oder Layoutdateien, sofern dies
  nicht für eine ausdrücklich bestätigte Content-Korrektur erforderlich ist.
- Erfinde keine Angaben. Markiere fehlende oder widersprüchliche Informationen
  als NEEDS REVIEW.
- Installiere keine neuen Abhängigkeiten.
- Erstelle keinen Commit und pushe nichts.

Vorgehen
1. Inventarisiere alle Exhibition-, Event- und Product-Dateien nach Sprache.
2. Ordne englische und deutsche Fassungen einander zu.
3. Dokumentiere Frontmatter-Schemata, Duplikate, fehlende Übersetzungen,
   Faktenkonflikte und technische Risiken.
4. Lege den Audit-Bericht unter docs/editorial/content-audit.md an.
5. Verwende What hot Sh!t als Pilot und zeige zuerst den geplanten Text sowie
   den Diff für beide Sprachen.
6. Warte auf meine Freigabe, bevor du weitere Inhalte bearbeitest.
7. Rolle den bestätigten Ton anschließend in Batches von höchstens fünf
   Sprachpaaren aus: zuerst Exhibitions, dann Events, dann Products.
8. Prüfe nach jedem Batch Faktenparität und technische Gültigkeit.

Fertig, wenn
- alle freigegebenen Texte dem Style Guide entsprechen;
- beide Sprachen dieselben bestätigten Fakten enthalten;
- Frontmatter, Slugs, Links, MDX und Assets intakt sind;
- vorhandene Lint-, Typecheck-, Test- und Build-Prüfungen erfolgreich laufen;
- offene Faktenfragen in einer NEEDS-REVIEW-Tabelle stehen;
- der finale Diff keine unbeabsichtigten Änderungen enthält.

Beginne jetzt mit der lesenden Bestandsaufnahme und lege mir anschließend den
konkreten Ausführungsplan zur Freigabe vor.
```
