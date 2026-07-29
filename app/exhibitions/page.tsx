import type { Metadata } from "next";
import { getProjectsByCategory } from "@/lib/projects";
import { getLang, getStrings } from "@/lib/lang";
import PageHero from "@/components/PageHero";
import ArchiveList from "@/components/ArchiveList";

export function generateMetadata(): Metadata {
  const strings = getStrings();
  return {
    title: `${strings.site.name} - ${strings.pages.exhibitions.heading}`,
    description: strings.pages.exhibitions.description,
  };
}

export default function ExhibitionsPage() {
  const strings = getStrings();
  const projects = getProjectsByCategory("exhibition", getLang());
  const years = projects.map((project) => project.year);
  const yearRange = years.length
    ? `${Math.min(...years)}—${Math.max(...years)}`
    : "—";

  return (
    <div>
      <PageHero
        eyebrow={strings.pages.exhibitions.eyebrow}
        title={strings.pages.exhibitions.heading}
        archiveSummary={{
          countLabel: `${projects.length.toString().padStart(2, "0")} ${strings.archive.resultsSuffix}`,
          yearRange,
        }}
      />
      <ArchiveList projects={projects} />
    </div>
  );
}
