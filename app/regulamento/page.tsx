import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { Grao } from "@/components/grao";
import { Header } from "@/components/header";
import { Rasgo } from "@/components/rasgo";
import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/section-header";
import { regulamento } from "@/data/regulamento";

// Página /regulamento (item 2 da spec, docs/03-SPEC-SITE.md §3.2; roadmap em
// docs/04-ROADMAP-V1.md): renderiza SEMPRE de data/regulamento.ts — nunca
// hardcode. Conteúdo fechado em D26 (docs/02-DECISOES.md); premiação segue
// D9 na estrutura, sem valores específicos (P4 em aberto).

export const metadata: Metadata = {
  title: "Regulamento",
  description:
    "Regulamento do Braz Skate — categorias, cota de inscrição, formato das baterias, pontuação, premiação e política de chuva.",
};

export default function Regulamento() {
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
              Regulamento
            </h1>
            <p className="mt-6 max-w-[65ch] text-lg leading-[1.55] text-(--fg-secundario)">
              Categorias, inscrição, formato das baterias e o que vale pra
              decidir o pódio.
            </p>
          </div>
        </section>

        <div className="registro-concreto">
          <Rasgo cor="tinta" />

          <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
            <Reveal>
              <ol className="flex flex-col gap-8">
                {regulamento.secoes.map((secao, indice) => (
                  <li key={secao.id} data-reveal>
                    <SectionHeader
                      eyebrow={`${indice + 1}`}
                      titulo={secao.titulo}
                    />
                    <p className="mt-4 max-w-[65ch] leading-[1.6] text-(--fg-secundario)">
                      {secao.texto}
                    </p>
                  </li>
                ))}
              </ol>
            </Reveal>

            <p className="mt-12 text-sm text-(--fg-secundario)">
              Versão do texto: {regulamento.versaoTexto}.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
