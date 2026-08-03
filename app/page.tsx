import Link from "next/link";
import Image from "next/image";
import {
  getProjectBySlug,
  getProjectsByCategory,
  type Project,
} from "@/lib/projects";
import { getLang, getStrings } from "@/lib/lang";
import { projectMeta } from "@/lib/format";
import { getFeed } from "@/lib/feed";
import HomeHeader from "@/components/home/HomeHeader";
import HomeFooter from "@/components/home/HomeFooter";

// "Zwei Spuren / Invers" homepage — direction 2a from the design handoff in
// docs/Redesign_2a. Two parallel tracks: an art track on gallery-white and a
// code track on near-black, joined by hard 1px seams. No border radius
// anywhere; one shadow (the matted artwork card); two animations (marquee,
// live dot), both reduced-motion aware.

// Editorial pick for the exhibition list (5 of the full archive), in the
// handoff's order. Counts and everything else come from the data layer.
const EXHIBITION_SLUGS = [
  "positions-berlin-2024",
  "positions-berlin-2022",
  "i-airtist",
  "pixposure",
  "what-hot-shit",
] as const;

// The works grid and hero artwork draw from What hot Sh!t (2021), as in the
// prototype — the first nine works of its exhibited-works section.
const WORKS_SOURCE_SLUG = "what-hot-shit";
const WORKS_LIMIT = 9;

const MARQUEE_ARTISTS = [
  "Mario Klingemann",
  "Ivona Tau",
  "Iskra Velitchkova",
  "Tamiko Thiel",
  "Kerim Safa",
  "Robness",
  "Ruben Fro",
  "Lulu XXX",
  "Anna Malina",
  "Kirk Sora",
  "Oli Sorenson",
  "Salawaki",
  "Theo Horsmeier",
  "Marissa Noana",
  "mumu_thestan",
  "Merzmensch",
  "HOXID",
  "Luca Martinelli",
];

// 40px page gutter, reduced to 20px on small screens (handoff, Responsive
// behaviour).
const GUTTER = "px-5 md:px-10";

// "Valencia 2023" / "2022–2024" — city plus the year span read from the
// dates field, mirroring the prototype's production-row meta.
function productionMeta(project: Project): string {
  const years = Array.from(new Set(project.dates?.match(/\d{4}/g) ?? []));
  const span =
    years.length > 1
      ? `${years[0]}–${years[years.length - 1]}`
      : String(project.year);
  return project.city ? `${project.city} ${span}` : span;
}

// "40+" rather than a precise artist count — the archive keeps growing and
// the strip reads as an order of magnitude.
function roundedCount(n: number): string {
  return n >= 10 ? `${Math.floor(n / 10) * 10}+` : String(n);
}

