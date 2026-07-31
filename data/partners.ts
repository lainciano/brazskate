// Fonte única de parceiros institucionais — ver docs/02-DECISOES.md (D12,
// D18) e docs/estrategia-confirmacao-uiemapv.md. I7 resolvida em 30/07/2026:
// logo recebida (public/logo-uiemapv.jpg, master em docs/assets/logos/) e
// link oficial confirmado.

export const institutionalPartners = [
  {
    id: "uiemapv",
    nome: "UIEMAPV",
    descricao:
      "Responsável pela estrutura, infraestrutura e premiação do evento.",
    instagram: "uiemapvsocial",
    logoSrc: "/logo-uiemapv.jpg",
  },
] as const;

export type Partner = (typeof institutionalPartners)[number];
