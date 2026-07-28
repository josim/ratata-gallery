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

  return (
    <div>
      <PageHero
        eyebrow={strings.pages.exhibitions.eyebrow}
        title={strings.pages.exhibitions.heading}
      />
      <ArchiveList projects={projects} />
    </div>
  );
}
