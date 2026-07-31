import Image from "next/image";
import type { FotoGaleria } from "@/data/gallery";

// Colagem (docs/05-DESIGN.md §4.3): molduras claras estilo foto impressa
// para a galeria (2021 e pista atual). Rotação FIXA por índice — nunca
// Math.random(), mesmo princípio do StickerBadge (§3.6), pra não variar
// entre builds. Array vazio não renderiza nada (regra anti-casca-vazia,
// mesma do roadmap).

const ROTACOES = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2"];

export function Colagem({ fotos }: { fotos: readonly FotoGaleria[] }) {
  if (fotos.length === 0) return null;

  return (
    <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
      {fotos.map((foto, indice) => (
        <li
          key={foto.src}
          data-reveal
          className={`rounded-card border-2 border-tinta bg-creme p-2 pb-3 shadow-card transition-transform duration-150 hover:scale-[1.03] hover:shadow-card-hover motion-reduce:transition-none ${ROTACOES[indice % ROTACOES.length]}`}
        >
          <div className="relative aspect-square overflow-hidden rounded-[2px]">
            <Image
              src={foto.src}
              alt={foto.alt}
              fill
              loading="lazy"
              sizes="(min-width: 768px) 25vw, (min-width: 640px) 33vw, 50vw"
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
  );
}
