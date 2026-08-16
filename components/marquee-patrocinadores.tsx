import Image from "next/image";
import { institutionalPartners } from "@/data/partners";
import { patrocinadores } from "@/data/sponsors";

// Letreiro de logos abaixo do hero (D49, docs/02-DECISOES.md) — substitui o
// texto "Sua marca aqui" da Marquee (components/marquee.tsx, ainda usada em
// outros lugares) agora que existem apoiadores reais pra mostrar. Mesma
// técnica de rolagem em CSS puro (§3.9): duas metades idênticas, desloca
// -50% e reinicia sem emenda; pausa no hover/foco; estática com
// reduced-motion. Só a 1ª metade é interativa (links reais, tab-navegável);
// a 2ª é decorativa (aria-hidden, sem <a>) pra não duplicar parada de tab.
// Array vazio não renderiza nada (regra anti-casca-vazia).

type LogoApoiador = { nome: string; logoSrc: string; url: string; largura: number; altura: number };

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
    .map((p) => ({
      nome: p.nome,
      logoSrc: p.logoSrc as string,
      url: p.url,
      // dimensões reais de cada arquivo em public/ — Image exige width/height
      // explícitos; a altura fixa em CSS (h-10/h-12) controla o tamanho real.
      largura: p.logoSrc === "/logo-censure.webp" ? 1200 : 800,
      altura: p.logoSrc === "/logo-censure.webp" ? 198 : 757,
    }));

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

  return (
    <div className={`group overflow-hidden whitespace-nowrap ${className}`}>
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] motion-reduce:animate-none">
        <div className="flex shrink-0 items-center gap-12 px-6">
          {logos.map((item) => (
            <a
              key={item.nome}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0"
            >
              {logo(item, true)}
            </a>
          ))}
        </div>
        <div aria-hidden="true" className="flex shrink-0 items-center gap-12 px-6">
          {logos.map((item) => (
            <span key={item.nome} className="shrink-0">
              {logo(item, false)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
