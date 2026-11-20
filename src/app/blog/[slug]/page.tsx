import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blog } from "@/content/blog";
import { uslugaBySlug } from "@/content/usluge";
import { JsonLd, articleSchema, breadcrumbSchema } from "@/lib/schema";
import { PageHero } from "@/components/page-hero";
import { CheckList, CtaBand } from "@/components/blocks";
import { CallButton, Panel, ViberButton } from "@/components/ui";

export const dynamicParams = false;
export function generateStaticParams() {
  return blog.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = blog.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: p.seoTitle || p.title,
    description: p.description,
    alternates: { canonical: `/blog/${p.slug}` },
    openGraph: { type: "article", title: p.title, description: p.description, publishedTime: p.datum, modifiedTime: p.azurirano ?? p.datum },
  };
}

export default async function ClanakPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const p = blog.find((x) => x.slug === slug);
  if (!p) notFound();
  const u = uslugaBySlug(p.usluga);
  const ostali = blog.filter((x) => x.slug !== p.slug).slice(0, 3);
  const datum = new Date(p.datum).toLocaleDateString("bs-BA", { day: "numeric", month: "long", year: "numeric" });

  return (
    <>
      <JsonLd
        data={[
          articleSchema({ title: p.title, description: p.description, path: `/blog/${p.slug}`, datePublished: p.datum, dateModified: p.azurirano }),
          breadcrumbSchema([
            { name: "Početna", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: p.title, path: `/blog/${p.slug}` },
          ]),
        ]}
      />
      <PageHero crumbs={[{ href: "/blog", label: "Blog" }, { label: `${p.minuta} min čitanja` }]} title={p.title} />

      <Panel as="article" className="grid gap-10 px-5 py-10 md:grid-cols-[1fr_360px] md:gap-16 md:px-24 md:py-16">
        <div className="max-w-[720px]">
          <p className="text-[14px] text-white/55">
            {datum} · Dejan Zonjić, Nešo Računari
          </p>
          {/* Kratak odgovor na vrhu: AI asistenti i Google ga citiraju (GEO) */}
          <div className="mt-6 rounded-[20px] border border-blue-500/50 bg-blue-500/14 p-5">
            <p className="text-[13px] font-medium tracking-wide text-amber-500">KRATAK ODGOVOR</p>
            <p className="mt-1.5 text-[18px] leading-relaxed text-white">{p.intro[0]}</p>
          </div>
          {p.intro.slice(1).map((t) => (
            <p key={t} className="mt-5 text-[18px] leading-relaxed text-white/85">
              {t}
            </p>
          ))}
          {p.sekcije.map((s) => (
            <section key={s.h} className="mt-10">
              <h2 className="text-[26px] leading-tight text-white md:text-[32px]">{s.h}</h2>
              {s.p.map((t) => (
                <p key={t} className="mt-4 text-[18px] leading-relaxed text-white/85">
                  {t}
                </p>
              ))}
              {s.li.length > 0 && (
                <div className="mt-4">
                  <CheckList items={s.li} />
                </div>
              )}
            </section>
          ))}
        </div>

        <aside className="md:sticky md:top-[104px] md:self-start">
          <div className="rounded-[24px] bg-amber-500 p-6 md:rounded-[28px] md:p-7">
            <Image src={`/img/3d/${p.ikona}.webp`} alt="" width={120} height={120} className="size-24 md:size-28" />
            <p className="mt-3 text-[24px] leading-tight text-navy-900">Treba vam servis?</p>
            <p className="mt-2 text-[16px] text-navy-900">Dijagnostika je besplatna. Preuzmemo uređaj na dogovorenom mjestu u Sarajevu.</p>
            <div className="mt-5 flex flex-col gap-2">
              <CallButton variant="dark" />
              <ViberButton variant="secondary" className="border-navy-900! text-navy-900!" poruka={`Zdravo, pročitao sam "${p.title}" i treba mi pomoć.`} />
            </div>
            {u && (
              <Link href={`/${u.slug}`} className="mt-4 block text-[15px] font-medium text-navy-900 underline underline-offset-4">
                {u.naziv}: cijene i detalji →
              </Link>
            )}
          </div>
        </aside>
      </Panel>

      <Panel className="px-3 py-8 md:px-12 md:py-12">
        <h2 className="px-2 text-[24px] text-white md:px-0 md:text-[32px]">Pročitajte i</h2>
        <ul className="mt-5 grid gap-2 md:grid-cols-3 md:gap-3">
          {ostali.map((o) => (
            <li key={o.slug}>
              <Link href={`/blog/${o.slug}`} className="flex items-center gap-4 rounded-[22px] bg-navy-800 p-4 hover:bg-[#03264a]">
                <Image src={`/img/3d/${o.ikona}.webp`} alt="" width={64} height={64} className="size-16" />
                <span className="text-[17px] leading-snug text-white">{o.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Panel>
      <CtaBand />
    </>
  );
}
