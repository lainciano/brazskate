# Blueprint do formulário de pré-inscrição — Braz Skate

> **STATUS: DOCUMENTO VIVO — pronto para montagem, com pendências marcadas.**
> Handoff operacional: quem for montar o formulário no Tally lê este arquivo
> de cima a baixo e monta, sem precisar perguntar nada — exceto o que a §11
> marca como pendência. Ver a spec de design em
> `docs/superpowers/specs/2026-07-25-blueprint-formulario-pre-inscricao-design.md`
> para o porquê de cada decisão.
>
> Versão: 25/07/2026.

---

## 0. Status e travas

Este documento **não** cria o formulário — isso é execução da ASB (D17). Ele
existe para que essa execução não dependa de perguntar nada a quem escreveu
os documentos do projeto.

O que trava a pré-inscrição em si (não o blueprint):

- **P6** (regulamento — `02-DECISOES.md`): tamanho da cota presencial e
  faixas etárias por categoria. Sem isso, o formulário nasce sem esses dois
  dados — marcados na §11, não inventados.
- **P1**: data oficial do evento. Hoje é **previsão** (`evento.dataPrevista`);
  se mudar, casos de idade na fronteira (§4) precisam ser reconferidos.
- **Proveniência do termo:** `docs/termo-responsabilidade.md` registra que o
  advogado deu OK informal, sem parecer formal fechado. Se a redação mudar,
  `data/termo.ts` muda primeiro — este blueprint só referencia o termo, nunca
  duplica o texto.

Nenhuma dessas travas impede montar o formulário **agora**: elas travam
abrir a inscrição para valer, não a construção.

---

## 1. Para quem é / regras inegociáveis

- **D2** — formulário-serviço externo → planilha. Nenhum backend próprio.
- **D10** — a exigência de autorização do responsável segue a **data de
  nascimento**, nunca a categoria escolhida. Vale para iniciante, amador e
  feminino igualmente.
- **D19** — o aceite é por **checkbox eletrônico**, não assinatura
  certificada. O papel do credenciamento é quem carrega o aceite que vale
  juridicamente para menores (ver §7).
- **D20** — o evento é exclusivamente de skate. Nenhum campo ou texto deste
  formulário cita patins, bicicleta, patinete ou outro equipamento não-skate.
- **Anti-escopo do `AGENT.md`** — sem login, sem conta de usuário, sem
  pagamento (não há taxa de inscrição).

---

## 2. Decisões que este formulário encarna

| Decisão | O que fixa | Onde aparece no formulário |
|---|---|---|
| D1 | Modelo híbrido: pré-inscrição online + cota presencial | §10 |
| D2 | Tally, formulário-serviço → planilha, sem backend | §3 inteiro |
| D8 | Categorias: iniciante, amador, feminino | §5 (campo Categoria) |
| D10 | Autorização de menor segue a idade, nunca a categoria | §4 |
| D19 | Aceite eletrônico por checkbox; papel no credenciamento | §7 |
| D20 | Só equipamento de skate | §6 (textos) |
| D21 | Tally fechado; menor preenche sozinho; sem CPF/RG online; idade na data do evento | §3, §4, §5 |
| D22 | Categoria feminina não é exclusiva — competidora escolhe livremente | §5 (campo Categoria) |

---

## 3. Roteiro de telas

Ordem de montagem no Tally, uma tela por bloco lógico (o Tally quebra em
telas automaticamente por pergunta ou grupo — a divisão abaixo é lógica, não
uma exigência de uma pergunta por tela).

**Tela 0 — Abertura**
Título do formulário + 2–3 frases de contexto (o evento, data prevista, que
é pré-inscrição gratuita). Sem campo, só o botão de começar.

**Tela 1 — Identificação**
Nome completo · Apelido/nome de pista · Data de nascimento.

**Tela 2 — Competição**
Categoria (iniciante / amador / feminino — múltipla escolha, uma opção).

**Tela 3 — Contato**
Cidade/RA · WhatsApp · Instagram (opcional).

**Tela 4 — Condicional (a lógica central, ver §4)**
- **4a** se maior de idade na data do evento: pula direto para a Tela 5.
- **4b** se menor de idade na data do evento: Nome do responsável legal ·
  WhatsApp do responsável · texto de aviso (ver §6) explicando que o
  responsável assina no papel no credenciamento.

