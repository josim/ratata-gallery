// DESIGN.md §5.9 — per-section hero: eyebrow, display-l title, optional
// body-l intro. Whitespace + type only, no background image or gradient.
export default function PageHero({
  eyebrow,
  title,
  intro,
  archiveSummary,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  archiveSummary?: {
    countLabel: string;
    yearRange: string;
  };
}) {
  return (
    <header
      className={
        archiveSummary
          ? "mb-16 border-y border-line py-8 md:mb-24 md:py-12"
          : "mb-16 md:mb-24"
      }
    >
      <div className={archiveSummary ? "grid gap-10 md:grid-cols-12" : ""}>
        <div className={archiveSummary ? "md:col-span-9" : ""}>
          {eyebrow && (
            <p className="mb-3 text-meta uppercase text-ink-muted">{eyebrow}</p>
          )}
          <h1
            className={
              archiveSummary
                ? "max-w-[12ch] text-balance font-serif text-[clamp(3.5rem,8vw,6rem)] font-normal leading-[0.9] tracking-[-0.03em] text-ink"
                : "font-serif text-display-l font-normal text-ink"
            }
          >
            {title}
          </h1>
          {intro && (
            <p className="mt-4 max-w-measure text-body-l text-ink-secondary">
              {intro}
            </p>
          )}
        </div>

        {archiveSummary && (
          <div className="flex items-end justify-between gap-6 border-t border-line pt-4 md:col-span-3 md:flex-col md:items-end md:border-t-0 md:pt-0">
            <span className="text-meta uppercase text-ink-muted">
              {archiveSummary.countLabel}
            </span>
            <span className="text-meta uppercase text-ink-muted [font-variant-numeric:tabular-nums]">
              {archiveSummary.yearRange}
            </span>
          </div>
        )}
      </div>
    </header>
  );
}
