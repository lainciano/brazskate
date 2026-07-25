# V1.5 · Countdown com a data prevista

> **STATUS: APROVADO — implementado na mesma sessão via plano de execução.**
> Sub-etapa do V1 (`docs/04-ROADMAP-V1.md`). Decisão do Lain (25/07/2026):
> usar a data prevista como valor atual em vez de esperar P1 (data oficial).

## Contexto e motivação

O hero hoje mostra a data como texto num `StickerBadge` ("Previsão: 22 de
agosto"). O countdown troca isso por uma contagem regressiva, sem esperar a
data oficial — o rótulo "previsão" segue explícito, então o placeholder não
vira afirmação.

Esta spec fecha os dois pontos que o roadmap deixava em aberto: o
comportamento sob geração estática (`output: 'export'`) e a acessibilidade de
dígitos que mudam a cada segundo.

## Escopo

**Entra:**
- `data/evento.ts` ganha `dataPrevistaISO: "2026-08-22"`, ao lado das strings
  de exibição já existentes.
- `components/countdown.tsx` (novo, `"use client"`) — dias/horas/
  minutos/segundos até `dataPrevistaISO`.
- Integração no `Hero`, junto do `StickerBadge` variante `data` existente.

**Não entra:**
- Qualquer alteração no valor da data — segue previsão até P1 fechar.
- Countdown em outras seções (só o hero).

## Fonte única — `data/evento.ts`

```ts
export const evento = {
  // ...campos existentes (dataPrevista, dataPrevistaCurta, etc.)
  dataPrevistaISO: "2026-08-22", // formato AAAA-MM-DD, meia-noite local
} as const;
```

Uma fonte, várias formas: as strings de exibição (`dataPrevista`,
`dataPrevistaCurta`) não são derivadas do ISO — "22 de agosto" não sai de
formatador padrão sem risco de erro de locale, e o ganho não paga o risco de
regressão nas strings já publicadas. Trocar a data quando P1 fechar é editar
os dois tipos de campo no mesmo arquivo.

## Comportamento sob SSG

Com `output: 'export'`, o HTML nasce no build — calcular o valor na primeira
renderização produziria um número desatualizado (o tempo entre o build e o
usuário abrir a página) e, pior, divergência entre servidor e cliente.

Padrão: o componente nasce com um **estado inicial estável** (ex.: todos os
campos como `null` ou um placeholder fixo) e calcula o valor real dentro de
`useEffect`, na montagem no cliente. Não há hidratação de um número calculado
no servidor — o número real só existe depois do primeiro efeito.

O espaço dos dígitos é reservado desde o primeiro paint (largura/altura fixas
via CSS, não condicionadas ao conteúdo) para manter CLS < 0,1 mesmo com o
conteúdo mudando de "—" para o número real logo após a montagem.

Atualização: `setInterval` de 1s enquanto montado, limpo no cleanup do
`useEffect`.

## Acessibilidade

Dígitos que mudam a cada segundo dentro de `aria-live` inundam leitor de
tela — é a armadilha que esta spec existe para evitar.

Padrão de dois canais:
- **Visual:** os dígitos (dias/horas/min/seg) ficam `aria-hidden="true"`.
  Mudam a cada segundo livremente, sem gerar anúncio nenhum.
- **Textual:** um resumo em `sr-only`, formato "faltam cerca de N dias para
  22 de agosto de 2026 — data prevista", que só é recalculado quando o
  **dia** muda (não a cada segundo). A palavra "previsão"/"prevista" é
  **inseparável** do número, tanto no resumo quanto em qualquer rótulo
  visual próximo — nunca aparece um número de dias sozinho, sem o
  qualificador.

Não usar `aria-live` no resumo: ele não precisa interromper o usuário quando
muda; leitor de tela lê ao focar/navegar até o componente, como qualquer
outro texto.

## Motion

Nenhuma animação nova. O countdown nasce estático no lugar; se quiser conectar
à entrada de seção do hero mais adiante, é escopo da V1.6 (Reveal), não desta
spec — YAGNI aqui.

## Componente

`components/countdown.tsx`, `"use client"`, sem dependência externa:

```ts
function useCountdown(dataISO: string) {
  const [restante, setRestante] = useState<null | {
    dias: number; horas: number; minutos: number; segundos: number;
  }>(null);

  useEffect(() => {
    const alvo = new Date(`${dataISO}T00:00:00-03:00`).getTime();
    const tick = () => {
      const diff = Math.max(0, alvo - Date.now());
      setRestante({
        dias: Math.floor(diff / 86400000),
        horas: Math.floor((diff / 3600000) % 24),
        minutos: Math.floor((diff / 60000) % 60),
        segundos: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [dataISO]);

  return restante;
}
```

Fuso horário: `-03:00` (Brasília) fixo — o evento é local, sem necessidade de
detectar fuso do visitante.

## Critério de pronto

- Trocar a data é editar só `data/evento.ts` (os dois campos, ISO e
  exibição).
- Sem aviso de divergência de hidratação no console.
- Leitor de tela anuncia o prazo uma vez ao focar o componente, nunca a cada
  segundo.
- CLS < 0,1 mesmo com o conteúdo mudando de placeholder para número real.
- A palavra "previsão"/"prevista" nunca se separa do número, em nenhum canal.
