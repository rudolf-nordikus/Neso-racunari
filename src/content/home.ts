// Sadržaj naslovne (Figma v4 · bento + glass, 54:3).
// Pravilo: nikad "u kuću", uvijek "dogovoreno mjesto".

export const problemi = [
  { ikona: "ne-pali", naslov: "Ne pali se", opis: "Napajanje, baterija ili ploča.", cijena: "od 30 KM", href: "/servis-laptopa-sarajevo" },
  { ikona: "spor", naslov: "Spor je i koči", opis: "SSD, RAM i čišćenje.", cijena: "od 30 KM", href: "/servis-racunara-sarajevo" },
  { ikona: "ekran", naslov: "Puknut ekran", opis: "Svi brendovi i veličine.", cijena: "od 80 KM", href: "/servis-laptopa-sarajevo" },
  { ikona: "pregrijava", naslov: "Pregrijava se", opis: "Čišćenje i nova pasta.", cijena: "od 40 KM", href: "/blog/laptop-se-pregrijava" },
  { ikona: "virus", naslov: "Virus i reklame", opis: "Čišćenje bez gubitka podataka.", cijena: "od 60 KM", href: "/uklanjanje-virusa-sarajevo" },
  { ikona: "printer", naslov: "Printer ne radi", opis: "Popravka i punjenje tonera.", cijena: "od 25 KM", href: "/servis-printera-sarajevo" },
] as const;

export const cinjenice = [
  { k: "Dijagnostika", v: "Besplatna" },
  { k: "Popravka", v: "Za 2 do 3 dana" },
  { k: "Preuzimanje", v: "Na dogovorenom mjestu" },
  { k: "Radimo", v: "Svaki dan 10–20 h" },
] as const;

export const koraci = [
  {
    ikona: "korak1-poziv",
    kratko: "Poziv",
    naslov: "Pozovete ili pišete na Viber",
    opis: "Opišete problem, dogovorimo mjesto i vrijeme preuzimanja.",
  },
  {
    ikona: "korak2-preuzimanje",
    kratko: "Preuzimanje",
    naslov: "Preuzimamo na dogovorenom mjestu",
    opis: "Ispred zgrade, na poslu ili u gradu. Gdje vam odgovara.",
  },
  {
    ikona: "korak3-servis",
    kratko: "Servis",
    naslov: "Dijagnostika i popravka",
    opis: "Pregled je besplatan. Javimo cijenu i radimo tek kad je odobrite.",
  },
  {
    ikona: "korak4-povratak",
    kratko: "Povratak",
    naslov: "Vraćamo popravljeno",
    opis: "Za 2 do 3 dana, na dogovoreno mjesto, uz garanciju.",
  },
] as const;

/** Scroll priča na naslovnoj (three.js scena, 7 scena). Poster = 3D ikona dok se scena ne učita. */
export const prica = [
  { kratko: "Kvar", naslov: "Laptop je stao", opis: "Ne pali se, ekran je pukao ili se pregrijava. Desi se svakome.", poster: "ne-pali" },
  { kratko: "Poziv", naslov: "Pozovete ili pišete na Viber", opis: "Opišete problem, dogovorimo mjesto i vrijeme.", poster: "korak1-poziv" },
  { kratko: "Dolazak", naslov: "Nešo dolazi po uređaj", opis: "Berlingom do dogovorenog mjesta, bilo gdje u Sarajevu.", poster: "korak2-preuzimanje" },
  { kratko: "Preuzimanje", naslov: "Preuzimanje na licu mjesta", opis: "Ispred zgrade, na poslu ili u gradu. Vi ne nosite ništa.", poster: "korak2-preuzimanje" },
  { kratko: "Servis", naslov: "Dijagnostika i popravka", opis: "Pregled je besplatan. Radimo tek kad odobrite cijenu.", poster: "korak3-servis" },
  { kratko: "Povratak", naslov: "Vraćamo popravljeno", opis: "Za 2 do 3 dana, na dogovoreno mjesto, uz garanciju.", poster: "korak4-povratak" },
  { kratko: "Radi", naslov: "Radi kao nov", opis: "Svi zadovoljni. Računarte na nas!", poster: "virus" },
] as const;

export const cjenovnik = [
  { naziv: "Dijagnostika", cijena: "besplatno" },
  { naziv: "Zamjena ekrana laptopa", cijena: "od 80 KM" },
  { naziv: "Zamjena baterije", cijena: "od 50 KM" },
  { naziv: "Nadogradnja SSD / RAM", cijena: "od 30 KM" },
  { naziv: "Čišćenje hladnjaka", cijena: "od 40 KM" },
  { naziv: "Instalacija Windowsa", cijena: "od 50 KM" },
  { naziv: "Uklanjanje virusa", cijena: "od 60 KM" },
  { naziv: "Punjenje tonera", cijena: "od 25 KM" },
] as const;

export const faqNaslovna = [
  {
    q: "Da li zaista dolazite po uređaj?",
    a: "Da. Mi smo prvi i jedini mobilni servis računara u Sarajevu. Dogovorimo mjesto i vrijeme, preuzmemo uređaj, popravimo ga i vratimo.",
  },
  {
    q: "Koliko traje popravka?",
    a: "Većinu kvarova riješimo za 2 do 3 dana. Za složenije popravke rok dogovaramo unaprijed, a nekad nudimo i zamjenski uređaj.",
  },
  { q: "Koliko košta dijagnostika?", a: "Ništa. Cijenu popravke javimo nakon pregleda i radimo tek kad je odobrite." },
  { q: "Šta je sa mojim podacima?", a: "Podatke ne diramo bez potrebe. Prije većih zahvata napravimo backup, ako to želite." },
  { q: "Da li dajete garanciju?", a: "Da, na svaku popravku. Trajanje zavisi od vrste popravke i dijelova." },
  { q: "Radite li sa firmama?", a: "Da. Servis i održavanje računara, printera i mreže, uz račun i dugoročnu podršku." },
] as const;

export const klijenti = [
  { slug: "italgroup", naziv: "Italgroup" },
  { slug: "cafe-bar-opera", naziv: "Café Bar Opera" },
  { slug: "dizart", naziv: "Dizart" },
  { slug: "spazio", naziv: "Spazio Gourmet" },
  { slug: "pennyplus", naziv: "Penny Plus" },
  { slug: "ilighting", naziv: "iLighting" },
  { slug: "luxor", naziv: "Luxor XL" },
  { slug: "nordika", naziv: "Nordika" },
  { slug: "emedia-patch", naziv: "eMedia Patch" },
] as const;
