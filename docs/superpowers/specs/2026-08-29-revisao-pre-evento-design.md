# Revisão pré-evento — punch-list até 13/09/2026

> **STATUS: APROVADO — 29/08/2026 (Lain).** Aguardando plano de execução.
> Revisão de fechamento do site para o dia do campeonato. Não é uma
> sub-etapa numerada do V1; é um conjunto de ondas independentes, cada uma
> = 1 branch = 1 PR → `dev` → promoção a `main`. Fonte da verdade de
> decisões segue sendo `docs/02-DECISOES.md` (esta revisão introduz **D54**
> e as que a implementação registrar).

## Contexto

Faltam ~2 semanas para o evento (13/09/2026, D34). Inscrições online já
foram encerradas pelo Lain no próprio Tally (`tally.so/r/J9bY7z`) — o site
ainda anuncia "inscrições abertas". `dev` está 1 commit à frente de `main`
(D53, ainda fora de produção). Três patrocinadores novos fechados, todos
nível Patrocínio: **De la Crew** e **Skid Skate** (lojas, logos já em
`docs/assets/logos/{delacrew,skid}-logo.jpeg`, ainda não processadas) e
**Street Loyal** (marca do Galego, hoje citada só como texto em D38 —
logo e URL ainda pendentes do Lain).

Postura acordada: **congelar e endurecer + 4 features de baixo/médio
risco** (postura "aberta a feature nova"). Nada que contrarie o
anti-escopo do `AGENT.md` (sem backend, banco, auth, resultado ao vivo,
pagamento, CMS, hospedagem de formulário, tom de denúncia).

## Ondas

| Onda | Entrega | Depende de |
|---|---|---|
| 0 | Promover `dev`→`main` (D53) | — |
| 1 | Essencial: fechar inscrições (D54) + patrocinadores De la Crew/Skid + avisos | Onda 0; URLs dos patrocinadores |
| 2 | Imagens/perf + cleanup de PDFs do Git | Onda 0 (paralela à 1) |
| 3 | Guia do dia + destaque de reta final na home + zero-state do countdown | Onda 1 (copy de inscrição estável) |
| 4 | Página `/resultados` (schema vazio, rota oculta) | Onda 0 (paralela à 3) |
| 5 | Offline/PWA (só cache) | **Todas as anteriores** — conteúdo congelado |

Fora desta revisão: QA em celular real (Lain); domínio `.com.br`
(decisão: seguir em `brazskate.vercel.app`); I8 (planta da pista, arquivo
nunca enviado); P7 (função de cada nome da equipe).

---

## Onda 0 — Promover D53

`dev` → `main` via PR de merge (padrão `CONTRIBUTING.md`). Nenhuma
alteração de código. Confirma `dev == main` depois (histórico de drift
recorrente — ver `feedback_pr_base_dev`). Verificar HTTP 200 + conteúdo
real em `https://brazskate.vercel.app` após o deploy (não só o check verde
da Vercel).

---

## Onda 1 — Essencial (D54)

### Fechar inscrições

O estado `evento.inscricoesAbertas === false` hoje carrega copy de **pausa
temporária** (D46). Passa a significar **encerramento definitivo**.

- `data/evento.ts`: `inscricoesAbertas: false`. Comentário reescrito — não
  é mais a trava reversível D46/D47; é o encerramento pós-prazo (D42/D54).
  Campos `dataFechamentoInscricoes*` ficam (ainda referenciados em texto
  histórico e no `metadata`), mas nenhuma copy nova deve tratá-los como
  prazo futuro.
- `components/hero.tsx` (~L153): sticker `"Inscrições abertas"` →
  `"Inscrições encerradas"`. Manter `variante="breve"` do `StickerBadge` a
  menos que exista variante mais adequada (checar `sticker-badge.tsx`).
- `components/hero.tsx` (~L134): CTA primário `"Quero competir"` → `/inscricao`
  passa a `"Confira a programação"` → `/programacao`. Botão secundário
  ("Seja um patrocinador") e terciário (Pix) inalterados.
