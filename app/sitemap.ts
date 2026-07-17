import type { MetadataRoute } from "next";

// Exigido por "output: export" (docs/03-SPEC-SITE.md §2) — sem isso o
// build falha: rota de metadata precisa declarar geração estática.
export const dynamic = "force-static";

const SITE_URL = "https://braz-skate.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/patrocinio`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