**Tela 5 — Termo e divulgação**
Checkbox de aceite do termo (link para `/termo`, ver §7) · "Como ficou
sabendo" (opcional, seleção).

**Tela 6 — Confirmação**
Mensagem de envio (ver §8).

---

## 4. Lógica condicional

A regra crítica do `AGENT.md`: **a condicional lê um único campo — a data de
nascimento.** Nenhuma outra pergunta participa dela.

```
idade_na_data_do_evento = evento.dataPrevista − data_de_nascimento

se idade_na_data_do_evento >= 18:
    pula Tela 4b, segue maior
senão:
    exige Tela 4b (bloco do responsável), segue menor
```

- **Categoria não entra na condicional.** Uma competidora de 16 anos em
  "feminino" e um competidor de 16 anos em "amador" passam pela mesma regra
  de menor — porque D10 é sobre idade, não sobre categoria.
- **Gênero não entra na condicional.** D22 fecha isso: feminino é uma
  categoria que qualquer competidora escolhe, não uma ramificação do
  formulário.
- **Referência de idade é a data do evento** (`evento.dataPrevista`), não a
  data de preenchimento — decisão D21. No Tally, isso significa configurar a
  lógica com a data do evento como constante na fórmula da condicional, e
  **atualizar essa constante manualmente** se `data/evento.ts` mudar (P1).
  Quem monta o formulário precisa saber que essa constante existe e onde
  revisá-la — não é algo que o Tally sincroniza sozinho com o site.
- **Implementação no Tally:** campo de data de nascimento com lógica de
  branch (o Tally chama de "Logic Jump" / condicional por resposta); a
  condição compara a data informada contra a constante de corte e direciona
  para a Tela 4b ou pula direto para a Tela 5.

**Corte de idade da categoria Iniciante (D26, 30/07/2026):** iniciante é só
até 25 anos na data do evento — regra nova, independente da condicional de
menor/maior de idade acima. Implementação sugerida no Tally: lógica
condicional própria (mesma constante de corte de data do evento) que oculta
ou desabilita a opção "Iniciante" no campo Categoria (Tela 2) quando a idade
calculada pela data de nascimento (Tela 1) for maior que 25. Amador e
Feminino não têm corte de idade.

---

## 5. Tabela de campos

| Campo | Tipo no Tally | Obrigatório | Texto de ajuda | Coluna na planilha |
|---|---|---|---|---|
| Nome completo | Texto curto | Sim | — | `nome_completo` |
| Apelido/nome de pista | Texto curto | Não | "Para locução e resultados, se tiver um" | `apelido` |
| Data de nascimento | Data | Sim | — | `data_nascimento` |
| Categoria | Múltipla escolha (1) | Sim | Iniciante / Amador / Feminino | `categoria` |
| Cidade/RA | Texto curto | Sim | "De onde você vem — ajuda a mostrar o alcance do evento" | `cidade_ra` |
| WhatsApp | Telefone | Sim | "Canal principal de confirmação e avisos" | `whatsapp` |
| Instagram | Texto curto | Não | "@ do seu perfil, se quiser" | `instagram` |
| Tamanho de camiseta | Múltipla escolha (1) | Sim | PP / P / M / G / GG / XG | `tamanho_camiseta` |
| Nome do responsável legal | Texto curto | Sim, se menor (Tela 4b) | — | `responsavel_nome` |
| WhatsApp do responsável | Telefone | Sim, se menor (Tela 4b) | "A ASB vai confirmar por aqui antes do evento" | `responsavel_whatsapp` |
| Aceite do termo | Checkbox | Sim (todos) | Ver texto exato em §6 | `aceite_termo` + `versao_termo` |
| Como ficou sabendo | Múltipla escolha (1) | Não | Instagram / indicação / no local / outro | `canal_divulgacao` |

**Não coletar:** CPF/RG (decisão D21 — fica só no papel do credenciamento),
gênero como campo isolado (D22 — a categoria já é a escolha da competidora).

---

## 6. Textos exatos

Tom institucional/celebratório (`05-DESIGN.md` §1.5) — direto, sem jargão,
acolhedor com quem nunca competiu.

