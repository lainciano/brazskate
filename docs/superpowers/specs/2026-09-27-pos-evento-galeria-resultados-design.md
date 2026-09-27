# Pós-evento — Galeria e Resultados (design)

> **Status:** aprovado em brainstorming (27/09/2026), aguardando revisão da
> spec escrita. Etapa v2 de `docs/03-SPEC-SITE.md` §3.3 (itens 1 e 2).
> O evento aconteceu em 13/09/2026.
> **Referência visual obrigatória:** `docs/superpowers/specs/assets/2026-09-27-pos-evento-mockup.html`
> (abrir no navegador). As telas "Depois" desse mockup foram aprovadas pelo
> Lain como o design a implementar **fielmente**. Onde esta spec e o mockup
> divergirem, pergunte antes de escolher.

## 1. Escopo confirmado

**Entra:**

- **Resultados** (`/resultados`): uma foto de pódio por categoria (Iniciante,
  Amador, Feminino, Master). **Sem nome, sem colocação, sem placar, sem best
  trick.** Motion leve: só o que já existe (`Reveal`/stencil no título,
  "carimbada" nas molduras). Nenhum efeito novo.
- **Galeria pós-evento** (`/galeria`, rota nova): recebe o efeito principal
  da etapa — loop de drone na abertura, grade em colagem, lightbox com Flip,
  faixa horizontal com `pin` + `scrub`.
- **Home e nav:** teaser pós-evento na home e links "Galeria" e "Resultados"
  na nav, condicionais às flags de publicação.
- **Agradecimentos** (pedido do Lain, 27/09/2026): seção completa no fim da
  `/galeria` + uma linha curta na home apontando pra ela (§4.4).

**Não entra (anti-escopo desta etapa):**

- Nomes, colocações, placar, best trick. Se um dia forem publicados, só com
  dados fornecidos pelo Lain — ver §3.3.
- Qualquer vídeo editado (aftermovie, `Premiação.mp4` etc.). Pendência, §8.
- Prestação de contas e "Quero ajudar" (§3.3 itens 3 e 4) — outra etapa.
- WebGL nesta etapa. OGL fica como fase 2 opcional (§6); three.js descartado.

## 2. Material

### 2.1 Fotos dos pódios

Todas de `FOTOS/DUDA - Editadas/` (Drive da organização), crédito **Duda**,
base de permissão `termo-inscrito` (§3.2). Escolhidas as versões já editadas
da Duda para Iniciante e Amador (em vez de revelar os RAW `.ARW` do Kauet):
mesmo fotógrafo e mesma edição nas quatro, sem pipeline de RAW.

| Categoria | Arquivo |
|---|---|
| Iniciante | `IMG_0923.JPG` |
| Amador | `IMG_1029.JPG` |
| Feminino | `IMG_0954.JPG` |
| Master | `IMG_1060.JPG` |

**Os links/IDs do Drive não são registrados neste repositório** (público) —
a pasta contém fotos brutas com menores. Quem implementa pede os arquivos ao
Lain ou usa a cópia local dele.

### 2.2 Seleção da galeria (33 fotos)

Cópia local curada: `~/Downloads/brazskate-fotos/selecao-originais/` (fora
do repo). Masters JPEG de 1–14MB, sem GPS no EXIF (verificado 27/09/2026).
O prefixo do arquivo indica o fotógrafo.

**Coluna "Base da permissão" é preenchida pelo Lain antes da implementação**
— só ele sabe quem era inscrito. Foto com a coluna vazia **não entra**.

