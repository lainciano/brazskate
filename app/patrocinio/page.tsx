import type { Metadata } from "next";
import { Botao } from "@/components/botao";
import { Footer } from "@/components/footer";
import { Grao } from "@/components/grao";
import { Header } from "@/components/header";
import { Rasgo } from "@/components/rasgo";
import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/section-header";

// Página /patrocinio (roadmap PR 5): copy adaptado de
// docs/media-kit-braz-skate.md no tom institucional (§1.5 — "proposta
// séria, retorno real"). SEM menção ao UIEMAPV até a confirmação (I7);
// contato pelos canais oficiais do evento.

export const metadata: Metadata = {
  title: "Seja um patrocinador",
  description:
    "Apoie o Braz Skate, campeonato de skate de Brazlândia-DF: formas de apoio para marcas e parceiros, do Pix à estrutura do evento.",
};

const porQueApoiar = [
  {
    titulo: "Impacto real e visível",
    texto:
      "O evento nasce de uma comunidade organizada, não de uma iniciativa de cima para baixo — o apoio chega direto a quem pratica o esporte.",
  },
  {
    titulo: "Alcance regional",
    texto:
      "O campeonato quer atrair competidores e público de todo o Distrito Federal e entorno, não apenas de Brazlândia.",
  },
  {
    titulo: "Marco para o esporte na cidade",
    texto:
      "O Braz Skate abre um precedente de parceria entre a comunidade e a cidade, preparando o caminho para investimentos futuros na pista.",
  },
  {
    titulo: "Público engajado e diverso",
    texto:
      "Categorias iniciante, amador e feminino reúnem jovens atletas, a cena skatista adulta e o público da cidade em um único evento.",
  },
  {
    titulo: "Associação a uma causa autêntica",
    texto:
      "Sua marca junto de um movimento genuíno de revitalização esportiva e cultural — com visibilidade no som do evento, nas faixas, no site e nas redes.",
  },
];

const formasDeApoio = [
  {
    titulo: "Financeiro (Pix)",
    texto:
      "Contribuição direta via chave ou QR Code, destinada a premiação, infraestrutura e divulgação do campeonato.",
  },
  {
    titulo: "Premiação",
    texto:
      "Doação de produtos, vouchers ou troféus para as categorias do campeonato.",
  },
  {
    titulo: "Infraestrutura",
    texto:
      "Apoio com estrutura de evento: som, hidratação, banheiros químicos, tendas, sinalização.",
  },
  {
    titulo: "Divulgação e mídia",
    texto:
      "Espaço de mídia, produção de conteúdo ou divulgação cruzada com a base de público da marca.",
  },
  {
    titulo: "Institucional",
    texto:
      "Validação pública da marca à causa — parceria de nome e selo, sem contrapartida financeira direta.",
  },
];

export default function Patrocinio() {
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
              Seja um patrocinador
            </h1>
            <p className="mt-6 max-w-[60ch] text-lg leading-[1.55] text-(--fg-secundario)">
              O Braz Skate é o campeonato de skate de Brazlândia, organizado
              pela ASB — um movimento criado por skatistas locais. Apoiar o
              evento é chegar junto de uma cena que vive o esporte na cidade
              desde os anos 2000.
            </p>
          </div>
        </section>

        <div className="registro-concreto">
          <Rasgo cor="tinta" />

          <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
            <Reveal>
              <div data-reveal>
                <SectionHeader
                  eyebrow="Por que apoiar"
                  titulo="Retorno real, causa real"
                />
              </div>
              <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {porQueApoiar.map((item) => (
                  <li
                    key={item.titulo}
                    data-reveal
                    className="rounded-card bg-(--surface) p-6 shadow-card"
                  >
                    <h3 className="text-[1.375rem] font-bold leading-[1.2]">
                      {item.titulo}
                    </h3>
                    <p className="mt-3 leading-[1.6] text-(--fg-secundario)">
                      {item.texto}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </section>

          <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 md:pb-24">
            <Reveal>
              <div data-reveal>
                <SectionHeader
                  eyebrow="Formas de apoio"
                  titulo="Do jeito que fizer sentido"
                  lead="Os apoios podem ser combinados ou isolados — a organização monta a contrapartida junto com a marca."
                />
              </div>
              <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {formasDeApoio.map((forma) => (
                  <li
                    key={forma.titulo}
                    data-reveal
                    className="rounded-card border-2 border-(--borda) bg-(--surface) p-6"
                  >
                    <h3 className="text-[1.375rem] font-bold leading-[1.2]">
                      {forma.titulo}
                    </h3>
                    <p className="mt-3 leading-[1.6] text-(--fg-secundario)">
                      {forma.texto}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </section>
        </div>

        <div className="registro-asfalto relative overflow-hidden">
          <Rasgo cor="creme" />
          <Grao />
          <section className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
            <Reveal>
              <div data-reveal>
                <SectionHeader
                  eyebrow="Contato"
                  titulo="Vamos conversar?"
                  corRabisco="rosa"
                  lead="Chama a organização no WhatsApp — proposta direta, sem burocracia."
                />
              </div>
              <div data-reveal className="mt-8 flex flex-wrap items-center gap-4">
                <Botao href="https://wa.me/5561995099761" rel="noopener">
                  Chamar no WhatsApp
                </Botao>
                <Botao href="/#apoie" variante="terciario">
                  Ou apoie via Pix
                </Botao>
              </div>
            </Reveal>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
