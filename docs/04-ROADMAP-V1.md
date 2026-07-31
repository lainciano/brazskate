# Braz Skate — Roadmap do V1

> **STATUS: APROVADO COMO DECOMPOSIÇÃO — refinável a cada sub-etapa.**
> Estratégia e decomposição aprovadas pelo Lain em 24/07/2026 (brainstorming),
> após a publicação do MVP e a spec da primeira sub-etapa de info básica.
> Este documento sequencia o V1; cada sub-etapa ganha sua própria spec →
> plano → PR quando for implementada.
> Última atualização: 30/07/2026 — **V1.8 (`/inscricao`) destravada e
> publicada** (D29, commit `92a0920`): formulário no Tally no ar, página
> `/inscricao` publicada, CTA do hero religado. 26/07/2026: V1.9 (GSAP
> avançado, os 9 itens da spec ampla) concluída por completo e publicada em
> produção (PR #46, #47, #48, #49, #50). 25/07/2026: V1.4 publicada em
> produção (PR #38); blueprint do formulário de pré-inscrição concluído
> (destrava a linha do estacionamento); V1.6 corrigida para refletir o que
> já estava implementado (era muito menor do que a decomposição original
> sugeria).

## O que é o V1

O MVP ("cartão de visitas da ASB") está no ar. O V1 é o **site do evento** —
os 11 itens de `03-SPEC-SITE.md` §3.2. Diferente do MVP, o V1 **não é uma
leva única**: a maior parte dele depende de coisas que ainda não existem
(data oficial, regulamento, fotos com permissão, patrocinadores fechados,
termo jurídico). Por isso o V1 é tocado como uma **sequência de sub-etapas
independentes**, no mesmo padrão da primeira delas (info básica): cada
sub-etapa é um recorte pequeno, com spec própria, plano próprio e um PR.

## Regras do jogo (valem para todas as sub-etapas)

Herdadas de `04-ROADMAP-MVP.md` e `CONTRIBUTING.md`, mais dois pontos novos:

- Uma sub-etapa por PR; branch sempre a partir de `dev`.
- **Disciplina de placeholder** (`AGENT.md`): nada de data, regulamento ou
  premiação inventados — pendências aparecem como sticker
  (`05-DESIGN.md` §1.2 e §3.6). Nunca criar "casca vazia" de página/seção
  esperando conteúdo (`05-DESIGN.md` §4.3).
- Cada PR de implementação roda `pnpm lint`, `pnpm typecheck`, `pnpm build`
  e Lighthouse mobile local, anotando o resultado na descrição — orçamento
  em `05-DESIGN.md` §6.4 (segue valendo no V1).
- **NOVO — Conteúdo provisório é regra, não exceção.** Datas, fotos e
  informações do V1 vão mudar conforme a organização confirma coisas. Todo
  dado que muda mora numa **fonte única em `data/`** (ex.: `data/evento.ts`),
  lido pelos componentes — trocar um valor é editar um lugar só, nunca
  caçar string espalhada por componente.
- **NOVO — Portão de direito de imagem.** Nenhuma foto com pessoa
  identificável vai ao ar sem permissão de uso de imagem (`AGENT.md`,
  restrição de imagem; `03-SPEC-SITE.md` §7). Vale para foto de pista, de
  manobra, de 2021 — qualquer uma.

## Como cada sub-etapa nasce

O fluxo da info básica é o modelo: brainstorming → spec em
`docs/superpowers/specs/AAAA-MM-DD-<tópico>-design.md` → plano de
implementação → PR. Este roadmap **não** substitui essas specs; ele só diz
**o que** entra no V1, **em que ordem** e **o que destrava cada coisa**.

---

## Sub-etapas construíveis agora

São as que não dependem da reunião com a Administração nem de conteúdo de
terceiros. É de propósito uma leva pequena.

### V1.1 · Info básica — data prevista, local, e-mail

- **Estado:** spec **aprovada**, aguardando implementação. Vive em
  `docs/superpowers/specs/2026-07-17-info-basica-data-local-contato-design.md`
  (branch `docs/spec-info-basica-v1`, ainda não mergeada em `dev`).
- **Entrega:** `data/evento.ts` como fonte única; stickers do hero passam a
  exibir a **previsão** ("22 de agosto" / "inscrição: previsão 01/08") como
  texto — **sem countdown** enquanto a data não travar (decisão do Lain,
  24/07/2026); nova seção `components/localizacao.tsx` com mapa embutido do
  Google Maps + endereço + botão de fallback; e-mail como terceiro canal em
  Contato e Footer; atualização de `02-DECISOES.md`, `05-DESIGN.md` §7 e
  `contatos.md`.
- **Consome do design:** §3.3 (SectionHeader), §3.6 (sticker), §3.1
  (botões), §1.5 (tom), §2 (tokens).
- **Pronto quando:** trocar a previsão de data é editar só `data/evento.ts`;
  mapa carrega lazy sem mexer no LCP; e-mail navegável por teclado no
  Contato/Footer.

### V1.2 · Polish do hero — corrimão no desktop

- **Estado:** **rejeitado em 25/07/2026.** O SVG do corrimão sobrepunha o
  texto do hero em telas menores (1366×768), piorando a leitura em vez de
  melhorá-la. Artefatos removidos (`components/corrimao.tsx`, spec e plano
  da tentativa); não reagendado — sai da fila de sub-etapas construíveis
  agora. Se retomado no futuro, precisa de uma nova spec que resolva a
  colisão com o wordmark em larguras médias, não só desktop largo.
- Descrição original da entrega, mantida como referência caso a ideia seja
  retomada:
- **Entrega:** a faixa rosa decorativa do hero (`bg-rosa/80`, hoje escondida
  no mobile porque atrapalhava a palavra "Skate") vira uma **silhueta de
  corrimão** (rail de skate) no desktop — novo SVG gráfico, no vocabulário
  de "abstração de rampa/transição" do hero (`05-DESIGN.md` §4.1), tratado
  como utilitário gráfico decorativo (§3.9: `aria-hidden`, estático, sem
  motion). Restrição de layout: não pode encobrir o wordmark do hero em
  nenhuma largura.
- **Consome do design:** §4.1 (linguagem gráfica do hero), §3.9 (utilitários
  gráficos), §2 (tokens de cor).
- **Pronto quando:** desktop mostra o corrimão sem prejudicar a leitura do
  logo; mobile segue sem a faixa; `prefers-reduced-motion` indiferente
  (elemento é estático).

### V1.3 · FAQ parcial

- **Estado:** ✅ **concluída e publicada** (25/07/2026, PR #33). Só as
  perguntas com **resposta certa hoje** têm texto; as que dependem do
  regulamento (P6) entram na lista marcadas **"em breve"** (decisão D16 em
  `02-DECISOES.md`: manter visíveis com sticker, não esconder). V1.2 foi
  rejeitada (ver acima) e não fica na fila.
- **Entrega:** seção de FAQ com padrão de disclosure `<details>`/`<summary>`
  nativo (novo padrão do projeto, documentado em `05-DESIGN.md`), conteúdo
  em fonte única `data/faq.ts` (MDX descartado — projeto não tem infra MDX
  hoje, ver D13/D7). Perguntas com resposta hoje (conteúdo confirmado em
  D16): taxa (não tem), categorias (iniciante/amador/feminino), o que levar
  (skate + equipamento de segurança + documento — **corrigido por D20**, a
  versão original dizia "skate/patins"), acompanhantes/
  público (entrada livre). Perguntas que aguardam regulamento (faixas
  etárias, tamanho da cota presencial, política de chuva/adiamento): sticker
  "em breve", não ficam fora da lista.
- **Consome do design:** §3.3 (SectionHeader), §3.6 (sticker "em breve"),
  §1.5 (tom), §6.1 (motion de entrada via `Reveal`), §2 (tokens).
- **Pronto quando:** FAQ lê bem no celular; nenhuma resposta pendente
  aparece inventada; acrescentar/editar pergunta é mexer só na fonte de
  dados.

### V1.4 · Termo de responsabilidade — página, PDF e política de aceite

- **Estado:** **construível agora** — destravada por **I3 resolvida** e
  **D19** (25/07/2026). É a próxima sub-etapa da fila.
- **Entrega:**
  1. Fonte única `data/termo.ts` — versão, data de validação jurídica e as
     cláusulas como array estruturado (`{ titulo, texto }`), com os dois
     blocos: maior de idade e autorização de responsável por menor. A página
     e o PDF renderizam do **mesmo** array; editar o texto é mexer num lugar.
  2. Rota estática `/termo` no vocabulário do site (registro concreto para
     leitura longa, `SectionHeader`, tokens do §2).
  3. Botão "Baixar PDF" — componente cliente com **import dinâmico no
     clique** (`await import(...)`), mantendo a lib fora do bundle inicial
     (D19; orçamento §6.4).
  4. Política de aceite documentada na página: checkbox eletrônico no
     formulário externo + papel idêntico no credenciamento (D19).
- **Consome do design:** §3.3 (SectionHeader), §3.1 (botões), §2 (tokens),
  §1.5 (tom), §6.4 (orçamento de JS).
- **A decidir na spec (não assumir):** como a identidade visual entra no
  PDF. Embutir **Anton** no jsPDF exige carregar a fonte em base64 (payload
  considerável, mesmo com import dinâmico); a alternativa é usar as fontes
  padrão do jsPDF com as **cores da marca** + o **logo PNG** no cabeçalho.
  Decidir isso explicitamente antes de implementar.
- **Pronto quando:** editar uma cláusula é mexer só em `data/termo.ts` e
  reflete na página **e** no PDF; o PDF sai legível em A4 e imprimível em
  preto e branco; o bundle inicial não cresce (medido no `pnpm build`);
  `/termo` navegável por teclado e com hierarquia real de headings.

### V1.5 · Countdown com a data prevista

- **Estado:** ✅ **concluído e publicado** (`components/countdown.tsx`,
  usado em `components/hero.tsx`). Decisão original do Lain (25/07/2026):
  usar a **data prevista** como valor atual, em vez de esperar P1. Com a
  **D24** (30/07/2026, data confirmada), o sticker ao lado do countdown
  perdeu a palavra "previsão" — hoje mostra só "Data: {data}".
- **Entrega:**
  1. `data/evento.ts` ganha uma forma legível por máquina (ex.:
     `dataPrevistaISO: "2026-08-22"`) ao lado das strings de exibição que já
     existem — **uma fonte, várias formas**; trocar pela data oficial é
     editar esse arquivo e nada mais.
  2. `components/countdown.tsx` (cliente — depende de relógio) com
     `StickerBadge` variante `data` deixando explícito que é **previsão**,
     nunca data confirmada (disciplina de placeholder do `AGENT.md`).
  3. Tratamento de SSG: com `output: 'export'` o HTML é gerado no build, então
     o valor inicial é calculado **na montagem** no cliente, com um estado
     inicial estável, para não haver divergência de hidratação nem CLS.
- **Consome do design:** §3.6 (sticker), §2 (tokens), §1.5 (tom do hero),
  §6.4 (CLS < 0,1).
- **Cuidado de acessibilidade (definir na spec):** dígitos que mudam a cada
  segundo dentro de `aria-live` **inundam** leitor de tela. O padrão previsto
  é: dígitos visuais com `aria-hidden` + um resumo textual legível ("faltam
  cerca de 28 dias para 22 de agosto de 2026 — data prevista") que só muda de
  forma relevante.
- **Pronto quando:** trocar a data é editar `data/evento.ts`; a palavra
  "previsão" é inseparável do número; sem divergência de hidratação; leitor de
  tela anuncia o prazo uma vez, não a cada segundo.

### V1.6 · Motion residual

- **Estado:** ✅ **concluída** (25/07/2026). A decomposição original desta
  entrada superestimava o que faltava — auditoria no início da sub-etapa
  encontrou a maior parte do §6.1 já implementada: `Reveal`/ScrollTrigger nas
  7 seções (Hero, Sobre, Localização, Categorias, FAQ, Patrocínio, Pix,
  Contato), sublinhado-rabisco no hover de link (`components/botao.tsx`),
  traço do rabisco do hero se desenhando (`stroke-dashoffset`,
  `hero.tsx`), feedback do copiar Pix com `aria-live`, e `<details>` do FAQ
  com chevron animado. **Não precisou de spec própria** — os guardrails do
  §6.2 já estavam encarnados em `lib/motion.ts`.
- **O que de fato faltava e foi entregue:**
  1. **"Stencil puxado" do título de seção** — `components/reveal.tsx` ganhou
     o seletor `[data-stencil]` (clip-path, mesmo tratamento que o hero já
     aplicava ao próprio `h1`); `components/section-header.tsx` marca o `h2`
     com `data-stencil`, valendo para as 7 seções de uma vez.
  2. **"Carimbada" dos stickers fora do hero** — `Reveal` ganhou o seletor
     `[data-carimbo]` (scale + `back.out`); `components/sticker-badge.tsx`
     passou a aceitar props extras (`...rest`) para poder receber o atributo;
     aplicado aos dois stickers "em breve" fora do hero (Categorias, FAQ).
- **Consome do design:** §6.1 (linguagem de motion), §6.2 (guardrails do
  GSAP, já em `lib/motion.ts`), §3.6 (StickerBadge).
- **Guardrails do §6.2** — herdados automaticamente via `useMotion`/`Reveal`
  já existentes: `gsap.matchMedia()` some com toda a animação sob
  `prefers-reduced-motion`; só `transform`, `opacity` e `clip-path`; init
  preguiçoso no idle; sem `pin` nem `scrub`.
- **Fora desta sub-etapa:** WebGL/shader. O §6.3 registra OGL apenas como
  **candidato** de v1 — entrar nele exige decisão explícita à parte, não vem
  de carona no reforço de motion.
- **Pronto quando:** nenhuma seção fica "morta" ao rolar; com
  `prefers-reduced-motion` ativo tudo aparece estático e legível; nada
  animado causa layout shift. `pnpm lint`, `typecheck` e `build` limpos —
  verificação visual (hidratação, celular real) pendente de QA humana, sem
  Chrome disponível no ambiente de execução desta sessão.

### V1.7 · Slots de foto — preparar a troca sem foto real

- **Estado:** ✅ **concluída** (25/07/2026). O slot `fotoSrc` do hero já
  estava implementado (`components/hero.tsx`, duotone + `mix-blend-multiply`
  + scrim, exatamente como o §4.2 descreve) — esta sub-etapa **verificou** o
  caminho de troca e fechou o schema da galeria, sem acender nenhuma foto
  real (I1/I2 seguem abertas).
- **O que "slot" significa aqui (e o que NÃO significa):** no §4.2 o slot é
  uma **afordância de código** — o componente recebe `fotoSrc?` e, sem foto,
  renderiza um desenho **completo** (o hero gráfico), não uma lacuna. O §4.3
  e a regra deste roadmap proíbem **casca vazia**: nada de moldura de foto
  vazia, seção "esperando imagem" ou página de galeria sem fotos. Slot é
  contrato de prop, não placeholder visível.
- **Entrega:**
  1. **Verificado** — build local com uma foto sintética de teste (não
     commitada) confirmou que passar `fotoSrc` renderiza a camada de foto
     com `grayscale` e que as formas geométricas somem, sem erro de build.
     A troca é de fato "1 arquivo + 1 prop". Contraste AA com foto real
     fica para conferência visual humana quando a foto de verdade existir.
  2. `data/gallery.ts` (novo, vazio) — tipo `FotoGaleria` com `credito`
     obrigatório e `permissao: true` como literal (recusa foto sem permissão
     **no typecheck**, não em runtime). Contrato do componente de colagem
     documentado no §4.3.
  3. **Nenhuma página ou seção de galeria criada** — array vazio, sem
     casca vazia (I1/I2 seguem abertas).
- **Consome do design:** §4.2 (slot do hero, duotone, scrim), §4.3 (colagem,
  regra de não deixar moldura vazia), §2 (tokens).
- **Pronto quando:** existe um caminho documentado e testado para acender a
  foto do hero com 1 arquivo + 1 prop; o schema da galeria recusa foto sem
  crédito/permissão; o site publicado continua **sem** nenhuma moldura vazia.

### V1.9 · GSAP avançado — completa (CustomEase, DrawSVG, SplitText, Flip, MorphSVG, ScrambleText, ScrollSmoother)

- **Estado:** ✅ **concluída e publicada — os 9 itens da spec ampla**
  (26/07/2026). Sub-etapa 1 (itens 1–3 + fix do z-index do selo, item 9):
  PR #46 + PR #47, promovidas via PR #48. Sub-etapa 2 (itens 4–9
  restantes): PR #49, promovida via PR #50. Specs próprias em
  `docs/superpowers/specs/2026-07-26-gsap-fundacao-motion-design.md`,
  `docs/superpowers/specs/2026-07-26-hero-selo-sobreposicao-design.md` e
  `docs/superpowers/specs/2026-07-26-gsap-avancado-parte2-design.md`.
- **Entrega:** ease própria do projeto registrada em `lib/motion.ts` —
  `tintaSeca` (CustomEase, substitui `power3.out` genérico); `DrawSVGPlugin`
  substituindo o cálculo manual de `strokeDashoffset` no rabisco do hero, e
  o mesmo tratamento estendido ao sublinhado do `SectionHeader` (novo
  seletor `data-rabisco` em `components/reveal.tsx`), que antes só derivava
  no scroll sem se desenhar. Além disso (item 9, §5.1, resolvido nesta
  sub-etapa): fix do `z-index` do selo do hero — o `z-10` vivia só no filho
  `[data-hero-selo]`, nunca comparava contra o `<div>` de conteúdo; corrigido
  com `z-10` no wrapper e `z-20` no conteúdo.
- **`CustomWiggle` testado e descartado (D23.5):** quebra em runtime neste
  bundle ESM (`CustomWiggle.create()` depende de `window.gsap`, que este app
  nunca define) — travava o "carimbada" do sticker em `opacity:0`
  permanentemente, **sem erro visível no console**. Substituído por
  `elastic.out(1, 0.6)` (ease nativa do GSAP, sem plugin). Achado só via
  reprodução isolada em Node + Playwright/Firefox, já que os previews da
  Vercel exigem login (Deployment Protection) e bloqueiam QA automatizado.
- **Consome do design:** §6.1 (linguagem de motion), §6.2 (guardrails do
  GSAP, nomes das eases documentados), §3.3/§3.9 (SectionHeader, rabiscos).
- **Sub-etapa 2 (itens 4–9 restantes) entregue:** SplitText no lead das
  seções (reveal por palavra, `aria-label` automático no container);
  Flip no overlay do menu mobile (hambúrguer "cresce" até virar
  full-screen); MorphSVG no chevron do FAQ ("+" ⇄ "−" no toggle nativo);
  ScrambleText no sticker "em breve"; ScrollSmoother com o header fora do
  wrapper (D23.1) — sticky e navegação por âncora confirmados intactos via
  Playwright; posição do selo ajustada para cruzar mais a coluna de texto.
  Bounding box confirma cruzamento de ~795×592px com a coluna de conteúdo
  (era quase zero antes do ajuste) — grau final ainda pendente de
  conferência visual humana em dispositivo real (sem Chrome nesta sessão).
- **Pronto quando:** ✅ zero `power3.out`/`back.out(1.7)`/`CustomWiggle`
  residual no escopo tocado; zero `getTotalLength` manual em `hero.tsx`;
  `pnpm lint`/`typecheck`/`build` limpos; nenhuma mudança de comportamento
  sob `prefers-reduced-motion` (confirmado via Playwright/Firefox, local e
  no dev server real).

### V1.8 · Página `/inscricao`

- **Estado:** ✅ **concluída e publicada** (30/07/2026, commit `92a0920`,
  D29) — o formulário foi montado de fato no Tally
  (https://tally.so/r/J9bY7z, cota=60, corte de idade iniciante ≤25).
- **Entrega:** rota `/inscricao` (`app/inscricao/page.tsx`) explicando o
  modelo híbrido (D1) e linkando `/termo`; CTA "Quero competir" do hero
  religado de `#categorias` para `/inscricao`.
- **Pronto quando:** ✅ URL do Tally publicada; página no ar; CTA religado.
  Seguem em aberto, fora do escopo desta sub-etapa: acesso à planilha de
  respostas restrito só ao Lain (pendência #5 do blueprint) e política de
  retenção de dados (pendência #6 do blueprint).

---

## Mapa de completude do V1 (os 11 itens de `03-SPEC-SITE.md` §3.2)

O que falta para o site estar completo antes do campeonato:

| # | Item da spec | Status | O que falta / trava |
|---|---|---|---|
| 1 | Countdown | 🟢 construída | **V1.5** — publicado no hero, data confirmada por D24 |
| 2 | Regulamento completo | 🟢 construída | **P6 resolvida (D26)** — página `/regulamento` publicada com categorias/faixas etárias, cota, formato, pontuação, premiação (estrutura) e política de chuva |
| 3 | Data, local e como chegar | 🟡 parcial | Mapa/endereço/e-mail entregues na V1.1; faltam **transporte e estacionamento** (conteúdo a levantar) |
| 4 | Pré-inscrição + modelo híbrido | 🟢 construída | **D29** — formulário publicado no Tally (https://tally.so/r/J9bY7z), página `/inscricao` no ar, CTA do hero religado |
| 5 | Termo + autorização de menor | 🟢 construível | **V1.4** — texto validado (I3 resolvida) |
| 6 | Patrocinadores confirmados | 🟡 parcial | **I7 resolvida (D28)** — UIEMAPV publicada como parceiro institucional em `/patrocinio`. Segue faltando **P4** — nenhum patrocinador comercial fechado, captação da ASB não começou |
| 7 | Galeria (2021 + pista) | 🔴 travado | **I1/I2** + permissão de imagem. **V1.7** só prepara o schema, não publica página |
| 8 | FAQ | 🟢 construída | 8 respostas no ar — as 3 que aguardavam P6 (faixas etárias, cota, chuva) resolvidas por D26; nova pergunta sobre a pista (D27) |
| 9 | Programação do dia | 🔴 travado | **P6** + logística (horários de bateria/credenciamento/final) |
| 10 | Avisos/atualizações | 🟡 parcial | Infra é trivial; falta aviso real publicável — a parceria confirmada **não** serve enquanto I7 estiver aberta |
| 11 | Imprensa/contato ampliado | 🟡 parcial | E-mail entregou na V1.1; resto quando houver assessoria/canais |

Transversal (não está na lista dos 11, mas o Lain pediu):

| Tema | Status | Observação |
|---|---|---|
| Motion / feedback / efeitos | 🟢 construível | **V1.6** e **V1.9** (GSAP avançado — completo, 9 itens) concluídas — guardrails do §6.2 |
| Slots de foto | 🟢 construível | **V1.7** — afordância de código, sem casca vazia |
| Recursos "gameficados" | ⚪ sem escopo | Continua exigindo brainstorming + spec; avaliar contra o anti-escopo |

---

## Estacionamento — sub-etapas travadas (mapeadas, não agendadas)

Documentadas para não se perderem. Cada uma sai do estacionamento quando a
pendência que a trava for resolvida (códigos P/I de `02-DECISOES.md`).

| Sub-etapa | Destrava com | Observação |
|---|---|---|
| Regulamento completo (página) | **P6** — regulamento/faixas etárias/pontuação | Página nasce só quando houver texto real; sem casca. Reaproveita o padrão de disclosure do §3.6-bis. |
| Formulário de pré-inscrição (Tally/Forms) | **Criar o formulário** (tarefa da ASB) + **P6** (tamanho da cota) | Blueprint pronto em `docs/blueprint-formulario-pre-inscricao.md` (25/07/2026) — handoff operacional completo (telas, campos, lógica, textos). Só falta a ASB montar de fato no Tally (D21) e P6 fechar cota/faixas etárias. Condicional de menor **por data de nascimento**, nunca por categoria (`AGENT.md`). Aceite eletrônico do termo por checkbox (D19), papel no credenciamento. |
| Programação do dia | **P6** + logística do evento | Horários de baterias/credenciamento/final. |
| Patrocinadores confirmados (grade de logos) | Patrocinador fechado (P4) + **I7** (logo/links da UIEMAPV) | `data/sponsors.json`. Parceria já confirmada (D18), mas o site **não menciona** a UIEMAPV até chegarem logo e link oficiais. |
| Galeria (2021 + pista atual) | **I1** / **I2** + **permissão de imagem** | Cada foto com `credito` e `permissao`; portão de direito de imagem. **V1.7** define o schema; a página só nasce com foto real. |
| Foto real no hero | Foto final + **permissão de imagem** | Slot `fotoSrc` (`05-DESIGN.md` §4.2); **V1.7** garante que a troca seja 1 arquivo + 1 prop. |
| Avisos/atualizações (lista MDX) | Ter aviso real para publicar | Infra é trivial; sem conteúdo, não construir casca. A parceria confirmada não serve como aviso enquanto I7 estiver aberta. |
| Transporte e estacionamento ("como chegar") | Conteúdo a levantar com a organização | Item 3 e item 8 (FAQ) da spec §3.2. Ficou fora da V1.3 de propósito; entra quando a informação existir — não inferir. |
| Recursos "gameficados" / interatividade | Spec própria (brainstorming) | Pedido do Lain em 24/07/2026. Sem escopo definido — precisa de brainstorming + spec antes de virar plano; avaliar contra o anti-escopo de `AGENT.md` (ex.: nada que implique conta de usuário/login/backend, hoje fora de escopo do site). |
| Imprensa/contato ampliado | Assessoria/canais adicionais | E-mail entregue na V1.1; resto quando houver. |
| Shader/WebGL no hero (OGL) | Decisão explícita do Lain | §6.3 registra OGL (~10KB) apenas como **candidato** de v1. Não entra de carona na V1.6. |

> **Saíram do estacionamento em 25/07/2026:** countdown (→ **V1.5**, passa a
> usar a data prevista), termo de responsabilidade (→ **V1.4**, I3 resolvida)
> e motion/efeitos (→ **V1.6**, pedido do Lain).

---

## Ordem sugerida e o que vem depois

**Todas as sub-etapas construíveis agora (V1.1–V1.9, exceto a V1.2
rejeitada) estão concluídas e publicadas.** Não sobra fila de sub-etapa
numerada — o que resta do V1 mora inteiramente na tabela de
**estacionamento** acima, bloqueado por pendências de conteúdo/decisão da
Administração ou de terceiros (P4, I1, I2, programação do dia, transporte/
estacionamento).

Concluídas:

1. **V1.1 · Info básica** — ✅ PR #30 (24/07/2026).
2. ~~V1.2 · Polish do hero~~ — ❌ **rejeitada em 25/07/2026**, fora da fila.
3. **V1.3 · FAQ parcial** — ✅ PR #33 (25/07/2026).
4. **V1.4 · Termo de responsabilidade** — ✅ PR #37, publicada em produção
   via PR #38 (25/07/2026).
5. **Blueprint do formulário de pré-inscrição** — ✅ concluído em
   25/07/2026, doc puro (`docs/blueprint-formulario-pre-inscricao.md`); não
   é uma V-numerada porque não é código do site.
6. **V1.5 · Countdown** — ✅ concluído (`components/countdown.tsx`, usado em
   `hero.tsx`) — hero mostra contagem real a partir da data prevista, sticker
   "Data:" ao lado (ajustado por D24), a11y com resumo `sr-only` sem inundar
   leitor de tela a cada segundo.
7. **V1.6 · Motion residual** — ✅ concluído (25/07/2026) — "stencil puxado"
   do `SectionHeader` e "carimbada" dos stickers fora do hero.
8. **V1.7 · Slots de foto** — ✅ concluído (25/07/2026) — caminho de troca
   verificado, schema de `data/gallery.ts` definido (array vazio até haver
   foto real, I1/I2).
9. **V1.8 · Página `/inscricao`** — ✅ concluída e publicada (30/07/2026,
   commit `92a0920`, D29): formulário no Tally no ar, CTA do hero religado.
10. **V1.9 · GSAP avançado (completa, 9 itens)** — ✅ sub-etapa 1: PR #46 +
    PR #47, publicada via PR #48; sub-etapa 2: PR #49, publicada via PR #50
    (26/07/2026), incluindo ScrollSmoother (D23.1).

Quando a reunião formal com a Administração acontecer (data oficial + P6 —
**P6 já resolvida por D26**), o estacionamento que resta destrava —
provavelmente na ordem **cota/regulamento (✅ já fechados) → programação do
dia → transporte/estacionamento**. Conteúdo de terceiros (fotos com
permissão, patrocinadores comerciais) entra quando existir, independente de
reunião.

## Pendências que este roadmap observa

Fonte da verdade é `02-DECISOES.md`. Resumo do que mais pesa no V1:

- **P1** data oficial · **P6** regulamento/cota — destravam o grosso do V1.
  (P1 deixou de travar o countdown: a V1.5 usa a previsão.)
- **P3** banheiros/área de público · **P4** itens da premiação e captação —
  parcialmente resolvidas por D17; o que sobrou está nomeado em
  `02-DECISOES.md`.
- **I1** fotos 2021 · **I2** foto da pista · **I7** logo/links da UIEMAPV —
  cada um trava uma sub-etapa específica acima.
- **I3 (termo jurídico): resolvida** em 25/07/2026 — destravou a V1.4 e
  removeu o bloqueio jurídico da pré-inscrição.
- Datas e fotos atuais são **provisórias** por decisão do Lain (24/07/2026)
  — o site as trata como tal (fonte única + placeholder), nunca como
  definitivas.
