import Image from "next/image";
import type { CategoriaCamp2021, FotoGaleria } from "@/data/gallery";

// GaleriaCamp2021 (D33, docs/02-DECISOES.md; docs/05-DESIGN.md §4.3): mesma
// moldura visual do Colagem (foto impressa, rotação fixa por índice — nunca
// Math.random(), StickerBadge §3.6), mas em faixa horizontal com scroll-snap
// em vez de grid: as 3 categorias de 2021 (Mirim, Iniciante, Amador) têm só
// 3 fotos cada, então "passar com slide" fica melhor que um grid apertado,
// e dispensa lib de carrossel (scroll-snap nativo, custo zero de JS).
// Array de uma categoria vazio não renderiza aquela faixa (regra
// anti-casca-vazia, mesma do Colagem).

const ROTACOES = ["-rotate-2", "rotate-1", "-rotate-1"];

const RATULOS: Record<CategoriaCamp2021, string> = {
  mirim: "Mirim",
  iniciante: "Iniciante",
  amador: "Amador",
};

function Faixa({ categoria, fotos }: { categoria: CategoriaCamp2021; fotos: readonly FotoGaleria[] }) {
  if (fotos.length === 0) return null;

  return (
    <div role="group" aria-label={`Fotos da categoria ${RATULOS[categoria]}, campeonato 2021`}>
      <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.1em] text-(--acento)">
        {RATULOS[categoria]} · 2021
      </p>
      <ul className="-mx-4 mt-3 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
        {fotos.map((foto, indice) => (
          <li
            key={foto.src}
            className={`w-[72%] shrink-0 snap-center rounded-card border-2 border-tinta bg-creme p-2 pb-3 shadow-card sm:w-[45%] md:w-[30%] ${ROTACOES[indice % ROTACOES.length]}`}
          >
            <div className="relative aspect-square overflow-hidden rounded-[2px]">
              <Image
                src={foto.src}
                alt={foto.alt}
                fill
                loading="lazy"
                sizes="(min-width: 768px) 30vw, (min-width: 640px) 45vw, 72vw"
                className="object-cover"
              />
            </div>
            <p className="mt-2 text-center text-[0.6875rem] leading-[1.3] text-tinta">
              {foto.legenda && <span className="block font-semibold">{foto.legenda}</span>}
              <span className="text-tinta/60">Foto: {foto.credito}</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function GaleriaCamp2021({
  porCategoria,
}: {
  porCategoria: Record<CategoriaCamp2021, readonly FotoGaleria[]>;
}) {
  const categorias: readonly CategoriaCamp2021[] = ["mirim", "iniciante", "amador"];
  const temFoto = categorias.some((categoria) => porCategoria[categoria].length > 0);
  if (!temFoto) return null;

  return (
    <div className="flex flex-col gap-8">
      {categorias.map((categoria) => (
        <Faixa key={categoria} categoria={categoria} fotos={porCategoria[categoria]} />
      ))}
    </div>
  );
}
