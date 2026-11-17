"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import { koraci } from "@/content/home";
import { Accent, ICON } from "./ui";

/*
 * "Kako radi" po Figmi v4 (sekcija 57:231, 4 stanja).
 * Lijevo naslov, opis, 4 dugmeta i traka napretka; desno kartica sa three.js pričom
 * (process-scene.ts: kvar, poziv, Berlingo dolazi, preuzimanje, servis, povratak, sretni).
 * Desktop: panel je sticky, skrol vodi priču, klik na dugme skrola do koraka.
 * Mobitel: priča se vrti sama (korak po korak, u krug), dodir na dugme skače na korak.
 * "Smanji animacije" ili bez WebGL-a: 3D ilustracija koraka, dugmad prebacuju korak.
 */

const N = koraci.length;
const SCENE_STEPS = 7;
/** Koji dio 7 scena pokriva koji od 4 koraka kartice. */
const OPSEG: [number, number][] = [
  [0, 2], // Poziv: kvar + poziv
  [2, 4], // Preuzimanje: Berlingo dolazi + preuzimanje
  [4, 5], // Servis
  [5, 7], // Povratak: vraćanje + sretni
];
/** Trajanje koraka u sekundama kad se priča vrti sama (mobitel). */
const TRAJANJE = [6, 7, 4.5, 7];
const NEBO = [
  "from-[#0b2342] to-[#1a4a80]",
  "from-[#0f3463] to-[#2a6bb5]",
  "from-[#0a1d36] to-[#12325c]",
  "from-[#1b4f8f] to-[#3d8ae0]",
];

const sceneFraction = (tab: number, local: number) => {
  const [a, b] = OPSEG[tab];
  return (a + (b - a) * Math.min(0.999, Math.max(0, local))) / SCENE_STEPS;
};

export function ProcessV4() {
  const wrapRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progress = useRef(0);
  const play = useRef({ tab: 0, local: 0 });
  const [step, setStep] = useState(0);
  const [scrolly, setScrolly] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [ready, setReady] = useState(false);

  const getProgress = useCallback(() => progress.current, []);

  // Desktop: skrol vodi priču.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    const tick = () => {
      const el = wrapRef.current;
      const pin = pinRef.current;
      if (!el || !pin || !mq.matches) return;
      // Napredak = koliko je panel već "proklizao" kroz sekciju dok je zakačen.
      const range = el.offsetHeight - pin.offsetHeight;
      const moved = pin.getBoundingClientRect().top - el.getBoundingClientRect().top;
      const p = range > 0 ? Math.min(1, Math.max(0, moved / range)) : 0;
      const tab = Math.min(N - 1, Math.floor(p * N * 0.9999));
      progress.current = sceneFraction(tab, p * N - tab);
      setStep(tab);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };
    const sync = () => {
      setScrolly(mq.matches);
      setReduced(rm.matches);
      onScroll();
    };
    sync();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    mq.addEventListener("change", sync);
    rm.addEventListener("change", sync);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      mq.removeEventListener("change", sync);
      rm.removeEventListener("change", sync);
    };
  }, []);

  // Mobitel: priča se vrti sama dok je sekcija na ekranu.
  useEffect(() => {
    if (scrolly || reduced || !ready) return;
    let raf = 0;
    let last = performance.now();
    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.35 });
    if (canvasRef.current) io.observe(canvasRef.current);
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      if (!visible || document.hidden) return;
      const s = play.current;
      s.local += dt / TRAJANJE[s.tab];
      if (s.local >= 1) {
        s.tab = (s.tab + 1) % N;
        s.local = 0;
        setStep(s.tab);
      }
      progress.current = sceneFraction(s.tab, s.local);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [scrolly, reduced, ready]);

  // three.js scena (učitava se tek kad treba, bez nje stoje 3D ilustracije).
  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    let disposed = false;
    let dispose: (() => void) | undefined;
    import("./process-scene")
      .then(({ mountProcessScene }) => {
        if (disposed) return;
        try {
          dispose = mountProcessScene({ canvas, getProgress, steps: SCENE_STEPS, shiftY: 0.1, zoom: 1.35 }).dispose;
          setReady(true);
        } catch {
          /* bez WebGL-a ostaje ilustracija */
        }
      })
      .catch(() => {});
    return () => {
      disposed = true;
      dispose?.();
      setReady(false);
    };
  }, [reduced, getProgress]);

  const goTo = (i: number) => {
    const el = wrapRef.current;
    const pin = pinRef.current;
    if (!scrolly || !el || !pin) {
      play.current = { tab: i, local: 0 };
      progress.current = sceneFraction(i, 0);
      setStep(i);
      return;
    }
    const top = el.getBoundingClientRect().top + window.scrollY;
    const range = el.offsetHeight - pin.offsetHeight;
    const stickyTop = parseFloat(getComputedStyle(pin).top) || 0;
    window.scrollTo({ top: top + range * ((i + 0.08) / N) - stickyTop, behavior: "smooth" });
  };

  const k = koraci[step];

  return (
    <section
      id="kako-radi"
      ref={wrapRef}
      aria-labelledby="kako-radi-naslov"
      className="relative motion-safe:lg:h-[420vh]"
    >
      <div ref={pinRef} className="motion-safe:lg:sticky motion-safe:lg:top-[max(92px,calc(50svh_-_260px))]">
        <div
          data-reveal
          className="grid w-full items-center gap-6 rounded-[24px] bg-navy-900 p-3 md:rounded-[32px] md:p-4 lg:grid-cols-[1fr_1.15fr] lg:gap-10"
        >
          <div className="flex flex-col items-start gap-4 px-2 pt-6 md:gap-5 md:px-8 md:pt-8 lg:py-10 lg:pl-11">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500 px-3 py-1.5 text-[13px] font-medium text-navy-900">
              <span className="lg:hidden">Proces u 4 koraka</span>
              <span className="hidden lg:inline">Skrolajte kroz proces</span>
              <ArrowDown size={14} strokeWidth={ICON} aria-hidden className="hidden lg:inline" />
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
            className={`relative flex aspect-[4/4.3] flex-col justify-end overflow-hidden rounded-[20px] bg-gradient-to-b p-3 md:aspect-[16/12] md:rounded-[24px] md:p-4 ${NEBO[step]}`}
          >
            <div
              aria-hidden
              className={`absolute inset-0 grid place-items-center pb-[22%] transition-opacity duration-700 ${ready ? "opacity-0" : "opacity-100"}`}
            >
              {koraci.map((s, i) => (
                <Image
                  key={s.ikona}
                  src={`/img/3d/${s.ikona}.webp`}
                  alt=""
                  width={560}
                  height={560}
                  sizes="(min-width: 1024px) 320px, 60vw"
                  className={`absolute h-[58%] w-auto object-contain transition-[opacity,transform] duration-500 ease-out ${i === step ? "scale-100 opacity-100" : "scale-[0.94] opacity-0"}`}
                />
              ))}
            </div>
            <canvas
              ref={canvasRef}
              aria-hidden
              className={`absolute inset-0 block h-full w-full touch-pan-y transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
            />
            <div
              key={step}
              className="relative rounded-[14px] bg-navy-900/60 px-4 py-3 backdrop-blur-md md:rounded-[16px] md:px-5 md:py-4 animate-[stepIn_.4s_cubic-bezier(.2,.8,.2,1)]"
            >
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
