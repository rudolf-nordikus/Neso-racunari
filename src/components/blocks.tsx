import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Plus, Star } from "lucide-react";
import { site } from "@/lib/site";
import { usluge } from "@/content/usluge";
import { klijenti } from "@/content/home";
import { googleMapsUrl, googleRating, recenzije } from "@/content/recenzije";
import { Accent, CallButton, Eyebrow, ICON, NzWatermark, Panel, ViberButton } from "./ui";

/* ---------- Kartica usluge (Figma ServiceTile 53:59) ---------- */
export function ServiceTile({
  href,
  ikona,
  naslov,
  opis,
  cijena,
}: {
  href: string;
  ikona: string;
  naslov: string;
  opis?: string;
  cijena: string;
}) {
  return (
    <Link
      href={href}
      className="group relative flex h-full flex-col rounded-[22px] border border-white/[0.08] bg-navy-800 p-4 pb-5 transition-colors hover:border-amber-500/60 md:rounded-[24px] md:px-[18px]"
    >
      <ArrowUpRight
        size={18}
        strokeWidth={ICON}
        aria-hidden
        className="absolute top-4 right-4 text-amber-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
      <Image
        src={`/img/3d/${ikona}.webp`}
        alt=""
        width={112}
        height={112}
        className="mx-auto mt-3 size-24 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105 md:size-28"
      />
      <span className="mt-3 text-[16px] font-medium text-white md:text-[17px]">{naslov}</span>
      {opis && <span className="mt-1 hidden text-[15px] leading-snug text-white/65 md:block">{opis}</span>}
      <span className="mt-1.5 text-[15px] text-amber-500">{cijena}</span>
    </Link>
  );
}

/* ---------- Tabela cijena ---------- */
export function PriceTable({ rows }: { rows: readonly { naziv: string; cijena: string }[] }) {
  return (
    <ul className="rounded-[20px] bg-navy-800 px-5 py-1 md:rounded-[24px] md:px-8 md:py-2">
      {rows.map((r, i) => (
        <li
          key={r.naziv}
          className={`flex items-baseline justify-between gap-4 py-3.5 md:py-4 ${i < rows.length - 1 ? "border-b border-white/[0.07]" : ""}`}
        >
          <span className="text-[16px] text-white md:text-[19px]">{r.naziv}</span>
          <span className={`shrink-0 text-[16px] font-medium ${r.cijena === "besplatno" ? "text-amber-500" : "text-white"}`}>
            {r.cijena}
          </span>
        </li>
      ))}
    </ul>
  );
}

