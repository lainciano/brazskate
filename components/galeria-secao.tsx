import { Agradecimentos } from "./agradecimentos";
import { FaixaScroll } from "./faixa-scroll";
import { GaleriaCamp2021 } from "./galeria-2021";
import { GaleriaGrade } from "./galeria-grade";
import { LoopDrone } from "./loop-drone";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";
import { galeria } from "@/data/galeria";
import { galeriaCamp2021, galeriaPosEvento } from "@/data/gallery";

// Galeria pós-evento (docs/superpowers/specs/
// 2026-09-27-pos-evento-galeria-resultados-design.md), agora uma SEÇÃO DA
// HOME logo abaixo do hero (D63) — antes era a página /galeria. Abre com o
// loop de drone, segue com a Edição 2026 (grade + faixa), o arquivo de
// 2021 e termina nos Agradecimentos, que emendam direto no "Sobre".
// `galeria.publicada` false ⇒ não renderiza nada (publicar é a flag, nunca
// o tamanho do array). Um <h1> só por página: o da home é o do hero, então
// aqui só h2.

// Loop de drone (v120, 8s a partir de 1s). Gerado por
// scripts/processar-loop-drone.mjs.
const POSTER_LOOP = "/galeria/loop-drone-poster.webp";
const LOOP_MP4 = "/galeria/loop-drone.mp4";
const LOOP_WEBM = "/galeria/loop-drone.webm";

export function GaleriaSecao() {
  if (!galeria.publicada) return null;

  // Só evita blocos vazios com padding (anti-casca-vazia, spec §9).
  const temFotos = galeriaPosEvento.length > 0;
  const tem2021 = Object.values(galeriaCamp2021).some((fotos) => fotos.length > 0);

  return (
    <div id="galeria">
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
                  <SectionHeader eyebrow="13 de setembro de 2026" titulo="Edição 2026" />
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
    </div>
  );
}
