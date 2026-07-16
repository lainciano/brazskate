# Braz Skate — Especificação do Site (MVP · v1 · v2)

> **STATUS: ESPECIFICAÇÃO PRELIMINAR — SUJEITA A REVISÃO.**
> A reunião com a Administração Regional ainda não aconteceu. Data, premiação,
> regulamento e infraestrutura estão em aberto. Esta spec foi escrita para que
> o MVP **não dependa** de nenhuma dessas definições.
> Última atualização: 07/07/2026.

---

## 1. Visão geral

Site institucional do campeonato **Braz Skate**, representando a  
**ASB — Associação Skate Brazlândia**. Dois públicos:

1. **Skatistas do DF e entorno** — informação do evento e pré-inscrição.
2. **Administração Regional e patrocinadores** — peça de credibilidade da ASB
  e pitch de apoio/patrocínio.

O MVP existe **antes** da definição da data e serve como cartão de visitas
já na reunião com a Administração.

### Princípios de arquitetura (inegociáveis nesta fase)

- **Zero backend próprio.** Nada de servidor, banco ou API para manter.
- **Site 100% estático** (SSG). Todo estado offloadado para serviços externos.
- **Conteúdo no repositório** (MDX/JSON). Um `git push` publica.
- **Manutenível por uma pessoa só**, com pouco tempo, durante a organização
de um evento físico.
- Tom **celebratório/institucional**. Sem tom de denúncia.

---

## 2. Stack


| Camada                      | Escolha                                                                                          | Observações                                                                     |
| --------------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------- |
| Framework                   | **Next.js (App Router) + TypeScript**, output estático                                           | `output: 'export'` ou SSG puro; sem rotas de API                                |
| Estilo                      | Tailwind CSS                                                                                     | Padrão do ecossistema, rápido para uma pessoa                                   |
| Conteúdo                    | MDX para páginas textuais; JSON/TS para dados estruturados (patrocinadores, galeria, resultados) | Versionado no repo                                                              |
| Hospedagem                  | **Vercel free tier**                                                                             | Deploy por push no GitHub                                                       |
| Formulário de pré-inscrição | Serviço externo (Tally **ou** Google Forms) → planilha                                           | Ver §5. Decidir na implementação; confirmar limites atuais do free tier na hora |
| Pix                         | Chave + QR estático (imagem no repo)                                                             | Zero infra                                                                      |
| Mapa                        | Embed do Google Maps (iframe) apontando para a pista                                             | Sem API key paga                                                                |
| Analytics (opcional)        | Vercel Analytics ou similar leve                                                                 | Só se não adicionar fricção                                                     |
| Domínio                     | `braz-skate.vercel.app` no MVP; `.com.br` quando houver data                                     | Registro.br                                                                     |


**Explicitamente fora de escopo:** Spring Boot, banco de dados, autenticação,
CMS, websockets, pagamento online (não há taxa de inscrição).

---

## 3. Fases

### 3.1 MVP — "cartão de visitas da ASB" (antes da reunião)

Objetivo: existir, dar credibilidade, apoiar a captação. Não depende de data,
regulamento nem premiação definida.

Páginas/seções (pode ser one-page com âncoras + páginas secundárias):

1. **Home / hero**
  - Foto própria da pista (ver restrição de imagem em §7).
  - Nome do evento, tagline, "data a confirmar".
  - CTAs: "Quero competir" (aviso: pré-inscrição em breve) · "Seja um
  patrocinador" · "Apoie via Pix".
2. **Sobre o evento + ASB**
  - História do skate em Brazlândia (desde os anos 2000).
  - O campeonato de 2021 como origem/inspiração.
  - Quem é a ASB e propósito do evento (movimentar a cena, atrair o DF e
  entorno, parceria com a cidade). Tom celebratório.
3. **Categorias e premiação (versão resumida)**
  - Mirim, iniciante, amador, feminino.
  - Regra de premiação já decidida (feminino: medalha + premiação para
  todas; demais: medalha para todos + premiação ao top 3).
  - Marcar claramente: "detalhes do regulamento em breve".
4. **Seja um patrocinador (mini media-kit)**
  - Por que apoiar: alcance esperado (competidores do DF e entorno), público
   no dia, visibilidade da marca (som, faixas, site, redes).
  - Formas de apoio: verba, premiação (produtos), estrutura, serviços.
  - Contato direto (WhatsApp/e-mail da organização).
  - Aberto a marcas ligadas ao skate e também de outros ramos.
5. **Apoie via Pix**
  - QR + chave copiável. Texto curto: para que o dinheiro vai (premiação,
   estrutura). Discreto, tom "apoie a cena", coerente com o institucional.
6. **Contato + redes sociais**
  - Instagram da ASB/evento, WhatsApp, e-mail. Seção de imprensa pode
   esperar a v1.
7. **Rodapé**
  - ASB, ano, links.

Transversal ao MVP:

