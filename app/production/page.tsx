import type { Metadata } from "next";
import { getProjectsByCategory } from "@/lib/projects";
import { getLang, getStrings } from "@/lib/lang";
import PageHero from "@/components/PageHero";
import ArchiveList from "@/components/ArchiveList";

export function generateMetadata(): Metadata {
  const strings = getStrings();
  return {
    title: `${strings.site.name} - ${strings.pages.production.heading}`,
    description: strings.pages.production.description,
  };
}

export default function ProductionPage() {
  const strings = getStrings();
  const projects = getProjectsByCategory("production", getLang());
  const years = projects.map((project) => project.year);
  const yearRange = years.length
    ? `${Math.min(...years)}—${Math.max(...years)}`
    : "—";

  return (
    <div>
      <PageHero
        eyebrow={strings.pages.production.eyebrow}
        title={strings.pages.production.heading}
        archiveSummary={{
          countLabel: `${projects.length.toString().padStart(2, "0")} ${strings.archive.resultsSuffix}`,
          yearRange,
        }}
      />
      <ArchiveList projects={projects} />
    </div>
  );
}
