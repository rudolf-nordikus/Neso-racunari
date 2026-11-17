"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Označi [data-reveal] elemente kad uđu u ekran (CSS u globals.css radi animaciju). */
export function Reveal() {
  const pathname = usePathname();
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-in])");
    document.querySelectorAll<HTMLElement>("[data-stagger]").forEach((g) =>
      Array.from(g.children).forEach((c, i) => (c as HTMLElement).style.setProperty("--i", String(i))),
    );
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.setAttribute("data-in", "");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);
  return null;
}
