import { useId } from "react";

// Grão (docs/05-DESIGN.md §3.9): ruído via feTurbulence inline — custo zero
// de rede. O elemento pai precisa de position: relative (+ overflow-hidden
// quando o fundo tiver formas que estouram). Nunca sobre texto corrido.
export function Grao({
  className = "",
  opacity = 0.06,
}: {
  className?: string;
  opacity?: number;
}) {
  // id único por instância — useId gera ":r0:", inválido em url(#…)
  const id = `grao-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;

  return (
    <svg
      // will-change-transform: promove pra layer de composição própria.
      // Medido com Playwright + CPU 4x (perfil da sessão de polish
      // pós-GSAP): sem isso, o navegador re-rasterizava o feTurbulence a
      // cada frame que o ScrollSmoother move o conteúdo — frames de
      // 50-80ms exatamente na transição Patrocínio→Apoia. Com a layer
      // própria, o ruído é rasterizado uma vez e só composta (barato) no
      // scroll seguinte.
      className={`pointer-events-none absolute inset-0 h-full w-full will-change-transform ${className}`}
      aria-hidden="true"
    >
      {/* filterRes trava o buffer de rasterização em 180×180px,
          independente do tamanho final do elemento (que pode ser uma
          seção inteira de ~100dvh) — sem isso o feTurbulence recalcula
          ruído por pixel real da seção a cada frame que o ScrollSmoother
          transforma o conteúdo, custo alto de repaint (suspeito de
          performance da sessão de polish pós-GSAP). Navegadores sem
          suporte a filterRes só voltam ao comportamento anterior. */}
      <filter id={id} filterRes="180 180">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.8"
          numOctaves="2"
          stitchTiles="stitch"
        />
      </filter>
      <rect width="100%" height="100%" filter={`url(#${id})`} opacity={opacity} />
    </svg>
  );
}
