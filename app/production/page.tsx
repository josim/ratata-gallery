import type { Metadata } from "next";
import { getProjectsByCategory } from "@/lib/projects";
import { strings } from "@/lib/strings";
import PageHero from "@/components/PageHero";
import ArchiveList from "@/components/ArchiveList";

export const metadata: Metadata = {
  title: `${strings.site.name} — ${strings.pages.production.heading}`,
  description: strings.pages.production.description,
};

export default function ProductionPage() {
  const projects = getProjectsByCategory("production");

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
