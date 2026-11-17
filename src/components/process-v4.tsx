"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import { koraci } from "@/content/home";
import { Accent, ICON, NzWatermark } from "./ui";

/*
 * "Kako radi" po Figmi v4 (sekcija 57:231, 4 stanja).
 * Lijevo naslov, opis, 4 dugmeta i traka napretka; desno kartica u boji koraka sa 3D slikom.
 * Desktop: panel je sticky dok traju 4 koraka, skrol bira korak, klik na dugme skrola do koraka.
 * Mobitel i "smanji animacije": bez sticky efekta, dugmad prebacuju korak.
 */

const N = koraci.length;
const KARTICA = [
  { bg: "bg-amber-500", nz: "text-navy-900/[0.12]", cap: "bg-navy-900/55" },
  { bg: "bg-blue-500", nz: "text-navy-900/[0.16]", cap: "bg-navy-900/40" },
  { bg: "bg-navy-800", nz: "text-white/[0.04]", cap: "bg-navy-900" },
  { bg: "bg-amber-500", nz: "text-navy-900/[0.12]", cap: "bg-navy-900/55" },
];

export function ProcessV4() {
  const wrapRef = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);
  const [scrolly, setScrolly] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    let raf = 0;
    const tick = () => {
      const el = wrapRef.current;
      if (!el || !mq.matches) return;
      const r = el.getBoundingClientRect();
      const range = r.height - window.innerHeight;
      const p = range > 0 ? Math.min(1, Math.max(0, -r.top / range)) : 0;
      setStep(Math.min(N - 1, Math.floor(p * N * 0.9999)));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };
    const sync = () => {
      setScrolly(mq.matches);
      onScroll();
    };
    sync();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    mq.addEventListener("change", sync);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      mq.removeEventListener("change", sync);
    };
  }, []);

  const goTo = (i: number) => {
    const el = wrapRef.current;
    if (!scrolly || !el) {
      setStep(i);
      return;
    }
    const top = el.getBoundingClientRect().top + window.scrollY;
    const range = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + range * ((i + 0.5) / N), behavior: "smooth" });
  };

  const k = koraci[step];
  const c = KARTICA[step];

  return (
    <section
      id="kako-radi"
      ref={wrapRef}
      aria-labelledby="kako-radi-naslov"
      className="relative motion-safe:lg:h-[280vh]"
    >
      <div className="motion-safe:lg:sticky motion-safe:lg:top-[88px] motion-safe:lg:flex motion-safe:lg:h-[calc(100svh-100px)] motion-safe:lg:items-center">
        <div
          data-reveal
          className="grid w-full items-center gap-6 rounded-[24px] bg-navy-900 p-3 md:rounded-[32px] md:p-4 lg:grid-cols-[1fr_1.05fr] lg:gap-10"
        >
          <div className="flex flex-col items-start gap-4 px-2 pt-6 md:gap-5 md:px-8 md:pt-8 lg:py-10 lg:pl-11">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500 px-3 py-1.5 text-[13px] font-medium text-navy-900">
              Skrolajte kroz proces <ArrowDown size={14} strokeWidth={ICON} aria-hidden className="hidden lg:inline" />
            </span>
            <h2 id="kako-radi-naslov" className="text-[36px] leading-[1.08] text-white md:text-[56px]">
              <Accent text="Mobilni tim u Sarajevu" accent="Mobilni tim" />
            </h2>
            <p className="max-w-[480px] text-[16px] leading-relaxed text-white/65 md:text-[18px]">
              Od poziva do popravljenog uređaja u 4 koraka. Cijenu znate prije nego što počnemo.
            </p>
            <div className="mt-1 w-full max-w-[520px]">
              <div role="tablist" aria-label="Koraci" className="flex flex-wrap gap-1">
                {koraci.map((s, i) => (
                  <button
                    key={s.kratko}
                    type="button"
                    role="tab"
                    aria-selected={i === step}
                    onClick={() => goTo(i)}
                    className={`rounded-full px-3.5 py-2 text-[14px] font-medium transition-colors duration-200 ${i === step ? "bg-amber-500 text-navy-900" : "text-white hover:bg-white/10"}`}
                  >
                    {i + 1} {s.kratko}
                  </button>
                ))}
              </div>
              <div className="mt-3 grid grid-cols-4 gap-1" aria-hidden>
                {koraci.map((s, i) => (
                  <i
                    key={s.kratko}
                    className={`h-[3px] rounded-full transition-colors duration-300 ${i <= step ? "bg-amber-500" : "bg-white/15"}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div
            role="tabpanel"
            aria-live="polite"
            className={`relative flex aspect-[4/3.4] flex-col justify-end overflow-hidden rounded-[20px] p-3 transition-colors duration-500 md:aspect-[16/12] md:rounded-[24px] md:p-4 ${c.bg}`}
          >
            <NzWatermark className={`top-1/2 left-1/2 h-[92%] -translate-x-1/2 -translate-y-1/2 transition-colors duration-500 ${c.nz}`} />
            {koraci.map((s, i) => (
              <Image
                key={s.ikona}
                src={`/img/3d/${s.ikona}.webp`}
                alt=""
                width={560}
                height={560}
                sizes="(min-width: 1024px) 320px, 60vw"
                className={`absolute top-[8%] left-1/2 h-[62%] w-auto -translate-x-1/2 object-contain transition-[opacity,transform] duration-500 ease-out ${i === step ? "scale-100 opacity-100" : "scale-[0.94] opacity-0"}`}
              />
            ))}
            <div key={step} className={`relative rounded-[14px] px-4 py-3 backdrop-blur-md md:rounded-[16px] md:px-5 md:py-4 animate-[stepIn_.4s_cubic-bezier(.2,.8,.2,1)] ${c.cap}`}>
              <p className="text-[12px] font-medium tracking-wide text-amber-500 md:text-[13px]">
                KORAK {step + 1} OD {N}
              </p>
              <p className="mt-0.5 text-[16px] font-medium text-white md:text-[19px]">{k.naslov}</p>
              <p className="mt-0.5 text-[14px] text-white/80 md:text-[15px]">{k.opis}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
