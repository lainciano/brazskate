# Revisão pré-evento — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deixar o site do Braz Skate pronto para o dia do campeonato (13/09/2026): inscrições encerradas, patrocinadores novos, avisos atualizados, imagens otimizadas, guia do dia, página de resultados e acesso offline.

**Architecture:** Site Next.js 16 App Router, `output: 'export'` (SSG puro), sem backend. Todo conteúdo em `data/*.ts` (`as const`) consumido por Server Components. Cada onda deste plano = 1 branch a partir de `dev` = 1 PR → `dev` → promoção a `main`. Ondas são independentes; executar uma por vez, com PR e checkpoint entre elas.

**Tech Stack:** Next.js 16.2.10, React 19.2.4, TypeScript strict, Tailwind v4, GSAP (lazy), jsPDF (lazy). pnpm. Sem framework de teste — "verde" = `pnpm lint && pnpm typecheck && pnpm build` + verificação visual/manual descrita em cada task.

**Spec:** `docs/superpowers/specs/2026-08-29-revisao-pre-evento-design.md`

## Global Constraints

- **Anti-escopo `AGENT.md`:** sem backend, banco, auth, pagamento, CMS, resultado ao vivo, hospedagem de formulário. Tom celebratório/institucional, nunca de denúncia.
- **Placeholder:** dado não definido pela organização entra como placeholder marcado, nunca inventado (`AGENT.md`).
- **Fonte única:** categorias saem de `data/categories.ts`; dados do evento de `data/evento.ts`. Nunca duplicar valor que já tem dono.
- **Branch:** toda branch nasce de `dev`, volta via PR. Commits em Conventional Commits, descrição em português. Rodapé `Claude-Session: https://claude.ai/code/session_01XueohhhZ2MEM4aTTAAwFqP` em cada commit.
- **Verde obrigatório antes de todo PR:** `pnpm lint && pnpm typecheck && pnpm build`.
- **Após cada onda:** promover `dev`→`main`, confirmar `dev == main`, verificar HTTP 200 + conteúdo real em `https://brazskate.vercel.app`.
- **Sem Chrome no ambiente:** QA visual fino (celular real, PageSpeed) é do Lain. Verificação Read nas imagens antes de commitar binário.
- **Data de hoje na execução:** usar a data real do dia em campos `dataISO`/`data` de avisos e em "Última atualização" de docs.

---

## Onda 0 — Promover D53

### Task 0.1: Promover `dev` → `main`

**Files:** nenhum arquivo alterado — só operação de branch/PR.

