import { FaixaPolaroid } from "./faixa-polaroid";
import type { FotoEvento } from "@/data/gallery";

// Destaques da edição 2026 na seção Sobre da home (D63, substitui a faixa
// de 2021 que ficava ali). Recebe as fotos já escolhidas por quem chama;
// array vazio não renderiza nada (anti-casca-vazia).
export function Destaques2026({ fotos }: { fotos: readonly FotoEvento[] }) {
  if (fotos.length === 0) return null;

  return (
    <div role="group" aria-label="Fotos do campeonato de 2026">
      <FaixaPolaroid
        fotos={fotos}
        aspecto="aspect-[4/5]"
        posicaoDaImagem="object-[50%_35%]"
      />
    </div>
  );
}
