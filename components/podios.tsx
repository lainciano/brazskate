import Image from "next/image";
import type { CategoriaId } from "@/data/resultados";
import type { FotoEvento } from "@/data/gallery";
import { categories } from "@/data/categories";

// Grade 2×2 de pódios em /resultados (docs/superpowers/specs/
// 2026-09-27-pos-evento-galeria-resultados-design.md §4.1). Pódio null
// (categoria sem foto liberada ainda) não renderiza o slot — nunca um
// quadro vazio esperando conteúdo. Rotação fixa alternada por índice
// (mesmo princípio de StickerBadge: nunca aleatória em runtime).

const NOME_CATEGORIA: Record<CategoriaId, string> = Object.fromEntries(
  categories.map((categoria) => [categoria.id, categoria.nome]),
) as Record<CategoriaId, string>;

const ROTACAO = ["-rotate-[1.2deg]", "rotate-1"] as const;

export function Podios({
  podios,
}: {
  podios: Record<CategoriaId, FotoEvento | null>;
}) {
  const entradas = (Object.entries(podios) as [CategoriaId, FotoEvento | null][]).filter(
    ([, foto]) => foto !== null,
  );

  if (entradas.length === 0) return null;

  return (
    <ul className="grid grid-cols-2 gap-4 sm:gap-6" data-reveal>
      {entradas.map(([categoriaId, foto], indice) => (
        <li key={categoriaId} data-carimbo>
          <figure
            className={`border border-(--borda) bg-(--surface) p-1.5 pb-4 shadow-card ${ROTACAO[indice % 2]}`}
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-card">
              <Image
                src={(foto as FotoEvento).src}
                alt={(foto as FotoEvento).alt}
                fill
                sizes="(min-width: 640px) 260px, 45vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 px-1">
              <p className="font-display text-[1.05rem] uppercase leading-none">
                {NOME_CATEGORIA[categoriaId]}
              </p>
              <p className="mt-1 text-[0.8125rem] text-(--fg-secundario)">
                Foto:{" "}
                {(foto as FotoEvento).creditoUrl ? (
                  <a
                    href={(foto as FotoEvento).creditoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-offset-2 hover:underline"
                  >
                    {(foto as FotoEvento).credito}
                  </a>
                ) : (
                  (foto as FotoEvento).credito
                )}
              </p>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
