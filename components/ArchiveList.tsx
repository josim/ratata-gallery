"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { strings } from "@/lib/strings";
import type { Project, ProjectRole } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";
import RoleBadge from "@/components/RoleBadge";

type View = "grid" | "index";

function roleToParam(role: ProjectRole) {
  return role.toLowerCase().replace(/\s+/g, "-");
}

function paramToRole(value: string, roles: ProjectRole[]) {
  return roles.find((role) => roleToParam(role) === value);
}

export default function ArchiveList({
  projects,
  defaultView = "grid",
}: {
  projects: Project[];
  defaultView?: View;
}) {
  const roles = useMemo(
    () => Array.from(new Set(projects.map((p) => p.role))),
    [projects]
  );

  const [activeRoles, setActiveRoles] = useState<ProjectRole[]>([]);
  const [view, setView] = useState<View>(defaultView);
  const [sortAsc, setSortAsc] = useState(false);

  // Hydrate from the URL once on mount so filtered/sorted views stay
  // shareable/cite-able (DESIGN.md §5.6).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const roleParam = params.get("role");
    if (roleParam) {
      const parsed = roleParam
        .split(",")
        .map((value) => paramToRole(value, roles))
        .filter((r): r is ProjectRole => Boolean(r));
      if (parsed.length) setActiveRoles(parsed);
    }
    const viewParam = params.get("view");
    if (viewParam === "grid" || viewParam === "index") setView(viewParam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function syncUrl(nextRoles: ProjectRole[], nextView: View) {
    const params = new URLSearchParams(window.location.search);
    if (nextRoles.length) {
      params.set("role", nextRoles.map(roleToParam).join(","));
    } else {
      params.delete("role");
    }
    params.set("view", nextView);
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
      syncUrl(next, view);
      return next;
    });
  }

  function changeView(next: View) {
    setView(next);
    syncUrl(activeRoles, next);
  }

  const filtered = useMemo(
    () =>
      activeRoles.length === 0
        ? projects
        : projects.filter((p) => activeRoles.includes(p.role)),
    [projects, activeRoles]
  );

  const sorted = useMemo(
    () =>
      [...filtered].sort((a, b) => (sortAsc ? a.year - b.year : b.year - a.year)),
    [filtered, sortAsc]
  );

  if (projects.length === 0) {
    return <p className="text-body text-ink-secondary">{strings.archive.empty}</p>;
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line bg-paper-sunk px-4 py-4 sm:px-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="sr-only">{strings.archive.filterLabel}</span>
          {roles.map((role) => (
            <button
              key={role}
              type="button"
              aria-pressed={activeRoles.includes(role)}
              onClick={() => toggleRole(role)}
              className="border-0 bg-transparent p-0 transition-[background-color,border-color] duration-[120ms]"
            >
              <RoleBadge role={role} active={activeRoles.includes(role)} />
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4 text-meta uppercase">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-pressed={view === "grid"}
              onClick={() => changeView("grid")}
              className={`border-0 border-b-2 bg-transparent p-0 pb-0.5 transition-colors duration-[120ms] ${
                view === "grid"
                  ? "border-accent text-ink"
                  : "border-transparent text-ink-muted hover:text-ink-secondary"
              }`}
            >
              {strings.archive.viewGrid}
            </button>
            <button
              type="button"
              aria-pressed={view === "index"}
              onClick={() => changeView("index")}
              className={`border-0 border-b-2 bg-transparent p-0 pb-0.5 transition-colors duration-[120ms] ${
                view === "index"
                  ? "border-accent text-ink"
                  : "border-transparent text-ink-muted hover:text-ink-secondary"
              }`}
            >
              {strings.archive.viewIndex}
            </button>
          </div>
          <span className="text-ink-muted">
            {sorted.length} {strings.archive.resultsSuffix}
          </span>
        </div>
      </div>

      {sorted.length === 0 ? (
        <p className="px-4 py-12 text-body text-ink-secondary sm:px-6">
          {strings.archive.noMatch}
        </p>
      ) : view === "grid" ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 py-8">
          {sorted.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto py-8">
          <table className="w-full min-w-[560px] border-collapse text-body-s [font-variant-numeric:tabular-nums]">
            <thead>
              <tr className="border-b border-line text-left text-meta uppercase text-ink-muted">
                <th className="w-20 py-3 pr-4 font-normal">
                  <button
                    type="button"
                    onClick={() => setSortAsc((v) => !v)}
                    className="inline-flex items-center gap-1 border-0 bg-transparent p-0 uppercase"
                  >
                    {strings.archive.columnYear} {sortAsc ? "↑" : "↓"}
                  </button>
                </th>
                <th className="py-3 pr-4 font-normal">
                  {strings.archive.columnTitle}
                </th>
                <th className="py-3 pr-4 font-normal">
                  {strings.archive.columnVenue}
                </th>
                <th className="py-3 font-normal">{strings.archive.columnRole}</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((project) => (
                <tr key={project.slug} className="border-b border-line">
                  <td className="py-3 pr-4 align-top text-ink-secondary">
                    {project.year}
                  </td>
                  <td className="py-3 pr-4 align-top">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="font-serif text-title-s text-ink underline-offset-4 hover:text-accent hover:underline"
                    >
                      {project.title}
                    </Link>
                  </td>
                  <td className="py-3 pr-4 align-top text-ink-secondary">
                    {[project.venue, project.city].filter(Boolean).join(", ") ||
                      "—"}
                  </td>
                  <td className="py-3 align-top">
                    <RoleBadge role={project.role} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
