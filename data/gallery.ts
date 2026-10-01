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
  // `src` (de FotoGaleria) é a miniatura 640w — grade, faixa e teaser;
  // `srcGrande` é a 1600w, carregada só quando o lightbox abre. Sem essa
  // separação a grade baixaria as versões grandes (5MB+) ou o lightbox
  // mostraria a miniatura esticada.
  srcGrande: string;
  largura: number; // do master, pós-orientação EXIF
  altura: number;
  baseDaPermissao: BaseDaPermissao;
};

// Seleção de fotos do evento (galeria pós-evento),
// escolhida pelo Lain em 28/09/2026. A ordem importa: as 3 primeiras viram
// as miniaturas do teaser da home; a faixa "destaques" da seção Sobre usa
// as fotos em retrato seguintes (components/sobre.tsx).
//
// ATENÇÃO — `baseDaPermissao` abaixo é PROPOSTA do Claude, feita olhando a
// foto, e ainda NÃO foi confirmada pelo Lain (só ele sabe quem estava
// inscrito ou tem autorização avulsa). Só `sem-pessoa-identificavel` é
// verificável na própria imagem. Confirmar (ou remover a foto) antes de
// mergear em `main`: `public/galeria/2026/` é servido por URL mesmo com
// `galeria.publicada` false.
export const galeriaPosEvento: readonly FotoEvento[] = [
  {
    src: "/galeria/2026/cauet-dsc00160-640w.webp",
    srcGrande: "/galeria/2026/cauet-dsc00160-1600w.webp",
    alt: "Skatista salta com as pernas abertas sobre uma pilha de skates segurada por dois organizadores agachados, com céu azul e nuvens ao fundo.",
    credito: "Cauet",
    creditoUrl: "https://www.instagram.com/cauetista/",
    permissao: true,
    largura: 3376,
    altura: 6000,
    baseDaPermissao: "termo-inscrito",
  },
  {
    src: "/galeria/2026/cauet-dsc00102-640w.webp",
    srcGrande: "/galeria/2026/cauet-dsc00102-1600w.webp",
    alt: "Skatista de camiseta clara em manobra na borda do bowl, com as tendas amarelas e o público ao fundo.",
    credito: "Cauet",
    creditoUrl: "https://www.instagram.com/cauetista/",
    permissao: true,
    largura: 3373,
    altura: 5995,
    baseDaPermissao: "termo-inscrito",
  },
  {
    src: "/galeria/2026/cauet-dsc09913-640w.webp",
    srcGrande: "/galeria/2026/cauet-dsc09913-1600w.webp",
    alt: "Criança de camiseta amarela desliza no corrimão verde da pista de Brazlândia, sob céu azul.",
    credito: "Cauet",
    creditoUrl: "https://www.instagram.com/cauetista/",
    permissao: true,
    largura: 2642,
    altura: 4695,
    baseDaPermissao: "termo-inscrito",
  },
  {
    src: "/galeria/2026/duda-img0188-640w.webp",
    srcGrande: "/galeria/2026/duda-img0188-1600w.webp",
    alt: "Público sob as tendas da Administração Regional de Brazlândia acompanha as baterias, ao lado do bowl da pista.",
    credito: "Duda",
    permissao: true,
    largura: 5184,
    altura: 3456,
    baseDaPermissao: "autorizacao-avulsa",
  },
  {
    src: "/galeria/2026/duda-484-640w.webp",
    srcGrande: "/galeria/2026/duda-484-1600w.webp",
    alt: "Troféu de campeão do Braz Skate, com a arte do evento, ainda na embalagem plástica.",
    credito: "Duda",
    permissao: true,
    largura: 3456,
    altura: 5184,
    baseDaPermissao: "sem-pessoa-identificavel",
  },
  {
    src: "/galeria/2026/cauet-092-640w.webp",
    srcGrande: "/galeria/2026/cauet-092-1600w.webp",
    alt: "Skatista de camiseta bege desliza em um corrimão verde, com sol forte, nuvens e céu azul ao fundo.",
    credito: "Cauet",
    creditoUrl: "https://www.instagram.com/cauetista/",
    permissao: true,
    largura: 2386,
    altura: 4242,
    baseDaPermissao: "termo-inscrito",
  },
  {
    src: "/galeria/2026/duda-img0333-640w.webp",
    srcGrande: "/galeria/2026/duda-img0333-1600w.webp",
    alt: "Skatistas sentados na arquibancada da pista riem durante o campeonato, com um skate quebrado ao lado.",
    credito: "Duda",
    permissao: true,
    largura: 2557,
    altura: 3836,
    baseDaPermissao: "autorizacao-avulsa",
  },
  {
    src: "/galeria/2026/cauet-dsc09717-640w.webp",
    srcGrande: "/galeria/2026/cauet-dsc09717-1600w.webp",
    alt: "Skatista de fone de ouvido e boné no ar em uma manobra, com o público sob as tendas ao fundo.",
    credito: "Cauet",
    creditoUrl: "https://www.instagram.com/cauetista/",
    permissao: true,
    largura: 3376,
    altura: 6000,
    baseDaPermissao: "termo-inscrito",
  },
  {
    src: "/galeria/2026/cauet-010-640w.webp",
    srcGrande: "/galeria/2026/cauet-010-1600w.webp",
    alt: "Skatista de camiseta clara e boné em manobra na rampa da pista, com o sol em contraluz.",
    credito: "Cauet",
    creditoUrl: "https://www.instagram.com/cauetista/",
    permissao: true,
    largura: 3376,
    altura: 6000,
    baseDaPermissao: "termo-inscrito",
  },
  {
    src: "/galeria/2026/duda-img0691-640w.webp",
    srcGrande: "/galeria/2026/duda-img0691-1600w.webp",
    alt: "Organizadores de camiseta vinho do Braz Skate conversam sob a tenda, de costas, com a arte do evento estampada.",
    credito: "Duda",
    permissao: true,
    largura: 5149,
    altura: 3433,
    baseDaPermissao: "autorizacao-avulsa",
  },
  {
    src: "/galeria/2026/cauet-dsc09892-640w.webp",
    srcGrande: "/galeria/2026/cauet-dsc09892-1600w.webp",
    alt: "Skatista de camiseta clara e calça verde em manobra sobre um obstáculo amarelo e verde com grafites.",
    credito: "Cauet",
    creditoUrl: "https://www.instagram.com/cauetista/",
    permissao: true,
    largura: 942,
    altura: 1675,
    baseDaPermissao: "termo-inscrito",
  },
  {
    src: "/galeria/2026/duda-485-640w.webp",
    srcGrande: "/galeria/2026/duda-485-1600w.webp",
    alt: "Fileira de troféus do Braz Skate com a arte do evento, dispostos no chão da pista.",
    credito: "Duda",
    permissao: true,
    largura: 3456,
    altura: 5184,
    baseDaPermissao: "sem-pessoa-identificavel",
  },
  {
    src: "/galeria/2026/cauet-dsc09982-640w.webp",
    srcGrande: "/galeria/2026/cauet-dsc09982-1600w.webp",
    alt: "Skatista no ar sobre um corrimão verde, com o skate virando sob os pés e uma tenda laranja ao fundo.",
    credito: "Cauet",
    creditoUrl: "https://www.instagram.com/cauetista/",
    permissao: true,
    largura: 1714,
    altura: 3047,
    baseDaPermissao: "termo-inscrito",
  },
  {
    src: "/galeria/2026/duda-img0451-640w.webp",
    srcGrande: "/galeria/2026/duda-img0451-1600w.webp",
    alt: "Público sentado e em pé sob a tenda vermelha da De la Crew, ao lado da pista.",
    credito: "Duda",
    permissao: true,
    largura: 4300,
    altura: 2867,
    baseDaPermissao: "autorizacao-avulsa",
  },
  {
    src: "/galeria/2026/duda-img0887-640w.webp",
    srcGrande: "/galeria/2026/duda-img0887-1600w.webp",
    alt: "Sacolas da Over Street sobre shapes de skate enfileirados na pista, com grafite ao fundo.",
    credito: "Duda",
    permissao: true,
    largura: 5184,
    altura: 3456,
    baseDaPermissao: "sem-pessoa-identificavel",
  },
  {
    src: "/galeria/2026/victor-647-640w.webp",
    srcGrande: "/galeria/2026/victor-647-1600w.webp",
    alt: "Silhueta de uma pessoa apoiada no corrimão contra o céu do pôr do sol.",
    credito: "Victor",
    permissao: true,
    largura: 4000,
    altura: 6000,
    baseDaPermissao: "sem-pessoa-identificavel",
  },
  {
    src: "/galeria/2026/cauet-084-640w.webp",
    srcGrande: "/galeria/2026/cauet-084-1600w.webp",
    alt: "Skatista de camiseta preta e calça branca no ar, com o skate sob os pés, na pista de Brazlândia com grafites e o público sob as tendas ao fundo.",
    credito: "Cauet",
    creditoUrl: "https://www.instagram.com/cauetista/",
    permissao: true,
    largura: 2608,
    altura: 4636,
    baseDaPermissao: "termo-inscrito",
  },
];
