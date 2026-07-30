import type { Metadata } from "next";
import { getLang, getStrings } from "@/lib/lang";
import { slothIssues, archiveSpan } from "@/lib/slothzineArchive";
import ReadingRoom from "@/components/slothzine/ReadingRoom";

export function generateMetadata(): Metadata {
  const s = getStrings();
  const title = `${s.site.name} - ${s.nav.slothzine}`;
  const description =
    getLang() === "de"
      ? "Der Lesesaal: alle 50 Slothzine-Ausgaben, vollständig lesbar auf der Seite. Blättern, durchs Archiv treiben oder den Stapel mischen."
      : "The Reading Room: read all 50 Slothzine issues in full, right on the page. Turn the pages, drift through the archive, or shuffle the stack.";
  return { title, description };
}

export default function SlothzinePage() {
  const lang = getLang();
  return (
    <ReadingRoom issues={slothIssues} span={archiveSpan} lang={lang} />
  );
}
