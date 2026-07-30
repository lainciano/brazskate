import Image from "next/image";
import { institutionalPartners } from "@/data/partners";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";

// Parceiros institucionais (I7, docs/02-DECISOES.md D18): tom celebratório
// mas respeitoso — parceiros são colaboradores, não patrocinadores
// comerciais. Renderiza SEMPRE de data/partners.ts.
export function ParceirosInstitucionais() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 md:pb-24">
      <Reveal>
        <div data-reveal>
          <SectionHeader
            eyebrow="Parcerias"
            titulo="Parceiros institucionais"
            lead="O Braz Skate é realizado em colaboração com organizações que compartilham a missão de fortalecer a cena de skate em Brazlândia."
          />
        </div>
        <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {institutionalPartners.map((partner) => (
            <li
              key={partner.id}
              data-reveal
              className="flex items-center gap-4 rounded-card border-2 border-(--borda) bg-(--surface) p-6"
            >
              <Image
                src={partner.logoSrc}
                alt=""
                width={64}
                height={64}
                className="h-16 w-16 shrink-0 rounded-full"
              />
              <div>
                <h3 className="text-[1.375rem] font-bold leading-[1.2]">
                  {partner.nome}
                </h3>
                <p className="mt-2 leading-[1.6] text-(--fg-secundario)">
                  {partner.descricao}
                </p>
                <a
                  href={`https://instagram.com/${partner.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block font-semibold underline-offset-4 hover:underline"
                >
                  @{partner.instagram}
                </a>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
