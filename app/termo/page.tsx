import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { Grao } from "@/components/grao";
import { Header } from "@/components/header";
import { Rasgo } from "@/components/rasgo";
import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/section-header";
import { TermoPdfBotao } from "@/components/termo-pdf-botao";
import { termo } from "@/data/termo";

// Página /termo (roadmap V1.4, docs/04-ROADMAP-V1.md): renderiza SEMPRE de
// data/termo.ts — nunca hardcode. Texto validado juridicamente (I3/D19), com
// aviso de proveniência em docs/termo-responsabilidade.md. D20: nenhuma
// cláusula cita equipamento não-skate.

export const metadata: Metadata = {
  title: "Termo de responsabilidade",
  description:
    "Termo de responsabilidade e autorização do Braz Skate — leia antes de se inscrever ou baixe em PDF.",
};

export default function Termo() {
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
              Termo de responsabilidade
            </h1>
            <p className="mt-6 max-w-[65ch] text-lg leading-[1.55] text-(--fg-secundario)">
              Ciência dos riscos da prática, uso de equipamento de segurança e
              autorização de imagem — leia com atenção antes de se inscrever.
              Quem tem menos de 18 anos precisa da autorização do responsável
              legal.
            </p>
            <div className="mt-8">
              <TermoPdfBotao />
            </div>
          </div>
        </section>

        <div className="registro-concreto">
          <Rasgo cor="tinta" />

          {termo.blocos.map((bloco, indice) => (
            <section
              key={bloco.id}
              className={`mx-auto max-w-6xl px-4 sm:px-6 ${
                indice === termo.blocos.length - 1
                  ? "py-16 md:py-24"
                  : "py-16 md:pb-24"
              }`}
            >
              <Reveal>
                <div data-reveal>
                  <SectionHeader eyebrow={`Bloco ${indice + 1}`} titulo={bloco.titulo} />
                </div>
                <ol className="mt-10 flex flex-col gap-6">
                  {bloco.clausulas.map((clausula) => (
                    <li key={clausula.titulo} data-reveal>
                      <h3 className="text-[1.375rem] font-bold leading-[1.2]">
                        {clausula.titulo}
                      </h3>
                      <p className="mt-2 max-w-[65ch] leading-[1.6] text-(--fg-secundario)">
                        {clausula.texto}
                      </p>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </section>
          ))}

          <p className="mx-auto max-w-6xl px-4 pb-16 text-sm text-(--fg-secundario) sm:px-6 md:pb-24">
            Versão do texto: {termo.versaoTexto}.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
