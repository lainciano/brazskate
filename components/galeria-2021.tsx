import type { CategoriaCamp2021, FotoGaleria } from "@/data/gallery";
import { FaixaPolaroid } from "./faixa-polaroid";

// GaleriaCamp2021 (D33, docs/02-DECISOES.md; docs/05-DESIGN.md §4.3): mesma
// moldura visual do Colagem (foto impressa, rotação fixa por índice — nunca
// Math.random(), StickerBadge §3.6), mas em faixa horizontal com scroll-snap
// em vez de grid: as 3 categorias de 2021 (Mirim, Iniciante, Amador) têm só
// 3 fotos cada, então "passar com slide" fica melhor que um grid apertado,
// e dispensa lib de carrossel (scroll-snap nativo, custo zero de JS — a
// faixa em si mora em faixa-polaroid.tsx, compartilhada com os destaques
// de 2026). Desde D63 esta galeria vive em /galeria (seção "Edição 2021"),
// não mais na home.
// Array de uma categoria vazio não renderiza aquela faixa (regra
// anti-casca-vazia, mesma do Colagem).

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
      <FaixaPolaroid fotos={fotos} />
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
