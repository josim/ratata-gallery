import type { Metadata } from "next";
import { getProjectsByCategory } from "@/lib/projects";
import { strings } from "@/lib/strings";
import PageHero from "@/components/PageHero";
import ArchiveList from "@/components/ArchiveList";

export const metadata: Metadata = {
  title: `${strings.site.name} — ${strings.pages.platforms.heading}`,
  description: strings.pages.platforms.description,
};

export default function PlatformsPage() {
  const projects = getProjectsByCategory("platform");

  return (
    <div>
      <PageHero
        eyebrow={strings.pages.platforms.eyebrow}
        title={strings.pages.platforms.heading}
      />
      <ArchiveList projects={projects} />
    </div>
  );
}
