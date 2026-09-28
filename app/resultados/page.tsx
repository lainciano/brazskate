import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { Grao } from "@/components/grao";
import { Header } from "@/components/header";
import { Podios } from "@/components/podios";
import { Rasgo } from "@/components/rasgo";
import { Reveal } from "@/components/reveal";
import { resultados } from "@/data/resultados";

// Página /resultados (D5, docs/superpowers/specs/
// 2026-09-27-pos-evento-galeria-resultados-design.md): só o pódio de cada
// categoria, sem nome, colocação ou placar. Enquanto `resultados.publicado`
// for false a rota responde 404 (notFound antes de qualquer render) e não
// existe na nav nem no sitemap. Tom celebratório/institucional (D6).

export const metadata: Metadata = {
  title: "Resultados",
  description: "Pódios do Braz Skate 2026 por categoria.",
};

export default function Resultados() {
  if (!resultados.publicado) notFound();

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
              Pódios 2026
            </h1>
            <p className="mt-6 max-w-[65ch] text-lg leading-[1.55] text-(--fg-secundario)">
              {resultados.data
                ? `Disputado em ${resultados.data}. `
                : ""}
              Parabéns a todo mundo que andou.
            </p>
          </div>
        </section>

        <div className="registro-concreto">
          <Rasgo cor="tinta" />
          <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
            <Reveal>
              <Podios podios={resultados.podios} />
            </Reveal>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
