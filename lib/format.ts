import type { Project } from "@/lib/projects";

// Shared "YEAR · VENUE · CITY" metadata line used by cards, index rows, and
// the project detail header (DESIGN.md §5.3/§5.4/§5.9).
export function projectMeta(project: Project): string {
  return [String(project.dates ?? project.year), project.venue, project.city]
    .filter(Boolean)
    .join(" · ");
}