- `app/inscricao/page.tsx`:
  - Ramo `false` do parágrafo: texto de encerramento (não "volta em
    breve"). Sentido: inscrições encerradas, agradecimento a quem se
    inscreveu, lista de competidores fechada, apontar para avisos e
    `/programacao`.
  - Botão do ramo `false`: `disabled`, texto `"Inscrições encerradas"`.
  - Bloco "Como funciona" (`evento.inscricoesAbertas && …`): segue oculto,
    sem mudança estrutural.
  - `metadata.description`: remover "até 30 de agosto de 2026"; texto
    neutro (evento 13/09, inscrições encerradas).
- **Tally**: nada a fazer no repo — já foi encerrado no painel pelo Lain.

### Patrocinadores De la Crew + Skid Skate + Street Loyal

Três entradas novas, todas `nivel: "patrocinio"`. A grade de
`components/patrocinadores.tsx` em `/patrocinio` vai de 3 para 6 logos
(Censure, Casa do Hip Hop, Overstreet + as 3 novas).

- **Pré-requisitos do Lain para fechar a onda:** logo da Street Loyal em
  `docs/assets/logos/` e as 3 URLs de Instagram (De la Crew, Skid Skate,
  Street Loyal).
- Inspecionar `docs/assets/logos/delacrew-logo.jpeg`, `skid-logo.jpeg` e a
  da Street Loyal antes de processar (Read renderiza imagem). Decidir
  tratamento de fundo caso a caso — precedente: floodfill/`pdftocairo -transp`
  para transparência (D50/D51/D53). Saída: `public/logo-delacrew.webp`,
  `public/logo-skid.webp`, `public/logo-street-loyal.webp`. Masters ficam
  em `docs/assets/logos/`.
- `data/sponsors.ts`: três entradas novas, `nivel: "patrocinio"`,
  `nome` = `"De la Crew"` / `"Skid Skate"` / `"Street Loyal"`, `url` =
  Instagram de cada, `logoSrc` apontando para os `.webp` acima.
- `components/marquee-patrocinadores.tsx` (letreiro D52) e
  `data/contrapartidas.ts`: **não mexer** — o letreiro do hero é só de
  quem já apoia em nível institucional (UIEMAPV, Censure, Casa do Hip
  Hop). De la Crew/Skid aparecem só na grade de `components/patrocinadores.tsx`
  em `/patrocinio`. Confirmar essa premissa lendo os dois arquivos na
  implementação.

### Avisos (`data/avisos.ts`)

- Novo `inscricoes-encerradas` no topo (`dataISO` do dia da implementação).
- Novo `patrocinio-lojas` (De la Crew, Skid Skate e Street Loyal) — molde
  dos avisos `patrocinio-censure` / `apoio-casa-do-hip-hop`.
- **Remover** `inscricoes-abertas` (30/07) — informação falsa após o
  encerramento; mesmo critério do D47, que removeu `inscricoes-pausadas`.

### Doc

`docs/02-DECISOES.md`: **D54** na tabela de decisões — encerramento
definitivo das inscrições (revisa D42/D46/D47 no ponto de inscrição) + De
la Crew, Skid Skate e Street Loyal como 4º/5º/6º patrocinadores (nota na
contagem vs D50/D53; Street Loyal deixa de ser só o texto de D38).
Atualizar "Última atualização" e, se couber, a linha de P4.

### Critério de pronto (Onda 1)

- `pnpm lint` + `typecheck` + `build` limpos.
- Home: sticker "Inscrições encerradas", CTA primário leva a `/programacao`.
- `/inscricao`: sem link para o Tally em nenhum estado; botão desabilitado;
  sem menção a prazo futuro.
- `/patrocinio`: grade com 6 logos (Censure, Casa do Hip Hop, Overstreet,
  De la Crew, Skid Skate, Street Loyal); letreiro do hero inalterado.
- Nenhuma rota referencia "inscrições abertas" ou data de fechamento como
  futuro.

---

## Onda 2 — Imagens / performance / repo

### Imagens

`output: 'export'` + `images.unoptimized: true` ⇒ tudo em `public/` vai
cru. Alvos, por peso:

- **`public/galeria/pista-0{1,2,3}.webp`** — 383–467 KB cada (~1,3 MB no
  carrossel da home, `components/localizacao.tsx`). Redimensionar para
  largura de exibição real (checar o container do `carrossel-fotos.tsx`;
  provável ~1280px) e requantizar. Alvo: ≤ ~130 KB cada, sem perda visível
  no `aspect-video`. Ferramenta: `cwebp`/ImageMagick, qualidade ~78–82.
- `public/og.png` (161 KB) e `public/whatsapp-qr.png` (55 KB, PNG):
  reavaliar. OG pode cair bastante com recompressão; o QR pode virar
  `.webp` ou PNG paletizado. **Não** trocar dimensões do OG (1200×630).
- Demais logos (`logo-*.webp`, 32–83 KB) já estão em faixa aceitável —
  deixar.

Cada troca: mesmo nome de arquivo (evita mexer em referência), diff só do
binário, verificação visual do antes/depois (Read nas imagens) antes do
commit — é o passo de maior risco de regressão visual.

### Spike de bundle inicial

Pergunta: o JS inicial por página está perto do orçamento de
`05-DESIGN.md` §6.4 (~170 KB) ou estourando muito? A memória registra
~194 KB (baseline React 19 + Next 16).

- Rodar `pnpm build` e ler o resumo de rotas do Next (First Load JS por
  rota).
- Se estiver ≲ 200 KB e dominado por framework: **não mexer** — reportar e
  encerrar o spike.
- Se houver gordura acionável (import não-lazy de algo pesado, GSAP fora
  do lazy-path, plugin GSAP desnecessário no bundle): listar como achado,
  decidir caso a caso. jsPDF + Anton base64 já estão lazy (`lib/termo-pdf.ts`)
  — confirmar que seguem fora do First Load JS.
- Sem otimização especulativa. O spike entrega uma recomendação, não
  necessariamente um diff.

### Cleanup de PDFs do Git

`docs/assets/*.pdf` (~100 MB: Media Kit, Carrossel Instagram, Design
System, e os "- rascunho"). Repo vai a público (`project_repo_going_public`).

- `git rm --cached` nos PDFs; adicioná-los ao `.gitignore`
  (`docs/assets/*.pdf`). Arquivos permanecem no disco do Lain.
- **Sem reescrita de histórico** — os blobs antigos continuam no
  histórico; o objetivo é só parar o crescimento e tirar da árvore atual.
- `docs/assets/hero-tratado-1920x1080.png` (2,7 MB) e as pastas
  `fotos-manobras/` (33 MB): fora do escopo desta onda — decidir depois.

### Critério de pronto (Onda 2)

- `pista-0*.webp` ≤ ~130 KB, carrossel visualmente idêntico.
- Achado do spike documentado (no PR e, se relevante, em `02-DECISOES.md`).
- `git status` limpo após o `rm --cached`; PDFs somem de `git ls-files`,
  seguem no disco.

---

## Onda 3 — Guia do dia + destaque de reta final

### Guia do dia (feature B)

Nova seção em `app/programacao/page.tsx`, **acima** da timeline de etapas.
Não é página nova — a informação é sobre o dia, e `/programacao` já é a
página do dia.

- `data/guia-dia.ts` — lista simples `as const`, molde de `data/avisos.ts`.
  Itens (todos já decididos, hoje espalhados):
  - Credenciamento a partir das 9h (fonte: `programacao.ts` etapa
    `credenciamento`, D37).
  - Levar: skate, equipamento de proteção, documento com foto (fonte:
    `faq.ts` "o que levar", D16/D20 — sem menção a não-skate).
  - Menor de 18: responsável legal assina o termo em papel no
    credenciamento (fonte: `faq.ts` / `inscricao/page.tsx`, D19/D21).
  - Estacionamento ao lado da pista; possível fechamento de trecho da via
    no dia (fonte: `localizacao.tsx` / `faq.ts` `estacionamento`, D15/D17/D32).
  - Entrada franca, evento aberto à comunidade (fonte: `faq.ts`
    "acompanhantes/público", D16).
- Render: reaproveita `SectionHeader` + lista estilizada; sem componente de
  cliente, sem lógica. As perguntas do FAQ **continuam** — o guia é o
  resumo acionável, não substitui.
- Sem duplicar strings longas: se o texto do guia e o do FAQ forem o mesmo,
  extrair para `guia-dia.ts` e o FAQ passa a referenciar, OU manter curtos
  e distintos (guia = bullet acionável; FAQ = resposta em prosa). Decidir
  na implementação, sem criar acoplamento frágil.

### Destaque de reta final (feature C)

Bloco fino **abaixo do hero, antes da seção "Sobre"** (em `app/page.tsx`).

- Novo `components/destaque-aviso.tsx` (server component). Lê `avisos[0]`
  de `data/avisos.ts`, mostra data + título + link para a âncora da seção
  de avisos completa (`components/avisos.tsx` já existe mais abaixo na
  home).
- Sem lógica nova: se `avisos` estiver vazio, o componente não renderiza
  nada (guard). Estilo discreto — faixa de acento, não outro hero.
- Não introduz segundo `h1`; o texto do aviso não é heading de página.

### Zero-state do countdown

`components/countdown.tsx`: verificar o comportamento quando
`Date.now() >= dataPrevistaISO`. Se travar em zero / mostrar negativo:
ajuste mínimo — "É hoje!" no dia, e depois do evento ou esconder o
componente ou "O Braz Skate já rolou — resultados em breve". Escopo
pequeno; só entra se o componente hoje quebrar nesse limite.

### Critério de pronto (Onda 3)

- `/programacao` abre com o guia do dia acima da timeline; nada de
  informação nova inventada — tudo rastreável a uma decisão.
- Home: bloco de destaque abaixo do hero com o aviso mais recente,
  linkando para a lista completa.
- Countdown não mostra estado quebrado para uma data ≥ 13/09.
- `lint` + `typecheck` + `build` limpos.

---

## Onda 4 — Página `/resultados` (feature A)

Fecha a D5 (resultados publicados de forma estática pós-evento).

- `data/resultados.ts`:
  ```ts
  export const resultados = {
    publicado: false,          // flip para true ao preencher, no dia seguinte
    data: null as string | null,   // "13 de setembro de 2026"
    podios: {
      iniciante: [], amador: [], feminino: [], master: [],
    } as Record<CategoriaId, readonly Colocacao[]>,
    bestTrick: null as { nome: string; descricao?: string } | null,
  } as const;
  // Colocacao = { posicao: 1 | 2 | 3; nome: string }
  ```
  Chaves de `podios` derivadas de `data/categories.ts` (fonte única — se as
  categorias mudarem, o tipo acompanha).
- `app/resultados/page.tsx`: se `!resultados.publicado`, `notFound()`
  (404). Sem casca "em breve" — padrão do roadmap "página só nasce com
  dado real".
- Nav (`components/header.tsx`) e `app/sitemap.ts`: link/entrada
  **condicionais** a `resultados.publicado`.
- Visual: `SectionHeader` + um bloco por categoria + `StickerBadge`,
  reaproveitando o padrão de pódio de `components/galeria-2021.tsx` (já
  rotula 1º/2º/3º). Best trick em bloco próprio ao final.
- Sem OG dedicado, sem foto (as fotos do dia são uma decisão à parte).

### Critério de pronto (Onda 4)

- Com `publicado: false`: `/resultados` responde 404, não há link na nav
  nem no sitemap, `build` limpo.
- Preencher `resultados.ts` + `publicado: true` num rascunho local faz a
  página, o link e o sitemap aparecerem — sem outra mudança de código.
- `lint` + `typecheck` limpos.

---

## Onda 5 — Offline / PWA (feature D)

**Só depois de todo o conteúdo congelar.** Risco central: um service
worker servindo conteúdo velho enquanto o site ainda muda.

- **Sem dependência** (`next-pwa` atrita com `output: 'export'`).
  `public/sw.js` escrito à mão + registro num client component
  (`components/registrar-sw.tsx`, montado no `app/layout.tsx`), com
  `process.env.NODE_ENV === "production"` como guarda.
- Estratégia de cache:
  - **HTML / navegação: network-first.** Cache só responde quando a rede
    falha (offline de verdade). Nunca serve HTML de cache com rede
    disponível.
  - **`/_next/static/*`: cache-first** (hasheado, imutável).
  - Precache no `install`: `/`, `/programacao`, `/regulamento` (as rotas
    úteis na pista sem internet) — mas a resposta em uso segue network-first.
  - `CACHE_VERSION` constante, bumpada a cada deploy que toque a Onda 5 ou
    o conteúdo dessas rotas; `activate` deleta caches de versão anterior e
    chama `clients.claim()`.
- **Escopo enxuto:** só o cache offline. **Não** instalável nesta onda —
  sem `manifest.webmanifest`, sem ícones de PWA, sem prompt de instalação.
  Fica como possível adição futura.

### Critério de pronto (Onda 5)

- Com rede, o site sempre mostra a versão publicada mais recente (testar:
  publicar mudança, recarregar, ver a mudança sem limpar cache).
- Sem rede (DevTools offline), `/`, `/programacao` e `/regulamento` abrem
  do cache.
- Deploy novo invalida o cache antigo no `activate` (sem "duas versões"
  presas).
- `lint` + `typecheck` + `build` limpos; `sw.js` servido de `/sw.js` no
  `out/`.

---

## Riscos e mitigações

- **SW cacheando "inscrições abertas"** → Onda 5 é a última; network-first
  para HTML; `CACHE_VERSION` por deploy.
- **Regressão visual nas imagens** (sem Chrome no ambiente) → verificação
  Read antes/depois; QA final de celular real com o Lain
  (`feedback_merge_without_visual_qa` cobre o merge de PRs aditivas
  pequenas quando o QA de browser não é possível).
- **Drift `dev`/`main`** → cada onda promove a `main` logo após entrar em
  `dev`; conferir `dev == main` ao fim de cada uma.
- **Insumos de patrocinador pendentes** (3 URLs de Instagram + logo da
  Street Loyal) → Onda 1 não fecha sem eles.

## Decisões que esta revisão gera

- **D54** (Onda 1) — encerramento definitivo das inscrições; De la Crew,
  Skid Skate e Street Loyal como patrocinadores.
- A implementação pode gerar D55+ (ex.: registro do resultado do spike de
  bundle, ajuste do countdown, PWA) — numerar em sequência ao integrar.
