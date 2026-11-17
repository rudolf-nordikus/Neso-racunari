import { site } from "./site";

type Json = Record<string, unknown>;

export function JsonLd({ data }: { data: Json | Json[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

const businessId = `${site.url}/#business`;

export function localBusinessSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "ComputerRepair",
    "@id": businessId,
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: site.phone.replace(/\s/g, ""),
    email: site.email,
    image: `${site.url}/img/og-default.png`,
    logo: `${site.url}/brand/webclip.png`,
    priceRange: "KM",
    currenciesAccepted: "BAM",
    paymentAccepted: "Gotovina, Račun",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.street,
      postalCode: site.postalCode,
      addressLocality: site.city,
      addressRegion: site.region,
      addressCountry: site.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    areaServed: { "@type": "City", name: site.city },
    openingHoursSpecification: site.openingHours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days.map((d) => `https://schema.org/${dayName[d]}`),
      opens: h.opens,
      closes: h.closes,
    })),
    founder: [
      { "@type": "Person", name: "Nebojša Zonjić" },
      { "@type": "Person", name: "Dejan Zonjić" },
    ],
    sameAs: Object.values(site.social).filter(Boolean),
  };
}

const dayName: Record<string, string> = {
  Mo: "Monday",
  Tu: "Tuesday",
  We: "Wednesday",
  Th: "Thursday",
  Fr: "Friday",
  Sa: "Saturday",
  Su: "Sunday",
};

export function websiteSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: site.url,
    inLanguage: site.lang,
    publisher: { "@id": businessId },
  };
}

export function serviceSchema(s: { name: string; description: string; path: string }): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    description: s.description,
    url: `${site.url}${s.path}`,
    provider: { "@id": businessId },
    areaServed: { "@type": "City", name: site.city },
  };
}

export function faqSchema(items: { q: string; a: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${site.url}${it.path}`,
    })),
  };
}

export function articleSchema(a: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: a.title,
    description: a.description,
    url: `${site.url}${a.path}`,
    datePublished: a.datePublished,
    dateModified: a.dateModified ?? a.datePublished,
    inLanguage: site.lang,
    author: { "@type": "Person", name: "Dejan Zonjić" },
    publisher: { "@id": businessId },
  };
}
