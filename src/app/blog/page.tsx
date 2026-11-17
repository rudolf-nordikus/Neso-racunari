import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { blog } from "@/content/blog";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/blocks";
import { Panel } from "@/components/ui";

export const metadata: Metadata = {
  title: "Blog: savjeti za laptop i računar",
  description: "Kratki savjeti: zašto se laptop pregrijava, kad zamijeniti bateriju, koliko košta servis, kako prepoznati virus.",
  alternates: { canonical: "/blog" },
};

const BG = ["bg-amber-500", "bg-blue-500", "bg-navy-700", "bg-blue-500", "bg-amber-500"];

export default function BlogPage() {
  const [featured, ...rest] = [...blog].sort((a, b) => (a.slug === "koliko-kosta-servis-laptopa-sarajevo" ? -1 : b.slug === "koliko-kosta-servis-laptopa-sarajevo" ? 1 : 0));
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Početna", path: "/" }, { name: "Blog", path: "/blog" }])} />
      <PageHero crumbs={[{ label: "Blog" }]} title="Savjeti za vaš računar" accent="Savjeti" lead="Kratko i jasno: šta znači kvar, šta možete sami, a kada zvati servis." />
      <Panel className="flex flex-col gap-2 p-2 md:gap-3 md:p-12">
        <Link href={`/blog/${featured.slug}`} className="group grid items-center gap-5 rounded-[24px] bg-navy-800 p-3 md:grid-cols-2 md:gap-10 md:rounded-[28px] md:p-4">
          <div className="grid h-[220px] place-items-center rounded-[18px] bg-amber-500 md:h-[320px] md:rounded-[20px]">
            <Image src={`/img/3d/${featured.ikona}.webp`} alt="" width={260} height={260} className="size-40 transition-transform duration-300 group-hover:scale-105 md:size-64" />
          </div>
          <div className="px-2 pb-4 md:px-0 md:pr-6">
            <p className="text-[14px] text-amber-500">Najčitanije · {featured.minuta} min</p>
            <h2 className="mt-2 text-[28px] leading-[1.1] text-white md:text-[44px]">{featured.title}</h2>
            <p className="mt-3 text-[16px] text-white/65 md:text-[18px]">{featured.description}</p>
          </div>
        </Link>
        <ul className="grid gap-2 sm:grid-cols-2 md:grid-cols-4 md:gap-3">
          {rest.map((p, i) => (
            <li key={p.slug}>
              <Link href={`/blog/${p.slug}`} className="group flex h-full flex-col gap-3 rounded-[24px] bg-navy-800 p-3 pb-5 md:rounded-[28px] md:p-4 md:pb-6">
                <div className={`grid h-[180px] place-items-center rounded-[18px] md:h-[200px] ${BG[i + 1]}`}>
                  <Image src={`/img/3d/${p.ikona}.webp`} alt="" width={150} height={150} className="size-32 transition-transform duration-300 group-hover:scale-105 md:size-36" />
                </div>
                <p className="px-2 text-[14px] text-amber-500">Savjet · {p.minuta} min</p>
                <h2 className="px-2 text-[20px] leading-snug text-white md:text-[22px]">{p.title}</h2>
              </Link>
            </li>
          ))}
        </ul>
      </Panel>
      <CtaBand />
    </>
  );
}