| Arquivo | Dimensões | Orient. | Crédito | Base da permissão |
|---|---|---|---|---|
| cauet_006__DSC00067 | 2588×4601 | retrato | Cauet | |
| cauet_010__DSC00096 | 3376×6000 | retrato | Cauet | |
| cauet_013__DSC00102 | 3373×5995 | retrato | Cauet | |
| cauet_024__DSC00142_3_ | 3376×6000 | retrato | Cauet | |
| cauet_026__DSC00160 | 3376×6000 | retrato | Cauet | |
| cauet_077__DSC09679 | 3376×6000 | retrato | Cauet | |
| cauet_084__DSC09706 | 2608×4636 | retrato | Cauet | |
| cauet_087__DSC09717 | 3376×6000 | retrato | Cauet | |
| cauet_092__DSC09729 | 2386×4242 | retrato | Cauet | |
| cauet_093__DSC09732 | 1997×3550 | retrato | Cauet | |
| cauet_178__DSC09892_1_ | 942×1675 | retrato | Cauet | |
| cauet_192__DSC09913 | 2642×4695 | retrato | Cauet | |
| cauet_194__DSC09969 | 2049×3642 | retrato | Cauet | |
| cauet_197__DSC09982 | 1714×3047 | retrato | Cauet | |
| duda_213__IMG_0152 | 3456×5184 | retrato | Duda | |
| duda_223__IMG_0188 | 5184×3456 | paisagem | Duda | |
| duda_235__IMG_0238 | 3456×5184 | retrato | Duda | |
| duda_241__IMG_0255 | 3456×5184 | retrato | Duda | |
| duda_258__IMG_0318 | 5184×3456 | paisagem | Duda | |
| duda_268__IMG_0333 | 2557×3836 | retrato | Duda | |
| duda_297__IMG_0451 | 4300×2867 | paisagem | Duda | |
| duda_380__IMG_0649 | 3388×5082 | retrato | Duda | |
| duda_400__IMG_0691 | 5149×3433 | paisagem | Duda | |
| duda_451__IMG_0887 | 5184×3456 | paisagem | Duda | |
| duda_465__IMG_0955 | 5184×3456 | paisagem | Duda | |
| duda_484__IMG_1040 | 3456×5184 | retrato | Duda | |
| duda_485__IMG_1041 | 3456×5184 | retrato | Duda | |
| fem_664__IMG_8721 | 3598×4797 | retrato | a confirmar (pasta `VECTOR/Feminino`) | |
| fem_668__IMG_8765 | 1615×2153 | retrato | a confirmar (pasta `VECTOR/Feminino`) | |
| vector_495__IMG_0108 | 4000×6000 | retrato | Victor | |
| vector_644__IMG_9854 | 4115×4000 | ~quadrada | Victor | |
| vector_646__IMG_9890 | 6000×4000 | paisagem | Victor | |
| vector_647__IMG_9891 | 4000×6000 | retrato | Victor | |

`creditoUrl`: só o do Cauet é conhecido (`@cauetista`, D53). Duda e Victor
entram só com nome até o Lain passar os perfis (política de placeholder).

### 2.3 Vídeo

- **Loop de drone:** um único trecho de 6–10s tirado dos clipes brutos de
  drone (`videos/drone/`, 19 clipes H.264 1280×720 30fps, 8–75s, sem GPS no
  metadado). O trecho exato é escolhido com o Lain na primeira tarefa do
  plano. Mudo, sem áudio no arquivo.
- **Vídeos editados:** fora (pendência, §8). `Premiação.mp4` tem risco
  adicional de mostrar nomes; se voltar, precisa de revisão contra a regra
  "sem nomes".
- **B-roll Overstreet** (MTS 1080p60): fora desta etapa.

## 3. Dados

### 3.1 `data/gallery.ts` — tipo `FotoEvento`

```ts
export type BaseDaPermissao =
  | "termo-inscrito"            // inscrito; cláusula 5 do termo (data/termo.ts)
  | "autorizacao-avulsa"        // não inscrito, autorização registrada à parte
  | "sem-pessoa-identificavel"; // ninguém reconhecível na foto

export type FotoEvento = FotoGaleria & {
  largura: number;  // do master, pós-orientação
  altura: number;
  baseDaPermissao: BaseDaPermissao; // obrigatório
};

export const galeriaPosEvento: readonly FotoEvento[] = [ /* ... */ ];
```

`permissao: true` (literal) continua valendo. `baseDaPermissao` registra
**por que** a foto pode entrar.

