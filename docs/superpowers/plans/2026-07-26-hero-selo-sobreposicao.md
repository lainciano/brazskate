# Hero — selo sobrepondo o conteúdo · Implementation Plan

**Goal:** corrigir o bug de stacking que fazia o `z-10` do selo do hero não
ter efeito nenhum contra o `<div>` de conteúdo (título/sticker/CTAs) — o
selo sempre ficava atrás, mesmo com `z-10` no filho interno, porque o
wrapper que o envolve não tinha `z-index` próprio. Ver diagnóstico completo
em `docs/superpowers/specs/2026-07-26-hero-selo-sobreposicao-design.md`.

**Architecture:** `components/hero.tsx` — mover `z-10` do filho
`[data-hero-selo]` para o wrapper (`pointer-events-none absolute inset-0`),
e dar `z-20` explícito ao `<div>` de conteúdo. Ambos filhos diretos da
`<section>` (mesmo contexto de empilhamento) — conteúdo sempre vence,
garantindo contraste sem precisar de máscara SVG.

**Tech Stack:** classes Tailwind (`z-10`/`z-20`), sem lib nova.

## Global Constraints

- `pointer-events-none` no wrapper do selo continua obrigatório.
- Nenhuma propriedade de layout anima — mudança é `z-index` estático.
- Posição/tamanho do selo não mudam nesta correção (bug era de
  empilhamento, não de geometria) — ajuste fino fica para depois da
  conferência visual humana.
- Commits: Conventional Commits, descrição em português.

## Prerequisites (base branch)

Branch `feat/hero-selo-sobreposicao` a partir de `dev` (worktree separado do
PR #46, que só mexeu em eases/motion, não em stacking).

## File Structure

- **Modify** `components/hero.tsx` — `z-10` no wrapper do selo, `z-20` no
  `<div>` de conteúdo.
- **Create** `docs/superpowers/specs/2026-07-26-hero-selo-sobreposicao-design.md`
  — spec desta correção (já criada).

## Tarefas

- [x] 1. Criar branch `feat/hero-selo-sobreposicao` a partir de `dev`.
- [x] 2. Escrever spec do diagnóstico e da correção.
- [x] 3. `components/hero.tsx`: mover `z-10` para o wrapper do selo/faixa;
      `z-20` no `<div>` de conteúdo.
- [x] 4. Rodar `pnpm lint` + `pnpm typecheck` + `pnpm build`. **Resultado:**
      todos limpos.
- [x] 5. Abrir PR `feat/hero-selo-sobreposicao` → `dev`, com nota explícita
      de que a conferência visual (o quanto o selo cruza o texto, se o
      grau de sobreposição está bom) fica pendente de QA humana.
      **PR #47, mergeado em `dev` e promovido a `main` via PR #48
      (26/07/2026).** Ajuste fino de posição/tamanho do selo continua na
      sub-etapa 2 (itens 4-9 da spec ampla).

## Verificação final

- `z-index` do wrapper do selo/faixa (10) e do `<div>` de conteúdo (20)
  explícitos e comparáveis.
- `pnpm lint`/`typecheck`/`build` limpos.
- Pendente: QA visual humana (sem Chrome neste ambiente).
