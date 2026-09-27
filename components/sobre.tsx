import { GaleriaCamp2021 } from "./galeria-2021";
import { MarqueePatrocinadores } from "./marquee-patrocinadores";
import { Rasgo } from "./rasgo";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";
import { StickerBadge } from "./sticker-badge";
import { galeriaCamp2021 } from "@/data/gallery";
import { organizacao } from "@/data/equipe";

// Seção sobre (roadmap PR 2, docs/05-DESIGN.md §1.5 e §4.3): tom caloroso e
// celebratório. Fotos do camp 2021 entram como colagem (I1 fechada, D31) —
// array vazio não renderiza nada, então a seção nunca fica com moldura
// vazia esperando conteúdo. Conteúdo baseado em docs/ASB.md e
// docs/01-CONTEXTO.md.

// galeriaCamp2021 é um Record por categoria (D33) — a regra anti-casca-vazia
// precisa checar as 3 chaves, não só "array.length", senão o título "O
// campeonato de 2021" renderiza sem nenhuma foto embaixo.
const temGaleria2021 = Object.values(galeriaCamp2021).some((fotos) => fotos.length > 0);

export function Sobre() {
  return (
    <div className="registro-concreto">
      <Rasgo cor="tinta" />
      <MarqueePatrocinadores className="border-b-2 border-tinta py-3" />

      <section id="sobre" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-16 sm:px-6 md:py-24">
        <Reveal>
          <div data-reveal>
            <SectionHeader
              eyebrow="Sobre o evento"
              titulo="A cena sempre esteve aqui"
              lead="Skate em Brazlândia é história de mais de vinte anos — e o Braz Skate é a celebração dela."
            />
          </div>

          <div className="mt-10 grid max-w-[65ch] gap-6 leading-[1.6] md:max-w-none md:grid-cols-2 md:gap-x-12">
            <p data-reveal>
              O skate faz parte de Brazlândia desde o início dos anos 2000. A
              pista à beira do lago, no complexo esportivo da cidade, é ponto
              de encontro de gerações — pra quem compete, pra quem aprende e
              pra quem vive o rolê como lazer, identidade e estilo de vida.
            </p>
            <p data-reveal>
              Em 2021, os próprios skatistas colocaram um campeonato de pé — e
              ele marcou a cena. O Braz Skate nasce dessa inspiração, em maior
              escala: um evento feito pela comunidade para atrair competidores
              e público de todo o DF e entorno.
            </p>
            <div data-reveal className="md:col-span-2">
              <h3 className="text-[1.375rem] font-bold leading-[1.2]">
                Quem é a ASB
              </h3>
              <p className="mt-3 max-w-[65ch] leading-[1.6]">
                A ASB — Associação Skate Brazlândia — foi criada pelos
                skatistas, para os skatistas: um movimento independente que
                transforma a paixão da cena em ação organizada. Campeonatos,
                visibilidade para quem já vive o esporte na cidade e parcerias
                para melhorar a estrutura de quem anda — é assim que a
                associação coloca Brazlândia no mapa do skate do DF.
              </p>
            </div>

            <div data-reveal className="md:col-span-2">
              <h3 className="text-[1.375rem] font-bold leading-[1.2]">
                Quem organiza
              </h3>
              <ul className="mt-4 flex max-w-[65ch] flex-wrap gap-3">
                {organizacao.map((pessoa, indice) => (
                  <li key={pessoa.nome}>
                    {pessoa.instagram ? (
                      <a
                        href={`https://instagram.com/${pessoa.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <StickerBadge
                          variante={indice % 2 === 0 ? "info" : "breve"}
                          data-carimbo
                        >
                          {pessoa.nome}
                        </StickerBadge>
                      </a>
                    ) : (
                      <StickerBadge
                        variante={indice % 2 === 0 ? "info" : "breve"}
                        data-carimbo
                      >
                        {pessoa.nome}
                      </StickerBadge>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {temGaleria2021 && (
            <div data-reveal className="mt-12">
              <h3 className="text-[1.375rem] font-bold leading-[1.2]">
                O campeonato de 2021
              </h3>
              <p className="mt-3 max-w-[65ch] leading-[1.6] text-(--fg-secundario)">
                Registro da primeira edição, organizada pelos próprios
                skatistas — a inspiração direta do Braz Skate.
              </p>
              <div className="mt-6">
                <GaleriaCamp2021 porCategoria={galeriaCamp2021} />
              </div>
            </div>
          )}
        </Reveal>
      </section>
    </div>
  );
}
