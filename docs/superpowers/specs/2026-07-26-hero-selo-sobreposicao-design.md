# Hero — selo sobrepondo o conteúdo (item 9, §5.1)

> **STATUS: APROVADO PARA IMPLEMENTAÇÃO.**
> Retomada em 26/07/2026: o Lain reportou, com print, que o selo continua
> sem sobrepor o título/sticker/CTA do hero (mesmo comportamento já
> registrado como não resolvido no PR #44, `2026-07-25-gsap-avancado-design.md`
> §5.1). Confirmado via `AskUserQuestion`: (1) deve sobrepor o texto/CTA do
> próprio hero; (2) intenção visual é "texto vazado" — onde o selo tocar
> texto/CTA, o texto sempre vence (nunca perde contraste).

## 1. Diagnóstico — por que o `z-10` de hoje não faz nada

`components/hero.tsx` (branch `dev`) tem:

```jsx
<div aria-hidden="true" className="pointer-events-none absolute inset-0">
  <div data-hero-selo className="... z-10 ..." style={{ maskImage: "url(/logo-pin.png)" }} />
  <div data-hero-faixa className="..." />
</div>
<Grao />
<div className="relative mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-20">
  {/* título, sticker, CTAs */}
</div>
```

O `z-10` está no `[data-hero-selo]` (filho), mas o **wrapper que o envolve não
tem `z-index`** (`z-index: auto`). Em CSS, `z-index` só é comparado entre
elementos do **mesmo contexto de empilhamento**. O wrapper participa do
contexto de empilhamento da `<section>` com `z-index: auto` — ou seja, ele
empilha conforme **ordem no DOM** contra os outros filhos diretos da seção
(`<Grao />`, o `<div>` de conteúdo), **não** conforme o `z-10` do seu filho
interno. Como o `<div>` de conteúdo vem **depois** no DOM e também tem
`z-index: auto`, ele vence por ordem de documento — o selo fica **sempre
atrás** do conteúdo, não importa o `z-10` interno.

Esse é o motivo raiz: o `z-10` nunca teve efeito nenhum contra o conteúdo.
O que o Lain viu no PR #44 provavelmente foi outra tentativa (z-index em
outro nível) que chegou a subir o selo mas destruiu contraste — daí a
recomendação do doc anterior de não seguir por tentativa-e-erro.

## 2. Correção

1. Mover o `z-index` para o **wrapper** do selo (não só o filho interno) e
   dar ao `<div>` de conteúdo um `z-index` explícito **maior** — os dois
   comparáveis diretamente como filhos da mesma `<section>` (que já é
   `position: relative`, contexto de empilhamento estável):
   - wrapper do selo/faixa: `z-10`
   - `<div>` de conteúdo (título, sticker, CTAs): `z-20`
2. Resultado: o selo agora **de fato** fica acima do `<Grao />` e do fundo,
   e pode cruzar visualmente a área do conteúdo — mas o conteúdo, por ter
   `z-index` maior, **sempre** pinta por cima. É exatamente o "texto vazado"
   pedido: nenhuma solução de máscara SVG é necessária — o empilhamento
   correto já garante contraste, porque o texto nunca é coberto pelo selo em
   momento nenhum.
3. **Posição/tamanho do selo não mudam nesta correção** — o bug era de
   empilhamento, não de geometria. Se depois da correção o cruzamento visual
   for pequeno demais (ex.: o selo raramente toca o texto num viewport
   comum), é ajuste de posição/tamanho a fazer **depois**, com conferência
   visual (ver §4) — não custa arriscar re-tunar geometria às cegas na
   mesma leva que corrige o bug estrutural.

## 3. Guardrails (herdados, nenhum muda)

- `pointer-events-none` no wrapper continua obrigatório — sem ele o selo
  bloquearia cliques nos CTAs.
- Contraste AA do CTA "Apoie via Pix" e dos demais textos: garantido pela
  própria correção (conteúdo sempre por cima).
- Nenhuma propriedade de layout nova é animada — só `z-index` estático via
  classe Tailwind, fora do escopo de motion/GSAP.

## 4. Pronto quando

- `z-index` do wrapper do selo/faixa e do `<div>` de conteúdo são
  explícitos e comparáveis (10 vs 20).
- `pnpm lint`/`typecheck`/`build` limpos.
- **Pendente de QA humana** (sem Chrome neste ambiente): conferir visualmente
  se o selo cruza o título/sticker/CTA como esperado, e se o grau de
  sobreposição está bom — pode exigir um ajuste de posição/tamanho num PR
  de acompanhamento rápido.
