import type { Metadata } from "next";
import { getProjectsByCategory } from "@/lib/projects";
import { strings } from "@/lib/strings";
import PageHero from "@/components/PageHero";
import ArchiveList from "@/components/ArchiveList";

export const metadata: Metadata = {
  title: `${strings.site.name} — ${strings.pages.techProductions.heading}`,
  description: strings.pages.techProductions.description,
};

export default function TechProductionsPage() {
  const projects = getProjectsByCategory("tech");

  return (
    <div>
      <PageHero
        eyebrow={strings.pages.techProductions.eyebrow}
        title={strings.pages.techProductions.heading}
      />
      <ArchiveList projects={projects} />
    </div>
  );
}
