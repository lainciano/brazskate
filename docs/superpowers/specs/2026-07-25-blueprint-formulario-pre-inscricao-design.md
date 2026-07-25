# Blueprint do formulário de pré-inscrição

> **STATUS: APROVADO — aguardando plano de implementação.**
> Aprovado pelo Lain em 25/07/2026. Sub-etapa fora da fila V1.4–V1.7: não é
> código do site, é o documento de handoff que destrava a linha
> "Formulário de pré-inscrição" do estacionamento em `04-ROADMAP-V1.md`.

## Contexto e motivação

A pré-inscrição é o item 4 dos onze de `03-SPEC-SITE.md` §3.2 e está 🟡
parcial há três sub-etapas. O que a travava tinha duas partes:

1. **Bloqueio jurídico** — resolvido: I3 fechou em 25/07/2026 e a V1.4 pôs o
   termo no ar (`/termo`, `data/termo.ts`, PDF).
2. **Bloqueio operacional** — o formulário externo em si não existe. É tarefa
   da ASB (D17), mas ninguém consegue montá-lo com o que está escrito hoje:
   `03-SPEC-SITE.md` §5.2 tem uma tabela de campos e para por aí. Não diz a
   ordem das telas, os textos, como a lógica condicional de menor funciona na
   ferramenta, o que acontece depois do envio, nem como o aceite conversa com
   o termo publicado.

Esta sub-etapa entrega o segundo item: um documento que alguém da ASB lê de
cima a baixo e monta o formulário **sem precisar perguntar nada**. Fecha
também cinco lacunas — duas que os documentos já marcavam como pendentes
(**ferramenta**, em `03-SPEC-SITE.md` §5.2; **fluxo de assinatura do menor**,
em `docs/termo-responsabilidade.md`) e três que só apareceram ao detalhar o
formulário (**coleta de documento**, **idade de referência**, **exclusividade
da categoria feminina**).

Também vale como registro para o próprio mantenedor: se o formulário for
montado daqui a três semanas, as regras não dependem de memória.

## Escopo

**Entra:**

- `docs/blueprint-formulario-pre-inscricao.md` — documento canônico de
  handoff, no padrão de `docs/termo-responsabilidade.md` e
  `docs/estrategia-confirmacao-uiemapv.md` (doc operacional em `docs/`, não
  enterrado em `superpowers/`).
- Registro das decisões novas em `docs/02-DECISOES.md` (**D21** e **D22**).
- Atualização de `docs/04-ROADMAP-V1.md`: linha do estacionamento, item 4 do
  mapa de completude, e `/inscricao` mapeada como sub-etapa futura.

**Não entra:**

- **Nenhum código.** Nem página `/inscricao`, nem embed do Tally, nem religar
  o CTA "Quero competir" do hero. A V1.4 já havia deixado isso fora pelo mesmo
  motivo: dependem de o formulário real existir e ter URL.
- **Criar a conta ou o formulário no Tally** — é execução da ASB (D17), e o
  blueprint existe justamente para viabilizá-la.
- **Definir cota presencial e faixas etárias** — dependem de P6. Aparecem no
  blueprint como pendência marcada, nunca preenchidas por inferência.
- **Alterar o texto do termo** — `data/termo.ts` é fonte única e continua
  intocado; o blueprint apenas o referencia.

## Decisões que esta spec fecha

### D21 · Formulário de pré-inscrição — ferramenta e política

Quatro pontos que estavam em aberto, decididos em conjunto porque se
sustentam mutuamente:

**Ferramenta: Tally.** `03-SPEC-SITE.md` §5.2 dizia "testar os dois e
escolher na implementação". Fechado agora em Tally porque a lógica
condicional que a regra do menor exige (mostrar/exigir um bloco inteiro
conforme uma data) é nativa e confiável no Tally, enquanto no Google Forms
depende de seções encadeadas e de o participante não voltar atrás. A escala
(<40) cabe folgada no free tier de qualquer um dos dois; migrar depois
continua trivial, então a decisão é reversível e não merece mais deliberação.

**Fluxo do menor: preenche sozinho, responsável confirma depois.** O termo
diz "O RESPONSÁVEL LEGAL deve preencher e assinar", mas num formulário online
quem está no teclado é o próprio adolescente. Exigir que o adulto preencha do
começo ao fim criaria fricção real e reduziria inscrições, sem ganho jurídico
proporcional — porque o aceite eletrônico já não é assinatura certificada
(D19). Então: o menor preenche tudo, inclusive nome e WhatsApp do
responsável; o checkbox online vale como **declaração de ciência**; e o
**aceite que vale juridicamente é o papel assinado pelo responsável no
credenciamento** — que D19 já previa. A ASB confirma por WhatsApp com o
responsável antes do evento. O blueprint precisa deixar isso explícito para o
inscrito, não escondido: quem preenche sabe que o responsável ainda vai
assinar no dia.

**Sem CPF/RG online.** O termo em papel tem campo de documento, mas o
formulário online não coleta. Motivo: minimização de dado pessoal numa
planilha compartilhada — parte dela de menores de idade — sem contrapartida.
O documento é conferido presencialmente no credenciamento, e o FAQ publicado
(V1.3) já orienta levar documento no dia.

