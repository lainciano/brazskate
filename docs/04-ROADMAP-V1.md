# Braz Skate — Roadmap do V1

> **STATUS: APROVADO COMO DECOMPOSIÇÃO — refinável a cada sub-etapa.**
> Estratégia e decomposição aprovadas pelo Lain em 24/07/2026 (brainstorming),
> após a publicação do MVP e a spec da primeira sub-etapa de info básica.
> Este documento sequencia o V1; cada sub-etapa ganha sua própria spec →
> plano → PR quando for implementada.
> Última atualização: 24/07/2026.

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

- **Estado:** construível. Nasce de um ajuste pedido pelo Lain em
  24/07/2026.
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

- **Estado:** parcialmente construível. Só as perguntas com **resposta
  certa hoje** entram; as que dependem do regulamento (P6) ficam de fora ou
  marcadas "em breve" — nunca resposta inventada.
- **Entrega:** seção de FAQ (padrão de disclosure a definir na spec da
  sub-etapa), conteúdo em fonte única (`data/faq.ts` ou MDX em `content/`).
  Perguntas com resposta hoje: taxa (não tem), categorias
  (iniciante/amador/feminino), o que levar, acompanhantes/público.
  Perguntas que aguardam regulamento (faixas etárias, tamanho da cota
  presencial, política de chuva/adiamento): **fora** desta leva.
- **Consome do design:** §3.3 (SectionHeader), §3.6 (sticker "em breve"),
  §1.5 (tom), §6.1 (motion de entrada via `Reveal`), §2 (tokens).
- **Pronto quando:** FAQ lê bem no celular; nenhuma resposta pendente
  aparece inventada; acrescentar/editar pergunta é mexer só na fonte de
  dados.

---

## Estacionamento — sub-etapas travadas (mapeadas, não agendadas)

Documentadas para não se perderem. Cada uma sai do estacionamento quando a
pendência que a trava for resolvida (códigos P/I de `02-DECISOES.md`).

| Sub-etapa | Destrava com | Observação |
|---|---|---|
| Countdown para a data | **P1** — data travar oficialmente | Por ora, previsão em texto (V1.1). Countdown lê de `data/evento.ts`. |
| Regulamento completo (página) | **P6** — regulamento/faixas etárias/pontuação | Página nasce só quando houver texto real; sem casca. |
| Pré-inscrição real (formulário + termo) | **I3** (texto jurídico) + **P6** (cota presencial) | Formulário externo (Tally/Forms) com condicional de menor por data de nascimento (`AGENT.md`). |
| Termo de responsabilidade + autorização de menor | **I3** — validação jurídica | Insumo da pré-inscrição; mesmo texto para o papel no dia. |
| Programação do dia | **P6** + logística do evento | Horários de baterias/credenciamento/final. |
| Patrocinadores confirmados (grade de logos) | Patrocinador fechado + **I7** (confirmação UIEMAPV) | `data/sponsors.json`; site não menciona UIEMAPV até o ok do instituto. |
| Galeria (2021 + pista atual) | **I1** / **I2** + **permissão de imagem** | Cada foto com `credito` e `permissao`; portão de direito de imagem. |
| Foto real no hero | Foto final + **permissão de imagem** | Slot `fotoSrc` já existe (`05-DESIGN.md` §4.2); troca é 1 arquivo + 1 prop quando destravar. |
| Avisos/atualizações (lista MDX) | Ter aviso real para publicar | Infra é trivial; sem conteúdo, não construir casca. |
| Motion/efeitos — reforço no site inteiro | Spec própria de motion (brainstorming) | Pedido do Lain em 24/07/2026. V1.1 aplicou um recorte pontual só onde já tocava (hero, Localização — `05-DESIGN.md` §6.1); o resto das seções existentes (Sobre, Categorias, Patrocínio etc.) fica para uma spec dedicada, respeitando os guardrails de §6.2 e o orçamento de §6.4. |
| Recursos "gameficados" / interatividade | Spec própria (brainstorming) | Pedido do Lain em 24/07/2026. Sem escopo definido — precisa de brainstorming + spec antes de virar plano; avaliar contra o anti-escopo de `AGENT.md` (ex.: nada que implique conta de usuário/login/backend, hoje fora de escopo do site). |
| Imprensa/contato ampliado | Assessoria/canais adicionais | E-mail já entra na V1.1; resto quando houver. |
| Estratégia de divulgação | Spec própria (brainstorming) | Responsabilidade da ASB (ver D16, `02-DECISOES.md`), pedido do Lain em 24/07/2026 — "preciso de ajuda para pensar isso do zero" (canais, formato, timing). Sem escopo definido; precisa de brainstorming antes de virar plano. |

---

## Ordem sugerida e o que vem depois

1. **V1.1 · Info básica** — já tem spec; é a próxima a implementar (basta
   ir do brainstorming aprovado para o plano). Mergear a branch da spec em
   `dev` faz parte.
2. **V1.2 · Polish do hero** — pequena, independente; pode vir junto ou logo
   após a V1.1.
3. **V1.3 · FAQ parcial** — depois das duas acima.

Assim que a reunião com a Administração acontecer (data + regulamento), o
estacionamento começa a destravar — provavelmente na ordem: **regulamento
→ countdown → pré-inscrição/termo → programação**. Conteúdo de terceiros
(fotos, patrocinadores) entra quando existir, independente da reunião.

## Pendências que este roadmap observa

Fonte da verdade é `02-DECISOES.md`. Resumo do que mais pesa no V1:

- **P1** data · **P6** regulamento/cota — destravam o grosso do V1.
- **I1** fotos 2021 · **I2** foto da pista · **I3** termo jurídico ·
  **I7** confirmação UIEMAPV — cada um trava uma sub-etapa específica acima.
- Datas e fotos atuais são **provisórias** por decisão do Lain (24/07/2026)
  — o site as trata como tal (fonte única + placeholder), nunca como
  definitivas.
