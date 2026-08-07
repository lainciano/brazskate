// Fonte única de tudo que muda no evento (data, local, e-mail) — ver
// docs/04-ROADMAP-V1.md (V1.1) e a spec em
// docs/superpowers/specs/2026-07-17-info-basica-data-local-contato-design.md.
// Data do evento CONFIRMADA pela Administração/ASB em 30/07/2026 (D24) — não
// é mais previsão, ainda que sujeita a alteração de última hora. Inscrições
// abertas desde D29/D32 (31/07/2026) — os campos de "previsão de abertura"
// saíram daqui por não terem mais consumidor.

export const evento = {
  // data canônica (textos longos: seção de local, futura página cheia)
  dataPrevista: "13 de setembro de 2026",
  // forma curta (mesmo dado, formatado para caber no sticker do hero)
  dataPrevistaCurta: "13 de setembro",
  // forma legível por máquina (V1.5, countdown) — mesmo dado de
  // dataPrevista acima; não é derivada nem deriva as strings de exibição,
  // trocar a data é editar os dois tipos de campo aqui
  dataPrevistaISO: "2026-09-13",
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
