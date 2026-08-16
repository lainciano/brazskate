import { categories, type Category } from "@/data/categories";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";

// Seção de categorias (roadmap PR 3, docs/05-DESIGN.md §3.4): cards lidos
// SEMPRE de data/categories.ts — nunca hardcode. Itens cogitados de
// premiação não aparecem (P4). Faixas etárias e regulamento completo
// resolvidos em D26/D41/D43/D45 — card linka pra /regulamento em vez do
// sticker "em breve" que ficou obsoleto (P6 fechada desde 30/07/2026).

const descricaoPremiacao: Record<Category["premiacao"], string> = {
  "camiseta-todos-top3":
    "Camiseta oficial para todos que competem + dinheiro e itens de skate para o top 3.",
};

export function Categorias() {
  return (
    <section id="categorias" className="registro-concreto scroll-mt-16">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <Reveal>
          <div data-reveal>
            <SectionHeader
              eyebrow="Categorias"
              titulo="Tem lugar pra você"
              lead="Quatro categorias, inscrição gratuita e camiseta pra quem compete — sem burocracia."
            />
          </div>

          <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
                <a
                  href="/regulamento"
                  className="mt-auto w-fit pt-2 font-semibold underline-offset-4 hover:underline"
                >
                  Ver regulamento →
                </a>
              </li>
            ))}
          </ul>

          <p
            data-reveal
            className="mt-8 max-w-[65ch] text-sm leading-[1.4] text-(--fg-secundario)"
          >
            Faixas etárias, formato das baterias e premiação completos estão
            no regulamento. Menores de idade podem competir em qualquer
            categoria, com autorização do responsável legal.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
