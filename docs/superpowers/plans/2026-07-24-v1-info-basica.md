# V1.1 · Info básica (data prevista, local, e-mail) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Exibir no site a data/inscrição previstas (como previsão, sem countdown), uma seção de localização com mapa embutido, e o e-mail da ASB como terceiro canal de contato — tudo lido de uma fonte única em `data/evento.ts`.

**Architecture:** Site estático Next.js (App Router, `output: 'export'`). Novo módulo de dados `data/evento.ts` centraliza tudo que muda (datas, local, e-mail); componentes existentes passam a lê-lo. Uma nova seção `components/localizacao.tsx` segue o padrão das seções concreto (Reveal + SectionHeader + conteúdo), entrando na home entre Sobre e Categorias.

**Tech Stack:** Next.js 16, TypeScript strict, Tailwind CSS v4, `next/font`. Sem novas dependências.

## Global Constraints

- **Stack travada:** Next.js App Router + TS strict + Tailwind v4, `output: 'export'` (estático; `images.unoptimized: true`). Sem backend, sem novas dependências.
- **Sem framework de teste no projeto** (verificado: `package.json` tem só `dev/build/lint/typecheck/start`, nenhum arquivo de teste). Não introduzir um — YAGNI para site estático. **Ciclo de verificação de cada tarefa:** `pnpm typecheck` + `pnpm lint` + `pnpm build` limpos, mais checagem visual no browser onde há mudança visível (mesmo método do MVP inteiro).
- **Disciplina de placeholder** (`AGENT.md`): a data é **previsão**, nunca definitiva. Rótulos deixam isso explícito ("Previsão:", "previsão"). Nada de countdown enquanto a data não travar (decisão do Lain, 24/07/2026).
- **Fonte única:** todo dado que muda (data, inscrição, local, e-mail) vive em `data/evento.ts`. Nenhum componente hardcoda esses valores.
- **Design:** reusar tokens e componentes de `05-DESIGN.md` — `SectionHeader` (§3.3), `Botao` (§3.1), `Reveal` (§6.1), registros `registro-concreto`/`registro-asfalto` (§2.1). Não inventar padrão novo.
- **Orçamento de performance** (`05-DESIGN.md` §6.4) segue valendo: o `iframe` do mapa é `loading="lazy"` e não fica acima da dobra — não deve mexer no LCP da home.
- **Acessibilidade:** `iframe` com `title` descritivo; botão de fallback do mapa navegável por teclado; foco visível (herdado dos componentes).
- **Commits:** Conventional Commits, descrição em português (`CONTRIBUTING.md`).

## Prerequisites (base branch)

Este plano assume que a implementação nasce de uma branch a partir de `dev`
**depois** de mergeadas: (1) `feat/hero-logos-responsivo` (traz o hero com
logo/responsividade e a faixa escondida no mobile — a Tarefa 2 edita a
região dos stickers, que essa branch também mexeu; mergear antes evita
conflito) e (2) a branch desta spec+plano (`docs/spec-info-basica-v1`).
Recomendado: branch de trabalho `feat/v1-info-basica` a partir de `dev` já
com esses merges.

## File Structure

- **Create** `data/evento.ts` — fonte única: datas previstas (canônica + curta p/ sticker), local (nome, coordenadas, mapsUrl), e-mail; helper `mapaEmbedUrl`.
- **Create** `components/localizacao.tsx` — seção "onde acontece" (mapa + endereço + botão de fallback).
- **Modify** `components/hero.tsx` — dois stickers passam a ler de `evento` (texto de previsão).
- **Modify** `components/contato.tsx` — terceiro botão: e-mail (`mailto`).
- **Modify** `components/footer.tsx` — novo `<li>` de e-mail na lista de contato.
- **Modify** `app/page.tsx` — inserir `<Localizacao />` entre `<Sobre />` e `<Categorias />`.
- **Modify** `docs/02-DECISOES.md`, `docs/05-DESIGN.md`, `docs/contatos.md` — refletir o estado real (D15, P2 resolvida, nota em P1, linha de e-mail, canal novo).

---

### Task 1: `data/evento.ts` — fonte única de dados do evento

**Files:**
- Create: `data/evento.ts`

