import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getProjectsByCategory } from "@/lib/projects";
import { getLang, getStrings } from "@/lib/lang";
import { projectMeta } from "@/lib/format";
import { withImageSizes, type SizedImage } from "@/lib/images";
import HomeHeader from "@/components/home/HomeHeader";
import HomeFooter from "@/components/home/HomeFooter";

// Exhibition archive in the "Zwei Spuren / Invers" language of the homepage
// (app/page.tsx): a duotone hero split by a hard seam, a stats strip, then one
// full-bleed entry per exhibition whose text track keeps running down the left
// of the same seam. The page owns its chrome — it sits outside the (site)
// route group so it gets the redesign's header and footer rather than the
// archive-era ones, and so the bands can bleed to the viewport edge.

// 40px page gutter, 20px on small screens — same as the homepage.
const GUTTER = "px-5 md:px-10";

// Cities ratata has shown in that have no archive entry (yet). They join the
// hero's city list and the Städte count alongside the data-derived ones.
const EXTRA_CITIES = ["Basel", "Brussels"];

// Editorial display order for the hero's city list; cities not named here
// (e.g. from future archive entries) follow at the end in data order.
const CITY_ORDER = [
  "Frankfurt",
  "Basel",
  "Seattle",
  "Berlin",
  "Valencia",
  "Singapore",
  "Brussels",
];

export function generateMetadata(): Metadata {
  const s = getStrings();
  return {
    title: `${s.site.name} - ${s.pages.exhibitions.heading}`,
    description: s.pages.exhibitions.description,
  };
}

