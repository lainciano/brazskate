# FAQ parcial (V1.3)

> **STATUS: APROVADO — implementado na mesma sessão via plano de execução.**
> Sub-etapa do V1 (`docs/04-ROADMAP-V1.md`). Aprovado pelo Lain em
> 25/07/2026, depois da rejeição da V1.2 (corrimão do hero).

## Contexto e motivação

A V1.2 (silhueta de corrimão decorativa no hero) foi testada e **rejeitada**
em 25/07/2026: em telas de 1366×768 o SVG sobrepunha o texto do hero,
piorando a leitura. Os artefatos da tentativa foram removidos e a V1.2 sai
da fila de sub-etapas construíveis (ver `04-ROADMAP-V1.md`).

O roadmap já descrevia a V1.3 como a próxima sub-etapa construível: uma
seção de FAQ que só responde o que já tem resposta real hoje, sem inventar
conteúdo pendente do regulamento (P6 em `02-DECISOES.md`), seguindo a
política de placeholder do `AGENT.md`.

Duas perguntas do escopo original (`04-ROADMAP-V1.md`) não tinham resposta
documentada em nenhum lugar do repositório: "o que levar" e
"acompanhantes/público". Pela regra "perguntar em vez de inferir"
(`AGENT.md`), essas respostas foram confirmadas com o Lain durante o
brainstorming desta sessão e registradas como **D16** em `02-DECISOES.md`:

- **O que levar:** skate/patins, equipamento de segurança e documento de
  identificação para credenciamento.
- **Acompanhantes/público:** entrada livre, evento aberto à comunidade.
- **Perguntas que dependem do regulamento** (faixas etárias, cota
  presencial, chuva/adiamento): entram na lista com sticker **"em breve"**
  em vez de ficarem ocultas — segue a assinatura de placeholder do site
  (`05-DESIGN.md` §3.6).

## Escopo

**Entra:**
1. Seção FAQ na home, com 7 perguntas: 4 com resposta real (taxa,
   categorias, o que levar, acompanhantes/público) + 3 com sticker "em
   breve" (faixas etárias, cota presencial/inscrição no dia,
   chuva/adiamento).
2. Fonte única `data/faq.ts`, mesmo molde de `data/categories.ts`.
3. Novo padrão de disclosure `<details>`/`<summary>` nativo — não existia
   nenhum accordion no projeto antes desta sub-etapa. Documentado em
   `05-DESIGN.md` §3.6-bis para reuso futuro (regulamento, avisos).
4. Posicionamento: entre `<Categorias />` e `<PatrocinioResumo />` na home
   — perguntas de quem vai competir ficam perto do bloco de categorias.

**Não entra (fiel ao que o roadmap aprovado em 24/07/2026 nomeou):**
- "Estacionamento" — está na lista completa de tópicos do FAQ em
  `03-SPEC-SITE.md` §3.2 item 8, mas o roadmap da V1.3 não o incluiu nem
  entre as respondíveis nem entre as pendentes. Por disciplina de escopo,
  fica de fora desta leva — não é reintroduzido por inferência.
- MDX em `content/` como fonte de dados: cogitado no roadmap como
  alternativa a `data/faq.ts`, mas o projeto não tem nenhuma infraestrutura
  MDX hoje (sem `@next/mdx`, sem `pageExtensions` estendido) — adicionar
  isso só para uma leva pequena seria over-engineering. `data/faq.ts`
  segue o padrão já estabelecido por `data/categories.ts`/`data/evento.ts`.
- Animação de abrir/fechar do `<details>` — guardrail §6.2 restringe motion
  novo ao escopo GSAP já aprovado; o navegador já resolve isso de graça.
- Link de FAQ na navbar (`components/header.tsx`) — a navbar hoje só linka
  Categorias e Patrocínio, não é exaustiva; manter assim, sem inflar escopo.

## Fonte de dados: `data/faq.ts`

Array `as const` de `{ id, pergunta, resposta: string | null }`, tipo
derivado `FaqItem = (typeof faq)[number]`. `resposta: null` é o sinal para
o componente renderizar `StickerBadge` variante `breve` em vez de texto.

## Componente: `components/faq.tsx`

Esqueleto canônico de seção concreto (`Reveal` → `SectionHeader` →
lista com `data-reveal`), igual a `Categorias`/`Localizacao`. Cada item é
um `<details data-reveal>`: `<summary>` com a pergunta + chevron SVG que
rotaciona no estado aberto; corpo com `rounded-card`/`shadow-card`
(mesmos tokens do card de categoria). Detalhe completo do padrão de
disclosure em `05-DESIGN.md` §3.6-bis.

## Critério de pronto

- FAQ lê bem no celular e em ~1366×768 (mesma largura onde a V1.2 falhou),
  sem sobreposição/corte.
- Nenhuma resposta pendente aparece com texto inventado — só o sticker
  "em breve".
- Acrescentar/editar pergunta é mexer só em `data/faq.ts`.
- `<details>` operável por teclado (Tab + Enter/Espaço) e anunciado
  corretamente por leitor de tela (comportamento nativo do elemento).
- `pnpm lint` + `pnpm typecheck` + `pnpm build` limpos; Lighthouse mobile
  dentro do orçamento de `05-DESIGN.md` §6.4.
