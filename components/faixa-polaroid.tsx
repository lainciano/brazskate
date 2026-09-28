import Image from "next/image";
import type { FotoGaleria } from "@/data/gallery";

// Faixa horizontal de "fotos impressas" com scroll-snap nativo (custo zero
// de JS), compartilhada pelo arquivo de 2021 (galeria-2021.tsx) e pelos
// destaques de 2026 na home (destaques-2026.tsx). Rotação fixa por índice —
// nunca Math.random() (StickerBadge §3.6, docs/05-DESIGN.md §4.3).
// `aspecto` é a classe de proporção do quadro: 2021 são recortes quadrados;
// as fotos de 2026 são em maioria retrato (4/5).

const ROTACOES = ["-rotate-2", "rotate-1", "-rotate-1"];

export function FaixaPolaroid({
  fotos,
  aspecto = "aspect-square",
  posicaoDaImagem = "object-center",
}: {
  fotos: readonly FotoGaleria[];
  aspecto?: string;
  posicaoDaImagem?: string;
}) {
  return (
    <ul className="-mx-4 mt-3 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
      {fotos.map((foto, indice) => (
        <li
          key={foto.src}
          className={`w-[72%] shrink-0 snap-center rounded-card border-2 border-tinta bg-creme p-2 pb-3 shadow-card sm:w-[45%] md:w-[30%] ${ROTACOES[indice % ROTACOES.length]}`}
        >
          <div className={`relative ${aspecto} overflow-hidden rounded-[2px]`}>
            <Image
              src={foto.src}
              alt={foto.alt}
              fill
              loading="lazy"
              sizes="(min-width: 768px) 30vw, (min-width: 640px) 45vw, 72vw"
              className={`object-cover ${posicaoDaImagem}`}
            />
          </div>
          <p className="mt-2 text-center text-[0.6875rem] leading-[1.3] text-tinta">
            {foto.legenda && <span className="block font-semibold">{foto.legenda}</span>}
            <span className="text-tinta/60">Foto: {foto.credito}</span>
          </p>
        </li>
      ))}
    </ul>
  );
}
