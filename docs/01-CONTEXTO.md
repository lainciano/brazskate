# Braz Skate — Contexto do Projeto

> **STATUS: DOCUMENTO PRELIMINAR — SUJEITO A REVISÃO.**
> Houve uma **conversa** (não reunião formal) entre ASB, Administração
> Regional e instituto parceiro em 24/07/2026, que garantiu o espaço e
> produziu **datas previstas** — mas **não** um compromisso formal. Data
> oficial, valores/itens de premiação e parte da infraestrutura seguem em
> aberto e podem alterar qualquer ponto deste documento.
> Última atualização: 25/07/2026.

## O que é

O **Braz Skate** é um campeonato de skate comunitário organizado pela
**ASB — Associação Skate Brazlândia**, a ser realizado na pista de skate de
Brazlândia (DF), à beira do lago, no complexo esportivo da cidade.

O evento é inspirado no campeonato realizado em 2021 pelos próprios skatistas
locais, mas em maior escala, com o objetivo de atrair competidores e público
de todo o Distrito Federal e entorno.

## Por que existe

- O skate faz parte da história de Brazlândia desde o início dos anos 2000.
- A comunidade local identifica descaso recorrente com a modalidade
  (iluminação insuficiente na pista, rachaduras, quinas e ferros expostos,
  pinturas com material inadequado), em contraste com o cuidado dado a outros
  esportes da cidade (tênis, futvôlei, futebol).
- O campeonato é uma ação concreta para movimentar a cena, dar visibilidade
  à comunidade e **criar precedente de parceria entre a ASB e a Administração
  Regional** para futuras ações.

## Quem organiza

- **ASB — Associação Skate Brazlândia**: grupo de skatistas locais
  (composição da equipe em formação; será detalhada após reunião presencial).
- Organização núcleo: 3 skatistas + 1 administrador regional apoiador.
- **UIEMAPV** (instituto/ONG parceiro, [@uiemapvsocial](https://www.instagram.com/uiemapvsocial)):
  responsável pela estrutura e premiação do evento. Escopo **comprometido**
  a princípio (D17) — ainda não entregue: **água, tenda, som, fechamento da
  rua, mesa de frios e frutas, premiação, medalhas e troféu**. Parceria
  formalmente confirmada pelo instituto (D18), mas **o site ainda não o
  menciona** — falta o logo e os links oficiais (I7).
- **Administração Regional:** confirmou banheiros e organização da área de
  público, fechando o restante da infraestrutura ao lado do compromisso da
  UIEMAPV (P3 resolvida em 25/07/2026).
- **Divisão de responsabilidades** (D17): a **ASB** fica com regulamento,
  formulário de inscrição, programação do dia, captação de patrocínio e
  divulgação; a UIEMAPV com o escopo de fornecimento acima.
- Não há equipe de TI. O site é mantido por **uma única pessoa**
  (desenvolvedor full stack: Java/Spring Boot, React/Next.js/TypeScript,
  Linux Fedora/KDE, fluxo de trabalho com Claude Code).

## Escala e perfil do evento

- **Sem taxa de inscrição.**
- Estimativa: **menos de 40 competidores** (possivelmente menos de 30).
- Evento de baixo orçamento, verba em captação (patrocínio, apoio
  institucional, doações via Pix).
- Tom da comunicação: **celebratório/institucional** (não confrontacional
  com a Administração; o site não assume tom de denúncia).

## Categorias e premiação

| Categoria  | Quem participa           | Premiação                                            |
|------------|--------------------------|------------------------------------------------------|
| Iniciante  | A definir                | Medalha para todos + premiação adicional ao top 3    |
| Amador     | A definir                | Medalha para todos + premiação adicional ao top 3    |
| Feminino   | Categoria própria        | **Medalha + premiação para TODAS as participantes**  |

> Sem categoria mirim (baixa adesão esperada na faixa infantil). Faixas
> etárias exatas, critérios de enquadramento e valores/itens de premiação:
> **pendentes** (dependem da reunião e da captação). Há um levantamento
> inicial (não confirmado) de itens de premiação por colocação — ver
> `02-DECISOES.md`, seção "Premiação — estrutura cogitada".

## Ponto de atenção: menores de idade

Menores podem se inscrever em **qualquer** categoria (iniciante, amador ou
feminino).
Toda inscrição de menor exige **autorização do responsável legal** e termo de
responsabilidade. Por isso o formulário de inscrição coleta **data de
nascimento** e condiciona os campos de responsável a partir dela — nunca a
partir da categoria escolhida.

O texto do termo já está **validado juridicamente** (I3 resolvida em
25/07/2026) — ver `termo-responsabilidade.md`. O aceite se dá por checkbox
eletrônico no formulário externo, com versão em papel idêntica no
credenciamento presencial (D19).

## O que já foi decidido

- Inscrição: **modelo híbrido** — pré-inscrição online (formulário externo →
  planilha) + cota de inscrição presencial no dia do evento.
- Apoio financeiro: **Pix** (chave/QR estático) divulgado no site.
- Hospedagem do site: **Vercel** (free tier), site estático.
- Sem chaveamento/resultados "ao vivo" — não há internet confiável na pista.
  Resultados serão publicados de forma estática após as baterias/evento.

## O que está em aberto (depende da reunião com a Administração)

- **Data oficial do evento** — há previsão (22/08/2026), tratada como tal em
  todo o site; a data só trava com confirmação formal (P1).
- **Itens e valores da premiação** — a UIEMAPV **se comprometeu** a fornecer
  premiação, medalhas e troféu (D17), mas **nada está em mãos** e a lista de
  itens segue não confirmada (P4).
- **Captação de patrocínio** — responsabilidade da ASB (D17), **ainda não
  iniciada** — nenhum patrocinador fechado até agora (P4).
- Reparos na pista (iluminação, rachaduras) antes do evento (P5).
- Regulamento completo (faixas etárias, critérios de pontuação, formato de
  baterias, tamanho da cota presencial) (P6).

> **Deixaram de ser pendência:** uso do espaço e fechamento da rua, em
> 24/07/2026 (P2 — ver D15); banheiros e área de público, em 25/07/2026
> (P3). Ambas resolvidas em `02-DECISOES.md`.

## Documentos relacionados

- `02-DECISOES.md` — registro de decisões e pendências (fonte da verdade do status).
- `03-SPEC-SITE.md` — especificação completa do site (MVP, v1, v2).
- Proposta formal em PDF (apresentada à Administração Regional) — fora deste repo.
