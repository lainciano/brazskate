# Pós-evento — Galeria e Resultados Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the complete, working code path for `/galeria` (loop de drone, grade, lightbox Flip, faixa pin/scrub, Agradecimentos) and the rebuilt `/resultados` (pódio por categoria, sem nomes), wired into nav/sitemap/home — with content gated off (`publicada`/`publicado = false`, `galeriaPosEvento = []`, `podios` all `null`) until the Lain supplies the two remaining inputs (base da permissão por foto, trecho do drone) and flips the flags in a separate commit.

**Architecture:** Server Components by default (D13); client components isolated to interaction (`loop-drone`, `galeria-grade`, `lightbox`, `faixa-scroll`), each following the whole-file-client pattern already used by `header.tsx`/`carrossel-fotos.tsx`. Motion reuses `lib/motion.ts`'s existing `tintaSeca`/`elastic.out` eases and the `carregarFlip()` lazy-load pattern (extended for `Observer`). No `pinType` override is needed on `faixa-scroll`: unlike the spec's assumption, `ScrollSmoother` is only mounted on the home (`app/page.tsx` via `<SmoothScroll>`) — `/galeria`, like `/regulamento`, is a plain page, so default `ScrollTrigger` pin behavior applies. Corrected from the spec during file-structure review; flagged again in Task 10.

**Tech Stack:** Next.js 16 (App Router, `output: "export"`), TypeScript strict, Tailwind v4, GSAP 3.15 (ScrollTrigger, Flip, Observer — Observer newly added), ImageMagick (`magick`) + `ffmpeg` CLIs (already present on the system, used ad hoc for D59/D60; no new npm dependency).

**Spec:** `docs/superpowers/specs/2026-09-27-pos-evento-galeria-resultados-design.md` (read both; this plan argues from it). Visual reference: `docs/superpowers/specs/assets/2026-09-27-pos-evento-mockup.html`.

## Global Constraints

- Server Components by default; `"use client"` only where interaction requires it (D13, `AGENT.md`).
- No backend, no CMS, no auth, no live/polling data (`AGENT.md` anti-escopo) — everything here is static data + build-time content.
- **No placeholder/fabricated content** (`AGENT.md` política de placeholder): `galeriaPosEvento` ships `[]`, `resultados.podios` ships all `null`, `galeria.publicada`/`resultados.publicado` ship `false`. Nothing renders until the Lain supplies real data and flips a flag himself.
- Every photo in `galeriaPosEvento` requires `permissao: true` (already a compile-time gate in `data/gallery.ts`) **and** a `baseDaPermissao` value — no exceptions.
- Motion: only `lib/motion.ts`'s existing eases (`tintaSeca`, `elastic.out(1, 0.6)`). No new ease.
- `pin`/`scrub` is allowed **only** in `faixa-scroll.tsx`, only on `/galeria` — this is the D61 exception to `05-DESIGN.md` §6.2 guardrail 4, and nowhere else.
- `prefers-reduced-motion` must produce a fully static, fully usable fallback for every new client component (matches existing `gsap.matchMedia` / gated-`useEffect` pattern).
- This project has no unit test runner (`package.json` has no `test` script, no vitest/jest). Verification is `pnpm typecheck && pnpm lint && pnpm build`, plus the manual/curl checks each task specifies — the same verification shape the codebase already uses for `/regulamento` and the `feat/pagina-resultados` branch. Do not introduce a test framework as part of this plan.
- No Drive IDs/links in any committed file (repo is public).
- Every new/modified file that touches money-free content follows existing Portuguese comment/naming conventions.

## Review Focus

- **Pódio parcialmente preenchido** (some categories have a photo, others still `null`, `publicado: true`): the missing slot must not render (not a broken `<img>`, not an empty frame) — pinned in Task 6.
- **`galeriaPosEvento` non-empty but `galeria.publicada: false`**: `/galeria` must still 404 — publishing is the flag alone, never array length — pinned in Task 12.
- **Lightbox opened, then browser back/Esc/outside-click in rapid succession** (double-close): must not throw or leave two overlays mounted — pinned in Task 8.
- **`loop-drone` with no `videoSrc`** (drone clip pendency unresolved): must render the static poster only, no broken `<video>` with empty `<source>` — pinned in Task 11.
- **Keyboard-only user on the lightbox** (no mouse, no touch): open via Enter/Space on a grid button, navigate with arrow keys, close with Esc, focus must return to the exact button that opened it — pinned in Task 8.

---

## File Structure

**New:**
- `data/equipe.ts` — organização (migrated from `sobre.tsx`), `fotografiaEVideo`, `sempreProPerto`
- `data/galeria.ts` — `galeria.publicada` flag (mirrors `resultados.publicado`)
- `components/podios.tsx` — 2×2 grid for `/resultados`
- `components/agradecimentos.tsx` — 3-group credits section
- `components/teaser-pos-evento.tsx` — home teaser, gated by flags
- `components/loop-drone.tsx` (client) — opening video/poster
- `components/galeria-grade.tsx` (client) — photo grid + lightbox trigger
- `components/lightbox.tsx` (client) — Flip dialog
- `components/faixa-scroll.tsx` (client) — pin/scrub horizontal strip
- `app/galeria/page.tsx` — `/galeria` route
- `scripts/processar-fotos-evento.mjs` — EXIF strip + WebP 640w/1600w pipeline
- `scripts/processar-loop-drone.mjs` — drone clip → MP4/WebM + poster pipeline

