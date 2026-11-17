import Image from "next/image";
import { site } from "@/lib/site";
import { JsonLd, faqSchema } from "@/lib/schema";
import { cinjenice, cjenovnik, faqNaslovna, problemi } from "@/content/home";
import { ProcessV4 } from "@/components/process-v4";
import {
  ClientLogos,
  CtaBand,
  Faq,
  PriceTable,
  RatingPill,
  Reviews,
  SectionHead,
  ServiceTile,
} from "@/components/blocks";
import { Accent, Button, CallButton, Eyebrow, Panel, ViberButton, WRAP } from "@/components/ui";

export default function Home() {
  return (
    <>
      <JsonLd data={faqSchema([...faqNaslovna])} />

      {/* HERO (identitet ostaje: plava, NZ oblici, laptop) */}
      <section className="full-bleed relative overflow-hidden bg-navy-900">
        {/* Originalna pozadina heroja (plavi oblici NZ znaka na navy), ne mijenjati */}
        <Image src="/img/bg/hero.svg" alt="" aria-hidden fill priority unoptimized className="object-cover object-[30%_20%]" />
        <div className={`${WRAP} relative grid gap-6 pt-[96px] pb-8 md:min-h-[800px] md:grid-cols-[1.05fr_1fr] md:items-center md:pt-28 md:pb-16`}>
          <div className="flex flex-col items-start gap-5 md:gap-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-navy-900/40 px-3.5 py-2 text-[14px] text-white backdrop-blur-md">
              <span aria-hidden className="size-2 rounded-full bg-amber-500" />
              Prvi i jedini mobilni servis računara u Sarajevu
            </span>
            <h1 className="text-[44px] leading-[1.02] tracking-[-0.02em] text-white md:text-[88px] md:leading-none">
              Ako želiš, biću ja, <em>servis</em> tvog kompjutera
            </h1>
            <p className="max-w-[540px] text-[18px] leading-relaxed text-white md:text-[20px]">
              Preuzmemo laptop, računar ili printer na dogovorenom mjestu, popravimo ga i vratimo. Vi ne nosite ništa nigdje.
            </p>
            <div className="flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row">
              <CallButton />
              <ViberButton variant="dark" poruka="Zdravo, treba mi servis računara." />
            </div>
            <RatingPill />
          </div>
          <Image
            src="/img/hero-macbook.avif"
            alt="Laptop sa logom Nešo Računari"
            width={629}
            height={632}
            priority
            sizes="(min-width: 768px) 46vw, 90vw"
            className="mx-auto w-[80%] max-w-[600px] md:w-full"
          />
        </div>
      </section>

      {/* ČINJENICE */}
      <ul data-reveal className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
        {cinjenice.map((c) => (
          <li key={c.k} className="rounded-[18px] bg-navy-900 px-4 py-3.5 md:rounded-[24px] md:px-7 md:py-5">
            <p className="text-[12px] tracking-wide text-white/60 uppercase md:text-[13px]">{c.k}</p>
            <p className="mt-0.5 text-[16px] font-medium text-white md:text-[22px]">{c.v}</p>
          </li>
        ))}
      </ul>

      {/* USLUGE */}
      <Panel id="usluge" className="px-3 pt-8 pb-3 md:px-12 md:py-14">
        <div className="px-2 md:px-0">
          <SectionHead
            title="Šta se desilo?"
            accent="desilo?"
            sub="Izaberite problem. Ne znate šta je? Nazovite, dijagnostika je besplatna."
            action={
              <Button href="/usluge" variant="secondary" className="hidden md:inline-flex">
                Sve usluge i cijene
              </Button>
            }
          />
        </div>
        <ul data-stagger className="mt-6 grid grid-cols-2 gap-2 md:mt-8 md:grid-cols-6 md:gap-3">
          {problemi.map((p) => (
            <li key={p.ikona}>
              <ServiceTile {...p} />
            </li>
          ))}
        </ul>
      </Panel>

      {/* KAKO RADI: scroll scena */}
      <ProcessV4 />

      {/* CIJENE */}
      <Panel id="cijene" className="grid gap-8 px-5 py-12 md:grid-cols-[400px_1fr] md:gap-20 md:px-24 md:py-16">
        <div className="flex flex-col items-start gap-4">
          <Eyebrow>Cijene</Eyebrow>
          <h2 className="text-[36px] leading-[1.08] text-white md:text-[56px]">
            <Accent text="Znate cijenu prije popravke" accent="prije popravke" />
          </h2>
          <p className="text-[17px] leading-relaxed text-white/65 md:text-[19px]">
            Svaki kvar je drugačiji, pa su ovo okvirne cijene rada. Dijelovi se plaćaju posebno. Tačnu cijenu dobijete nakon besplatne
            dijagnostike i ništa ne radimo dok je ne odobrite.
          </p>
          <Button href="/usluge" variant="ghost">
            Sve usluge i cijene
          </Button>
        </div>
        <PriceTable rows={cjenovnik} />
      </Panel>

      {/* O NAMA + RECENZIJE + KLIJENTI */}
      <Panel id="o-nama" className="flex flex-col gap-12 px-5 py-12 md:gap-14 md:px-24 md:py-16">
        <div className="grid items-center gap-8 md:grid-cols-[480px_1fr] md:gap-20">
          <Image
            src="/img/dejan-i-neso.webp"
            alt="Dejan i Nebojša (Nešo) Zonjić, Nešo Računari"
            width={759}
            height={700}
            sizes="(min-width: 768px) 480px, 90vw"
            className="mx-auto w-full max-w-[480px]"
          />
          <div className="flex flex-col items-start gap-4">
            <Eyebrow>O nama</Eyebrow>
            <h2 className="text-[36px] leading-[1.08] text-white md:text-[56px]">
              <Accent text="Tata i sin u biznisu" accent="Tata i sin" />
            </h2>
            <p className="text-[17px] leading-relaxed text-white md:text-[19px]">
              Spoj iskustva i mladosti: otac Nebojša (Nešo) i sin Dejan. Po vaš uređaj dolazimo lično nas dvojica, a ne kurir.
            </p>
            <dl className="mt-2 flex gap-8">
              {[
                ["2–3 dana", "većina popravki"],
                ["0 KM", "dijagnostika"],
                ["Cijelo", "Sarajevo"],
              ].map(([a, b]) => (
                <div key={a}>
                  <dt className="text-[24px] text-amber-500 md:text-[32px]">{a}</dt>
                  <dd className="text-[14px] text-white/60">{b}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <Reviews />
        <ClientLogos />
      </Panel>

      {/* PRODAJA */}
      <Panel id="prodaja" className="px-4 py-10 md:px-24 md:py-16">
        <div className="px-1 md:px-0">
          <Eyebrow className="mb-3">Prodaja</Eyebrow>
          <h2 className="text-[36px] leading-[1.08] text-white md:text-[56px]">
            <Accent text="Računarte na nas!" accent="Računarte" />
          </h2>
        </div>
        <div className="mt-6 grid gap-3 md:mt-10 md:grid-cols-2">
          {[
            {
              bg: "bg-amber-500",
              img: "/img/laptop-nz.avif",
              w: 682,
              h: 550,
              t: "Laptopi i računari",
              d: "Novi i provjereni polovni, od povoljnih do profesionalnih. Kažite za šta vam treba, predložimo najbolje.",
              cta: "Pitaj šta je dostupno",
              poruka: "Zdravo, zanima me laptop ili računar.",
            },
            {
              bg: "bg-blue-500",
              img: "/img/printer.avif",
              w: 1204,
              h: 958,
              t: "Printeri",
              d: "Trošite previše na tonere? Pokažemo vam printer koji se isplati za kuću ili kancelariju.",
              cta: "Pitaj za printer",
              poruka: "Zdravo, zanima me printer.",
            },
          ].map((c) => (
            <div key={c.t} className={`flex items-center gap-4 overflow-hidden rounded-[24px] py-8 pr-4 pl-6 md:rounded-[32px] md:pl-10 ${c.bg}`}>
              <div className="flex flex-1 flex-col items-start gap-3">
                <h3 className="text-[24px] text-navy-900 md:text-[32px]">{c.t}</h3>
                <p className="text-[15px] text-navy-900 md:text-[16px]">{c.d}</p>
                <ViberButton variant="dark" label={c.cta} poruka={c.poruka} className="mt-1" />
                <a href={site.phoneHref} data-cta="poziv" className="text-[15px] font-medium text-navy-900 underline-offset-4 hover:underline">
                  ili pozovite {site.phoneDisplay}
                </a>
              </div>
              <Image src={c.img} alt="" width={c.w} height={c.h} sizes="220px" className="w-[38%] max-w-[240px] shrink-0" />
            </div>
          ))}
        </div>
      </Panel>

      {/* FAQ */}
      <Panel className="grid gap-6 px-5 py-12 md:grid-cols-[400px_1fr] md:gap-20 md:px-24 md:py-16">
        <div className="flex flex-col items-start gap-4">
          <Eyebrow>Česta pitanja</Eyebrow>
          <h2 className="text-[36px] leading-[1.08] text-white md:text-[56px]">
            <Accent text="Pitanja prije poziva" accent="prije poziva" />
          </h2>
          <p className="text-[17px] text-white/65 md:text-[19px]">Za sve ostalo, nazovite ili pišite na Viber.</p>
        </div>
        <Faq items={faqNaslovna} />
      </Panel>

      <CtaBand />
    </>
  );
}
