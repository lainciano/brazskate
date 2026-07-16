# AGENT.md — Braz Skate

Este arquivo é a **fonte canônica** de instruções para qualquer agente de IA
(Claude Code, Codex, Copilot, etc.) trabalhando neste repositório. `CLAUDE.md`
apenas aponta para cá — não duplique regras nos dois lugares.

## Leitura obrigatória antes de qualquer tarefa

Antes de tomar qualquer decisão técnica ou de conteúdo, leia:

1. `docs/01-CONTEXTO.md` — o que é o evento, quem organiza, por que existe.
2. `docs/02-DECISOES.md` — decisões travadas e pendências (fonte da verdade
   do status do projeto; é um documento vivo, sempre confira a versão atual).
3. `docs/03-SPEC-SITE.md` — especificação completa do site (MVP, v1, v2).

**Nada que contrarie esses documentos deve ser implementado sem perguntar
ao mantenedor primeiro.**

## Stack travada

Next.js (App Router) + TypeScript, output estático (SSG/`output: 'export'`),
Tailwind CSS, deploy na Vercel (free tier). Conteúdo em MDX/JSON versionado
no repositório.

## Anti-escopo — o que este projeto NÃO faz

(fonte: `docs/03-SPEC-SITE.md` §2 e §8 — consulte a spec antes de propor
qualquer coisa desta lista)

- **Sem backend próprio, sem banco de dados, sem autenticação.**
- **Sem pagamento online** (não há taxa de inscrição).
- **Sem CMS** — uma pessoa edita o conteúdo, via repositório e `git push`.
- **Sem login, área do competidor ou painel administrativo.**
- **Sem resultados em tempo real, websocket ou polling ao vivo** — não há
  internet confiável na pista; resultados são publicados de forma estática
  após o evento.
- **Sem hospedagem própria de formulário** — pré-inscrição usa um serviço
  externo (Tally ou Google Forms).
- **Sem tom de denúncia** sobre a condição da pista — o tom do site é
  celebratório/institucional; críticas à Administração pertencem à proposta
  formal e à reunião, não ao site.

Se uma tarefa parecer exigir algo desta lista, pare e pergunte antes de
implementar.

## Regra de negócio crítica: menores de idade

**A exigência de autorização do responsável legal e do termo de
responsabilidade segue a *data de nascimento* do inscrito, nunca a
categoria escolhida.** Menores podem se inscrever em qualquer categoria
(iniciante, amador ou feminino). Qualquer formulário, validação ou lógica
condicional relacionada a isso deve derivar do campo de data de
nascimento, não de uma lista fixa de "categorias de menor".

## Política de placeholder

Dados ainda não definidos pela organização (data do evento, valores de
premiação, regulamento completo, infraestrutura) devem entrar no site como
**placeholder claramente marcado** (ex.: "data a confirmar", "detalhes do
regulamento em breve") — **nunca inventados ou estimados**. Consulte
`docs/02-DECISOES.md` para a lista de pendências e o que cada uma bloqueia.

## Regra geral: perguntar em vez de inferir

Quando a documentação tiver uma lacuna para a tarefa em mãos — um dado que
falta, uma decisão que não está registrada, uma ambiguidade entre docs —
**pare e pergunte ao mantenedor**. Não assuma, não infira, não escolha por
conta própria um valor que deveria vir da organização do evento.

## Versionamento

Resumo — regras completas em `docs/CONTRIBUTING.md`:

- Toda branch de trabalho nasce de `dev` (nunca de `main`) e volta para `dev`
  via Pull Request.
- Commits em Conventional Commits, descrição em português
  (`tipo(escopo): descrição`).
- Uma sessão de trabalho = uma branch = um PR.
- `main` é produção (deploy automático na Vercel) — nunca commit direto,
  nunca branch a partir dela para trabalho novo.

## Restrição de imagem

**Não usar a foto de referência da pista que tem marca d'água de terceiro
("Nossos Roteiros")** — serviu apenas de referência de enquadramento e não
pode ir ao site. O hero exige foto própria da pista ou com permissão
expressa (ver pendência I2 em `docs/02-DECISOES.md`). A mesma cautela vale
para qualquer foto com menores identificáveis: precisa de cobertura pelo
termo de uso de imagem antes de publicar.
