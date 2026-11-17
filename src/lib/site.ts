// Jedini izvor istine za ime, kontakt i podatke firme (NAP).
// Isti podaci moraju biti na Google Business Profile, Bing Places i Instagramu. OLX se više ne koristi.
// Telefon potvrđen 16.11.2026. Viber ide direktno na broj (chat), ne na grupu. Podaci uskladjeni sa Google profilom.

export const site = {
  name: "Nešo Računari",
  legalName: "Nešo Računari",
  url: "https://www.neso-racunari.com",
  locale: "bs_BA",
  lang: "bs",
  tagline: "Mobilni servis računara u Sarajevu",
  description:
    "Servis laptopa, računara i printera u Sarajevu. Preuzmemo uređaj na dogovorenom mjestu, popravimo ga i vratimo. Dijagnostika besplatna.",
  phone: "+387 61 336 599",
  phoneDisplay: "061 336 599",
  phoneHref: "tel:+38761336599",
  viberHref: "viber://chat?number=%2B38761336599",
  email: "info@neso-racunari.com",
  city: "Sarajevo",
  region: "Kanton Sarajevo",
  country: "BA",
  street: "Behdžeta Mutevelića 97",
  postalCode: "71000",
  geo: { lat: 43.8486288, lng: 18.3881763 },
  openingHours: [{ days: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"], opens: "10:00", closes: "20:00" }],
  social: {
    instagram: "https://www.instagram.com/nesoracunari/",
    googleMaps: "https://www.google.com/maps?cid=14935595647721055294",
  },
  googleAdsId: "AW-17600241018",
} as const;

export const nav = [
  { href: "/usluge", label: "Usluge", opis: "Svi kvarovi i cijene" },
  { href: "/#cijene", label: "Cijene", opis: "Okvirne cijene rada" },
  { href: "/#kako-radi", label: "Kako radi", opis: "Od poziva do povratka" },
  { href: "/#o-nama", label: "O nama", opis: "Tata i sin" },
  { href: "/#prodaja", label: "Prodaja", opis: "Laptopi, računari, printeri" },
] as const;

export const navMobileExtra = [
  { href: "/blog", label: "Blog", opis: "Savjeti" },
  { href: "/kontakt", label: "Kontakt", opis: "Forma i adresa" },
] as const;