- **Open Graph caprichado** (imagem, título, descrição) — o link vai circular
por WhatsApp/Instagram; é o principal canal de divulgação.
- SEO básico (metadata, sitemap) e acessibilidade básica (contraste, alt).
- Responsivo mobile-first — o público vai abrir quase tudo pelo celular.
- Aviso visível de que informações estão sujeitas a confirmação.

**Critério de pronto do MVP:** o link pode ser mostrado na reunião com a
Administração e enviado a um patrocinador em potencial sem ressalvas.

### 3.2 v1 — site do evento (depois da reunião: data + regulamento definidos)

1. **Countdown** para a data confirmada (client-side puro).
2. **Regulamento completo** (página própria)
  - Faixas etárias por categoria, critérios de pontuação, formato de
   baterias, regras de equipamento/segurança, premiação detalhada.
3. **Data, local e como chegar**
  - Mapa embed, endereço, referências, transporte, estacionamento.
4. **Pré-inscrição** (ver §5) + explicação do modelo híbrido
  - "Garanta sua vaga antecipada; haverá cota limitada de inscrições no dia."
5. **Termo de responsabilidade + autorização de menor** integrados ao
  formulário (ver §5.3).
6. **Patrocinadores confirmados** — grade de logos a partir de
  `data/sponsors.json` (nome, logo, link, cota/tier opcional).
7. **Galeria** — fotos de 2021 (com créditos/permissão) + pista atual.
8. **FAQ** — taxa (não tem), categorias, o que levar, acompanhantes,
  estacionamento, chuva/adiamento, inscrição no dia.
9. **Programação do dia** — horários de credenciamento, baterias por
  categoria, intervalos, final, premiação.
10. **Avisos/atualizações** — lista simples em MDX (data confirmada, novo
  patrocinador, mudanças). Sem CMS: um arquivo por aviso.
11. **Imprensa/contato** ampliado.

### 3.3 v2 — dia do evento e pós-evento (opcional, tudo estático)

1. **Resultados** — página estática alimentada por `data/results.json`,
  atualizada por `git push` após as baterias (ou apenas pós-evento).
   Sem tempo real; se quiser algo durante o dia, usar stories do Instagram
   e consolidar no site depois.
2. **Galeria pós-evento** — fotos oficiais, com créditos.
3. **Prestação de contas** — o que foi arrecadado e como foi usado.
  Constrói confiança com patrocinadores e Administração para a próxima
   edição (objetivo declarado da ASB: criar precedente de parceria).
4. **"Quero ajudar" / voluntariado** (pode antecipar para a v1 se houver
  demanda de staff): formulário externo simples para juízes, staff de
   pista, som, limpeza.

---

## 4. Estrutura do repositório (proposta)

```
braz-skate/
├── app/
│   ├── page.tsx                # home (hero + seções âncora)
│   ├── regulamento/page.tsx    # v1
│   ├── inscricao/page.tsx      # v1 (embed/link do formulário + termo)
│   ├── patrocinio/page.tsx     # MVP (media-kit)
│   ├── galeria/page.tsx        # v1
│   ├── resultados/page.tsx     # v2
│   └── layout.tsx              # metadata/OG global
├── content/                    # MDX: sobre, faq, avisos, regulamento
├── data/
│   ├── sponsors.json
│   ├── categories.ts           # categorias + regras de premiação
│   ├── gallery.json            # fotos + créditos/permissão
│   └── results.json            # v2
├── public/
│   ├── og.png
│   ├── pix-qr.png
│   └── photos/
└── ...
```

`data/categories.ts` (fonte única das regras — usada na home, no regulamento
e na validação do formulário se houver embed):

```ts
export const categories = [
  { id: 'mirim',     nome: 'Mirim',     premiacao: 'medalha-todos-top3' },
  { id: 'iniciante', nome: 'Iniciante', premiacao: 'medalha-todos-top3' },
  { id: 'amador',    nome: 'Amador',    premiacao: 'medalha-todos-top3' },
  { id: 'feminino',  nome: 'Feminino',  premiacao: 'medalha-e-premiacao-todas' },
] as const;
// medalha-todos-top3: medalha p/ todos; premiação adicional ao top 3
// medalha-e-premiacao-todas: medalha + premiação para todas as participantes
// Faixas etárias: PENDENTE (P6) — adicionar minAge/maxAge quando definido
```

---

## 5. Pré-inscrição (modelo híbrido)

### 5.1 Modelo

- **Online:** formulário externo (Tally ou Google Forms) → respostas em
planilha lida pela organização. Abre quando a data for confirmada.
- **Presencial:** cota de vagas no dia (tamanho da cota: pendente P6).
Termo/autorização em papel no credenciamento para quem se inscrever no dia.
- Escala esperada (<40) torna a gestão manual da planilha trivial.

### 5.2 Campos do formulário