**Título do formulário:**
> Pré-inscrição — Braz Skate

**Abertura (Tela 0):**
> Preencha em menos de 3 minutos. Sua vaga fica garantida assim que você
> enviar — a inscrição é só online, até 30 de agosto de 2026. Não há
> inscrição presencial no dia do evento.
>
> (Texto revisado em 07/08/2026, D42 — cota presencial descontinuada, prazo
> final adicionado. Requer atualização manual na Tela 0 do Tally, fora deste
> repositório.)

**Aviso no bloco do responsável (Tela 4b), acima dos campos:**
> Você tem menos de 18 anos, então precisamos do nome e WhatsApp do seu
> responsável legal. Essa pré-inscrição não substitui a autorização — seu
> responsável vai assinar o termo em papel no credenciamento, no dia do
> evento.

**Checkbox de aceite (Tela 5):**
> Li o [termo de responsabilidade](/termo) do Braz Skate e estou ciente das
> suas condições.

(O link aponta para a rota `/termo` publicada — não para um texto embutido no
formulário. Ver §7.)

**Mensagem de confirmação (Tela 6):**
> Pré-inscrição recebida! A organização confirma sua vaga por WhatsApp mais
> perto da data. Guarde o link do termo — ele também sai em PDF, se quiser
> imprimir.

**Erro genérico de campo obrigatório (padrão do Tally, não customizar):**
Manter o padrão nativo do Tally — não vale a pena reescrever mensagens de
validação de campo.

---

## 7. Integração com `/termo`

- O checkbox de aceite (§6) linka para a rota **`/termo`**, já publicada
  (V1.4) — nunca duplicar o texto das cláusulas dentro do Tally. Fonte única
  continua sendo `data/termo.ts`.
- A planilha registra, junto com `aceite_termo` (booleano), a coluna
  `versao_termo` com o valor de `termo.versaoTexto` no momento em que o
  formulário for aberto — hoje `"25/07/2026"`. Isso é um valor fixo digitado
  na configuração do Tally (campo oculto ou texto informativo), não uma
  leitura automática do site.
- **Por que isso importa:** o próprio `docs/termo-responsabilidade.md` avisa
  que a análise jurídica formal segue em curso. Se a redação mudar depois que
  o formulário já estiver recebendo respostas, `versao_termo` é o que permite
  saber quem aceitou qual texto.
- **Quando `data/termo.ts` mudar `versaoTexto`:** quem administra o Tally
  precisa atualizar esse valor fixo na configuração do formulário. Não há
  sincronização automática — é um passo manual a lembrar.

---

## 8. Pós-envio

- **Mensagem automática:** o texto de confirmação nativo do Tally (§6, Tela
  6) já cobre isso — nenhuma integração de e-mail/SMS adicional.
- **Planilha de saída:** uma linha por resposta, colunas na ordem da §5 mais
  `aceite_termo`, `versao_termo` e timestamp (nativo do Tally). Formato de
  data de nascimento e timestamp: o padrão de exportação do Tally
  (ISO 8601), não reformatar manualmente.
- **Quem acompanha:** a ASB confirma cada inscrição por WhatsApp perto da
  data do evento (manual — a escala esperada, <40 competidores, torna isso
  trivial). Quem exatamente na ASB acompanha a planilha é uma pendência
  (§11).
- **Contato de suporte no formulário** (rodapé ou tela de erro, se o Tally
  permitir): WhatsApp `61 99509-9761` ou e-mail
  `associacaoskatebrazlandia@gmail.com` (fonte: `docs/contatos.md`).

---

## 9. Proteção de dados

- **Finalidade:** os dados coletados servem exclusivamente para organizar o
  campeonato — confirmar inscrição, montar baterias por categoria, contatar
  responsáveis de menores. Nenhum uso comercial ou de terceiros.
- **O que não se coleta** (minimização, decisão D21): CPF/RG, gênero como
  campo isolado, qualquer dado de saúde. Documento é conferido só
  presencialmente.
- **Quem acessa a planilha:** pendência (§11) — a ASB precisa nomear quem
  tem acesso antes de abrir o formulário. Recomendação: não mais que 2–3
  pessoas, o mesmo grupo que confirma por WhatsApp.
