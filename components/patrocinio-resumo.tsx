import { Botao } from "./botao";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";

// Resumo de patrocínio na home (roadmap PR 4): texto curto + CTA para a
// página /patrocinio. Sem grade de logos (v1) e SEM menção ao UIEMAPV até a
// confirmação do instituto (pendência I7 em docs/02-DECISOES.md).
export function PatrocinioResumo() {
  return (
    <section id="patrocinio" className="registro-concreto border-t-2 border-(--borda)">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <Reveal>
          <div data-reveal>
            <SectionHeader
              eyebrow="Patrocínio"
              titulo="Coloque sua marca na pista"
              lead="O Braz Skate quer atrair competidores e público de todo o DF e entorno — e marcas que apoiam chegam junto com a cena, com visibilidade no evento, no site e nas redes."
            />
          </div>
          <div data-reveal className="mt-8 flex flex-wrap items-center gap-4">
            <Botao href="/patrocinio" variante="secundario">
              Conheça as formas de apoio
            </Botao>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
