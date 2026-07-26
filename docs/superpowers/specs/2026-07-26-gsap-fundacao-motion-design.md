# GSAP avançado · sub-etapa 1 — CustomEase, DrawSVG, CustomWiggle

> **STATUS: APROVADO PARA IMPLEMENTAÇÃO.**
> Recorte aprovado pelo Lain em 26/07/2026: itens 1–3 da ordem sugerida em
> `2026-07-25-gsap-avancado-design.md` §5, empacotados num PR só (a própria
> spec recomenda isso — menor risco, mesmo domínio de easing/SVG).
> Esta spec fecha as decisões técnicas concretas que aquele documento deixou
> em aberto (curva exata, parâmetros do wiggle, onde cada um entra).

## 1. Escopo

Três plugins, todos já cobertos pela emenda D23 (`02-DECISOES.md`) e pelo
`05-DESIGN.md` §6.2:

1. **CustomEase** — uma ease própria do projeto, substituindo o `power3.out`
   genérico usado em toda entrada de conteúdo.
2. **DrawSVG** — substitui o cálculo manual de `getTotalLength()` +
   `strokeDashoffset` no rabisco do hero, e acrescenta a mesma animação de
   "traço se desenhando" ao sublinhado do `SectionHeader` (hoje ele só
   desliza no scroll via `data-parallax`; não se desenha ao entrar).
3. **CustomWiggle** — substitui o `back.out(1.7)` genérico na "carimbada"
   dos stickers (hero e `Reveal`).

Fora de escopo: SplitText, Flip, MorphSVG, ScrambleText, ScrollSmoother,
selo sobreposto do hero (itens 4–9 da spec ampla, ficam para sub-etapas
seguintes).

## 2. Onde os plugins são registrados

