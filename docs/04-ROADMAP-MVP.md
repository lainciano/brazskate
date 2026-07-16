# Braz Skate — Roadmap do MVP

> **STATUS: APROVADO (design-system-first).**
> Roadmap aprovado pelo Lain em 16/07/2026 e revisado no mesmo dia para a
> abordagem design-system-first, após o plano de design (`05-DESIGN.md`).
> Última atualização: 16/07/2026.

## Regras do jogo (valem para todos os PRs)

- Uma unidade de trabalho por PR; branch sempre a partir de `dev`
  (fluxo completo em `CONTRIBUTING.md`).
- **Disciplina de placeholder** (`AGENT.md`): nada de data, regulamento ou
  premiação inventados — pendências aparecem como sticker
  (`05-DESIGN.md` §1.2 e §3.6).
- Cada PR de implementação roda `pnpm lint`, `pnpm typecheck`,
  `pnpm build` e Lighthouse mobile local, anotando o resultado na
  descrição (orçamento em `05-DESIGN.md` §6.4).
- A coluna **"Consome do design"** diz onde consultar antes de codar —
  na dúvida, o `05-DESIGN.md` ganha de memória/achismo.

## Sequência de PRs

### PR 0 · `chore/deploy-vercel` — deploy contínuo

Linkar o repositório à Vercel: produção em `main`, preview por PR.
**Requer ação do Lain** (login/link na Vercel). Depois do link, promover
`dev` → `main` via PR para o primeiro deploy real.

- Consome do design: nada.
- Pronto quando: `*.vercel.app` servindo a home atual do bootstrap.

### PR 1 · `feat/fundacao-design` — fundação completa do design system

O PR mais importante do MVP: entrega os tokens E os componentes-base que
todos os PRs seguintes consomem, para ninguém reinventar padrão depois.

Entregáveis:
- `app/globals.css` com o `@theme` completo (cores, radii, sombras) —
  transcrição direta de `05-DESIGN.md` §2.
- Fontes Anton + Archivo via `next/font` (subsets, fallbacks, swap).
- Componentes-base: Botão (3 variantes), StickerBadge, SectionHeader,
  Header/nav (com overlay mobile), Footer, utilitários Rabiscos e Grão.
- GSAP instalado com setup de `matchMedia` (reduced-motion) pronto.
- Página `/styleguide` (não linkada, `noindex`) exibindo tokens e
  componentes em ambos os registros — é onde o PR é revisado visualmente
  e onde o Lino consulta o padrão vivo.

- Consome do design: §2 (tokens), §3 (componentes), §6.2 (setup GSAP).
- Pronto quando: `/styleguide` renderiza tudo, contraste AA verificado
  com ferramenta, foco visível em tudo, orçamento de fontes respeitado.

### PR 2 · `feat/home-hero-sobre` — hero + seção sobre

- Hero cartaz 100% gráfico com slot de foto preparado
  (`05-DESIGN.md` §4.1–4.2): display Anton, sticker "DATA A CONFIRMAR",
  3 CTAs, fundo tinta + grão + formas.
- Seção sobre: história (anos 2000, campeonato de 2021, ASB — base em
  `docs/ASB.md` e `docs/01-CONTEXTO.md`), tom caloroso, sem slots de
  foto vazios.
- Motion de entrada do hero e da seção (§6.1), com reduced-motion.

- Consome do design: §1.5 (tom), §3.1/3.3/3.6, §4, §6.1.
- Pronto quando: home com hero + sobre navegável no celular (360px),
  animações dentro dos guardrails, Lighthouse dentro do orçamento.

### PR 3 · `feat/home-categorias-premiacao` — categorias

- Seção de categorias lendo de `data/categories.ts` (iniciante, amador,
  feminino — SEM mirim).
- Regras de premiação decididas (D9); itens cogitados de premiação
  **não aparecem** — sticker "detalhes do regulamento em breve".

- Consome do design: §3.4 (card), §3.6 (sticker), §1.5 (tom).
- Pronto quando: alterar `categories.ts` reflete na home sem tocar em
  componente.

### PR 4 · `feat/home-patrocinio-pix-contato` — seções finais da home

- Resumo de patrocínio: texto curto + CTA para `/patrocinio` (sem grade
  de logos — v1). **Sem menção ao UIEMAPV até confirmação (I7).**
- Bloco Pix: gerar `public/pix-qr.png` a partir do payload em
  `docs/pix.md` (script one-off, sem dependência de runtime), botão
  copiar chave com estados.
- Contato: Instagram `@brazskate` + WhatsApp (`wa.me/5561995099761`).
  Sem e-mail (não existe — não inventar).
- Footer completo.

- Consome do design: §3.7 (Pix), §3.8 (footer), §3.1, §1.5.
- Pronto quando: chave Pix copia e QR escaneia (testar com app de banco
  real), links de contato abrem certo no celular.

### PR 5 · `feat/pagina-patrocinio` — media-kit

- Página `/patrocinio`: por que apoiar (alcance DF e entorno, público,
  visibilidade), formas de apoio (verba, produtos de premiação,
  estrutura, serviços), contato direto (WhatsApp).
- Conteúdo I6 não existe: **rascunhar copy no tom institucional e marcar
  o PR para revisão de conteúdo pelo Lain** antes do merge.

- Consome do design: §1.5 (tom confiável), §3.1/3.3, §2.
- Pronto quando: Lain aprovou o copy; página lê bem no celular.

### PR 6 · `feat/og-metadata` — divulgação

- `public/og.png` 1200×630 conforme spec de design (`05-DESIGN.md` §5),
  incluindo zona segura e teste de crop quadrado.
- Metadata completa (title/description/locale/Twitter card), favicon a
  partir do logo, `sitemap.xml` e `robots.txt`.

- Consome do design: §5 (integral).
- Pronto quando: prévia testada de verdade num chat de WhatsApp.

### PR 7 · `chore/revisao-final-mvp` — polimento e publicação

- Revisão de copy completa (tom celebratório/institucional, `AGENT.md`).
- Passada de acessibilidade (teclado, leitor de tela básico, contraste).
- Lighthouse final vs. orçamento (§6.4) registrado no PR.
- Teste real em celular (4G) — inclusive animações.
- Ao final: PR `dev` → `main` = **MVP publicado**, link pronto para a
  reunião com a Administração.

- Consome do design: §6.4 (orçamento), §1.4 (checklist do que evitar).

## Pendências externas mapeadas (não bloqueiam o MVP)

| Pendência | Afeta | Tratamento no MVP |
|---|---|---|
| I2 — foto própria da pista | Hero | Hero gráfico com slot (`05-DESIGN.md` §4) |
| I1 — fotos de 2021 | Sobre/galeria | Seção sobre só texto; galeria é v1 |
| I7 — confirmação UIEMAPV | Patrocínio | Sem menção até o ok do instituto |
| E-mail de contato | Contato | Só Instagram + WhatsApp |
| I3 — termo de responsabilidade | Inscrição (v1) | Fora do MVP |
| P1 — data do evento | Countdown (v1) | Sticker "data a confirmar" |

## Depois do MVP (v1 — visão, sem compromisso de ordem)

Countdown, regulamento, pré-inscrição (formulário externo + termo I3),
galeria (fotos I1 com créditos), FAQ, programação, patrocinadores
confirmados, avisos. Ver `03-SPEC-SITE.md` §3.2.
