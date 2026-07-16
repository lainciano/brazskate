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
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    >
      <filter id={id}>
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
