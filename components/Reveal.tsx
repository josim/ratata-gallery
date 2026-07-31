"use client";

import { useEffect, useRef, useState } from "react";

// Editorial reveal: content is held back until it scrolls into view, then the
// hairline draws, the plate develops and the type rises. The animation itself
// lives in globals.css; this only reports "in view" once and never again.
// Under prefers-reduced-motion (or without IntersectionObserver) it resolves
// immediately, and the CSS is gated on the `js` class so a page that never
// hydrates still shows everything.
export function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setInView(true);
        observer.disconnect();
      },
      { rootMargin: "0px 0px -12% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

export default function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div ref={ref} data-reveal={inView ? "in" : "out"} className={className}>
      {children}
    </div>
  );
}