export default async function HomePage() {
  const lang = getLang();
  const s = getStrings();

  const exhibitions = getProjectsByCategory("exhibition", lang);
  const productions = getProjectsByCategory("production", lang);
  const allProjects = [...exhibitions, ...productions];

  const exhibitionPicks = EXHIBITION_SLUGS.map((slug) =>
    exhibitions.find((p) => p.slug === slug)
  ).filter((p): p is Project => Boolean(p));

  const worksSource = getProjectBySlug(WORKS_SOURCE_SLUG, lang);
  const works = (worksSource?.artworkSections ?? [])
    .flatMap((section) => section.items)
    .flatMap((work) => (work.image ? [{ ...work, image: work.image }] : []))
    .slice(0, WORKS_LIMIT);
  const heroWork = works[0];

  const cities = new Set(allProjects.map((p) => p.city).filter(Boolean));
  const artists = new Set(allProjects.flatMap((p) => p.artists ?? []));
  const stats = [
    String(allProjects.length),
    String(exhibitions.length),
    String(productions.length),
    String(cities.size),
    roundedCount(artists.size),
  ].map((n, i) => ({ n, label: s.home.statLabels[i] }));

  const feed = await getFeed();

  const marqueeLine = MARQUEE_ARTISTS.join(" · ") + " · ";

  return (
    <div className="spur bg-spur-paper text-spur-ink">
      <HomeHeader />
      <main>
        {/* 1 — Hero: white gallery wall left, black code column right */}
        <section className="grid duo:grid-cols-[1.35fr_1fr]">
          <div className={`py-10 duo:border-r duo:border-spur-ink md:py-12 ${GUTTER} duo:px-11`}>
            <p className="mb-4 font-mono text-[11px] tracking-[0.16em] text-spur-accent">
              {s.home.kickerArt}
            </p>
            <h1 className="text-[clamp(40px,8.5vw,64px)] font-black uppercase leading-[0.86] tracking-[-0.05em] duo:text-[104px]">
              {s.home.heroLine1}
              <br />
              {s.home.heroLine2}
            </h1>
            {heroWork && worksSource && (
              <figure className="mt-9 bg-spur-card p-[22px] shadow-[0_1px_0_#e2dfd7]">
                <div className="relative aspect-[16/10] bg-spur-thumb">
                  <Image
                    src={heroWork.image}
                    alt={`${heroWork.title} — ${heroWork.artist}`}
                    fill
                    priority
                    sizes="(min-width: 1100px) 52vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3 flex justify-between gap-4 font-mono text-[11px] text-spur-mut">
                  <span className="text-spur-ink">
                    {heroWork.title} — {heroWork.artist}
                  </span>
                  <span className="text-right">
                    {worksSource.title.toUpperCase()} · {worksSource.year}
                  </span>
                </figcaption>
              </figure>
            )}
          </div>

          <div className={`spur-dark flex flex-col justify-between gap-12 bg-spur-ink py-10 text-spur-paper md:py-12 ${GUTTER}`}>
            <div>
              <p className="mb-4 font-mono text-[11px] tracking-[0.16em] text-spur-accent-dark">
                {s.home.kickerCode}
              </p>
              <p className="text-[20px] leading-[1.45] [text-wrap:pretty]">
                {s.home.lead}
              </p>
            </div>
            <div className="grid gap-[14px] font-mono text-[12px] leading-[1.7]">
              <div className="border-t border-spur-dark-line-2 pt-3">
                <p className="tracking-[0.1em] text-spur-dark-mut">
                  {s.home.trackArt}
                </p>
                <p>{s.home.artBody}</p>
              </div>
              <div className="border-t border-spur-dark-line-2 pt-3">
                <p className="tracking-[0.1em] text-spur-dark-mut">
                  {s.home.trackCode}
                </p>
                <p>{s.home.codeBody}</p>
              </div>
              <a
                href="mailto:info@ratata.gallery"
                className="mt-1 self-start bg-spur-accent-dark px-6 py-[15px] font-mono text-[12px] font-bold uppercase tracking-[0.14em] text-spur-ink transition-colors duration-150 hover:bg-spur-paper"
              >
                {s.home.cta} →
              </a>
            </div>
          </div>
        </section>

        {/* 2 — Stats strip, wired to the archive */}
        <section
          aria-label={s.home.statLabels[0]}
          className="grid grid-cols-2 border-y border-spur-ink sm:grid-cols-3 duo:grid-cols-5"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="border-b border-r border-spur-line p-6 duo:border-b-0"
            >
              <p className="text-[40px] font-black leading-none tracking-[-0.04em] duo:text-[52px]">
                {stat.n}
              </p>
              <p className="mt-[6px] font-mono text-[11px] uppercase tracking-[0.12em] text-spur-mut">
                {stat.label}
              </p>
            </div>
          ))}
        </section>

        {/* 3 — SIGNAL. Sample data until the feed is wired; hidden entirely
            when the feed comes back empty (handoff §4). */}
        {feed.posts.length > 0 && (
          <section aria-labelledby="signal-heading" className="border-b border-spur-ink">
            <div className={`flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3 pb-[18px] pt-[34px] ${GUTTER}`}>
              <div className="flex flex-wrap items-baseline gap-4">
                <h2
                  id="signal-heading"
                  className="text-[32px] font-black uppercase tracking-[-0.04em] duo:text-[44px]"
                >
                  {s.home.signalTitle}
                </h2>
                <p className="font-mono text-[11px] tracking-[0.14em] text-spur-accent">
                  <span aria-hidden="true" className="spur-blink">
                    ●
                  </span>{" "}
                  {s.home.signalKicker}
                </p>
              </div>
              {feed.sample && (
                <p className="bg-spur-chip px-[9px] py-[5px] font-mono text-[11.5px] tracking-[0.08em] text-spur-ink">
                  {s.home.signalNote}
                </p>
              )}
            </div>

            <div className="grid duo:grid-cols-[1.4fr_1fr]">
              <div className={`pb-[34px] duo:border-r duo:border-spur-ink ${GUTTER}`}>
                <h3 className="mb-[18px] border-b border-spur-line pb-[10px] font-mono text-[11px] tracking-[0.14em] text-spur-mut">
                  {s.home.signalOwn} · @ratata.gallery · @ratata_artcode
                </h3>
                <div className="grid gap-[18px] sm:grid-cols-2">
                  {feed.posts.map((post) => (
                    <article
                      key={`${post.handle}-${post.time}`}
                      className="group border border-spur-line-soft bg-spur-card transition-colors duration-150 hover:border-spur-ink"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-spur-thumb">
                        <Image
                          src={post.imageUrl}
                          alt=""
                          fill
                          sizes="(min-width: 1100px) 28vw, (min-width: 640px) 45vw, 100vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transform-none motion-reduce:transition-none"
                        />
                      </div>
                      <div className="px-[14px] pb-[14px] pt-3">
                        <p className="flex justify-between gap-3 font-mono text-[10.5px] tracking-[0.08em] text-spur-mut-soft">
                          <span className="text-spur-accent">
                            {post.platform} · {post.handle}
                          </span>
                          <span>{post.time}</span>
                        </p>
                        <p className="mt-2 text-[15px] leading-[1.4] [text-wrap:pretty]">
                          {post.text}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              {feed.mentions.length > 0 && (
                <div className={`spur-dark bg-spur-ink pb-[34px] pt-[22px] text-spur-paper ${GUTTER}`}>
                  <h3 className="mb-[6px] border-b border-spur-dark-line-2 pb-[10px] font-mono text-[11px] tracking-[0.14em] text-spur-dark-head">
                    {s.home.signalMentions} · #ratata #tezcon ·{" "}
                    <span className="text-spur-accent-dark">
                      {s.home.signalNote}
                    </span>
                  </h3>
                  {feed.mentions.map((mention) => (
                    <article
                      key={`${mention.handle}-${mention.time}`}
                      className="border-b border-spur-dark-line py-[13px] transition-colors duration-150 hover:text-spur-accent-dark"
                    >
                      <p className="flex justify-between gap-3 font-mono text-[10.5px] tracking-[0.08em] text-spur-dark-mut">
                        <span className="text-spur-accent-dark">
                          {mention.platform} · {mention.handle}
                        </span>
                        <span>{mention.time}</span>
                      </p>
                      <p className="mt-[6px] text-[15px] leading-[1.4] [text-wrap:pretty]">
                        {mention.text}
                      </p>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* 4 — Two tracks: exhibitions & works (white) / services,
            production & platforms (black) */}
        <section className="grid duo:grid-cols-2">
          <div className="duo:border-r duo:border-spur-ink">
            <div className={`flex items-baseline justify-between gap-4 pb-4 pt-[34px] ${GUTTER}`}>
              <h2 className="text-[28px] font-black uppercase tracking-[-0.03em] duo:text-[38px]">
                {s.nav.exhibitions}
              </h2>
              <p className="font-mono text-[11px] tracking-[0.12em] text-spur-mut">
                {exhibitionPicks.length} / {exhibitions.length}{" "}
                {s.home.projectsWord}
              </p>
            </div>

            {exhibitionPicks.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className={`grid grid-cols-[96px_1fr] items-center gap-4 border-t border-spur-line py-4 transition-colors duration-150 hover:bg-spur-card sm:grid-cols-[132px_1fr] sm:gap-5 ${GUTTER}`}
              >
                <div className="relative h-[64px] overflow-hidden bg-spur-thumb sm:h-[88px]">
                  {project.images?.[0] && (
                    <Image
                      src={project.images[0]}
                      alt={project.title}
                      fill
                      sizes="132px"
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="min-w-0">
                  <h3 className="text-[18px] font-semibold leading-[1.15] tracking-[-0.01em] sm:text-[22px]">
                    {project.title}
                  </h3>
                  <p className="mt-2 font-mono text-[11px] leading-[1.5] text-spur-mut">
                    {projectMeta(project)}
                  </p>
                </div>
              </Link>
            ))}

            <div className={`border-t border-spur-line py-5 ${GUTTER}`}>
              <Link
                href="/exhibitions"
                className="font-mono text-[12px] tracking-[0.12em] text-spur-accent hover:underline"
              >
                {s.home.archiveLink} →
              </Link>
            </div>

            <div className={`border-t border-spur-ink pb-[14px] pt-[30px] ${GUTTER}`}>
              <h2 className="text-[28px] font-black uppercase tracking-[-0.03em] duo:text-[38px]">
                {s.home.worksShown}
              </h2>
            </div>
            <div className={`grid grid-cols-2 gap-[14px] pb-9 sm:grid-cols-3 ${GUTTER}`}>
              {works.map((work) => (
                <figure
                  key={work.image}
                  className="group border border-spur-line-soft bg-spur-card p-[10px]"
                >
                  <div className="relative aspect-square overflow-hidden bg-spur-thumb">
                    <Image
                      src={work.image}
                      alt={`${work.title} — ${work.artist}`}
                      fill
                      sizes="(min-width: 1100px) 15vw, (min-width: 640px) 30vw, 45vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
                    />
                  </div>
                  <figcaption className="mt-2 font-mono text-[10px] text-spur-mut">
                    {work.artist}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div className="spur-dark bg-spur-ink text-spur-paper">
            {/* NEW content vs. the live site — copy needs sign-off (handoff). */}
            <div id="leistungen" className={`scroll-mt-[76px] pb-4 pt-[34px] ${GUTTER}`}>
              <h2 className="text-[28px] font-black uppercase tracking-[-0.03em] duo:text-[38px]">
                {s.home.servicesTitle}
              </h2>
            </div>
            {s.home.services.map((service, index) => (
              <div
                key={service.title}
                className={`grid grid-cols-[28px_1fr] gap-[18px] border-t border-spur-dark-line py-[18px] ${GUTTER}`}
              >
                <p className="font-mono text-[11px] text-spur-accent-dark">
                  0{index + 1}
                </p>
                <div>
                  <h3 className="text-[21px] font-semibold tracking-[-0.01em]">
                    {service.title}
                  </h3>
                  <p className="mt-[6px] text-[15px] leading-[1.5] text-spur-dark-body [text-wrap:pretty]">
                    {service.body}
                  </p>
                </div>
              </div>
            ))}

            <div className={`flex items-baseline justify-between gap-4 border-t border-spur-dark-line pb-3 pt-[30px] ${GUTTER}`}>
              <h2 className="text-[28px] font-black uppercase tracking-[-0.03em] duo:text-[38px]">
                {s.nav.production}
              </h2>
              <p className="font-mono text-[11px] tracking-[0.12em] text-spur-dark-mut">
                {productions.length} {s.home.projectsWord}
              </p>
            </div>
            {productions.map((project, index) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className={`grid grid-cols-[26px_1fr_auto] items-baseline gap-4 border-t border-spur-dark-line py-[11px] font-mono text-[12px] transition-colors duration-150 hover:bg-spur-paper hover:text-spur-ink ${GUTTER}`}
              >
                <span className="text-spur-dark-mut">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 font-sans text-[15px] font-medium tracking-[-0.01em] sm:text-[17px]">
                  {project.title}
                </span>
                <span className="opacity-70">{productionMeta(project)}</span>
              </Link>
            ))}

            {/* NEW grouping vs. the live site (handoff). */}
            <div className={`border-t border-spur-dark-line pb-[14px] pt-[30px] ${GUTTER}`}>
              <h2 className="text-[28px] font-black uppercase tracking-[-0.03em] duo:text-[38px]">
                {s.home.platformsTitle}
              </h2>
            </div>
            <div className="mx-5 mb-9 grid gap-px bg-spur-dark-line sm:grid-cols-2 md:mx-10">
              {s.home.platforms.map((platform) => (
                <div key={platform.name} className="bg-spur-ink p-4">
                  <h3 className="text-[19px] font-bold tracking-[-0.01em]">
                    {platform.name}
                  </h3>
                  <p className="mt-1 font-mono text-[11px] text-spur-dark-mut">
                    {platform.year}
                  </p>
                  <p className="mt-2 text-[14px] leading-[1.45] text-spur-dark-body">
                    {platform.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5 — Artist marquee */}
        <section
          aria-label={s.home.statLabels[4]}
          className="overflow-hidden border-y border-spur-ink bg-spur-paper py-4"
        >
          <div
            aria-hidden="true"
            className="spur-marquee flex w-max gap-10 whitespace-nowrap text-[26px] font-extrabold uppercase tracking-[-0.02em] max-md:[animation-duration:24s]"
          >
            <span>{marqueeLine}</span>
            <span>{marqueeLine}</span>
          </div>
          <p className="sr-only">{MARQUEE_ARTISTS.join(", ")}</p>
        </section>

        {/* 6 — TezCon + Press */}
        <section className="grid duo:grid-cols-2">
          <div className={`border-b border-spur-ink py-9 duo:border-b-0 duo:border-r ${GUTTER}`}>
            <p className="mb-3 font-mono text-[11px] tracking-[0.16em] text-spur-accent">
              {s.home.tezKicker}
            </p>
            <h2 className="text-[40px] font-black leading-[0.95] tracking-[-0.04em] duo:text-[56px]">
              <Link
                href="/tezcon-europe"
                className="transition-colors duration-150 hover:text-spur-accent"
              >
                TezCon
                <br />
                Europe
              </Link>
            </h2>
            <p className="my-4 max-w-[44ch] text-[17px] leading-[1.5] text-spur-body [text-wrap:pretty]">
              {s.home.tezBody}
            </p>
            <p className="flex flex-wrap gap-x-6 gap-y-1 font-mono text-[11px] tracking-[0.1em] text-spur-mut">
              <span>2027</span>
              <span>FRANKFURT AM MAIN</span>
              <span>TALKS · SHOW · MUSIC</span>
            </p>
          </div>

          {/* NEW block vs. the live site; the three asset rows stay unlinked
              until the files exist (handoff §7). */}
          <div className={`py-9 ${GUTTER}`}>
            <p className="mb-3 font-mono text-[11px] tracking-[0.16em] text-spur-accent">
              {s.home.pressKicker}
            </p>
            <h2 className="text-[40px] font-black leading-[0.95] tracking-[-0.04em] duo:text-[56px]">
              {s.home.pressTitle}
            </h2>
            <ul className="mt-[18px]">
              {s.home.press.map((row, index) => {
                const isContact = index === s.home.press.length - 1;
                const inner = (
                  <>
                    <span>{row.label}</span>
                    <span className="text-right text-spur-mut-soft">
                      {row.note}
                    </span>
                  </>
                );
                return (
                  <li
                    key={row.label}
                    className="border-t border-spur-line font-mono text-[12px] tracking-[0.06em]"
                  >
                    {isContact ? (
                      <a
                        href="mailto:info@ratata.gallery"
                        className="flex justify-between gap-4 py-[13px] transition-colors duration-150 hover:text-spur-accent"
                      >
                        {inner}
                      </a>
                    ) : (
                      <p className="flex justify-between gap-4 py-[13px]">
                        {inner}
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* 7 — Partners band */}
        <section
          aria-label={s.home.partnersTitle}
          className={`border-t border-spur-ink py-[30px] ${GUTTER}`}
        >
          <p className="mb-[18px] font-mono text-[11px] tracking-[0.16em] text-spur-mut-soft">
            {s.home.partnersTitle}
          </p>
          <div className="flex flex-wrap items-center gap-[34px]">
            {s.about.partners.map((partner) =>
              partner.image ? (
                <a
                  key={partner.url}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={partner.name}
                >
                  <Image
                    src={partner.image}
                    alt={partner.imageAlt}
                    width={130}
                    height={30}
                    className="h-[30px] w-auto max-w-[130px] object-contain opacity-55 grayscale transition-[filter,opacity] duration-150 hover:opacity-100 hover:grayscale-0"
                  />
                </a>
              ) : null
            )}
          </div>
        </section>
      </main>
      <HomeFooter />
    </div>
  );
}