**Interfaces:**
- Produces: `evento` (objeto `as const`) com `dataPrevista: string`, `dataPrevistaCurta: string`, `inscricaoAbrePrevista: string`, `inscricaoAbrePrevistaCurta: string`, `local: { nome: string; coordenadas: { lat: number; lng: number }; mapsUrl: string }`, `email: string`.
- Produces: `mapaEmbedUrl(coord: { lat: number; lng: number }): string`.

- [ ] **Step 1: Criar o módulo de dados**

Create `data/evento.ts`:

```ts
// Fonte única de tudo que muda no evento (data, inscrição, local, e-mail) —
// ver docs/04-ROADMAP-V1.md (V1.1) e a spec em
// docs/superpowers/specs/2026-07-17-info-basica-data-local-contato-design.md.
// Datas são PREVISÃO (não travadas) — trocar aqui reflete no site inteiro.

export const evento = {
  // data canônica (textos longos: seção de local, futura página cheia)
  dataPrevista: "22 de agosto de 2026",
  inscricaoAbrePrevista: "1º de agosto de 2026",
  // forma curta (mesmo dado, formatado para caber no sticker do hero)
  dataPrevistaCurta: "22 de agosto",
  inscricaoAbrePrevistaCurta: "01/08",
  local: {
    nome: "Skate Park Brazlândia",
    coordenadas: { lat: -15.6824327, lng: -48.1982567 },
    mapsUrl: "https://maps.app.goo.gl/NkqhC382eUqRwyYM7",
  },
  email: "associacaoskatebrazlandia@gmail.com",
} as const;

// URL de embed do Google Maps derivada das coordenadas (nunca hardcoded) —
// se o local mudar, só troca `evento.local.coordenadas`.
export function mapaEmbedUrl(coord: { lat: number; lng: number }): string {
  return `https://www.google.com/maps?q=${coord.lat},${coord.lng}&output=embed`;
}
```

- [ ] **Step 2: Verificar tipos**

Run: `pnpm typecheck`
Expected: PASS (sem erros).

- [ ] **Step 3: Commit**

```bash
git add data/evento.ts
git commit -m "feat(dados): adiciona data/evento.ts como fonte única do evento"
```

---

### Task 2: Hero — stickers leem a previsão de `evento`

**Files:**
- Modify: `components/hero.tsx`

**Interfaces:**
- Consumes: `evento` de `@/data/evento` (Task 1).

- [ ] **Step 1: Importar `evento` no hero**

Em `components/hero.tsx`, adicionar o import junto aos demais imports do topo:

```tsx
import { evento } from "@/data/evento";
```

- [ ] **Step 2: Trocar o texto do sticker de data**

Localizar:

```tsx
<StickerBadge variante="data">Data a confirmar</StickerBadge>
```

Substituir por:

```tsx
<StickerBadge variante="data">Previsão: {evento.dataPrevistaCurta}</StickerBadge>
```

- [ ] **Step 3: Trocar o texto do sticker de inscrição**

Localizar:

```tsx
<StickerBadge variante="breve">Pré-inscrição em breve</StickerBadge>
```

Substituir por:

```tsx
<StickerBadge variante="breve">
  Inscrição: previsão {evento.inscricaoAbrePrevistaCurta}
</StickerBadge>
```

- [ ] **Step 4: Verificar tipos e lint**

Run: `pnpm typecheck && pnpm lint`
Expected: PASS.

- [ ] **Step 5: Verificar no browser**

Run: `pnpm dev` e abrir `http://localhost:3000` (ou screenshot headless — neste ambiente há Chrome em `/home/lain/BurpSuiteCommunity/burpbrowser/143.0.7499.146/chrome`, usar `--headless=new --disable-gpu --no-sandbox --screenshot=...`).
Expected: hero mostra o sticker vermelho "PREVISÃO: 22 DE AGOSTO" e o sticker creme "INSCRIÇÃO: PREVISÃO 01/08"; ambos cabem no pill sem estourar a largura no mobile (360px) e no desktop.

- [ ] **Step 6: Commit**

```bash
git add components/hero.tsx
git commit -m "feat(home): hero mostra data/inscrição previstas de data/evento.ts"
```

---

### Task 3: Seção de localização + inserção na home

**Files:**
- Create: `components/localizacao.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `evento`, `mapaEmbedUrl` de `@/data/evento` (Task 1); `Botao`, `Reveal`, `SectionHeader` (existentes).
- Produces: `Localizacao()` (React component, sem props).

- [ ] **Step 1: Criar o componente de localização**

Create `components/localizacao.tsx`:

```tsx
import { evento, mapaEmbedUrl } from "@/data/evento";
import { Botao } from "./botao";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";

