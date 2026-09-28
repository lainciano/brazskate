import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { GaleriaGrade } from "@/components/galeria-grade";
import { Header } from "@/components/header";
import { FaixaScroll } from "@/components/faixa-scroll";
import { LoopDrone } from "@/components/loop-drone";
import { Agradecimentos } from "@/components/agradecimentos";
import { Reveal } from "@/components/reveal";
import { galeria } from "@/data/galeria";
import { galeriaPosEvento } from "@/data/gallery";

// Página /galeria (docs/superpowers/specs/
// 2026-09-27-pos-evento-galeria-resultados-design.md). Enquanto
// `galeria.publicada` for false a rota responde 404 (notFound antes de
// qualquer render) — publicar é a flag, nunca o tamanho do array de
// fotos.
export const metadata: Metadata = {
  title: "Galeria",
  description: "Fotos do Braz Skate 2026.",
};

// TODO(loop de drone): trocar pelo poster real assim que existir — usa
// uma foto já publicada da pista como fallback neutro até lá (nunca um
// placeholder inventado).
const POSTER_LOOP = "/galeria/pista-01.webp";

export default function Galeria() {
  if (!galeria.publicada) notFound();

  // Só evita blocos vazios com padding (anti-casca-vazia, spec §9); o
  // portão de publicação continua sendo apenas `galeria.publicada`.
  const temFotos = galeriaPosEvento.length > 0;

  return (
    <>
      <Header />
      <main id="conteudo" className="flex-1">
        <h1 className="sr-only">Galeria do Braz Skate 2026</h1>
        <LoopDrone poster={POSTER_LOOP} />

        <div className="registro-concreto">
          {temFotos && (
            <>
              <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
                <Reveal>
                  <GaleriaGrade fotos={galeriaPosEvento} />
                </Reveal>
              </section>

              <section className="py-4">
                <FaixaScroll fotos={galeriaPosEvento} />
              </section>
            </>
          )}

          <Agradecimentos />
        </div>
      </main>
      <Footer />
    </>
  );
}