export default async function ExhibitionsPage() {
  const s = getStrings();
  const projects = getProjectsByCategory("exhibition", getLang());
  const t = s.pages.exhibitions;

  // Natural dimensions so each plate keeps the photograph's own proportions
  // instead of cropping posters to a fixed box (CLS stays at 0).
  const plates = await withImageSizes(
    projects.map((project) => {
      const src = project.images?.[0] ?? "";
      return {
        src,
        alt: project.media?.find((m) => m.src === src)?.alt ?? "",
      };
    })
  );

  const cityRank = (c: string) =>
    CITY_ORDER.indexOf(c) === -1 ? CITY_ORDER.length : CITY_ORDER.indexOf(c);
  const cities = Array.from(
    new Set([
      ...projects.map((p) => p.city).filter((c): c is string => Boolean(c)),
      ...EXTRA_CITIES,
    ])
  ).sort((a, b) => cityRank(a) - cityRank(b));
  const artists = new Set(projects.flatMap((p) => p.artists ?? []));
  const stats = projects.length
    ? [
        { n: String(projects.length), label: t.statShows },
        { n: String(artists.size), label: t.statArtists },
        { n: String(cities.length), label: t.statCities },
        { n: String(Math.min(...projects.map((p) => p.year))), label: t.statSince },
      ]
    : [];

  return (
    <div className="spur bg-spur-paper text-spur-ink">
      <HomeHeader />
      <main>
        {/* 1 — Hero: the title on the gallery wall, the archive's terms on
            near-black, joined by the seam that runs on through the list. */}
        <section className="grid duo:grid-cols-2">
          <div
            className={`flex flex-col justify-center py-14 duo:border-r duo:border-spur-ink duo:px-11 duo:py-24 ${GUTTER}`}
          >
            <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.16em] text-spur-accent">
              {t.eyebrow}
            </p>
            <h1 className="text-[clamp(34px,5vw,72px)] font-black uppercase leading-[0.86] tracking-[-0.05em]">
              {t.heading}
            </h1>
          </div>

          <div
            className={`spur-dark flex flex-col justify-between gap-14 bg-spur-ink py-14 text-spur-paper duo:py-24 ${GUTTER}`}
          >
            <p className="max-w-[46ch] text-[19px] leading-[1.5] [text-wrap:pretty]">
              {t.lead}
            </p>
            {cities.length > 0 && (
              <div className="border-t border-spur-dark-line-2 pt-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-spur-dark-mut">
                  {t.statCities}
                </p>
                <p className="mt-3 font-mono text-[12px] leading-[1.8] text-spur-dark-head">
                  {cities.join(" · ")}
                </p>
              </div>
            )}
          </div>
        </section>

        {projects.length === 0 ? (
          <section className={`border-t border-spur-ink py-20 ${GUTTER}`}>
            <p className="font-mono text-[12px] text-spur-mut">
              {s.archive.empty}
            </p>
          </section>
        ) : (
          <>
            {/* 2 — What the archive adds up to, read straight from the data. */}
            <section className="grid grid-cols-2 gap-px border-y border-spur-ink bg-spur-line duo:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-spur-paper px-6 py-8 duo:px-10"
                >
                  <p className="text-[40px] font-black leading-none tracking-[-0.04em] duo:text-[52px] [font-variant-numeric:tabular-nums]">
                    {stat.n}
                  </p>
                  <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-spur-mut">
                    {stat.label}
                  </p>
                </div>
              ))}
            </section>

            {/* 3 — The archive itself. One entry per row, text track left of
                the seam, matted plate right of it. */}
            <section>
              {projects.map((project, index) => {
                const plate: SizedImage | undefined = plates[index]?.src
                  ? plates[index]
                  : undefined;
                const roleLabel: string = s.roles[project.role] ?? project.role;

                return (
                  <Link
                    key={project.slug}
                    href={`/projects/${project.slug}`}
                    aria-label={project.title}
                    className="group grid border-t border-spur-line first:border-t-0 focus-visible:[outline-offset:-3px] duo:grid-cols-2"
                  >
                    <div
                      className={`flex flex-col gap-8 pb-8 pt-14 duo:px-11 duo:pb-20 duo:pt-20 ${GUTTER} ${
                        plate
                          ? "duo:border-r duo:border-spur-line"
                          : "duo:col-span-2"
                      }`}
                    >
                      <div>
                        <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.14em] text-spur-accent">
                          {roleLabel}
                        </p>
                        <h2 className="max-w-[20ch] text-balance text-[clamp(26px,3.2vw,44px)] font-bold leading-[1.06] tracking-[-0.03em] transition-colors duration-150 group-hover:text-spur-accent">
                          {project.title}
                        </h2>
                        {project.overviewText && (
                          <p className="mt-6 max-w-[52ch] text-[16px] leading-[1.55] text-spur-body [text-wrap:pretty]">
                            {project.overviewText}
                          </p>
                        )}
                      </div>

                      {project.artists && project.artists.length > 0 && (
                        <div className="border-t border-spur-line pt-5">
                          <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-spur-mut">
                            {t.artistsLabel}
                          </p>
                          <p className="mt-3 max-w-[58ch] font-mono text-[12px] leading-[1.8]">
                            {project.artists.join(" · ")}
                          </p>
                        </div>
                      )}

                      <div className="mt-auto flex items-baseline justify-between gap-6 pt-2">
                        <p className="font-mono text-[11px] leading-[1.6] text-spur-mut">
                          {projectMeta(project)}
                        </p>
                        <span
                          aria-hidden="true"
                          className="shrink-0 font-mono text-[15px] text-spur-mut transition-colors duration-150 group-hover:text-spur-accent"
                        >
                          →
                        </span>
                      </div>
                    </div>

                    {plate && (
                      <div className={`pb-14 duo:py-20 ${GUTTER}`}>
                        {/* A mat, not a bezel: the plate hugs the picture at
                            its own proportions rather than cropping posters
                            into a uniform box. */}
                        <div className="flex justify-center border border-spur-line-soft bg-spur-card p-4 transition-colors duration-150 group-hover:border-spur-ink duo:p-6">
                          <Image
                            src={plate.src}
                            alt={plate.alt ?? ""}
                            width={plate.width ?? 1600}
                            height={plate.height ?? 1200}
                            sizes="(min-width: 1100px) 40vw, 100vw"
                            className="h-auto max-h-[400px] w-auto max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transform-none motion-reduce:transition-none sm:max-h-[480px] duo:max-h-[560px]"
                          />
                        </div>
                      </div>
                    )}
                  </Link>
                );
              })}
            </section>
          </>
        )}

        {/* 4 — Hand-off to the sibling archive. */}
        <section
          className={`spur-dark border-t border-spur-ink bg-spur-ink py-16 text-spur-paper duo:py-24 ${GUTTER}`}
        >
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.16em] text-spur-accent-dark">
            {t.nextLabel}
          </p>
          <h2 className="text-[clamp(34px,5.5vw,72px)] font-black uppercase leading-[0.9] tracking-[-0.04em]">
            <Link
              href="/production"
              className="transition-colors duration-150 hover:text-spur-accent-dark"
            >
              {s.nav.production}
            </Link>
          </h2>
          <p className="mt-6 max-w-[46ch] text-[17px] leading-[1.5] text-spur-dark-body [text-wrap:pretty]">
            {t.nextBody}
          </p>
        </section>
      </main>
      <HomeFooter />
    </div>
  );
}
