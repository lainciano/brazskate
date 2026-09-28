import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Botao } from "@/components/botao";
import { Footer } from "@/components/footer";
import { Grao } from "@/components/grao";
import { Header } from "@/components/header";
import { Rasgo } from "@/components/rasgo";
import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/section-header";
import { evento } from "@/data/evento";

// Página /inscricao (V1.8, docs/04-ROADMAP-V1.md): só nasce com a URL real
// do formulário (D2/D21) — travada até então (regra de placeholder,
// AGENT.md). Formulário publicado em 30/07/2026: https://tally.so/r/J9bY7z.
// Inscrição virou só-online com prazo (D42, 07/08/2026, docs/02-DECISOES.md)
// — a cota de inscrição presencial no dia foi descontinuada.
// `evento.inscricoesAbertas` (D46, 07/08/2026): trava manual do Lain —
// enquanto false, o CTA fica desabilitado e o formulário não é linkado.

const URL_FORMULARIO = "https://tally.so/r/J9bY7z";

export const metadata: Metadata = {
  title: "Inscrição",
  description:
    "Inscreva-se no Braz Skate — pré-inscrição online gratuita, até 30 de agosto de 2026.",
};

export default function Inscricao() {
  // edição encerrada (D62): 404 até `evento.edicaoAtiva` voltar a true
  if (!evento.edicaoAtiva) notFound();

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
              {evento.inscricoesAbertas ? (
                <>
                  Inscrição 100% online, gratuita, em menos de 3 minutos. Sua
                  vaga fica garantida assim que você enviar — prazo final{" "}
                  {evento.dataFechamentoInscricoesCurta}.
                </>
              ) : (
                <>
                  As inscrições estão temporariamente fechadas. O formulário
                  volta a ficar disponível em breve — acompanhe os avisos
                  abaixo.
                </>
              )}
            </p>
            <div className="mt-8">
              {evento.inscricoesAbertas ? (
                <Botao href={URL_FORMULARIO} rel="noopener">
                  Fazer pré-inscrição
                </Botao>
              ) : (
                <Botao disabled>Inscrições fechadas</Botao>
              )}
            </div>
          </div>
        </section>

        {evento.inscricoesAbertas && (
          <div className="registro-concreto">
            <Rasgo cor="tinta" />

            <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
              <Reveal>
                <div data-reveal>
                  <SectionHeader
                    eyebrow="Como funciona"
                    titulo="Inscrição só online"
                    lead={`Preencha o formulário até ${evento.dataFechamentoInscricoesCurta}. Não há inscrição presencial no dia do evento — quem não se inscrever online até o prazo não compete.`}
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
        )}
      </main>
      <Footer />
    </>
  );
}
