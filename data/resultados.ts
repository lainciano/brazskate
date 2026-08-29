// Resultados publicados de forma estática pós-evento (D5, spec 2026-08-29).
// publicado=false ⇒ /resultados responde 404 e não aparece na nav nem no
// sitemap. No dia seguinte ao evento: preencher podios/bestTrick/data,
// publicado=true, 1 commit.
//
// Fonte única das categorias: os ids saem de data/categories.ts — as chaves
// de `podios` são tipadas por `CategoriaId`, então acrescentar/remover
// categoria lá vira erro de compilação aqui até este arquivo acompanhar.
import { categories } from "@/data/categories";

export type CategoriaId = (typeof categories)[number]["id"];

export type Colocacao = { posicao: 1 | 2 | 3; nome: string };

export const resultados = {
  publicado: false,
  data: null as string | null, // ex.: "13 de setembro de 2026"
  podios: {
    iniciante: [],
    amador: [],
    feminino: [],
    master: [],
  } as Record<CategoriaId, readonly Colocacao[]>,
  bestTrick: null as { nome: string; descricao?: string } | null,
} as const;
