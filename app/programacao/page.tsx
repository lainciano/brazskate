import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { Grao } from "@/components/grao";
import { Header } from "@/components/header";
import { Rasgo } from "@/components/rasgo";
import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/section-header";
import { StickerBadge } from "@/components/sticker-badge";
import { evento } from "@/data/evento";
import { programacao } from "@/data/programacao";

// Página /programacao (item 9 de docs/03-SPEC-SITE.md §3.2; D32,
// docs/02-DECISOES.md): renderiza SEMPRE de data/programacao.ts. Cronograma
// oficial do dia publicado em D58 — arte da organização (public/cronograma.jpg)
// em destaque; best trick e apuração seguem com StickerBadge "em breve" até a
// ASB definir horário.

export const metadata: Metadata = {
  title: "Programação",
  description:
    "Programação do dia do Braz Skate — credenciamento, baterias por categoria, apuração e premiação.",
};

export default function Programacao() {
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
              Programação
            </h1>
            <p className="mt-6 max-w-[65ch] text-lg leading-[1.55] text-(--fg-secundario)">
              Como o dia funciona, da abertura e check-in à premiação.
              Horários das baterias, da pausa e da premiação definidos no
              cronograma oficial — best trick e apuração ainda sem horário
              fixo.
            </p>
          </div>
        </section>

        <div className="registro-concreto">
          <Rasgo cor="tinta" />

          <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
            <Reveal>
              <div data-reveal>
                <SectionHeader
                  eyebrow="Cronograma"
                  titulo="Programação visual do dia"
                />
              </div>
              <figure data-reveal className="mt-8">
                <Image
                  src="/cronograma.jpg"
                  alt="Cronograma do Braz Skate: 9h abertura e check-in, 10h Feminino, 10h30 Iniciante, pausa para almoço, 13h30 Amador, 15h Master, 17h Premiação."
                  width={1080}
                  height={1350}
                  className="mx-auto w-full max-w-2xl rounded-card border-2 border-(--borda) object-contain"
                  priority
                />
                <figcaption className="sr-only">
                  Cronograma do dia 13 de setembro de 2026.
                </figcaption>
              </figure>
            </Reveal>
          </section>

          <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 md:pb-24">
            <Reveal>
              <div data-reveal>
                <SectionHeader
                  eyebrow="Detalhamento"
                  titulo="Como o dia funciona"
                />
              </div>
              <ol className="flex flex-col gap-8">
                {programacao.etapas.map((etapa, indice) => (
                  <li key={etapa.id} data-reveal>
                    <SectionHeader
                      eyebrow={`${indice + 1}`}
                      titulo={etapa.titulo}
                    />
                    <div className="mt-3">
                      {etapa.horario ? (
                        <StickerBadge variante="data" data-carimbo>
                          {etapa.horario}
                        </StickerBadge>
                      ) : (
                        <StickerBadge variante="breve" data-carimbo>
                          Horário em breve
                        </StickerBadge>
                      )}
                    </div>
                    <p className="mt-4 max-w-[65ch] leading-[1.6] text-(--fg-secundario)">
                      {etapa.texto}
                    </p>
                  </li>
                ))}
              </ol>

              <p data-reveal className="mt-12 max-w-[65ch] leading-[1.6] text-(--fg-secundario)">
                Regulamento completo (categorias, pontuação e política de
                chuva) em{" "}
                <a href="/regulamento" className="font-semibold underline-offset-4 hover:underline">
                  /regulamento
                </a>
                .
              </p>
            </Reveal>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
