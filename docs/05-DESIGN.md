# Braz Skate — Plano de Design / UI / UX

> **STATUS: APROVADO COMO DIREÇÃO — refinável durante a implementação.**
> Decisões de gosto (direção de arte, tipografia, tratamento do hero,
> estratégia de animação) foram aprovadas pelo Lain em 16/07/2026.
> Este documento é a referência de design de TODOS os PRs do MVP.
> Se algo aqui conflitar com `AGENT.md` ou com os docs 01–03, pare e pergunte.
> Última atualização: 16/07/2026.

**Como usar este documento (leia primeiro, Lino):** cada PR do roadmap
(`04-ROADMAP-MVP.md`) aponta para as seções daqui que ele consome. Antes de
escrever um componente, procure-o no §3 — a anatomia, os estados e as notas
de acessibilidade já estão definidos. Na dúvida entre "inventar um padrão
novo" e "usar o que está aqui": use o que está aqui, e se não existir,
pergunte antes de inventar.

---

## 1. Brief de design

### 1.1 A tensão que este design resolve

O site tem dois públicos com expectativas quase opostas:

- **Skatistas do DF e entorno** — esperam linguagem de rua: graffiti,
  spray, stencil, colagem, adesivo, tipografia de cartaz. É a cultura do
  evento; sem ela o site não fala com quem vai competir.
- **Administração Regional e patrocinadores** — o mesmo link é o cartão
  de visitas da ASB numa reunião institucional. Precisa transmitir
  organização, credibilidade e seriedade.

### 1.2 A direção: rua com acabamento

A resposta não é um meio-termo morno — é **estética de rua entregue com
craft**. A energia vem dos elementos gráficos (textura de spray/grão,
adesivos, rabiscos à mão, tipografia de cartaz); a credibilidade vem da
execução (grid disciplinado, espaçamento generoso, hierarquia limpa,
acessibilidade impecável, performance rápida). Um patrocinador percebe
craft mesmo sem vocabulário de design: o site abre rápido, lê bem no
celular e nada parece quebrado ou amador.

**Como a linguagem de rua se manifesta, concretamente:**

| Elemento | O que é | Onde aparece |
|---|---|---|
| Grão/spray | Textura sutil de ruído (SVG `feTurbulence`, custo zero) sobre fundos escuros | Hero, footer, OG image |
| Adesivos (stickers) | Badges com sombra dura deslocada e rotação leve (±2°), como adesivo colado em shape | Placeholders ("data a confirmar"), destaques |
| Rabiscos | Traços à mão em SVG próprio: sublinhados, setas, círculos | Sublinhado de títulos de seção, apontadores de CTA |
| Tipografia de cartaz | Display condensada gigante em caixa alta, apertada | Hero, títulos de seção |
| Colagem | Sombras duras deslocadas (sem blur) em cards e botões, como papel colado em camadas | Cards, CTAs |
| Papel rasgado | Divisor de seção com borda irregular de rasgo (SVG, custo zero) | Transições entre registros asfalto ⇄ concreto |
| Marquee | Faixa de texto repetido rolando na horizontal, como fita de cartaz | Entre hero e sobre; wordmark de energia |

