import type { Metadata } from "next";
import { Botao } from "@/components/botao";
import { Footer } from "@/components/footer";
import { Grao } from "@/components/grao";
import { Header } from "@/components/header";
import { Marquee } from "@/components/marquee";
import { Rasgo } from "@/components/rasgo";
import {
  RabiscoCirculo,
  RabiscoSeta,
  RabiscoSublinhado,
} from "@/components/rabiscos";
import { SectionHeader } from "@/components/section-header";
import { StickerBadge } from "@/components/sticker-badge";
import { DemoMotion } from "./demo-motion";

// Styleguide (roadmap PR 1): página não linkada, noindex — é onde o padrão
// vivo do design system é revisado e consultado. Não entra no sitemap.
export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

const cores = [
  { token: "tinta", hex: "#191314", classe: "bg-tinta" },
  { token: "creme", hex: "#f5ebe4", classe: "bg-creme" },
  { token: "creme-elevado", hex: "#faf4ef", classe: "bg-creme-elevado" },
  { token: "rosa", hex: "#f0d9ce", classe: "bg-rosa" },
  { token: "vermelho-300", hex: "#d98b85", classe: "bg-vermelho-300" },
  { token: "vermelho-500", hex: "#a84b4b", classe: "bg-vermelho-500" },
  { token: "vermelho-600", hex: "#9c4242", classe: "bg-vermelho-600" },
  { token: "vermelho-700", hex: "#8e3a3a", classe: "bg-vermelho-700" },
  { token: "azul-300", hex: "#7cc3e0", classe: "bg-azul-300" },
  { token: "azul-600", hex: "#1e7fa6", classe: "bg-azul-600" },
  { token: "azul-700", hex: "#176688", classe: "bg-azul-700" },
];

function Bloco({
  titulo,
  children,
}: {
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <SectionHeader titulo={titulo} />
      <div className="mt-8">{children}</div>
    </section>
  );
}

export default function Styleguide() {
  return (
    <>
      <Header />
      <main id="conteudo" className="registro-concreto">
        <div className="mx-auto max-w-6xl px-4 pt-16 sm:px-6">
          <h1 className="font-display text-[clamp(3rem,11vw,6.5rem)] uppercase leading-[0.95]">
            Styleguide
          </h1>
          <p className="mt-4 max-w-[65ch] text-lg leading-[1.55] text-(--fg-secundario)">
            Padrão vivo do design system do Braz Skate — tokens e componentes
            de <code>docs/05-DESIGN.md</code>. Página interna, não linkada e
            fora do índice de busca.
          </p>
        </div>

        <Bloco titulo="Cores">
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {cores.map((cor) => (
              <li key={cor.token}>
                <div
                  className={`h-20 rounded-card border-2 border-(--borda) ${cor.classe}`}
                />
                <p className="mt-2 text-sm font-semibold">{cor.token}</p>
                <p className="text-sm text-(--fg-secundario)">
                  <code>{cor.hex}</code>
                </p>
              </li>
            ))}
          </ul>
        </Bloco>

        <Bloco titulo="Tipografia">
          <div className="flex flex-col gap-6">
            <p className="font-display text-[clamp(3rem,11vw,6.5rem)] uppercase leading-[0.95]">
              Display
            </p>
            <p className="font-display text-[clamp(2rem,6vw,3.25rem)] uppercase leading-none">
              Título de seção
            </p>
            <p className="text-[1.375rem] font-bold leading-[1.2]">
              H3 — card e subtítulo (Archivo 700)
            </p>
            <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.1em] text-(--acento)">
              Eyebrow / sobretítulo
            </p>
            <p className="max-w-[65ch] leading-[1.6]">
              Corpo — Archivo 400, entrelinha 1.6, máximo de ~65 caracteres
              por linha para leitura confortável no celular, onde a maioria
              do público chega via WhatsApp e Instagram.
            </p>
            <p className="text-sm leading-[1.4] text-(--fg-secundario)">
              Legenda — créditos de foto e microcopy.
            </p>
          </div>
        </Bloco>

        <Bloco titulo="Botões">
          <div className="flex flex-wrap items-center gap-6">
            <Botao href="#" variante="primario">
              Quero competir
            </Botao>
            <Botao href="#" variante="secundario">
              Seja um patrocinador
            </Botao>
            <Botao href="#" variante="terciario">
              Apoie via Pix
            </Botao>
          </div>
        </Bloco>

        <Bloco titulo="Stickers">
          <div className="flex flex-wrap items-center gap-6">
            <StickerBadge variante="data">Data a confirmar</StickerBadge>
            <StickerBadge variante="breve">Detalhes em breve</StickerBadge>
            <StickerBadge variante="info">Pré-inscrição em breve</StickerBadge>
          </div>
        </Bloco>

        <Bloco titulo="Rabiscos">
          <div className="flex flex-wrap items-center gap-10 text-vermelho-500">
            <RabiscoSublinhado className="h-4 w-52" />
            <RabiscoSeta className="h-8 w-12" />
            <RabiscoCirculo className="h-14 w-28" />
          </div>
        </Bloco>

        <Bloco titulo="Motion">
          <DemoMotion />
        </Bloco>

        {/* marquee full-bleed (§3.9): pausa no hover, estática c/ reduced-motion */}
        <Marquee
          texto="Braz Skate · Brazlândia-DF"
          className="border-y-2 border-tinta py-3"
        />

        {/* registro asfalto: os mesmos componentes no fundo escuro,
            com o rasgo de papel fazendo a transição (§3.9) */}
        <section className="registro-asfalto relative overflow-hidden">
          <Rasgo cor="creme" />
          <Grao />
          <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <SectionHeader
              eyebrow="Registro asfalto"
              titulo="Fundo tinta com grão"
              lead="As seções de alta energia (hero, footer) usam este registro. Componentes funcionam igual — as variáveis do registro trocam as cores."
              corRabisco="rosa"
            />
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Botao href="#" variante="primario">
                Quero competir
              </Botao>
              <Botao href="#" variante="secundario">
                Seja um patrocinador
              </Botao>
              <Botao href="#" variante="terciario">
                Apoie via Pix
              </Botao>
              <StickerBadge variante="data">Data a confirmar</StickerBadge>
            </div>
            <p className="mt-8 max-w-[65ch] leading-[1.6] text-(--fg-secundario)">
              Texto secundário sobre tinta (creme 75%) e{" "}
              <a href="#conteudo" className="text-(--link) underline underline-offset-4">
                link no azul pista
              </a>
              .
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
