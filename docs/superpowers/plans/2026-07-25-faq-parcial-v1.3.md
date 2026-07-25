# V1.3 · FAQ parcial — Implementation Plan

**Goal:** Seção de FAQ na home respondendo só o que já tem resposta real
hoje (taxa, categorias, o que levar, acompanhantes/público), com perguntas
pendentes do regulamento marcadas "em breve" — nunca inventadas.

**Architecture:** Site estático Next.js (`output: 'export'`). Nova fonte
única `data/faq.ts` (mesmo molde de `data/categories.ts`); novo componente
`components/faq.tsx` segue o esqueleto canônico de seção concreto (`Reveal`
+ `SectionHeader` + lista com `data-reveal`); novo padrão de disclosure
`<details>`/`<summary>` nativo, documentado em `05-DESIGN.md` §3.6-bis.

**Tech Stack:** Next.js 16, TypeScript strict, Tailwind CSS v4. Sem novas
dependências.

## Global Constraints

- **Stack travada:** `output: 'export'`, sem backend, sem novas
  dependências (descarta MDX — ver spec, seção "Não entra").
- **Disciplina de placeholder** (`AGENT.md`): perguntas sem resposta
  confirmada usam `resposta: null` → `StickerBadge` variante `breve`,
  nunca texto inventado.
- **Fonte única:** `data/faq.ts` é a única fonte das perguntas; componente
  nunca hardcoda pergunta/resposta.
- **Design:** reusar `SectionHeader` (§3.3), `Reveal` (§6.1),
  `StickerBadge` (§3.6), tokens `rounded-card`/`shadow-card` (§2.3),
  registro `registro-concreto` (§2.1). Disclosure é padrão novo (§3.6-bis),
  documentado para reuso futuro.
- **Motion:** só a entrada da lista via `Reveal`/`data-reveal`
  (stagger existente); abrir/fechar o `<details>` não anima (guardrail
  §6.2 — motion novo restrito ao escopo GSAP já aprovado).
- **Acessibilidade:** `<details>`/`<summary>` nativos (foco, teclado,
  estado aberto/fechado de fábrica); sticker "em breve" é texto real no
  DOM.
- **Commits:** Conventional Commits, descrição em português.

## Prerequisites (base branch)

Branch `feat/faq-parcial-v1.3` a partir de `dev` (`78258c8`, V1.1 mergeada
via PR #30). Working tree limpo — V1.2 já foi revertida e limpa antes desta
sessão.

## File Structure

- **Create** `data/faq.ts` — 7 perguntas `as const`; `resposta: string | null`.
- **Create** `components/faq.tsx` — seção `<section id="faq">`, chevron SVG
  local (`IconeChevron`), `<details>` por item.
- **Modify** `app/page.tsx` — inserir `<Faq />` entre `<Categorias />` e
  `<PatrocinioResumo />`.
- **Modify** `docs/02-DECISOES.md` — nova linha D16 (conteúdo do FAQ
  confirmado pelo mantenedor).
- **Modify** `docs/04-ROADMAP-V1.md` — V1.2 marcada rejeitada; V1.3 marcada
  em implementação; "Ordem sugerida" atualizada.
- **Modify** `docs/05-DESIGN.md` — nova subseção §3.6-bis (padrão de
  disclosure).
- **Create** `docs/superpowers/specs/2026-07-25-faq-parcial-v1.3-design.md`
  — spec da sub-etapa.

## Tarefas

- [x] 1. Criar branch `feat/faq-parcial-v1.3` a partir de `dev`.
- [x] 2. Criar `data/faq.ts` com as 7 perguntas (4 respondidas + 3 "em breve").
- [x] 3. Criar `components/faq.tsx` reusando `SectionHeader`/`Reveal`/`StickerBadge`,
      com `<details>`/`<summary>` nativo e chevron SVG local.
- [x] 4. Inserir `<Faq />` em `app/page.tsx` entre Categorias e Patrocínio.
- [x] 5. Registrar D16 em `docs/02-DECISOES.md` com o conteúdo confirmado.
- [x] 6. Atualizar `docs/04-ROADMAP-V1.md` (V1.2 rejeitada, V1.3 em
      implementação, ordem sugerida).
- [x] 7. Documentar o padrão de disclosure em `docs/05-DESIGN.md` §3.6-bis.
- [x] 8. Escrever spec da sub-etapa (`docs/superpowers/specs/2026-07-25-faq-parcial-v1.3-design.md`).
- [ ] 9. Rodar `pnpm lint` + `pnpm typecheck` + `pnpm build`; corrigir o que
      quebrar.
- [ ] 10. Testar manualmente: teclado (Tab + Enter/Espaço abre/fecha),
      largura mobile e ~1366×768 (mesma largura onde a V1.2 falhou), sem
      sobreposição/corte.
- [ ] 11. Abrir PR `feat/faq-parcial-v1.3` → `dev`, com resultado de
      lint/typecheck/build/Lighthouse na descrição.

## Verificação final da sub-etapa

- FAQ lê bem no celular e em ~1366×768.
- Nenhuma resposta pendente aparece com texto inventado — só sticker
  "em breve".
- Acrescentar/editar pergunta é mexer só em `data/faq.ts`.
- `pnpm lint`/`typecheck`/`build` limpos; Lighthouse mobile dentro do
  orçamento de `05-DESIGN.md` §6.4.