**A assinatura do site — "o placeholder é adesivo":** este projeto tem uma
disciplina rígida de placeholder (nada de data/premiação inventada — ver
`AGENT.md`). Em vez de esconder isso, o design assume: toda informação
pendente aparece como um **sticker** ("DATA A CONFIRMAR", "REGULAMENTO EM
BREVE") — rotacionado, com sombra dura, com cara de adesivo de skate. A
limitação vira identidade: o site parece um cartaz sendo montado pela
cena, não um site incompleto.

### 1.3 Referências (o equilíbrio que buscamos)

- **STU — Skate Total Urbe** (circuito nacional de skate): identidade
  urbana forte convivendo com patrocinadores grandes e tom de campeonato
  oficial. É a prova de que "rua" e "institucional" coexistem no skate BR.
- **House of Vans**: marca global entregando cultura de skate com
  acabamento impecável — textura e atitude, mas grid e hierarquia limpos.
- **Layback Festival**: cena brasileira, cartazes com tipografia de
  impacto e cores francas, sem cair em clipart de graffiti.

### 1.4 O que EVITAR (os dois abismos)

Lado "amador":
- Fontes "graffiti" gratuitas de banco (drips, bubble letters) — é o
  clipart da rua. A atitude vem da composição, não de uma fonte temática.
- Neon glow, chamas, excesso de rotação/textura em tudo — vira poluição.
- Spray fake photoshopado sobre cada título.
- Fotos de banco de imagem de "skatista genérico" — só fotos reais da
  cena (quando existirem, ver §4).

Lado "corporativo sem alma":
- Cinza + azul corporativo, cantos muito arredondados, sombras difusas
  de SaaS.
- Copy burocrático ("realização", "viabilização") — o tom é celebratório
  e direto (ver 1.5).
- Apagar textura e rabisco "para ficar sério" — sem eles o site vira
  template.

### 1.5 Tom emocional por seção

| Seção | Tom | Na prática |
|---|---|---|
| Hero | Energia e orgulho | Display gigante, fundo tinta com grão, sticker de data. "É aqui que acontece." |
| Sobre + ASB | Caloroso, comunitário | Fundo claro, texto respirando, história dos anos 2000 e de 2021. "A gente sempre esteve aqui." |
| Categorias | Convite claro | Cards objetivos, sem burocracia. "Tem lugar pra você." |
| Patrocínio | Confiável, objetivo | Números e formas de apoio diretos, contato imediato. "Proposta séria, retorno real." |
| Pix | Cumplicidade | Discreto, "apoie a cena", transparência sobre destino. |
| Contato/Footer | Próximo | Canais reais (Instagram, WhatsApp), fundo tinta fechando o cartaz. |

---

## 2. Design system (fundação)

Tudo abaixo vira `app/globals.css` (Tailwind v4, bloco `@theme`) no PR de
fundação. Os nomes de token são os nomes a usar no código.

### 2.1 Cor

**Origem:** paleta extraída de `docs/assets/logo.png` (vermelho queimado,
creme-rosado, tinta preta) com o clima quente/solar de
`docs/assets/estilo-posts.jpeg`. O azul entra como cor utilitária
(links/foco), ecoando o azul da pista e do céu nas fotos de referência.

**Conceito dos dois registros:** o site alterna entre seções **asfalto**
(fundo escuro `tinta`, alta energia: hero, footer) e seções **concreto**
(fundo claro `creme`, leitura confortável: sobre, categorias, patrocínio).
A alternância cria o ritmo de cartaz e mapeia a tensão do brief: asfalto
fala com a cena, concreto fala com a instituição.

**Paleta crua:**

```css
@theme {
  /* tinta — o "preto" da marca (preto aquecido, não #000) */
  --color-tinta: #191314;

  /* creme — o "branco" da marca (papel, não #fff) */
  --color-creme: #f5ebe4;
  --color-creme-elevado: #faf4ef;   /* surface elevada em fundo claro */
  --color-rosa: #f0d9ce;            /* tom do lettering do logo; uso gráfico */

  /* vermelho queimado — cor da marca */
  --color-vermelho-300: #d98b85;    /* acentos/texto em fundo tinta */
  --color-vermelho-500: #a84b4b;    /* cor da marca crua; uso gráfico */
  --color-vermelho-600: #9c4242;    /* fundo do CTA primário */
  --color-vermelho-700: #8e3a3a;    /* texto vermelho sobre creme */

  /* azul pista — utilitário (links e foco), nunca decorativo */
  --color-azul-300: #7cc3e0;        /* links sobre tinta */
  --color-azul-600: #1e7fa6;        /* anel de foco (ambos os registros) */
  --color-azul-700: #176688;        /* links sobre creme */
}
```

**Papéis semânticos (o que usar no código):**

| Papel | Registro concreto (claro) | Registro asfalto (escuro) |
|---|---|---|
| background | `creme` | `tinta` |
| surface (card) | `creme-elevado` | `tinta` + borda `creme` 15% |
| texto principal | `tinta` | `creme` |
| texto secundário | `tinta` 70% | `creme` 75% |
| primária (CTA bg) | `vermelho-600` | `vermelho-600` |
| texto sobre primária | `creme` | `creme` |
| acento (texto) | `vermelho-700` | `vermelho-300` |
| link | `azul-700` | `azul-300` |
| borda | `tinta` 15% | `creme` 20% |
| foco (outline) | `azul-600` | `azul-600` |

**Contraste (WCAG AA) — pares verificados:**

| Par | Razão aprox. | Status |
|---|---|---|
| `tinta` sobre `creme` (texto principal claro) | ~14,8:1 | AAA ✓ |
| `creme` sobre `tinta` (texto principal escuro) | ~14,8:1 | AAA ✓ |
| `vermelho-700` sobre `creme` (acento texto) | ~6,3:1 | AA ✓ |
| `creme` sobre `vermelho-600` (label do CTA) | ~5,4:1 | AA ✓ |
| `vermelho-300` sobre `tinta` (acento texto) | ~6,4:1 | AA ✓ |
| `azul-700` sobre `creme` (link) | ~5,3:1 | AA ✓ |
| `azul-300` sobre `tinta` (link) | ~8,8:1 | AAA ✓ |
| `azul-600` vs ambos os fundos (foco, não-texto) | ~3,7:1 | ≥3:1 ✓ |

Regras que evitam erro: `vermelho-500` NUNCA como cor de texto normal
(4,7:1 sobre creme — só texto grande ≥24px ou elemento gráfico). Texto
sobre foto: sempre com scrim (ver §4.2). No primeiro PR, validar os pares
com ferramenta (ex.: contraste do axe/Polypane) — os valores acima foram
calculados manualmente.

### 2.2 Tipografia

**Dupla aprovada: Anton (display) + Archivo (texto)** — via
`next/font/google`, subsets `latin` + `latin-ext` (pt-BR: ã, ç, é...),
`display: swap`.

Por quê: Anton é a condensada de cartaz — caixa alta, pesada, imediata;
é a voz de rua do site sem recorrer a fonte "temática de graffiti"
(ver 1.4). Archivo é uma grotesca sul-americana (Omnibus-Type), variável,
excelente em corpo de texto e com personalidade suficiente para não
parecer template. Anton tem peso único (400) — a hierarquia dentro dos
títulos se faz por TAMANHO, não por peso.

Fallbacks (evitam layout shift antes do swap):
- Display: `Anton, Impact, 'Arial Narrow Bold', sans-serif`
- Texto: `Archivo, system-ui, 'Segoe UI', Roboto, sans-serif`

**Escala (mobile → desktop via `clamp`):**

| Papel | Fonte | Tamanho | Peso | line-height | Extras |
|---|---|---|---|---|---|
| display (só hero) | Anton | `clamp(3rem, 11vw, 6.5rem)` | 400 | 0.95 | caixa alta |
| h2 (título de seção) | Anton | `clamp(2rem, 6vw, 3.25rem)` | 400 | 1.0 | caixa alta |
| h3 (card/subtítulo) | Archivo | `1.375rem` | 700 | 1.2 | — |
| h4 | Archivo | `1.125rem` | 700 | 1.3 | — |
| eyebrow (sobretítulo) | Archivo | `0.8125rem` | 600 | 1.2 | caixa alta, tracking `0.1em` |
| corpo | Archivo | `1rem` | 400 | 1.6 | máx. ~65ch por linha |
| corpo destaque (lead) | Archivo | `1.125rem` | 400 | 1.55 | — |
| legenda | Archivo | `0.875rem` | 400 | 1.4 | — |
| botão | Archivo | `1rem` | 700 | 1 | caixa alta, tracking `0.02em` |

Regra de ouro: **Anton nunca em texto corrido nem abaixo de `2rem`** —
condensada em tamanho pequeno vira ruído. Tudo que não é título de
cartaz é Archivo.

### 2.3 Espaçamento, raios e sombras

**Spacing:** escala padrão do Tailwind (base 4px). Ritmo vertical das
seções: `py-16` (64px) no mobile, `py-24` (96px) em `md+`. Espaço entre
título de seção e conteúdo: `mt-8`/`mt-12`. Não inventar valores fora da
escala.

**Raios — cantos firmes (cartaz), nunca "fofos" (SaaS):**

```css
--radius-btn: 4px;      /* botões e inputs */
--radius-card: 8px;     /* cards e imagens */
--radius-sticker: 999px; /* badges/stickers (pílula) */
```

**Sombras — colagem, não elevação.** Este site NÃO usa sombra difusa
(blur). Toda "elevação" é sombra dura deslocada, como papel colado sobre
papel — é o detalhe que mais carrega a linguagem de rua no craft:

```css
--shadow-sticker: 2px 3px 0 var(--color-tinta);
--shadow-card: 4px 4px 0 var(--color-tinta);
--shadow-card-hover: 6px 6px 0 var(--color-tinta); /* + translate(-2px,-2px) */
```

Foco NUNCA usa sombra — usa `outline` (ver §3, regra geral).

### 2.4 Breakpoints, grid e toque

- **Mobile-first de verdade:** desenhar para **360px** de largura como
  piso; breakpoints padrão do Tailwind (`sm` 640 / `md` 768 / `lg` 1024).
  A maioria do público chega por WhatsApp/Instagram no celular.
- **Container:** `max-w-6xl` (1152px), `px-4` no mobile, `px-6` em `sm+`.
- **Grid:** seções em coluna única no mobile; cards de categoria em
  `grid-cols-1` → `sm:grid-cols-3`. Sem grids complexos — o layout é um
  cartaz vertical.
- **Alvos de toque:** mínimo **44×44px** em qualquer elemento interativo,
  com ≥8px de respiro entre alvos vizinhos.
- **Composição até as bordas** (referência de layout aprovada pelo Lain em
  16/07/2026): o container `max-w-6xl` é o padrão de LEITURA (texto
  corrido, cards), não uma prisão. Display do hero, marquee, rasgos e o
  wordmark do footer sangram na largura total; stickers e elementos
  gráficos podem vazar dos limites da seção. Elementos grandes perto das
  bordas são parte da linguagem — o que fica confinado é o texto que
  precisa ser lido com conforto.

---

## 3. Inventário de componentes

**Regra geral de foco (vale para TODOS):** `focus-visible` com
`outline: 3px solid var(--color-azul-600); outline-offset: 2px`. Nunca
remover outline sem substituto. Navegação completa por teclado.

### 3.1 Botão / CTA

Anatomia: label em Archivo 700 caixa alta; padding `px-6 py-3` (garante
44px); radius `--radius-btn`.

| Variante | Uso | Visual |
|---|---|---|
| Primário | "Quero competir" | bg `vermelho-600`, texto `creme`, `--shadow-card` |
| Secundário | "Seja um patrocinador" | borda 2px `tinta` (ou `creme` no asfalto), texto na cor da borda, bg transparente, `--shadow-sticker` |
| Terciário | "Apoie via Pix" | sem caixa: link com seta-rabisco SVG ao lado, sublinhado no hover |

Estados: hover = `translate(-2px,-2px)` + sombra cresce (o botão "descola
da parede"); active = translate volta a 0 + sombra `2px 2px` (pressiona);
disabled = opacidade 50% + `cursor-not-allowed` (usar pouco — no MVP quase
nada é desabilitado).

Acessibilidade: é `<a>` quando navega (âncoras, wa.me), `<button>` quando
age (copiar Pix). Ícone decorativo com `aria-hidden`.

### 3.2 Header / nav por âncoras

Anatomia: barra `fixed` no topo (overlay, não reserva espaço no
fluxo — decisão da sessão de polish pós-GSAP, 30/07/2026), **transparente
sobre o Hero** e com fundo `tinta` translúcido (`/95`) + blur assim que a
página rola (scroll > 8px). Logo (PNG, ~40px) à esquerda, links âncora à
direita (Sobre · Categorias · Patrocínio · Apoie · Contato). Toda página
que usa este Header precisa abrir com uma seção `registro-asfalto`
(escura) logo abaixo, pra o texto `creme` continuar legível no estado
transparente.

Mobile: hambúrguer (44×44) abre **overlay full-screen estilo cartaz** —
fundo `tinta` com grão, links em Anton gigante empilhados. Fecha por X,
Esc ou clique num link.

Acessibilidade: `<nav aria-label="Principal">`; botão com
`aria-expanded` + `aria-controls`; overlay com foco preso (focus trap),
Esc fecha, scroll do body travado; primeiro foco vai para o X. Link
"pular para o conteúdo" antes do header.

Responsividade: links inline a partir de `md`; overlay abaixo disso.

### 3.3 SectionHeader (padrão de toda seção)

Anatomia: eyebrow (Archivo caps, cor acento do registro) + título h2
(Anton) + **rabisco SVG de sublinhado** (traço à mão, `vermelho-500` ou
`rosa`) + parágrafo lead opcional. Alinhado à esquerda (cartaz, não
centralizado genérico).

Acessibilidade: hierarquia real de headings (um `h1` por página — no MVP
é o hero; seções usam `h2`). Rabisco é decorativo: `aria-hidden`.

### 3.4 Card de categoria

Anatomia: surface do registro claro, radius `--radius-card`,
`--shadow-card`; nome da categoria (h3), regra de premiação (corpo), e
sticker "detalhes em breve" quando faltar faixa etária/regulamento (P6).
Dados vêm SEMPRE de `data/categories.ts` — nunca hardcode.

Estados: estático no MVP (não é link). Se virar link na v1, aplica o
hover de colagem do botão.

Acessibilidade: `<li>` dentro de `<ul>` das categorias; conteúdo lido em
ordem natural, sticker por último.

### 3.5 Card de patrocinador (nasce na v1; definido aqui para não reinventar)

Anatomia: caixa clara com logo centrado (altura fixa ~64px,
`object-contain`), nome em legenda. Grid `2 → 4` colunas. Link externo
quando houver.

Estados: hover = colagem (translate + sombra). Foco padrão.

Acessibilidade: `alt` com o NOME do patrocinador (nunca "logo");
`rel="noopener"` + indicação de link externo para leitor de tela.

### 3.6 StickerBadge (a assinatura — ver 1.2)

Anatomia: pílula (`--radius-sticker`) com borda 2px `tinta`, bg `creme`
(ou `vermelho-600` com texto `creme` para o de data), texto Archivo 700
caps pequeno, `--shadow-sticker`, **rotação fixa por variante** (-2°, 1.5°
— definida no componente, não aleatória em runtime, para não variar entre
builds).

Variantes: `data` ("DATA A CONFIRMAR" — vermelho), `breve`
("EM BREVE" / "DETALHES EM BREVE" — creme), `info` (avisos gerais).

Acessibilidade: texto real no DOM (nada de imagem); se for puramente
redundante com o texto ao lado, `aria-hidden` para não repetir.

### 3.6-bis Disclosure — FAQ, regulamento (nasce na V1.3)

Padrão para conteúdo de pergunta/resposta que precisa de
esconder/mostrar (FAQ hoje; regulamento no futuro). Elemento nativo
`<details>`/`<summary>` — **sem componente de accordion customizado e sem
animação de abrir/fechar** (guardrail §6.2: motion novo fica restrito ao
escopo GSAP já aprovado; abrir/fechar via `<details>` é instantâneo por
design).

Anatomia: card `rounded-card` + `--surface` + `shadow-card` (mesmo par
usado no card de categoria, §3.4), vira `shadow-card-hover` quando aberto
(`open:shadow-card-hover`). `<summary>` remove o marcador nativo
(`list-none` + `[&::-webkit-details-marker]:hidden`) e usa um chevron SVG
próprio que rotaciona 180° no estado aberto (`group-open:rotate-180`,
`motion-reduce:transition-none`).

Pendência sem resposta ainda (ex.: aguardando regulamento, P6): corpo do
`<details>` mostra `StickerBadge` variante `breve` no lugar do texto —
nunca resposta inventada (política de placeholder, `AGENT.md`).

Acessibilidade: `<details>`/`<summary>` são focáveis e operáveis por
teclado (Enter/Espaço) e anunciam o estado aberto/fechado nativamente em
leitores de tela — sem `aria-expanded` manual necessário.

### 3.7 Bloco Pix

Anatomia: card de colagem com QR (`public/pix-qr.png`, ~180px, com borda
creme generosa tipo adesivo), chave Pix em `<code>` truncada, botão
"Copiar chave" (variante secundária), microcopy de destino dos recursos
("premiação e estrutura — prestação de contas após o evento").

Estados do botão copiar: idle → copiado ("Copiado ✓", 2s, anunciado em
`aria-live="polite"`) → volta a idle. Falha de clipboard: mostrar a chave
completa selecionável como fallback.

Acessibilidade: QR tem `alt` "QR Code Pix — apoie o Braz Skate"; a chave
copiável também existe como texto (QR nunca é o único caminho).

Responsividade: QR + textos empilhados no mobile, lado a lado em `sm+`.

### 3.8 Footer

Anatomia: registro asfalto com grão; logo pequeno, uma linha sobre a ASB,
links de âncora, redes (Instagram `@brazskate`, WhatsApp), ano. Fecha o
cartaz com o mesmo clima do hero e com o **wordmark gigante**: "BRAZ
SKATE" em Anton ocupando a largura total, última coisa da página
(decorativo, `aria-hidden` — o nome já existe como texto no footer).

Acessibilidade: `<footer>` com `nav aria-label="Rodapé"`; ícones de rede
com nome acessível ("Instagram do Braz Skate").

### 3.9 Utilitários gráficos

- **Rabiscos** (`components/rabiscos.tsx`): coleção de SVGs à mão —
  sublinhado, seta, círculo. Sempre `aria-hidden`, `currentColor` para
  herdar a cor do contexto.
- **Grão** (`components/grao.tsx` ou classe utilitária): overlay de ruído
  via SVG `feTurbulence` inline (custo zero de rede), opacidade ~0.06 em
  fundos asfalto. Nunca sobre texto corrido.
- **Rasgo** (`components/rasgo.tsx`): divisor de papel rasgado entre
  registros — SVG de largura total (`preserveAspectRatio="none"`) com
  borda irregular, preenchido com a cor da seção vizinha. Decorativo
  (`aria-hidden`); não cria altura de layout inesperada (altura fixa).
- **Marquee** (`components/marquee.tsx`): faixa de texto repetido
  ("BRAZ SKATE · BRAZLÂNDIA-DF ·") rolando via CSS puro, largura total.
  Pausa no hover; estática com `prefers-reduced-motion`. O texto existe
  UMA vez para leitores de tela; as repetições são `aria-hidden`.

---

## 4. Estratégia visual sem a foto da pista (pendência I2)

### 4.1 Hero 100% gráfico (o cartaz)

> **Atualização 30/07/2026 (D25, `02-DECISOES.md`):** o slot de foto
> (§4.2) foi ativado em produção com uma foto de manobra — o hero **não
> é mais 100% gráfico** na prática. O Selo também foi **removido por
> completo** (decisão da sessão de polish pós-GSAP), diferente do que o
> diagrama abaixo ainda mostra. Esta seção continua descrevendo o
> comportamento de **fallback** do componente quando `fotoSrc` não é
> passado (contrato ainda suportado pelo `Hero`), não o estado atual da
> home.

A ausência da foto é oportunidade: o hero do MVP é um **cartaz
tipográfico** — já acabado, não "à espera de foto":

```
┌──────────────────────────────┐
│ [logo]              [menu ≡] │  ← header sticky (tinta)
│                              │
│  CAMPEONATO DE SKATE ·       │  ← eyebrow (Archivo caps, rosa)
│  BRAZLÂNDIA-DF               │
│                              │
│  BRAZ                        │  ← Anton display gigante, creme,
│  SKATE                       │    2 linhas apertadas (lh 0.95)
│       ⤺ rabisco vermelho     │
│                              │
│  [DATA A CONFIRMAR]          │  ← StickerBadge `data`, rotação -2°
│                              │
│  Pista de Brazlândia, à      │  ← lead curto (Archivo, creme/75)
│  beira do lago.              │
│                              │
│  [QUERO COMPETIR]            │  ← CTA primário
│  [SEJA UM PATROCINADOR]      │  ← CTA secundário
│  Apoie via Pix ↝             │  ← CTA terciário
│                              │
│  fundo: tinta + grão + arcos │  ← formas geométricas grandes e
│  vermelho-500/rosa cortadas  │    recortadas (quarter pipe abstrato)
└──────────────────────────────┘
```

Fundo: `tinta` com grão (§3.9) + 1–2 formas geométricas grandes em
`vermelho-500`/`rosa` com recorte diagonal — abstração de transição/rampa,
não ilustração literal (só temos o logo em PNG; não tentar redecalcar a
ilustração dele). **O Selo (o logo como carimbo circular sobreposto) foi
removido do componente por completo em 30/07/2026** — não existe mais em
nenhum dos dois ramos (`fotoSrc` presente ou ausente).

### 4.2 O slot da foto (troca trivial no futuro)

O componente Hero recebe `fotoSrc?: string`. Quando a foto própria
existir (I2 resolvida):

1. A foto entra como camada de fundo (atrás do texto), com tratamento de
   marca: **duotone tinta→vermelho** (CSS `filter: grayscale` +
   `mix-blend-mode` sobre camada `vermelho-500`) + grão por cima + scrim
   (gradiente `tinta` 80%→30% de baixo para cima) garantindo o contraste
   AA do texto.
2. As formas geométricas saem; tipografia, sticker e CTAs **não mudam**.

Troca = adicionar 1 arquivo em `public/` e passar 1 prop. O tratamento
duotone garante que QUALQUER foto decente da pista fique com cara de
marca — não dependemos de foto profissional.

### 4.3 Outras seções que pediriam imagem

- **Sobre (fotos de 2021, pendência I1):** enquanto não existem, a seção
  vive de texto bem tratado + rabiscos. Quando chegarem, entram como
  **colagem**: molduras claras estilo foto impressa, levemente
  rotacionadas, com legenda e crédito (obrigatório — `data/gallery.ts` com
  `credito` e `permissao`, schema definido na V1.7). NÃO deixar molduras
  vazias "esperando" — seção sem foto não mostra slot nenhum.
- **Patrocinadores:** sem logos confirmados, a seção da home é só CTA
  (texto + botão para `/patrocinio`). Grade de logos nasce na v1 com
  `sponsors.json`.

**Contrato do componente de colagem (V1.7 — pronto para ativar, não
implementado ainda):** quando `data/gallery.ts` deixar de estar vazio, um
componente `Colagem` (nome provisório) recebe `fotos: readonly FotoGaleria[]`
e renderiza uma moldura por item — fundo `creme`, borda fina, rotação leve
alternada (mesmo princípio de "nunca aleatória em runtime" do `StickerBadge`,
§3.6: rotação fixa por índice, não `Math.random()`), `credito` como legenda
visível (não só `alt`) e `legenda` opcional abaixo. **Array vazio não
renderiza o componente** — a seção correspondente (Sobre) mantém o texto
atual até a primeira foto entrar; não há estado "0 fotos" visível.

---

## 5. OG image — peça de primeira classe

O link vai circular por WhatsApp e Instagram antes de qualquer pessoa ver
o site: **a OG image é o primeiro contato com o evento.** Ela é uma peça
de design com os mesmos tokens do hero, não um item técnico.

**Especificação (`public/og.png`, 1200×630):**

- Fundo `tinta` + grão + uma forma `vermelho-500` recortada (mesmo
  vocabulário do hero).
- Selo do logo (PNG) à esquerda, ~35% da altura.
- "BRAZ SKATE" em Anton, creme, dominando a metade direita.
- Eyebrow "CAMPEONATO DE SKATE · BRAZLÂNDIA-DF" acima do título.
- Sticker "DATA A CONFIRMAR" (vermelho, rotacionado) — o placeholder é
  adesivo até na prévia de link.

**Regras de robustez da prévia:**

- **Zona segura:** todo conteúdo crítico dentro dos 1000×524 centrais
  (apps cortam bordas).
- **Crop quadrado:** WhatsApp às vezes mostra thumb ~1:1 — logo + "BRAZ"
  precisam sobreviver a um crop central quadrado.
- **Teste de tamanho:** a imagem deve comunicar evento+lugar reduzida a
  300px de largura (teste real: mandar o link num chat).
- Sem texto pequeno; nada essencial nas bordas.

Atualizações futuras (data confirmada) trocam só o sticker — o layout
aguenta a evolução. Variante quadrada 1080×1080 para posts é desejável
mas opcional (não bloqueia o PR).

Metadata acompanhante: `title` ("Braz Skate — Campeonato de Skate de
Brazlândia"), `description` (1 frase com local e "data a confirmar"),
`og:locale: pt_BR`, Twitter card `summary_large_image`.

---

## 6. Motion e performance

### 6.1 Linguagem de motion: "tinta fresca seca rápido"

Movimento curto, firme e com atitude — nunca vitrine de animação. A
regra: **cada animação imita um gesto físico da rua** (colar um adesivo,
puxar um stencil, descolar um papel).

| Momento | Animação | Especificação |
|---|---|---|
| Título de seção entra | "stencil puxado": reveal por `clip-path` inset de baixo para cima | 0.5s, `power3.out`, uma vez só (não re-anima ao rolar de volta) |
| Sticker entra | "carimbada": scale 1.15→1 + rotação até a final | 0.35s, `back.out(1.7)` |
| Listas/cards entram | fade + `y: 16→0` com stagger | 0.45s, stagger 0.08s |
| CTA hover | "descola da parede": translate(-2px,-2px) + sombra 4→6px | 150ms, CSS puro (sem JS) |
| Link hover | sublinhado-rabisco cresce (`scaleX 0→1`) | 200ms, CSS puro |
| Rabisco do hero | traço se desenha (`stroke-dashoffset`) após load | 0.6s, delay 0.3s |
| Marquee | rolagem horizontal contínua | CSS puro (~30s/ciclo), pausa no hover, estática com reduced-motion |

### 6.2 GSAP — ferramenta aprovada e seus guardrails

**Escopo permitido no MVP:** `gsap` core + `ScrollTrigger` + **plugins aprovados por D23** (SplitText, DrawSVG, MorphSVG, CustomEase, CustomBounce, ScrambleText). **CustomWiggle testado e descartado** (ver nota abaixo) — não usar. ScrollSmoother requer decisão à parte — ver D23.1. **Nada além desta lista sem aprovação explícita.**

**Eases próprias do projeto** (registradas em `lib/motion.ts`, ver
`docs/superpowers/specs/2026-07-26-gsap-fundacao-motion-design.md`) —
reusar estes nomes/valores em vez de reinventar `power3.out`/`back.out` em
código novo:
- `"tintaSeca"` (CustomEase, `cubic-bezier(0.16, 1, 0.3, 1)`) — entrada
  padrão de conteúdo (fade+y, stencil, formas do hero).
- `"elastic.out(1, 0.6)"` (ease **nativa** do GSAP, usada direto como string
  — sem plugin) — "carimbada" de sticker (scale de entrada). **Não usar
  `CustomWiggle`**: `CustomWiggle.create()` quebra em runtime neste bundle
  ESM (sem `window.gsap`), travando o tween em `opacity:0` permanentemente
  e sem erro visível no console — confirmado com reprodução isolada
  (Node + Playwright/Firefox) em 26/07/2026.

Guardrails obrigatórios (quebrar qualquer um = PR reprovado):

1. **`prefers-reduced-motion`:** via `gsap.matchMedia()` — versão
   estática equivalente (tudo visível, opacidade 1, sem transform).
   Testar com a preferência ativa. **Nota especial para ScrollSmoother (D23.1):** scroll suavizado é justamente o tipo de coisa que causa desconforto vestibular — se ScrollSmoother entrar, deve ser **completamente desligado** quando `prefers-reduced-motion: reduce`.
2. **Só `transform`, `opacity`, `clip-path` e propriedades de SVG stroke**
   (ex.: `drawSVG` do DrawSVGPlugin) — nunca animar propriedades de layout
   (width/height/top). Zero layout shift causado por animação (elementos
   nascem no lugar; animação é revelação, não reposicionamento).
3. **Lazy-init:** ScrollTrigger inicializa após hidratação/idle, nunca
   bloqueando o primeiro paint.
4. **Nada que trave scroll:** sem `pin`, sem `scrub` pesado no MVP.
5. **Teste em celular mediano/antigo** (Moto G ou similar, 4G) antes do
   merge — não só no desktop do dev.

### 6.3 Decisão registrada: sem WebGL no MVP

Aprovado pelo Lain em 16/07/2026:

- **MVP:** zero WebGL. Grão/textura via SVG `feTurbulence` e CSS (custo
  de rede ~zero); energia visual vem de GSAP + composição gráfica.
- **v1 (candidato):** shader leve com **OGL** (~10KB) para fundo de
  spray/ruído animado no hero — avaliar quando o MVP estiver no ar.
- **three.js: descartado para o MVP** (~150KB+ gz, curva de manutenção
  incompatível com o time). Se algum dia entrar: um único elemento,
  lazy-loaded, fallback estático, decisão explícita do Lain.

### 6.4 Orçamento de performance (baliza de TODOS os PRs)

| Métrica | Meta |
|---|---|
| Lighthouse mobile — Performance | ≥ 90 |
| Lighthouse — Acessibilidade | ≥ 95 |
| Lighthouse — Best Practices / SEO | ≥ 95 |
| JS inicial (gzip) | ≤ 220KB total (revisado no PR 7 — baseline Next 16 + React 19 já soma ~194KB sem GSAP, que é lazy-loaded fora do bundle inicial; meta original de 170KB partia de uma estimativa de baseline desatualizada) |
| Fontes | ≤ 120KB woff2 (Anton 400 + Archivo variable, subset latin/latin-ext) |
| Imagens acima da dobra | ≤ 150KB (hero é gráfico: quase zero) |
| LCP (4G, celular mediano) | < 2,5s |
| CLS | < 0,1 |
| INP | < 200ms |

Como usar: cada PR de implementação roda `pnpm build` + Lighthouse local
(mobile, throttling padrão) e anota o resultado na descrição do PR. Se
uma meta estourar, o PR discute o porquê antes do merge — o orçamento
força a conversa, não o dogma.

---

## 7. Decisões e pendências que este plano consome

| Item | Status | Impacto no design |
|---|---|---|
| Tipografia Anton + Archivo | Aprovado 16/07/2026 | §2.2 |
| Sem WebGL no MVP; GSAP core + ScrollTrigger apenas | Aprovado 16/07/2026 (D14) | §6.2–6.3 |
| **EMENDA: GSAP — plugins ampliados + ScrollSmoother em separado (D23)** | **Aprovado 25/07/2026** | **§6.2** |
| Logo só em PNG (sem vetor) | Confirmado 16/07/2026 | Logo entra como selo; formas do hero são abstratas, não redesenho da ilustração (§4.1) |
| UIEMAPV no site | **Aguardando confirmação com o instituto** (I7) | Site NÃO menciona UIEMAPV até o ok; quando vier, entra como parceiro institucional na seção de patrocínio |
| Foto própria da pista (I2) | Pendente | Hero gráfico com slot (§4) |
| Fotos de 2021 (I1) | Pendente | Seção sobre sem slots vazios (§4.3) |
| E-mail de contato | Existe (`associacaoskatebrazlandia@gmail.com`) | Contato = Instagram + WhatsApp + e-mail (adicionado na V1.1) |
| Chave Pix (payload em `docs/pix.md`) | Existe | QR gerado como asset estático no PR das seções finais |
