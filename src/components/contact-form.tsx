"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

/*
 * Kontakt forma: 3 polja (ime, telefon, poruka) + izbor razloga.
 * Šalje na postojeći Formspree endpoint sa starog sajta, pa ništa novo ne treba podešavati.
 */
const ENDPOINT = "https://formspree.io/f/mojyqnlq";
const RAZLOZI = ["Servis", "Kupovina", "Firma"] as const;

export function ContactForm() {
  const [razlog, setRazlog] = useState<(typeof RAZLOZI)[number]>("Servis");
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const data = new FormData(e.currentTarget);
    data.set("razlog", razlog);
    try {
      const r = await fetch(ENDPOINT, { method: "POST", body: data, headers: { Accept: "application/json" } });
      setState(r.ok ? "ok" : "error");
      if (r.ok) (e.target as HTMLFormElement).reset();
    } catch {
      setState("error");
    }
  }

  if (state === "ok")
    return (
      <div className="rounded-[24px] bg-navy-800 p-8 md:rounded-[28px]">
        <p className="text-[24px] text-white">Hvala! Upit je poslan.</p>
        <p className="mt-2 text-[16px] text-white/70">Javljamo se isti dan. Ako je hitno, slobodno nazovite.</p>
      </div>
    );

  const field =
    "w-full rounded-[14px] border border-white/12 bg-navy-900 px-4 text-[16px] text-white placeholder:text-white/40 focus:border-amber-500 focus:outline-none";

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 rounded-[24px] bg-navy-800 p-5 md:rounded-[28px] md:p-8">
      <h2 className="text-[26px] text-white md:text-[32px]">Pošaljite upit</h2>
      <fieldset>
        <legend className="sr-only">Razlog javljanja</legend>
        <div className="flex flex-wrap gap-2">
          {RAZLOZI.map((r) => (
            <button
              key={r}
              type="button"
              aria-pressed={razlog === r}
              onClick={() => setRazlog(r)}
              className={`rounded-full px-4 py-2.5 text-[15px] font-medium transition-colors ${razlog === r ? "bg-amber-500 text-navy-900" : "bg-white/[0.08] text-white hover:bg-white/15"}`}
            >
              {r}
            </button>
          ))}
        </div>
      </fieldset>
      <label className="flex flex-col gap-1.5 text-[14px] text-white/80">
        Ime
        <input name="ime" required autoComplete="name" placeholder="Vaše ime" className={`${field} h-14`} />
      </label>
      <label className="flex flex-col gap-1.5 text-[14px] text-white/80">
        Broj telefona
        <input name="telefon" required type="tel" autoComplete="tel" inputMode="tel" placeholder="06x xxx xxx" className={`${field} h-14`} />
      </label>
      <label className="flex flex-col gap-1.5 text-[14px] text-white/80">
        Šta se desilo?
        <textarea name="poruka" required rows={4} placeholder="Npr. laptop se gasi nakon 10 minuta" className={`${field} py-3.5`} />
      </label>
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <button
        type="submit"
        disabled={state === "sending"}
        className="mt-1 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-amber-500 px-6 text-[16px] font-medium text-navy-900 disabled:opacity-70"
      >
        {state === "sending" && <Loader2 size={18} className="animate-spin" aria-hidden />}
        Pošalji upit
      </button>
      {state === "error" && (
        <p role="alert" className="text-[15px] text-amber-500">
          Nešto nije uspjelo. Pokušajte ponovo ili nazovite 061 336 599.
        </p>
      )}
      <p className="text-[13px] text-white/55">Javljamo se isti dan. Podatke koristimo samo za odgovor na upit.</p>
    </form>
  );
}
