import type { Metadata } from "next";
import { site } from "@/lib/site";
import { PageHero } from "@/components/page-hero";
import { Panel } from "@/components/ui";

export const metadata: Metadata = {
  title: "Politika privatnosti",
  alternates: { canonical: "/politika-privatnosti" },
  robots: { index: false },
};

export default function Privatnost() {
  return (
    <>
      <PageHero crumbs={[{ label: "Politika privatnosti" }]} title="Politika privatnosti" />
      <Panel className="px-5 py-10 md:px-24 md:py-16">
        <div className="max-w-[720px] space-y-5 text-[17px] leading-relaxed text-white/85">
          <p>
            {site.name} prikuplja samo podatke koje sami pošaljete kroz kontakt formu (ime, broj telefona i poruka) i koristi ih isključivo
            da bi odgovorio na vaš upit. Podatke ne prodajemo i ne dijelimo sa trećim stranama.
          </p>
          <p>
            Forma se šalje preko servisa Formspree. Za mjerenje posjeta koristimo Vercel Web Analytics, koji ne koristi kolačiće i ne
            prati vas između sajtova. Google Ads oznaka mjeri da li je poziv ili upit došao preko oglasa.
          </p>
          <p>Uređaje koje preuzimamo na servis ne pretražujemo. Podatke na njima diramo samo ako je to dio dogovorenog posla (npr. backup).</p>
          <p>
            Za brisanje podataka ili pitanja pišite na <a className="text-amber-500" href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </div>
      </Panel>
    </>
  );
}
