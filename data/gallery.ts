// Fonte única da galeria (V1.7, docs/04-ROADMAP-V1.md) — I1/I2 fechadas
// (D31, docs/02-DECISOES.md). O portão de direito de imagem (AGENT.md,
// "Restrição de imagem") vira erro de compilação: `permissao` só aceita o
// literal `true`, então nenhuma foto entra no array sem permissão
// registrada.
//
// Dois conjuntos, para não misturar registro histórico com a pista hoje
// (05-DESIGN.md §4.3): `galeriaCamp2021` (recortada das artes de premiação
// de 2021 — sponsor bar de terceiros e nome completo de competidores
// removidos, ver D31) e `galeriaPista` (fotos de manobra na pista de
// Brazlândia, autoria Cauet).

export type FotoGaleria = {
  src: string;
  alt: string;
  credito: string; // obrigatório — quem tirou/cedeu a foto
  permissao: true; // literal: `permissao: false` não compila
  legenda?: string;
};

export const galeriaCamp2021: readonly FotoGaleria[] = [
  {
    src: "/galeria/2021-02.webp",
    alt: "Pódio da categoria Iniciante do Braz Skate 2021, competidor em 1º lugar segurando o troféu.",
    credito: "Acervo ASB",
    permissao: true,
    legenda: "1º lugar — Iniciante, 2021",
  },
  {
    src: "/galeria/2021-08.webp",
    alt: "Pódio da categoria Iniciante do Braz Skate 2021, dois competidores em 2º lugar.",
    credito: "Acervo ASB",
    permissao: true,
    legenda: "2º lugar — Iniciante, 2021",
  },
  {
    src: "/galeria/2021-01.webp",
    alt: "Pódio da categoria Iniciante do Braz Skate 2021, três competidores em 3º lugar.",
    credito: "Acervo ASB",
    permissao: true,
    legenda: "3º lugar — Iniciante, 2021",
  },
  {
    src: "/galeria/2021-04.webp",
    alt: "Pódio da categoria Amador do Braz Skate 2021, competidor em 1º lugar segurando o troféu.",
    credito: "Acervo ASB",
    permissao: true,
    legenda: "1º lugar — Amador, 2021",
  },
  {
    src: "/galeria/2021-05.webp",
    alt: "Pódio da categoria Amador do Braz Skate 2021, seis competidores em 2º lugar.",
    credito: "Acervo ASB",
    permissao: true,
    legenda: "2º lugar — Amador, 2021",
  },
  {
    src: "/galeria/2021-09.webp",
    alt: "Pódio da categoria Amador do Braz Skate 2021, dois competidores em 3º lugar.",
    credito: "Acervo ASB",
    permissao: true,
    legenda: "3º lugar — Amador, 2021",
  },
  {
    src: "/galeria/2021-06.webp",
    alt: "Pódio da categoria Mirim do Braz Skate 2021, competidor em 1º lugar com o troféu.",
    credito: "Acervo ASB",
    permissao: true,
    legenda: "1º lugar — Mirim, 2021",
  },
  {
    src: "/galeria/2021-03.webp",
    alt: "Pódio da categoria Mirim do Braz Skate 2021, competidor em 2º lugar.",
    credito: "Acervo ASB",
    permissao: true,
    legenda: "2º lugar — Mirim, 2021",
  },
  {
    src: "/galeria/2021-07.webp",
    alt: "Pódio da categoria Mirim do Braz Skate 2021, competidor em 3º lugar.",
    credito: "Acervo ASB",
    permissao: true,
    legenda: "3º lugar — Mirim, 2021",
  },
];

export const galeriaPista: readonly FotoGaleria[] = [
  {
    src: "/galeria/pista-01.webp",
    alt: "Skatista em manobra aérea na pista de Brazlândia.",
    credito: "Cauet",
    permissao: true,
  },
  {
    src: "/galeria/pista-02.webp",
    alt: "Skatista em manobra sobre obstáculo na pista de Brazlândia, com o bowl grafitado ao fundo.",
    credito: "Cauet",
    permissao: true,
  },
  {
    src: "/galeria/pista-03.webp",
    alt: "Skatista em manobra sobre obstáculo na pista de Brazlândia.",
    credito: "Cauet",
    permissao: true,
  },
];
