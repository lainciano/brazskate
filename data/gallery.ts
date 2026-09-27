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
//
// `galeriaCamp2021` é agrupada por categoria (D33, docs/02-DECISOES.md) —
// as artes originais de 2021 tinham a foto do 1º lugar Amador e do 2º
// lugar Mirim trocadas entre si (erro da própria organização em 2021, não
// deste recorte); corrigido aqui: `/galeria/2021-03.webp` é o 1º Amador,
// `/galeria/2021-04.webp` é o 2º Mirim.

export type FotoGaleria = {
  src: string;
  alt: string;
  credito: string; // obrigatório — quem tirou/cedeu a foto
  creditoUrl?: string; // opcional — perfil de quem tirou (D53)
  permissao: true; // literal: `permissao: false` não compila
  legenda?: string;
};

export type CategoriaCamp2021 = "mirim" | "iniciante" | "amador";

export const galeriaCamp2021: Record<CategoriaCamp2021, readonly FotoGaleria[]> = {
  mirim: [
    {
      src: "/galeria/2021-06.webp",
      alt: "Pódio da categoria Mirim do Braz Skate 2021, competidor em 1º lugar com o troféu.",
      credito: "Acervo ASB",
      permissao: true,
      legenda: "1º lugar — Mirim, 2021",
    },
    {
      src: "/galeria/2021-04.webp",
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
  ],
  iniciante: [
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
  ],
  amador: [
    {
      src: "/galeria/2021-03.webp",
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
  ],
};

export const galeriaPista: readonly FotoGaleria[] = [
  {
    src: "/galeria/pista-01.webp",
    alt: "Vista geral da pista de Brazlândia, com rampas, corrimãos e grafites dos obstáculos.",
    credito: "Cauet",
    creditoUrl: "https://www.instagram.com/cauetista/",
    permissao: true,
  },
  {
    src: "/galeria/pista-02.webp",
    alt: "Pista de Brazlândia ao fim da tarde, com o bowl e os obstáculos iluminados pela luz baixa.",
    credito: "Cauet",
    creditoUrl: "https://www.instagram.com/cauetista/",
    permissao: true,
  },
  {
    src: "/galeria/pista-03.webp",
    alt: "Corrimão e obstáculos da pista de Brazlândia a contraluz, no fim da tarde.",
    credito: "Cauet",
    creditoUrl: "https://www.instagram.com/cauetista/",
    permissao: true,
  },
];

// Fotos do evento de 2026, pós-evento (docs/superpowers/specs/
// 2026-09-27-pos-evento-galeria-resultados-design.md). `baseDaPermissao`
// registra POR QUE a foto pode entrar — não basta `permissao: true`
// (que só garante que alguém checou), porque menor não-inscrito precisa
// de autorização avulsa, nunca do termo padrão (ver §3.2 da spec).
export type BaseDaPermissao =
  | "termo-inscrito" // inscrito; cláusula 5 do termo, data/termo.ts
  | "autorizacao-avulsa" // não inscrito, autorização registrada à parte
  | "sem-pessoa-identificavel"; // ninguém reconhecível na foto

export type FotoEvento = FotoGaleria & {
  largura: number; // do master, pós-orientação EXIF
  altura: number;
  baseDaPermissao: BaseDaPermissao;
};

// Seleção de fotos do evento (galeria pós-evento + pódios de /resultados).
// Vazio até o Lain preencher a coluna "Base da permissão" na spec —
// política de placeholder (AGENT.md): nenhuma foto entra sem essa coluna.
export const galeriaPosEvento: readonly FotoEvento[] = [];