**Idade de referência: data do evento.** A obrigação legal existe no momento
da participação, não no do preenchimento; quem faz 18 anos entre a inscrição
e o evento entra como maior. Ressalva registrada no blueprint: a data hoje é
**previsão** (`evento.dataPrevista` = 22 de agosto de 2026) — se ela mudar,
casos de fronteira precisam ser reconferidos manualmente. É o único ponto do
formulário que a mudança de P1 afeta.

### D22 · Categoria feminina não é exclusiva

D8 fixou iniciante, amador e feminino, mas nenhum documento dizia se uma
competidora escolhe entre as três ou se vai obrigatoriamente para feminino.
O formulário não tem como não responder isso. Confirmado pelo mantenedor em
25/07/2026: **a competidora escolhe livremente** — feminino é uma categoria
adicional, não uma segregação. O formulário mostra as três opções sem
condicional de gênero (e, portanto, não precisa perguntar gênero).

## Estrutura do blueprint

Organizado como **roteiro de telas**, na ordem em que se constrói no Tally —
não como espelho da planilha nem como tabela de campos expandida. O gargalo é
alguém sentar e montar; o documento acompanha esse trabalho de cima a baixo.
Tabela de campos e mapa da planilha ficam como anexos de consulta.

| § | Seção | Conteúdo |
|---|---|---|
| 0 | Status e travas | Documento vivo; o que P6/P1 ainda bloqueiam; aviso de proveniência do termo |
| 1 | Para quem é / regras inegociáveis | D2, D10, D19, D20 e o anti-escopo do `AGENT.md` |
| 2 | Decisões que o formulário encarna | Tabela curta linkando D1, D2, D8, D10, D19, D20, D21, D22 |
| 3 | Roteiro de telas | 0 abertura → 1 identificação → 2 competição → 3 contato → 4a/4b condicional → 5 divulgação → 6 confirmação |
| 4 | Lógica condicional | Como o Tally deriva "menor" da data de nascimento, escrito de forma que não dê para violar D10 |
| 5 | Tabela de campos | Campo · tipo no Tally · obrigatório · texto de ajuda · coluna na planilha |
| 6 | Textos exatos | Labels, ajudas, erros, checkbox de aceite, mensagem de confirmação — tom do `05-DESIGN.md` §1.5 |
| 7 | Integração com `/termo` | Link + registro de qual `versaoTexto` foi aceita |
| 8 | Pós-envio | Mensagem automática, colunas da planilha, quem acompanha, confirmação por WhatsApp |
| 9 | Proteção de dados | Finalidade, acesso, retenção, aviso no formulário, o que **não** se coleta |
| 10 | Modelo híbrido | Abertura (previsão 01/08), cota (P6), via papel no credenciamento |
| 11 | Pendências não resolvidas | O que falta, o que trava e quem resolve |
| 12 | Checklist de montagem | Passos verificáveis para quem construir |

### A regra crítica (§4)

`AGENT.md` tem uma regra de negócio marcada como crítica: **a exigência de
autorização segue a data de nascimento, nunca a categoria.** O blueprint tem
que tornar difícil violá-la por acidente. Concretamente:

- O campo de categoria **não** participa da condicional. Nenhuma regra do
  formulário lê categoria para decidir sobre o bloco do responsável.
- A condicional lê **um** campo: data de nascimento.
- D22 reforça: sem condicional de gênero também. A única ramificação do
  formulário inteiro é maior/menor.

### Integração com o termo (§7)

O checkbox de aceite não repete o texto do termo — linka para `/termo`, que
já está no ar (V1.4) e é fonte única. A planilha registra **qual versão** foi
aceita, copiando o valor de `termo.versaoTexto` (formato `DD/MM/AAAA`; hoje
`25/07/2026`). Isso importa porque o próprio `docs/termo-responsabilidade.md`
avisa que a análise jurídica formal segue em curso: se a redação mudar, é
preciso saber quem aceitou qual versão.

### Pendências dentro do blueprint (§11)

Disciplina de placeholder do `AGENT.md` aplicada ao documento: onde falta
dado, o blueprint marca a lacuna em vez de preencher.

| Lacuna | Trava | Quem resolve |
|---|---|---|
| Tamanho da cota presencial | P6 | Regulamento / organização |
| Faixas etárias por categoria | P6 | Regulamento / organização |
| Data oficial (idade de fronteira) | P1 | Reunião com a Administração |
| Conta e URL do formulário | — | ASB (execução) |
| Quem da ASB acessa a planilha | — | ASB (definir antes de abrir) |

## Critério de pronto

- Alguém que nunca leu o repositório consegue montar o formulário no Tally
  lendo só o blueprint, sem perguntar nada — exceto os itens de §11, que estão
  nomeados como pendência.
- A regra de menor por data de nascimento aparece de forma que não dê para
  implementar por categoria sem contrariar o documento explicitamente.
- Nenhum dado de P6 ou P1 aparece preenchido por inferência.
- `02-DECISOES.md` tem D21 e D22; `04-ROADMAP-V1.md` reflete que a linha do
  estacionamento não está mais travada por falta de especificação.
- Nenhum arquivo de código alterado — `data/termo.ts` e `data/evento.ts`
  continuam intocados, apenas referenciados.