// Seção "onde acontece" (roadmap V1.1): registro concreto, entre Sobre e
// Categorias (sem novo rasgo — ambas concreto). Mapa embutido derivado das
// coordenadas de data/evento.ts; botão de fallback sempre visível.
export function Localizacao() {
  return (
    <section id="local" className="registro-concreto">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <Reveal>
          <div data-reveal>
            <SectionHeader
              eyebrow="Onde acontece"
              titulo={evento.local.nome}
              lead="Na pista à beira do lago, no complexo esportivo da cidade."
            />
          </div>

          <div
            data-reveal
            className="mt-10 overflow-hidden rounded-card shadow-card"
          >
            <iframe
              src={mapaEmbedUrl(evento.local.coordenadas)}
              title={`Mapa da localização — ${evento.local.nome}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="aspect-video w-full border-0"
            />
          </div>

          <div data-reveal className="mt-6">
            <Botao
              href={evento.local.mapsUrl}
              rel="noopener"
              variante="secundario"
            >
              Abrir no Google Maps
            </Botao>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Inserir na home entre Sobre e Categorias**

Em `app/page.tsx`, adicionar o import (mantendo a ordem alfabética dos imports existentes):

```tsx
import { Localizacao } from "@/components/localizacao";
```

E no JSX, inserir entre `<Sobre />` e `<Categorias />`:

```tsx
        <Sobre />
        <Localizacao />
        <Categorias />
```

- [ ] **Step 3: Verificar tipos, lint e build**

Run: `pnpm typecheck && pnpm lint && pnpm build`
Expected: PASS; build estático gera a home sem erro.

- [ ] **Step 4: Verificar no browser**

Run: `pnpm dev` e abrir `http://localhost:3000` (ou screenshot headless, mobile 360px e desktop).
Expected: seção "Onde acontece" aparece depois de "Sobre" e antes de "Categorias"; o mapa do Google carrega apontando para o Skate Park Brazlândia; o botão "Abrir no Google Maps" abre `evento.local.mapsUrl`; a seção lê bem no mobile (mapa em `aspect-video`, sem overflow horizontal).

- [ ] **Step 5: Commit**

```bash
git add components/localizacao.tsx app/page.tsx
git commit -m "feat(home): adiciona seção de localização com mapa embutido"
```

---

### Task 4: E-mail como terceiro canal (Contato + Footer)

**Files:**
- Modify: `components/contato.tsx`
- Modify: `components/footer.tsx`

**Interfaces:**
- Consumes: `evento` de `@/data/evento` (Task 1).

- [ ] **Step 1: Adicionar o e-mail no Contato**

Em `components/contato.tsx`, adicionar o import:

```tsx
import { evento } from "@/data/evento";
```

Depois do botão do Instagram (dentro do mesmo `<div ... flex flex-wrap ...>`), adicionar um terceiro botão:

```tsx
          <Botao
            href={`mailto:${evento.email}`}
            variante="secundario"
          >
            Falar por e-mail
          </Botao>
```

- [ ] **Step 2: Adicionar o e-mail no Footer**

Em `components/footer.tsx`, adicionar o import:

```tsx
import { evento } from "@/data/evento";
```

Na `<ul>` de redes/contato (a que já tem Instagram e WhatsApp), adicionar um `<li>` novo, seguindo o mesmo padrão visual:

```tsx
            <li>
              <a
                href={`mailto:${evento.email}`}
                className="py-1 font-semibold text-(--link) underline-offset-4 hover:underline"
              >
                E-mail da organização
              </a>
            </li>
```

- [ ] **Step 3: Verificar tipos, lint e build**

Run: `pnpm typecheck && pnpm lint && pnpm build`
Expected: PASS.

- [ ] **Step 4: Verificar no browser**

Run: `pnpm dev` e abrir `http://localhost:3000` (mobile e desktop).
Expected: seção Contato tem três ações (WhatsApp, Instagram, E-mail); o footer lista "E-mail da organização"; clicar/focar o e-mail dispara `mailto:associacaoskatebrazlandia@gmail.com`; navegação por teclado alcança os novos elementos com foco visível.

- [ ] **Step 5: Commit**

```bash
git add components/contato.tsx components/footer.tsx
git commit -m "feat(contato): adiciona e-mail da ASB no Contato e no Footer"
```

---

### Task 5: Atualizar a documentação para o estado real

**Files:**
- Modify: `docs/02-DECISOES.md`
- Modify: `docs/05-DESIGN.md`
- Modify: `docs/contatos.md`

**Interfaces:**
- Consumes: nada (documentação).

- [ ] **Step 1: `docs/02-DECISOES.md` — nova decisão D15**

Na tabela "Decisões tomadas", adicionar como primeira linha de dados (acima de D14):

```markdown
| D15 | Conversa (não reunião formal) entre ASB, Administração Regional e instituto parceiro definiu: **divisão de responsabilidades** (Administração + instituto: estrutura, premiação; ASB: site, artes, divulgação, patrocínios), **espaço do evento garantido** (inclui fechamento de rua) e **datas previstas** — evento 22/08, inscrição 01/08 — **sujeitas a mudança** (não são compromisso formal) | Destrava P2 e dá base de conteúdo à sub-etapa V1.1, sem travar a data | 24/07/2026 |
```

- [ ] **Step 2: `docs/02-DECISOES.md` — mover P2 para resolvida**

Na tabela "Pendências (bloqueadas pela reunião com a Administração)", **remover** a linha de P2:

```markdown
| P2 | Autorização de uso do espaço / fechamento de rua | Página "data e local" definitiva |
```

E registrá-la como resolvida — adicionar ao final da seção "Decisões revisadas" (ou criar um bloco "Pendências resolvidas" logo após a tabela de pendências, se preferir):

```markdown
- **P2 (autorização de espaço / fechamento de rua)** — resolvida em
  24/07/2026: espaço do evento garantido, incluindo fechamento de rua, via
  conversa com a Administração e o instituto parceiro (ver D15).
```

- [ ] **Step 3: `docs/02-DECISOES.md` — nota em P1**

Na linha de P1 da tabela de pendências, ajustar a coluna "Bloqueia o quê no site" para registrar que há previsão sem travar a pendência:

De:

```markdown
| P1 | Data do evento | Countdown, página de inscrição aberta, compra de domínio |
```

Para:

```markdown
| P1 | Data do evento | Countdown, página de inscrição aberta, compra de domínio. Há **previsão** (22/08) exibida como tal no site (V1.1), mas a pendência só fecha com data oficial |
```

- [ ] **Step 4: `docs/02-DECISOES.md` — atualizar data do cabeçalho**

No topo do arquivo, trocar `> Última atualização: 16/07/2026.` por `> Última atualização: 24/07/2026.`.

- [ ] **Step 5: `docs/05-DESIGN.md` — linha de e-mail em §7**

Na tabela de §7 ("Decisões e pendências que este plano consome"), substituir a linha:

```markdown
| E-mail de contato | Não existe | Contato = Instagram + WhatsApp; e-mail entra se/quando o Lain fornecer |
```

por:

```markdown
| E-mail de contato | Existe (`associacaoskatebrazlandia@gmail.com`) | Contato = Instagram + WhatsApp + e-mail (adicionado na V1.1) |
```

- [ ] **Step 6: `docs/contatos.md` — adicionar o e-mail**

Adicionar uma linha ao arquivo:

```
email: associacaoskatebrazlandia@gmail.com
```

- [ ] **Step 7: Revisar as edições**

Reler os três arquivos e confirmar: D15 presente e coerente; P2 fora da tabela de pendências e registrada como resolvida; P1 com a nota de previsão; §7 do design com o e-mail; `contatos.md` com o e-mail. Nenhum outro texto alterado.

- [ ] **Step 8: Commit**

```bash
git add docs/02-DECISOES.md docs/05-DESIGN.md docs/contatos.md
git commit -m "docs: registra D15, resolve P2 e adiciona e-mail de contato (V1.1)"
```

---

## Verificação final da sub-etapa

- [ ] `pnpm typecheck && pnpm lint && pnpm build` limpos.
- [ ] Lighthouse mobile local na home dentro do orçamento (`05-DESIGN.md` §6.4) — conferir que o `iframe` lazy não derrubou Performance/LCP (medir com servidor com compressão + cache, não `python -m http.server` cru).
- [ ] Conferência visual mobile (360px) e desktop: hero com previsões, seção de localização com mapa, e-mail no Contato e Footer.
- [ ] Trocar um valor em `data/evento.ts` (ex.: `dataPrevistaCurta`) e confirmar que reflete no hero sem tocar em componente — prova da fonte única.
