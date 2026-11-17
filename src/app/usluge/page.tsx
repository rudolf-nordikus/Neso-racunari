import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { usluge } from "@/content/usluge";
import { uslugaSlika, najnizaCijena } from "@/lib/images";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { PageHero } from "@/components/page-hero";
import { CheckList, CtaBand } from "@/components/blocks";
import { ICON, Panel } from "@/components/ui";

export const metadata: Metadata = {
  title: "Usluge servisa: laptopi, računari, printeri Sarajevo",
  description:
    "Sve usluge Nešo Računari: servis laptopa i računara, servis printera, instalacija Windowsa, uklanjanje virusa i mobilni servis. Okvirne cijene, dijagnostika besplatna.",
  alternates: { canonical: "/usluge" },
};

export default function UslugePage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Početna", path: "/" }, { name: "Usluge", path: "/usluge" }])} />
      <PageHero
        crumbs={[{ label: "Usluge" }]}
        title="Sve što tvoj računar treba"
        accent="računar"
        lead="Od popravke laptopa do servisa printera. Sve preuzimamo i vraćamo na dogovorenom mjestu u Sarajevu."
      />
      <Panel className="p-2 md:p-12">
        <ul className="grid gap-2 md:grid-cols-3 md:gap-3">
          {usluge.map((u) => {
            const img = uslugaSlika[u.slika];
            return (
              <li key={u.slug}>
                <Link
                  href={`/${u.slug}`}
                  className="group flex h-full flex-col gap-3 rounded-[24px] bg-navy-800 p-4 pb-6 transition-colors hover:bg-[#03264a] md:rounded-[28px] md:p-5 md:pb-7"
                >
                  <div className="grid h-[200px] place-items-center rounded-[18px] bg-blue-500/12 md:h-[220px]">
                    {img && (
                      <Image
                        src={img.src}
                        alt=""
                        width={img.w}
                        height={img.h}
                        sizes="280px"
                        className="h-[180px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <h2 className="px-1 text-[24px] text-white md:text-[28px]">{u.naziv}</h2>
                  <p className="px-1 text-[16px] text-white/65">{u.kvarovi.slice(0, 3).map((k) => k.naslov).join(", ")}.</p>
                  <div className="px-1">
                    <CheckList items={u.kvarovi.slice(3, 6).map((k) => k.naslov)} />
                  </div>
                  <div className="mt-auto flex items-center justify-between px-1 pt-2">
                    <span className="text-[16px] font-medium text-amber-500">{najnizaCijena(u.cijene)}</span>
                    <span className="flex items-center gap-1.5 text-[15px] font-medium text-white group-hover:text-amber-500">
                      Saznaj više <ArrowRight size={17} strokeWidth={ICON} aria-hidden />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </Panel>
      <CtaBand naslov="Niste sigurni šta vam treba?" akcent="šta vam treba?" tekst="Nazovite ili pišite na Viber, procijenit ćemo problem besplatno i predložiti najbolje rješenje." />
    </>
  );
}
