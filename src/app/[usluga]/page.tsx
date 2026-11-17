import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { usluge, uslugaBySlug } from "@/content/usluge";
import { koraci } from "@/content/home";
import { recenzije, googleRating } from "@/content/recenzije";
import { uslugaSlika, najnizaCijena } from "@/lib/images";
import { JsonLd, breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import { PageHero } from "@/components/page-hero";
import { CtaBand, Faq, PriceTable, ServiceTile, Stars } from "@/components/blocks";
import { Accent, CallButton, Panel, ViberButton } from "@/components/ui";

/*
 * Landing usluge (Figma "Landing usluge · Servis laptopa" 63:3).
 * Najvažniji šablon (audit 04): ovdje slijeće većina ljudi s Googlea.
 * Redoslijed: činjenice uz dugme → šta popravljamo → cijene → kako radi → recenzija → FAQ → ostale usluge.
 * URL-ovi su isti kao na starom sajtu (/servis-laptopa-sarajevo ...).
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return usluge.map((u) => ({ usluga: u.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[usluga]">): Promise<Metadata> {
  const { usluga } = await params;
  const u = uslugaBySlug(usluga);
  if (!u) return {};
  return {
    title: { absolute: `${u.seoTitle} | Nešo Računari` },
    description: u.description,
    alternates: { canonical: `/${u.slug}` },
    openGraph: { title: u.seoTitle, description: u.description, url: `/${u.slug}` },
  };
}

export default async function UslugaPage({ params }: PageProps<"/[usluga]">) {
  const { usluga } = await params;
  const u = uslugaBySlug(usluga);
  if (!u) notFound();
  const img = uslugaSlika[u.slika];
  const elsa = recenzije[0];
  const ostale = usluge.filter((x) => x.slug !== u.slug);

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({ name: u.naziv + " Sarajevo", description: u.description, path: `/${u.slug}` }),
          faqSchema(u.faq),
          breadcrumbSchema([
            { name: "Početna", path: "/" },
            { name: "Usluge", path: "/usluge" },
            { name: u.naziv, path: `/${u.slug}` },
          ]),
        ]}
      />

      <PageHero
        crumbs={[{ href: "/usluge", label: "Usluge" }, { label: u.naziv }]}
        title={u.h1}
        accent={u.acc}
        lead={u.lead}
        image={img ? { src: img.src, alt: u.naziv, w: img.w, h: img.h } : undefined}
      >
        <div className="flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row">
          <CallButton />
          <ViberButton variant="dark" poruka={`Zdravo, treba mi ${u.naziv.toLowerCase()}.`} />
        </div>
        <ul className="flex flex-wrap gap-2">
          {["Dijagnostika 0 KM", "Popravka 2–3 dana", "Garancija", `★ ${googleRating.value.toFixed(1).replace(".", ",")} Google`].map((f) => (
            <li key={f} className="rounded-full bg-navy-900/40 px-3.5 py-2 text-[14px] text-white backdrop-blur-md">
              {f}
            </li>
          ))}
        </ul>
      </PageHero>

      <Panel className="grid gap-8 px-5 py-12 md:grid-cols-[400px_1fr] md:gap-20 md:px-24 md:py-16">
        <div className="flex flex-col gap-4">
          <h2 className="text-[36px] leading-[1.08] text-white md:text-[56px]">
            <Accent text="Šta popravljamo" accent="popravljamo" />
          </h2>
          <p className="text-[17px] leading-relaxed text-white/65 md:text-[19px]">
            Bez obzira na brend ili starost uređaja. Ako se popravka ne isplati, reći ćemo vam iskreno.
          </p>
        </div>
        <ul className="grid gap-2.5 sm:grid-cols-2 md:gap-3">
          {u.kvarovi.map((k) => (
            <li key={k.naslov} className="flex gap-3.5 rounded-[18px] bg-navy-800 p-4 md:p-5">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-amber-500 text-navy-900">
                <Check size={16} strokeWidth={2.2} aria-hidden />
              </span>
              <span>
                <span className="block text-[17px] font-medium text-white">{k.naslov}</span>
                <span className="mt-1 block text-[15px] leading-snug text-white/65">{k.opis}</span>
              </span>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel id="cijene" className="grid gap-8 px-5 py-12 md:grid-cols-[400px_1fr] md:gap-20 md:px-24 md:py-16">
        <div className="flex flex-col gap-4">
          <h2 className="text-[36px] leading-[1.08] text-white md:text-[56px]">
            <Accent text={`Cijene: ${u.naziv.toLowerCase()}`} accent={u.naziv.toLowerCase()} />
          </h2>
          <p className="text-[17px] leading-relaxed text-white/65 md:text-[19px]">
            Okvirne cijene rada. Dijelovi se plaćaju posebno. Tačnu cijenu dobijete nakon besplatne dijagnostike i ništa ne radimo bez
            vašeg odobrenja.
          </p>
          {u.napomena && <p className="text-[14px] text-white/50">{u.napomena}</p>}
        </div>
        <PriceTable rows={u.cijene} />
      </Panel>

      <Panel className="px-5 py-12 md:px-24 md:py-16">
        <h2 className="text-[36px] leading-[1.08] text-white md:text-[56px]">
          <Accent text="Kako radi" accent="radi" />
        </h2>
        <ol className="mt-8 grid grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-3">
          {koraci.map((k, i) => (
            <li key={k.kratko} className="rounded-[22px] bg-navy-800 p-4 md:p-5">
              <Image src={`/img/3d/${k.ikona}.webp`} alt="" width={88} height={88} className="size-16 md:size-[88px]" />
              <p className="mt-3 text-[16px] font-medium text-white md:text-[17px]">
                {i + 1}. {k.kratko}
              </p>
              <p className="mt-1 text-[14px] leading-snug text-white/65 md:text-[15px]">{k.opis}</p>
            </li>
          ))}
        </ol>
      </Panel>

      <Panel className="flex flex-col gap-6 px-5 py-12 md:flex-row md:items-center md:gap-14 md:px-24 md:py-14">
        <div className="shrink-0">
          <p className="text-[64px] leading-none text-amber-500 md:text-[88px]">{googleRating.value.toFixed(1).replace(".", ",")}</p>
          <Stars size={18} />
          <p className="mt-1 text-[14px] text-white/60">{googleRating.count} recenzija na Googleu</p>
        </div>
        <figure>
          <blockquote className="text-[20px] leading-snug text-white md:text-[26px]">„{elsa.tekst}“</blockquote>
          <figcaption className="mt-3 text-[14px] text-white/60">{elsa.ime} · Google recenzija</figcaption>
        </figure>
      </Panel>

      <Panel className="grid gap-6 px-5 py-12 md:grid-cols-[400px_1fr] md:gap-20 md:px-24 md:py-16">
        <h2 className="text-[36px] leading-[1.08] text-white md:text-[56px]">
          <Accent text={`Pitanja: ${u.naziv.toLowerCase()}`} accent={u.naziv.toLowerCase()} />
        </h2>
        <Faq items={u.faq} />
      </Panel>

      <Panel className="px-3 py-8 md:px-12 md:py-12">
        <h2 className="px-2 text-[24px] text-white md:px-0 md:text-[32px]">Ostale usluge</h2>
        <ul className="mt-5 grid grid-cols-2 gap-2 md:grid-cols-5 md:gap-3">
          {ostale.map((o) => (
            <li key={o.slug}>
              <ServiceTile href={`/${o.slug}`} ikona={o.ikona} naslov={o.naziv} cijena={najnizaCijena(o.cijene)} />
            </li>
          ))}
        </ul>
      </Panel>

      <CtaBand viberPoruka={`Zdravo, treba mi ${u.naziv.toLowerCase()}.`} />
    </>
  );
}
