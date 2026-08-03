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

  return (
    <div>
      <PageHero
        eyebrow={strings.pages.production.eyebrow}
        title={strings.pages.production.heading}
      />
      <ArchiveList projects={projects} />
    </div>
  );
}
