import { Botao } from "./botao";
import { Grao } from "./grao";
import { galeria } from "@/data/galeria";
import { resultados } from "@/data/resultados";

// Teaser pós-evento na home (docs/superpowers/specs/
// 2026-09-27-pos-evento-galeria-resultados-design.md §4.3). Some por
// completo enquanto nem galeria nem resultados estiverem publicados —
// antes do evento sair no ar, não há nada pós-evento a anunciar.
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
        {galeria.publicada && (
          <div className="mt-8">
            <Botao href="/galeria">Ver a galeria</Botao>
          </div>
        )}
        {resultados.publicado && (
          <p className="mt-6 max-w-[55ch] text-(--fg-secundario)">
            <a href="/resultados" className="underline-offset-2 hover:underline">
              Veja os pódios de cada categoria →
            </a>
          </p>
        )}
      </div>
    </section>
  );
}
