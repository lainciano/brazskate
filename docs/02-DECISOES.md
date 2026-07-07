# Braz Skate — Registro de Decisões e Pendências

> **STATUS: DOCUMENTO VIVO — SUJEITO A REVISÃO.**
> Nada aqui é definitivo até a reunião com a Administração Regional.
> Ao revisar uma decisão, não apague: mova para "Decisões revisadas" com data
> e motivo, para manter o histórico.
> Última atualização: 07/07/2026.

## Decisões tomadas

| # | Decisão | Racional | Data |
|---|---------|----------|------|
| D1 | Inscrição em **modelo híbrido**: pré-inscrição online + cota presencial no dia | Base de planejamento (nº por categoria) + coleta antecipada de termo/autorização de menores, mantendo inclusão de quem só aparece no dia | 07/07/2026 |
| D2 | Pré-inscrição via **formulário-serviço externo → planilha** (Tally ou Google Forms); **nenhum backend próprio** | <40 competidores, sem taxa; backend seria over-engineering e criaria carga de manutenção no período mais atarefado da organização | 07/07/2026 |
| D3 | **Apoio via Pix** (chave/QR estático) presente no site | Verba é o principal gargalo do evento; Pix estático tem custo zero de infra | 07/07/2026 |
| D4 | Hospedagem na **Vercel** (free tier), Next.js com geração estática (SSG) | Perfil técnico do mantenedor (Next/TS), zero servidor a manter, domínio custom possível depois | 07/07/2026 |
| D5 | **Sem resultados/chaveamento ao vivo** | Sem internet confiável na pista; risco alto e valor baixo. Resultados publicados de forma estática pós-baterias/evento | 07/07/2026 |
| D6 | Tom do site: **celebratório/institucional** | Não atritar com a Administração antes/depois da reunião; advocacy fica nos canais e documentos próprios | 07/07/2026 |
| D7 | Conteúdo editado **no repositório** (MDX/JSON + `git push`), sem CMS | Somente uma pessoa edita o site por enquanto | 07/07/2026 |
| D8 | Categorias: **mirim, iniciante, amador e feminino** (categoria própria) | Definição da organização | 07/07/2026 |
| D9 | Premiação: **feminino = medalha + premiação para todas**; demais categorias = medalha para todos + premiação adicional ao top 3 | Valorização da participação feminina e da participação em geral | 07/07/2026 |
| D10 | Formulário coleta **data de nascimento** e exige responsável/autorização para menores em **qualquer categoria** | Menores não estão restritos à mirim; a obrigação legal segue a idade, não a categoria | 07/07/2026 |
| D11 | Domínio: `*.vercel.app` no MVP; avaliar compra de `.com.br` quando a data for confirmada | Não gastar antes de o evento ter data | 07/07/2026 |

## Pendências (bloqueadas pela reunião com a Administração)

| # | Pendência | Bloqueia o quê no site |
|---|-----------|------------------------|
| P1 | Data do evento | Countdown, página de inscrição aberta, compra de domínio |
| P2 | Autorização de uso do espaço / fechamento de rua | Página "data e local" definitiva |
| P3 | Infraestrutura (banheiros, água, som, público) | FAQ, seção de estrutura do evento |
| P4 | Verba / patrocínio institucional | Valores da premiação no regulamento; lista de patrocinadores |
| P5 | Reparos na pista (iluminação, rachaduras) | Não bloqueia o site; afeta a data |
| P6 | Regulamento completo (faixas etárias, pontuação, formato de baterias, tamanho da cota presencial) | Página de regulamento; campos/validações finais do formulário |
| P7 | Composição da equipe ASB (funções/responsáveis) | Seção "quem somos" completa |

## Pendências internas (não dependem da Administração)

| # | Pendência | Ação |
|---|-----------|------|
| I1 | Fotos do campeonato de 2021 | Garimpar com a comunidade (celulares, grupos de WhatsApp) ANTES que se percam. Registrar autoria/permissão de uso |
| I2 | Fotos próprias da pista para o hero | A foto de referência disponível tem marca d'água de terceiro ("Nossos Roteiros") e NÃO pode ser usada no site. Produzir fotos próprias ou obter permissão expressa |
| I3 | Texto do termo de responsabilidade + autorização de menor | Rascunhar e validar com alguém de confiança jurídica antes de abrir a pré-inscrição |
| I4 | Chave Pix oficial da ASB | Definir titularidade (idealmente CNPJ/conta da associação, se existir) e gerar QR |
| I5 | Identidade visual mínima (logo ASB/evento, paleta) | Necessária para o MVP ter cara própria |
| I6 | Mini media-kit de patrocínio | Conteúdo da página "seja um patrocinador" (ver spec do site) |

## Decisões revisadas

_(vazio — registrar aqui qualquer decisão alterada, com data e motivo)_
