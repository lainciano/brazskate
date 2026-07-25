"use client";

import { useCallback, useState } from "react";
import { termo } from "@/data/termo";

// Estado do botão de baixar o PDF do termo (D13 em docs/02-DECISOES.md;
// spec em docs/superpowers/specs/2026-07-25-termo-v1.4-design.md): idle →
// gerando → idle; erro vira estado próprio, mantendo o botão utilizável
// para tentar de novo. lib/termo-pdf.ts só é importado dentro do clique
// (import dinâmico, D19) — nunca no topo deste módulo.
export function useTermoPdf() {
  const [estado, setEstado] = useState<"idle" | "gerando" | "erro">("idle");

  const baixar = useCallback(async () => {
    setEstado("gerando");
    try {
      const { gerarTermoPdf } = await import("@/lib/termo-pdf");
      const blob = await gerarTermoPdf(termo);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "termo-de-responsabilidade-braz-skate.pdf";
      link.click();
      URL.revokeObjectURL(url);
      setEstado("idle");
    } catch {
      setEstado("erro");
    }
  }, []);

  return { estado, baixar };
}
