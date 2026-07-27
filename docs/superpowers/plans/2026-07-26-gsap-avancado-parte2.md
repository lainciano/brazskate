# GSAP avançado · sub-etapa 2 — Implementation Plan

**Goal:** fechar os itens 4–9 da spec ampla — SplitText (lead), Flip (menu
mobile), MorphSVG (chevron do FAQ), ScrambleText (sticker "em breve"),
ScrollSmoother (header fora do wrapper, D23.1) e o ajuste de
posição/tamanho do selo do hero. Ver decisões técnicas em
`docs/superpowers/specs/2026-07-26-gsap-avancado-parte2-design.md`.

**Tech Stack:** `gsap@3.15.0` (plugins já no pacote, zero dependência
nova). Next.js 16, TypeScript strict.

## Global Constraints

- Guardrails §6.2/D23 herdados integralmente (reduced-motion,
  transform/opacity/clip-path/SVG-stroke, lazy-init, sem pin/scrub pesado).
- ScrollSmoother é a única exceção documentada (D23.1) — precisa desligar
  **completamente** sob `prefers-reduced-motion`.
- Zero dependência nova.
- Commits: Conventional Commits, um por item, descrição em português.

## Prerequisites

Branch `feat/gsap-avancado-parte2` a partir de `dev` (worktree separado,
`pnpm dev` ativo no diretório principal).

## Tarefas

- [x] 1. Criar branch + spec.
- [x] 2. `lib/motion.ts`: registrar `SplitText`, `MorphSVGPlugin`,
      `ScrambleTextPlugin` no lazy-init; exportar `carregarFlip()` para
      import sob demanda (menu não usa `useMotion` diretamente).
- [x] 3. `components/section-header.tsx` + `components/reveal.tsx`:
      `data-split-lead` no `<p>` do lead; SplitText por palavra após
      `document.fonts.ready`. **Verificado:** `aria-label` com o texto
      completo no `<p>`, `aria-hidden` nas palavras — a11y automática do
      SplitText confirmada via Playwright.
- [x] 4. `hooks/use-menu-overlay.ts` + `components/header.tsx`: Flip do
      hambúrguer para o overlay ao abrir. **Verificado:** overlay abre em
      tela cheia, `opacity: 1`, zero erro no console (viewport mobile).
- [x] 5. `components/faq.tsx`: chevron com MorphSVG (`+`/`−`) no evento
      `toggle` do `<details>`. **Verificado:** `d` do path muda de
      `"M8 3v10M3 8h10"` (fechado) para `"M3 8h10"` (aberto) no clique.
- [x] 6. `components/sticker-badge.tsx` (ou `reveal.tsx`, `data-carimbo`
      já existente): ScrambleText no texto do sticker `breve` ao entrar.
      **Verificado:** texto assenta corretamente ("Detalhes em breve",
      "Em breve") depois do reveal.
- [x] 7. `components/smooth-scroll.tsx` (novo) + `app/page.tsx`:
      ScrollSmoother com header fora do wrapper (D23.1). **Verificado:**
      header continua `sticky`/fixo no topo depois de scroll; navegação
      por âncora (`href="#categorias"`) chega exatamente na seção.
- [x] 8. `components/hero.tsx`: ajustar posição do selo
      (`-right-[16vw]`→`-right-[6vw]`, `-bottom-[34vw]`→`-bottom-[24vw]`).
      **Verificado:** bounding box do selo agora cruza ~795×592px da
      coluna de conteúdo (era quase zero antes do ajuste).
- [x] 9. `pnpm lint` + `typecheck` + `build`. Todos limpos.
- [x] 10. Verificação com Playwright/Firefox: menu abre com Flip, header
       continua sticky com ScrollSmoother ativo, chevron morfa, scramble
       assenta, SplitText acessível, sem erro no console. Duas checagens
       iniciais deram falso positivo (ScrambleText "travado", chevron sem
       morph) por causa do `scrollIntoView()` do próprio script de teste
       brigando com o ScrollSmoother — reproduzido isoladamente e
       confirmado que era o teste, não o site.
- [x] 11. Abrir PR `feat/gsap-avancado-parte2` → `dev`.

## Pronto quando

Ver §8 da spec.
