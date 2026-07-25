# Rascunho: Termo de Responsabilidade e Autorização — Braz Skate

> **STATUS: I3 RESOLVIDA — VALIDAÇÃO JURÍDICA CONFIRMADA (25/07/2026).**
> O mantenedor confirmou que o termo foi **revisado com advogado**. Ver **D19**
> em `02-DECISOES.md` para a política de aceite.
>
> ⚠️ **PENDÊNCIA DE PROVENIÊNCIA DO TEXTO — LER ANTES DE PUBLICAR.**
> O texto abaixo é o que foi **redigido neste repositório** em 25/07/2026 e
> levado à revisão. Se o advogado alterou qualquer redação, **este arquivo
> ainda não reflete essas alterações** — quem tem o retorno da revisão deve
> substituir as cláusulas por elas antes de qualquer publicação. Não tratar
> este texto como "o que o advogado aprovou" sem essa conferência.
>
> **Escopo de equipamento (D20):** o evento é **exclusivamente de skate**.
> Nenhuma cláusula deve citar patins, bicicleta, patinete ou outro
> equipamento não-skate.
>
> Versão do texto: 25/07/2026.

---

## Contexto e uso

- **D10** (`02-DECISOES.md`): Menores em **qualquer categoria** precisam de autorização
  do responsável legal — obrigação legal segue a data de nascimento, não a categoria.
- **D1**: Pré-inscrição online + coleta no dia (cota presencial).
- **I3**: Este termo deve funcionar em dois contextos:
  1. **Formulário online** (Tally/Google Forms) — maior de idade assina digitalmente ou responsável assina por menor.
  2. **Papel no dia** — mesmo texto para quem se inscreve presencialmente ou complementa inscrição.

---

## Versão proposta

### Cabeçalho

```
BRAZ SKATE
Campeonato de Skate — Brazlândia
Data: [CONFORME data/evento.ts]
Local: [CONFORME data/evento.ts]

TERMO DE RESPONSABILIDADE E AUTORIZAÇÃO
```

### Para maior de idade (18+)

```
Eu, _____________________________, CPF/RG _________________, 
maior de idade e responsável pelas minhas ações, concordo em participar 
do campeonato Braz Skate nas seguintes condições:

1. RECONHECIMENTO DE RISCO
   Skate é um esporte que envolve risco de queda e lesão.
   Eu reconheço esse risco e assumo a responsabilidade integral 
   pelas consequências de minha participação, inclusive lesões.

2. RESPONSABILIDADE E ISENÇÃO
   A ASB — Associação Skate Brazlândia, a Administração Regional,
   o instituto UIEMAPV e os patrocinadores do evento não se 
   responsabilizam por:
   - Lesões, acidentes ou danos pessoais durante a prova ou antes/depois dela.
   - Perda, roubo ou dano a equipamentos pessoais (skate, segurança, pertences).
   - Danos causados a terceiros ou propriedade durante a prova.

3. SAÚDE E CONDIÇÕES FÍSICAS
   Eu atesto que estou em bom estado de saúde física e mental, 
   apto a participar de uma atividade esportiva que envolve risco.
   Qualquer condição médica relevante foi comunicada à organização.

4. EQUIPAMENTO DE SEGURANÇA
   Concordo em usar capacete, proteção de pulso/cotovelo/joelho 
   conforme exigido pelo regulamento do evento.

5. IMAGEM E DOCUMENTAÇÃO
   Autorizo a captura, uso e publicação de fotos e vídeos meus 
   durante o evento para fins de documentação, redes sociais e site 
   do campeonato.

6. CONSENTIMENTO
   Estou assinando este termo de livre e espontânea vontade, 
   sem coação, e declaro que li e compreendi todas as cláusulas acima.

_____________________________
Assinatura do participante

_____________________________
Data
```

### Para menor de idade (até 17 anos)

