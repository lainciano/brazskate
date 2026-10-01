import type { MetadataRoute } from "next";
import { evento } from "@/data/evento";

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
      url: `${SITE_URL}/patrocinio`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // /inscricao, /programacao, /regulamento e /termo só existem com a
    // edição ativa (D62, D64) — enquanto a rota responde 404, ficam de fora.
    ...(evento.edicaoAtiva
      ? [
          {
            url: `${SITE_URL}/regulamento`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.7,
          },
          {
            url: `${SITE_URL}/termo`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.6,
          },
          {
            url: `${SITE_URL}/inscricao`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.9,
          },
          {
            url: `${SITE_URL}/programacao`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.7,
          },
        ]
      : []),
  ];
}
