import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { Grao } from "@/components/grao";
import { Header } from "@/components/header";
import { Rasgo } from "@/components/rasgo";
import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/section-header";
import { StickerBadge } from "@/components/sticker-badge";
import { categories } from "@/data/categories";
import { resultados } from "@/data/resultados";

// Página /resultados (D5, spec 2026-08-29): resultados estáticos pós-evento.
// Enquanto `resultados.publicado` for false a rota responde 404 (notFound
// antes de qualquer render) e não existe na nav nem no sitemap — nada de
// casca "em breve". No dia seguinte ao evento preenche-se data/resultados.ts
// e marca publicado=true num único commit. O corpo abaixo só é alcançado
// nesse estado publicado. Tom celebratório/institucional.

export const metadata: Metadata = {
  title: "Resultados",
  description: "Resultados do Braz Skate 2026 por categoria.",
};

const NOME_CATEGORIA: Record<string, string> = Object.fromEntries(
  categories.map((categoria) => [categoria.id, categoria.nome]),
);

const VARIANTE_POSICAO = {
  1: "data",
  2: "info",
  3: "info",
} as const;

export default function Resultados() {
  if (!resultados.publicado) notFound();

  const podios = Object.entries(resultados.podios).filter(
    ([, colocacoes]) => colocacoes.length > 0,
  );

  return (
    <>
      <Header />
      <main id="conteudo" className="flex-1">
        <section className="registro-asfalto relative overflow-hidden">
          <Grao />
          <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
            <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.1em] text-rosa">
              Braz Skate · Brazlândia-DF
            </p>
            <h1 className="mt-3 font-display text-[clamp(2.5rem,8vw,5rem)] uppercase leading-[0.95]">
              Resultados
            </h1>
            <p className="mt-6 max-w-[65ch] text-lg leading-[1.55] text-(--fg-secundario)">
              O pódio de cada categoria do Braz Skate 2026
              {resultados.data ? `, disputado em ${resultados.data}` : ""}.
              Parabéns a todo mundo que andou.
            </p>
          </div>
        </section>

        <div className="registro-concreto">
          <Rasgo cor="tinta" />

          <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
            <Reveal>
              <ol className="flex flex-col gap-12">
                {podios.map(([categoria, colocacoes], indice) => (
                  <li key={categoria} data-reveal>
                    <SectionHeader
                      eyebrow={`${indice + 1}`}
                      titulo={NOME_CATEGORIA[categoria] ?? categoria}
                    />
                    <ol className="mt-6 flex flex-col gap-3">
                      {[...colocacoes]
                        .sort((a, b) => a.posicao - b.posicao)
                        .map((colocacao) => (
                          <li
                            key={`${colocacao.posicao}-${colocacao.nome}`}
                            className="flex items-center gap-4"
                          >
                            <StickerBadge
                              variante={VARIANTE_POSICAO[colocacao.posicao]}
                            >
                              {colocacao.posicao}º
                            </StickerBadge>
                            <span className="text-lg font-semibold leading-[1.3]">
                              {colocacao.nome}
                            </span>
                          </li>
                        ))}
                    </ol>
                  </li>
                ))}
              </ol>

              {resultados.bestTrick && (
                <div data-reveal className="mt-12 border-t-2 border-tinta pt-12">
                  <SectionHeader eyebrow="Destaque" titulo="Best trick" />
                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    <StickerBadge variante="data">
                      {resultados.bestTrick.nome}
                    </StickerBadge>
                    {resultados.bestTrick.descricao && (
                      <span className="max-w-[55ch] leading-[1.5] text-(--fg-secundario)">
                        {resultados.bestTrick.descricao}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </Reveal>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
