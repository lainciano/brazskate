// Resultados publicados de forma estática pós-evento (D5, spec
// 2026-09-27). publicado=false ⇒ /resultados responde 404 e não aparece
// na nav nem no sitemap. Só uma foto de pódio por categoria — SEM nome,
// colocação ou placar (decisão da etapa pós-evento, revisa o schema
// anterior de nome+posição da branch feat/pagina-resultados). Se um dia
// houver colocações publicadas, o lugar é um `colocacoes?` opcional ao
// lado de cada foto — decisão e dados do Lain, fora desta etapa.
//
// Fonte única das categorias: os ids saem de data/categories.ts — as
// chaves de `podios` são tipadas por `CategoriaId`, então
// acrescentar/remover categoria lá vira erro de compilação aqui até este
// arquivo acompanhar.
import { categories } from "@/data/categories";
import type { FotoEvento } from "@/data/gallery";

export type CategoriaId = (typeof categories)[number]["id"];

export const resultados = {
  publicado: false,
  data: null as string | null, // ex.: "13 de setembro de 2026"
  podios: {
    iniciante: null,
    amador: null,
    feminino: null,
    master: null,
  } as Record<CategoriaId, FotoEvento | null>,
} as const;
