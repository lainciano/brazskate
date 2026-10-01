import { evento, mapaEmbedUrl } from "@/data/evento";
import { Botao } from "./botao";
import { CarrosselFotos } from "./carrossel-fotos";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";
import { galeriaPista } from "@/data/gallery";

// Seção "onde acontece" (roadmap V1.1): registro concreto, entre Sobre e
// Categorias (sem novo rasgo — ambas concreto). Mapa embutido derivado das
// coordenadas de data/evento.ts; botão de fallback sempre visível.
//
// Linhas do ônibus em chip próprio (não StickerBadge — esse componente é a
// assinatura de placeholder/pendência do site, docs/05-DESIGN.md §3.6, e
// aqui o dado já é confirmado); cantos firmes (--radius-btn), não pílula.

const LINHAS_ONIBUS = [
  "400",
  "401",
  "402",
  "403",
  "404",
  "405",
  "411",
  "413",
  "420",
  "421",
  "423",
  "450",
];

export function Localizacao() {
  return (
    <section id="local" className="registro-concreto">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <Reveal>
          <div data-reveal>
            <SectionHeader
              eyebrow="Onde acontece"
              titulo={evento.local.nome}
              lead="Na pista à beira do lago, no complexo esportivo da cidade."
            />
          </div>

          <div
            data-reveal
            className="mt-10 overflow-hidden rounded-card shadow-card transition-[transform,box-shadow] duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-card-hover motion-reduce:transition-none"
          >
            <iframe
              src={mapaEmbedUrl(evento.local.coordenadas)}
              title={`Mapa da localização — ${evento.local.nome}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="aspect-video w-full border-0"
            />
          </div>

          <div data-reveal className="mt-6">
            <Botao
              href={evento.local.mapsUrl}
              rel="noopener"
              variante="secundario"
            >
              Abrir no Google Maps
            </Botao>
          </div>

          {galeriaPista.length > 0 && (
            <div data-reveal className="mt-10">
              <h3 className="text-[1.375rem] font-bold leading-[1.2]">
                A pista hoje
              </h3>
              <div className="mt-6 max-w-3xl">
                <CarrosselFotos fotos={galeriaPista} />
              </div>
            </div>
          )}

          <div data-reveal className="mt-10">
            <h3 className="text-[1.375rem] font-bold leading-[1.2]">
              Como chegar de ônibus
            </h3>
            <p className="mt-3 max-w-[65ch] leading-[1.6] text-(--fg-secundario)">
              Linhas do DFTrans que atendem Brazlândia, conectando com a
              Rodoviária do Plano Piloto, Taguatinga, Ceilândia e a W3
              Norte/Sul:
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {LINHAS_ONIBUS.map((linha) => (
                <li
                  key={linha}
                  className="rounded-btn border border-tinta/20 bg-(--surface) px-2.5 py-1 text-sm font-semibold"
                >
                  {linha}
                </li>
              ))}
            </ul>
            <a
              href="https://dfnoponto.com/cidades/brazlandia"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block font-semibold underline-offset-4 hover:underline"
            >
              Ver horários em tempo real no DF no Ponto →
            </a>
          </div>

          <div data-reveal className="mt-10">
            <h3 className="text-[1.375rem] font-bold leading-[1.2]">
              Estacionamento
            </h3>
            <p className="mt-3 max-w-[65ch] leading-[1.6] text-(--fg-secundario)">
              Tem estacionamento ao lado da pista, com mais espaço do que a
              via pública do entorno.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
