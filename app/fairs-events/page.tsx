import type { Metadata } from "next";
import { getProjectsByCategory } from "@/lib/projects";
import { strings } from "@/lib/strings";
import PageHero from "@/components/PageHero";
import ArchiveList from "@/components/ArchiveList";

export const metadata: Metadata = {
  title: `${strings.site.name} — ${strings.pages.fairsEvents.heading}`,
  description: strings.pages.fairsEvents.description,
};

export default function FairsEventsPage() {
  const projects = getProjectsByCategory("fair");

  return (
    <div>
      <PageHero
        eyebrow={strings.pages.fairsEvents.eyebrow}
        title={strings.pages.fairsEvents.heading}
      />
      <ArchiveList projects={projects} />
    </div>
  );
}
