// Rasgo (docs/05-DESIGN.md §3.9): divisor de papel rasgado entre registros.
// A cor é a da seção que "rasga por cima"; posicionar como primeiro (ou
// último, com virado) elemento da seção seguinte. Altura fixa — não cria
// layout shift. Sempre decorativo.

const cores = {
  tinta: "fill-tinta",
  creme: "fill-creme",
} as const;

export function Rasgo({
  cor,
  virado = false,
  className = "",
}: {
  cor: keyof typeof cores;
  virado?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 1440 40"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`block h-8 w-full sm:h-10 ${cores[cor]} ${virado ? "rotate-180" : ""} ${className}`}
    >
      <path d="M0 0h1440v6l-52 9 -46-7 -61 12 -70-9 -55 5 -49 13 -66-15 -58 6 -72 11 -63-13 -51 4 -68 12 -59-16 -70 8 -54 11 -62-12 -57 4 -66 13 -49-14 -71 7 -58 12 -55-10 -68 5 -60-8v-24z" />
    </svg>
  );
}
