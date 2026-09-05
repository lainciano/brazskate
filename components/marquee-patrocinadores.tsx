import Image from "next/image";
import { institutionalPartners } from "@/data/partners";
import { patrocinadores } from "@/data/sponsors";

// Letreiro de logos abaixo do hero (D52, docs/02-DECISOES.md) — substitui o
// texto "Sua marca aqui" da Marquee (components/marquee.tsx, ainda usada em
// outros lugares) agora que existem apoiadores reais pra mostrar. Mesma
// técnica de rolagem em CSS puro (§3.9): duas metades idênticas, desloca
// -50% e reinicia sem emenda; pausa no hover/foco; estática com
// reduced-motion. Só a 1ª metade é interativa (links reais, tab-navegável);
// a 2ª é decorativa (aria-hidden, sem <a>) pra não duplicar parada de tab.
// Array vazio não renderiza nada (regra anti-casca-vazia).

type LogoApoiador = { nome: string; logoSrc: string; url: string; largura: number; altura: number };

// Dimensões reais de cada arquivo em public/ — Image exige width/height
// explícitos; a altura fixa em CSS (h-10/h-12) controla o tamanho real.
// O letreiro usa as variantes `-marquee.webp` (96px de altura, 2× do tamanho
// exibido): redimensionadas com Lanczos, evitam o serrilhado do browser ao
// esmagar a fonte grande (1275px → ~48px). A grade de /patrocinio continua
// usando os originais em alta resolução. Fallback: arquivo original 800×800.
const dimensoes: Record<string, { arquivo: string; largura: number; altura: number }> = {
  "/logo-censure.webp": { arquivo: "/logo-censure-marquee.webp", largura: 582, altura: 96 },
  "/logo-casa-do-hip-hop.webp": { arquivo: "/logo-casa-do-hip-hop-marquee.webp", largura: 101, altura: 96 },
  "/logo-overstreet.webp": { arquivo: "/logo-overstreet-marquee.webp", largura: 96, altura: 96 },
  "/logo-skid-skate.webp": { arquivo: "/logo-skid-skate-marquee.webp", largura: 497, altura: 96 },
  "/logo-delacrew.webp": { arquivo: "/logo-delacrew-marquee.webp", largura: 86, altura: 96 },
  "/logo-street-loyal.webp": { arquivo: "/logo-street-loyal-marquee.webp", largura: 96, altura: 96 },
};

// Cada conjunto de logos ~0.7kpx em h-10 — uma única cópia por metade
// deixava a metade mais estreita que a viewport e o loop de -50% mostrava
// um vão em branco até reiniciar. 6 cópias por metade (~4.2kpx) cobrem até
// viewports ultrawide (3440px), garantindo metade ≥ viewport o tempo todo.
// A duração (180s) escala na mesma proporção pra manter a velocidade
// original (~23px/s em 30s com uma cópia).
const COPIAS_POR_METADE = 6;
const DURACAO = "180s";

function logosApoiadores(): readonly LogoApoiador[] {
  const institucionais = institutionalPartners.map((p) => ({
    nome: p.nome,
    logoSrc: p.logoSrc,
    url: `https://instagram.com/${p.instagram}`,
    largura: 150,
    altura: 150,
  }));

  const comerciais = patrocinadores
    .filter((p) => p.logoSrc !== undefined)
    .map((p) => {
      const dim =
        dimensoes[p.logoSrc as string] ??
        { arquivo: p.logoSrc as string, largura: 800, altura: 800 };
      return {
        nome: p.nome,
        logoSrc: dim.arquivo,
        url: p.url,
        largura: dim.largura,
        altura: dim.altura,
      };
    });

  return [...institucionais, ...comerciais];
}

export function MarqueePatrocinadores({ className = "" }: { className?: string }) {
  const logos = logosApoiadores();
  if (logos.length === 0) return null;

  const logo = (item: LogoApoiador, interativo: boolean) => (
    <Image
      src={item.logoSrc}
      alt={interativo ? item.nome : ""}
      width={item.largura}
      height={item.altura}
      className="h-10 w-auto object-contain sm:h-12"
    />
  );

  const conjunto = (copia: number, interativo: boolean) =>
    logos.map((item) => {
      const chave = `${item.nome}-${copia}`;
      const interativoNesta = interativo && copia === 0;
      const conteudo = logo(item, interativoNesta);
      return interativoNesta ? (
        <a
          key={chave}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0"
        >
          {conteudo}
        </a>
      ) : (
        <span key={chave} className="shrink-0">
          {conteudo}
        </span>
      );
    });

  const copias = Array.from({ length: COPIAS_POR_METADE }, (_, copia) => copia);

  return (
    <div className={`group overflow-hidden whitespace-nowrap ${className}`}>
      <div
        style={{ animationDuration: DURACAO }}
        className="flex w-max animate-marquee group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] motion-reduce:animate-none"
      >
        <div className="flex shrink-0 items-center gap-12 px-6">
          {copias.map((copia) => (
            <div key={copia} className="flex items-center gap-12">
              {conjunto(copia, true)}
            </div>
          ))}
        </div>
        <div aria-hidden="true" className="flex shrink-0 items-center gap-12 px-6">
          {copias.map((copia) => (
            <div key={copia} className="flex items-center gap-12">
              {conjunto(copia, false)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
