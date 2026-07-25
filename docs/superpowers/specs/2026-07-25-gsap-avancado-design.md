# GSAP avançado — SplitText, ScrollSmoother, Flip, SVG e efeitos

> **STATUS: PLANEJAMENTO — AGUARDANDO APROVAÇÃO.**
> Pedido do Lain em 25/07/2026. Nenhum código foi escrito; este documento
> existe para decidir **o que entra, onde, e sob quais guardrails** antes de
> qualquer implementação.
>
> ⚠️ **Este plano contraria `05-DESIGN.md` §6.2** ("Escopo permitido no MVP:
> `gsap` core + `ScrollTrigger`. **Nada além.**"). Pelo `AGENT.md`, nada que
> contrarie os documentos vigentes se implementa sem decisão do mantenedor —
> então a **primeira tarefa** de qualquer implementação é registrar a emenda
> como decisão (proposta: **D23**), não começar pelo código.

## 1. Licenciamento — resolvido, nada a pagar

Era a primeira pergunta a fechar. Resposta: **todos os plugins pedidos são
gratuitos e já estão no projeto.**

- O pacote `gsap@3.15.0` (já em `package.json`, instalado) **inclui todos**:
  `SplitText.js`, `ScrollSmoother.js`, `Flip.js`, `DrawSVGPlugin.js`,
  `MorphSVGPlugin.js`, `CustomEase.js`, `CustomWiggle.js`, `CustomBounce.js`,
  `ScrambleTextPlugin.js`, `Observer.js`, `Draggable.js`, `InertiaPlugin.js`,
  `MotionPathPlugin.js`, `Physics2DPlugin.js`, `GSDevTools.js` — verificado
  em `node_modules/gsap/`.
- Licença declarada no pacote: *standard "no charge"*
  (https://gsap.com/standard-license). Uso livre em qualquer site ou
  aplicação web, **inclusive comercial**. A única restrição é usar o GSAP
  dentro de uma ferramenta de construção visual de animações que concorra com
  o Webflow — não é o caso.
- Historicamente vários destes eram "Club GreenSock" (pagos). **Isso mudou**:
  desde a aquisição pela Webflow, todos vêm no pacote público do npm.

**Consequência prática:** zero dependência nova, zero custo, zero conta a
criar. O que muda é só o que se **importa** dentro do chunk lazy.

## 2. Correções ao pedido original (o que a leitura do código mostrou)

Três coisas do pedido não batem com o site como ele é hoje. Registrando antes
de planejar em cima de premissa errada:

1. **O título do hero NÃO é texto — é uma imagem.** `components/hero.tsx:93`
   tem `<h1>` contendo `<Image src="/logo-completa.png">`. SplitText não tem
   o que dividir ali. SplitText se aplica ao **`SectionHeader` `h2`**
   (Anton, texto real), ao **lead** das seções e ao **wordmark do footer**.
2. **"Mesmerizing effects" não é um produto do GSAP.** Não existe plugin com
   esse nome — é linguagem de vitrine (showcase). O que existe de concreto e
   que serve ao vocabulário de rua do site está mapeado em §3.4/§3.5 abaixo
   (DrawSVG, MorphSVG, CustomEase/Wiggle, ScrambleText). Não vou inventar um
   plugin que não existe.
3. **O rabisco do hero já anima "à mão".** `hero.tsx:35-50` calcula
   `getTotalLength()` e anima `strokeDashoffset` manualmente — é exatamente o
   que o `DrawSVGPlugin` faz, melhor. Isso é substituição, não adição.

## 3. O que entra e onde

Mapeado nos componentes reais, não em abstrações.

### 3.1 SplitText — títulos e textos de destaque

**O que faz:** quebra um bloco de texto em `<div>`/`<span>` por caractere,
palavra ou linha, para animar cada pedaço com stagger. Na 3.13+ tem
`autoSplit` (re-split em resize) e tratamento de acessibilidade embutido.

**Onde entra:**
- `components/section-header.tsx` — o `h2` (Anton). Hoje ele anima com o
  "stencil puxado" via `clip-path` (`[data-stencil]`, V1.6). SplitText
  **substitui ou complementa**: revelar por linha mantém a leitura de stencil,
  revelar por caractere é mais chamativo mas mais arriscado em título longo.
- Lead das seções (`SectionHeader` `lead`) — reveal por palavra, sutil.
- Wordmark gigante do footer (§3.8) — já é decorativo/`aria-hidden`,
  candidato natural a caractere-a-caractere.

**Não entra:** hero `h1` (é imagem, ver §2.1); texto corrido de `/termo`
(leitura longa, jurídica — animar prejudica).

**Cuidados que a spec de implementação precisa fechar:**
- **Fonte precisa estar carregada antes do split.** Anton é servida por
  `next/font`; splitar antes do load calcula métricas erradas e reflui na
  troca. Usar `document.fonts.ready` antes de instanciar.
- **Acessibilidade:** dividir texto em spans pode fazer leitor de tela ler
  letra por letra. SplitText moderno oferece tratamento automático de `aria`;
  a implementação **precisa verificar isso no DOM real**, não confiar.
- **Layout shift:** split muda a estrutura do nó. Reservar espaço / splitar
  antes do primeiro paint da animação, nunca depois de o usuário já estar
  lendo.

### 3.2 ScrollSmoother — ⚠️ o item com conflito real

**O que faz:** aplica scroll suavizado à página inteira, envolvendo o
conteúdo num wrapper transformado. Requer `ScrollTrigger`.

**O conflito:** ScrollSmoother move o conteúdo com `transform` num container.
**`position: sticky` deixa de funcionar dentro desse container** — e o
`components/header.tsx:32` é exatamente `sticky top-0 z-40`, a barra de
navegação do site inteiro. Não é detalhe: é o header sumir ou parar de grudar.

**Saídas possíveis** (decisão pendente, ver §6):
- **(a) Header fora do wrapper suavizado** — mantém o sticky, o resto rola
  suave. É a saída padrão recomendada, mas exige reestruturar `app/layout.tsx`
  e `app/page.tsx` para separar header do conteúdo.
- **(b) Header vira `position: fixed`** — funciona com ScrollSmoother, mas
  muda o comportamento e o cálculo de offset das âncoras (`#sobre`,
  `#categorias`…), que são a navegação inteira do site.
- **(c) Não usar ScrollSmoother.** O ganho é estético e difuso; o custo é
  estrutural e toca o componente mais crítico.

**Segundo conflito — com o guardrail de lazy-init.** `lib/motion.ts` inicia
o GSAP no `requestIdleCallback`, depois da hidratação (guardrail §6.2 nº 3).
ScrollSmoother envolve a página toda: iniciá-lo tarde causa um **salto
visível** de layout. Ou ele foge do padrão de lazy-init (violando o §6.2), ou
o site aceita esse salto. Nenhuma das duas é boa — pesa a favor da saída (c).

**Recomendação:** deixar ScrollSmoother **por último**, como experimento
isolado e reversível, depois que o resto estiver estável. É o único item da
lista com risco de regressão estrutural.

### 3.3 Flip — transições de UI

**O que faz:** grava a posição/tamanho de elementos, deixa você mudar o DOM
ou as classes livremente, e anima a diferença (FLIP: First, Last, Invert,
Play). Ideal para "o elemento mudou de lugar/tamanho".

**Onde entra:**
- **Overlay do menu mobile** (`components/header.tsx:80`) — hoje é
  `{aberto && <div>}`, aparece e some sem transição. Flip pode fazer o
  hambúrguer "crescer" para virar o overlay full-screen. É o encaixe mais
  natural e mais visível do plugin no site atual.
- **Cards de categoria** (`components/categorias.tsx`) — só faz sentido se
  ganharem um estado expandido (hoje são estáticos, §3.4 do design). **Não
  criar interação nova só para justificar o plugin** — seria escopo inventado.

**Não entra:** `<details>` do FAQ. O §3.6-bis é explícito: disclosure nativo,
**sem animação de abrir/fechar**, por design. Animar contraria o padrão
recém-estabelecido na V1.3.

### 3.4 SVG — DrawSVG e MorphSVG

**DrawSVGPlugin** — anima o traço de um path como se estivesse sendo
desenhado (o que o hero faz hoje na mão).
- `components/rabiscos.tsx` (sublinhado, seta) — o sublinhado do
  `SectionHeader` se desenhando quando a seção entra. Encaixa direto no
  vocabulário "traço à mão" do §3.9.
- `components/hero.tsx:35-50` — **substituir** o cálculo manual de
  `strokeDashoffset` por DrawSVG. Menos código nosso, mesmo efeito.

**MorphSVGPlugin** — transforma um path em outro.
- Candidato: o **chevron do FAQ** (hoje rotaciona 180° via CSS) virar um
  morph de "+" para "−". Ganho pequeno.
- Candidato mais interessante: o **rasgo** (`components/rasgo.tsx`) morfar
  sutilmente entre duas bordas irregulares. **Risco:** o §3.9 exige que o
  rasgo não crie altura de layout inesperada — morph precisa manter a mesma
  caixa. Verificar antes.

**Grão** (`components/grao.tsx`, `feTurbulence`): animar `baseFrequency` dá
o efeito de grão vivo, mas **filtro SVG animado é caro em GPU** e o §6.4
tem orçamento de performance. Se entrar, entra medido em celular real —
ou não entra.

### 3.5 Extras que valem mais que alguns dos pedidos

Você disse para sugerir se eu visse algo que combinasse. Estes três dão mais
retorno por risco que o ScrollSmoother:

- **CustomEase** — permite desenhar a curva de easing exata. O §6.1 define a
  linguagem "tinta fresca seca rápido" (movimento curto, firme, com atitude).
  Hoje isso é aproximado com `power3.out`/`back.out(1.7)` genéricos. Uma
  ease própria do projeto é **identidade de marca em movimento**, custo
  ~zero de performance, risco ~zero.
- **CustomWiggle / CustomBounce** — a "carimbada" do sticker (§6.1) é
  literalmente um gesto de carimbo. CustomWiggle faz isso melhor que
  `back.out`. Encaixe perfeito no vocabulário de adesivo.
- **ScrambleTextPlugin** — embaralha caracteres até formar o texto final.
  Combina com stencil/pichação. Candidato ao **marquee** (§3.9) ou aos
  stickers. Usar com parcimônia: é chamativo e envelhece rápido.

**Registrados mas fora de escopo agora:** `Draggable` + `InertiaPlugin`
(fariam sentido numa galeria arrastável — mas a galeria está travada por
I1/I2), `MotionPathPlugin`, `Physics2DPlugin`, `Observer`, `GSDevTools`
(ferramenta de dev, nunca vai a produção).

## 4. Guardrails obrigatórios

Herdados do §6.2 e §6.4, **todos continuam valendo integralmente** — a
emenda proposta (D23) amplia a lista de plugins permitidos, **não afrouxa
nenhum guardrail**:

1. **`prefers-reduced-motion`** via `gsap.matchMedia()`, com versão estática
   equivalente — tudo visível, legível, no lugar final. Já é o
   comportamento de `lib/motion.ts`; todo plugin novo passa pelo mesmo
   caminho. **Atenção especial:** SplitText precisa que o texto continue
   legível e selecionável na versão estática, e ScrollSmoother precisa ser
   **completamente desligado** (scroll suavizado é justamente o tipo de
   coisa que causa desconforto vestibular).
2. **Só `transform`, `opacity`, `clip-path` e propriedades de SVG stroke.**
   Nunca `width`/`height`/`top`. Zero layout shift causado por animação.
3. **Lazy-init depois da hidratação**, via `useMotion` (`lib/motion.ts`).
   Todo plugin novo entra pelo **mesmo import dinâmico** — nunca no bundle
   inicial. **A exceção problemática é o ScrollSmoother** (§3.2).
4. **Orçamento do §6.4 vale integralmente:** JS inicial ≤ 220KB gzip,
   Lighthouse mobile Performance ≥ 90, A11y ≥ 95, CLS < 0,1, LCP < 2,5s.
   Como os plugins entram no chunk lazy, o bundle **inicial** não cresce —
   mas o chunk de motion cresce, e ele compete por CPU no mesmo celular
   mediano. **Medir, não presumir.**
5. **Teste em celular mediano real antes do merge** (§6.2 nº 5). Vale em
   dobro aqui: SplitText cria muitos nós no DOM, ScrollSmoother roda a cada
   frame.
6. **Sem `pin`, sem `scrub` pesado** (§6.2 nº 4) — continua valendo.
7. **Nada de WebGL/shader de carona.** O §6.3 registra OGL como candidato
   que exige decisão à parte. Este documento não o inclui.
8. **Acessibilidade não regride.** Todo texto animado continua legível por
   leitor de tela, selecionável e com contraste AA. Se um efeito só funciona
   quebrando isso, o efeito não entra.

## 5. Ordem sugerida de implementação

Do menor risco/maior retorno para o maior risco. Cada item = sub-etapa com
spec própria → plano → PR, no fluxo padrão do projeto.

| # | Item | Por que nesta posição | Risco |
|---|---|---|---|
| 0 | **Registrar D23** em `02-DECISOES.md` (emenda ao §6.2) | Nenhum código antes disso — `AGENT.md` | — |
| 1 | **CustomEase** — ease própria do projeto | Identidade de marca, custo zero, não muda DOM | Mínimo |
| 2 | **DrawSVG** nos rabiscos + substituir o cálculo manual do hero | Remove código nosso, encaixa no §3.9 | Baixo |
| 3 | **CustomWiggle** na carimbada do sticker | Melhora um gesto que já existe | Baixo |
| 4 | **SplitText** no `SectionHeader` h2 + lead | Maior impacto visual; exige cuidado com fonte e a11y | Médio |
| 5 | **Flip** no overlay do menu mobile | Toca o componente de navegação; precisa de QA em celular | Médio |
| 6 | **MorphSVG** (chevron do FAQ e/ou rasgo) | Ganho estético menor; verificar caixa do rasgo | Médio |
| 7 | **ScrambleText** (marquee ou sticker) | Chamativo, envelhece rápido — avaliar se combina | Médio |
| 8 | **ScrollSmoother** | Conflito estrutural com o header sticky (§3.2) | **Alto** |

Itens 1–3 podem ir num PR só (são pequenos e do mesmo domínio: easing e
SVG). Itens 4, 5 e 8 merecem PR próprio cada.

## 6. Decisões que faltam (não assumir)

1. **ScrollSmoother: (a) header fora do wrapper, (b) header `fixed`, ou (c)
   não usar?** É a única decisão que muda a estrutura do site. Minha
   recomendação é **(c) por ora**, reavaliando depois que 1–7 estiverem no ar.
2. **SplitText no `h2`: substitui o "stencil puxado" da V1.6 ou soma a ele?**
   Somar os dois pode ficar carregado.
3. **Grão animado entra?** Filtro SVG animado é caro; §6.4 manda medir.
4. **A emenda ao §6.2 é ampla ("todos os plugins do pacote liberados") ou
   restrita à lista aprovada aqui?** Recomendo restrita — o guardrail do §6.2
   existe justamente para o escopo não crescer sozinho.

## 7. Fora de escopo deste documento

- Qualquer código. Este doc é planejamento; implementação vem depois de
  aprovado, com spec própria por sub-etapa.
- WebGL/shader (§6.3 — decisão à parte).
- Animar o `<details>` do FAQ (§3.6-bis proíbe por design).
- Criar interação nova só para justificar plugin (ex.: expandir card de
  categoria) — seria escopo inventado, contra a disciplina do `AGENT.md`.
