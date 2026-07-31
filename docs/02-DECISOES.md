# Braz Skate — Registro de Decisões e Pendências

> **STATUS: DOCUMENTO VIVO — SUJEITO A REVISÃO.**
> Nada aqui é definitivo até a reunião com a Administração Regional.
> Ao revisar uma decisão, não apague: mova para "Decisões revisadas" com data
> e motivo, para manter o histórico.
> Última atualização: 31/07/2026.

## Decisões tomadas

| # | Decisão | Racional | Data |
|---|---------|----------|------|
| D31 | **I1 e I2 fechadas.** I2: confirmado pelo Lain que todas as fotos de `docs/assets/fotos-manobras/` (não só `IMG_0137.jpg`) são na pista de Brazlândia — a pendência de foto própria do local estava efetivamente resolvida sem registro. Hero **mantém** `IMG_0137.jpg` por escolha explícita; as outras 3 fotos do lote (crédito **Cauet**) entram como colagem na seção Localização. I1: as 9 artes de premiação de 2021 (`docs/assets/camp2021/`, ex-`fotos-camp2021/`) traziam barra de patrocinadores/apoiadores de 2021, logo do GDF e nome de deputado distrital — publicar como estavam exibiria marcas que não patrocinam 2026 e criaria associação político-partidária (contra D6). Recortadas para manter só a foto do pódio (crédito **Acervo ASB**), com legenda de categoria + colocação — nome completo do competidor não republicado. As 10 marcas lidas na barra removida viraram lista de leads internos (`docs/leads-patrocinio-2021.md`, D30), não publicadas como patrocinadoras de 2026. Componente `Colagem` (`components/colagem.tsx`) implementado conforme o contrato do §4.3 | Pedido do Lain (31/07/2026): "todas essas fotos sao na pista de brazlandia" (I2) e "recortar só a área da foto" para 2021 (I1) — fecha as duas pendências internas que travavam a galeria (V1.7) | 31/07/2026 |
| D30 | **Contrapartidas de patrocínio em dois níveis**, sem valor em R$: **Patrocínio** (financeiro/Pix ou premiação) recebe menção no som, espaço para faixa da marca na pista (material da própria marca), logo/link no site e menção nas redes; **Apoio** (infraestrutura ou divulgação/mídia) recebe menção no som, nome no site e menção nas redes. Nova seção em `/patrocinio` (`data/contrapartidas.ts`), entre "Formas de apoio" e "Parceiros institucionais". `data/sponsors.ts` criado como contrato vazio (grade de logos só nasce com patrocinador real, P4). Ícone do Pix (`IconePix`, SVG em `currentColor`) substitui a seta-rabisco no botão terciário. Marquee da home passa a intercalar identidade e venda ("Braz Skate · Sua marca aqui · Brazlândia-DF · Seja um patrocinador"), linkando para `/patrocinio` | Pedido do Lain (31/07/2026): P4 é o gargalo real do evento e a página hoje adiava toda contrapartida para negociação caso a caso, o que trava a captação. Os níveis derivam do precedente do próprio campeonato de 2021 (a ASB já separava "Patrocínio" de "Apoio" nas artes de premiação daquela edição — ver D31) | 31/07/2026 |
| D29 | **Formulário de pré-inscrição publicado**: https://tally.so/r/J9bY7z, montado via API do Tally seguindo `docs/blueprint-formulario-pre-inscricao.md` (cota=60, corte de idade iniciante ≤25 — ambos testados em preview pelo Lain). Página `/inscricao` (V1.8) publicada, explicando o modelo híbrido (D1) e linkando `/termo`; CTA "Quero competir" do hero religado de `#categorias` para `/inscricao`. Pendência #5 do blueprint (acesso à planilha): só o Lain acessa por enquanto. Pendência #6 (retenção de dados) segue em aberto | Destrava V1.8 e fecha o item 4 (pré-inscrição) da spec de 11 itens | 30/07/2026 |
| D28 | **I7 fechada — UIEMAPV publicada como parceiro institucional**: logo recebida (`public/logo-uiemapv.jpg`) e link oficial (@uiemapvsocial) confirmados. Nova seção "Parceiros institucionais" em `/patrocinio` (`data/partners.ts`, `components/parceiros-institucionais.tsx`), depois de "Formas de apoio" | Fecha I7 conforme o plano em `docs/estrategia-confirmacao-uiemapv.md` — material de marca chegou, então a menção deixa de estar incompleta | 30/07/2026 |
| D27 | **Texto sobre o estado da pista (P5), neutro e sem apontar responsável:** "A pista do Skate Park de Brazlândia está em processo de manutenção e melhorias — o campeonato acontece normalmente, e a organização trabalha para deixar a estrutura em boas condições até o dia do evento." Entra como pergunta nova no FAQ (`data/faq.ts`). **D6 (tom celebratório/institucional, nunca confrontador) permanece intacta** — o texto informa a situação sem crítica à Administração; a crítica formal continua restrita à proposta em PDF | Pedido do Lain (30/07/2026): a pista segue sem reparo, mas deixou de ser urgente o bastante pra justificar silêncio total — o site precisa reconhecer a situação sem virar confronto | 30/07/2026 |
| D26 | **P6 fechada — regulamento completo:** faixas etárias: iniciante até 25 anos, amador e feminino sem limite de idade. Cota de inscrição presencial: até 60 competidores. Formato: bateria cronometrada individual, 2 passagens de 1 minuto por competidor. Pontuação: nota de 0 a 10 por juiz em cada passagem, conta a melhor passagem entre os juízes. Chuva/adiamento: evento reagendado para data alternativa, anunciada nos canais oficiais (Instagram/WhatsApp) se precisar | Decisão do Lain (30/07/2026) — destrava a página `/regulamento` (V1, item 2), fecha as 3 perguntas pendentes do FAQ (`faixas-etarias`, `cota-presencial`, `chuva`) e as pendências #1/#2 do blueprint do formulário (`docs/blueprint-formulario-pre-inscricao.md`) | 30/07/2026 |
| D25 | **Hero ativa o slot de foto (§4.2)** com `IMG_0137.jpg` de `docs/assets/fotos-manobras/` (ollie a contraluz, sem foto da pista de Brazlândia em si — é uma manobra em outro local). **Permissão de uso de imagem confirmada pelo Lain** para o skatista identificável na foto, conforme exigido pelo `AGENT.md` ("Restrição de imagem"). Tratamento duotone tinta→vermelho + grão + scrim já implementado (§4.2) sem alteração. **O Selo (carimbo do logo) foi removido do Hero por completo** — decisão revista pelo Lain na mesma sessão, depois de a primeira versão manter o Selo pequeno sobreposto à foto | Fecha a decisão pendente de item 3 do briefing de polish pós-GSAP (hero/Selo/performance/footer). **Não fecha I2 por completo**: I2 pede foto *da pista* de Brazlândia; esta é uma foto de manobra em outro local, então a pendência de foto própria da pista segue parcialmente aberta | 30/07/2026 |
| D24 | **Data do evento confirmada: 12 de setembro de 2026** (revisa D15, que registrava 22/08 como previsão de conversa informal). Não é mais previsão — é a data acertada com a Administração/ASB, ainda que sujeita a alteração de última hora. `data/evento.ts` (`dataPrevista`, `dataPrevistaCurta`, `dataPrevistaISO`) atualizado; sticker do hero perde o rótulo "Previsão" e o pulso visual de incerteza; countdown perde a linguagem de "data prevista". A data de abertura de inscrição (`inscricaoAbrePrevista`, hoje 01/08) **não** mudou junto — segue como previsão em aberto até confirmação separada | Fecha o texto de incerteza que P1 registrava para a data do evento; **P6** (regulamento/cota) e o restante de P1 relacionado a inscrição/domínio seguem sem mudança | 30/07/2026 |
| D23 | **GSAP — emenda ampla ao §6.2 de `05-DESIGN.md`:** plugins permitidos expandem de "gsap core + ScrollTrigger apenas" para a **lista completa aprovada no spec** (`2026-07-25-gsap-avancado-design.md` §3): SplitText, DrawSVG, MorphSVG, CustomEase, CustomWiggle, CustomBounce, ScrambleText. ScrollSmoother recebe **decisão própria (ver item 1 abaixo).** Todos os guardrails do §6.2 continuam integralmente em vigor — a emenda amplia os plugins, **não afrouxa** `prefers-reduced-motion`, lazy-init, performance ou teste em celular. **Grão animado entra**, sujeito a medição de perf em celular real antes do merge (guardrail §6.4). **SplitText no h2:** duas opções viáveis (stencil puro, ou stencil + split em paralelo) — revisor escolherá durante implementação conforme ficar melhor visualmente | A spec `2026-07-25-gsap-avancado-design.md` mapeou o que existe no pacote, o custo de performance (lazy-loaded fora do bundle inicial) e as aplicações concretas. A emenda formaliza o que antes era apenas "sim, vale avaliar" | 25/07/2026 |
| D22 | Categoria **feminino não é exclusiva** — competidora escolhe livremente entre iniciante, amador ou feminino. Formulário não pergunta gênero como campo isolado; a condicional de menor (D10) não depende da categoria escolhida | D8 fixou as três categorias mas não dizia se feminino segregava a competidora das demais; lacuna identificada ao detalhar o blueprint do formulário (`docs/blueprint-formulario-pre-inscricao.md`) | 25/07/2026 |
| D21 | Formulário de pré-inscrição: ferramenta fechada em **Tally** (encerra o "testar os dois" de `03-SPEC-SITE.md` §5.2 — a lógica condicional de menor é nativa no Tally, mais frágil no Google Forms). Menor **preenche sozinho** online; o checkbox de aceite vale como declaração de ciência, e o **aceite que vale juridicamente é o papel assinado pelo responsável no credenciamento** (a ASB confirma por WhatsApp antes do evento). **Sem CPF/RG no formulário online** (minimização de dado pessoal — documento é conferido só presencialmente). Bloco do responsável exigido pela **idade na data do evento**, não na data de preenchimento — se a data prevista mudar (P1), casos de fronteira precisam ser reconferidos manualmente | Fecha quatro lacunas que `03-SPEC-SITE.md` §5.2 e `docs/termo-responsabilidade.md` deixavam em aberto. Detalhado no blueprint (`docs/blueprint-formulario-pre-inscricao.md`) e na spec `docs/superpowers/specs/2026-07-25-blueprint-formulario-pre-inscricao-design.md` | 25/07/2026 |
| D20 | Evento é **exclusivamente de skate** — nenhuma peça do site menciona patins ou outro equipamento não-skate. Revisa D16, que registrava "skate/patins" na resposta de "o que levar" | Confirmado pelo mantenedor em 25/07/2026; o FAQ publicado (`data/faq.ts`) e a spec da V1.3 foram corrigidos, e a versão anterior de D16 foi para "Decisões revisadas" | 25/07/2026 |
| D19 | Termo de responsabilidade **validado juridicamente** (revisado com advogado). O aceite se dá por **checkbox de aceite eletrônico no formulário externo** (Tally/Forms), **não** por assinatura certificada — mantém o anti-escopo do `AGENT.md` (sem backend, sem autenticação, sem hospedagem própria de formulário). Versão em papel idêntica no credenciamento presencial. Exportação em PDF pelo próprio site, com identidade visual, via biblioteca client-side carregada por **import dinâmico no clique** | Fecha I3 e destrava a pré-inscrição. Aceite eletrônico é suficiente para a escala do evento (<40 competidores, sem taxa) e evita criar conta/custo em serviço de assinatura. O import dinâmico mantém a lib fora do bundle inicial, preservando o orçamento de `05-DESIGN.md` §6.4 | 25/07/2026 |
| D18 | Parceria com a UIEMAPV **formalmente confirmada** pelo instituto. A publicação no site segue condicionada ao recebimento de **logo(s) e links oficiais** — até lá o site continua sem mencionar o instituto (I7 permanece parcialmente aberta) | Consentimento obtido, mas publicar marca de terceiro sem o arquivo e o link oficiais produziria menção incompleta ou incorreta | 25/07/2026 |
| D17 | Escopo de fornecimento da UIEMAPV **comprometido** (a princípio) — ainda não entregue: **água, tenda, som, fechamento da rua, mesa de frios e frutas, premiação, medalhas e troféu**. Banheiros e área de público confirmados separadamente pela Administração (ver P3 em "Pendências resolvidas"). Divisão de responsabilidades: a **ASB** fica com regulamento, formulário de inscrição, programação do dia, captação de patrocínio e divulgação — **captação ainda não iniciada** | Detalha D12/D15 com escopo concreto e delimita o que continua sendo trabalho da ASB. "Comprometido" ≠ "em mãos": o site não pode tratar a premiação como garantida (política de placeholder, `AGENT.md`) | 25/07/2026 |
| D16 | Conteúdo do FAQ parcial (V1.3) confirmado pelo mantenedor: "o que levar" = skate + equipamento de segurança + documento de identificação (**revisado por D20** em 25/07/2026 — a versão original dizia "skate/patins"); "acompanhantes/público" = entrada livre, evento aberto à comunidade. Perguntas que dependem do regulamento (faixas etárias, cota presencial, chuva/adiamento) entram na lista com sticker "em breve" em vez de ficarem ocultas | Segue a regra "perguntar em vez de inferir" do `AGENT.md` — conteúdo real fornecido pelo mantenedor, não inventado; manter a pergunta visível com sticker segue a assinatura de placeholder do site (`05-DESIGN.md` §3.6) | 25/07/2026 |
| D15 | Conversa (não reunião formal) entre ASB, Administração Regional e instituto parceiro definiu: **divisão de responsabilidades** (Administração + instituto: estrutura, premiação; ASB: site, artes, divulgação, patrocínios), **espaço do evento garantido** (inclui fechamento de rua) e **datas previstas** — evento 22/08, inscrição 01/08 — **sujeitas a mudança** (não são compromisso formal) | Destrava P2 e dá base de conteúdo à sub-etapa V1.1, sem travar a data | 24/07/2026 |
| D14 | Direção de design travada: estética street com acabamento institucional — texturas de spray/grão, sticker badges (placeholders viram stickers), registros duplos (asfalto escuro / concreto claro); tipografia **Anton (display) + Archivo (texto)**; **sem WebGL no MVP** — GSAP core + ScrollTrigger apenas (plano completo em `05-DESIGN.md`, roadmap em `04-ROADMAP-MVP.md`) | Identidade própria com custo de performance controlado; three.js rejeitado, shader OGL fica como candidato de v1 | 16/07/2026 |
| D13 | Organização de componentes: separação primária é **conteúdo (MDX/JSON em `content/` e `data/`) × apresentação (componentes)**, com Server Components estáticos como padrão. Componentes com interatividade de cliente (ex.: menu mobile, copiar Pix) aplicam Container/Presenter: estado e eventos extraídos para um Custom Hook (`useX`) quando a lógica crescer, mantendo a visão pura | Preserva organização e manutenibilidade sem forçar `"use client"` num site SSG (`output: 'export'`) nem afetar requisitos | 16/07/2026 |
| D12 | Estrutura e premiação do evento ficam sob responsabilidade do instituto/ONG parceiro **UIEMAPV** ([@uiemapvsocial](https://www.instagram.com/uiemapvsocial)) | Parceria institucional viabiliza infraestrutura e premiação sem depender só de captação da ASB | 16/07/2026 |
| D1 | Inscrição em **modelo híbrido**: pré-inscrição online + cota presencial no dia | Base de planejamento (nº por categoria) + coleta antecipada de termo/autorização de menores, mantendo inclusão de quem só aparece no dia | 07/07/2026 |
| D2 | Pré-inscrição via **formulário-serviço externo → planilha** (Tally ou Google Forms); **nenhum backend próprio** | <40 competidores, sem taxa; backend seria over-engineering e criaria carga de manutenção no período mais atarefado da organização | 07/07/2026 |
| D3 | **Apoio via Pix** (chave/QR estático) presente no site | Verba é o principal gargalo do evento; Pix estático tem custo zero de infra | 07/07/2026 |
| D4 | Hospedagem na **Vercel** (free tier), Next.js com geração estática (SSG) | Perfil técnico do mantenedor (Next/TS), zero servidor a manter, domínio custom possível depois | 07/07/2026 |
| D5 | **Sem resultados/chaveamento ao vivo** | Sem internet confiável na pista; risco alto e valor baixo. Resultados publicados de forma estática pós-baterias/evento | 07/07/2026 |
| D6 | Tom do site: **celebratório/institucional** | Não atritar com a Administração antes/depois da reunião; advocacy fica nos canais e documentos próprios | 07/07/2026 |
| D7 | Conteúdo editado **no repositório** (MDX/JSON + `git push`), sem CMS | Somente uma pessoa edita o site por enquanto | 07/07/2026 |
| D8 | Categorias: **iniciante, amador e feminino** (categoria própria) — sem categoria mirim | Baixa adesão esperada na faixa infantil não justifica categoria própria | 16/07/2026 |
| D9 | Premiação: **feminino = medalha + premiação para todas**; demais categorias = medalha para todos + premiação adicional ao top 3 | Valorização da participação feminina e da participação em geral | 07/07/2026 |
| D10 | Formulário coleta **data de nascimento** e exige responsável/autorização para menores em **qualquer categoria** | Menores não estão restritos a uma categoria específica; a obrigação legal segue a idade, não a categoria | 07/07/2026 |
| D11 | Domínio: `*.vercel.app` no MVP; avaliar compra de `.com.br` quando a data for confirmada | Não gastar antes de o evento ter data | 07/07/2026 |

## Decisões sobre ScrollSmoother (D23 — 4 sub-itens)

Estas 4 questões foram explicitadas na spec `2026-07-25-gsap-avancado-design.md` §6 como decisões que não deveriam ser assumidas. Agora fechadas:

| # | Decisão | Status | Data |
|---|---------|--------|------|
| D23.1 | **ScrollSmoother: (a) header fora do wrapper, (b) header `fixed`, ou (c) não usar?** Decisão: **(a) Header fora do wrapper** — mantém o sticky, o resto rola suave. Exige reestruturar `app/layout.tsx` para separar header do conteúdo, mas preserva a navegação e resolve o conflito. ScrollSmoother fica como **item 8 do plano** (risco alto, revisto depois que 1–7 estiverem estáveis) | Decidido 25/07/2026 | 25/07/2026 |
| D23.2 | **SplitText no `h2`: substitui o "stencil puxado" da V1.6 ou soma a ele?** Decisão: **deixar a escolha visual para o revisor** — as duas opções são viáveis (stencil puro mantém a V1.6; stencil + split em paralelo é mais chamativo). Implementação testa ambas, merge carrega a que ficar melhor | Decidido 25/07/2026 | 25/07/2026 |
| D23.3 | **Grão animado entra?** Decisão: **sim, entra** — é identidade do site e performance-friendly se a base é SVG. Deve ser medido em celular real antes do merge (guardrail §6.4). Se Performance cair abaixo de 90, sai | Decidido 25/07/2026 | 25/07/2026 |
| D23.4 | **A emenda ao §6.2 é ampla (todos os plugins liberados) ou restrita à lista aprovada?** Decisão: **ampla** — a lista no spec é tudo o que existe relevante no pacote e de custo aceitável. Futuras ampliações exigem nova decisão explícita | Decidido 25/07/2026 | 25/07/2026 |
| D23.5 | **`CustomWiggle` é tecnicamente viável neste bundle?** Não. Testado na sub-etapa 1 (fundação de motion): `CustomWiggle.create()` lança `TypeError: yEase is not a function` em runtime — seu bootstrap interno depende de `window.gsap`, que este app (ESM client-side, sem script global) nunca define. O tween que usa a ease quebrada trava em `opacity:0` permanentemente, **sem nenhum erro visível no console** — só foi encontrado com reprodução isolada (Node + Playwright/Firefox). Substituído por `elastic.out(1, 0.6)` (ease nativa do GSAP, sem plugin) para o mesmo efeito de "carimbada". **`CustomWiggle` sai da lista de plugins em uso** — `CustomBounce` (não testado ainda) pode ter o mesmo padrão de inicialização; testar isoladamente antes de usar em produção | Achado técnico durante a implementação da sub-etapa 1 (`docs/superpowers/specs/2026-07-26-gsap-fundacao-motion-design.md`), confirmado pelo Lain reportar que nenhuma animação parecia ter sido aplicada | 26/07/2026 |

---

## Pendências (bloqueadas pela reunião com a Administração)

| # | Pendência | Bloqueia o quê no site |
|---|-----------|------------------------|
| P1 | Data do evento | **Resolvida em 30/07/2026 (D24)** — 12 de setembro de 2026, confirmada (não previsão). Segue sujeita a alteração de última hora; se mudar, `data/evento.ts` é o único lugar a editar |
| P4 | Verba / patrocínio institucional. **A UIEMAPV se comprometeu** (D17) a fornecer premiação, medalhas e troféu — mas **nada disso está em mãos ainda**; é compromisso, não entrega. A **captação de patrocínio pela ASB ainda não começou**. Itens/valores específicos da premiação (ver "Premiação — estrutura cogitada" abaixo) seguem NÃO confirmados | Valores da premiação no regulamento; grade de patrocinadores; o site não pode afirmar premiação garantida (política de placeholder, `AGENT.md`) |
| P5 | Reparos na pista (iluminação, rachaduras) — **segue sem reparo**, mas o site agora trata a situação com um texto neutro (D27), em vez de silêncio total | Não bloqueia o site; afeta a data |
| P6 | Regulamento completo | **Resolvida em 30/07/2026 (D26)** — faixas etárias, cota presencial, formato de bateria, pontuação e política de chuva definidos. Página `/regulamento` e as 3 perguntas pendentes do FAQ liberadas |
| P7 | Composição da equipe ASB (funções/responsáveis) — **parcialmente resolvida em 30/07/2026**: seção "Quem organiza" publicada em `components/sobre.tsx` (commit `92a0920`) com os nomes do time (Luciano, Gustavo, Cauet, Samuel) em `StickerBadge`, sem cargo formal ainda | Seção "quem somos" completa — falta só atribuir função/responsável a cada nome |

## Premiação — estrutura cogitada (NÃO confirmada)

> A princípio seria essa a premiação, mas nada está confirmado — depende de
> patrocínio/verba (ver P4 e D12). Não usar estes itens como definitivos em
> nenhuma peça do site; tratar como placeholder até confirmação.
>
> **Atualização 25/07/2026 (D17):** a UIEMAPV **se comprometeu** a fornecer a
> premiação, as medalhas e o troféu — **compromisso, não entrega**: nada
> disso está em mãos ainda. Os **itens específicos abaixo seguem NÃO
> confirmados** mesmo depois desse compromisso.

- **1º lugar:** 2 shapes, calçado de skate, jogo de rolamento, lixa, blusa.
- **2º lugar:** 1 shape, calçado de skate, lixa, blusa.
- **3º lugar:** 1 shape, 1 calçado de skate.
- Mesma estrutura para todas as categorias, com mais foco (mais itens) na
  categoria amador.
- **Brincadeiras** (best trick, sorteio etc.): premiação à parte.
- Pool geral de prêmios avulsos: vários shapes, calçados, blusas,
  rolamentos, rodas, acessórios de skate.

## Pendências internas (não dependem da Administração)

| # | Pendência | Ação |
|---|-----------|------|
| I4 | Chave Pix oficial da ASB | Definir titularidade (idealmente CNPJ/conta da associação, se existir) e gerar QR |
| I5 | Identidade visual mínima (logo ASB/evento, paleta) | Necessária para o MVP ter cara própria |
| I6 | Mini media-kit de patrocínio | ~~Conteúdo da página "seja um patrocinador"~~ Conteúdo-base pronto em `docs/media-kit-braz-skate.md` (16/07/2026); falta só adaptar para a página `/patrocinio` |
| I7 | **Logo(s) e links oficiais** da UIEMAPV | Confirmação formal da parceria **já recebida** (ver D18) — falta só o material de marca. O site **continua sem mencionar o instituto** até logo e link chegarem; quando chegarem, entra como parceiro institucional na página de patrocínio. Plano de implementação em `docs/estrategia-confirmacao-uiemapv.md` |

## Decisões revisadas

- **D8 (categorias)** — versão anterior (07/07/2026): "Categorias: mirim,
  iniciante, amador e feminino (categoria própria)". Revisado em 16/07/2026:
  categoria mirim removida — baixa adesão esperada na faixa infantil não
  justifica categoria própria. Categorias atuais: iniciante, amador,
  feminino.
- **D16 (conteúdo do FAQ — "o que levar")** — versão anterior (25/07/2026):
  "skate/patins + equipamento de segurança + documento de identificação".
  Revisado no mesmo dia (25/07/2026) por **D20**: menção a patins removida —
  o evento é exclusivamente de skate, e nenhuma peça do site deve citar
  equipamento não-skate. Texto atual: "skate + equipamento de segurança +
  documento de identificação".

## Pendências resolvidas

- **I1 (fotos do campeonato de 2021)** e **I2 (fotos próprias da pista)** —
  resolvidas em 31/07/2026 (D31): recorte das artes de premiação de 2021 e
  confirmação de que as fotos de manobra já disponíveis são na pista de
  Brazlândia. Ver `data/gallery.ts` e `components/colagem.tsx`.
- **P2 (autorização de espaço / fechamento de rua)** — resolvida em
  24/07/2026: espaço do evento garantido, incluindo fechamento de rua, via
  conversa com a Administração e o instituto parceiro (ver D15).
- **I3 (termo de responsabilidade + autorização de menor)** — resolvida em
  25/07/2026: texto **validado juridicamente** (revisado com advogado). Ver
  **D19** para a política de aceite (checkbox eletrônico no formulário
  externo, papel no credenciamento presencial) e `docs/termo-responsabilidade.md`
  para o texto vigente.
- **P3 (infraestrutura — banheiros e área de público)** — resolvida em
  25/07/2026: confirmados pela Administração, completando o escopo de
  infraestrutura ao lado do que a UIEMAPV já havia se comprometido a
  fornecer (água, tenda, som — ver D17).