/* ---------- FAQ (details/summary: radi bez JS-a, čitljivo za Google i AI) ---------- */
export function Faq({ items }: { items: readonly { q: string; a: string }[] }) {
  return (
    <div>
      {items.map((f, i) => (
        <details key={f.q} open={i === 0} className="group border-b border-white/[0.09]">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[17px] font-medium text-white md:py-6 md:text-[20px] [&::-webkit-details-marker]:hidden">
            {f.q}
            <Plus
              size={22}
              strokeWidth={ICON}
              aria-hidden
              className="shrink-0 text-amber-500 transition-transform duration-200 group-open:rotate-45"
            />
          </summary>
          <p className="-mt-1 max-w-[680px] pb-6 text-[16px] leading-relaxed text-white/70 md:text-[17px]">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

/* ---------- Ocjena ---------- */
export function Stars({ size = 15 }: { size?: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} className="fill-amber-500 text-amber-500" />
      ))}
    </span>
  );
}

export function RatingPill({ className = "" }: { className?: string }) {
  return (
    <a
      href={googleMapsUrl}
      target="_blank"
      rel="noopener"
      className={`inline-flex items-center gap-2.5 rounded-full bg-navy-900/40 px-3.5 py-2 text-[14px] text-white backdrop-blur-md ${className}`}
    >
      <Stars />
      {googleRating.value.toFixed(1).replace(".", ",")} · {googleRating.count} recenzija na Googleu
    </a>
  );
}

export function Reviews({ count = 3 }: { count?: number }) {
  const list = recenzije.filter((r) => "istaknuto" in r && r.istaknuto).slice(0, count);
  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-[22px] text-white md:text-[28px]">Šta kažu klijenti</h3>
        <a href={googleMapsUrl} target="_blank" rel="noopener" className="flex items-center gap-2 text-[14px] text-white">
          <Stars />
          {googleRating.value.toFixed(1).replace(".", ",")} · {googleRating.count} recenzija na Googleu
        </a>
      </div>
      <ul className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
        {list.map((r) => (
          <li
            key={r.ime}
            className="flex w-[85%] shrink-0 snap-center flex-col gap-5 rounded-[24px] border border-white/[0.08] bg-navy-800 p-6 md:w-auto md:p-8"
          >
            <Stars size={16} />
            <blockquote className="text-[17px] leading-relaxed text-white md:text-[18px]" lang={"jezik" in r ? r.jezik : "bs"}>
              „{r.tekst}“
            </blockquote>
            <p className="mt-auto text-[14px]">
              <span className="block font-medium text-white">{r.ime}</span>
              <span className="text-white/60">Google recenzija</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Logotipi klijenata (Figma ClientLogos v2 59:92) ---------- */
export function ClientLogos() {
  return (
    <div>
      <p className="mb-4 text-[14px] text-white/60">Firme koje računaju na nas</p>
      <ul className="grid grid-cols-3 gap-2 md:grid-cols-9 md:gap-3">
        {klijenti.map((k) => (
          <li key={k.slug} className="relative h-14 opacity-80 transition-opacity hover:opacity-100">
            <Image
              src={`/img/klijenti/bijeli/${k.slug}.png`}
              alt={k.naziv}
              fill
              sizes="120px"
              className={`object-contain ${k.slug === "emedia-patch" ? "p-0.5" : "px-1.5 py-2.5"}`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- CTA traka ---------- */
export function CtaBand({
  naslov = "Računar ne radi kako treba?",
  akcent = "ne radi kako treba?",
  tekst = "Nazovite, dijagnostika je besplatna. Radimo svaki dan od 10 do 20 h i dolazimo bilo gdje u Sarajevu.",
  viberPoruka,
}: {
  naslov?: string;
  akcent?: string;
  tekst?: string;
  viberPoruka?: string;
}) {
  return (
    <Panel className="bg-amber-500! px-6 py-12 md:px-24 md:py-16">
      <NzWatermark className="top-1/2 right-4 h-[80%] -translate-y-1/2 text-navy-900/[0.07] md:right-10" />
      <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="max-w-[720px]">
          <h2 className="text-[34px] leading-[1.1] text-navy-900 md:text-[56px]">
            <Accent text={naslov} accent={akcent} />
          </h2>
          <p className="mt-3 text-[17px] text-navy-900 md:text-[19px]">{tekst}</p>
        </div>
        <div className="flex flex-col gap-2.5 sm:flex-row md:shrink-0">
          <CallButton variant="dark" />
          <ViberButton
            variant="secondary"
            poruka={viberPoruka}
            className="border-navy-900! text-navy-900! hover:bg-navy-900/10!"
          />
        </div>
      </div>
    </Panel>
  );
}

/* ---------- Footer ---------- */
export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-[1464px] px-4 pt-16 pb-28 md:px-[84px] md:pt-20 md:pb-10">
      <div className="grid gap-10 md:grid-cols-[300px_1fr_1fr_1.4fr] md:gap-16">
        <div>
          <Image src="/brand/logo-white.svg" alt="Nešo Računari" width={206} height={36} className="h-9 w-auto" />
          <p className="mt-4 text-[15px] text-white/65">Prvi i jedini mobilni servis laptopa, računara i printera u Sarajevu.</p>
        </div>
        <FooterCol naslov="Usluge">
          {usluge.map((u) => (
            <Link key={u.slug} href={`/${u.slug}`}>
              {u.naziv}
            </Link>
          ))}
        </FooterCol>
        <FooterCol naslov="Kontakt">
          <a href={site.phoneHref}>{site.phoneDisplay}</a>
          <a href={site.viberHref}>Viber: {site.phoneDisplay}</a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <Link href="/kontakt">Kontakt forma</Link>
        </FooterCol>
        <FooterCol naslov="Radno vrijeme">
          <span>Svaki dan 10–20 h</span>
          <span>
            {site.street}, {site.city}
          </span>
          <span className="text-white/65">Preuzimanje na dogovorenom mjestu u cijelom Sarajevu</span>
          <span className="flex gap-4">
            <a href={site.social.instagram} target="_blank" rel="noopener">
              Instagram
            </a>
            <a href={site.social.googleMaps} target="_blank" rel="noopener">
              Google
            </a>
          </span>
        </FooterCol>
      </div>
      <Image
        src="/brand/footer-logo-big.svg"
        alt="Računarte na nas!"
        width={1464}
        height={225}
        className="mt-14 h-auto w-full md:mt-20"
      />
      <div className="mt-8 flex flex-col justify-between gap-2 text-[13px] text-white/55 md:flex-row">
        <span>© {new Date().getFullYear()} Nešo Računari. Sva prava zadržana.</span>
        <Link href="/politika-privatnosti">Politika privatnosti</Link>
      </div>
    </footer>
  );
}

function FooterCol({ naslov, children }: { naslov: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-4 text-[15px] font-medium text-amber-500">{naslov}</p>
      <div className="flex flex-col gap-2.5 text-[16px] text-white [&_a:hover]:text-amber-500">{children}</div>
    </div>
  );
}

/* ---------- Sekcija: naslov ---------- */
export function SectionHead({
  label,
  title,
  accent,
  sub,
  action,
}: {
  label?: string;
  title: string;
  accent?: string;
  sub?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div className="max-w-[720px]">
        {label && <Eyebrow className="mb-3">{label}</Eyebrow>}
        <h2 className="text-[36px] leading-[1.08] text-white md:text-[56px]">
          <Accent text={title} accent={accent} />
        </h2>
        {sub && <p className="mt-3 text-[17px] text-white/65 md:text-[19px]">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((t) => (
        <li key={t} className="flex items-start gap-2.5 text-[16px] text-white">
          <Check size={18} strokeWidth={2} className="mt-0.5 shrink-0 text-amber-500" aria-hidden />
          {t}
        </li>
      ))}
    </ul>
  );
}
