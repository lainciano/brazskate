import type { Metadata } from "next";
import { Botao } from "@/components/botao";
import { Footer } from "@/components/footer";
import { Grao } from "@/components/grao";
import { Header } from "@/components/header";
import { Rasgo } from "@/components/rasgo";
import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/section-header";

// Página /inscricao (V1.8, docs/04-ROADMAP-V1.md): só nasce com a URL real
// do formulário (D2/D21) — travada até então (regra de placeholder,
// AGENT.md). Formulário publicado em 30/07/2026: https://tally.so/r/J9bY7z.

const URL_FORMULARIO = "https://tally.so/r/J9bY7z";

export const metadata: Metadata = {
  title: "Inscrição",
  description:
    "Inscreva-se no Braz Skate — pré-inscrição online gratuita, com cota de inscrição presencial no dia do evento.",
};

export default function Inscricao() {
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
              Inscrição
            </h1>
            <p className="mt-6 max-w-[60ch] text-lg leading-[1.55] text-(--fg-secundario)">
              Pré-inscrição online gratuita, em menos de 3 minutos. Sua vaga
              fica garantida assim que você enviar.
            </p>
            <div className="mt-8">
              <Botao href={URL_FORMULARIO} rel="noopener">
                Fazer pré-inscrição
              </Botao>
            </div>
          </div>
        </section>

        <div className="registro-concreto">
          <Rasgo cor="tinta" />

          <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
            <Reveal>
              <div data-reveal>
                <SectionHeader
                  eyebrow="Como funciona"
                  titulo="Modelo híbrido: online + presencial"
                  lead="São até 60 vagas no total. Você pode garantir a sua antes, pela pré-inscrição, ou se inscrever no dia — enquanto durar a cota presencial."
                />
              </div>
              <div className="mt-10 grid max-w-[65ch] gap-6 leading-[1.6] md:max-w-none md:grid-cols-2 md:gap-x-12">
                <p data-reveal>
                  Menores de 18 anos podem se inscrever sozinhos online — a
                  pré-inscrição não substitui a autorização: o responsável
                  legal assina o termo em papel no credenciamento, no dia do
                  evento.
                </p>
                <p data-reveal>
                  Antes de se inscrever, leia o{" "}
                  <a
                    href="/termo"
                    className="font-semibold underline-offset-4 hover:underline"
                  >
                    termo de responsabilidade
                  </a>{" "}
                  — o checkbox de aceite no formulário confirma que você
                  leu e está ciente das condições.
                </p>
                <p data-reveal>
                  Depois de inscrito, confira a{" "}
                  <a
                    href="/programacao"
                    className="font-semibold underline-offset-4 hover:underline"
                  >
                    programação do dia
                  </a>{" "}
                  — credenciamento, baterias, apuração e premiação.
                </p>
              </div>
            </Reveal>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
