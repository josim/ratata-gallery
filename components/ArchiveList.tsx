"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useStrings } from "@/components/LangProvider";
import type { Project, ProjectRole } from "@/lib/projects";
import ArchiveEntry from "@/components/ArchiveEntry";

// Temporarily hidden — set to true to bring back the role filters.
const SHOW_CONTROLS = false;

function roleToParam(role: ProjectRole) {
  return role.toLowerCase().replace(/\s+/g, "-");
}

function paramToRole(value: string, roles: ProjectRole[]) {
  return roles.find((role) => roleToParam(role) === value);
}

export default function ArchiveList({ projects }: { projects: Project[] }) {
  const strings = useStrings();
  const roles = useMemo(
    () => Array.from(new Set(projects.map((p) => p.role))),
    [projects]
  );

  const [activeRoles, setActiveRoles] = useState<ProjectRole[]>([]);
  const listRef = useRef<HTMLDivElement>(null);
  const [activeYear, setActiveYear] = useState<number | null>(null);

  // Hydrate from the URL once on mount so filtered views stay
  // shareable/cite-able (DESIGN.md §5.6).
  useEffect(() => {
    if (!SHOW_CONTROLS) return;
    const params = new URLSearchParams(window.location.search);
    const roleParam = params.get("role");
    if (roleParam) {
      const parsed = roleParam
        .split(",")
        .map((value) => paramToRole(value, roles))
        .filter((r): r is ProjectRole => Boolean(r));
      if (parsed.length) setActiveRoles(parsed);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function syncUrl(nextRoles: ProjectRole[]) {
    const params = new URLSearchParams(window.location.search);
    if (nextRoles.length) {
      params.set("role", nextRoles.map(roleToParam).join(","));
    } else {
      params.delete("role");
    }
    const query = params.toString();
    window.history.replaceState(
      null,
      "",
      query ? `?${query}` : window.location.pathname
    );
  }

  function toggleRole(role: ProjectRole) {
    setActiveRoles((prev) => {
      const next = prev.includes(role)
        ? prev.filter((r) => r !== role)
        : [...prev, role];
      syncUrl(next);
      return next;
    });
  }

  const filtered = useMemo(
    () =>
      activeRoles.length === 0
        ? projects
        : projects.filter((p) => activeRoles.includes(p.role)),
    [projects, activeRoles]
  );

  // The spine reports the year of whichever entry currently sits across the
  // reading band near the top of the viewport, so scrolling the archive reads
  // like pulling a drawer through time.
  useEffect(() => {
    const root = listRef.current;
    if (!root || typeof IntersectionObserver === "undefined") return;

    const entries = Array.from(root.querySelectorAll<HTMLElement>("[data-year]"));
    if (!entries.length) return;

    const inBand = new Set<Element>();
    const observer = new IntersectionObserver(
      (records) => {
        for (const record of records) {
          if (record.isIntersecting) inBand.add(record.target);
          else inBand.delete(record.target);
        }
        const topmost = Array.from(inBand).sort(
          (a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top
        )[0];
        if (topmost) {
          setActiveYear(Number(topmost.getAttribute("data-year")));
        }
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );

    entries.forEach((entry) => observer.observe(entry));
    return () => observer.disconnect();
  }, [filtered]);

  if (projects.length === 0) {
    return <p className="text-body text-ink-secondary">{strings.archive.empty}</p>;
  }

  const yearSpine = (
    // Decorative: every entry already carries its own date, so announcing a
    // year that changes under the reader would only get in the way.
    <div aria-hidden="true" className="hidden lg:block">
      <p className="sticky top-24 font-serif text-title-m text-ink-muted [font-variant-numeric:tabular-nums]">
        {activeYear ?? filtered[0]?.year}
      </p>
    </div>
  );

  return (
    <div>
      {SHOW_CONTROLS && (
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line bg-paper-sunk px-4 py-4 sm:px-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="sr-only">{strings.archive.filterLabel}</span>
          {roles.map((role) => (
            <button
              key={role}
              type="button"
              aria-pressed={activeRoles.includes(role)}
              onClick={() => toggleRole(role)}
              className={`border-b-2 bg-transparent px-1 py-1 text-meta uppercase transition-colors duration-[120ms] ${
                activeRoles.includes(role)
                  ? "border-accent text-ink"
                  : "border-transparent text-ink-muted hover:text-ink-secondary"
              }`}
            >
              {strings.roles[role]}
            </button>
          ))}
        </div>

        <span className="text-meta uppercase text-ink-muted">
          {filtered.length} {strings.archive.resultsSuffix}
        </span>
      </div>
      )}

      {filtered.length === 0 ? (
        <p className="px-4 py-12 text-body text-ink-secondary sm:px-6">
          {strings.archive.noMatch}
        </p>
      ) : (
        <div className="py-4 md:py-8 lg:grid lg:grid-cols-[3.5rem_minmax(0,1fr)] lg:gap-6">
          {yearSpine}
          <div ref={listRef}>
            {filtered.map((project, index) => (
              <ArchiveEntry
                key={project.slug}
                project={project}
                index={index}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