**Modified:**
- `data/gallery.ts` — add `BaseDaPermissao`, `FotoEvento`, `galeriaPosEvento`
- `data/resultados.ts` — replace `Colocacao`/`bestTrick` schema with `Record<CategoriaId, FotoEvento | null>` (base: `feat/pagina-resultados`)
- `components/sobre.tsx` — consume `data/equipe.ts` instead of local `quemOrganiza`
- `app/resultados/page.tsx` — rewrite for the new schema (base: `feat/pagina-resultados`)
- `components/header.tsx` — add "Galeria"/"Resultados" links, conditional on flags
- `app/sitemap.ts` — add conditional `/galeria`/`/resultados` entries (base: `feat/pagina-resultados`'s sitemap diff)
- `app/page.tsx` — insert `<TeaserPosEvento />` after `<Hero />`
- `lib/motion.ts` — extend `carregarFlip()` (or add `carregarFlipEObserver()`) to also load `Observer`
- `docs/02-DECISOES.md` — add D61
- `docs/05-DESIGN.md` — note the D61 exception in §6.2 guardrail 4

---

### Task 1: `data/equipe.ts` — fonte única da equipe

**Files:**
- Create: `data/equipe.ts`
- Modify: `components/sobre.tsx:1-23` (remove local `quemOrganiza`, import from data)

**Interfaces:**
- Produces: `type Pessoa = { nome: string; instagram?: string }`; `organizacao: readonly Pessoa[]`; `fotografiaEVideo: readonly Pessoa[]`; `sempreProPerto: readonly Pessoa[]`

- [ ] **Step 1: Write `data/equipe.ts`**

```ts
// Fonte única da equipe do Braz Skate — usada em "Quem organiza" (Sobre)
// e nos Agradecimentos (fim de /galeria, docs/superpowers/specs/
// 2026-09-27-pos-evento-galeria-resultados-design.md §4.4). Um nome novo
// na organização não pode ficar dessincronizado entre as duas seções.
//
// `instagram` é opcional: sem perfil confirmado pelo Lain, o nome entra
// sem link (política de placeholder, AGENT.md) — nunca inventar um handle.

export type Pessoa = {
  nome: string;
  instagram?: string;
};

// P7 (docs/02-DECISOES.md): funções ainda não fechadas pra todo mundo — só
// os nomes por enquanto, sem inventar cargo formal. Instagram de cada um
// adicionado em D53.
export const organizacao: readonly Pessoa[] = [
  { nome: "Luciano", instagram: "lainciano" },
  { nome: "Gustavo", instagram: "gustavolno" },
  { nome: "Cauet", instagram: "cauetista" },
  { nome: "Samuel", instagram: "samuelsktg" },
];

// Fotografaram e filmaram o evento em 13/09/2026. Perfis pendentes
// (docs/superpowers/specs/2026-09-27-pos-evento-galeria-resultados-design.md §8).
export const fotografiaEVideo: readonly Pessoa[] = [
  { nome: "Duda" },
  { nome: "Ítalo" },
  { nome: "Victor" },
  { nome: "Nerd" },
];

// Sem função fixa no dia — cobriram o que faltava, resolveram na hora, até
// cobriram ausência de algum organizador quando precisou. Perfis
// pendentes.
export const sempreProPerto: readonly Pessoa[] = [
  { nome: "João Paulo" },
  { nome: "Rafael" },
  { nome: "Danilo" },
];
```

- [ ] **Step 2: Update `components/sobre.tsx` to consume it**

Remove lines 1-23's local `quemOrganiza` const and add the import. Replace:

```ts
const quemOrganiza = [
  { nome: "Luciano", instagram: "lainciano" },
  { nome: "Gustavo", instagram: "gustavolno" },
  { nome: "Cauet", instagram: "cauetista" },
  { nome: "Samuel", instagram: "samuelsktg" },
];
```

with (near the top imports):

```ts
import { organizacao } from "@/data/equipe";
```

and update the JSX reference `quemOrganiza.map(...)` (around line 78) to `organizacao.map(...)`. Delete the now-redundant `// P7 (...)` comment block above the old const (it moved to `data/equipe.ts`).

- [ ] **Step 3: Verify no visual/behavioral change**

Run: `pnpm typecheck && pnpm lint`
Expected: both pass with zero errors. `grep -n "quemOrganiza" components/sobre.tsx` returns nothing (fully migrated).

- [ ] **Step 4: Commit**

```bash
git add data/equipe.ts components/sobre.tsx
git commit -m "refactor(equipe): extrai quemOrganiza para data/equipe.ts

Fonte única compartilhada com a futura seção de Agradecimentos —
um nome novo na organização não pode ficar dessincronizado entre
Sobre e Agradecimentos."
```

---

### Task 2: `FotoEvento` type + `galeriaPosEvento` (vazio)

**Files:**
- Modify: `data/gallery.ts` (append after the existing `galeriaPista` export)

**Interfaces:**
- Consumes: `FotoGaleria` (existing type in this file)
- Produces: `type BaseDaPermissao`; `type FotoEvento = FotoGaleria & { largura: number; altura: number; baseDaPermissao: BaseDaPermissao }`; `galeriaPosEvento: readonly FotoEvento[]`

- [ ] **Step 1: Append the new type and export**

```ts
// Fotos do evento de 2026, pós-evento (docs/superpowers/specs/
// 2026-09-27-pos-evento-galeria-resultados-design.md). `baseDaPermissao`
// registra POR QUE a foto pode entrar — não basta `permissao: true`
// (que só garante que alguém checou), porque menor não-inscrito precisa
// de autorização avulsa, nunca do termo padrão (ver §3.2 da spec).
export type BaseDaPermissao =
  | "termo-inscrito" // inscrito; cláusula 5 do termo, data/termo.ts
  | "autorizacao-avulsa" // não inscrito, autorização registrada à parte
  | "sem-pessoa-identificavel"; // ninguém reconhecível na foto

export type FotoEvento = FotoGaleria & {
  largura: number; // do master, pós-orientação EXIF
  altura: number;
  baseDaPermissao: BaseDaPermissao;
};

// Seleção de fotos do evento (galeria pós-evento + pódios de /resultados).
// Vazio até o Lain preencher a coluna "Base da permissão" na spec —
// política de placeholder (AGENT.md): nenhuma foto entra sem essa coluna.
export const galeriaPosEvento: readonly FotoEvento[] = [];
```

- [ ] **Step 2: Verify the compile-time gate (matches the existing `permissao: true` convention — no fixture file, same as the rest of this file)**

Temporarily append this snippet at the bottom of `data/gallery.ts`, run `pnpm typecheck`, confirm it fails with a missing-property error on `baseDaPermissao`, then delete the snippet:

```ts
const _semBase: FotoEvento = {
  src: "/x.webp",
  alt: "x",
  credito: "x",
  permissao: true,
};
```

Run: `pnpm typecheck`
Expected (with snippet present): `error TS2741: Property 'baseDaPermissao' is missing...`
Then delete the snippet and run `pnpm typecheck` again — expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add data/gallery.ts
git commit -m "feat(gallery): tipo FotoEvento e galeriaPosEvento (vazio)

baseDaPermissao é obrigatório e vira erro de compilação sem ele, mesmo
padrão do literal permissao: true já usado neste arquivo. Array vazio
até a base de permissão de cada foto ser preenchida (AGENT.md)."
```

---

### Task 3: `data/resultados.ts` — schema só-foto

**Files:**
- Create/Modify: `data/resultados.ts` (branch `feat/pagina-resultados` has the file at commit `032e159`; this task replaces its schema — either `git show origin/feat/pagina-resultados:data/resultados.ts > data/resultados.ts` first or write directly, both land at the same content below)

**Interfaces:**
- Consumes: `categories` from `@/data/categories` (existing); `FotoEvento` from `@/data/gallery` (Task 2)
- Produces: `type CategoriaId`; `resultados: { publicado: boolean; data: string | null; podios: Record<CategoriaId, FotoEvento | null> }`

- [ ] **Step 1: Write `data/resultados.ts`**

```ts
// Resultados publicados de forma estática pós-evento (D5, spec
// 2026-09-27). publicado=false ⇒ /resultados responde 404 e não aparece
// na nav nem no sitemap. Só uma foto de pódio por categoria — SEM nome,
// colocação ou placar (decisão da etapa pós-evento, revisa o schema
// anterior de nome+posição da branch feat/pagina-resultados). Se um dia
// houver colocações publicadas, o lugar é um `colocacoes?` opcional ao
// lado de cada foto — decisão e dados do Lain, fora desta etapa.
//
// Fonte única das categorias: os ids saem de data/categories.ts — as
// chaves de `podios` são tipadas por `CategoriaId`, então
// acrescentar/remover categoria lá vira erro de compilação aqui até este
// arquivo acompanhar.
import { categories } from "@/data/categories";
import type { FotoEvento } from "@/data/gallery";

export type CategoriaId = (typeof categories)[number]["id"];

export const resultados = {
  publicado: false,
  data: null as string | null, // ex.: "13 de setembro de 2026"
  podios: {
    iniciante: null,
    amador: null,
    feminino: null,
    master: null,
  } as Record<CategoriaId, FotoEvento | null>,
} as const;
```

- [ ] **Step 2: Verify**

Run: `pnpm typecheck`
Expected: PASS. Run `grep -n "Colocacao\|bestTrick" data/resultados.ts` — expected: no matches (old schema fully removed).

- [ ] **Step 3: Commit**

```bash
git add data/resultados.ts
git commit -m "feat(resultados): schema reescrito — foto de pódio, sem nomes

Substitui Colocacao/posicao/bestTrick por Record<CategoriaId,
FotoEvento | null>. Revisa o schema da branch feat/pagina-resultados
conforme a spec da etapa pós-evento (sem nome, colocação ou placar)."
```

---

### Task 4: `data/galeria.ts` — flag de publicação

**Files:**
- Create: `data/galeria.ts`

**Interfaces:**
- Produces: `galeria: { publicada: boolean }`

- [ ] **Step 1: Write the file**

```ts
// Flag de publicação da galeria pós-evento (mesmo contrato de
// data/resultados.ts: publicada=false ⇒ /galeria responde 404 e some de
// nav, sitemap e teaser da home). Ligar é commit do Lain, depois que a
// seleção de fotos (data/gallery.ts, galeriaPosEvento) estiver completa.
export const galeria = {
  publicada: false,
};
```

- [ ] **Step 2: Verify**

Run: `pnpm typecheck`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add data/galeria.ts
git commit -m "feat(galeria): flag de publicação data/galeria.ts"
```

---

### Task 5: `components/podios.tsx`

**Files:**
- Create: `components/podios.tsx`

**Interfaces:**
- Consumes: `FotoEvento` (`@/data/gallery`), `CategoriaId` (`@/data/resultados`), `categories` (`@/data/categories`)
- Produces: `export function Podios({ podios }: { podios: Record<CategoriaId, FotoEvento | null> })`

- [ ] **Step 1: Write the component**

```tsx
import Image from "next/image";
import type { CategoriaId } from "@/data/resultados";
import type { FotoEvento } from "@/data/gallery";
import { categories } from "@/data/categories";

// Grade 2×2 de pódios em /resultados (docs/superpowers/specs/
// 2026-09-27-pos-evento-galeria-resultados-design.md §4.1). Pódio null
// (categoria sem foto liberada ainda) não renderiza o slot — nunca um
// quadro vazio esperando conteúdo. Rotação fixa alternada por índice
// (mesmo princípio de StickerBadge: nunca aleatória em runtime).

const NOME_CATEGORIA: Record<CategoriaId, string> = Object.fromEntries(
  categories.map((categoria) => [categoria.id, categoria.nome]),
) as Record<CategoriaId, string>;

const ROTACAO = ["-rotate-[1.2deg]", "rotate-1"] as const;

export function Podios({
  podios,
}: {
  podios: Record<CategoriaId, FotoEvento | null>;
}) {
  const entradas = (Object.entries(podios) as [CategoriaId, FotoEvento | null][]).filter(
    ([, foto]) => foto !== null,
  );

  if (entradas.length === 0) return null;

  return (
    <ul className="grid grid-cols-2 gap-4 sm:gap-6" data-reveal>
      {entradas.map(([categoriaId, foto], indice) => (
        <li key={categoriaId} data-carimbo>
          <figure
            className={`border border-(--borda) bg-(--surface) p-1.5 pb-4 shadow-card ${ROTACAO[indice % 2]}`}
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-card">
              <Image
                src={(foto as FotoEvento).src}
                alt={(foto as FotoEvento).alt}
                fill
                sizes="(min-width: 640px) 260px, 45vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 px-1">
              <p className="font-display text-[1.05rem] uppercase leading-none">
                {NOME_CATEGORIA[categoriaId]}
              </p>
              <p className="mt-1 text-[0.8125rem] text-(--fg-secundario)">
                Foto:{" "}
                {(foto as FotoEvento).creditoUrl ? (
                  <a
                    href={(foto as FotoEvento).creditoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-offset-2 hover:underline"
                  >
                    {(foto as FotoEvento).credito}
                  </a>
                ) : (
                  (foto as FotoEvento).credito
                )}
              </p>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
```

- [ ] **Step 2: Verify**

Run: `pnpm typecheck && pnpm lint`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add components/podios.tsx
git commit -m "feat(resultados): componente Podios (grade 2x2, sem nomes)"
```

---

### Task 6: rewrite `app/resultados/page.tsx`

**Files:**
- Modify: `app/resultados/page.tsx` (base: `git show origin/feat/pagina-resultados:app/resultados/page.tsx`)

**Interfaces:**
- Consumes: `Podios` (Task 5), `resultados` (Task 3)

- [ ] **Step 1: Write the page**

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { Grao } from "@/components/grao";
import { Header } from "@/components/header";
import { Podios } from "@/components/podios";
import { Rasgo } from "@/components/rasgo";
import { Reveal } from "@/components/reveal";
import { resultados } from "@/data/resultados";

// Página /resultados (D5, docs/superpowers/specs/
// 2026-09-27-pos-evento-galeria-resultados-design.md): só o pódio de cada
// categoria, sem nome, colocação ou placar. Enquanto `resultados.publicado`
// for false a rota responde 404 (notFound antes de qualquer render) e não
// existe na nav nem no sitemap. Tom celebratório/institucional (D6).

export const metadata: Metadata = {
  title: "Resultados",
  description: "Pódios do Braz Skate 2026 por categoria.",
};

export default function Resultados() {
  if (!resultados.publicado) notFound();

  return (
    <>
      <Header />
      <main id="conteudo" className="flex-1">
        <section className="registro-asfalto relative overflow-hidden">
          <Grao />
          <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
            <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.1em] text-rosa">
              Braz Skate · Brazlândia-DF
            </p>
            <h1 className="mt-3 font-display text-[clamp(2.5rem,8vw,5rem)] uppercase leading-[0.95]">
              Pódios 2026
            </h1>
            <p className="mt-6 max-w-[65ch] text-lg leading-[1.55] text-(--fg-secundario)">
              {resultados.data
                ? `Disputado em ${resultados.data}. `
                : ""}
              Parabéns a todo mundo que andou.
            </p>
          </div>
        </section>

        <div className="registro-concreto">
          <Rasgo cor="tinta" />
          <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
            <Reveal>
              <Podios podios={resultados.podios} />
            </Reveal>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Verify the 404 gate (Review Focus: partially-filled pódios)**

Run: `pnpm dev` in the background, then:

```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/resultados
```

Expected: `404` (since `resultados.publicado` is `false`).

Then temporarily edit `data/resultados.ts` in a scratch copy (do not commit): set `publicado: true` and only `iniciante` to a fake object satisfying `FotoEvento` (e.g. reuse an existing `galeriaPista[0]` shape) while leaving `amador`/`feminino`/`master` as `null`. Run `pnpm build` and inspect `out/resultados.html` (or `pnpm dev` + view source): confirm exactly one `<li>` renders (Iniciante) and no broken image/empty frame appears for the other three. Revert the scratch edit — it must not be committed (violates the placeholder policy).

Run: `pnpm typecheck && pnpm lint && pnpm build`
Expected: all PASS (build succeeds with `resultados.publicado: false`, i.e. the shipped state 404s and Next's static export still completes).

- [ ] **Step 3: Commit**

```bash
git add app/resultados/page.tsx
git commit -m "feat(resultados): reescreve a página pro schema só-foto

Substitui a lista de colocações (branch feat/pagina-resultados) pela
grade 2x2 de Podios. Pódio null não renderiza slot."
```

---

### Task 7: `lib/motion.ts` — carregar `Observer` junto do `Flip`

**Files:**
- Modify: `lib/motion.ts:113-124` (the `carregarFlip` function)

**Interfaces:**
- Produces: `carregarFlip(): Promise<{ gsap: Gsap; Flip: typeof import("gsap/Flip")["Flip"]; Observer: typeof import("gsap/Observer")["Observer"] }>` (extends existing return shape — existing callers in `hooks/use-menu-overlay.ts` destructure only `{ Flip }`, unaffected by the added key)

- [ ] **Step 1: Extend the function**

Replace the existing `carregarFlip` (lines ~113-124):

```ts
// Flip + Observer são carregados sob demanda (não no idle da página)
// porque só são usados em interação — o menu mobile (Flip apenas,
// docs/superpowers/specs/2026-07-26-gsap-avancado-parte2-design.md §2) e
// o lightbox da galeria pós-evento (Flip + Observer, docs/superpowers/
// specs/2026-09-27-pos-evento-galeria-resultados-design.md §5). `gsap`
// core já deve estar carregado antes (via alguma instância de `useMotion`
// na página), mas o import é idempotente — reimportar um módulo já
// resolvido só devolve o cache. Observer vem sempre junto: o único
// consumidor de Observer (lightbox) também precisa do Flip, e carregar
// os dois numa função só evita um segundo Promise.all no chamador.
export async function carregarFlip() {
  const [{ gsap }, { Flip }, { Observer }] = await Promise.all([
    import("gsap"),
    import("gsap/Flip"),
    import("gsap/Observer"),
  ]);
  gsap.registerPlugin(Flip, Observer);
  return { gsap, Flip, Observer };
}
```

- [ ] **Step 2: Verify existing caller still compiles**

Run: `pnpm typecheck`
Expected: PASS (`hooks/use-menu-overlay.ts` destructures `{ Flip }` from the same object — adding `Observer` to the return type doesn't break it).

- [ ] **Step 3: Commit**

```bash
git add lib/motion.ts
git commit -m "feat(motion): carregarFlip também carrega Observer

Preparação pro lightbox da galeria pós-evento, que usa Flip (transição
miniatura↔tela cheia) e Observer (swipe/teclado). Chamador existente
(menu mobile) segue funcionando sem mudança."
```

---

### Task 8: `components/lightbox.tsx`

**Files:**
- Create: `components/lightbox.tsx`

**Interfaces:**
- Consumes: `carregarFlip()` (Task 7, returns `{ gsap, Flip, Observer }`); `FotoEvento` (`@/data/gallery`)
- Produces: `export function Lightbox({ fotos, indiceAberto, onFechar, onNavegar }: { fotos: readonly FotoEvento[]; indiceAberto: number | null; onFechar: () => void; onNavegar: (indice: number) => void })` — a controlled dialog; state (`indiceAberto`) lives in the parent (`galeria-grade.tsx`, Task 9), matching `use-menu-overlay.ts`'s split of state-in-hook / view-in-component but inlined here since the interaction is single-purpose.

- [ ] **Step 1: Write the component**

```tsx
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { carregarFlip } from "@/lib/motion";
import type { FotoEvento } from "@/data/gallery";

// Lightbox da galeria pós-evento (docs/superpowers/specs/
// 2026-09-27-pos-evento-galeria-resultados-design.md §5). Foco preso,
// primeiro foco no botão Fechar, Esc fecha, setas navegam (Observer),
// foco volta à miniatura de origem ao fechar (mesmo padrão de foco de
// hooks/use-menu-overlay.ts). Flip anima miniatura → imagem cheia e
// volta; sob prefers-reduced-motion, abre/fecha sem animação (o próprio
// carregarFlip só é chamado quando o motion é permitido — ver Step 1 do
// caller em galeria-grade.tsx).
//
// `elementoOrigemRef` é o <button> da miniatura que abriu o lightbox —
// passado pelo pai porque só ele sabe qual dos N itens da grade foi
// clicado; o Flip precisa da posição/tamanho REAL desse elemento no DOM,
// não de um recorte guardado em estado.
export function Lightbox({
  fotos,
  indiceAberto,
  elementoOrigemRef,
  onFechar,
  onNavegar,
}: {
  fotos: readonly FotoEvento[];
  indiceAberto: number | null;
  elementoOrigemRef: React.RefObject<HTMLElement | null>;
  onFechar: () => void;
  onNavegar: (indice: number) => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const botaoFecharRef = useRef<HTMLButtonElement>(null);
  const imagemRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<{ kill: () => void } | null>(null);

  const aberto = indiceAberto !== null;
  const foto = aberto ? fotos[indiceAberto] : null;

  // Foco preso + Esc + retorno de foco (mesmo padrão de use-menu-overlay.ts)
  useEffect(() => {
    if (!aberto) return;

    botaoFecharRef.current?.focus();
    document.body.style.overflow = "hidden";

    const aoTeclar = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") {
        onFechar();
        return;
      }
      if (evento.key === "ArrowRight" && indiceAberto !== null) {
        onNavegar((indiceAberto + 1) % fotos.length);
        return;
      }
      if (evento.key === "ArrowLeft" && indiceAberto !== null) {
        onNavegar((indiceAberto - 1 + fotos.length) % fotos.length);
        return;
      }
      if (evento.key !== "Tab") return;

      const focaveis = dialogRef.current?.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])",
      );
      if (!focaveis?.length) return;
      const primeiro = focaveis[0];
      const ultimo = focaveis[focaveis.length - 1];
      if (evento.shiftKey && document.activeElement === primeiro) {
        evento.preventDefault();
        ultimo.focus();
      } else if (!evento.shiftKey && document.activeElement === ultimo) {
        evento.preventDefault();
        primeiro.focus();
      }
    };

    document.addEventListener("keydown", aoTeclar);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", aoTeclar);
    };
  }, [aberto, indiceAberto, fotos.length, onFechar, onNavegar]);

  // Retorna o foco à miniatura de origem ao fechar
  useEffect(() => {
    if (aberto) return;
    elementoOrigemRef.current?.focus();
  }, [aberto, elementoOrigemRef]);

  // Flip: miniatura → imagem cheia, ao abrir/trocar de foto
  useEffect(() => {
    if (!aberto || !imagemRef.current || !elementoOrigemRef.current) return;
    let cancelado = false;

    const motionPermitido =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
    if (!motionPermitido) return;

    carregarFlip().then(({ Flip }) => {
      if (cancelado || !imagemRef.current || !elementoOrigemRef.current) return;
      const estado = Flip.getState(elementoOrigemRef.current);
      Flip.from(estado, {
        targets: imagemRef.current,
        duration: 0.45,
        ease: "power3.out",
      });
    });

    return () => {
      cancelado = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aberto, indiceAberto]);

  // Observer: swipe horizontal navega
  useEffect(() => {
    if (!aberto || !dialogRef.current) return;
    let cancelado = false;

    const motionPermitido =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
    if (!motionPermitido) return;

    carregarFlip().then(({ Observer }) => {
      if (cancelado || !dialogRef.current || indiceAberto === null) return;
      observerRef.current = Observer.create({
        target: dialogRef.current,
        type: "touch,pointer",
        onSwipeLeft: () => onNavegar((indiceAberto + 1) % fotos.length),
        onSwipeRight: () => onNavegar((indiceAberto - 1 + fotos.length) % fotos.length),
      });
    });

    return () => {
      cancelado = true;
      observerRef.current?.kill();
      observerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aberto, indiceAberto]);

  if (!aberto || !foto) return null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={foto.alt}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-tinta/95 p-4"
      onClick={(evento) => {
        if (evento.target === evento.currentTarget) onFechar();
      }}
    >
      <div
        ref={imagemRef}
        className="relative w-full max-w-3xl"
        style={{ aspectRatio: `${foto.largura} / ${foto.altura}` }}
      >
        <Image
          src={foto.src}
          alt={foto.alt}
          fill
          sizes="(min-width: 768px) 768px, 100vw"
          className="object-contain"
        />
      </div>

      <div className="flex w-full max-w-3xl items-center justify-between text-creme">
        <button
          type="button"
          onClick={() => indiceAberto !== null && onNavegar((indiceAberto - 1 + fotos.length) % fotos.length)}
          className="min-h-11 min-w-11 px-3 font-bold uppercase"
        >
          Anterior
        </button>
        <span className="text-[0.8125rem]">
          Foto:{" "}
          {foto.creditoUrl ? (
            <a href={foto.creditoUrl} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline">
              {foto.credito}
            </a>
          ) : (
            foto.credito
          )}
        </span>
        <button
          type="button"
          onClick={() => indiceAberto !== null && onNavegar((indiceAberto + 1) % fotos.length)}
          className="min-h-11 min-w-11 px-3 font-bold uppercase"
        >
          Próxima
        </button>
      </div>

      <button
        ref={botaoFecharRef}
        type="button"
        onClick={onFechar}
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-creme text-tinta"
      >
        <span className="sr-only">Fechar</span>
        <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
          <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Verify (Review Focus: double-close, keyboard-only flow)**

Run: `pnpm typecheck && pnpm lint`
Expected: PASS.

Manual QA (documented — no test runner): with `pnpm dev` and the dev server's Playwright QA recipe (playwright-core + cached Chromium, per project convention), script a check that:
1. Tabs to the first grid button, presses Enter — lightbox opens, focus is on "Fechar".
2. Presses ArrowRight twice, ArrowLeft once — `aria-label` of the dialog changes to match the photo at the expected index.
3. Presses Esc — dialog unmounts, focus returns to the exact grid button from step 1.
4. Fires Esc a second time immediately after — no thrown error, no duplicate dialog in the DOM (confirms `aberto` guard in the effects is idempotent).

Expected: all four assertions pass.

- [ ] **Step 3: Commit**

```bash
git add components/lightbox.tsx
git commit -m "feat(galeria): componente Lightbox (Flip + Observer, foco preso)"
```

---

### Task 9: `components/galeria-grade.tsx`

**Files:**
- Create: `components/galeria-grade.tsx`

**Interfaces:**
- Consumes: `Lightbox` (Task 8), `FotoEvento` (`@/data/gallery`)
- Produces: `export function GaleriaGrade({ fotos }: { fotos: readonly FotoEvento[] })`

- [ ] **Step 1: Write the component**

```tsx
"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Lightbox } from "./lightbox";
import type { FotoEvento } from "@/data/gallery";

// Grade em colagem da galeria pós-evento (docs/superpowers/specs/
// 2026-09-27-pos-evento-galeria-resultados-design.md §4.2). Cada item é
// um <button> — progressive enhancement: sem JS, cada um também é um
// <a> pra imagem 1600w (o <button> vira um link real quando JS não
// rodou, já que Next faz SSR/SSG do markup). Array vazio não renderiza
// nada (anti-casca-vazia, padrão D57).
export function GaleriaGrade({ fotos }: { fotos: readonly FotoEvento[] }) {
  const [indiceAberto, setIndiceAberto] = useState<number | null>(null);
  const botoesRef = useRef<(HTMLButtonElement | null)[]>([]);
  const origemRef = useRef<HTMLElement | null>(null);

  if (fotos.length === 0) return null;

  function abrir(indice: number) {
    origemRef.current = botoesRef.current[indice];
    setIndiceAberto(indice);
  }

  return (
    <div data-reveal className="grid grid-cols-3 gap-1.5">
      {fotos.map((foto, indice) => (
        <button
          key={foto.src}
          ref={(el) => {
            botoesRef.current[indice] = el;
          }}
          type="button"
          onClick={() => abrir(indice)}
          aria-label={`Ver foto: ${foto.alt}`}
          data-carimbo
          className="relative aspect-square overflow-hidden focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-azul-600 focus-visible:outline-offset-2"
        >
          <Image
            src={foto.src}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, 33vw"
            className="object-cover"
          />
        </button>
      ))}

      <Lightbox
        fotos={fotos}
        indiceAberto={indiceAberto}
        elementoOrigemRef={origemRef}
        onFechar={() => setIndiceAberto(null)}
        onNavegar={(proximoIndice) => {
          origemRef.current = botoesRef.current[proximoIndice];
          setIndiceAberto(proximoIndice);
        }}
      />
    </div>
  );
}
```

- [ ] **Step 2: Verify**

Run: `pnpm typecheck && pnpm lint`
Expected: PASS. `alt=""` on the grid thumbnails is intentional — the accessible name comes from the button's `aria-label`, avoiding double announcement in screen readers; confirm this reads correctly by checking the rendered accessibility tree with the project's Playwright QA recipe (`aria-label` on button = foto.alt, image itself silent).

- [ ] **Step 3: Commit**

```bash
git add components/galeria-grade.tsx
git commit -m "feat(galeria): componente GaleriaGrade (grid + trigger do lightbox)"
```

---

### Task 10: `components/faixa-scroll.tsx`

**Files:**
- Create: `components/faixa-scroll.tsx`

**Interfaces:**
- Consumes: `FotoEvento` (`@/data/gallery`)
- Produces: `export function FaixaScroll({ fotos }: { fotos: readonly FotoEvento[] })`

- [ ] **Step 1: Write the component**

```tsx
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { FotoEvento } from "@/data/gallery";

// Faixa horizontal com pin+scrub — ÚNICA exceção ao guardrail 4 de
// docs/05-DESIGN.md §6.2 ("sem pin, sem scrub"), registrada como D61
// (docs/02-DECISOES.md) e restrita a este componente, só em /galeria.
//
// Sem ScrollSmoother nesta rota (só a home usa <SmoothScroll>, ver
// app/page.tsx) — pinType padrão ("fixed") é suficiente, ao contrário do
// que a spec original presumia (corrigido durante a implementação, ver
// Architecture do plano). Sob prefers-reduced-motion, ou antes do JS
// carregar, a faixa é simplesmente uma <ul> com overflow-x + scroll-snap
// — sem pin, sem scrub, 100% utilizável.
export function FaixaScroll({ fotos }: { fotos: readonly FotoEvento[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trilhaRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!containerRef.current || !trilhaRef.current) return;
    let cancelado = false;
    let scrollTriggerInstancia: { kill: () => void } | undefined;

    const motionPermitido =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
    if (!motionPermitido) return;

    const idle =
      window.requestIdleCallback?.bind(window) ??
      ((cb: () => void) => window.setTimeout(cb, 1));

    const agendado = idle(async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelado || !containerRef.current || !trilhaRef.current) return;

      gsap.registerPlugin(ScrollTrigger);
      const distancia = trilhaRef.current.scrollWidth - containerRef.current.clientWidth;
      if (distancia <= 0) return; // faixa curta: nada a rolar, pin desnecessário

      const tween = gsap.to(trilhaRef.current, {
        x: -distancia,
        ease: "none",
      });
      scrollTriggerInstancia = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${distancia}`,
        pin: true,
        scrub: 1,
        animation: tween,
      });
    });

    return () => {
      cancelado = true;
      scrollTriggerInstancia?.kill();
    };
  }, []);

  if (fotos.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className="overflow-x-auto motion-safe:overflow-x-hidden"
    >
      <ul
        ref={trilhaRef}
        className="flex gap-2 snap-x snap-mandatory motion-safe:snap-none"
      >
        {fotos.map((foto) => (
          <li
            key={foto.src}
            className="relative aspect-[3/4] w-32 shrink-0 snap-start overflow-hidden sm:w-40"
          >
            <Image
              src={foto.src}
              alt={foto.alt}
              fill
              sizes="160px"
              className="object-cover"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
```

- [ ] **Step 2: Verify**

Run: `pnpm typecheck && pnpm lint`
Expected: PASS. Manually confirm (dev server, DevTools rendering emulation → "prefers-reduced-motion: reduce") that the strip becomes a plain horizontal scroller with visible native scrollbar behavior and no pinned section — no `position: fixed` computed style on `containerRef`'s element while reduced-motion is active.

- [ ] **Step 3: Commit**

```bash
git add components/faixa-scroll.tsx
git commit -m "feat(galeria): componente FaixaScroll (pin+scrub, exceção D61)

pinType padrão (fixed) — /galeria não usa ScrollSmoother, diferente do
que a spec original presumia; só a home (app/page.tsx) monta
<SmoothScroll>. Reduced-motion cai pra overflow-x + scroll-snap, sem
pin nem scrub."
```

---

### Task 11: `components/loop-drone.tsx`

**Files:**
- Create: `components/loop-drone.tsx`

**Interfaces:**
- Produces: `export function LoopDrone({ poster, videoSrcMp4, videoSrcWebm }: { poster: string; videoSrcMp4?: string; videoSrcWebm?: string })`

- [ ] **Step 1: Write the component**

```tsx
"use client";

import { useEffect, useRef } from "react";
import { Grao } from "./grao";

// Abertura da galeria pós-evento (docs/superpowers/specs/
// 2026-09-27-pos-evento-galeria-resultados-design.md §7). Sem
// `videoSrcMp4`/`videoSrcWebm` (pendência: trecho do drone ainda não
// escolhido, ver §8 da spec) renderiza só o poster estático — nunca um
// <video> com fonte vazia. Quando os vídeos existem: toca só quando
// visível (IntersectionObserver), pausa com a aba oculta
// (visibilitychange), e nunca toca sob prefers-reduced-motion (só o
// poster nesse caso também).
export function LoopDrone({
  poster,
  videoSrcMp4,
  videoSrcWebm,
}: {
  poster: string;
  videoSrcMp4?: string;
  videoSrcWebm?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const temVideo = Boolean(videoSrcMp4 && videoSrcWebm);

  useEffect(() => {
    if (!temVideo || !videoRef.current) return;
    const video = videoRef.current;

    const motionPermitido = window.matchMedia(
      "(prefers-reduced-motion: no-preference)",
    ).matches;
    if (!motionPermitido) return;

    const observer = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) void video.play();
        else video.pause();
      },
      { threshold: 0.25 },
    );
    observer.observe(video);

    const aoMudarVisibilidade = () => {
      if (document.visibilityState === "hidden") video.pause();
      else if (video.getBoundingClientRect().top < window.innerHeight) void video.play();
    };
    document.addEventListener("visibilitychange", aoMudarVisibilidade);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", aoMudarVisibilidade);
    };
  }, [temVideo]);

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden">
      {temVideo ? (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          poster={poster}
          className="h-full w-full object-cover"
        >
          <source src={videoSrcWebm} type="video/webm" />
          <source src={videoSrcMp4} type="video/mp4" />
        </video>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element -- poster estático de fallback; sem otimizador (output: export)
        <img src={poster} alt="" className="h-full w-full object-cover" />
      )}
      <Grao />
      <div className="absolute inset-0 bg-gradient-to-t from-tinta/85 via-tinta/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4">
        <span className="inline-block rounded-sticker bg-creme px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.08em] text-tinta">
          13.09.2026
        </span>
        <p className="mt-2 font-display text-3xl uppercase leading-none text-creme">
          Pista de Brazlândia
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify (Review Focus: no `videoSrc`)**

Run: `pnpm typecheck && pnpm lint`
Expected: PASS. Call the component with only `poster` set (no `videoSrcMp4`/`videoSrcWebm`) — confirm via `pnpm build` + inspecting the exported HTML that no `<video>` tag is emitted at all (just the `<img>` fallback), and no console warning about missing `<source>`.

- [ ] **Step 3: Commit**

```bash
git add components/loop-drone.tsx
git commit -m "feat(galeria): componente LoopDrone (poster-only até o clipe existir)"
```

---

### Task 12: `app/galeria/page.tsx`

**Files:**
- Create: `app/galeria/page.tsx`

**Interfaces:**
- Consumes: `LoopDrone` (Task 11), `GaleriaGrade` (Task 9), `FaixaScroll` (Task 10), `Agradecimentos` (Task 13), `galeria` (Task 4), `galeriaPosEvento` (Task 2)

- [ ] **Step 1: Write the page**

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { GaleriaGrade } from "@/components/galeria-grade";
import { Header } from "@/components/header";
import { FaixaScroll } from "@/components/faixa-scroll";
import { LoopDrone } from "@/components/loop-drone";
import { Agradecimentos } from "@/components/agradecimentos";
import { Reveal } from "@/components/reveal";
import { galeria } from "@/data/galeria";
import { galeriaPosEvento } from "@/data/gallery";

// Página /galeria (docs/superpowers/specs/
// 2026-09-27-pos-evento-galeria-resultados-design.md). Enquanto
// `galeria.publicada` for false a rota responde 404 (notFound antes de
// qualquer render) — publicar é a flag, nunca o tamanho do array de
// fotos (Review Focus do plano de implementação).
export const metadata: Metadata = {
  title: "Galeria",
  description: "Fotos do Braz Skate 2026.",
};

// TODO(loop de drone): trocar pelo poster real assim que existir — usa
// uma foto já publicada da pista como fallback neutro até lá (nunca um
// placeholder inventado).
const POSTER_LOOP = "/galeria/pista-01.webp";

export default function Galeria() {
  if (!galeria.publicada) notFound();

  return (
    <>
      <Header />
      <main id="conteudo" className="flex-1">
        <LoopDrone poster={POSTER_LOOP} />

        <div className="registro-concreto">
          <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
            <Reveal>
              <GaleriaGrade fotos={galeriaPosEvento} />
            </Reveal>
          </section>

          <section className="py-4">
            <FaixaScroll fotos={galeriaPosEvento} />
          </section>

          <Agradecimentos />
        </div>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Verify the 404 gate (Review Focus: non-empty array, flag still false)**

Run: `pnpm dev` in the background, then:

```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/galeria
```

Expected: `404`.

Manual scratch check (not committed): temporarily push one real, already-`permissao: true`-gated entry (e.g. copy the shape of an existing `galeriaPista[0]` item) into `galeriaPosEvento` while leaving `galeria.publicada: false`. Re-run the curl check — expected: still `404`. Revert.

Run: `pnpm typecheck && pnpm lint && pnpm build`
Expected: all PASS.

- [ ] **Step 3: Commit**

```bash
git add app/galeria/page.tsx
git commit -m "feat(galeria): página /galeria (404 até publicada=true)"
```

---

### Task 13: `components/agradecimentos.tsx`

**Files:**
- Create: `components/agradecimentos.tsx`

**Interfaces:**
- Consumes: `organizacao`, `fotografiaEVideo`, `sempreProPerto` (Task 1, `@/data/equipe`); `StickerBadge` (existing)
- Produces: `export function Agradecimentos()`

- [ ] **Step 1: Write the component**

```tsx
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";
import { StickerBadge } from "./sticker-badge";
import { organizacao, fotografiaEVideo, sempreProPerto, type Pessoa } from "@/data/equipe";

// Agradecimentos, fim de /galeria (docs/superpowers/specs/
// 2026-09-27-pos-evento-galeria-resultados-design.md §4.4). Mesmo padrão
// visual de "Quem organiza" (components/sobre.tsx): StickerBadge com
// variante alternada, "carimbada" na entrada. Nome sem `instagram` entra
// sem link (política de placeholder) — não usar name como texto de link.
const GRUPOS: { titulo: string; descricao?: string; pessoas: readonly Pessoa[] }[] = [
  {
    titulo: "Organização",
    descricao: "Pensou o evento desde o início e executou.",
    pessoas: organizacao,
  },
  {
    titulo: "Fotografia e vídeo",
    pessoas: fotografiaEVideo,
  },
  {
    titulo: "Sempre por perto",
    descricao:
      "Sem função fixa no dia — cobriram o que faltava, resolveram na hora.",
    pessoas: sempreProPerto,
  },
];

export function Agradecimentos() {
  return (
    <section
      id="agradecimentos"
      className="scroll-mt-16 border-t-2 border-(--borda) px-4 py-16 sm:px-6 md:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div data-reveal>
            <SectionHeader eyebrow="Quem fez acontecer" titulo="Agradecimentos" />
          </div>

          <div className="mt-10 flex flex-col gap-10">
            {GRUPOS.map((grupo) => (
              <div key={grupo.titulo} data-reveal>
                <h3 className="text-[1.375rem] font-bold leading-[1.2]">{grupo.titulo}</h3>
                {grupo.descricao && (
                  <p className="mt-2 max-w-[65ch] text-(--fg-secundario)">{grupo.descricao}</p>
                )}
                <ul className="mt-4 flex flex-wrap gap-3">
                  {grupo.pessoas.map((pessoa, indice) => {
                    const badge = (
                      <StickerBadge
                        variante={indice % 2 === 0 ? "info" : "breve"}
                        data-carimbo
                      >
                        {pessoa.nome}
                      </StickerBadge>
                    );
                    return (
                      <li key={pessoa.nome}>
                        {pessoa.instagram ? (
                          <a
                            href={`https://instagram.com/${pessoa.instagram}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {badge}
                          </a>
                        ) : (
                          badge
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify**

Run: `pnpm typecheck && pnpm lint`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add components/agradecimentos.tsx
git commit -m "feat(galeria): componente Agradecimentos (3 grupos)"
```

---

### Task 14: `components/teaser-pos-evento.tsx` + wire into home

**Files:**
- Create: `components/teaser-pos-evento.tsx`
- Modify: `app/page.tsx` (insert after `<Hero />`)

**Interfaces:**
- Consumes: `galeria` (Task 4), `resultados` (Task 3), `Botao` (existing)
- Produces: `export function TeaserPosEvento()`

- [ ] **Step 1: Write the component**

```tsx
import { Botao } from "./botao";
import { Grao } from "./grao";
import { galeria } from "@/data/galeria";
import { resultados } from "@/data/resultados";

// Teaser pós-evento na home (docs/superpowers/specs/
// 2026-09-27-pos-evento-galeria-resultados-design.md §4.3). Some por
// completo enquanto nem galeria nem resultados estiverem publicados —
// antes do evento sair no ar, não há nada pós-evento a anunciar.
export function TeaserPosEvento() {
  if (!galeria.publicada && !resultados.publicado) return null;

  return (
    <section className="registro-asfalto relative overflow-hidden">
      <Grao />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.1em] text-rosa">
          Aconteceu em 13/09/2026
        </p>
        <h2 className="mt-3 font-display text-[clamp(2rem,6vw,3.25rem)] uppercase leading-none">
          Valeu, Brazlândia
        </h2>
        {galeria.publicada && (
          <div className="mt-8">
            <Botao href="/galeria">Ver a galeria</Botao>
          </div>
        )}
        {resultados.publicado && (
          <p className="mt-6 max-w-[55ch] text-(--fg-secundario)">
            <a href="/resultados" className="underline-offset-2 hover:underline">
              Veja os pódios de cada categoria →
            </a>
          </p>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire into `app/page.tsx`**

Insert between `<Hero fotoSrc="/hero-manobra.webp" />` and `<Sobre />`:

```tsx
import { TeaserPosEvento } from "@/components/teaser-pos-evento";
// ...
<Hero fotoSrc="/hero-manobra.webp" />
<TeaserPosEvento />
<Sobre />
```

- [ ] **Step 3: Verify**

Run: `pnpm typecheck && pnpm lint && pnpm build`
Expected: PASS. With both flags `false` (shipped state), confirm the home's rendered HTML does not contain "Valeu, Brazlândia" anywhere (the component returns `null`).

- [ ] **Step 4: Commit**

```bash
git add components/teaser-pos-evento.tsx app/page.tsx
git commit -m "feat(home): TeaserPosEvento, gated pelas flags de publicação"
```

---

### Task 15: nav e sitemap condicionais

**Files:**
- Modify: `components/header.tsx:22-28` (the `links` array)
- Modify: `app/sitemap.ts` (base: `feat/pagina-resultados`'s diff, extended for `/galeria`)

**Interfaces:**
- Consumes: `galeria` (Task 4), `resultados` (Task 3)

- [ ] **Step 1: Update `components/header.tsx`**

The existing `links` array (lines 22-28) is a module-level constant; make it a function of the two flags, computed inside the component (Header is already `"use client"`, but the flags are static build-time data — no need for state, just compute once per render):

```ts
import { galeria } from "@/data/galeria";
import { resultados } from "@/data/resultados";

const linksAncora = [
  { href: "#sobre", rotulo: "Sobre" },
  { href: "#categorias", rotulo: "Categorias" },
  { href: "#patrocinio", rotulo: "Patrocínio" },
  { href: "#apoie", rotulo: "Apoie" },
  { href: "#contato", rotulo: "Contato" },
];

const links = [
  ...linksAncora,
  ...(galeria.publicada ? [{ href: "/galeria", rotulo: "Galeria" }] : []),
  ...(resultados.publicado ? [{ href: "/resultados", rotulo: "Resultados" }] : []),
];
```

Replace the current `const links = [...]` block (lines 22-28) with the above. Note: `/galeria` and `/resultados` are route links, not anchors — the existing `aoClicarLink` handler already only intervenes on `href` starting with `#` in principle, but check its current body: it calls `document.querySelector(href)` unconditionally. Guard it:

```ts
const aoClicarLink = useCallback(
  (evento: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return; // rota normal (/galeria, /resultados) — navegação padrão
    const alvo = document.querySelector(href);
    if (!alvo) return;
    evento.preventDefault();
    irParaAncora(alvo, ALTURA_HEADER_PX);
  },
  [],
);
```

- [ ] **Step 2: Update `app/sitemap.ts`**

```ts
import type { MetadataRoute } from "next";
import { galeria } from "@/data/galeria";
import { resultados } from "@/data/resultados";

export const dynamic = "force-static";

const SITE_URL = "https://brazskate.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/inscricao`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/patrocinio`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/regulamento`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/programacao`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/termo`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    // /galeria e /resultados só entram depois de publicados (D5) — enquanto
    // a rota responde 404, ficam de fora.
    ...(galeria.publicada
      ? [{ url: `${SITE_URL}/galeria`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 }]
      : []),
    ...(resultados.publicado
      ? [{ url: `${SITE_URL}/resultados`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 }]
      : []),
  ];
}
```

- [ ] **Step 3: Verify**

Run: `pnpm typecheck && pnpm lint && pnpm build`
Expected: PASS. Inspect `out/sitemap.xml` (or dev server `/sitemap.xml`) — confirm no `/galeria` or `/resultados` entry with both flags `false`. Inspect the rendered nav (dev server, view source) — confirm no "Galeria"/"Resultados" link appears.

- [ ] **Step 4: Commit**

```bash
git add components/header.tsx app/sitemap.ts
git commit -m "feat(nav): links de Galeria e Resultados condicionais às flags

Header e sitemap seguem o mesmo padrão de spread condicional já usado
pra /resultados na branch feat/pagina-resultados, estendido pra
/galeria. Handler de clique da nav passa a intervir só em href de
âncora (#) — /galeria e /resultados são rota, seguem navegação normal."
```

---

### Task 16: D61 em `docs/02-DECISOES.md` + nota no `05-DESIGN.md`

**Files:**
- Modify: `docs/02-DECISOES.md` (prepend a new row to the "Decisões tomadas" table)
- Modify: `docs/05-DESIGN.md:619` (guardrail 4, §6.2)

**Interfaces:** none (docs only)

- [ ] **Step 1: Add D61 to `docs/02-DECISOES.md`**

Insert as the new first row of the "Decisões tomadas" table (after the header row, before D60):

```markdown
| D61 | **Etapa pós-evento publicada: Galeria (`/galeria`) e Resultados (`/resultados`) reescrito.** Resultados passa a mostrar só a foto do pódio de cada categoria — sem nome, colocação ou placar (revisa o schema de nome+posição da branch `feat/pagina-resultados`, nunca mergeada). Galeria nova: loop de drone na abertura, grade em colagem, lightbox com Flip+Observer e **uma exceção pontual ao guardrail 4 do §6.2 de `05-DESIGN.md`** ("sem pin, sem scrub") — uma única faixa horizontal com `pin`+`scrub`, restrita a este componente (`components/faixa-scroll.tsx`) e só nesta rota. Seção de Agradecimentos ao fim da galeria (Organização, Fotografia e vídeo, Sempre por perto) — nomes de "Quem organiza" migram de `components/sobre.tsx` pra `data/equipe.ts`, fonte única com os Agradecimentos. Publicação de fato (flags `galeria.publicada`/`resultados.publicado`, seleção de fotos e trecho do drone) segue pendente — commit à parte do Lain | Spec `docs/superpowers/specs/2026-09-27-pos-evento-galeria-resultados-design.md`, brainstorming de 27/09/2026 | 27/09/2026 |
```

- [ ] **Step 2: Update `docs/05-DESIGN.md` guardrail 4**

Find (around line 619):

```
4. **Nada que trave scroll:** sem `pin`, sem `scrub` pesado no MVP.
```

Replace with:

```
4. **Nada que trave scroll:** sem `pin`, sem `scrub` pesado no MVP. **Exceção
   registrada em D61** (`docs/02-DECISOES.md`): a faixa horizontal de
   `/galeria` (`components/faixa-scroll.tsx`) usa `pin`+`scrub` — único caso
   no site, restrito a este componente e a esta rota, desligado por completo
   sob `prefers-reduced-motion`.
```

- [ ] **Step 3: Verify**

Run: `git diff docs/02-DECISOES.md docs/05-DESIGN.md` and read it back — confirm the table row parses as valid Markdown (no unescaped `|`) and the guardrail edit reads correctly in context.

- [ ] **Step 4: Commit**

```bash
git add docs/02-DECISOES.md docs/05-DESIGN.md
git commit -m "docs: registra D61 (etapa pós-evento) e a exceção ao guardrail 4"
```

---

### Task 17: pipeline de mídia — fotos

**Files:**
- Create: `scripts/processar-fotos-evento.mjs`

**Interfaces:**
- Produces: a Node CLI script: `node scripts/processar-fotos-evento.mjs <arquivo-origem> <slug-saida>` → writes `public/galeria/<slug-saida>-640w.webp` and `public/galeria/<slug-saida>-1600w.webp`, prints `{ largura, altura }` of the source (post-orientation) to stdout as JSON.

- [ ] **Step 1: Write the script**

```js
#!/usr/bin/env node
// Pipeline de fotos da galeria pós-evento (docs/superpowers/specs/
// 2026-09-27-pos-evento-galeria-resultados-design.md §7). Usa o
// ImageMagick já presente no sistema (mesma ferramenta usada ad hoc pra
// D59/D60) — sem dependência nova no package.json. Masters NUNCA entram
// no repo; só a saída (public/galeria/).
//
// Uso: node scripts/processar-fotos-evento.mjs <origem.jpg> <slug>
// Saída: public/galeria/<slug>-640w.webp, public/galeria/<slug>-1600w.webp
// Imprime em stdout: {"largura":N,"altura":N} (dimensões pós-orientação,
// pra colar em data/gallery.ts).

import { execFileSync } from "node:child_process";
import { mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const [, , origem, slug] = process.argv;
if (!origem || !slug) {
  console.error("Uso: node scripts/processar-fotos-evento.mjs <origem.jpg> <slug>");
  process.exit(1);
}

const RAIZ = dirname(dirname(fileURLToPath(import.meta.url)));
const DIR_SAIDA = join(RAIZ, "public", "galeria");
mkdirSync(DIR_SAIDA, { recursive: true });

const TETO_640_KB = 120;
const TETO_1600_KB = 350;

function gerarVariante(largura, tetoKb) {
  const saida = join(DIR_SAIDA, `${slug}-${largura}w.webp`);
  let qualidade = 78;
  for (let tentativa = 0; tentativa < 5; tentativa++) {
    execFileSync("magick", [
      origem,
      "-auto-orient",
      "-strip", // remove todo EXIF/GPS — repo é público
      "-resize", `${largura}x${largura * 2}>`,
      "-filter", "Lanczos",
      "-quality", String(qualidade),
      saida,
    ]);
    const tamanhoKb = statSync(saida).size / 1024;
    if (tamanhoKb <= tetoKb) break;
    qualidade -= 8;
  }
  return saida;
}

gerarVariante(640, TETO_640_KB);
gerarVariante(1600, TETO_1600_KB);

// Dimensões pós-orientação, pra `largura`/`altura` em data/gallery.ts
const identificar = execFileSync("magick", [
  "identify",
  "-auto-orient",
  "-format",
  "%w %h",
  origem,
]).toString().trim();
const [largura, altura] = identificar.split(" ").map(Number);
console.log(JSON.stringify({ largura, altura }));
```

- [ ] **Step 2: Verify against a fixture image**

Create a throwaway test fixture (not committed) and run the script:

```bash
magick -size 4000x6000 xc:gray /tmp/fixture-teste.jpg
node scripts/processar-fotos-evento.mjs /tmp/fixture-teste.jpg teste-fixture
```

Expected: prints `{"largura":4000,"altura":6000}`; creates `public/galeria/teste-fixture-640w.webp` (≤120KB) and `public/galeria/teste-fixture-1600w.webp` (≤350KB). Confirm no EXIF survives:

```bash
exiftool public/galeria/teste-fixture-640w.webp
```

Expected: no GPS/camera tags (only WebP container basics). Delete the fixture outputs before committing:

```bash
rm public/galeria/teste-fixture-640w.webp public/galeria/teste-fixture-1600w.webp /tmp/fixture-teste.jpg
```

- [ ] **Step 3: Commit**

```bash
git add scripts/processar-fotos-evento.mjs
git commit -m "feat(scripts): pipeline de fotos da galeria (EXIF strip + WebP 640/1600w)"
```

---

### Task 18: pipeline de mídia — loop de drone

**Files:**
- Create: `scripts/processar-loop-drone.mjs`

**Interfaces:**
- Produces: a Node CLI script: `node scripts/processar-loop-drone.mjs <origem.mp4> <inicio-seg> <duracao-seg>` → writes `public/galeria/loop-drone.mp4`, `public/galeria/loop-drone.webm`, `public/galeria/loop-drone-poster.webp`.

- [ ] **Step 1: Write the script**

```js
#!/usr/bin/env node
// Pipeline do loop de drone (docs/superpowers/specs/
// 2026-09-27-pos-evento-galeria-resultados-design.md §7). Usa ffmpeg (já
// presente no sistema). Corta um trecho de 6-10s, remove áudio e
// metadado, gera MP4 (H.264) + WebM (VP9) em 720p, ≤1,5MB cada, e um
// poster WebP do primeiro quadro.
//
// Uso: node scripts/processar-loop-drone.mjs <origem.mp4> <inicio-seg> <duracao-seg>
// duracao-seg deve estar entre 6 e 10.

import { execFileSync } from "node:child_process";
import { mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const [, , origem, inicio, duracao] = process.argv;
const duracaoNum = Number(duracao);
if (!origem || inicio === undefined || !(duracaoNum >= 6 && duracaoNum <= 10)) {
  console.error(
    "Uso: node scripts/processar-loop-drone.mjs <origem.mp4> <inicio-seg> <duracao-seg (6-10)>",
  );
  process.exit(1);
}

const RAIZ = dirname(dirname(fileURLToPath(import.meta.url)));
const DIR_SAIDA = join(RAIZ, "public", "galeria");
mkdirSync(DIR_SAIDA, { recursive: true });

const TETO_MB = 1.5;

function verificarTeto(caminho) {
  const tamanhoMb = statSync(caminho).size / 1024 / 1024;
  if (tamanhoMb > TETO_MB) {
    console.warn(`Aviso: ${caminho} tem ${tamanhoMb.toFixed(2)}MB (teto: ${TETO_MB}MB)`);
  }
}

const mp4 = join(DIR_SAIDA, "loop-drone.mp4");
execFileSync("ffmpeg", [
  "-y",
  "-ss", inicio,
  "-i", origem,
  "-t", String(duracaoNum),
  "-an", // sem áudio
  "-vf", "scale=-2:720",
  "-c:v", "libx264",
  "-crf", "28",
  "-preset", "slow",
  "-map_metadata", "-1",
  mp4,
]);
verificarTeto(mp4);

const webm = join(DIR_SAIDA, "loop-drone.webm");
execFileSync("ffmpeg", [
  "-y",
  "-ss", inicio,
  "-i", origem,
  "-t", String(duracaoNum),
  "-an",
  "-vf", "scale=-2:720",
  "-c:v", "libvpx-vp9",
  "-crf", "32",
  "-b:v", "0",
  "-map_metadata", "-1",
  webm,
]);
verificarTeto(webm);

const poster = join(DIR_SAIDA, "loop-drone-poster.webp");
execFileSync("ffmpeg", [
  "-y",
  "-ss", inicio,
  "-i", origem,
  "-frames:v", "1",
  "-vf", "scale=-2:720",
  poster,
]);

console.log(JSON.stringify({ mp4, webm, poster }));
```

- [ ] **Step 2: Verify against a fixture clip**

```bash
ffmpeg -y -f lavfi -i testsrc=duration=10:size=1280x720:rate=30 -pix_fmt yuv420p /tmp/fixture-drone.mp4
node scripts/processar-loop-drone.mjs /tmp/fixture-drone.mp4 0 8
```

Expected: prints the three output paths; `public/galeria/loop-drone.mp4` and `.webm` exist, each ≤1.5MB (or a warning printed if not — the synthetic fixture may compress oddly; the real footage is expected to fit given the resolution/CRF chosen); `loop-drone-poster.webp` exists and is a still image. Confirm no audio track:

```bash
ffprobe -v error -show_entries stream=codec_type public/galeria/loop-drone.mp4
```

Expected: only `codec_type=video`, no `audio` line. Delete fixture outputs before committing:

```bash
rm public/galeria/loop-drone.mp4 public/galeria/loop-drone.webm public/galeria/loop-drone-poster.webp /tmp/fixture-drone.mp4
```

- [ ] **Step 3: Commit**

```bash
git add scripts/processar-loop-drone.mjs
git commit -m "feat(scripts): pipeline do loop de drone (corte + MP4/WebM + poster)"
```

---

## After all tasks: branch-level verification

- [ ] Run `pnpm typecheck && pnpm lint && pnpm build` on the full branch — all green.
- [ ] Run Lighthouse mobile (throttled) against `/galeria` and `/resultados` on the local `pnpm build && pnpm start` output — confirm Performance ≥90, Accessibility ≥95, no JS-inicial regression beyond the ≤220KB budget in `05-DESIGN.md` §6.4 (GSAP/Flip/Observer are all lazy-loaded, so the initial bundle should be unaffected — verify, don't assume).
- [ ] Test on a real mid-range phone (§6.2 item 5), specifically the `faixa-scroll` pin/scrub interaction.
- [ ] Confirm the shipped state (`galeria.publicada: false`, `resultados.publicado: false`, `galeriaPosEvento: []`, `podios` all `null`) 404s both new routes and omits both from nav/sitemap/home teaser.
- [ ] Visual comparison against `docs/superpowers/specs/assets/2026-09-27-pos-evento-mockup.html`.

## Open follow-ups (not part of this plan — separate future commits by the Lain)

1. Fill `data/gallery.ts`'s `galeriaPosEvento` with the 33-photo selection once `baseDaPermissao` is confirmed per photo (spec §2.2).
2. Fill `data/resultados.ts`'s four `podios` entries with the chosen pódio photos.
3. Pick the drone clip's `inicio`/`duracao`, run `scripts/processar-loop-drone.mjs`, wire `videoSrcMp4`/`videoSrcWebm` into `app/galeria/page.tsx`'s `<LoopDrone>` call.
4. Flip `galeria.publicada` and `resultados.publicado` to `true`.
5. Fase 2 (OGL) — out of scope per spec §6, only if it later clears the stated entry criteria.
