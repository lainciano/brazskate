# Info básica v1: data prevista, local e e-mail de contato

> **STATUS: APROVADO — pronto para plano de implementação.**
> Primeira sub-etapa do v1 (ver "Depois do MVP" em `docs/04-ROADMAP-MVP.md`).
> Aprovado pelo Lain em 17/07/2026, via brainstorming.

## Contexto e motivação

Em 17/07/2026 o Lain trouxe informações novas de uma conversa (não reunião
formal) com a Administração Regional e o instituto parceiro (UIEMAPV):

- Divisão de responsabilidades: Administração + instituto ficam com
  estrutura, premiação e afins; a ASB fica com site, artes, divulgação,
  patrocínios e afins.
- Espaço do evento **garantido**, incluindo fechamento de rua — resolve a
  pendência P2 de `docs/02-DECISOES.md`.
- Data prevista do evento: **22 de agosto**. Abertura de inscrição prevista:
  **1º de agosto**. Ambas **as datas provavelmente vão mudar** — não são
  compromisso formal ainda.
- Local: Skate Park Brazlândia (confirmado via link do Google Maps,
  coordenadas -15.6824327, -48.1982567).
- E-mail da associação: `associacaoskatebrazlandia@gmail.com` — já estava
  previsto desde o início em `docs/03-SPEC-SITE.md` §6 (item "Contato +
  redes sociais"), só não existia ainda.

Isso resolve/atualiza pendências de `docs/02-DECISOES.md` (P1 parcial, P2
resolvida) e reverte uma decisão anterior (`05-DESIGN.md` §7: "E-mail de
contato | Só Instagram + WhatsApp").

Esta é a primeira de várias sub-etapas independentes do v1 (as outras —
pré-inscrição real, galeria, FAQ, patrocinadores confirmados — ficam para
specs futuras, listadas em "Fora de escopo" abaixo).

## Escopo

**Entra:**
1. Data e abertura de inscrição previstas, exibidas como previsão (não
   countdown, não compromisso).
2. Seção "onde acontece" com mapa embutido + endereço/nome do local +
   link de fallback.
3. E-mail como terceiro canal de contato (Contato + Footer).
4. Atualização de `docs/02-DECISOES.md`, `docs/05-DESIGN.md` §7 e
   `docs/contatos.md` para refletir o estado real.

**Não entra (specs futuras):**
- Fluxo de pré-inscrição de verdade (escolha Tally/Google Forms + termo de
  responsabilidade I3 + link funcional). I3 continua pendente.
- Countdown numérico regressivo (decisão explícita: previsão textual, sem
  countdown, enquanto a data não travar).
- Galeria (I1), FAQ, patrocinadores confirmados (P4/I7), regulamento
  completo (P6).
- Compra de domínio `.com.br` (D11 — cogitar quando a data travar de vez).
- Página dedicada "data, local e como chegar" do `03-SPEC-SITE.md` §3.2
  (v1 completo) — aqui é só o essencial na home, não a página cheia com
  transporte/estacionamento.

## Fonte de dados: `data/evento.ts`

Mesmo padrão de `data/categories.ts` (D13 — conteúdo centralizado em
`data/`, nunca hardcoded espalhado pelos componentes):

```ts
export const evento = {
  dataPrevista: "22 de agosto de 2026",
  inscricaoAbrePrevista: "1º de agosto de 2026",
  local: {
    nome: "Skate Park Brazlândia",
    coordenadas: { lat: -15.6824327, lng: -48.1982567 },
    mapsUrl: "https://maps.app.goo.gl/NkqhC382eUqRwyYM7",
  },
  email: "associacaoskatebrazlandia@gmail.com",
} as const;
```

A URL de embed do mapa (`https://www.google.com/maps?q=<lat>,<lng>&output=embed`)
é derivada das coordenadas no componente, não fica hardcoded — se o local
mudar, só troca `coordenadas` e `nome`.

Todo texto que menciona a data (sticker do hero, seção de local se citar
"a partir de") lê deste arquivo — trocar a data prevista é editar um
lugar só.

## Mudanças por componente

### `components/hero.tsx`

Dois `StickerBadge` trocam de texto (variantes/estilo visual inalterados):

| Antes | Depois |
|---|---|
| "Data a confirmar" | "Previsão: 22 de agosto" |
| "Pré-inscrição em breve" | "Inscrição: previsão 01/08" |

Textos lidos de `evento.dataPrevista` / `evento.inscricaoAbrePrevista`
(formatados para caber no sticker — ver nota de copy abaixo).

### `components/localizacao.tsx` (novo)

Nova seção, registro concreto, entre `Sobre` e `Categorias` em
`app/page.tsx` — sem nova transição de rasgo (ambas concreto). Segue o
padrão de `Categorias`/`PatrocinioResumo`: `Reveal` + `SectionHeader` +
conteúdo.

Anatomia:
- `SectionHeader` — eyebrow "Onde acontece", título e lead curtos.
- `iframe` do Google Maps: `src` montado a partir de
  `evento.local.coordenadas`, `loading="lazy"`, `title` descritivo
  (obrigatório para leitor de tela), `referrerPolicy="no-referrer-when-downgrade"`,
  sem `sandbox` restritivo (Maps precisa de scripts). Envolto em
  `rounded-card shadow-card` como os cards de Categorias — mesma
  linguagem visual, sem tratamento especial de borda (registro é
  concreto, sem choque claro/escuro como o QR do Pix em fundo asfalto).
- Texto com `evento.local.nome` e frase curta reaproveitando a descrição
  já usada em `Sobre` ("à beira do lago").
- `Botao` secundário "Abrir no Google Maps" → `evento.local.mapsUrl` —
  fallback sempre visível (mesmo princípio do fallback de clipboard em
  `CopiarChave`: o caminho principal nunca é o único).

Sem novo item de nav no header por enquanto (não pedido; seção acessível
por scroll, mesmo tratamento que `Sobre`/`Categorias` antes de ganharem
seus próprios links — se quiser adicionar ao menu depois é mudança
trivial e separada).

### `components/contato.tsx`

Terceiro `Botao` (variante `secundario`, como o do Instagram) com
`href={`mailto:${evento.email}`}`, rótulo "Falar por e-mail" (ou similar
— ajusto no PR se o Lain preferir outro texto).

### `components/footer.tsx`

Novo `<li>` na lista de links de contato, mesmo padrão visual dos
existentes (Instagram, WhatsApp), com `mailto:${evento.email}`.

## Documentação a atualizar

- **`docs/02-DECISOES.md`**:
  - Nova decisão (D15): resumo da conversa com Administração/instituto —
    divisão de responsabilidades, espaço garantido, datas previstas
    sujeitas a mudança.
  - P2 (autorização de espaço/fechamento de rua) move de "Pendências"
    para resolvida (referenciando D15).
  - P1 (data do evento) ganha nota: previsão existe (22/08), mas não
    trava a pendência — countdown/compra de domínio continuam
    aguardando confirmação formal.
- **`docs/05-DESIGN.md`** §7 (tabela de pendências mapeadas): linha
  "E-mail de contato" atualizada (não é mais "só Instagram + WhatsApp").
- **`docs/contatos.md`**: adiciona o e-mail à lista de canais.

## Copy — rascunho para revisão no PR

Os textos exatos dos stickers, do título da seção de local e do rótulo do
botão de e-mail são rascunho e podem ser ajustados no PR sem precisar
voltar ao design — não são decisões arquiteturais, só afinação de tom.

## Verificação

- `pnpm typecheck` / `pnpm lint` / `pnpm build` limpos (mesmo pipeline do
  PR 7).
- Lighthouse mobile: o `iframe` lazy-loaded não deve mexer no LCP da home
  (não está acima da dobra no fluxo atual); confirmar com medição antes/
  depois, mesma metodologia do PR 7 (servidor com compressão + cache,
  não `python -m http.server` cru).
- Acessibilidade manual: `iframe` tem `title`; botão de fallback do mapa
  navegável por teclado; contraste dos novos textos/botões (reaproveitam
  tokens já validados no PR 7, sem cor nova).
- Conferir visualmente o e-mail no Contato/Footer em mobile e desktop.

## Riscos / decisões em aberto

Nenhuma pendente — todas as decisões de design foram fechadas com o Lain
antes desta spec (previsão vs. countdown, apresentação do mapa, e-mail
público, sticker de inscrição com data). Se algo mudar nas datas antes do
PR ser aberto, só editar `data/evento.ts`.