`lib/motion.ts` é o único ponto de lazy-init (guardrail §6.2 nº 3: "todo
plugin novo entra pelo mesmo import dinâmico"). Hoje ele importa só `gsap` +
`ScrollTrigger` dentro do `requestIdleCallback`. Esta sub-etapa estende o
mesmo bloco para importar e registrar também `CustomEase`, `DrawSVGPlugin` e
`CustomWiggle` — um chunk lazy só, nenhum plugin novo no bundle inicial.

`CustomWiggle` depende de `CustomEase` já estar registrado (é uma extensão
dele) — como os dois entram na mesma chamada de `gsap.registerPlugin(...)`,
a ordem não importa em runtime.

As eases nomeadas (`tintaSeca`, `carimbada`) são criadas uma vez, no mesmo
bloco, antes de invocar o `montar` de cada componente — ficam disponíveis
globalmente como qualquer ease nativa do GSAP (`ease: "tintaSeca"`).

## 3. CustomEase — `tintaSeca`

**Curva:** `CustomEase.create("tintaSeca", "0.16, 1, 0.3, 1")` — sintaxe
cubic-bezier de 4 números (equivalente ao `cubic-bezier()` do CSS), aceita
diretamente pelo `CustomEase.create`. É a curva popularmente conhecida como
"decelerate rápido": arranque quase instantâneo, desaceleração longa e
suave. Fecha com a linguagem do §6.1 ("tinta fresca seca rápido" — o
movimento "seca" rápido no início e assenta suave no final), e é
visualmente mais assertiva que `power3.out` sem cair em overshoot.

**Onde substitui `power3.out`:**
- `components/hero.tsx` — `ease` default da timeline (título, itens
  stagger) e das derivas de scroll do selo/faixa.
- `components/reveal.tsx` — `[data-reveal]` (fade+y) e `[data-stencil]`
  (clip-path).

**Onde NÃO entra:** animações CSS puras (`--shadow-card-hover`, hover de
link, marquee) — fora do escopo GSAP por design (§6.1).

## 4. DrawSVG

**Substituição no hero** (`components/hero.tsx:91-106`): o bloco que
calcula `traco.getTotalLength()` e anima `strokeDasharray`/
`strokeDashoffset` na mão vira:

```ts
gsap.fromTo(
  escopo.querySelectorAll("[data-hero-rabisco] path"),
  { drawSVG: "0%" },
  { drawSVG: "100%", duration: 0.6, delay: 0.3, ease: "power2.out" },
);
```

Mantém a mesma ease (`power2.out`) e timing — é substituição de mecanismo,
não de sensação (o pedido original do usuário já registrava isso como
"substituição, não adição", §2.3 da spec ampla).

**Novo no `SectionHeader`:** o sublinhado (`RabiscoSublinhado`) ganha
entrada de "traço se desenhando" ao entrar na viewport, junto com o
`data-parallax` que já deriva no scroll. `components/section-header.tsx`
marca o `<span>` que envolve o rabisco com **`data-rabisco`** (além do
`data-parallax` existente); `components/reveal.tsx` ganha um novo seletor:

```ts
const rabisco = alvos("[data-rabisco] path");
if (rabisco) {
  gsap.fromTo(
    rabisco,
    { drawSVG: "0%" },
    { drawSVG: "100%", duration: 0.5, ease: "power2.out", scrollTrigger: entrada() },
  );
}
```

`entrada()` já é `{ trigger: escopo, start: "top 80%", once: true }` — mesmo
tratamento do `data-stencil`, dispara uma vez só quando a seção entra.

**Guardrail verificado:** `drawSVG` anima propriedades de stroke de SVG —
permitido explicitamente pelo guardrail §6.2 nº 2 ("só `transform`,
`opacity` e propriedades de SVG stroke").

## 5. CustomWiggle — `carimbada`

```ts
CustomWiggle.create("carimbada", { type: "easeOut", wiggles: 3 });
```

`type: "easeOut"` decai a amplitude do wiggle ao longo do tempo (em vez de
oscilar com amplitude constante) — é o que faz parecer um carimbo
assentando, não uma vibração. `wiggles: 3` dá duas oscilações visíveis
antes de assentar — mais gesto que `back.out(1.7)` (que só faz um overshoot
único), sem virar efeito cômico. Parâmetro é ajustável; se o resultado
visual ficar exagerado ou sutil demais, revisar o número de `wiggles`
durante a implementação (decisão de gosto, não trava o guardrail).

**Onde substitui `back.out(1.7)`:**
- `components/hero.tsx` — entrada do `[data-hero-sticker]`.
- `components/reveal.tsx` — `[data-carimbo]` (stickers fora do hero:
  Categorias, FAQ).

## 6. Guardrails — nenhum muda

Confirmado contra `05-DESIGN.md` §6.2 e a emenda D23:

1. `prefers-reduced-motion`: nenhuma mudança em `useMotion`/`matchMedia` —
   os três plugins entram dentro do mesmo `mm.add(...)` já existente.
2. Só `transform`/`opacity`/SVG stroke: `drawSVG` é propriedade de stroke;
   CustomEase/CustomWiggle só trocam a curva de eases já usadas em
   propriedades já aprovadas (`scale`, `opacity`, `clipPath`, `y`).
3. Lazy-init: os três plugins entram no mesmo bloco `idle` de
   `lib/motion.ts` — zero bytes a mais no bundle inicial.
4. Orçamento §6.4: medir `pnpm build` antes do merge (chunk de motion
   cresce um pouco — DrawSVG + CustomEase + CustomWiggle são plugins
   pequenos, mas é para medir, não presumir).
5. Teste em celular real: pendente de QA humana (sem Chrome no ambiente de
   execução desta sessão — mesma ressalva já registrada na V1.6).

## 7. Pronto quando

- `tintaSeca` e `carimbada` substituem toda ocorrência de `power3.out` e
  `back.out(1.7)` nos arquivos listados — sem `power3.out`/`back.out`
  residual nesse escopo.
- Rabisco do hero se desenha via `DrawSVGPlugin` (zero cálculo manual de
  `getTotalLength` no componente).
- Sublinhado do `SectionHeader` se desenha ao entrar na viewport, nas 7+
  seções que usam `SectionHeader`, sem exigir mudança por seção (o
  tratamento vive no `Reveal`, aplicado via atributo).
- `pnpm lint` + `typecheck` + `build` limpos.
- Com `prefers-reduced-motion` ativo, tudo aparece estático e legível (sem
  mudança de comportamento nesse quesito).
