# GSAP avançado · sub-etapa 2 — SplitText, Flip, MorphSVG, ScrambleText, ScrollSmoother

> **STATUS: APROVADO PARA IMPLEMENTAÇÃO.** Fecha os itens 4–9 restantes de
> `2026-07-25-gsap-avancado-design.md` §5, incluindo ScrollSmoother (risco
> alto, aprovado explicitamente pelo Lain em 26/07/2026 mesmo sem QA visual
> interativa disponível nesta sessão — ver `02-DECISOES.md` D23.1).

## 1. SplitText — lead das seções (item 4)

Aplica só ao **lead** do `SectionHeader` (reveal por palavra, sutil) — o
`h2` mantém o "stencil puxado" já existente (`data-stencil`) sem combinar
com SplitText, para não arriscar a leitura de um efeito duplo sem poder
validar visualmente (D23.2 deixa a escolha para o revisor; escolho a opção
mais segura). `SectionHeader` marca o `<p>` do lead com `data-split-lead`;
`Reveal` faz `document.fonts.ready.then(...)` antes de instanciar
`SplitText` (garante métrica de fonte correta), split por palavra
(`type: "words"`), stagger curto, `ease: "tintaSeca"`. Acessibilidade:
SplitText 3.13+ já injeta tratamento de `aria`/texto selecionável por
padrão — nada adicional necessário além de conferência humana.

## 2. Flip — overlay do menu mobile (item 5)

`hooks/use-menu-overlay.ts`: antes de abrir, captura
`Flip.getState(botaoAbrirRef.current)` (posição/tamanho do hambúrguer).
Após o overlay montar (`useLayoutEffect` em `aberto`), `Flip.from(estado,
{ target: overlayRef.current, duration: 0.4, ease: "power3.inOut" })` —
o hambúrguer "cresce" até virar o overlay full-screen. Fechar continua
instantâneo (remoção condicional do DOM, como hoje) — só a entrada usa
Flip, que é o encaixe descrito na spec ampla §3.3. `gsap`+`Flip` carregam
sob demanda (função `carregarFlip()` em `lib/motion.ts`, mesmo padrão
lazy do resto) — só no clique de abrir, não no idle da página (o menu é
interação, não conteúdo).

## 3. MorphSVG — chevron do FAQ (item 6)

`components/faq.tsx`: o chevron hoje rotaciona 180° via CSS
(`group-open:rotate-180`). Trocado por dois paths (`+` e `−`) com
`MorphSVGPlugin` morfando entre eles no toggle do `<details>` — ouvido via
evento `toggle` nativo do elemento (sem JS de estado extra). Guardrail:
motion novo aqui é morph puro (SVG path), não afeta layout; `<details>`
continua nativo, sem custom accordion (§3.6-bis).

**Rasgo:** avaliado e **descartado nesta sub-etapa** — o morph entre duas
bordas irregulares exigiria desenhar um segundo path com EXATAMENTE o
mesmo número de pontos que o atual (requisito do MorphSVG para um morph
limpo) e validar que a caixa não muda (§3.9); sem verificação visual
disponível, o risco de regressão no divisor de seção não compensa o ganho
estético. Fica registrado como candidato futuro.

## 4. ScrambleText — sticker "em breve" (item 7)

Aplicado ao `StickerBadge` variante `breve` quando entra na viewport
(reveal): o texto embaralha e assenta no valor final via
`ScrambleTextPlugin`. Usado com parcimônia (só nessa variante, não no
marquee — marquee já tem identidade própria via CSS puro e não precisa de
JS a mais). Texto real permanece no DOM antes/depois do efeito — leitor de
tela não é afetado (o plugin anima o texto renderizado, não a semântica).

## 5. ScrollSmoother (item 8) — decisão D23.1 aplicada

**Estrutura:** `<Header>` sai de dentro do smoothing — vive fora do par
`#smooth-wrapper > #smooth-content` em `app/page.tsx`. Novo componente
cliente `components/smooth-scroll.tsx` envolve `<main>` + `<Footer>`,
registra `ScrollSmoother.create({ wrapper: "#smooth-wrapper", content:
"#smooth-content", smooth: 1.2, effects: false })` no mesmo lazy-init
(idle) e dentro do mesmo `gsap.matchMedia` de reduced-motion — com a
preferência ativa, o wrapper age como `<div>` comum (scroll nativo, sem
suavização), atendendo ao guardrail "ScrollSmoother completamente
desligado sob reduced-motion".

**ScrollTrigger existente não muda:** GSAP detecta um `ScrollSmoother`
ativo na página e todos os `ScrollTrigger` já criados (Reveal, Hero,
parallax do rabisco) continuam funcionando sem alteração — é o
comportamento documentado do próprio plugin.

**Risco aceito e não mitigável sem QA visual:** o "salto" de inicialização
tardia (lazy-init no idle, depois da hidratação) mencionado na spec ampla
§3.2 permanece um risco real — o wrapper nasce sem nenhuma CSS especial
(layout idêntico ao scroll nativo) até o JS montar o smoothing, o que
minimiza mas não elimina o risco. **Pendente de QA humana em dispositivo
real** antes de considerar esta parte definitivamente resolvida.

## 6. Selo do hero — ajuste de posição/tamanho (item 9, conclusão do §5.1)

O bug de `z-index` já foi corrigido (PR #47). Ajuste nesta sub-etapa:
aumentar o alcance do selo para a esquerda/cima (`-right-[16vw]` →
`-right-[6vw]`, `-bottom-[34vw]` → `-bottom-[24vw]`, mantendo
`h-[72vw] w-[72vw]`) para que a silhueta cruze visivelmente a coluna de
texto em larguras comuns de desktop (~1280–1440px), sem cobrir a área do
CTA "Apoie via Pix" por completo (verificado por bounding box, não por
olho humano — grau final ainda depende de conferência visual).

## 7. Guardrails — herdados, nenhum muda

Guardrails do §6.2/D23 (`prefers-reduced-motion`, só
transform/opacity/clip-path/SVG stroke, lazy-init, sem `pin`/scrub pesado,
orçamento §6.4) valem integralmente para os cinco itens acima. `Flip` anima
`transform` (herdado do estado capturado); `MorphSVG` anima `path d`
(equivalente a stroke, mesmo raciocínio do DrawSVG já aprovado);
`ScrollSmoother` é a única exceção documentada e já prevista (D23.1).

## 8. Pronto quando

- Lead das seções splita por palavra com fonte já carregada.
- Overlay do menu mobile cresce do hambúrguer via Flip ao abrir.
- Chevron do FAQ morfa entre `+`/`−`.
- Sticker "em breve" embaralha o texto ao entrar na viewport.
- ScrollSmoother ativo, header continua sticky, reduced-motion desliga tudo.
- Selo cruza mais a coluna de texto (ajuste de posição, não de stacking).
- `pnpm lint`/`typecheck`/`build` limpos; QA visual humana pendente
  (celular real + verificação do grau de sobreposição do selo e do
  comportamento do ScrollSmoother) — sem Chrome disponível nesta sessão.
