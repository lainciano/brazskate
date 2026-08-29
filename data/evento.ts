// Fonte única de tudo que muda no evento (data, local, e-mail) — ver
// docs/04-ROADMAP-V1.md (V1.1) e a spec em
// docs/superpowers/specs/2026-07-17-info-basica-data-local-contato-design.md.
// Data do evento CONFIRMADA pela Administração/ASB em 30/07/2026 (D24) — não
// é mais previsão, ainda que sujeita a alteração de última hora. Revisada
// para 13/09/2026 em reunião de 06/08/2026 (D34, docs/02-DECISOES.md).
// Histórico da inscrição: aberta desde D29/D32 (31/07/2026), só online (a
// cota presencial no dia foi descontinuada por D42). O prazo era 30/08/2026
// (D42, 07/08/2026); no fim do prazo o Lain encerrou o formulário Tally no
// painel e as inscrições foram encerradas em definitivo (D54, 29/08/2026).
// `inscricoesAbertas: false` significa agora esse encerramento definitivo —
// não a pausa reversível de D46/D47. Os campos `dataFechamentoInscricoes*`
// abaixo ficam só como referência histórica; nenhuma copy nova deve tratá-los
// como prazo futuro.

export const evento = {
  // encerramento definitivo das inscrições (D54) — false = inscrições
  // encerradas no site inteiro; deixou de ser a trava reversível de D46/D47
  inscricoesAbertas: false,
  // data canônica (textos longos: seção de local, futura página cheia)
  dataPrevista: "13 de setembro de 2026",
  // forma curta (mesmo dado, formatado para caber no sticker do hero)
  dataPrevistaCurta: "13 de setembro",
  // forma legível por máquina (V1.5, countdown) — mesmo dado de
  // dataPrevista acima; não é derivada nem deriva as strings de exibição,
  // trocar a data é editar os dois tipos de campo aqui
  dataPrevistaISO: "2026-09-13",
  // prazo que a inscrição online teve (D42) — mantido só como referência
  // histórica; inscrições encerradas em definitivo por D54, não é prazo futuro
  dataFechamentoInscricoes: "30 de agosto de 2026",
  dataFechamentoInscricoesCurta: "30 de agosto",
  dataFechamentoInscricoesISO: "2026-08-30",
  local: {
    nome: "Skate Park Brazlândia",
    coordenadas: { lat: -15.6824327, lng: -48.1982567 },
    mapsUrl: "https://maps.app.goo.gl/NkqhC382eUqRwyYM7",
  },
  email: "associacaoskatebrazlandia@gmail.com",
} as const;

// URL de embed do Google Maps derivada das coordenadas (nunca hardcoded) —
// se o local mudar, só troca `evento.local.coordenadas`.
export function mapaEmbedUrl(coord: { lat: number; lng: number }): string {
  return `https://www.google.com/maps?q=${coord.lat},${coord.lng}&output=embed`;
}
