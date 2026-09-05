// Fonte única de parceiros institucionais. Atualmente vazio — a parceria
// com a UIEMAPV foi retirada do site a pedido da organização.

export type Partner = {
  id: string;
  nome: string;
  descricao: string;
  instagram: string;
  logoSrc: string;
};

export const institutionalPartners: readonly Partner[] = [];
