// DESIGN.md §5.9 — per-section hero: eyebrow, display-l title, optional
// body-l intro. Whitespace + type only, no background image or gradient.
export default function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
}) {
  return (
    <header className="mb-16 md:mb-24">
      {eyebrow && (
        <p className="mb-3 text-meta uppercase text-ink-muted">{eyebrow}</p>
      )}
      <h1 className="font-serif text-display-l font-normal text-ink">{title}</h1>
      {intro && (
        <p className="mt-4 max-w-measure text-body-l text-ink-secondary">
          {intro}
        </p>
      )}
    </header>
  );
}
