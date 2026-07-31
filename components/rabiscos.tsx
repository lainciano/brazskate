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

// Ícone do Pix (não é um rabisco à mão como os demais, mas segue a mesma
// regra da §3.9: currentColor + aria-hidden, para herdar a cor do registro
// onde aparecer — usado no botão terciário "Apoie via Pix", §3.1).
export function IconePix(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M8.5 9.5a2.6 2.6 0 0 1 1.84.76l1.3 1.3a.5.5 0 0 0 .72 0l1.3-1.3a2.6 2.6 0 0 1 1.84-.76h.3l-2.53-2.53a1.6 1.6 0 0 0-2.26 0L8.5 9.5Z"
        fill="currentColor"
      />
      <path
        d="M8.5 14.5l2.51 2.53a1.6 1.6 0 0 0 2.26 0L15.8 14.5h-.3a2.6 2.6 0 0 1-1.84-.76l-1.3-1.3a.5.5 0 0 0-.72 0l-1.3 1.3a2.6 2.6 0 0 1-1.84.76h-.3Z"
        fill="currentColor"
      />
      <path
        d="M6.5 10.06a1.6 1.6 0 0 0 0 2.26l1.06 1.06.63-.02a1.6 1.6 0 0 0 1.13-.47l1.3-1.3a1.5 1.5 0 0 1 2.16 0l1.3 1.3a1.6 1.6 0 0 0 1.13.47l.63.02 1.06-1.06a1.6 1.6 0 0 0 0-2.26l-1.06-1.06-.63.02a1.6 1.6 0 0 0-1.13.47l-1.3 1.3a1.5 1.5 0 0 1-2.16 0l-1.3-1.3a1.6 1.6 0 0 0-1.13-.47l-.63-.02L6.5 10.06Z"
        fill="currentColor"
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
