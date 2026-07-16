import type { SVGProps } from "react";

// Rabiscos à mão (docs/05-DESIGN.md §3.9): sempre decorativos (aria-hidden)
// e em currentColor, para herdarem a cor do contexto onde forem usados.

export function RabiscoSublinhado(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 220 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4 10C42 5 84 4 122 6c30 2 58 5 94-2"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M14 13c34-3 66-4 96-3"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.8"
      />
    </svg>
  );
}

export function RabiscoSeta(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M3 18C12 8 22 6 34 10"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M27 5l8 4-6 7"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function RabiscoCirculo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 120 56" fill="none" aria-hidden="true" {...props}>
      <path
        d="M62 5C30 3 6 12 5 27c-1 16 24 25 55 24 32-1 55-11 55-25C115 12 92 4 68 5c-8 0-16 1-23 3"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
