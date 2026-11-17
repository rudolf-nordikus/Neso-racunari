import type { Metadata } from "next";
import { AtSign, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { site } from "@/lib/site";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { faqNaslovna } from "@/content/home";
import { PageHero } from "@/components/page-hero";
import { ContactForm } from "@/components/contact-form";
import { Faq } from "@/components/blocks";
import { Accent, ICON, Panel, ViberIcon } from "@/components/ui";

export const metadata: Metadata = {
  title: "Kontakt: servis laptopa i računara Sarajevo",
  description:
    "Pozovite 061 336 599 ili pišite na Viber. Preuzimamo laptop, računar ili printer na dogovorenom mjestu u Sarajevu. Svaki dan 10–20 h.",
  alternates: { canonical: "/kontakt" },
};

function Card({
  href,
  label,
  value,
  sub,
  icon,
  primary,
}: {
  href?: string;
  label: string;
  value: string;
  sub: string;
  icon: ReactNode;
  primary?: boolean;
}) {
  const inner = (
    <>
      <span className={`grid size-12 shrink-0 place-items-center rounded-full ${primary ? "bg-navy-900 text-amber-500" : "bg-white/[0.08] text-white"}`}>
        {icon}
      </span>
      <span>
        <span className={`block text-[13px] tracking-wide uppercase ${primary ? "text-navy-900/70" : "text-white/60"}`}>{label}</span>
        <span className={`block text-[20px] font-medium md:text-[22px] ${primary ? "text-navy-900" : "text-white"}`}>{value}</span>
        <span className={`block text-[14px] ${primary ? "text-navy-900/75" : "text-white/60"}`}>{sub}</span>
      </span>
    </>
  );
  const cls = `flex items-center gap-4 rounded-[22px] p-5 md:rounded-[24px] ${primary ? "bg-amber-500" : "bg-navy-800"}`;
  return href ? (
    <a href={href} className={`${cls} transition-transform active:scale-[0.99]`}>
      {inner}
    </a>
  ) : (
    <div className={cls}>{inner}</div>
  );
}

export default function KontaktPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema([{ name: "Početna", path: "/" }, { name: "Kontakt", path: "/kontakt" }]), faqSchema([...faqNaslovna])]} />
      <PageHero
        crumbs={[{ label: "Kontakt" }]}
        title="Računarte na nas!"
        accent="Računarte"
        lead="Najbrže je da nazovete ili pišete na Viber. Forma je za sve što nije hitno."
      />
      <Panel className="grid gap-3 p-2 md:grid-cols-[520px_1fr] md:gap-6 md:p-12">
        <div className="flex flex-col gap-2 md:gap-3">
          <Card primary href={site.phoneHref} label="Pozovite" value={site.phoneDisplay} sub="Svaki dan 10–20 h" icon={<Phone size={22} strokeWidth={ICON} />} />
          <Card href={site.viberHref} label="Viber" value={site.phoneDisplay} sub="Pišite kad vam odgovara" icon={<ViberIcon size={22} />} />
          <Card href={`mailto:${site.email}`} label="Email" value={site.email} sub="Za ponude i firme" icon={<AtSign size={22} strokeWidth={ICON} />} />
          <Card
            href={site.social.googleMaps}
            label="Adresa"
            value={`${site.street}, ${site.city}`}
            sub="Uređaje preuzimamo na dogovorenom mjestu"
            icon={<MapPin size={22} strokeWidth={ICON} />}
          />
        </div>
        <ContactForm />
      </Panel>
      <Panel className="grid gap-6 px-5 py-12 md:grid-cols-[400px_1fr] md:gap-20 md:px-24 md:py-16">
        <h2 className="text-[36px] leading-[1.08] text-white md:text-[56px]">
          <Accent text="Najčešća pitanja" accent="pitanja" />
        </h2>
        <Faq items={faqNaslovna} />
      </Panel>
    </>
  );
}
