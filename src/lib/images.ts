// Slike usluga (Flora, bez pozadine) i 3D ikone.
export const uslugaSlika: Record<string, { src: string; w: number; h: number }> = {
  "1-ekran": { src: "/img/usluge/1-ekran.webp", w: 1186, h: 1200 },
  "2-desktop": { src: "/img/usluge/2-desktop.webp", w: 1200, h: 896 },
  "3-instalacija": { src: "/img/usluge/3-instalacija.webp", w: 1183, h: 1200 },
  "4-virus": { src: "/img/usluge/4-virus.webp", w: 1186, h: 1200 },
  "5-ciscenje": { src: "/img/usluge/5-ciscenje.webp", w: 1200, h: 936 },
  "6-dostava": { src: "/img/usluge/6-dostava.webp", w: 1200, h: 953 },
  printer: { src: "/img/printer.avif", w: 1204, h: 958 },
};

/** Cijena "od" za karticu usluge: najniža cijena iz tabele (bez "besplatno"). */
export function najnizaCijena(cijene: { cijena: string }[]): string {
  const n = cijene.map((c) => Number(c.cijena.match(/\d+/)?.[0])).filter((x) => x > 0);
  return n.length ? `od ${Math.min(...n)} KM` : "po dogovoru";
}
