# Brief de mídia — Braz Skate 2026

> Brief para geração de peças gráficas (Claude Design). O repositório está
> vinculado — leia os arquivos citados aqui direto da fonte, não recrie de
> memória. Fonte de verdade do design: `docs/05-DESIGN.md` e
> `app/globals.css`.

---

## 0. Antes de desenhar: o design system já existe

**Não invente uma identidade nova.** Este projeto já tem um design system
implementado e documentado. Extraia-o e formalize-o como design system
reutilizável antes de gerar qualquer peça:

- `app/globals.css` — tokens reais (cores, raios, sombras, fontes), em uso.
- `docs/05-DESIGN.md` — o racional de cada decisão (§2 tokens, §3
  componentes, §4 hero e imagem, §6 motion).
- `components/` — a implementação viva: `sticker-badge.tsx`, `rasgo.tsx`,
  `grao.tsx`, `rabiscos.tsx`, `botao.tsx`, `colagem.tsx`.

O resultado das peças precisa parecer a mesma marca do site
(https://brazskate.vercel.app), não uma releitura.

### Tokens (transcritos de `app/globals.css` — confira lá)

| Token | Valor | Uso |
|---|---|---|
| `tinta` | `#191314` | o "preto" da marca — preto aquecido, nunca `#000` |
| `creme` | `#f5ebe4` | o "branco" da marca — papel, nunca `#fff` |
| `creme-elevado` | `#faf4ef` | superfície de card no registro claro |
| `rosa` | `#f0d9ce` | eyebrow/apoio sobre fundo escuro |
| `vermelho-300` | `#d98b85` | acento sobre fundo escuro |
| `vermelho-500` | `#a84b4b` | cor de marca — gráfico e título ≥24px |
| `vermelho-600` | `#9c4242` | botão primário |
| `vermelho-700` | `#8e3a3a` | acento sobre fundo claro |
| `azul-600/700` | `#1e7fa6` / `#176688` | utilitário (link/foco) — **nunca decorativo** |

**Regra dura:** `vermelho-500` nunca em texto corrido — só texto ≥24px ou
elemento gráfico (contraste).

- **Raios:** botão `4px`, card `8px`, sticker `999px`. Cantos firmes de
  cartaz, nunca "fofos" de SaaS.
- **Sombra:** dura e deslocada, **sem blur** — `4px 4px 0 #191314` (card),
  `2px 3px 0 #191314` (sticker). É colagem de papel, não elevação de UI.
- **Tipografia:** **Anton** (display, `public/fonts/Anton-Regular.ttf`,
  OFL) — sempre CAIXA ALTA, nunca abaixo de 2rem, nunca em texto corrido.
  **Archivo** (texto). O contraste entre as duas é a assinatura da marca.

### Vocabulário visual (§2.1, §3)

- **Registros alternados:** `asfalto` (fundo tinta, texto creme) e
  `concreto` (fundo creme, texto tinta). Toda peça escolhe um registro.
- **Rasgo:** a transição entre registros é uma borda rasgada irregular
  (`components/rasgo.tsx`), não uma linha reta.
- **Grão:** textura de ruído sutil (~6% de opacidade) sobre fundos —
  `components/grao.tsx`. Nunca sobre texto corrido.
- **Sticker badge:** pílula rotacionada levemente, com sombra dura — é como
  a marca marca data, status e placeholder ("em breve").
- **Rabiscos:** sublinhado/seta/círculo desenhados à mão em SVG
  (`components/rabiscos.tsx`), sempre em `currentColor`.
- **Colagem:** fotos em moldura clara estilo foto impressa, levemente
  rotacionadas — rotação **fixa**, nunca aleatória.

---

## 1. Assets disponíveis (caminhos reais no repositório)

**Logos** — `docs/assets/logos/`
`LOGO-COMPLETA.png` · `LOGO-COMPLETA_Branco.png` · `LOGO-COMPLETA_Preto.png`
`LOGO-PIN_BRanco.png` · `LOGO-PIN_Preto.png`
`LOGO-SKATE.png` · `LOGO-SKATE_Branco.png`
`LOGO-ALTERNATIVA.png` · `LOGO-ALTERNATIVA_Branco.png`
Versões em uso no site: `public/logo-completa.png`, `public/logo-pin.png`.

**Foto do hero já tratada** — `docs/assets/hero-tratado-1920x1080.png`
Manobra na pista de Brazlândia com o tratamento de marca do site já
aplicado (grayscale → duotone `#a84b4b` multiply 40% → scrim
tinta 80%/50%/30% de baixo para cima → grão 6%). **Use este arquivo como
base do banner** — não reprocesse a foto original, o tratamento é a
identidade. Original sem tratamento: `public/hero-manobra.webp`.

**Fotos da pista atual** — `public/galeria/pista-01..03.webp` (crédito: Cauet)

**Fotos do campeonato de 2021** — `public/galeria/2021-01..09.webp`
(crédito: Acervo ASB). Pódios por categoria — Mirim, Iniciante, Amador.
Ver o agrupamento correto em `data/gallery.ts`.

**Parceiro institucional** — `public/logo-uiemapv.jpg` (UIEMAPV)

**Referência de estilo de post** — `docs/assets/estilo-posts.jpeg`

---

## 2. Dados do evento (não invente nada além disto)

Fonte: `data/evento.ts`, `data/categories.ts`, `data/regulamento.ts`,
`docs/media-kit-braz-skate.md`, `docs/02-DECISOES.md`.

- **Evento:** Braz Skate — campeonato de skate de Brazlândia-DF
- **Organização:** ASB — Associação Skate Brazlândia
- **Data:** 13 de setembro de 2026 (confirmada)
- **Local:** Skate Park Brazlândia (pista à beira do lago)
- **Categorias:** Iniciante, Amador, Feminino — **sem categoria mirim em
  2026** (a de 2021 tinha; as fotos históricas de mirim são de 2021)
- **Inscrição:** gratuita, online (Tally) + cota presencial no dia,
  limite total de 60 competidores
- **Formato:** fase única, 2 passagens de 1 minuto, conta a melhor
- **Premiação:** medalha para quem compete + premiação ao top 3
  (Feminino: medalha e premiação para todas)
- **Parceiro institucional:** UIEMAPV
- **Site:** https://brazskate.vercel.app
- **Instagram:** @brazskate

**Regras de conteúdo (inegociáveis, de `AGENT.md`):**

1. **Tom celebratório e institucional** — nunca de denúncia, nunca
   confrontador com a Administração. O site adota um texto neutro sobre o
   estado da pista; peça gráfica não entra nesse assunto.
2. **Política de placeholder** — o que a organização ainda não confirmou
   (horários exatos, itens específicos de premiação, valores em R$) entra
   como "em breve", **nunca inventado ou estimado**.
3. **Sem patrocinador não confirmado** — a captação ainda não fechou
   nenhuma marca comercial. Não desenhe grade de logos de patrocinador,
   e **não use as marcas de 2021** (`docs/leads-patrocinio-2021.md` é
   lista interna de prospecção, não de apoiadores atuais).
4. **Imagem de menores** — use apenas as fotos já em `public/galeria/`
   (permissão registrada). Não republique nome próprio de competidor: a
   legenda é sempre categoria + colocação.

---

## 3. Peças a produzir

### 3.1 Media kit de patrocínio

**Formato:** A4 vertical, multipágina, para PDF (envio por WhatsApp/e-mail
a marcas). Precisa ficar legível em tela de celular.

**Conteúdo:** adapte `docs/media-kit-braz-skate.md` na íntegra —
1. Capa (registro asfalto, logo completa, foto tratada, data)
2. Sobre o Braz Skate e a ASB
3. Parceria institucional (UIEMAPV)
4. Por que apoiar — 5 argumentos
5. Formas de apoio — 5 tipos (financeiro, premiação, infraestrutura,
   divulgação/mídia, institucional)
6. **Contrapartidas em dois níveis** (`data/contrapartidas.ts`):
   **Patrocínio** (financeiro/premiação) → menção no som, faixa da marca
   na pista, logo e link no site, menção nas redes.
   **Apoio** (infraestrutura/divulgação) → menção no som, nome no site,
   menção nas redes. **Sem valores em R$** — a contrapartida final é
   acertada com a organização.
7. Contato + QR do Pix (`public/pix-qr.png`)

Use as fotos de 2021 como prova social do precedente ("a edição de 2021
aconteceu e deu certo") e as da pista atual para mostrar o local.

### 3.2 Carrossel para Instagram

**Formato:** 1080×1350 (4:5), 7 slides. Primeiro slide precisa parar o
scroll; último precisa ter CTA claro.

Sugestão de roteiro (ajuste se enxergar melhor):
1. **Capa** — foto tratada + "BRAZ SKATE" em Anton + sticker "12 DE SETEMBRO"
2. **O que é** — campeonato de skate de Brazlândia, feito pela cena
3. **Categorias** — Iniciante, Amador, Feminino (cards estilo colagem)
4. **Como funciona** — 2 passagens de 1 min, conta a melhor, fase única
5. **Premiação** — medalha pra quem compete + top 3
6. **Inscrição** — gratuita, online ou no dia (limite de 60)
7. **CTA** — link na bio, @brazskate, sticker "INSCRIÇÕES ABERTAS"

Alterne registro asfalto/concreto entre slides (usando o rasgo como
transição de linguagem), pra o carrossel ter ritmo visual.

### 3.3 Banner LinkedIn

**Formato:** 1920×1080.
**Base obrigatória:** `docs/assets/hero-tratado-1920x1080.png` — a foto já
vem com o tratamento de marca; componha por cima, não refaça.

**Composição:** logo completa em creme, "BRAZ SKATE" em Anton caixa alta,
eyebrow "CAMPEONATO DE SKATE · BRAZLÂNDIA-DF", sticker com a data
(13 de setembro de 2026), rabisco de sublinhado em `vermelho-500`.
A área inferior-esquerda da foto é a mais escura (scrim) — é onde o texto
respira melhor. Evite encher o quadro: é cartaz, não flyer poluído.

Referência de composição já pronta: `public/og.png` (OG image do site) e
`components/hero.tsx`.

---

## 4. Entrega

Para cada peça, entregue também a **fonte editável** — a organização vai
precisar refazer variações (ex.: quando os horários forem confirmados, ou
quando entrar o primeiro patrocinador). E documente os tokens no formato de
design system reutilizável, para as próximas peças não recomeçarem do zero.
