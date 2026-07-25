# Estratégia: Confirmação Pública da Parceria UIEMAPV

> **STATUS: CONFIRMAÇÃO FORMAL RECEBIDA (25/07/2026) — AGUARDANDO MATERIAL DE MARCA.**
> A UIEMAPV **confirmou formalmente** a parceria (ver **D18** em
> `02-DECISOES.md`). O passo 1 abaixo está cumprido.
>
> **I7 segue parcialmente aberta:** falta receber **logo(s) e links oficiais**
> do instituto. Até isso chegar, o site **continua sem mencionar a UIEMAPV** —
> publicar marca de terceiro sem o arquivo e o link oficiais produziria menção
> incompleta ou incorreta.

---

## Contexto

- **D12** (`02-DECISOES.md`): UIEMAPV ([@uiemapvsocial](https://www.instagram.com/uiemapvsocial)) é responsável por **estrutura e premiação** do evento
- **D15** (`02-DECISOES.md`): Conversa confirmou divisão de responsabilidades entre ASB, Administração Regional e UIEMAPV
- **I7** (`02-DECISOES.md`): "Confirmação pública da parceria UIEMAPV — O site **não menciona o instituto** até o ok formal dele; quando confirmado, incluir na página de patrocínio"
- **Current state**: Página `/patrocinio` existe mas **não menciona UIEMAPV** (comentário: `SEM menção ao UIEMAPV até a confirmação (I7)`)

---

## O que precisa ser feito

### 1. Obter OK formal da UIEMAPV — ✅ **FEITO (25/07/2026, D18)**

O que ainda falta pedir ao instituto:

- [ ] **Arquivo do logo** (de preferência SVG ou PNG com fundo transparente)
- [ ] **Link oficial** (Instagram confirmado: @uiemapvsocial; site, se houver)
- [ ] Texto/grafia preferida do nome (ex.: "UIEMAPV" vs. "Instituto UIEMAPV")
- [x] ~~Concordam em ser mencionados publicamente como parceiros institucionais?~~ — **sim, confirmado**
  - Qual é o texto preferido? (Ex.: "Instituto UIEMAPV", "UIEMAPV — Instituto de...", etc.)
  - Autorizam o uso do logo/marca deles? (Se sim, obter arquivo)
  - Qual é o link oficial? (Instagram, site, etc.)
- [ ] Documentar resposta em `02-DECISOES.md` como nova decisão (D17 ou similar)

### 2. Locais onde adicionar a menção

Uma vez aprovado, adicionar UIEMAPV em três lugares:

#### **2.1. Página `/patrocinio`** (Principal)

**Seção proposta: "Parceiros institucionais"**

Local: Antes ou depois das "Formas de apoio", com visual diferente (destaque mas não intrusivo).

Conteúdo proposto:

```markdown
## Nossos parceiros institucionais

O Braz Skate é realizado em parceria com:

- **UIEMAPV** — Responsável pela estrutura, infraestrutura e premiação do evento.
  Instagram: @uiemapvsocial

[Logo UIEMAPV aqui, se disponível]
```

**Implementação técnica:**
- Adicionar seção em `app/patrocinio/page.tsx`
- Criar componente reutilizável `ParceirosInstitucionais()` para depois expandir com outros parceiros
- Dados em arquivo `data/partners.ts` (estrutura: `{ nome, descricao, instagram?, site?, logo? }`)

#### **2.2. Seção "Sobre"** (Footer ou página secundária)

**Local:** Se houver seção "Sobre o evento" ou "Quem somos"

**Conteúdo proposto:** Parágrafo simples mencionando UIEMAPV como parceira

Exemplo:

> "O Braz Skate é realizado pela ASB em parceria com a UIEMAPV, que contribui com estrutura, infraestrutura e premiação do evento."

#### **2.3. Footer**

**Local:** Se houver espaço

**Opção leve:** Link "Parceiros" que aponta para `/patrocinio#parceiros`

---

## Estrutura de dados proposta

**Arquivo:** `data/partners.ts`

```typescript
export const institutionalPartners = [
  {
    id: "uiemapv",
    nome: "UIEMAPV",
    descricao: "Responsável pela estrutura, infraestrutura e premiação do evento.",
    instagram: "uiemapvsocial",
    website: null, // adicionar quando disponível
    logoUrl: null, // adicionar quando obter arquivo
  },
  // Expandir conforme novos parceiros confirmem
] as const;

export type Partner = (typeof institutionalPartners)[number];
```

---

## Componente proposto

**Arquivo:** `components/parceiros-institucionais.tsx`

```typescript
import { institutionalPartners } from "@/data/partners";
import { SectionHeader } from "./section-header";
import { Reveal } from "./reveal";

export function ParceirosInstitucionais() {
  return (
    <section id="parceiros" className="registro-concreto bg-(--surface-alt)">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <Reveal>
          <div data-reveal>
            <SectionHeader
              eyebrow="Parcerias"
              titulo="Parceiros institucionais"
              lead="O Braz Skate é realizado em colaboração com organizações que compartilham nossa missão de fortalecer a cena de skate em Brazlândia."
            />
          </div>

          <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {institutionalPartners.map((partner) => (
              <li key={partner.id} data-reveal>
                <div className="rounded-card bg-(--surface) shadow-card p-6">
                  <h3 className="font-bold mb-2">{partner.nome}</h3>
                  <p className="text-(--fg-secundario) text-sm leading-[1.6] mb-4">
                    {partner.descricao}
                  </p>
                  {partner.instagram && (
                    <a
                      href={`https://instagram.com/${partner.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-(--link) hover:underline"
                    >
                      @{partner.instagram}
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
```

---

## Checklist de implementação

Quando a aprovação da UIEMAPV chegar:

- [ ] Criar `data/partners.ts` com dados de UIEMAPV
- [ ] Criar `components/parceiros-institucionais.tsx`
- [ ] Integrar componente em `/patrocinio/page.tsx` (após "Formas de apoio")
- [ ] Remover comentário `SEM menção ao UIEMAPV` de `PatrocinioResumo` (em `components/patrocinio-resumo.tsx`)
- [ ] Atualizar `02-DECISOES.md`:
  - Fechar I7 com data de implementação
  - Adicionar nova decisão (D17) com resposta formal da UIEMAPV
- [ ] Testar responsividade + build
- [ ] PR para dev → main

---

## Notas

1. **Estrutura futura-proof:** Usando `data/partners.ts` e componente reutilizável, é fácil adicionar mais parceiros institucionais depois (governos, outras ONGs, etc.)

2. **Tom**: Celebratório mas respeitoso — parceiros são apresentados como colaboradores, não como patrocinadores comerciais

3. **Logo**: Se UIEMAPV autorizar, adicionar logo em `public/images/logos/` e referência em `data/partners.ts`

4. **Links**: Usar Instagram como link principal (confirmado em D12/D15); website pode ser adicionado depois se necessário

---

## Próximos passos

1. **Obter OK formal da UIEMAPV** (checklist acima)
2. **Documentar resposta em `02-DECISOES.md`**
3. **Implementar componente e integrar**
4. **Abrir PR para dev → main**
