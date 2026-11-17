// Prave Google recenzije (Google Maps profil, preuzeto 16.11.2026.).
// Ocjena 5,0 iz 13 recenzija. Dejanova recenzija je namjerno izostavljena (vlasnik).
// Tekst je doslovan; ne uređivati sadržaj, samo birati koje se prikazuju.
// naslovna: tri kratke recenzije na naslovnoj (Figma v5). istaknuto: duže, za podstranice.

export const googleRating = { value: 5.0, count: 13, checked: "2026-11-16" } as const;

export const googleMapsUrl =
  "https://www.google.com/maps?cid=14935595647721055294";

export const recenzije = [
  {
    ime: "Elsa Lojić",
    tekst:
      "Pokvareni Laptop sam odnijela u jedan Servis gdje su mi nakon 7 dana javili da ga ne mogu popraviti i da je otisla maticna. Kontaktirala sam Neso racunare, pokupili su moj laptop sa servisa i u roku od 24h ga popravili i donijeli nazad! Usluga, pristupacnost, efikasnost,kvalitet i profesionalnost - sve preporuke i hvala jos jednom!!!!",
    istaknuto: true,
  },
  {
    ime: "Dzana Stefanovic",
    tekst:
      "Veoma zadovoljna kvalitetom usluge. Ljubazno osoblje, računar odnijeli na popravak i vratili na adresu, isti normalno radi.",
    istaknuto: true,
    naslovna: true,
  },
  {
    ime: "Daniel Pérez",
    tekst:
      "Absolutely outstanding service from Neso Racunari. They arranged a same-day pickup of my laptop, kept me updated at every step, fixed the issue quickly, and returned it looking and running like new. Transparent pricing, no upselling. Professional, punctual, and super polite. I wouldn’t hesitate to use them again, highly recommended!",
    istaknuto: true,
    naslovna: true,
    jezik: "en",
  },
  { ime: "Tarik Muharemović", tekst: "Vrhunska usluga, jeftina, brza, uz preuzimanje i dostavu.", naslovna: true },
  { ime: "Faruk Rusidovic", tekst: "Sve preporuke! Profesionalni, brzi i povoljni!" },
  { ime: "Vladimir Čolaković", tekst: "Odlično iskustvo, topla preporuka!" },
  { ime: "Damir", tekst: "Pouzdani, brzi, povoljni." },
] as const;
