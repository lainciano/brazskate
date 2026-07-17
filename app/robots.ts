import type { MetadataRoute } from "next";

// Exigido por "output: export" (docs/03-SPEC-SITE.md §2) — sem isso o
// build falha: rota de metadata precisa declarar geração estática.
export const dynamic = "force-static";

const SITE_URL = "https://braz-skate.vercel.app";

// /styleguide já é noindex via metadata própria (app/styleguide/page.tsx);
// aqui reforçamos o disallow para crawlers que ignorem a meta tag.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/styleguide",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