| Campo                                                | Tipo                                      | Obrigatório   | Observação                                          |
| ---------------------------------------------------- | ----------------------------------------- | ------------- | --------------------------------------------------- |
| Nome completo                                        | texto                                     | sim           |                                                     |
| Apelido/nome de pista                                | texto                                     | não           | Para locução e resultados                           |
| **Data de nascimento**                               | data                                      | sim           | Determina se é menor — em qualquer categoria        |
| Categoria                                            | seleção (mirim/iniciante/amador/feminino) | sim           |                                                     |
| Cidade/RA                                            | texto                                     | sim           | Métrica de alcance (DF e entorno) p/ patrocinadores |
| WhatsApp                                             | telefone                                  | sim           | Canal de confirmação/avisos                         |
| Instagram                                            | texto                                     | não           | Divulgação                                          |
| **Menor de idade?** (derivado da data de nascimento) | —                                         | —             | Se sim, exigir bloco do responsável                 |
| Nome do responsável legal                            | texto                                     | sim, se menor |                                                     |
| WhatsApp do responsável                              | telefone                                  | sim, se menor |                                                     |
| Autorização do responsável                           | checkbox de declaração                    | sim, se menor | Texto: pendente I3                                  |
| Aceite do termo de responsabilidade                  | checkbox                                  | sim (todos)   | Texto: pendente I3                                  |
| Como ficou sabendo                                   | seleção                                   | não           | Mede canais de divulgação                           |


Regras:

- **A obrigação do bloco de responsável segue a idade, nunca a categoria.**
(Um menor pode se inscrever em iniciante, amador ou feminino.)
- Tally suporta lógica condicional (mostrar bloco do responsável conforme
resposta); Google Forms tem condicionais mais limitadas — na implementação,
testar os dois e escolher. Confirmar limites de free tier vigentes.
- Confirmação de inscrição: mensagem automática do próprio serviço + a
organização confirma por WhatsApp perto do evento (manual, escala permite).

### 5.3 Termo de responsabilidade

- Texto único curto: ciência dos riscos da prática, uso de imagem
(fotos/vídeos do evento), autorização do responsável quando menor.
- **Validar o texto com apoio jurídico de confiança antes de publicar (I3).**
- Versão em papel idêntica para a inscrição presencial no dia.

---

## 6. Pix / apoio financeiro

- Chave Pix + QR estático em `/public/pix-qr.png`, com botão "copiar chave".
- Definir titularidade da chave (I4) — idealmente conta da ASB, não pessoa
física, pela credibilidade institucional.
- Texto curto e transparente: destino dos recursos (premiação, estrutura).
- Conecta com a futura página de **prestação de contas** (v2) — mencionar que
o uso dos recursos será divulgado.

---

## 7. Conteúdo e imagem — restrições

- **NÃO usar a foto com marca d'água "Nossos Roteiros"** (é de terceiro;
serviu apenas como referência de enquadramento). Hero exige foto própria
ou com permissão expressa (I2).
- Fotos de 2021: coletar com a comunidade **agora** (I1), registrando quem
tirou e obtendo permissão. Cada item de `gallery.json` carrega `credito`
e `permissao: true`.
- Fotos com menores identificáveis: garantir cobertura pelo termo de uso de
imagem ou permissão dos responsáveis antes de publicar.
- Tom de todo o copy: celebratório/institucional. A pauta de melhorias da
pista pertence à proposta formal e à reunião — não ao site.

---

## 8. O que o site NÃO faz (anti-escopo)

- Não processa pagamento (não há taxa).
- Não tem login, área do competidor, nem painel administrativo.
- Não tem resultados em tempo real, websocket ou polling ao vivo.
- Não tem CMS (uma pessoa edita, via repo).
- Não hospeda o formulário (serviço externo).
- Não assume tom de denúncia sobre a condição da pista.

---

## 9. Ordem de implementação sugerida (MVP)

1. Bootstrap Next.js + TS + Tailwind, deploy contínuo na Vercel (dia 0).
2. Layout base + design tokens (paleta a partir da identidade visual — I5).
3. Home one-page: hero → sobre/ASB → categorias/premiação → patrocínio →
  Pix → contato.
4. Página `/patrocinio` com o media-kit completo.
5. OG image + metadata + favicon.
6. Revisão de copy (tom institucional) e teste mobile.
7. Publicar em `*.vercel.app` e usar o link na reunião.

Depois da reunião (v1): countdown, regulamento, inscrição (formulário
externo pronto e testado com os condicionais de menor), galeria, FAQ,
programação — nessa ordem.

---

## 10. Riscos e mitigação


| Risco                                         | Mitigação                                                                                      |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Data adiada/alterada após divulgação          | Countdown e textos leem de uma única constante (`data/event.ts`); aviso destacado no topo      |
| Regulamento sair depois do esperado           | MVP não depende dele; página de regulamento nasce com "em breve"                               |
| Formulário-serviço mudar limites do free tier | Escala <40 respostas fica confortável em qualquer opção; migrar entre Tally/Forms é trivial    |
| Mantenedor único indisponível perto do evento | Site estático não "cai" sozinho; planilha de inscrições compartilhada com mais 1 pessoa da ASB |
| Fotos de 2021 se perderem                     | Ação imediata (I1), independente do site                                                       |


