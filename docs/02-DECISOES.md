# Braz Skate — Registro de Decisões e Pendências

> **STATUS: DOCUMENTO VIVO — SUJEITO A REVISÃO.**
> Nada aqui é definitivo até a reunião com a Administração Regional.
> Ao revisar uma decisão, não apague: mova para "Decisões revisadas" com data
> e motivo, para manter o histórico.
> Última atualização: 24/07/2026.

## Decisões tomadas

| # | Decisão | Racional | Data |
|---|---------|----------|------|
| D16 | UIEMAPV confirmou o escopo que vai fornecer, a princípio: **água, tenda, som, fechamento da rua, mesa de frios e frutas, e premiação (medalhas e troféu)**. Fica sob responsabilidade da ASB: regulamento completo, formulário de inscrição + termo de responsabilidade/autorização de menor, programação do dia, captação de patrocínio (complementar) e estratégia de divulgação | Elabora D12 (responsabilidade geral de estrutura/premiação) com o escopo concreto confirmado pelo instituto; avança P3 e P4, mas não os fecha — quantidades/valores específicos ainda a alinhar | 24/07/2026 |
| D15 | Conversa (não reunião formal) entre ASB, Administração Regional e instituto parceiro definiu: **divisão de responsabilidades** (Administração + instituto: estrutura, premiação; ASB: site, artes, divulgação, patrocínios), **espaço do evento garantido** (inclui fechamento de rua) e **datas previstas** — evento 22/08, inscrição 01/08 — **sujeitas a mudança** (não são compromisso formal) | Destrava P2 e dá base de conteúdo à sub-etapa V1.1, sem travar a data | 24/07/2026 |
| D14 | Direção de design travada: estética street com acabamento institucional — texturas de spray/grão, sticker badges (placeholders viram stickers), registros duplos (asfalto escuro / concreto claro); tipografia **Anton (display) + Archivo (texto)**; **sem WebGL no MVP** — GSAP core + ScrollTrigger apenas (plano completo em `05-DESIGN.md`, roadmap em `04-ROADMAP-MVP.md`) | Identidade própria com custo de performance controlado; three.js rejeitado, shader OGL fica como candidato de v1 | 16/07/2026 |
| D13 | Organização de componentes: separação primária é **conteúdo (MDX/JSON em `content/` e `data/`) × apresentação (componentes)**, com Server Components estáticos como padrão. Componentes com interatividade de cliente (ex.: menu mobile, copiar Pix) aplicam Container/Presenter: estado e eventos extraídos para um Custom Hook (`useX`) quando a lógica crescer, mantendo a visão pura | Preserva organização e manutenibilidade sem forçar `"use client"` num site SSG (`output: 'export'`) nem afetar requisitos | 16/07/2026 |
| D12 | Estrutura e premiação do evento ficam sob responsabilidade do instituto/ONG parceiro **UIEMAPV** ([@uiemapvsocial](https://www.instagram.com/uiemapvsocial)) | Parceria institucional viabiliza infraestrutura e premiação sem depender só de captação da ASB | 16/07/2026 |
| D1 | Inscrição em **modelo híbrido**: pré-inscrição online + cota presencial no dia | Base de planejamento (nº por categoria) + coleta antecipada de termo/autorização de menores, mantendo inclusão de quem só aparece no dia | 07/07/2026 |
| D2 | Pré-inscrição via **formulário-serviço externo → planilha** (Tally ou Google Forms); **nenhum backend próprio** | <40 competidores, sem taxa; backend seria over-engineering e criaria carga de manutenção no período mais atarefado da organização | 07/07/2026 |
| D3 | **Apoio via Pix** (chave/QR estático) presente no site | Verba é o principal gargalo do evento; Pix estático tem custo zero de infra | 07/07/2026 |
| D4 | Hospedagem na **Vercel** (free tier), Next.js com geração estática (SSG) | Perfil técnico do mantenedor (Next/TS), zero servidor a manter, domínio custom possível depois | 07/07/2026 |
| D5 | **Sem resultados/chaveamento ao vivo** | Sem internet confiável na pista; risco alto e valor baixo. Resultados publicados de forma estática pós-baterias/evento | 07/07/2026 |
| D6 | Tom do site: **celebratório/institucional** | Não atritar com a Administração antes/depois da reunião; advocacy fica nos canais e documentos próprios | 07/07/2026 |
| D7 | Conteúdo editado **no repositório** (MDX/JSON + `git push`), sem CMS | Somente uma pessoa edita o site por enquanto | 07/07/2026 |
| D8 | Categorias: **iniciante, amador e feminino** (categoria própria) — sem categoria mirim | Baixa adesão esperada na faixa infantil não justifica categoria própria | 16/07/2026 |
| D9 | Premiação: **feminino = medalha + premiação para todas**; demais categorias = medalha para todos + premiação adicional ao top 3 | Valorização da participação feminina e da participação em geral | 07/07/2026 |
| D10 | Formulário coleta **data de nascimento** e exige responsável/autorização para menores em **qualquer categoria** | Menores não estão restritos a uma categoria específica; a obrigação legal segue a idade, não a categoria | 07/07/2026 |
| D11 | Domínio: `*.vercel.app` no MVP; avaliar compra de `.com.br` quando a data for confirmada | Não gastar antes de o evento ter data | 07/07/2026 |

## Pendências (bloqueadas pela reunião com a Administração)

| # | Pendência | Bloqueia o quê no site |
|---|-----------|------------------------|
| P1 | Data do evento | Countdown, página de inscrição aberta, compra de domínio. Há **previsão** (22/08) exibida como tal no site (V1.1), mas a pendência só fecha com data oficial |
| P3 | Infraestrutura — **UIEMAPV confirmou água, tenda, som e mesa de frios e frutas** (ver D16); banheiros e estimativa de público ainda a alinhar | FAQ, seção de estrutura do evento |
| P4 | Verba / patrocínio institucional — **UIEMAPV confirmou que vai entregar premiação, medalhas e troféu** (ver D16), mas os itens específicos (quantidade, o que exatamente) seguem não confirmados. Estrutura de itens cogitada, ver seção "Premiação — estrutura cogitada" abaixo | Valores da premiação no regulamento; lista de patrocinadores |
| P5 | Reparos na pista (iluminação, rachaduras) | Não bloqueia o site; afeta a data |
| P6 | Regulamento completo (faixas etárias, pontuação, formato de baterias, tamanho da cota presencial) | Página de regulamento; campos/validações finais do formulário |
| P7 | Composição da equipe ASB (funções/responsáveis) | Seção "quem somos" completa |

## Premiação — estrutura cogitada (NÃO confirmada)

> A princípio seria essa a premiação, mas os itens abaixo não estão
> confirmados — depende de patrocínio/verba (ver P4 e D12). A UIEMAPV
> confirmou que vai entregar premiação, medalhas e troféu em algum formato
> (D16, 24/07/2026), mas não esta lista específica. Não usar estes itens
> como definitivos em nenhuma peça do site; tratar como placeholder até
> confirmação.

- **1º lugar:** 2 shapes, calçado de skate, jogo de rolamento, lixa, blusa.
- **2º lugar:** 1 shape, calçado de skate, lixa, blusa.
- **3º lugar:** 1 shape, 1 calçado de skate.
- Mesma estrutura para todas as categorias, com mais foco (mais itens) na
  categoria amador.
- **Brincadeiras** (best trick, sorteio etc.): premiação à parte.
- Pool geral de prêmios avulsos: vários shapes, calçados, blusas,
  rolamentos, rodas, acessórios de skate.

## Pendências internas (não dependem da Administração)

| # | Pendência | Ação |
|---|-----------|------|
| I1 | Fotos do campeonato de 2021 | Garimpar com a comunidade (celulares, grupos de WhatsApp) ANTES que se percam. Registrar autoria/permissão de uso |
| I2 | Fotos próprias da pista para o hero | A foto de referência disponível tem marca d'água de terceiro ("Nossos Roteiros") e NÃO pode ser usada no site. Produzir fotos próprias ou obter permissão expressa |
| I3 | Texto do termo de responsabilidade + autorização de menor | Rascunhar e validar com alguém de confiança jurídica antes de abrir a pré-inscrição |
| I4 | Chave Pix oficial da ASB | Definir titularidade (idealmente CNPJ/conta da associação, se existir) e gerar QR |
| I5 | Identidade visual mínima (logo ASB/evento, paleta) | Necessária para o MVP ter cara própria |
| I6 | Mini media-kit de patrocínio | ~~Conteúdo da página "seja um patrocinador"~~ Conteúdo-base pronto em `docs/media-kit-braz-skate.md` (16/07/2026); falta só adaptar para a página `/patrocinio` |
| I7 | Confirmação pública da parceria UIEMAPV | O site **não menciona o instituto** até o ok formal dele; quando confirmado, incluir na página de patrocínio |

## Decisões revisadas

- **D8 (categorias)** — versão anterior (07/07/2026): "Categorias: mirim,
  iniciante, amador e feminino (categoria própria)". Revisado em 16/07/2026:
  categoria mirim removida — baixa adesão esperada na faixa infantil não
  justifica categoria própria. Categorias atuais: iniciante, amador,
  feminino.

## Pendências resolvidas

- **P2 (autorização de espaço / fechamento de rua)** — resolvida em
  24/07/2026: espaço do evento garantido, incluindo fechamento de rua, via
  conversa com a Administração e o instituto parceiro (ver D15).
