# GSAP avançado · sub-etapa 1 — Implementation Plan

**Goal:** substituir `power3.out`/`back.out(1.7)` genéricos por duas eases
próprias do projeto (CustomEase `tintaSeca`, CustomWiggle `carimbada`) e
trocar o cálculo manual de `strokeDashoffset` do rabisco do hero por
`DrawSVGPlugin`, estendendo o mesmo tratamento ao sublinhado do
`SectionHeader` (que hoje só desliza no scroll, não se desenha).

**Architecture:** Todos os plugins novos entram pelo mesmo lazy-init já
existente em `lib/motion.ts` (`useMotion`), dentro do `requestIdleCallback`,
registrados uma vez junto com `ScrollTrigger`. Nenhum componente importa
plugin diretamente — todos consomem via `gsap.fromTo/from/to` com a
propriedade (`drawSVG`) ou ease (`"tintaSeca"`, `"carimbada"`) já
registrada globalmente.

**Tech Stack:** Next.js 16, TypeScript strict, `gsap@3.15.0` (já instalado,
plugins inclusos no pacote — nenhuma dependência nova).

## Global Constraints

- **Guardrails de `05-DESIGN.md` §6.2 continuam valendo integralmente**
  (D23 amplia plugins, não afrouxa nada): `prefers-reduced-motion` via
  `gsap.matchMedia`, só `transform`/`opacity`/SVG stroke, lazy-init depois
  da hidratação, sem `pin`/`scrub` pesado, orçamento de performance §6.4.
- **Zero dependência nova** — os plugins já estão em `node_modules/gsap/`.
- **Substituição, não adição de sensação:** o rabisco do hero mantém
  `power2.out`/timing atuais; só troca o mecanismo (DrawSVG em vez de
  cálculo manual).
- **Sem mudança de comportamento sob `prefers-reduced-motion`** — os
  plugins novos entram dentro do `mm.add(...)` já existente.
- **Commits:** Conventional Commits, descrição em português.

## Prerequisites (base branch)

Branch `feat/gsap-fundacao-motion` a partir de `dev` (branch atual,
working tree limpo). Há um `pnpm dev` rodando no diretório principal —
usar `git worktree` para não corromper o cache de HMR dele.

## File Structure

- **Modify** `lib/motion.ts` — importar e registrar `CustomEase`,
  `DrawSVGPlugin`, `CustomWiggle`; criar `tintaSeca` e `carimbada` uma vez
  por montagem; atualizar comentário de escopo (D23).
- **Modify** `components/hero.tsx` — trocar `power3.out` → `"tintaSeca"`
  (timeline default, selo, faixa); trocar `back.out(1.7)` → `"carimbada"`
  (sticker); substituir cálculo manual de `strokeDashoffset` por
  `drawSVG`.
- **Modify** `components/reveal.tsx` — trocar `power3.out` → `"tintaSeca"`
  (`data-reveal`, `data-stencil`); trocar `back.out(1.7)` → `"carimbada"`
  (`data-carimbo`); novo bloco `data-rabisco` com `drawSVG`.
- **Modify** `components/section-header.tsx` — adicionar `data-rabisco` no
  `<span>` que envolve `RabiscoSublinhado` (mantém `data-parallax`).
- **Modify** `docs/05-DESIGN.md` — §6.2: registrar os nomes das eases
  (`tintaSeca`, `carimbada`) para reuso futuro, evitando reinvenção em
  sub-etapas seguintes.
- **Modify** `docs/04-ROADMAP-V1.md` — nova entrada V1.9 (GSAP avançado —
  fundação de motion), atualizar "Ordem sugerida" e tabela transversal.
- **Create** `docs/superpowers/specs/2026-07-26-gsap-fundacao-motion-design.md`
  — spec da sub-etapa (já criada nesta sessão).

## Tarefas

- [ ] 1. Criar branch `feat/gsap-fundacao-motion` a partir de `dev` (via
      worktree, dev server ativo).
- [ ] 2. `lib/motion.ts`: importar/registrar `CustomEase`, `DrawSVGPlugin`,
      `CustomWiggle`; criar eases `tintaSeca` (`"0.16, 1, 0.3, 1"`) e
      `carimbada` (`{ type: "easeOut", wiggles: 3 }`); atualizar comentário
      de escopo.
- [ ] 3. `components/hero.tsx`: trocar eases (`tintaSeca`/`carimbada`) e
      substituir cálculo manual de stroke por `drawSVG`.
- [ ] 4. `components/reveal.tsx`: trocar eases e adicionar bloco
      `data-rabisco` com `drawSVG`.
- [ ] 5. `components/section-header.tsx`: adicionar `data-rabisco` no span
      do rabisco.
- [ ] 6. Atualizar `docs/05-DESIGN.md` §6.2 com os nomes das eases.
- [ ] 7. Atualizar `docs/04-ROADMAP-V1.md` (V1.9, ordem sugerida, tabela
      transversal).
- [ ] 8. Rodar `pnpm lint` + `pnpm typecheck` + `pnpm build`; corrigir o
      que quebrar; anotar tamanho do chunk de motion.
- [ ] 9. Verificação estática: grep confirma zero `power3.out`/
      `back.out(1.7)` residual nos arquivos tocados; grep confirma zero
      `getTotalLength` residual em `hero.tsx`.
- [ ] 10. Abrir PR `feat/gsap-fundacao-motion` → `dev`, com resultado de
      lint/typecheck/build na descrição e nota de que o teste visual em
      celular real fica pendente (sem Chrome no ambiente de execução).

## Verificação final da sub-etapa

- `tintaSeca`/`carimbada` substituem toda ocorrência de `power3.out`/
  `back.out(1.7)` no escopo tocado.
- Rabisco do hero e sublinhado do `SectionHeader` usam `DrawSVGPlugin`
  (zero `getTotalLength` manual).
- `pnpm lint`/`typecheck`/`build` limpos.
- Nenhuma mudança de comportamento sob `prefers-reduced-motion`.