### 3.2 Base legal da permissão

Cláusula 5 do termo (`data/termo.ts`, versões adulto e menor): "Autorizo a
captura, uso e publicação de fotos e vídeos [...] para fins de documentação,
redes sociais e site do campeonato." Pela D21, o aceite que vale
juridicamente é o papel assinado no credenciamento (pelo responsável, no
caso de menor). **Não cobre** quem não se inscreveu — público e
participantes do best trick aberto (D38). Menor identificável não inscrito
sem autorização avulsa registrada: fora.

### 3.3 `data/resultados.ts` — reescrito sobre `feat/pagina-resultados`

A branch `feat/pagina-resultados` (3 commits, não mergeada) é a base: rota
com 404 enquanto não publicada, link na nav e sitemap condicionais. O schema
muda:

```ts
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

Saem `Colocacao`, `nome`, `posicao` e `bestTrick`, e o JSX que os renderiza.
**Não criar** campo para nomes. Se um dia o Lain fornecer colocações, o lugar
previsto é um `colocacoes?` opcional ao lado de cada foto em `podios` —
decisão e dados dele, fora desta etapa.

### 3.4 Flag da galeria

`data/galeria.ts` (ou campo em `data/gallery.ts`): `galeria.publicada`,
mesmo contrato de `resultados.publicado` — `false` ⇒ `/galeria` responde 404
e some de nav, sitemap e teaser. Ligar as flags é commit do Lain.

## 4. Telas (fiéis ao mockup)

### 4.1 `/resultados`

Faixa asfalto com data (eyebrow) + h2 "Pódios 2026"; abaixo, grade **2×2**
(também no mobile) de molduras `creme-elevado` com sombra dura, rotação fixa
alternada por índice (−1,2° / 1°), foto 4:5 `object-cover`, nome da
categoria em Anton abaixo e crédito "Foto: Duda" em legenda. Pódio `null`
não renderiza o slot. Entrada: `Reveal` (stencil) no título e "carimbada"
(`elastic.out(1, 0.6)`, stagger ~0,09s) nas molduras.

### 4.2 `/galeria`

1. **Abertura:** loop de drone em largura total (16:10 no mobile), scrim
   tinta de baixo pra cima, grão por cima, "13.09.2026" em Anton +
   "Pista de Brazlândia".
2. **Grade em colagem:** 3 colunas no mobile, retratos ocupando 2 linhas;
   cada item é `<button>` com a miniatura 640w; entrada com "carimbada" /
   fade+y em stagger (`tintaSeca`).
3. **Lightbox:** clique/toque → Flip da miniatura até a imagem 1600w em
   overlay `tinta` 94%; botões Anterior / Próxima / Fechar; crédito visível;
   fechar faz o Flip de volta à miniatura.
4. **Faixa no scroll:** fileira horizontal de fotos que anda com o scroll
   vertical (`pin` + `scrub`).

### 4.3 Home e nav

- Nav ganha "Galeria" e "Resultados", cada um condicionado à sua flag.
- Teaser na home (registro asfalto, grão): eyebrow "Aconteceu em
  13/09/2026", h2 "Valeu, Brazlândia", 3 miniaturas da galeria e CTA
  primário "Ver a galeria"; abaixo, bloco "Pódios 2026" apontando pra
  `/resultados`. Posição exata na home: logo após o hero (mockup).
  Sobre/acervo 2021 sem mudança.
- Abaixo do bloco "Pódios 2026", uma linha curta de agradecimento
  ("Valeu a quem fez o dia acontecer") linkando pra `/galeria#agradecimentos`.

### 4.4 Agradecimentos (fim da `/galeria`)

Registro concreto (claro), `SectionHeader` com eyebrow "Quem fez acontecer"
e h2 "Agradecimentos", `id="agradecimentos"`. Três grupos, nesta ordem, cada
um com h3 + nomes em `StickerBadge` (mesmo padrão visual de "Quem organiza"
em `components/sobre.tsx`, variantes alternadas `info`/`breve`, "carimbada"
na entrada):

