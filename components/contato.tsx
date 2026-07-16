import { Botao } from "./botao";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";

// Contato (roadmap PR 4): canais reais — Instagram + WhatsApp. Sem e-mail
// (não existe — não inventar, ver 05-DESIGN.md §7).
export function Contato() {
  return (
    <section id="contato" className="relative mx-auto max-w-6xl px-4 pb-16 sm:px-6 md:pb-24">
      <Reveal>
        <div data-reveal>
          <SectionHeader
            eyebrow="Contato"
            titulo="Chama a organização"
            corRabisco="rosa"
            lead="Dúvida sobre o campeonato, proposta de apoio ou vontade de ajudar? É só chamar."
          />
        </div>
        <div data-reveal className="mt-8 flex flex-wrap items-center gap-4">
          <Botao href="https://wa.me/5561995099761" rel="noopener">
            Chamar no WhatsApp
          </Botao>
          <Botao
            href="https://www.instagram.com/brazskate"
            rel="noopener"
            variante="secundario"
          >
            @brazskate no Instagram
          </Botao>
        </div>
      </Reveal>
    </section>
  );
}
