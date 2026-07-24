import type { Metadata } from "next";
import { getProjectsByCategory } from "@/lib/projects";
import { strings } from "@/lib/strings";
import PageHero from "@/components/PageHero";
import ArchiveList from "@/components/ArchiveList";

export const metadata: Metadata = {
  title: `${strings.site.name} — ${strings.pages.exhibitions.heading}`,
  description: strings.pages.exhibitions.description,
};

export default function ExhibitionsPage() {
  const projects = getProjectsByCategory("exhibition");

  return (
    <div>
      <PageHero
        eyebrow={strings.pages.exhibitions.eyebrow}
        title={strings.pages.exhibitions.heading}
      />
      <ArchiveList projects={projects} defaultView="grid" />
    </div>
  );
}