```
O RESPONSÁVEL LEGAL deve preencher e assinar esta autorização.

AUTORIZAÇÃO DO RESPONSÁVEL LEGAL PARA PARTICIPAÇÃO DE MENOR

Eu, _____________________________, CPF/RG _________________, 
responsável legal por _____________________________ 
(nome do menor, nascido em ___/___/_____, idade ___ anos),
autorizo a participação do menor no campeonato Braz Skate.

1. RECONHECIMENTO DE RISCO
   Eu reconheço que skate é um esporte que envolve risco de queda e lesão.
   Autorizo o menor a participar ciente desse risco.

2. RESPONSABILIDADE
   Eu, como responsável legal, assumo a responsabilidade integral por:
   - Quaisquer lesões ou acidentes do menor durante o evento.
   - Danos causados pelo menor a terceiros ou propriedade.
   A ASB, a Administração Regional, o instituto UIEMAPV e patrocinadores 
   não se responsabilizam pelos itens acima.

3. SAÚDE DO MENOR
   Atesto que o menor está em bom estado de saúde física e mental, 
   apto a participar de uma atividade esportiva que envolve risco.
   Qualquer condição médica relevante foi comunicada à organização.

4. EQUIPAMENTO DE SEGURANÇA
   Autorizo o menor a participar usando capacete, proteção de 
   pulso/cotovelo/joelho conforme exigido pelo regulamento.

5. IMAGEM E DOCUMENTAÇÃO
   Autorizo a captura, uso e publicação de fotos e vídeos do menor 
   durante o evento para fins de documentação, redes sociais e site 
   do campeonato.

6. CONSENTIMENTO
   Estou assinando esta autorização de livre e espontânea vontade, 
   sem coação, na qualidade de responsável legal pelo menor. 
   Declaro que li e compreendi todas as cláusulas acima.

_____________________________
Assinatura do responsável legal

_____________________________
Data

_____________________________
Assinatura do menor (presencial)
```

---

## Estrutura no formulário online (Tally/Forms)

**Fluxo condicional proposto:**

1. **Pergunta:** "Qual é a sua data de nascimento?"
2. **Lógica:** 
   - Se idade ≥ 18 → pula para "Você concorda com os termos acima?" (formulário maior de idade)
   - Se idade < 18 → redireciona para "Responsável legal: data de nascimento e CPF?" + "Você autoriza?" (formulário menor)

**No campo de "concordo com os termos":**
- Checkbox obrigatório com texto: "Você leu e concorda com o termo de responsabilidade acima?"
- Na descrição do campo, embutir o texto completo do termo (ou link para `docs/termo-responsabilidade.md` no site)

---

## Pendências de revisão jurídica

- [x] **Consultor jurídico — feito** (25/07/2026, confirmado pelo mantenedor).
      Se houve alteração de redação, incorporar (ver aviso de proveniência no topo).
- [ ] Validação de linguagem (claro e acessível para público leigo, 18+)
- [ ] Verificação de conformidade com leis locais (DF e Administração Regional)
- [ ] Alignement com termo padrão da associação ASB (se houver)
- [ ] Definição: quem assina (participante, responsável, ambos) e em que fase
  - Online (pré-inscrição)?
  - Papel (credenciamento no dia)?
  - Ambas?

---

## Notas e observações

1. **Linguagem simplificada**: O rascunho evita jargão jurídico excessivo para
   ser acessível a skatistas adolescentes e responsáveis sem background jurídico.

2. **Isenção clara**: Deixa explícito quem é responsável por quê (evento vs.
   participante/responsável).

3. **Imagem**: Inclui autorização de uso de imagem porque é fácil capturar fotos
   em um campeonato; recolher autorização depois é impossível.

4. **Contexto dual**: Versões para maior e menor, ambas usando o mesmo espírito
   e acomodando assinatura online (formulário) ou papel (dia do evento).

5. **Dois contextos de assinatura** (não tratados aqui — precisam de decisão):
   - Quem assina no formulário online? (Maior assina; menor + responsável, mas como?)
   - Quem assina no papel no dia?
   - Precisa de assinatura em ambos ou só em um?
   - Quem verifica?

---

## Próximos passos

1. **Conferir a proveniência do texto** — se o advogado alterou redação,
   substituir as cláusulas acima pelas dele (ver aviso no topo).
2. **Fluxo de coleta — decidido (D19):** checkbox de aceite eletrônico no
   formulário externo + papel idêntico no credenciamento presencial. **Não**
   há assinatura certificada (respeita o anti-escopo do `AGENT.md`).
3. **Implementar a V1.4** (`04-ROADMAP-V1.md`): fonte única `data/termo.ts`,
   rota `/termo` e botão de PDF com import dinâmico. A spec da sub-etapa
   precisa fechar como a identidade visual entra no PDF (fonte Anton em
   base64 vs. fontes padrão + cores da marca + logo).
4. **Criar o formulário** no Tally/Forms com condicional de menor **por data
   de nascimento** (nunca por categoria) e embutir/linkar este texto.
5. **Imprimir para o dia do evento** (mesma versão, A4, legível em preto e
   branco).
