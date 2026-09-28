import Image from "next/image";
import { Botao } from "./botao";
import { Grao } from "./grao";
import { galeria } from "@/data/galeria";
import { galeriaPosEvento } from "@/data/gallery";
import { resultados } from "@/data/resultados";

// Teaser pós-evento na home (docs/superpowers/specs/
// 2026-09-27-pos-evento-galeria-resultados-design.md §4.3). Some por
// completo enquanto nem galeria nem resultados estiverem publicados —
// antes do evento sair no ar, não há nada pós-evento a anunciar.
//
// Cada bloco tem a sua própria flag: miniaturas, CTA e linha de
// agradecimento dependem de `galeria.publicada` (o âncora
// #agradecimentos só existe em /galeria); o bloco "Pódios 2026" depende de
// `resultados.publicado`. As miniaturas são só ilustração (o CTA leva à
// galeria) e, sem fotos selecionadas, a fileira não é renderizada.
const miniaturas = galeriaPosEvento.slice(0, 3);

export function TeaserPosEvento() {
  if (!galeria.publicada && !resultados.publicado) return null;

  return (
    <section className="registro-asfalto relative overflow-hidden">
      <Grao />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.1em] text-rosa">
          Aconteceu em 13/09/2026
        </p>
        <h2 className="mt-3 font-display text-[clamp(2rem,6vw,3.25rem)] uppercase leading-none">
          Valeu, Brazlândia
        </h2>
        {galeria.publicada && miniaturas.length > 0 && (
          <div className="mt-8 grid grid-cols-3 gap-1.5 sm:gap-3">
            {miniaturas.map((foto) => (
              <div
                key={foto.src}
                className="relative aspect-square overflow-hidden"
              >
                <Image
                  src={foto.src}
                  alt={foto.alt}
                  fill
                  sizes="(min-width: 1152px) 368px, 33vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}
        {galeria.publicada && (
          <div className="mt-8">
            <Botao href="/galeria">Ver a galeria</Botao>
          </div>
        )}
        {resultados.publicado && (
          <div className="mt-10">
            <h3 className="font-display text-2xl uppercase leading-none">
              Pódios 2026
            </h3>
            <p className="mt-3 max-w-[55ch] text-(--fg-secundario)">
              <a href="/resultados" className="underline underline-offset-2">
                Veja os pódios de cada categoria →
              </a>
            </p>
          </div>
        )}
        {galeria.publicada && (
          <p className="mt-6 max-w-[55ch] text-(--fg-secundario)">
            <a
              href="/galeria#agradecimentos"
              className="underline underline-offset-2"
            >
              Valeu a quem fez o dia acontecer
            </a>
          </p>
        )}
      </div>
    </section>
  );
}
