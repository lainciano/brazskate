"use client";

import { useCallback, useRef, useSyncExternalStore } from "react";
import { evento } from "@/data/evento";

// Countdown do hero (docs/05-DESIGN.md, V1.5): dígitos aria-hidden (mudam a
// cada segundo, sem gerar anúncio) + resumo sr-only que só recalcula por
// dia — leitor de tela não pode ser inundado a cada tick (spec
// 2026-07-25-countdown-v1.5-design.md). useSyncExternalStore modela o
// relógio como sistema externo (o padrão do React para isso, em vez de
// useEffect + setState): getServerSnapshot devolve null, garantindo que o
// build estático (output: 'export') e a primeira hidratação concordem —
// o valor real só chega depois, via subscribe.

type Restante = {
  dias: number;
  horas: number;
  minutos: number;
  segundos: number;
};

function calcularRestante(dataISO: string): Restante {
  const alvo = new Date(`${dataISO}T00:00:00-03:00`).getTime();
  const diff = Math.max(0, alvo - Date.now());
  return {
    dias: Math.floor(diff / 86400000),
    horas: Math.floor((diff / 3600000) % 24),
    minutos: Math.floor((diff / 60000) % 60),
    segundos: Math.floor((diff / 1000) % 60),
  };
}

function subscrever(callback: () => void) {
  const id = setInterval(callback, 1000);
  return () => clearInterval(id);
}

function getServerSnapshot(): Restante | null {
  return null;
}

function iguais(a: Restante, b: Restante) {
  return (
    a.dias === b.dias &&
    a.horas === b.horas &&
    a.minutos === b.minutos &&
    a.segundos === b.segundos
  );
}

function useCountdown(dataISO: string) {
  // useSyncExternalStore exige getSnapshot estável entre chamadas quando o
  // valor não mudou — sem o cache, cada tick criaria um objeto novo e o
  // React entraria em loop de re-render (getSnapshot deve ser puro e
  // memoizado, não recalculado sem comparação).
  const cacheRef = useRef<Restante | null>(null);

  const getSnapshot = useCallback(() => {
    const atual = calcularRestante(dataISO);
    if (cacheRef.current && iguais(cacheRef.current, atual)) {
      return cacheRef.current;
    }
    cacheRef.current = atual;
    return atual;
  }, [dataISO]);

  return useSyncExternalStore(subscrever, getSnapshot, getServerSnapshot);
}

const unidades: { chave: keyof Restante; label: string }[] = [
  { chave: "dias", label: "dias" },
  { chave: "horas", label: "horas" },
  { chave: "minutos", label: "min" },
  { chave: "segundos", label: "seg" },
];

export function Countdown({ className = "" }: { className?: string }) {
  const restante = useCountdown(evento.dataPrevistaISO);

  const resumo = restante
    ? `Faltam cerca de ${restante.dias} dias para ${evento.dataPrevista} — data prevista`
    : `Data prevista: ${evento.dataPrevista}`;

  return (
    <div className={className}>
      <div aria-hidden="true" className="flex items-baseline gap-3">
        {unidades.map(({ chave, label }) => (
          <div key={chave} className="flex flex-col items-center">
            <span className="min-w-[2ch] font-display text-3xl tabular-nums leading-none sm:text-4xl">
              {restante ? String(restante[chave]).padStart(2, "0") : "—"}
            </span>
            <span className="mt-1 text-[0.6875rem] uppercase tracking-[0.08em] text-(--fg-secundario)">
              {label}
            </span>
          </div>
        ))}
      </div>
      <p className="sr-only">{resumo}</p>
    </div>
  );
}
