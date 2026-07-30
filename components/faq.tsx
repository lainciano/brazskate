import { faq } from "@/data/faq";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";
import { StickerBadge } from "./sticker-badge";

// Seção de FAQ (roadmap V1.3, docs/04-ROADMAP-V1.md): perguntas lidas
// SEMPRE de data/faq.ts — nunca hardcode. `<details>` nativo é o padrão de
// disclosure escolhido (docs/05-DESIGN.md §3.6-bis): zero JS extra, teclado
// e leitor de tela funcionam de fábrica. Abrir/fechar não anima o conteúdo —
// só o chevron morfa "+"/"−" via MorphSVG (Reveal ouve o evento `toggle`
// nativo, docs/superpowers/specs/2026-07-26-gsap-avancado-parte2-design.md
// §3), respeitando o guardrail de motion (§6.2) e o orçamento de JS (§6.4).
// Sob prefers-reduced-motion o chevron fica parado em "+" (cosmético, não
// afeta a leitura do estado: o texto da resposta aparecer/sumir e o
// anúncio nativo de aberto/fechado do leitor de tela continuam intactos).
// Perguntas com `resposta: null` dependem do regulamento (P6) e mostram o
// sticker "em breve" em vez de texto — nunca resposta inventada.

function IconeChevron() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      data-morph-chevron
      className="size-4 shrink-0"
    >
      <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function Faq() {
  return (
    <section id="faq" className="registro-concreto">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <Reveal>
          <div data-reveal>
            <SectionHeader
              eyebrow="Dúvidas"
              titulo="Perguntas frequentes"
              lead="O que já sabemos hoje. Regulamento completo na página dedicada."
            />
          </div>

          <ul className="mt-10 flex flex-col gap-4">
            {faq.map((item) => (
              <li key={item.id} data-reveal>
                <details className="group rounded-card bg-(--surface) shadow-card open:shadow-card-hover">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 font-bold leading-[1.3] [&::-webkit-details-marker]:hidden">
                    {item.pergunta}
                    <IconeChevron />
                  </summary>
                  <div className="px-6 pb-5">
                    {item.resposta !== null ? (
                      <p className="leading-[1.6] text-(--fg-secundario)">
                        {item.resposta}
                      </p>
                    ) : (
                      <StickerBadge variante="breve" data-carimbo data-scramble>
                        Em breve
                      </StickerBadge>
                    )}
                  </div>
                </details>
              </li>
            ))}
          </ul>

          <p className="mt-8" data-reveal>
            <a
              href="/regulamento"
              className="font-semibold underline-offset-4 hover:underline"
            >
              Ver o regulamento completo →
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