- [ ] **Step 1:** Confirmar estado: `git fetch origin && git log --oneline origin/main..origin/dev` — deve mostrar só `3fc730a` (merge #75) e `913c971` (D53). Se mostrar mais, PARAR e reportar.
- [ ] **Step 2:** Abrir PR `dev` → `main`: `gh pr create --base main --head dev --title "merge: D53 em produção (Overstreet + links da organização)" --body "Promove o D53 já mergeado em dev. Aditivo: 3º patrocinador + links de Instagram da organização + crédito de fotos linkável.$(printf '\n\n')https://claude.ai/code/session_01XueohhhZ2MEM4aTTAAwFqP"`
- [ ] **Step 3:** Fazer merge do PR (merge commit, não squash — padrão `dev`→`main`): `gh pr merge --merge`.
- [ ] **Step 4:** Aguardar deploy Vercel. Verificar: `curl -sI https://brazskate.vercel.app | head -1` → `HTTP/2 200`; `curl -s https://brazskate.vercel.app | grep -o "<title>[^<]*</title>"` → título real do site.
- [ ] **Step 5:** Confirmar sync: `git fetch origin && git log --oneline -1 origin/main origin/dev` — mesmo SHA de conteúdo (merge commit à parte). Se `dev` ficou atrás, `git push origin origin/main:refs/heads/dev`.

---

## Onda 1 — Essencial (D54)

**Branch:** `feat/fecha-inscricoes-patrocinadores` a partir de `origin/dev`.

**Pré-requisitos do Lain (bloqueiam o fechamento da onda):** logo da Street Loyal em `docs/assets/logos/`; URLs de Instagram de De la Crew, Skid Skate e Street Loyal.

### Task 1.1: Fechar inscrições — dados e hero

**Files:**
- Modify: `data/evento.ts` (campo `inscricoesAbertas` + comentário ~L11-17)
- Modify: `components/hero.tsx` (sticker ~L153; CTA primário ~L134)
- Test: nenhum automatizado — verificação por `build` + leitura.

**Interfaces:**
- Consumes: `evento.inscricoesAbertas: boolean` (já existe).
- Produces: nenhuma nova assinatura — só muda valor e strings.

- [ ] **Step 1:** Em `data/evento.ts`, trocar `inscricoesAbertas: true` → `inscricoesAbertas: false`. Reescrever o comentário do campo (linhas ~11-17): de "trava manual reversível D46/D47 / pausa" para: encerramento definitivo pós-prazo (D42/D54), não é mais reversível; `dataFechamentoInscricoes*` permanece só como referência histórica, nenhuma copy nova deve tratar como prazo futuro.
- [ ] **Step 2:** Em `components/hero.tsx`, localizar `{evento.inscricoesAbertas ? "Inscrições abertas" : "Inscrições em breve"}` (~L153). Trocar o ramo `false` para `"Inscrições encerradas"`. Abrir `components/sticker-badge.tsx` e conferir se há `variante` mais adequada que `"breve"` para um estado terminal; se não houver, manter `"breve"`.
- [ ] **Step 3:** Em `components/hero.tsx` (~L133-142), o bloco do CTA primário `<Botao href="/inscricao">Quero competir</Botao>`. Trocar para `<Botao href="/programacao">Confira a programação</Botao>`. Botão secundário ("Seja um patrocinador", âncora `#patrocinio`) e o bloco terciário (Pix) ficam inalterados. Conferir que `aoClicarAncora` só é usado nos botões de âncora, não no novo (que é navegação de rota normal).
- [ ] **Step 4:** `pnpm typecheck && pnpm build`. Esperado: PASS; `/` e `/inscricao` continuam como rotas estáticas.
- [ ] **Step 5:** Commit: `git add data/evento.ts components/hero.tsx && git commit -m "feat(inscricao): encerra inscrições em definitivo (D54)$(printf '\n\n')Sticker do hero passa a 'Inscrições encerradas'; CTA primário do hero vira 'Confira a programação' → /programacao. inscricoesAbertas deixa de ser trava reversível.$(printf '\n\n')Claude-Session: https://claude.ai/code/session_01XueohhhZ2MEM4aTTAAwFqP"`

### Task 1.2: Fechar inscrições — página `/inscricao`

**Files:**
- Modify: `app/inscricao/page.tsx` (ramo `false` do parágrafo ~L48-54; botão ~L61-63; `metadata.description` ~L22-25)

- [ ] **Step 1:** No ramo `false` do parágrafo (`app/inscricao/page.tsx` ~L48-54), substituir o texto de pausa por texto de encerramento. Sentido exato: *"As inscrições do Braz Skate estão encerradas. Obrigado a todo mundo que se inscreveu — a lista de competidores está fechada. Fique de olho nos avisos e confira a "* + `<a href="/programacao">programação do dia</a>` + *"."* Manter a estrutura JSX (`<>...</>`), só troca de conteúdo.
- [ ] **Step 2:** No botão do ramo `false` (~L61-63), trocar texto `"Inscrições fechadas"` → `"Inscrições encerradas"`, mantendo `disabled`.
- [ ] **Step 3:** Em `metadata.description` (~L24), remover "até 30 de agosto de 2026". Novo texto: `"O Braz Skate acontece em 13 de setembro de 2026, no Skate Park de Brazlândia. As inscrições estão encerradas."`
- [ ] **Step 4:** Conferir que o bloco `{evento.inscricoesAbertas && ( ... "Como funciona" ... )}` (~L68-113) não precisa mudança — com `false` ele já não renderiza. Não alterar.
- [ ] **Step 5:** `pnpm lint && pnpm typecheck && pnpm build`. Esperado: PASS.
- [ ] **Step 6:** Verificação manual: `grep -rn "tally.so\|30 de agosto\|Inscrições abertas\|inscrição presencial" app/ components/ data/` — nenhum resultado deve tratar inscrição como aberta/futura fora de contexto histórico explícito. `grep -rn "URL_FORMULARIO" app/inscricao/page.tsx` — a const pode continuar existindo (não referenciada no ramo `false`), mas não deve ser renderizada.
- [ ] **Step 7:** Commit: `git add app/inscricao/page.tsx && git commit -m "feat(inscricao): página /inscricao no estado encerrado (D54)$(printf '\n\n')Claude-Session: https://claude.ai/code/session_01XueohhhZ2MEM4aTTAAwFqP"`

### Task 1.3: Processar logos e adicionar patrocinadores

**Files:**
- Create: `public/logo-delacrew.webp`, `public/logo-skid.webp`, `public/logo-street-loyal.webp`
- Modify: `data/sponsors.ts` (array `patrocinadores`)
- Read (referência de padrão): `components/patrocinadores.tsx`, `components/marquee-patrocinadores.tsx`

**Interfaces:**
- Consumes: `type Patrocinador = { nome: string; logoSrc?: string; url: string; nivel: "patrocinio" | "apoio" }` (já em `data/sponsors.ts`).
- Produces: 3 novos itens no array `patrocinadores` (mesmo tipo).

- [ ] **Step 1:** Confirmar insumos: `ls docs/assets/logos/` deve ter `delacrew-logo.jpeg`, `skid-logo.jpeg` e o arquivo da Street Loyal. Se a logo da Street Loyal ou alguma URL faltar, PARAR e pedir ao Lain.
- [ ] **Step 2:** Abrir cada master com Read (renderiza imagem). Para cada uma, decidir: fundo já transparente/claro (usar como está, só converter) ou fundo sólido (remover). Precedente D50/D51/D53: `magick input -fuzz 10% -transparent '#RRGGBB' output` (floodfill de cor de fundo) ou `pdftocairo -transp` para PDF.
- [ ] **Step 3:** Converter cada uma para `.webp`, largura alvo ~400px (grade de logos é pequena), qualidade ~82: ex. `magick docs/assets/logos/delacrew-logo.jpeg -resize 400x -quality 82 public/logo-delacrew.webp`. Repetir para skid e street-loyal.
- [ ] **Step 4:** Read em cada `.webp` de saída — conferir recorte, legibilidade, sem halo de fundo. Se ruim, ajustar `-fuzz` e refazer.
- [ ] **Step 5:** Em `data/sponsors.ts`, acrescentar ao array `patrocinadores` (depois de "Overstreet Skateboards"):
```ts
  {
    nome: "De la Crew",
    logoSrc: "/logo-delacrew.webp",
    url: "<INSTAGRAM_DELACREW>",
    nivel: "patrocinio",
  },
  {
    nome: "Skid Skate",
    logoSrc: "/logo-skid.webp",
    url: "<INSTAGRAM_SKID>",
    nivel: "patrocinio",
  },
  {
    nome: "Street Loyal",
    logoSrc: "/logo-street-loyal.webp",
    url: "<INSTAGRAM_STREET_LOYAL>",
    nivel: "patrocinio",
  },
```
Substituir os `<INSTAGRAM_*>` pelas URLs reais do Lain.
- [ ] **Step 6:** Ler `components/patrocinadores.tsx` e `components/marquee-patrocinadores.tsx`. Confirmar: (a) `patrocinadores.tsx` renderiza o array inteiro numa grade e a "regra anti-casca-vazia" só esconde a seção se o array estiver vazio — 6 itens renderizam normal; (b) `marquee-patrocinadores.tsx` tem lista **própria e hardcoded** de apoiadores institucionais (UIEMAPV/Censure/Casa do Hip Hop), não lê `data/sponsors.ts` — então não muda. Se alguma premissa estiver errada, PARAR e reavaliar com o Lain.
- [ ] **Step 7:** `pnpm lint && pnpm typecheck && pnpm build`. Esperado: PASS; `/patrocinio` estática.
- [ ] **Step 8:** Commit: `git add public/logo-delacrew.webp public/logo-skid.webp public/logo-street-loyal.webp docs/assets/logos/ data/sponsors.ts && git commit -m "feat(patrocinio): De la Crew, Skid Skate e Street Loyal (D54)$(printf '\n\n')Grade de /patrocinio vai a 6 logos. Street Loyal deixa de ser só o texto de D38.$(printf '\n\n')Claude-Session: https://claude.ai/code/session_01XueohhhZ2MEM4aTTAAwFqP"`

### Task 1.4: Avisos

**Files:**
- Modify: `data/avisos.ts` (array `avisos`)

- [ ] **Step 1:** Remover o item `{ id: "inscricoes-abertas", ... }` (~L56-63) — informação falsa após o encerramento (mesmo critério do D47 com `inscricoes-pausadas`).
- [ ] **Step 2:** Adicionar no topo do array (antes de `apoio-casa-do-hip-hop`):
```ts
  {
    id: "inscricoes-encerradas",
    dataISO: "<HOJE_ISO>",
    data: "<HOJE_DD/MM/AAAA>",
    titulo: "Inscrições encerradas",
    texto:
      "As inscrições do Braz Skate estão encerradas. Obrigado a todos os competidores inscritos — a lista está fechada. Confira a programação do dia em /programacao.",
  },
  {
    id: "patrocinio-lojas",
    dataISO: "<HOJE_ISO>",
    data: "<HOJE_DD/MM/AAAA>",
    titulo: "De la Crew, Skid Skate e Street Loyal são patrocinadoras",
    texto:
      "As skateshops De la Crew e Skid Skate e a marca Street Loyal fecharam patrocínio com o Braz Skate.",
  },
```
Substituir `<HOJE_*>` pela data real do dia da execução. Ordem no array = mais recente primeiro; se `inscricoes-encerradas` e `patrocinio-lojas` forem do mesmo dia, encerramento primeiro.
- [ ] **Step 3:** `pnpm typecheck && pnpm build`. Esperado: PASS. Conferir que `components/avisos.tsx` e o futuro destaque (Onda 3) leem `avisos[0]` — o item 0 agora é `inscricoes-encerradas`.
- [ ] **Step 4:** Commit: `git add data/avisos.ts && git commit -m "feat(avisos): inscrições encerradas + patrocínio das lojas (D54)$(printf '\n\n')Remove o aviso 'inscrições abertas', desatualizado.$(printf '\n\n')Claude-Session: https://claude.ai/code/session_01XueohhhZ2MEM4aTTAAwFqP"`

### Task 1.5: Registrar D54

**Files:**
- Modify: `docs/02-DECISOES.md` (tabela "Decisões tomadas"; "Decisões revisadas"; "Última atualização"; linha P4)
- Modify: `AGENT.md` se a contagem de categorias/patrocinadores estiver citada (conferir — provavelmente não)

- [ ] **Step 1:** Adicionar linha `D54` no topo da tabela "Decisões tomadas" (`docs/02-DECISOES.md` ~L13): encerramento definitivo das inscrições online (o prazo D42 venceu; Lain fechou o formulário Tally no painel); site sai do estado "inscrições abertas" para "encerradas" — sticker do hero, CTA primário do hero (→ `/programacao`), página `/inscricao`, aviso novo. `inscricoesAbertas` deixa de ser trava reversível (revisa a semântica de D46/D47). **De la Crew, Skid Skate e Street Loyal** entram como patrocinadores (nível Patrocínio, D30) — grade de `/patrocinio` a 6 logos; Street Loyal deixa de ser só o texto de D38. Racional: prazo de inscrição encerrado + 3 patrocínios locais fechados. Data = dia da execução.
- [ ] **Step 2:** Em "Decisões revisadas", acrescentar bullet: **D42/D46/D47 (inscrição)** — encerrada em definitivo por D54 no fim do prazo; `inscricoesAbertas` agora significa estado terminal, não pausa.
- [ ] **Step 3:** Atualizar "> Última atualização: …" no topo do arquivo para a data do dia.
- [ ] **Step 4:** Na linha `P4` da tabela de pendências, acrescentar: primeiros patrocínios locais fechados (D54: De la Crew, Skid Skate, Street Loyal) — P4 segue aberta (captação continua).
- [ ] **Step 5:** `grep -n "5 logos\|cinco patrocinador\|De la Crew\|Street Loyal" AGENT.md docs/02-DECISOES.md` — ajustar qualquer contagem que tenha ficado velha.
- [ ] **Step 6:** Commit: `git add docs/02-DECISOES.md AGENT.md && git commit -m "docs(decisoes): D54 — encerramento das inscrições e patrocínios locais$(printf '\n\n')Claude-Session: https://claude.ai/code/session_01XueohhhZ2MEM4aTTAAwFqP"`

### Task 1.6: PR da Onda 1

- [ ] **Step 1:** `pnpm lint && pnpm typecheck && pnpm build` — tudo verde.
- [ ] **Step 2:** `git push -u origin feat/fecha-inscricoes-patrocinadores`
- [ ] **Step 3:** `gh pr create --base dev --title "feat: encerra inscrições + patrocinadores locais + avisos (D54)" --body "<resumo das tasks 1.1–1.5>$(printf '\n\n')https://claude.ai/code/session_01XueohhhZ2MEM4aTTAAwFqP"`
- [ ] **Step 4:** Checkpoint com o Lain: revisão + merge do PR em `dev`, depois promover `dev`→`main` (Task 0.1 steps 2-5 como molde) e verificar produção.

---

## Onda 2 — Imagens / performance / repo

**Branch:** `perf/imagens-e-bundle` a partir de `origin/dev` (após Onda 1 mergeada, ou de `origin/dev` direto se rodar em paralelo — não há conflito de arquivo).

### Task 2.1: Redimensionar fotos da pista

**Files:**
- Modify (binário, mesmo nome): `public/galeria/pista-01.webp`, `pista-02.webp`, `pista-03.webp`
- Read (referência): `components/carrossel-fotos.tsx`, `components/localizacao.tsx`

- [ ] **Step 1:** Ler `components/carrossel-fotos.tsx` — achar a largura de exibição real (container `max-w-*`, `aspect-video`). Determinar largura alvo: 2× a largura CSS máxima, teto 1600px (provável ~1280–1600).
- [ ] **Step 2:** Guardar cópia dos originais fora do repo: `mkdir -p /tmp/pista-orig && cp public/galeria/pista-0*.webp /tmp/pista-orig/`.
- [ ] **Step 3:** Para cada arquivo: `magick /tmp/pista-orig/pista-01.webp -resize <ALVO>x -quality 80 public/galeria/pista-01.webp` (idem 02, 03).
- [ ] **Step 4:** `ls -la public/galeria/pista-0*.webp` — cada um ≤ ~130 KB. Se acima, baixar qualidade para 76 e refazer.
- [ ] **Step 5:** Read em cada `.webp` novo — comparar com o original (Read do `/tmp/pista-orig/`). Sem perda de nitidez perceptível no `aspect-video`. Se ruim, subir qualidade/tamanho e reequilibrar.
- [ ] **Step 6:** `pnpm build` — `out/galeria/pista-0*.webp` refletem o novo tamanho.
- [ ] **Step 7:** Commit: `git add public/galeria/pista-0*.webp && git commit -m "perf(imagens): redimensiona fotos da pista (~1,3 MB → ~390 KB)$(printf '\n\n')Claude-Session: https://claude.ai/code/session_01XueohhhZ2MEM4aTTAAwFqP"`

### Task 2.2: Revisar OG e QR do WhatsApp

**Files:**
- Modify (binário): `public/og.png`, `public/whatsapp-qr.png`

- [ ] **Step 1:** `identify public/og.png` — confirmar 1200×630. Backup: `cp public/og.png /tmp/og-orig.png`.
- [ ] **Step 2:** Recomprimir sem mudar dimensão: `magick /tmp/og-orig.png -strip -define png:compression-level=9 public/og.png`; se ainda > 100 KB e a imagem tiver poucas cores, tentar `-colors 256`. Read no resultado — texto/logo nítidos.
- [ ] **Step 3:** `identify public/whatsapp-qr.png`. Backup. Um QR é preto/branco: `magick /tmp/qr-orig.png -colorspace Gray -colors 2 -strip public/whatsapp-qr.png`. Read no resultado — QR ainda escaneável (bordas nítidas, quiet zone intacta). Se o componente aceitar `.webp`, considerar; senão manter PNG paletizado.
- [ ] **Step 4:** `grep -rn "whatsapp-qr\|og.png\|og.webp" app/ components/` — confirmar que nenhuma referência quebrou (mesmos nomes, então não quebra).
- [ ] **Step 5:** `pnpm build`.
- [ ] **Step 6:** Commit: `git add public/og.png public/whatsapp-qr.png && git commit -m "perf(imagens): recomprime OG e QR do WhatsApp$(printf '\n\n')Claude-Session: https://claude.ai/code/session_01XueohhhZ2MEM4aTTAAwFqP"`

### Task 2.3: Spike de bundle inicial

**Files:** nenhum alterado (a menos que ache gordura acionável — aí vira commit próprio). Produz um relatório no corpo do PR.

- [ ] **Step 1:** `pnpm build` e capturar a tabela "Route (app) / Size / First Load JS" do output do Next.
- [ ] **Step 2:** Anotar o First Load JS de `/`, `/inscricao`, `/patrocinio`, `/programacao`, `/regulamento`, `/termo`, `/resultados`.
- [ ] **Step 3:** Comparar com o orçamento de `docs/05-DESIGN.md` §6.4 (~170 KB) e com a nota da memória (~194 KB baseline). Classificar: (a) ≲ 200 KB e dominado por framework React/Next → sem ação, só reportar; (b) acima disso com causa acionável → investigar.
- [ ] **Step 4:** Confirmar que jsPDF e `lib/anton-base64.ts` **não** estão no First Load JS de `/termo`: procurar no output do build por chunk separado; ou `grep -rn "import(" lib/termo-pdf.ts` (deve ser dinâmico — já é).
- [ ] **Step 5:** Se (b): verificar se GSAP/plugins entram no bundle inicial de `/` (deveriam ser lazy via `lib/motion.ts` / `components/smooth-scroll.tsx`). Só propor mudança se houver ganho claro e baixo risco. Sem otimização especulativa.
- [ ] **Step 6:** Escrever o achado (2–5 linhas) para colar no corpo do PR da Onda 2. Se gerou mudança de código, commit próprio: `perf(bundle): <o que foi feito>`.

### Task 2.4: Tirar PDFs pesados do Git

**Files:**
- Modify: `.gitignore`
- Remove from index (mantém no disco): `docs/assets/*.pdf`

- [ ] **Step 1:** `ls -la docs/assets/*.pdf` — listar o que será removido do índice (Media Kit, Carrossel Instagram, Design System, "- rascunho").
- [ ] **Step 2:** `git rm --cached docs/assets/*.pdf` — remove do índice, mantém no disco.
- [ ] **Step 3:** Adicionar a `.gitignore` (seção docs/assets, ou nova): `docs/assets/*.pdf`.
- [ ] **Step 4:** `git status` — os `.pdf` aparecem como deletados (staged) + `.gitignore` modificado; `git ls-files docs/assets/ | grep pdf` → vazio. `ls docs/assets/*.pdf` → arquivos ainda no disco.
- [ ] **Step 5:** Commit: `git add .gitignore && git commit -m "chore(repo): tira PDFs pesados de docs/assets do versionamento$(printf '\n\n')~100 MB de PDFs (media kit, carrosséis) saem do índice e entram no .gitignore; arquivos seguem no disco. Sem reescrita de histórico.$(printf '\n\n')Claude-Session: https://claude.ai/code/session_01XueohhhZ2MEM4aTTAAwFqP"`

### Task 2.5: PR da Onda 2

- [ ] **Step 1:** `pnpm lint && pnpm typecheck && pnpm build` verde.
- [ ] **Step 2:** `git push -u origin perf/imagens-e-bundle`
- [ ] **Step 3:** `gh pr create --base dev --title "perf: imagens da pista, OG/QR, spike de bundle, cleanup de PDFs" --body "<tasks 2.1–2.4 + achado do spike 2.3>$(printf '\n\n')https://claude.ai/code/session_01XueohhhZ2MEM4aTTAAwFqP"`
- [ ] **Step 4:** Checkpoint Lain: merge → promover `dev`→`main` → verificar produção (e, se possível, PageSpeed da home pelo Lain).

---

## Onda 3 — Guia do dia + destaque de reta final

**Branch:** `feat/guia-do-dia-e-destaque` a partir de `origin/dev` (após Ondas 1 e 2).

### Task 3.1: Fonte de dados do guia do dia

**Files:**
- Create: `data/guia-dia.ts`

**Interfaces:**
- Produces: `export const guiaDia: readonly { id: string; texto: string }[]` (`as const`); `export type GuiaDiaItem = (typeof guiaDia)[number]`.

- [ ] **Step 1:** Ler as fontes de cada item para não inventar texto: `data/programacao.ts` (etapa `credenciamento`, horário 9h), `data/faq.ts` (perguntas "o que levar", "acompanhantes/público", "estacionamento"), `app/inscricao/page.tsx` e `data/termo.ts` (termo em papel no credenciamento).
- [ ] **Step 2:** Criar `data/guia-dia.ts`:
```ts
// Resumo acionável do dia do evento (feature B, spec 2026-08-29). Cada
// item deriva de uma decisão já registrada — ver docs/02-DECISOES.md
// (D16/D19/D20/D37/D42) e as fontes: data/programacao.ts, data/faq.ts.
// Não substitui o FAQ; é o bullet rápido.
export const guiaDia = [
  { id: "credenciamento", texto: "Credenciamento a partir das 9h — leve seu comprovante mental de inscrição; não há inscrição no dia." },
  { id: "levar", texto: "Leve skate, equipamento de proteção e documento com foto." },
  { id: "menor", texto: "Menor de 18 anos: o responsável legal assina o termo em papel no credenciamento." },
  { id: "estacionamento", texto: "Estacionamento ao lado da pista. Um trecho da via pode ser fechado no dia." },
  { id: "publico", texto: "Entrada franca — o evento é aberto à comunidade." },
] as const;

export type GuiaDiaItem = (typeof guiaDia)[number];
```
Ajustar o texto de `credenciamento` se soar estranho — manter factual, sem prometer o que não está decidido.
- [ ] **Step 3:** `pnpm typecheck`. Esperado: PASS.
- [ ] **Step 4:** Commit: `git add data/guia-dia.ts && git commit -m "feat(programacao): fonte de dados do guia do dia$(printf '\n\n')Claude-Session: https://claude.ai/code/session_01XueohhhZ2MEM4aTTAAwFqP"`

### Task 3.2: Seção do guia do dia em `/programacao`

**Files:**
- Modify: `app/programacao/page.tsx` (nova seção acima da timeline)
- Read (padrão): a própria página + `components/section-header.tsx`

- [ ] **Step 1:** Ler `app/programacao/page.tsx` inteira — entender a estrutura (Header, hero, `Rasgo`, corpo com a timeline de `programacao.etapas`, Footer) e onde encaixar a seção nova (logo após o hero, antes da timeline).
- [ ] **Step 2:** Importar `guiaDia` e adicionar uma `<section>` com `SectionHeader` (eyebrow "Antes de ir", título curto tipo "No dia") e um `<ul>` dos `guiaDia` itens. Reaproveitar classes de lista já usadas na página/FAQ; sem componente de cliente, sem estado. Um `h2` para a seção; itens não são headings.
- [ ] **Step 3:** `pnpm lint && pnpm typecheck && pnpm build`. `/programacao` estática, com a seção nova antes da timeline.
- [ ] **Step 4:** Verificação: `grep -n "guiaDia" app/programacao/page.tsx` presente; ler o HTML de `out/programacao.html` e conferir que os 5 itens aparecem uma vez cada, e que o FAQ (outra página) não foi tocado.
- [ ] **Step 5:** Commit: `git add app/programacao/page.tsx && git commit -m "feat(programacao): seção 'guia do dia' acima da timeline (feature B)$(printf '\n\n')Claude-Session: https://claude.ai/code/session_01XueohhhZ2MEM4aTTAAwFqP"`

### Task 3.3: Componente de destaque do aviso mais recente

**Files:**
- Create: `components/destaque-aviso.tsx`
- Read (padrão): `components/avisos.tsx` (como lê `data/avisos.ts` e qual a âncora/id da seção na home)

**Interfaces:**
- Consumes: `avisos` de `data/avisos.ts` (`avisos[0]`), `type Aviso`.
- Produces: `export function DestaqueAviso(): JSX.Element | null` — Server Component, retorna `null` se `avisos` vazio.

- [ ] **Step 1:** Ler `components/avisos.tsx` — descobrir o `id`/âncora da seção de avisos na home (ex.: `#avisos`) e o vocabulário visual (classes de faixa/acento).
- [ ] **Step 2:** Criar `components/destaque-aviso.tsx`:
```tsx
import { avisos } from "@/data/avisos";

// Faixa fina abaixo do hero com o aviso mais recente (feature C, spec
// 2026-08-29). Sem lógica: mostra avisos[0] e linka para a seção
// completa. Some se não houver avisos.
export function DestaqueAviso() {
  const ultimo = avisos[0];
  if (!ultimo) return null;
  return (
    <aside className="<classes de faixa/acento>">
      <span>Última atualização · {ultimo.data}</span>
      <p>{ultimo.titulo}</p>
      <a href="#avisos">ver todos os avisos</a>
    </aside>
  );
}
```
Ajustar classes ao design system (acento discreto, não outro hero). Confirmar a âncora real do Step 1.
- [ ] **Step 3:** `pnpm typecheck`. Esperado: PASS.
- [ ] **Step 4:** Commit: `git add components/destaque-aviso.tsx && git commit -m "feat(home): componente de destaque do aviso mais recente (feature C)$(printf '\n\n')Claude-Session: https://claude.ai/code/session_01XueohhhZ2MEM4aTTAAwFqP"`

### Task 3.4: Montar o destaque na home

**Files:**
- Modify: `app/page.tsx` (inserir `<DestaqueAviso />` entre o hero e a seção "Sobre")

- [ ] **Step 1:** Ler `app/page.tsx` — confirmar a ordem das seções e o ponto exato (depois de `<Hero />`, antes de `<Sobre />` / `components/sobre.tsx`).
- [ ] **Step 2:** Importar e inserir `<DestaqueAviso />` nesse ponto.
- [ ] **Step 3:** `pnpm lint && pnpm typecheck && pnpm build`.
- [ ] **Step 4:** Ler `out/index.html` — a faixa aparece uma vez, com o título de `avisos[0]` (`inscricoes-encerradas` após a Onda 1), e o link `#avisos` aponta para uma seção existente no mesmo HTML. Sem segundo `<h1>`.
- [ ] **Step 5:** Commit: `git add app/page.tsx && git commit -m "feat(home): faixa de destaque do aviso mais recente abaixo do hero (feature C)$(printf '\n\n')Claude-Session: https://claude.ai/code/session_01XueohhhZ2MEM4aTTAAwFqP"`

### Task 3.5: Zero-state do countdown

**Files:**
- Modify: `components/countdown.tsx` (só se hoje quebrar em data ≥ evento)

- [ ] **Step 1:** Ler `components/countdown.tsx` inteiro. Simular mentalmente `dataPrevistaISO = "2026-09-13"` com `Date.now()` em 13/09 e em 20/09.
- [ ] **Step 2:** Se o componente trava em zero / mostra negativo / NaN: adicionar um ramo — no dia (diferença < 24h e ainda não passou, ou mesmo dia): texto "É hoje!"; depois do evento: ou não renderizar, ou "O Braz Skate já rolou." Manter o `sr-only` coerente. Se o componente **já** trata (ex.: clampa em zero e mostra "00"), anotar isso e não mexer.
- [ ] **Step 3:** `pnpm lint && pnpm typecheck && pnpm build`.
- [ ] **Step 4:** Commit (se houve mudança): `git add components/countdown.tsx && git commit -m "fix(countdown): trata o dia do evento e o pós-evento$(printf '\n\n')Claude-Session: https://claude.ai/code/session_01XueohhhZ2MEM4aTTAAwFqP"`

### Task 3.6: PR da Onda 3

- [ ] **Step 1:** `pnpm lint && pnpm typecheck && pnpm build` verde.
- [ ] **Step 2:** `git push -u origin feat/guia-do-dia-e-destaque`
- [ ] **Step 3:** `gh pr create --base dev --title "feat: guia do dia + destaque de reta final na home (B, C)" --body "<tasks 3.1–3.5>$(printf '\n\n')https://claude.ai/code/session_01XueohhhZ2MEM4aTTAAwFqP"`
- [ ] **Step 4:** Checkpoint Lain: merge → promover → verificar produção.

---

## Onda 4 — Página `/resultados`

**Branch:** `feat/pagina-resultados` a partir de `origin/dev` (pode ir em paralelo à Onda 3 — arquivos disjuntos).

### Task 4.1: Schema `data/resultados.ts`

**Files:**
- Create: `data/resultados.ts`
- Read: `data/categories.ts` (para derivar as chaves de categoria)

**Interfaces:**
- Consumes: o id/união de categorias de `data/categories.ts`.
- Produces: `export const resultados`; `export type Colocacao = { posicao: 1 | 2 | 3; nome: string }`.

- [ ] **Step 1:** Ler `data/categories.ts` — ver como as categorias são tipadas (array `as const` de objetos com `id`? união de strings?). Extrair o tipo do id (ex.: `CategoriaId = (typeof categorias)[number]["id"]`).
- [ ] **Step 2:** Criar `data/resultados.ts`:
```ts
import { categorias } from "@/data/categories"; // ajustar ao nome real do export

export type Colocacao = { posicao: 1 | 2 | 3; nome: string };

// Resultados publicados de forma estática pós-evento (D5). publicado=false
// ⇒ a rota /resultados responde 404 e não aparece na nav nem no sitemap.
// No dia seguinte: preencher podios/bestTrick, publicado=true, 1 commit.
export const resultados = {
  publicado: false,
  data: null as string | null,
  podios: {
    iniciante: [],
    amador: [],
    feminino: [],
    master: [],
  } as Record<string, readonly Colocacao[]>, // trocar `string` pelo CategoriaId real do Step 1
  bestTrick: null as { nome: string; descricao?: string } | null,
} as const;
```
Se o Step 1 der um `CategoriaId` utilizável, tipar `podios` como `Record<CategoriaId, readonly Colocacao[]>` e garantir que as 4 chaves batem com `data/categories.ts` (iniciante, amador, feminino, master — D48).
- [ ] **Step 3:** `pnpm typecheck`. Esperado: PASS.
- [ ] **Step 4:** Commit: `git add data/resultados.ts && git commit -m "feat(resultados): schema de dados (vazio, não publicado)$(printf '\n\n')Claude-Session: https://claude.ai/code/session_01XueohhhZ2MEM4aTTAAwFqP"`

### Task 4.2: Página `/resultados` com 404 enquanto não publicado

**Files:**
- Create: `app/resultados/page.tsx`
- Read (padrão de página secundária): `app/patrocinio/page.tsx` ou `app/termo/page.tsx`; `components/galeria-2021.tsx` (padrão de pódio)

- [ ] **Step 1:** Ler `app/termo/page.tsx` (esqueleto de página secundária: Header, hero asfalto + `Grao`, `Rasgo`, corpo concreto, Footer) e `components/galeria-2021.tsx` (como rotula 1º/2º/3º).
- [ ] **Step 2:** Criar `app/resultados/page.tsx`:
  - `import { notFound } from "next/navigation"` e `import { resultados } from "@/data/resultados"`.
  - No corpo do componente: `if (!resultados.publicado) notFound();`
  - Metadata estática (`title: "Resultados"`, description neutra).
  - Render (só alcançado quando `publicado`): `SectionHeader` + um bloco por categoria iterando `resultados.podios`, cada colocação com `StickerBadge`/rótulo de posição; bloco final de `bestTrick` se não-`null`.
- [ ] **Step 3:** `pnpm lint && pnpm typecheck && pnpm build`. Esperado: PASS. Com `publicado: false`, conferir no output do build que `/resultados` **não** vira uma rota estática com conteúdo (deve ser 404) — `ls out/resultados*` idealmente vazio ou só um 404. Se o `notFound()` em build estático gerar `out/resultados.html` como página 404, tudo bem.
- [ ] **Step 4:** Commit: `git add app/resultados/page.tsx && git commit -m "feat(resultados): página /resultados (404 até publicado=true)$(printf '\n\n')Claude-Session: https://claude.ai/code/session_01XueohhhZ2MEM4aTTAAwFqP"`

### Task 4.3: Nav e sitemap condicionais

**Files:**
- Modify: `components/header.tsx` (link condicional)
- Modify: `app/sitemap.ts` (entrada condicional)

- [ ] **Step 1:** Ler `components/header.tsx` — achar a lista de links de navegação. Adicionar `/resultados` **só** se `resultados.publicado` (import de `data/resultados.ts`). Se a nav for uma lista estática/array, filtrar ou spread condicional.
- [ ] **Step 2:** Ler `app/sitemap.ts` — adicionar `/resultados` ao array retornado só se `resultados.publicado`.
- [ ] **Step 3:** `pnpm lint && pnpm typecheck && pnpm build`. Com `publicado: false`: `grep -r "resultados" out/sitemap.xml` → vazio; ler `out/index.html` → sem link "Resultados" na nav.
- [ ] **Step 4:** Commit: `git add components/header.tsx app/sitemap.ts && git commit -m "feat(resultados): link na nav e sitemap condicionais a publicado$(printf '\n\n')Claude-Session: https://claude.ai/code/session_01XueohhhZ2MEM4aTTAAwFqP"`

### Task 4.4: PR da Onda 4

- [ ] **Step 1:** `pnpm lint && pnpm typecheck && pnpm build` verde; com `publicado:false` a rota fica invisível (404, sem nav, sem sitemap).
- [ ] **Step 2:** `git push -u origin feat/pagina-resultados`
- [ ] **Step 3:** `gh pr create --base dev --title "feat: página /resultados (schema vazio, rota oculta até o pós-evento)" --body "<tasks 4.1–4.3>. Preencher data/resultados.ts + publicado=true no dia seguinte ao evento.$(printf '\n\n')https://claude.ai/code/session_01XueohhhZ2MEM4aTTAAwFqP"`
- [ ] **Step 4:** Checkpoint Lain: merge → promover → verificar produção (`/resultados` deve dar 404).

---

## Onda 5 — Offline / PWA (só cache)

**Branch:** `feat/offline-pwa` a partir de `origin/dev` — **só depois de Ondas 1–4 em produção e o conteúdo do evento estável.**

### Task 5.1: Service worker

**Files:**
- Create: `public/sw.js`

- [ ] **Step 1:** Criar `public/sw.js` (servido como `/sw.js` no export estático):
```js
// Cache offline mínimo (feature D, spec 2026-08-29). Network-first para
// HTML — cache só responde offline. Cache-first só para /_next/static
// (hasheado, imutável). Bumpar CACHE_VERSION a cada deploy que toque
// conteúdo das rotas precacheadas.
const CACHE_VERSION = "brazskate-v1";
const PRECACHE = ["/", "/programacao", "/regulamento"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE_VERSION).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const { request } = e;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // static hasheado: cache-first
  if (url.pathname.startsWith("/_next/static/")) {
    e.respondWith(caches.match(request).then((hit) => hit || fetch(request).then((res) => {
      const copy = res.clone();
      caches.open(CACHE_VERSION).then((c) => c.put(request, copy));
      return res;
    })));
    return;
  }

  // navegação / HTML: network-first, cache como fallback offline
  if (request.mode === "navigate" || request.destination === "document") {
    e.respondWith(
      fetch(request).then((res) => {
        const copy = res.clone();
        caches.open(CACHE_VERSION).then((c) => c.put(request, copy));
        return res;
      }).catch(() => caches.match(request).then((hit) => hit || caches.match("/")))
    );
    return;
  }
});
```
- [ ] **Step 2:** `pnpm build` — confirmar `out/sw.js` existe e é cópia literal de `public/sw.js`.
- [ ] **Step 3:** Commit: `git add public/sw.js && git commit -m "feat(pwa): service worker de cache offline (network-first p/ HTML)$(printf '\n\n')Claude-Session: https://claude.ai/code/session_01XueohhhZ2MEM4aTTAAwFqP"`

### Task 5.2: Registro do SW

**Files:**
- Create: `components/registrar-sw.tsx`
- Modify: `app/layout.tsx` (montar o componente)

**Interfaces:**
- Produces: `export function RegistrarSW(): null` — `"use client"`, registra `/sw.js` em `useEffect` só se `process.env.NODE_ENV === "production"` e `"serviceWorker" in navigator`.

- [ ] **Step 1:** Criar `components/registrar-sw.tsx`:
```tsx
"use client";
import { useEffect } from "react";

export function RegistrarSW() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  }, []);
  return null;
}
```
- [ ] **Step 2:** Ler `app/layout.tsx` — montar `<RegistrarSW />` dentro do `<body>` (perto de `<Analytics />` se existir).
- [ ] **Step 3:** `pnpm lint && pnpm typecheck && pnpm build`. Esperado: PASS.
- [ ] **Step 4:** Commit: `git add components/registrar-sw.tsx app/layout.tsx && git commit -m "feat(pwa): registra o service worker em produção$(printf '\n\n')Claude-Session: https://claude.ai/code/session_01XueohhhZ2MEM4aTTAAwFqP"`

### Task 5.3: Verificação manual (Lain, em produção ou preview)

- [ ] **Step 1:** Deploy de preview do PR. Abrir no Chrome → DevTools → Application → Service Workers: `sw.js` ativo.
- [ ] **Step 2:** Com rede: mudar algo trivial, republicar, recarregar — a mudança aparece sem "Empty cache and hard reload" (prova do network-first).
- [ ] **Step 3:** DevTools → Network → Offline. Recarregar `/`, `/programacao`, `/regulamento` — abrem do cache. Uma rota não precacheada visitada antes também deve abrir (foi cacheada no fetch).
- [ ] **Step 4:** DevTools → Application → Clear storage não deve ser necessário entre deploys; confirmar que um segundo deploy (com `CACHE_VERSION` bumpado para `v2` num teste) limpa o `v1` no `activate`.

### Task 5.4: PR da Onda 5

- [ ] **Step 1:** `pnpm lint && pnpm typecheck && pnpm build` verde; `out/sw.js` presente.
- [ ] **Step 2:** `git push -u origin feat/offline-pwa`
- [ ] **Step 3:** `gh pr create --base dev --title "feat: acesso offline via service worker (cache-only, feature D)" --body "network-first p/ HTML, cache-first só p/ /_next/static. Precache: /, /programacao, /regulamento. Não instalável. Verificação manual do Lain no preview (task 5.3).$(printf '\n\n')https://claude.ai/code/session_01XueohhhZ2MEM4aTTAAwFqP"`
- [ ] **Step 4:** Checkpoint Lain: verificação 5.3 no preview → merge → promover → reverificar em produção (com atenção a não servir conteúdo velho).

---

## Self-Review

**Spec coverage:**
- Onda 0 (promover D53) → Task 0.1. ✔
- Onda 1: fechar inscrições (dados/hero/página) → 1.1, 1.2; patrocinadores De la Crew/Skid/Street Loyal → 1.3; avisos → 1.4; D54 no doc → 1.5; PR/promoção → 1.6. ✔
- Onda 2: pista-0*.webp → 2.1; og/QR → 2.2; spike bundle → 2.3; cleanup PDFs → 2.4; PR → 2.5. ✔
- Onda 3: guia do dia (dados+seção) → 3.1, 3.2; destaque reta final (componente+montagem) → 3.3, 3.4; zero-state countdown → 3.5; PR → 3.6. ✔
- Onda 4: schema → 4.1; página 404 → 4.2; nav/sitemap condicionais → 4.3; PR → 4.4. ✔
- Onda 5: sw.js → 5.1; registro → 5.2; verificação manual → 5.3; PR → 5.4. ✔
- Constraints globais (branch de `dev`, verde antes de PR, promover+verificar após onda, sem Chrome→QA do Lain) → seção Global Constraints + steps de PR/checkpoint em cada onda. ✔

**Placeholder scan:** `<INSTAGRAM_*>`, `<HOJE_*>`, `<ALVO>`, `<classes …>`, `<resumo …>` são pontos de dados externos (URLs do Lain, data do dia da execução, largura medida no Step anterior, classes do design system lidas no Step anterior) — cada um tem um Step que instrui como obter o valor. Não são "implementar depois". Aceitável.

**Type consistency:** `Colocacao` definido em 4.1 e usado em 4.2/4.3. `resultados.publicado` idem. `GuiaDiaItem`/`guiaDia` definidos em 3.1, usados em 3.2. `DestaqueAviso` definido em 3.3, montado em 3.4. `RegistrarSW` definido em 5.2, montado em 5.2 Step 2. `CACHE_VERSION` só em `public/sw.js`. Consistente.

**Ponto de atenção para o executor:** `data/categories.ts` — o nome real do export e a forma do tipo de categoria são lidos no Task 4.1 Step 1; os exemplos de código usam `categorias` como placeholder do nome real.
