import { Grao } from "./grao";
import { resultados } from "@/data/resultados";

// Bloco "Pódios 2026" da home (docs/superpowers/specs/
// 2026-09-27-pos-evento-galeria-resultados-design.md §4.3). A galeria em si
// agora É uma seção da home (components/galeria-secao.tsx, D63), então este
// bloco sobrou só com o pódio: some por completo enquanto
// `resultados.publicado` for false e leva à página /resultados quando ligar.
export function TeaserPosEvento() {
  if (!resultados.publicado) return null;

  return (
    <section className="registro-asfalto relative overflow-hidden">
      <Grao />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.1em] text-rosa">
          Aconteceu em 13/09/2026
        </p>
        <h2 className="mt-3 font-display text-[clamp(2rem,6vw,3.25rem)] uppercase leading-none">
          Pódios 2026
        </h2>
        <p className="mt-6 max-w-[55ch] text-(--fg-secundario)">
          <a href="/resultados" className="underline underline-offset-2">
            Veja os pódios de cada categoria →
          </a>
        </p>
      </div>
    </section>
  );
}
