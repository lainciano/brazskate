import { categories, type Category } from "@/data/categories";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";
import { StickerBadge } from "./sticker-badge";

// Seção de categorias (roadmap PR 3, docs/05-DESIGN.md §3.4): cards lidos
// SEMPRE de data/categories.ts — nunca hardcode. Itens cogitados de
// premiação não aparecem (P4); faixas etárias pendentes viram sticker (P6).

const descricaoPremiacao: Record<Category["premiacao"], string> = {
  "medalha-todos-top3":
    "Medalha para todos que competem + premiação adicional para o top 3.",
  "medalha-e-premiacao-todas":
    "Medalha e premiação para todas as participantes.",
};

export function Categorias() {
  return (
    <section id="categorias" className="registro-concreto">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <Reveal>
          <div data-reveal>
            <SectionHeader
              eyebrow="Categorias"
              titulo="Tem lugar pra você"
              lead="Três categorias, inscrição gratuita e medalha pra quem compete — sem burocracia."
            />
          </div>

          <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {categories.map((categoria) => (
              <li
                key={categoria.id}
                data-reveal
                className="flex flex-col gap-3 rounded-card bg-(--surface) p-6 shadow-card"
              >
                <h3 className="text-[1.375rem] font-bold leading-[1.2]">
                  {categoria.nome}
                </h3>
                <p className="leading-[1.6] text-(--fg-secundario)">
                  {descricaoPremiacao[categoria.premiacao]}
                </p>
                <div className="mt-auto w-fit pt-2">
                  <StickerBadge variante="breve" data-carimbo>
                    Detalhes em breve
                  </StickerBadge>
                </div>
              </li>
            ))}
          </ul>

          <p
            data-reveal
            className="mt-8 max-w-[65ch] text-sm leading-[1.4] text-(--fg-secundario)"
          >
            Faixas etárias e regulamento completo saem em breve. Menores de
            idade podem competir em qualquer categoria, com autorização do
            responsável legal.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
