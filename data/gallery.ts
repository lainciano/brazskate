// Fonte única da galeria (V1.7, docs/04-ROADMAP-V1.md) — schema pronto para
// ativar, sem foto real ainda (I1/I2 seguem abertas). O portão de direito de
// imagem (AGENT.md, "Restrição de imagem") vira erro de compilação:
// `permissao` só aceita o literal `true`, então nenhuma foto entra no array
// sem permissão registrada. Nenhum componente lê este arquivo ainda — a
// regra do roadmap contra casca vazia (05-DESIGN.md §4.3) proíbe criar
// componente/página de galeria antes de ter foto real para mostrar.

export type FotoGaleria = {
  src: string;
  alt: string;
  credito: string; // obrigatório — quem tirou/cedeu a foto
  permissao: true; // literal: `permissao: false` não compila
  legenda?: string;
};

export const galeria: readonly FotoGaleria[] = [];