| Grupo (h3) | Nomes |
|---|---|
| Organização — pensou o evento desde o início e executou | Luciano, Gustavo, Cauet, Samuel |
| Fotografia e vídeo | Duda, Ítalo, Victor, Nerd |
| Apoio no dia — skatistas e equipe | João Paulo, Rafael, Danilo |

- **Fonte única:** `quemOrganiza` sai de `components/sobre.tsx:18` e vai pra
  `data/equipe.ts` (com o Instagram de cada um), consumido tanto por "Quem
  organiza" quanto pelos Agradecimentos — um nome novo na organização não
  pode ficar dessincronizado entre as duas seções.
- `data/equipe.ts` também exporta `fotografiaEVideo` e `apoioNoDia`
  (`{ nome: string; instagram?: string }`). Organização linka pro Instagram
  (já existe); os demais **só com link se o Lain passar o perfil** — sem link,
  sticker sem `<a>`.
- Grafia confirmada pelo Lain: "Ítalo", "João Paulo", "Victor" (a pasta
  `VECTOR` no Drive é do Victor — crédito das fotos `vector_*` é "Victor").
- Aparece junto com a galeria (mesma flag `galeria.publicada`).
- Tom celebratório (D6), sem hierarquia de importância entre grupos além da
  ordem.

## 5. Componentes e motion

Server Components por padrão; `"use client"` só onde há interação (D13).

| Componente | Tipo | Responsabilidade |
|---|---|---|
| `app/galeria/page.tsx` | server | Página; `notFound()` se `!galeria.publicada` |
| `components/loop-drone.tsx` | client | `<video muted loop playsinline preload="none" poster>`; play só visível (IntersectionObserver), pausa com `visibilitychange`; reduced-motion ⇒ só poster |
| `components/galeria-grade.tsx` | server | Grade de `<button>` + `<img srcset>` (640w/1600w) |
| `components/lightbox.tsx` | client | Diálogo, Flip, navegação |
| `components/faixa-scroll.tsx` | client | `pin` + `scrub` |
| `components/podios.tsx` | server | Grade 2×2 de Resultados |
| `components/teaser-pos-evento.tsx` | server | Teaser da home (inclui a linha de agradecimento) |
| `components/agradecimentos.tsx` | server | Seção §4.4, lê `data/equipe.ts` |
| `data/equipe.ts` | dado | Organização (migrada de `sobre.tsx`), fotografia/vídeo, apoio no dia |

**Lightbox:** `role="dialog"` + `aria-modal`, foco preso, primeiro foco em
Fechar, Esc fecha, setas do teclado e swipe (GSAP `Observer`) navegam, foco
volta à miniatura de origem. `gsap` + `Flip` + `Observer` carregam **no
primeiro clique**, reusando o padrão de `carregarFlip()` em `lib/motion.ts`
(estender pra incluir `Observer`). Sem JS: cada miniatura é também `<a>` pra
imagem 1600w (progressive enhancement).

**Faixa no scroll:** `ScrollTrigger` com `pin: true`, `scrub`, e
`pinType: "transform"` (o site roda com ScrollSmoother, D23.1). Com
`prefers-reduced-motion` ou sem JS: `overflow-x: auto` + scroll-snap, sem pin.

**Eases:** só as do projeto — `tintaSeca` e `elastic.out(1, 0.6)`
(`05-DESIGN.md` §6.2). Nenhuma ease nova.

**Emenda ao guardrail 4 do §6.2 ("sem pin, sem scrub"):** exceção única e
explícita — `faixa-scroll`, só na `/galeria`. Registrar como **D61** em
`docs/02-DECISOES.md` junto com o registro desta etapa, e anotar no §6.2.
Todos os outros guardrails seguem integrais.

## 6. Comparação técnica (registro)

Bundles medidos em 27/09/2026 (esbuild `--minify`, gzip -9, importando só o
necessário pra um plano com shader + textura):

