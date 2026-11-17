import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { site } from "@/lib/site";
import { JsonLd, localBusinessSchema, websiteSchema } from "@/lib/schema";
import { Nav } from "@/components/nav";
import { StickyCall } from "@/components/sticky-call";
import { Footer } from "@/components/blocks";
import { Reveal } from "@/components/reveal";
import "./globals.css";

// Geist: Medium (500) za naslove, Light (300) za akcent riječ, Regular (400) za tekst.
const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Servis laptopa, računara i printera Sarajevo | Nešo Računari",
    template: "%s | Nešo Računari",
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    images: [{ url: "/img/og-default.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/brand/favicon.png", apple: "/brand/webclip.png" },
};

export const viewport: Viewport = {
  themeColor: "#000C1C",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang={site.lang} className={geist.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <JsonLd data={[localBusinessSchema(), websiteSchema()]} />
        <a href="#sadrzaj" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:rounded-full focus:bg-amber-500 focus:px-4 focus:py-2 focus:text-navy-900">
          Preskoči na sadržaj
        </a>
        <Nav />
        <main id="sadrzaj" className="mx-auto flex w-full max-w-[1464px] flex-col gap-2 p-2 md:gap-3 md:p-3">
          {children}
        </main>
        <Footer />
        <StickyCall />
        <Reveal />
        <Analytics />
        {/* Google Ads konverzije (postojeći tag sa starog sajta) */}
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${site.googleAdsId}`} strategy="afterInteractive" />
        <Script id="gtag" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${site.googleAdsId}');`}
        </Script>
      </body>
    </html>
  );
}
