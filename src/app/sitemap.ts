import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { usluge } from "@/content/usluge";
import { blog } from "@/content/blog";

// URL-ovi su 1:1 kao na starom sajtu (bez kose crte na kraju), da Google ne izgubi rangiranje.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const e = (path: string, priority: number, lastModified: Date = now) => ({
    url: `${site.url}${path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority,
  });
  return [
    e("", 1),
    e("/usluge", 0.9),
    ...usluge.map((u) => e(`/${u.slug}`, 0.9)),
    e("/kontakt", 0.7),
    e("/blog", 0.6),
    ...blog.map((p) => e(`/blog/${p.slug}`, 0.5, new Date(p.azurirano ?? p.datum))),
  ];
}