| Caminho | JS novo (gz) | JS inicial | LCP mobile | Reduced-motion | Manutenção |
|---|---|---|---|---|---|
| three.js 0.186 | ~130KB | 0 se lazy | risco se o canvas substituir o `<img>` | desliga o render | alta |
| OGL 1.0.11 | ~14KB | 0 se lazy | idem, mesma mitigação | desliga o render | média |
| **GSAP evoluído (escolhido)** | ~0KB (Flip já em produção; Observer ~+5KB) | 0 | neutro (LCP segue `<img>`) | `gsap.matchMedia()` | baixa |

- **three.js — descartado.** O que destrava além do OGL é 3D real (fotos em
  cilindro, profundidade, partículas), que não serve à direção "rua com
  acabamento" (§1.2/§1.4 de `05-DESIGN.md`).
- **OGL — fase 2 opcional, fora deste plano.** Único candidato: um canvas no
  loop de drone, com grão e duotone animados no GPU. Critério de entrada:
  Lighthouse mobile ≥90 com o canvas ligado, `<video>` por baixo como
  fallback, `webglcontextlost` tratado, carregamento lazy. Sem isso, não
  entra.
- **GSAP evoluído — fase 1.** Flip + Observer + uma faixa pin/scrub.

## 7. Pipeline de mídia

Script versionado em `scripts/` (Node ou shell), rodado localmente; masters
**nunca** entram no repo.

**Fotos:** aplicar orientação do EXIF → remover todo metadado → WebP em
**640w** (grade) e **1600w** (lightbox), qualidade ~78, redimensionamento
Lanczos (padrão D60). Tetos: ≤120KB (640w) e ≤350KB (1600w) por arquivo;
acima disso, baixar qualidade até caber. Saída em `public/galeria/2026/`.
`largura`/`altura` vão pro `data/`. Sem otimizador do Next
(`images.unoptimized: true`), então o `srcset` é montado à mão.

**Loop de drone:** corte de 6–10s → 720p, 30fps, sem trilha de áudio →
H.264 MP4 + VP9 WebM, cada um ≤1,5MB; poster WebP do primeiro quadro.
Metadado removido.

## 8. Pendências (bloqueiam só o item citado)

| Pendência | Bloqueia |
|---|---|
| Base da permissão de cada foto da §2.2 | A foto correspondente |
| Crédito das duas fotos `fem_` | Essas duas fotos |
| Perfis de Duda e Victor | Só o link do crédito (nome entra) |
| Perfis de Ítalo, Nerd, João Paulo, Rafael, Danilo | Só o link nos Agradecimentos (nome entra) |
| Trecho do loop de drone | `loop-drone` (a página pode sair com poster estático) |
| Aftermovie / vídeos editados | Nada nesta etapa — futuro |
| Ligar `galeria.publicada` / `resultados.publicado` | Publicação (commit do Lain) |

## 9. Erros e bordas

- Array vazio não renderiza a seção (anti-casca-vazia, padrão D57).
- Pódio `null` não renderiza o slot. Com os quatro `null`, `publicado`
  continua `false` (não há o que mostrar).
- Vídeo que falha em carregar fica no poster.
- Sem JS: grade funciona como links, faixa vira scroll horizontal.

## 10. Verificação

- `pnpm typecheck`, `pnpm lint`, `pnpm build` verdes.
- Teste de tipo: `FotoEvento` sem `baseDaPermissao` não compila; `permissao:
  false` segue não compilando.
- Lighthouse mobile em `/galeria` e `/resultados` dentro do §6.4 de
  `05-DESIGN.md` (Performance ≥90, A11y ≥95, LCP <2,5s, CLS <0,1, JS inicial
  ≤220KB sem aumento), anotado na descrição do PR.
- QA headless (playwright-core + Chromium em cache): reduced-motion ligado e
  desligado; lightbox só no teclado (abrir, navegar, Esc, foco de volta).
- Teste em celular real antes do merge (§6.2 item 5), com atenção à faixa
  pin/scrub com ScrollSmoother.
- Comparação visual com o mockup de referência.
