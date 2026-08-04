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

// Marquee is hidden for now but kept intact — set to true to show it again.
const SHOW_ARTIST_MARQUEE = false;

// Press block is hidden until the kit exists; the copy and rows stay in
// strings.ts — set to true to bring it back.
const SHOW_PRESS = false;

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

export default async function HomePage() {
  const lang = getLang();
  const s = getStrings();

  const exhibitions = getProjectsByCategory("exhibition", lang);
  const productions = getProjectsByCategory("production", lang);

  const exhibitionPicks = EXHIBITION_SLUGS.map((slug) =>
    exhibitions.find((p) => p.slug === slug)
  ).filter((p): p is Project => Boolean(p));

  const worksSource = getProjectBySlug(WORKS_SOURCE_SLUG, lang);
  const works = (worksSource?.artworkSections ?? [])
    .flatMap((section) => section.items)
    .flatMap((work) => (work.image ? [{ ...work, image: work.image }] : []))
    .slice(0, WORKS_LIMIT);
  const heroWork = works[0];

  const feed = await getFeed();
  const hasMentions = feed.mentions.length > 0;

  const marqueeLine = MARQUEE_ARTISTS.join(" · ") + " · ";

  return (
    <div className="spur bg-spur-paper text-spur-ink">
      <HomeHeader />
      <main>
        {/* 1 — Hero: white gallery wall left, a featured exhibition on the
            dark track right. The seam sits on the page centre, the same line
            every other two-track section below uses, so one spine runs the
            whole page. The headline scales with the viewport so its longest
            word always clears the narrower column. */}
        <section className="grid duo:grid-cols-2">
          <div className={`py-12 duo:border-r duo:border-spur-ink duo:py-16 ${GUTTER} duo:px-11`}>
            {/* 0.93, not tighter: Archivo Black puts the umlaut of Ä at
                0.89em above the baseline, so anything under ~0.9 drives
                WÄNDE's dots into the line above. */}
            <h1 className="text-[clamp(36px,7.5vw,56px)] font-black uppercase leading-[0.93] tracking-[-0.05em] duo:text-[clamp(56px,6.6vw,88px)]">
              {s.home.heroLine1}
              <br />
              {s.home.heroLine2}
            </h1>
            {/* The lead moved to the ratata card on the dark track, so the
                work gets the room it left behind and runs taller. */}
            {heroWork && worksSource && (
              <figure className="mt-10 bg-spur-card p-[22px] shadow-[0_1px_0_#e2dfd7]">
                <div className="relative aspect-[4/3] bg-spur-thumb">
                  <Image
                    src={heroWork.image}
                    alt={`${heroWork.title}, ${heroWork.artist}`}
                    fill
                    priority
                    sizes="(min-width: 1100px) 48vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3 flex justify-between gap-4 font-mono text-[11px] text-spur-mut">
                  <span className="text-spur-ink">
                    {heroWork.title} · {heroWork.artist}
                  </span>
                  <span className="text-right">
                    {worksSource.title.toUpperCase()} · {worksSource.year}
                  </span>
                </figcaption>
              </figure>
            )}
          </div>

          {/* The dark track opens with ratata itself, then says what the
              studio does. The archive plate that used to sit here now runs
              below, where it gets a track of its own. */}
          <div className="spur-dark flex flex-col bg-spur-ink text-spur-paper">
            {/* A matted plate, the same device the dark track already uses to
                hold the archive poster. Inverting it to carry type is what
                "Zwei Spuren / Invers" is for. */}
            <div className={`py-12 duo:py-16 ${GUTTER}`}>
              <div className="bg-spur-card p-[22px] duo:p-[30px]">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-spur-accent">
                  {s.site.wordmark}
                  {s.site.wordmarkSuffix}
                </p>
                <p className="mt-5 max-w-[42ch] text-[19px] leading-[1.45] text-spur-ink duo:text-[21px] [text-wrap:pretty]">
                  {s.home.lead}
                </p>
              </div>
            </div>

            <div
              id="leistungen"
              className={`scroll-mt-[76px] border-t border-spur-dark-line pb-6 pt-10 ${GUTTER}`}
            >
              <h2 className="text-[28px] font-black uppercase tracking-[-0.03em] duo:text-[38px]">
                {s.home.servicesTitle}
              </h2>
            </div>
            {/* Definition blocks, per the handoff's dark-track spec: a hair
                rule, a mono label, and the sentence carrying the weight. */}
            {s.home.services.map((service) => (
              <div
                key={service.title}
                className={`border-t border-spur-dark-line-2 py-6 ${GUTTER}`}
              >
                <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-spur-dark-mut">
                  {service.title}
                </h3>
                <p className="mt-3 max-w-[46ch] text-[17px] leading-[1.5] text-spur-paper [text-wrap:pretty]">
                  {service.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 2 — SIGNAL. Sample data until the feed is wired; hidden entirely
            when the feed comes back empty (handoff §4). */}
        {feed.posts.length > 0 && (
          <section aria-labelledby="signal-heading" className="border-t border-spur-ink">
            <div className={`flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3 pb-6 pt-14 duo:pt-[72px] ${GUTTER}`}>
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

            {/* Two-track only while there are mentions to show; the seam then
                lands on the page centre like every other one. With the
                mentions source not wired yet this runs full width. */}
            <div className={hasMentions ? "grid duo:grid-cols-2" : undefined}>
              <div
                className={`pb-14 duo:pb-[72px] ${GUTTER} ${
                  hasMentions ? "duo:border-r duo:border-spur-ink" : ""
                }`}
              >
                <h3 className="mb-6 border-b border-spur-line pb-[10px] font-mono text-[11px] tracking-[0.14em] text-spur-mut">
                  {s.home.signalOwn} · @ratata.gallery · @ratata_nft
                </h3>
                <div
                  className={`grid gap-6 sm:grid-cols-2 ${
                    hasMentions ? "" : "duo:grid-cols-4"
                  }`}
                >
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
                          sizes="(min-width: 1100px) 25vw, (min-width: 640px) 45vw, 100vw"
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

              {hasMentions && (
                <div className={`spur-dark bg-spur-ink pb-14 pt-8 text-spur-paper duo:pb-[72px] ${GUTTER}`}>
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

        {/* 3 — Two tracks: exhibitions (white) / the featured archive show
            (black). The seam against the hero runs in ink over the white
            track and continues in white over the dark one, so the line stays
            visible across the whole width. */}
        <section className="grid duo:grid-cols-2">
          <div className="border-t border-spur-ink duo:border-r">
            <div className={`pb-6 pt-14 duo:pt-[72px] ${GUTTER}`}>
              <h2 className="text-[28px] font-black uppercase tracking-[-0.03em] duo:text-[38px]">
                {s.nav.exhibitions}
              </h2>
            </div>

            {exhibitionPicks.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className={`grid grid-cols-[96px_1fr] items-center gap-4 border-t border-spur-line py-5 transition-colors duration-150 hover:bg-spur-card sm:grid-cols-[132px_1fr] sm:gap-5 ${GUTTER}`}
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

            <div className={`border-t border-spur-line py-6 ${GUTTER}`}>
              <Link
                href="/exhibitions"
                className="font-mono text-[12px] tracking-[0.12em] text-spur-accent hover:underline"
              >
                {s.home.archiveLink} →
              </Link>
            </div>

          </div>

          {/* The archive plate: the show the works grid below draws from. It
              has the whole track to itself here, so the poster runs at full
              column width. */}
          <div className="spur-dark flex flex-col bg-spur-ink text-spur-paper duo:border-t duo:border-spur-paper">
            {worksSource && (
              <div className={`flex grow flex-col pb-12 pt-14 duo:pt-[72px] ${GUTTER}`}>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-spur-accent-dark">
                  {s.home.featuredKicker}
                </p>
                <Link
                  href={`/projects/${worksSource.slug}`}
                  className="group mt-8 flex grow flex-col"
                >
                  {/* The mat grows with the column, so the artwork absorbs
                      whatever height the left track sets instead of leaving a
                      void under the text. */}
                  <div className="flex grow flex-col bg-spur-card p-[14px]">
                    <div className="relative aspect-[4/3] grow overflow-hidden bg-spur-thumb">
                      {worksSource.images?.[0] && (
                        <Image
                          src={worksSource.images[0]}
                          alt={worksSource.title}
                          fill
                          sizes="(min-width: 1100px) 48vw, 100vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transform-none motion-reduce:transition-none"
                        />
                      )}
                    </div>
                  </div>
                  <h2 className="mt-8 text-[clamp(32px,3.2vw,44px)] font-black uppercase leading-[0.95] tracking-[-0.03em] transition-colors duration-150 group-hover:text-spur-accent-dark">
                    {worksSource.title}
                  </h2>
                  <p className="mt-3 font-mono text-[12px] tracking-[0.06em] text-spur-dark-mut">
                    {projectMeta(worksSource)}
                  </p>
                  {worksSource.overviewText && (
                    <p className="mt-4 max-w-[52ch] text-[15px] leading-[1.55] text-spur-dark-body [text-wrap:pretty]">
                      {worksSource.overviewText}
                    </p>
                  )}
                  <p className="mt-8 font-mono text-[12px] font-bold uppercase tracking-[0.14em] text-spur-accent-dark">
                    {s.home.featuredLink} →
                  </p>
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* 3b — Second row on the same spine: works (white) / production and
            platforms (black). Its top seam runs in ink over the white half and
            continues in white over the dark one, so Produktion starts on the
            same line as the works. */}
        <section className="grid duo:grid-cols-2">
          <div className="border-t border-spur-ink duo:border-r">
            <div className={`pb-6 pt-14 duo:pt-[72px] ${GUTTER}`}>
              <h2 className="text-[28px] font-black uppercase tracking-[-0.03em] duo:text-[38px]">
                {s.home.worksShown}
              </h2>
            </div>
            <div className={`grid grid-cols-2 gap-4 pb-14 duo:pb-[72px] sm:grid-cols-3 ${GUTTER}`}>
              {works.map((work) => (
                <figure
                  key={work.image}
                  className="group border border-spur-line-soft bg-spur-card p-[10px]"
                >
                  <div className="relative aspect-square overflow-hidden bg-spur-thumb">
                    <Image
                      src={work.image}
                      alt={`${work.title}, ${work.artist}`}
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

            {/* TezCon closes the white track. The works grid ends well short
                of the production and platforms column beside it, and this is
                the announcement that earns the room. */}
            <div className={`border-t border-spur-line pb-14 pt-12 duo:pb-[72px] duo:pt-16 ${GUTTER}`}>
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
          </div>

          <div className="spur-dark bg-spur-ink text-spur-paper duo:border-t duo:border-spur-paper">
            <div className={`pb-6 pt-14 duo:pt-[72px] ${GUTTER}`}>
              <h2 className="text-[28px] font-black uppercase tracking-[-0.03em] duo:text-[38px]">
                {s.nav.production}
              </h2>
            </div>
            {productions.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className={`grid grid-cols-[1fr_auto] items-baseline gap-5 border-t border-spur-dark-line py-4 font-mono text-[12px] transition-colors duration-150 hover:bg-spur-paper hover:text-spur-ink ${GUTTER}`}
              >
                <span className="min-w-0 font-sans text-[15px] font-medium tracking-[-0.01em] sm:text-[17px]">
                  {project.title}
                </span>
                <span className="opacity-70">{productionMeta(project)}</span>
              </Link>
            ))}

            {/* NEW grouping vs. the live site (handoff). */}
            <div className={`border-t border-spur-dark-line pb-6 pt-14 duo:pt-[72px] ${GUTTER}`}>
              <h2 className="text-[28px] font-black uppercase tracking-[-0.03em] duo:text-[38px]">
                {s.home.platformsTitle}
              </h2>
            </div>
            <div className="mx-5 mb-14 grid gap-px bg-spur-dark-line duo:mb-[72px] sm:grid-cols-2 md:mx-10">
              {s.home.platforms.map((platform) => (
                <div key={platform.name} className="bg-spur-ink p-5">
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

        {/* 4 — Artist marquee. Hidden for now (SHOW_ARTIST_MARQUEE), not
            removed: flip the flag to bring it back. */}
        {SHOW_ARTIST_MARQUEE && (
        <section
          aria-label={s.home.statLabels[4]}
          className="overflow-hidden border-y border-spur-ink bg-spur-paper py-6"
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
        )}

        {/* 5 — Press. Hidden for now (SHOW_PRESS), not removed: the asset
            rows stay unlinked until the files exist (handoff §7), and TezCon,
            which used to share this row, now closes the white track above. */}
        {SHOW_PRESS && (
        <section className="grid duo:grid-cols-2">
          <div className={`py-14 duo:col-start-2 duo:py-[72px] ${GUTTER}`}>
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
                        className="flex justify-between gap-4 py-4 transition-colors duration-150 hover:text-spur-accent"
                      >
                        {inner}
                      </a>
                    ) : (
                      <p className="flex justify-between gap-4 py-4">
                        {inner}
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
        )}

        {/* 6 — Partners band */}
        <section
          aria-label={s.home.partnersTitle}
          className={`border-t border-spur-ink py-12 duo:py-16 ${GUTTER}`}
        >
          <p className="mb-6 font-mono text-[11px] tracking-[0.16em] text-spur-mut-soft">
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
