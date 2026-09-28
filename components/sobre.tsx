import { Botao } from "./botao";
import { Destaques2026 } from "./destaques-2026";
import { MarqueePatrocinadores } from "./marquee-patrocinadores";
import { Rasgo } from "./rasgo";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";
import { StickerBadge } from "./sticker-badge";
import { galeria } from "@/data/galeria";
import { galeriaPosEvento } from "@/data/gallery";
import { organizacao } from "@/data/equipe";

// Seção sobre (roadmap PR 2, docs/05-DESIGN.md §1.5 e §4.3): tom caloroso e
// celebratório. Conteúdo baseado em docs/ASB.md e docs/01-CONTEXTO.md. Ao
// fim, uma faixa com fotos da edição 2026 (D63) — aparece só com a galeria
// publicada, e nunca com moldura vazia (anti-casca-vazia). As fotos de 2021
// que ficavam aqui foram para /galeria.

// Destaques: fotos em retrato depois das 3 que o teaser da home já usa
// (components/teaser-pos-evento.tsx), para não repetir imagem na mesma página.
const destaques2026 = galeria.publicada
  ? galeriaPosEvento
      .slice(3)
      .filter((foto) => foto.altura > foto.largura)
      .slice(0, 6)
  : [];

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

          {destaques2026.length > 0 && (
            <div data-reveal className="mt-12">
              <h3 className="text-[1.375rem] font-bold leading-[1.2]">
                Como foi o Braz Skate 2026
              </h3>
              <p className="mt-3 max-w-[65ch] leading-[1.6] text-(--fg-secundario)">
                13 de setembro, no Skate Park de Brazlândia — a cena inteira
                de volta à pista.
              </p>
              <div className="mt-6">
                <Destaques2026 fotos={destaques2026} />
              </div>
              <div className="mt-6">
                <Botao href="/galeria" variante="secundario">
                  Ver a galeria completa
                </Botao>
              </div>
            </div>
          )}
        </Reveal>
      </section>
    </div>
  );
}
