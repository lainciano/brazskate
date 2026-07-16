# Como contribuir — Braz Skate

Guia rápido de versionamento para quem trabalha neste repositório
(atualmente: Lain e Lino). Objetivo: simples o bastante para seguir sem
fricção, seguro o bastante para não quebrar `main`.

## Antes de programar

Leia `docs/01-CONTEXTO.md`, `docs/02-DECISOES.md` e `docs/03-SPEC-SITE.md`.
Eles são a fonte da verdade do projeto. Se a documentação tiver uma lacuna
para a tarefa que você está fazendo, **pergunte antes de assumir**.

## Estrutura de branches

- **`main`** — produção. Deploy automático na Vercel. **Protegida: nada de
  commit direto.** Só recebe merge de `dev` em pontos estáveis (ex.: MVP
  pronto), via PR.
- **`dev`** — branch de integração. Toda branch de trabalho nasce dela e
  volta para ela via Pull Request.
- **Branches de trabalho** — sempre filhas de `dev`, em kebab-case,
  prefixadas pelo tipo:

  | Prefixo | Uso |
  |---|---|
  | `feat/` | nova funcionalidade |
  | `fix/` | correção de bug |
  | `refactor/` | refatoração sem mudar comportamento |
  | `docs/` | documentação |
  | `chore/` | infra/config/tarefas de manutenção |

  Exemplos: `feat/hero-home`, `fix/og-image`, `docs/atualiza-regulamento`.

## Padrão de commit

[Conventional Commits](https://www.conventionalcommits.org/), com a
descrição **em português**:

```
tipo(escopo opcional): descrição no imperativo
```

Tipos aceitos: `feat`, `fix`, `refactor`, `docs`, `style`, `test`, `chore`,
`perf`, `build`, `ci`.

Exemplos:

```
feat(home): adiciona seção hero com CTA de patrocínio
fix(pix): corrige caminho do QR estático
docs: atualiza spec do MVP
```

Um assunto por commit. Corpo opcional explicando o "porquê", quando não for
óbvio.

## Fluxo de trabalho — uma branch, um PR por sessão

1. Parta sempre de `dev` atualizada (`git checkout dev && git pull`).
2. Crie uma branch de trabalho para a tarefa da sessão.
3. Faça o trabalho, com commits pequenos e no padrão acima.
4. Abra um Pull Request de volta para `dev`. Título no padrão Conventional
   Commits; descrição curta do que foi feito e por quê.
5. PRs abertos pelo Lino são revisados pelo Lain antes do merge.
6. Merge preferencialmente via **squash**, para manter o histórico de `dev`
   limpo (um commit por PR).
7. `dev` é promovida para `main` em pontos estáveis, também via PR.

Regra prática: uma sessão de trabalho = uma branch = um PR. Evite acumular
tarefas não relacionadas no mesmo PR.

## Node

A versão do Node usada no projeto está fixada em `.nvmrc`. Rode `nvm use`
(ou equivalente) antes de instalar dependências, para os dois ambientes
ficarem alinhados.