- **Retenção:** pendência (§11) — sugestão a decidir com a ASB: manter a
  planilha até o encerramento do evento + um período curto de prestação de
  contas, depois arquivar fora de acesso público.
- **Aviso no formulário:** incluir uma linha curta na Tela 0 ou no rodapé:
  "Seus dados são usados só para organizar o campeonato e não são
  compartilhados com terceiros."

---

## 10. Inscrição só online (revisado 07/08/2026, D42)

- **Aberta desde 31/07/2026** (D29/D32), **fecha em 30 de agosto de 2026**
  (`evento.dataFechamentoInscricoes*`) — sem exceção, sem inscrição
  presencial no credenciamento.
- **Cota presencial descontinuada:** o modelo híbrido de D1 e o limite de 60
  competidores de D26 não valem mais — quem não se inscrever online até o
  prazo não compete. Ver texto atualizado na §6.
- **Requer atualização manual no Tally** (fora deste repositório): configurar
  o fechamento automático em 30/08/2026, ou pelo menos remover a resposta
  depois dessa data manualmente.
- **Pendente (I9, `02-DECISOES.md`):** campo de tamanho de camiseta no
  formulário — este ambiente não tem credencial de API do Tally configurada
  para adicionar via automação.

---

## 11. Pendências não resolvidas

| # | Pendência | Trava | Quem resolve |
|---|---|---|---|
| 1 | ~~Tamanho da cota presencial~~ — **resolvida (D26)**: até 60 competidores | — | — |
| 2 | ~~Faixas etárias por categoria~~ — **resolvida (D26)**: iniciante até 25 anos; amador e feminino sem limite | — | — |
| 3 | ~~Data oficial~~ — **resolvida (D24)**: 12 de setembro de 2026, confirmada. Constante de corte de idade em §4 usa essa data | — | — |
| 4 | Criar a conta Tally e montar o formulário de fato | — | Em andamento via API do Tally |
| 5 | Quem da ASB acessa a planilha de respostas | — | ASB, antes de abrir o formulário |
| 6 | Política de retenção de dados definitiva | — | ASB, ver sugestão em §9 |
| 7 | **Data revisada para 13 de setembro (D34, 06/08/2026)** — a constante de corte de idade do formulário (mencionada acima) foi configurada com base em 12 de setembro. Precisa de **atualização manual na configuração do Tally** (fora deste repositório) para refletir a nova data | Formulário já está no ar recebendo respostas | Quem administra a conta Tally |
| 8 | **Inscrição virou só-online, fecha 30/08/2026 (D42, 07/08/2026)** — cota presencial descontinuada. Precisa de fechamento manual (ou configurado) do Tally na data limite | Formulário já está no ar recebendo respostas com a regra antiga (cota presencial) | Quem administra a conta Tally |
| 9 | ~~Campo de tamanho de camiseta~~ — **resolvida (I9, D44, 07/08/2026)**: adicionado via API do Tally (múltipla escolha, PP/P/M/G/GG/XG, obrigatório), publicado direto no formulário ao vivo | — | — |

---

## 12. Checklist de montagem

Para quem for construir no Tally, nesta ordem:

- [ ] Criar formulário no Tally com as 7 telas da §3, na ordem descrita.
- [ ] Configurar os campos da §5 com tipo, obrigatoriedade e texto de ajuda
      exatos.
- [ ] Configurar a lógica condicional da §4 — conferir que ela lê **só** a
      data de nascimento, comparada contra a constante de corte (data do
      evento).
- [ ] Colar os textos exatos da §6 (título, abertura, aviso do responsável,
      checkbox, confirmação).
- [ ] Linkar o checkbox de aceite para `/termo` (§7) e configurar o campo
      fixo `versao_termo` com o valor atual de `termo.versaoTexto`.
- [ ] Conferir que a planilha de saída tem as colunas da §5 + `aceite_termo`
      + `versao_termo`.
- [ ] Resolver as pendências 4–6 da §11 (conta, acesso, retenção) antes de
      publicar a URL em qualquer lugar.
- [ ] **Não publicar** a URL do formulário nem religar o CTA "Quero
      competir" do site até P6 dar as pendências 1–2 (ou até decidir
      publicar mesmo com "cota a confirmar" como texto — decisão a tomar
      com o mantenedor do site, não a inferir aqui).
