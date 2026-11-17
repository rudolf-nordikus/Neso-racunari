// Landing stranice usluga. Sadržaj sa starog sajta (16.11.2026.), ispravljeni tipfeleri i "adresa" -> "dogovoreno mjesto".
export type Usluga = { slug: string; naziv: string; h1: string; acc: string; slika: string; ikona: string; seoTitle: string; description: string; lead: string; kvarovi: { naslov: string; opis: string }[]; cijene: { naziv: string; cijena: string }[]; napomena: string; faq: { q: string; a: string }[] };

export const usluge: Usluga[] = [
  {
    "slug": "servis-laptopa-sarajevo",
    "naziv": "Servis laptopa",
    "h1": "Servis laptopa koji dolazi po tebe",
    "acc": "dolazi po tebe",
    "slika": "1-ekran",
    "ikona": "ekran",
    "seoTitle": "Servis laptopa Sarajevo – Preuzimamo na dogovorenom mjestu",
    "description": "Servis laptopa Sarajevo: popravka svih brendova, zamjena ekrana, baterije, tastature i RAM/SSD-a. Mobilni tim preuzima laptop na dogovorenom mjestu i dostavlja popravljen. Pozovite +387 61 336 599.",
    "lead": "Popravljamo sve brendove: HP, Lenovo, Dell, Asus, Acer i Apple. Preuzmemo laptop na dogovorenom mjestu, popravimo ga i vratimo. Dijagnostika je besplatna.",
    "kvarovi": [
      {
        "naslov": "Zamjena ekrana",
        "opis": "Puknut, crn ili bez slike: zamjenjujemo sve veličine i rezolucije. Originalni i kompatibilni paneli."
      },
      {
        "naslov": "Zamjena baterije",
        "opis": "Baterija drži sat vremena ili se laptop ne puni? Zamjenjujemo baterije za sve modele laptopa."
      },
      {
        "naslov": "Zamjena tastature",
        "opis": "Pokvarene, zaglavljene ili izlizane tipke. Mijenjamo cijelu tastaturu ili pojedinačne tipke."
      },
      {
        "naslov": "Čišćenje i pregrijavanje",
        "opis": "Laptop se gasi sam, ventilator se čuje? Čišćenje hladnjaka i zamjena termalne paste vraća laptop u život."
      },
      {
        "naslov": "Nadogradnja RAM i SSD",
        "opis": "Spor laptop? Dodavanje RAM-a ili prelazak sa HDD na SSD ubrzava rad i do 5 puta. Brza montaža."
      },
      {
        "naslov": "Popravka matične ploče",
        "opis": "Laptop se ne uključuje, nema slike, ne puni se? Dijagnostika i popravka matične ploče na chipset nivou."
      }
    ],
    "cijene": [
      {
        "naziv": "Zamjena ekrana",
        "cijena": "od 80 KM"
      },
      {
        "naziv": "Zamjena baterije",
        "cijena": "od 50 KM"
      },
      {
        "naziv": "Zamjena tastature",
        "cijena": "od 60 KM"
      },
      {
        "naziv": "Nadogradnja SSD / RAM",
        "cijena": "od 30 KM"
      },
      {
        "naziv": "Čišćenje hladnjaka",
        "cijena": "od 40 KM"
      },
      {
        "naziv": "Instalacija Windows-a",
        "cijena": "od 50 KM"
      },
      {
        "naziv": "Dijagnostika",
        "cijena": "besplatno"
      }
    ],
    "napomena": "Dijagnostika je besplatna ukoliko se odlučite za popravku. Za tačnu cijenu kontaktirajte nas.",
    "faq": [
      {
        "q": "Da li zaista dolazite na dogovoreno mjesto?",
        "a": "Da. Mi smo prvi mobilni servis računara i laptopa u Sarajevu. Na dogovorenom mjestu preuzimamo laptop, popravljamo ga i dostavljamo nazad: bez da vi morate nigdje ići."
      },
      {
        "q": "Koje brendove laptopa servisujete?",
        "a": "Servisujemo sve brendove: HP, Lenovo, Dell, Asus, Acer, Apple MacBook, MSI, Samsung, Toshiba i ostale. Nema razlike u godini ili modelu."
      },
      {
        "q": "Koliko traje popravka laptopa?",
        "a": "Većinu kvarova rješavamo za 2-3 dana. Za zamjenu ekrana ili baterije ponekad i brže, ako dijelovi budu na zalihama. Za složenije popravke rok dogovaramo unaprijed."
      },
      {
        "q": "Da li dajete garanciju na popravku?",
        "a": "Da, na svaku popravku dajemo garanciju na rad. Ugrađeni dijelovi dolaze sa garantnim rokom proizvođača. Ukoliko se isti kvar ponovi, popravka je besplatna."
      }
    ]
  },
  {
    "slug": "servis-racunara-sarajevo",
    "naziv": "Servis računara",
    "h1": "Servis računara bez nošenja kućišta",
    "acc": "bez nošenja kućišta",
    "slika": "2-desktop",
    "ikona": "spor",
    "seoTitle": "Servis računara Sarajevo – Desktop i kućni računari",
    "description": "Servis desktop računara Sarajevo: popravka, nadogradnja i IT podrška za kućne i poslovne korisnike. Dolazimo na dogovoreno mjesto, preuzimamo i dostavljamo. Pozovite +387 61 336 599.",
    "lead": "Popravka, nadogradnja i IT podrška za desktop računare: za kućne korisnike i firme. Dolazimo na dogovoreno mjesto, preuzimamo, popravljamo i dostavljamo. Brzo, povoljno, pouzdano.",
    "kvarovi": [
      {
        "naslov": "Dijagnostika i popravka",
        "opis": "Računar se ne uključuje, restartuje sam ili prikazuje greške? Pronalazimo uzrok i popravljamo hardverske i softverske kvarove."
      },
      {
        "naslov": "Zamjena i nadogradnja komponenti",
        "opis": "Zamjena napajanja, RAM-a, hard diska, grafičke kartice, matične ploče ili procesora. Savjetujemo optimalne nadogradnje za vaš budžet."
      },
      {
        "naslov": "Optimizacija performansi",
        "opis": "Spor računar? Čišćenje OS-a, zamjena HDD sa SSD-om, dodavanje RAM-a: drastično ubrzanje bez kupovine novog računara."
      },
      {
        "naslov": "Mreža i periferije",
        "opis": "Postavljanje kućne i poslovne mreže, konfiguracija rutera, spajanje printera i periferija. Sve na jednom mjestu."
      },
      {
        "naslov": "IT podrška za firme",
        "opis": "Servis i održavanje računara za poslovne korisnike. Dolazimo u firmu, servisiramo na licu mjesta ili preuzimamo uređaje."
      },
      {
        "naslov": "Čišćenje i prevencija",
        "opis": "Prašina u kućištu ubija komponente. Redovno čišćenje i zamjena termalne paste produžavaju život računara i sprečavaju pregrijavanje."
      }
    ],
    "cijene": [
      {
        "naziv": "Dijagnostika",
        "cijena": "besplatno"
      },
      {
        "naziv": "Zamjena napajanja",
        "cijena": "od 60 KM"
      },
      {
        "naziv": "Nadogradnja RAM / SSD",
        "cijena": "od 30 KM"
      },
      {
        "naziv": "Instalacija Windows-a",
        "cijena": "od 50 KM"
      },
      {
        "naziv": "Čišćenje kućišta i hladnjaka",
        "cijena": "od 35 KM"
      },
      {
        "naziv": "Zamjena komponente (rad)",
        "cijena": "od 30 KM"
      },
      {
        "naziv": "IT podrška za firme",
        "cijena": "po dogovoru"
      }
    ],
    "napomena": "Dijagnostika besplatna uz popravku. Cijena dijelova se dodaje posebno.",
    "faq": [
      {
        "q": "Da li dolazite i za kućne i za poslovne korisnike?",
        "a": "Da, servisiramo i kućne korisnike i firme na cijelom području Sarajeva. Za firme nudimo i dugoročnu IT podršku i redovno održavanje."
      },
      {
        "q": "Šta ako mi treba novi dio?",
        "a": "Prije zamjene bilo kojeg dijela informišemo vas o cijeni i tražimo odobrenje. Imamo veliki izbor originalnih i kompatibilnih dijelova, a za specifične nabavljamo u kratkom roku."
      },
      {
        "q": "Možete li doći hitno?",
        "a": "Da, nudimo prioritetni i hitni servis uz naknadu. Nazovite direktno na +387 61 336 599: dogovorimo najbrži moguć termin."
      },
      {
        "q": "Da li vrijedi popraviti stari računar?",
        "a": "Uvijek damo iskreno mišljenje. Ako je popravka skuplja od vrijednosti računara, reći ćemo vam to i ponuditi alternativu: imamo bogatu ponudu polovnih računara po odličnim cijenama."
      }
    ]
  },
  {
    "slug": "servis-printera-sarajevo",
    "naziv": "Servis printera",
    "h1": "Printeri: servis i punjenje tonera",
    "acc": "servis i punjenje tonera",
    "slika": "printer",
    "ikona": "printer",
    "seoTitle": "Servis printera Sarajevo – Punjenje tonera i popravka",
    "description": "Servis printera Sarajevo: punjenje tonera i kertridža, popravka laserskih i inkjet printera, zamjena valjaka i dijelova. Dolazimo na dogovoreno mjesto. Pozovite +387 61 336 599.",
    "lead": "Trošite previše na tonere i kertridže? Servisiramo i punimo laserske i inkjet printere u Sarajevu. Na dogovorenom mjestu: preuzimamo, servisiramo i dostavljamo.",
    "kvarovi": [
      {
        "naslov": "Punjenje tonera",
        "opis": "Punjenje laserskih tonera za HP, Canon, Samsung, Lexmark, Brother i ostale brendove. Kvalitetni punjači: print kao od originalnog."
      },
      {
        "naslov": "Punjenje kertridža",
        "opis": "Punjenje inkjet kertridža za HP, Canon, Epson i Brother. Uštedite do 80% u odnosu na kupovinu novih originalnih kertridža."
      },
      {
        "naslov": "Popravka mehanike",
        "opis": "Printer ne uvlači papir, zaglavljuje ili preskače listove? Popravka valjaka, separatora i mehanizma uvlačenja papira."
      },
      {
        "naslov": "Čišćenje glave za štampu",
        "opis": "Bijele linije, izblijedjeli ispis ili začepljene glave? Čistimo glave za štampu i vraćamo kvalitet ispisa na original."
      },
      {
        "naslov": "Zamjena dijelova",
        "opis": "Zamjena valjaka, fusera, transfer pojasa i ostalih potrošnih dijelova. Koristimo originalne i kompatibilne dijelove."
      },
      {
        "naslov": "Savjet za uštedu",
        "opis": "Pomažemo vam da odaberete pravo rješenje: koji printer štampa najjeftinije po stranici i da li se isplati punjenje ili novi printer."
      }
    ],
    "cijene": [
      {
        "naziv": "Punjenje laserskog tonera",
        "cijena": "od 25 KM"
      },
      {
        "naziv": "Punjenje inkjet kertridža",
        "cijena": "od 10 KM"
      },
      {
        "naziv": "Čišćenje glave za štampu",
        "cijena": "od 30 KM"
      },
      {
        "naziv": "Popravka uvlačenja papira",
        "cijena": "od 40 KM"
      },
      {
        "naziv": "Zamjena fusera / valjaka",
        "cijena": "od 50 KM"
      },
      {
        "naziv": "Dijagnostika i pregled",
        "cijena": "besplatno"
      }
    ],
    "napomena": "Dijagnostika besplatna uz servis. Za tačnu cijenu punjenja vašeg modela: slobodno nazovite.",
    "faq": [
      {
        "q": "Da li punite sve vrste tonera i kertridža?",
        "a": "Da, punimo veliku većinu modela laserskih tonera i inkjet kertridža. Javite nam model printera i provjerimo odmah."
      },
      {
        "q": "Koliko traje punjenje tonera?",
        "a": "Punjenje tonera obično je gotovo isti dan ili sutradan. Za kompleksnije popravke rok dogovaramo unaprijed."
      },
      {
        "q": "Je li punjenje tonera loše za printer?",
        "a": "Ne, uz pravilno punjenje i kvalitetni toner printer radi bez problema. Koristimo provjeren toner koji odgovara specifikacijama vašeg modela."
      },
      {
        "q": "Radite li s korporativnim korisnicima?",
        "a": "Da, nudimo redovno održavanje i punjenje printera za firme s više uređaja. Dogovorimo okvirni servisni paket po povoljnijim uvjetima."
      }
    ]
  },
  {
    "slug": "instalacija-windowsa-sarajevo",
    "naziv": "Instalacija Windowsa",
    "h1": "Instalacija Windowsa, računar kao nov",
    "acc": "računar kao nov",
    "slika": "3-instalacija",
    "ikona": "ne-pali",
    "seoTitle": "Instalacija Windowsa Sarajevo – Windows 10 i 11",
    "description": "Instalacija Windowsa Sarajevo: čista instalacija Windows 10 i Windows 11, svi driveri, programi i backup podataka. Dolazimo na dogovoreno mjesto. Brzo i povoljno. Pozovite +387 61 336 599.",
    "lead": "Instaliramo Windows 10 i Windows 11: čista instalacija, svi driveri, najvažniji programi i backup vaših podataka. Računar kao nov, bez gnjavaže. Dolazimo na dogovoreno mjesto ili preuzimamo uređaj.",
    "kvarovi": [
      {
        "naslov": "Čista instalacija Windows 10/11",
        "opis": "Instalacija najnovije verzije Windows 10 ili Windows 11: u zavisnosti od vašeg hardvera i potreba. Bez bloatwarea, čisto i optimizirano."
      },
      {
        "naslov": "Instalacija svih drivera",
        "opis": "Instaliramo sve potrebne drivere: grafičku karticu, zvuk, mrežu, WiFi, printer i ostale periferne uređaje. Sve radi iz prve."
      },
      {
        "naslov": "Instalacija programa",
        "opis": "Office, browser, antivirus, PDF čitač, WinRAR, medija plejeri i ostali programi koje svakodnevno koristite: sve spreman po dolasku."
      },
      {
        "naslov": "Backup i migracija podataka",
        "opis": "Čuvamo vaše fajlove, dokumente, slike i ostale podatke prije instalacije. Migriramo ih na novi sistem: ništa ne gubite."
      },
      {
        "naslov": "Aktivacija licenci",
        "opis": "Aktiviramo Windows i Office licencu. Savjetujemo oko originalnih licenci po povoljnim cijenama ako ih nemate."
      },
      {
        "naslov": "Optimizacija pokretanja",
        "opis": "Isključujemo nepotrebne programe koji se pokreću s Windowsom. Računar se pokreće brže i radi stabilnije od prvog dana."
      }
    ],
    "cijene": [
      {
        "naziv": "Instalacija Windows-a",
        "cijena": "od 50 KM"
      },
      {
        "naziv": "Instalacija Windows-a + driveri + programi",
        "cijena": "od 70 KM"
      },
      {
        "naziv": "Backup podataka",
        "cijena": "od 30 KM"
      },
      {
        "naziv": "Migracija podataka",
        "cijena": "od 40 KM"
      },
      {
        "naziv": "Optimizacija postojećeg sistema",
        "cijena": "od 40 KM"
      },
      {
        "naziv": "Dijagnostika sistema",
        "cijena": "besplatno"
      }
    ],
    "napomena": "Dijagnostika besplatna uz instalaciju. Licenca za Windows ili Office se naplaćuje posebno: savjetujemo vas oko najpovoljnijeg rješenja.",
    "faq": [
      {
        "q": "Da li mogu izgubiti podatke pri instalaciji Windowsa?",
        "a": "Čista instalacija Windowsa briše sistemsku particiju, ali vaši dokumenti, slike i fajlovi mogu biti sačuvani. Uvijek radimo backup podataka prije svake instalacije: ništa ne gubite."
      },
      {
        "q": "Windows 10 ili Windows 11: šta da instaliram?",
        "a": "Ovisi o hardveru i vašim potrebama. Windows 11 zahtijeva noviji hardver (TPM 2.0). Savjetujemo šta je optimalno za vaš računar: a zajednički biramo verziju koja vam najviše odgovara."
      },
      {
        "q": "Koliko traje instalacija Windowsa?",
        "a": "Kompletna instalacija (Windows + driveri + programi) traje 2-4 sata zavisno od brzine računara. Obično vam vraćamo uređaj isti dan ili sutradan."
      },
      {
        "q": "Da li mi treba licenca za Windows?",
        "a": "Za punu aktivaciju Windowsa potrebna je licenca. Ako je nemate, pomažemo vam nabaviti originalnu licencu po povoljnoj cijeni. Savjetujemo vam najisplativije rješenje."
      }
    ]
  },
  {
    "slug": "uklanjanje-virusa-sarajevo",
    "naziv": "Uklanjanje virusa",
    "h1": "Uklanjanje virusa bez gubitka podataka",
    "acc": "bez gubitka podataka",
    "slika": "4-virus",
    "ikona": "virus",
    "seoTitle": "Uklanjanje virusa Sarajevo – Čišćenje malwarea i zaštita",
    "description": "Uklanjanje virusa Sarajevo: potpuno čišćenje virusa, malwarea, ransomwarea i špijunskog softvera bez gubitka podataka. Dolazimo na dogovoreno mjesto. Pozovite +387 61 336 599.",
    "lead": "Potpuno uklanjanje virusa, malwarea, ransomwarea i špijunskog softvera. Vraćamo sigurnost i performanse vašeg računara: bez gubitka podataka gdje god je to moguće. Dolazimo na dogovoreno mjesto u Sarajevu.",
    "kvarovi": [
      {
        "naslov": "Uklanjanje virusa i malwarea",
        "opis": "Potpuno čišćenje svih vrsta virusa, trojanaca, spywarea, adwarea i ostalih zlonamjernih programa koji usporavaju ili ugrožavaju vaš računar."
      },
      {
        "naslov": "Čišćenje ransomwarea",
        "opis": "Ransomware zaključao vaše fajlove? Uklanjamo infekciju i pokušavamo oporaviti zaključane podatke: bez plaćanja otkupa."
      },
      {
        "naslov": "Uklanjanje špijunskog softvera",
        "opis": "Spyware i keyloggeri prate vaše aktivnosti i kradu lozinke. Pronalazimo i uklanjamo svaki trag špijunskog softvera s vašeg sistema."
      },
      {
        "naslov": "Obnova podataka",
        "opis": "Pokušavamo oporaviti podatke koji su zaključani, obrisani ili oštećeni virusom. Koristimo profesionalne alate za obnovu podataka."
      },
      {
        "naslov": "Postavljanje antivirusa",
        "opis": "Instaliramo i podešavamo pouzdanu antivirusnu zaštitu prilagođenu vašim potrebama: kućnim ili poslovnim korisnicima."
      },
      {
        "naslov": "Savjeti za zaštitu",
        "opis": "Objašnjavamo kako se virus pojavio i šta napraviti da se to ne ponovi. Jednostavni savjeti koji vas štite dugoročno."
      }
    ],
    "cijene": [
      {
        "naziv": "Dijagnostika sistema",
        "cijena": "besplatno"
      },
      {
        "naziv": "Uklanjanje virusa / malwarea",
        "cijena": "od 60 KM"
      },
      {
        "naziv": "Kompletno čišćenje + zaštita",
        "cijena": "od 80 KM"
      },
      {
        "naziv": "Obnova zaključanih fajlova",
        "cijena": "od 60 KM"
      },
      {
        "naziv": "Reinstalacija sistema (po potrebi)",
        "cijena": "od 50 KM"
      },
      {
        "naziv": "Postavljanje antivirusa",
        "cijena": "od 20 KM"
      }
    ],
    "napomena": "Dijagnostika besplatna uz uslugu čišćenja. Za hitne slučajeve nazovite direktno na +387 61 336 599.",
    "faq": [
      {
        "q": "Kako da znam da li je moj računar zaražen virusom?",
        "a": "Znakovi infekcije: računar je neuobičajeno spor, pojavljuju se nepoznati programi, pregledač vas preusmjerava na nepoznate stranice, fajlovi su zaključani ili nedostupni, ili vidite poruke o otkupu. Ako primijetite išta od navedenog: javite nam se odmah."
      },
      {
        "q": "Da li ću izgubiti podatke pri čišćenju virusa?",
        "a": "Trudimo se sačuvati sve podatke. U većini slučajeva čišćenje virusa ne zahtijeva brisanje podataka. Za ransomware situacije pokušavamo oporaviti zaključane fajlove pomoću profesionalnih alata."
      },
      {
        "q": "Šta ako antivirusni program ne pronađe virus?",
        "a": "Mnogi virusi i rootkiti se kriju od standardnih antivirusa. Koristimo specijalizirane alate za dubinsku analizu sistema koji otkrivaju skrivene prijetnje koje obični antivirus propušta."
      },
      {
        "q": "Koliko traje čišćenje virusa?",
        "a": "Za standardne infekcije obično 2-4 sata rada. Za kompleksnije situacije (ransomware, duboke infekcije) rok dogovaramo unaprijed. U hitnim slučajevima organizujemo prioritetni servis."
      }
    ]
  },
  {
    "slug": "mobilni-servis-racunara-sarajevo",
    "naziv": "Mobilni servis",
    "h1": "Mobilni servis: mi dolazimo po uređaj",
    "acc": "mi dolazimo po uređaj",
    "slika": "6-dostava",
    "ikona": "pregrijava",
    "seoTitle": "Mobilni servis računara Sarajevo – Preuzimamo na dogovorenom mjestu",
    "description": "Mobilni servis računara Sarajevo: prvi i jedini mobilni servis u Sarajevu. Na dogovorenom mjestu preuzimamo, popravljamo laptop ili računar i dostavljamo nazad. Pozovite +387 61 336 599.",
    "lead": "Prvi i jedini mobilni servis računara i laptopa u Sarajevu. Preuzmemo uređaj na dogovorenom mjestu, popravimo ga i vratimo. Bez gužve, bez čekanja u redu, bez odlaska u servis.",
    "kvarovi": [
      {
        "naslov": "Dolazimo po uređaj",
        "opis": "Preuzmemo laptop ili računar na mjestu koje vam odgovara, bilo gdje u Sarajevu. Nema vožnje, nema gužve."
      },
      {
        "naslov": "Vraćamo popravljeno",
        "opis": "Popravljen uređaj vraćamo na dogovoreno mjesto. Cijeli servisni ciklus završava bez ikakvog vašeg truda."
      },
      {
        "naslov": "Servis za firme",
        "opis": "Dolazimo u poslovne prostore, preuzimamo više uređaja odjednom i vraćamo ih u dogovorenom roku. Idealno za firme i kancelarije."
      },
      {
        "naslov": "Hitan servis",
        "opis": "Ne možete čekati? Nudimo prioritetni servis uz naknadu: dolazimo što je brže moguće i dajemo prednost vašem uređaju."
      },
      {
        "naslov": "Fleksibilni termini",
        "opis": "Dogovaramo termin koji vama odgovara: jutro, popodne, subota. Radimo pon–sub 08:00–20:00h."
      },
      {
        "naslov": "Sigurno rukovanje",
        "opis": "Uređaj je u sigurnim rukama od preuzimanja do dostave. Potvrda preuzimanja, praćenje statusa, garancija na svaku popravku."
      }
    ],
    "cijene": [
      {
        "naziv": "Preuzimanje i povrat (uz popravku)",
        "cijena": "besplatno"
      },
      {
        "naziv": "Dijagnostika (uz popravku)",
        "cijena": "besplatno"
      },
      {
        "naziv": "Hitan / prioritetni dolazak",
        "cijena": "od 20 KM"
      },
      {
        "naziv": "Servis laptopa",
        "cijena": "od 50 KM"
      },
      {
        "naziv": "Servis desktop računara",
        "cijena": "od 50 KM"
      },
      {
        "naziv": "IT podrška za firme",
        "cijena": "po dogovoru"
      }
    ],
    "napomena": "",
    "faq": [
      {
        "q": "Koje područje Sarajeva pokrivate?",
        "a": "Dolazimo na sve lokacije unutar Sarajeva i okolice: Centar, Novo Sarajevo, Novi Grad, Ilidža, Vogošća, Hadžići i šire područje. Za lokacije van Sarajeva: nazovite da provjerimo."
      },
      {
        "q": "Da li plaćam dolazak ako se ne odlučim za popravku?",
        "a": "Dolazak na dogovoreno mjesto je besplatan uz popravku. Ako se ne odlučite za popravku, cijena dijagnostike se dogovara unaprijed: javite nam se i razjasnimo sve detalje prije dolaska."
      },
      {
        "q": "Možete li doći isti dan?",
        "a": "U zavisnosti od rasporeda, često organizujemo dolazak isti ili sutradan. Za hitne situacije nudimo prioritetni termin: nazovite direktno na +387 61 336 599."
      },
      {
        "q": "Radite li i subotom?",
        "a": "Da, radimo ponedjeljak-subota od 08:00 do 20:00h. Za nedjelju ili van radnog vremena: nazovite i dogovorimo po potrebi."
      }
    ]
  }
];

export const uslugaBySlug = (slug: string) => usluge.find((u) => u.slug === slug);
