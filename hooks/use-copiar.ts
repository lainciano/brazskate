"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Estado do botão de copiar (D13 em docs/02-DECISOES.md; §3.7 do design):
// idle → copiado (2s) → idle; falha de clipboard vira estado próprio para a
// visão expor a chave completa selecionável como fallback.
export function useCopiar(texto: string) {
  const [estado, setEstado] = useState<"idle" | "copiado" | "falhou">("idle");
  const timeoutRef = useRef<number | undefined>(undefined);

  const copiar = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(texto);
      setEstado("copiado");
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => setEstado("idle"), 2000);
    } catch {
      setEstado("falhou");
    }
  }, [texto]);

  useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

  return { estado, copiar };
}
