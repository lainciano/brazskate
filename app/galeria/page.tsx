import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { GaleriaGrade } from "@/components/galeria-grade";
import { Header } from "@/components/header";
import { FaixaScroll } from "@/components/faixa-scroll";
import { GaleriaCamp2021 } from "@/components/galeria-2021";
import { LoopDrone } from "@/components/loop-drone";
import { Agradecimentos } from "@/components/agradecimentos";
import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/section-header";
import { galeria } from "@/data/galeria";
import { galeriaCamp2021, galeriaPosEvento } from "@/data/gallery";

// Página /galeria (docs/superpowers/specs/
// 2026-09-27-pos-evento-galeria-resultados-design.md). Enquanto
// `galeria.publicada` for false a rota responde 404 (notFound antes de
// qualquer render) — publicar é a flag, nunca o tamanho do array de
// fotos. Duas edições separadas (D63): 2026 no topo, o arquivo de 2021 depois.
export const metadata: Metadata = {
  title: "Galeria",
  description: "Fotos do Braz Skate 2026 e do campeonato de 2021.",
};

// Loop de drone (v076, 9s a partir de 9s — plano aberto sobre a rua, o lago
// e a pista; ninguém identificável). Gerado por scripts/processar-loop-drone.mjs.
const POSTER_LOOP = "/galeria/loop-drone-poster.webp";
const LOOP_MP4 = "/galeria/loop-drone.mp4";
const LOOP_WEBM = "/galeria/loop-drone.webm";

export default function Galeria() {
  if (!galeria.publicada) notFound();

  // Só evita blocos vazios com padding (anti-casca-vazia, spec §9); o
  // portão de publicação continua sendo apenas `galeria.publicada`.
  const temFotos = galeriaPosEvento.length > 0;
  const tem2021 = Object.values(galeriaCamp2021).some((fotos) => fotos.length > 0);

  return (
    <>
      <Header />
      <main id="conteudo" className="flex-1">
        <h1 className="sr-only">Galeria do Braz Skate</h1>
        <LoopDrone poster={POSTER_LOOP} videoSrcMp4={LOOP_MP4} videoSrcWebm={LOOP_WEBM} />

        <div className="registro-concreto">
          {temFotos && (
            <>
              <section
                id="edicao-2026"
                className="mx-auto max-w-6xl scroll-mt-16 px-4 py-16 sm:px-6 md:py-24"
              >
                <Reveal>
                  <div data-reveal className="mb-8">
                    <SectionHeader
                      eyebrow="13 de setembro de 2026"
                      titulo="Edição 2026"
                    />
                  </div>
                  <GaleriaGrade fotos={galeriaPosEvento} />
                </Reveal>
              </section>

              <section className="py-4">
                <FaixaScroll fotos={galeriaPosEvento} />
              </section>
            </>
          )}

          {tem2021 && (
            <section
              id="edicao-2021"
              className="mx-auto max-w-6xl scroll-mt-16 px-4 py-16 sm:px-6 md:py-24"
            >
              <Reveal>
                <div data-reveal>
                  <SectionHeader
                    eyebrow="Arquivo"
                    titulo="Edição 2021"
                    lead="A primeira edição, organizada pelos próprios skatistas — a inspiração direta do Braz Skate."
                  />
                </div>
                <div data-reveal className="mt-8">
                  <GaleriaCamp2021 porCategoria={galeriaCamp2021} />
                </div>
              </Reveal>
            </section>
          )}

          <Agradecimentos />
        </div>
      </main>
      <Footer />
    </>
  );
}
