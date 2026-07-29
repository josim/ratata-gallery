import { getUpcomingProjects } from "@/lib/projects";
import type { Lang, Strings } from "@/lib/strings";

// Tezcon Europe is a bespoke page composed from strings.tezcon rather than an
// MDX project, so its index entry is assembled here. Keep TEZCON_START in sync
// with the date in strings.tezcon.facts until the edition is confirmed.
const TEZCON_START = "2026-10-24";

export type UpcomingEntry = {
  key: string;
  href: string;
  startDate: string; // ISO yyyy-mm-dd, used only for sorting
  dates: string; // display string in the active language
  title: string;
  place?: string;
};

// Shared by the home teaser box and the /upcoming index so both always show
// the same events in the same order (soonest first).
export function getUpcomingEntries(lang: Lang, strings: Strings): UpcomingEntry[] {
  const fromProjects = getUpcomingProjects(lang).map((project) => ({
    key: project.slug,
    href: `/projects/${project.slug}`,
    startDate: project.startDate ?? String(project.year),
    dates: project.dates ?? String(project.year),
    title: project.title,
    place:
      [project.venue, project.city].filter(Boolean).join(" · ") || undefined,
  }));

  const tezcon: UpcomingEntry = {
    key: "tezcon-europe",
    href: "/upcoming/tezcon-europe",
    startDate: TEZCON_START,
    dates: strings.tezcon.facts[0].value,
    title: strings.tezcon.heading,
    place: strings.tezcon.facts[1].value,
  };

  return [...fromProjects, tezcon].sort((a, b) =>
    a.startDate.localeCompare(b.startDate)
  );
}
