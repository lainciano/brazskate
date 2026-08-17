// Fonte única da grade de patrocinadores comerciais (item 6 de
// docs/03-SPEC-SITE.md §3.2) — schema pronto desde D30. Primeiro
// patrocinador fechado em 16/08/2026 (D50, docs/02-DECISOES.md); primeiro
// apoiador em seguida (D51) — P4 segue aberta, mais ainda virão. Renderizada
// por components/patrocinadores.tsx em /patrocinio.
// `logoSrc` opcional só como salvaguarda (ex.: apoiador sem arte pronta
// ainda) — desde D51 os dois níveis recebem "nome e logo no site"
// (`data/contrapartidas.ts`), não é mais exclusividade do patrocínio.
// Ver também docs/leads-patrocinio-2021.md (não linkado no site) para
// contatos de captação — precedente de 2021, não patrocinador confirmado.

export type Patrocinador = {
  nome: string;
  logoSrc?: string;
  url: string;
  nivel: "patrocinio" | "apoio";
};

export const patrocinadores: readonly Patrocinador[] = [
  {
    nome: "Censure Theory",
    logoSrc: "/logo-censure.webp",
    url: "https://www.instagram.com/censuretheory/",
    nivel: "patrocinio",
  },
  {
    nome: "Casa do Hip Hop Brazlândia",
    logoSrc: "/logo-casa-do-hip-hop.webp",
    url: "https://www.instagram.com/casadohiphopbrazlandia/",
    nivel: "apoio",
  },
  {
    nome: "Overstreet Skateboards",
    logoSrc: "/logo-overstreet.webp",
    url: "https://www.instagram.com/overstreetskate/",
    nivel: "patrocinio",
  },
];
