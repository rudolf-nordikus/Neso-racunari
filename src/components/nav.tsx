"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronRight, Phone, X } from "lucide-react";
import { nav, navMobileExtra, site } from "@/lib/site";
import { problemi } from "@/content/home";
import { CallButton, ICON, ViberButton, WRAP } from "./ui";

/*
 * Meni v5 (Figma Navbar v5 72:45): puna traka, poravnata sa sadržajem.
 * Top: providan preko heroja. Scrolled (preko 24 px) ili otvoren meni: navy 90 % + blur + tanka linija,
 * da se tekst uvijek vidi bez obzira šta je ispod.
 * Mobilni: logo, okruglo dugme za poziv i meni. Otvoreni meni: prečice, stranice, akcije pod palcem.
 */

function Logo({ className = "" }: { className?: string }) {
  return (
    <Image src="/brand/logo-white.svg" alt="Nešo Računari" width={309} height={54} priority className={className} />
  );
}

function Burger() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 9h16M8 15h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  // Meni je otvoren samo na stranici na kojoj je otvoren: promjena rute ga zatvara bez efekta.
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === pathname;
  const setOpen = (v: boolean | ((o: boolean) => boolean)) =>
    setOpenAt((cur) => ((typeof v === "function" ? v(cur === pathname) : v) ? pathname : null));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenAt(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-200 ${solid ? "border-white/[0.08] bg-navy-950/90 backdrop-blur-xl" : "border-transparent bg-transparent"}`}
      >
        <nav aria-label="Glavni meni" className={`${WRAP} flex h-16 items-center justify-between pr-3! md:h-[76px] lg:pr-10!`}>
          <Link href="/" aria-label="Nešo Računari, početna" className="shrink-0">
            <Logo className="h-[26px] w-auto md:h-[30px]" />
          </Link>

          <ul className="hidden items-center gap-2 lg:flex">
            {nav.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="px-3 py-2.5 text-[15px] text-white/80 transition-colors hover:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-5 lg:flex">
            <a href={site.phoneHref} className="text-[15px] font-medium text-white">
              {site.phoneDisplay}
            </a>
            <CallButton label="Pozovi" />
          </div>

          <div className="flex items-center gap-1.5 lg:hidden">
            <a
              href={site.phoneHref}
              aria-label={`Pozovi ${site.phoneDisplay}`}
              className="grid size-11 place-items-center rounded-full bg-amber-500 text-navy-900"
            >
              <Phone size={20} strokeWidth={ICON} />
            </a>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobilni-meni"
              aria-label={open ? "Zatvori meni" : "Otvori meni"}
              onClick={() => setOpen((v) => !v)}
              className={`grid size-11 place-items-center rounded-full transition-colors ${open ? "bg-white/15 text-white" : "text-white"}`}
            >
              {open ? <X size={22} strokeWidth={2} /> : <Burger />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobilni meni */}
      <div
        id="mobilni-meni"
        role="dialog"
        aria-modal="true"
        aria-label="Meni"
        className={`fixed inset-0 z-40 overflow-y-auto bg-navy-950 transition-[opacity,visibility] duration-300 lg:hidden ${open ? "visible opacity-100" : "invisible opacity-0"}`}
      >
        <div aria-hidden className="hidden" />
        <div
          className={`relative mx-auto flex min-h-full max-w-[480px] flex-col px-4 pt-[88px] pb-[180px] transition-transform duration-300 ${open ? "translate-y-0" : "-translate-y-3"}`}
        >
          <p className="text-[15px] font-medium text-white/65">Šta se desilo?</p>
          <ul className="mt-3 grid grid-cols-3 gap-2">
            {problemi.map((p) => (
              <li key={p.ikona}>
                <Link
                  href={p.href}
                  className="flex flex-col items-center gap-1.5 rounded-[20px] border border-white/[0.06] bg-navy-900 px-2 py-3 text-center active:scale-[0.97]"
                >
                  <Image src={`/img/3d/${p.ikona}.webp`} alt="" width={56} height={56} className="size-14" />
                  <span className="text-[14px] leading-tight text-white">{p.naslov}</span>
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-[15px] font-medium text-white/65">Stranice</p>
          <ul className="mt-3 rounded-[20px] bg-navy-900 px-4">
            {[...nav, ...navMobileExtra].map((l, i, a) => (
              <li key={l.href} className={i < a.length - 1 ? "border-b border-white/[0.07]" : ""}>
                <Link href={l.href} className="flex items-center justify-between py-3.5">
                  <span className="text-[17px] font-medium text-white">{l.label}</span>
                  <ChevronRight size={18} strokeWidth={2} className="text-white/40" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="fixed inset-x-3 bottom-3 mx-auto max-w-[456px] rounded-[24px] border border-white/[0.08] bg-navy-900/85 p-3.5 backdrop-blur-xl">
          <div className="mb-3 flex items-center justify-between text-[14px]">
            <span className="text-white/60">5,0 na Googleu</span>
            <span className="text-white/65">Svaki dan 10–20 h</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <CallButton label="Pozovi" />
            <ViberButton variant="glass" label="Viber" />
          </div>
        </div>
      </div>
    </>
  );
}
