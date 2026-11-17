import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Accent, WRAP } from "./ui";

/** Hero podstranica: puna širina, bez zaobljenja; isti identitet kao naslovna (navy + plavi NZ oblici). */
export function PageHero({
  crumbs,
  title,
  accent,
  lead,
  children,
  image,
}: {
  crumbs?: { href?: string; label: string }[];
  title: string;
  accent?: string;
  lead?: string;
  children?: ReactNode;
  image?: { src: string; alt: string; w: number; h: number };
}) {
  return (
    <section className="full-bleed relative overflow-hidden bg-navy-900">
      <Image src="/img/bg/hero.svg" alt="" aria-hidden fill priority unoptimized className="object-cover object-[30%_75%]" />
      <div
        className={`${WRAP} relative grid gap-6 pt-[96px] pb-8 md:items-center md:pt-[136px] md:pb-16 ${image ? "md:grid-cols-[1.15fr_1fr]" : ""}`}
      >
        <div className="flex flex-col items-start gap-4 md:gap-5">
          {crumbs && (
            <nav aria-label="Mrvice" className="text-[14px] text-white/80">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="hover:text-white">
                    Početna
                  </Link>
                </li>
                {crumbs.map((c) => (
                  <li key={c.label} className="flex items-center gap-2">
                    <span aria-hidden className="text-white/50">
                      /
                    </span>
                    {c.href ? (
                      <Link href={c.href} className="hover:text-white">
                        {c.label}
                      </Link>
                    ) : (
                      <span aria-current="page" className="text-white">
                        {c.label}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}
          <h1 className="max-w-[900px] text-[40px] leading-[1.03] tracking-[-0.02em] text-white md:text-[80px]">
            <Accent text={title} accent={accent} />
          </h1>
          {lead && <p className="max-w-[600px] text-[18px] leading-relaxed text-white md:text-[20px]">{lead}</p>}
          {children}
        </div>
        {image && (
          <Image
            src={image.src}
            alt={image.alt}
            width={image.w}
            height={image.h}
            priority
            sizes="(min-width: 768px) 40vw, 80vw"
            className="mx-auto w-[78%] max-w-[520px] md:w-full"
          />
        )}
      </div>
    </section>
  );
}
