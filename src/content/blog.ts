// Sadržaj preuzet sa starog sajta (16.11.2026.), ispravljeni tipfeleri. Rečenice "dolazimo na vašu adresu" izbačene (CTA to pokriva).
export type BlogPost = { slug: string; title: string; seoTitle: string; description: string; datum: string; minuta: number; ikona: string; usluga: string; intro: string[]; sekcije: { h: string; p: string[]; li: string[] }[] };

export const blog: BlogPost[] = [
  {
    "slug": "laptop-se-pregrijava",
    "title": "Laptop se pregrijava: uzroci i šta uraditi",
    "description": "Laptop postaje vruć za dodir, ventilator radi punom snagom ili se sam isključuje? Saznajte zašto se to dešava, kako prepoznati problem i šta možete sami uraditi.",
    "seoTitle": "Laptop se pregrijava: uzroci i šta uraditi | Neso Računari Sarajevo",
    "datum": "2026-03-03",
    "minuta": 4,
    "ikona": "pregrijava",
    "usluga": "servis-laptopa-sarajevo",
    "intro": [
      "Laptop postaje vruć za dodir, ventilator radi punom snagom čak i kad ništa ne radite, ili se računar sam isključuje bez upozorenja. Ako ste se prepoznali, pregrijavanje je gotovo sigurno uzrok. To je jedan od najčešćih problema koji vidimo u servisu i, srećom, u većini slučajeva postoji rješenje."
    ],
    "sekcije": [
      {
        "h": "Zašto se laptop pregrijava?",
        "p": [
          "Najčešći razlog je prašina. Unutar svakog laptopa nalazi se hladnjak koji provodi zrak kroz rebra i odvodi toplotu van kućišta. Tokom godina prašina se nakuplja i blokira taj prolaz. Ventilator se vrti, ali zrak ne može da prođe, temperatura raste i procesor počne da usporava rad kako bi se zaštitio.",
          "Drugi čest razlog je stara termalna pasta. Taj materijal stoji između procesora i hladnjaka i prenosi toplotu sa čipa na metal. Nakon tri do pet godina ona se osuši i prestane efikasno da funkcioniše. Ako vam je laptop te starosti i nikad nije čišćen, ovo je vjerovatno problem.",
          "Nekad je razlog puno jednostavniji: koristite laptop na krevetu, jastuku ili drugoj mekoj podlozi koja blokira otvore za hlađenje smještene na dnu."
        ],
        "li": []
      },
      {
        "h": "Kako prepoznati pregrijavanje?",
        "p": [],
        "li": [
          "Ventilator radi glasno i konstantno, čak i pri laganim zadacima",
          "Donji dio laptopa je vruć na dodir",
          "Laptop se sam isključuje bez upozorenja",
          "Performanse su lošije nego ranije, sve radi sporije",
          "Javljaju se greške ili \"plavi ekran\""
        ]
      },
      {
        "h": "Šta možete sami uraditi?",
        "p": [
          "Ako koristite laptop na mekim podlogama, prebacite se na tvrdu površinu i vidjet ćete razliku odmah. Kupovina jeftinog postolja s ventilatorima može pomoći kao privremeno rješenje.",
          "Ako laptop nije čišćen duže od godinu dana, komprimirani zrak ubačen kroz otvore može malo pomoći. Međutim, za temeljno čišćenje potrebno je otvoriti kućište i izvaditi hladnjak, što nije preporučljivo bez iskustva s opremom."
        ],
        "li": []
      },
      {
        "h": "Kada je pravo vrijeme za servis?",
        "p": [
          "Ako se laptop i dalje pregrijava nakon promjene podloge, pravo rješenje je profesionalno čišćenje hladnjaka i zamjena termalne paste. Taj zahvat u većini slučajeva u potpunosti rješava problem i može produžiti vijek laptopa za godinu-dvije.",
          "Ignorisanje problema je skuplja opcija. Dugotrajno pregrijavanje oštećuje matičnu ploču, a to je popravka koja često nije isplativa."
        ],
        "li": []
      }
    ]
  },
  {
    "slug": "baterija-laptopa-ne-drzi",
    "title": "Baterija laptopa ne drži: kada je zamijeniti i koliko košta u Sarajevu",
    "description": "Baterija laptopa se brzo prazni ili uopće ne drži punjenje? Saznajte kada je pravo vrijeme za zamjenu, koliko košta u Sarajevu i šta možete sami provjeriti.",
    "seoTitle": "Baterija laptopa ne drži: kada je zamijeniti i koliko košta u Sarajevu | Neso Računari Sarajevo",
    "datum": "2026-03-14",
    "minuta": 3,
    "ikona": "ne-pali",
    "usluga": "servis-laptopa-sarajevo",
    "intro": [
      "Baterija koja je nekad trajala pet sati, sad ne izdrži ni sat vremena. Ili se laptop ne uključuje bez strujnog kabla čak i kad je baterija navodno puna. To su jasni znakovi da je baterija pri kraju vijeka. Dobra vijest je da je zamjena i brza i relativno jeftina."
    ],
    "sekcije": [
      {
        "h": "Koliko dugo traje baterija laptopa?",
        "p": [
          "Prosječna baterija izdrži od 500 do 1000 ciklusa punjenja i pražnjenja. Ako laptop punite jednom dnevno, to je negdje između jedne i po i tri godine normalnog korištenja. Nakon toga kapacitet počne vidno da pada i baterija više ne može da drži punjenje kao ranije."
        ],
        "li": []
      },
      {
        "h": "Znakovi da je baterija gotova",
        "p": [
          "Ako primijetite ispupčivanje kućišta, to je hitno. Nabubrena baterija može oštetiti ekran, tastatura, pa čak i dovesti do požara. Nemojte čekati, javite nam se odmah."
        ],
        "li": [
          "Laptop se brzo prazni čak i pri laganim zadacima kao što je surfanje internetom",
          "Windows ili macOS prikazuje upozorenje \"Razmotrite zamjenu baterije\"",
          "Baterija se brzo napuni ali jednako brzo i isprazni",
          "Procenat baterije skače umjesto da ravnomjerno opada",
          "Kućište laptopa počinje da se ispupčuje ili deformiše"
        ]
      },
      {
        "h": "Da li se baterija može popraviti?",
        "p": [
          "Baterija se ne može popraviti, samo zamijeniti. Pitanje koje često dobijamo je da li je to skupo. Ovisi o modelu."
        ],
        "li": []
      },
      {
        "h": "Okvirne cijene zamjene baterije u Sarajevu",
        "p": [
          "Cijene su okvirne jer ovise o dostupnosti baterije za vaš specifičan model. Dijagnostika je besplatna."
        ],
        "li": [
          "HP, Acer, Dell, Lenovo, Asus: 50 do 100 KM s ugradnjom",
          "MSI, Toshiba, Samsung: 70 do 130 KM s ugradnjom",
          "Apple MacBook: od 150 KM naviše"
        ]
      },
      {
        "h": "Šta ako ne zamijenite na vrijeme?",
        "p": [
          "Istrošena baterija koja nabubri može oštetiti kućište ili matičnu ploču, pa ukupna cijena popravke postane znatno viša nego što bi bila samo zamjena baterije. Vrijedi riješiti problem na vrijeme."
        ],
        "li": []
      }
    ]
  },
  {
    "slug": "koliko-kosta-servis-laptopa-sarajevo",
    "title": "Koliko košta servis laptopa u Sarajevu",
    "description": "Pregled okvirnih cijena najčešćih popravki laptopa u Sarajevu: zamjena ekrana, baterije, čišćenje, instalacija sistema i više. Transparentne cijene, mobilni dolazak.",
    "seoTitle": "Koliko košta servis laptopa u Sarajevu | Neso Računari Sarajevo",
    "datum": "2026-04-13",
    "minuta": 5,
    "ikona": "ekran",
    "usluga": "servis-laptopa-sarajevo",
    "intro": [
      "Jedno od prvih pitanja koje dobijamo je: koliko to košta? Razumljivo je, niko ne voli iznenađenja. Zbog toga smo napravili pregled okvirnih cijena najčešćih servisnih zahvata za laptope u Sarajevu.",
      "Najvažnija stvar: dijagnostika je besplatna. Ne naplaćujemo pregled uređaja. Cijena se dogovara tek kad utvrdimo šta je problem i kad se slažete s ponudom."
    ],
    "sekcije": [
      {
        "h": "Okvirne cijene servisnih zahvata",
        "p": [
          "Čišćenje laptopa i zamjena termalne paste: 30 do 50 KM Uklanjamo prašinu iz hladnjaka i mijenjamo termalnu pastu. Rješava problem pregrijavanja i produžava vijek uređaja. Preporučujemo jednom godišnje za starije laptope.",
          "Zamjena baterije: 50 do 150 KM Cijena uključuje novu bateriju i ugradnju. Varira ovisno o marki i modelu laptopa. Za HP, Dell, Lenovo i Acer uglavnom 50 do 100 KM. Za MacBook od 150 KM naviše.",
          "Instalacija Windowsa: 30 do 50 KM Uključuje backup podataka, instalaciju sistema i instalaciju osnovnih programa.",
          "Zamjena ekrana: 80 do 250 KM Cijena ovisi o veličini, rezoluciji i tipu ekrana. Full HD ekrani su jeftiniji, 4K i touch ekrani skuplje.",
          "Zamjena SSD ili HDD diska: 30 do 50 KM + cijena diska SSD od 256 GB kreće se od 40 KM, 512 GB od 60 KM, 1 TB od 90 KM naviše.",
          "Uklanjanje virusa: 30 do 60 KM Ovisi o stepenu zaraze. Ako je potrebna reinstalacija sistema, cijena je kao za instalaciju Windowsa.",
          "Zamjena tastature: 40 do 90 KM Ovisi o modelu laptopa i dostupnosti dijela.",
          "Nadogradnja RAM memorije: 20 do 40 KM + cijena memorije Značajno ubrzava starije laptope. RAM od 8 GB kreće se od 25 KM naviše."
        ],
        "li": []
      },
      {
        "h": "Zašto cijene variraju?",
        "p": [
          "Svaki laptop je drugačiji. HP Pavilion i Dell XPS mogu imati isti kvar, ali različite dijelove i drugačiji postupak ugradnje. Zbog toga ne možemo davati fiksne cijene bez pregleda uređaja."
        ],
        "li": []
      },
      {
        "h": "Kako funkcionira kod nas?",
        "p": [
          "Preuzmemo laptop na dogovorenom mjestu u Sarajevu. Radimo besplatnu dijagnostiku i javljamo vam se s nalazom i cijenom. Ako se slažete, radimo popravku i vraćamo uređaj na dogovoreno mjesto.",
          "Nema skrivenih troškova. Šta dogovorimo, to je i konačna cijena.",
          "Pozovite nas za besplatnu procjenu ili zakažite preuzimanje uređaja."
        ],
        "li": []
      }
    ]
  },
  {
    "slug": "virus-na-racunaru",
    "title": "Virus na računaru: kako prepoznati i šta uraditi",
    "description": "Računar radi sporije nego obično, pojavljuju se čudne poruke ili reklame? Naučite kako prepoznati virus, šta ne smijete raditi i kada zvati stručnjaka.",
    "seoTitle": "Virus na računaru: kako prepoznati i šta uraditi | Neso Računari Sarajevo",
    "datum": "2026-04-05",
    "minuta": 4,
    "ikona": "virus",
    "usluga": "uklanjanje-virusa-sarajevo",
    "intro": [
      "Virusi i malware postaju sve sofisticiraniji. Mnogi korisnici ne znaju da je računar zaražen sve dok problem ne postane ozbiljan. Evo kako prepoznati zarazu i šta uraditi, a šta nikako ne smijete raditi."
    ],
    "sekcije": [
      {
        "h": "Kako prepoznati da imate virus?",
        "p": [],
        "li": [
          "Računar je izuzetno spor bez vidnog razloga",
          "Pojavljuju se pop-up prozori i reklame čak i kad je browser zatvoren",
          "Browser vas automatski preusmjerava na nepoznate sajtove",
          "Antivirusni program se sam isključio ili ne daje da ga uključite",
          "Fajlovi su postali nedostupni ili imaju čudne ekstenzije (ovo je ransomware)",
          "Pojavljuju se nepoznati programi koje niste instalirali",
          "Lozinke za email ili društvene mreže prestaju raditi"
        ]
      },
      {
        "h": "Šta uraditi ako sumnjate na virus?",
        "p": [
          "Prva stvar: isključite računar s interneta. Mnogi virusi šalju vaše podatke na udaljene servere, a isključivanjem s mreže to zaustavljate. Jednostavno isključite Wi-Fi ili izvucite kabel.",
          "Druga stvar: nemojte paničiti ni platiti nikakav otkup ako dobijete poruku da su vaši podaci zaključani. Plaćanje ne garantuje povrat podataka, a novac odlazi kriminalcima. Nema garancije da će vam poslati klјuč za dekripciju.",
          "Treća stvar: nemojte instalirati nasumično \"antivirusne programe\" koje pronađete online. Mnogi od njih su sami po sebi malware koji se prerušava u alat za zaštitu."
        ],
        "li": []
      },
      {
        "h": "Šta mi radimo?",
        "p": [
          "Analiziramo sistem specijaliziranim alatima koji nisu lako prevariti. Uklanjamo malware, provjeravamo da li su podaci oštećeni ili ukradeni, i savjetujemo kako se zaštititi u budućnosti.",
          "Ako je sistem previše kompromitovan i virus se ne može u potpunosti ukloniti, radimo reinstalaciju Windowsa uz backup podataka koji se mogu spasiti."
        ],
        "li": []
      },
      {
        "h": "Kako se zaštititi ubuduće?",
        "p": [
          "Koristite dobar antivirusni program i redovito ga ažurirajte. Ne otvarajte sumnjive emailove ni linkove. Redovito radite backup važnih podataka na eksterni disk ili cloud. Ažurirajte Windows jer sigurnosne zakrpe zatvaraju rupe koje virusi iskorištavaju."
        ],
        "li": []
      }
    ]
  },
  {
    "slug": "instalacija-windowsa-sarajevo",
    "title": "Instalacija Windowsa u Sarajevu: sve što trebate znati",
    "description": "Kada je potrebna reinstalacija Windowsa 10 ili 11, šta se gubi, koliko traje i kako funkcionira naš mobilni servis instalacije sistema u Sarajevu.",
    "seoTitle": "Instalacija Windowsa u Sarajevu: sve što trebate znati | Neso Računari Sarajevo",
    "datum": "2026-03-25",
    "minuta": 3,
    "ikona": "spor",
    "usluga": "instalacija-windowsa-sarajevo",
    "intro": [
      "Instalacija Windowsa je jedna od najčešćih usluga koje radimo. Razlozi su različiti: virus koji je uništio sistem, laptop koji s godinama radi sve sporije, novi ili rabljeni uređaj bez operativnog sistema, ili jednostavno želja za svježim startom."
    ],
    "sekcije": [
      {
        "h": "Kada je instalacija Windowsa potrebna?",
        "p": [],
        "li": [
          "Sistem radi jako sporo i ništa ne pomaže",
          "Računar je zaražen virusom koji se ne može ukloniti",
          "Kupili ste rabljeni ili novi uređaj bez instaliranog sistema",
          "Promijenili ste disk pa trebate novi sistem",
          "Želite potpuno čistu instalaciju bez starih programa i podataka"
        ]
      },
      {
        "h": "Windows 10 ili Windows 11?",
        "p": [
          "Za većinu korisnika preporučujemo Windows 11 ako ga hardver podržava. Radi stabilno, sigurnosne zakrpe dolaze redovito, i Microsoft ga aktivno odrzava. Windows 10 gubi zvaničnu podršku u oktobru 2025, što znači da više neće dobijati sigurnosne ispravke.",
          "Ako imate stariji hardver koji ne ispunjava zahtjeve za Windows 11, možemo instalirati Windows 10 ili razmotriti alternativu."
        ],
        "li": []
      },
      {
        "h": "Šta se gubi pri instalaciji?",
        "p": [
          "Sve. Instalacija Windowsa briše sve podatke s diska na koji se instalira. Zbog toga je najvažniji korak napraviti backup, to jest kopirati važne fajlove na eksterni disk ili cloud prostor.",
          "Mi to radimo za vas. Prije instalacije napravimo backup vaših dokumenata, fotografija i ostalih važnih fajlova, zatim instaliramo sistem i instaliramo osnovne programe koje koristite svakodnevno."
        ],
        "li": []
      },
      {
        "h": "Koliko traje instalacija?",
        "p": [
          "Prosječno jedan do dva sata, ovisno o brzini uređaja i broju programa koji se instaliraju."
        ],
        "li": []
      },
      {
        "h": "Da li treba licenca za Windows?",
        "p": [
          "Ako vaš laptop ima originalnu licencu vezanu za hardver, Windows će je automatski prepoznati. Za uređaje bez licence, postoje legalne opcije koje razmatramo zajedno s vama ovisno o vašim potrebama."
        ],
        "li": []
      }
    ]
  }
];
