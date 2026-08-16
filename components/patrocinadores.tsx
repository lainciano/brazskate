import Image from "next/image";
import { patrocinadores } from "@/data/sponsors";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";

// Grade de patrocinadores comerciais (P4, docs/02-DECISOES.md D30/D50).
// Renderiza SEMPRE de data/sponsors.ts — array vazio não renderiza nada
// (regra anti-casca-vazia, mesmo princípio da Colagem/CarrosselFotos).
export function Patrocinadores() {
  if (patrocinadores.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 md:pb-24">
      <Reveal>
        <div data-reveal>
          <SectionHeader
            eyebrow="Patrocinadores"
            titulo="Quem já apoia o Braz Skate"
          />
        </div>
        <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {patrocinadores.map((patrocinador) => (
            <li key={patrocinador.nome} data-reveal>
              <a
                href={patrocinador.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-card border-2 border-(--borda) bg-(--surface) p-8 shadow-card transition-[transform,box-shadow] duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-card-hover motion-reduce:transition-none"
              >
                {patrocinador.logoSrc ? (
                  <Image
                    src={patrocinador.logoSrc}
                    alt={patrocinador.nome}
                    width={240}
                    height={40}
                    className="h-auto w-full max-w-60"
                  />
                ) : (
                  <span className="text-center text-[1.125rem] font-bold leading-[1.3]">
                    {patrocinador.nome}
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
