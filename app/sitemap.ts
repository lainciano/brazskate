import type { MetadataRoute } from "next";
import { galeria } from "@/data/galeria";
import { resultados } from "@/data/resultados";

// Exigido por "output: export" (docs/03-SPEC-SITE.md §2) — sem isso o
// build falha: rota de metadata precisa declarar geração estática.
export const dynamic = "force-static";

const SITE_URL = "https://brazskate.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/inscricao`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/patrocinio`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/regulamento`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/programacao`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/termo`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    // /galeria e /resultados só entram depois de publicados (D5) — enquanto
    // a rota responde 404, ficam de fora.
    ...(galeria.publicada
      ? [
          {
            url: `${SITE_URL}/galeria`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.6,
          },
        ]
      : []),
    ...(resultados.publicado
      ? [
          {
            url: `${SITE_URL}/resultados`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.6,
          },
        ]
      : []),
  ];
}
