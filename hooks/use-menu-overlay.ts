"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Estado e comportamento do overlay do menu mobile, isolado da visão
// conforme D13 (docs/02-DECISOES.md): foco preso no overlay, Esc fecha,
// scroll do body travado, primeiro foco no X e retorno ao hambúrguer.
export function useMenuOverlay() {
  const [aberto, setAberto] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const botaoFecharRef = useRef<HTMLButtonElement>(null);
  const botaoAbrirRef = useRef<HTMLButtonElement>(null);

  const abrir = useCallback(() => setAberto(true), []);

  const fechar = useCallback(() => {
    setAberto(false);
    botaoAbrirRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!aberto) return;

    botaoFecharRef.current?.focus();
    document.body.style.overflow = "hidden";

    const aoTeclar = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") {
        fechar();
        return;
      }
      if (evento.key !== "Tab") return;

      const focaveis = overlayRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (!focaveis?.length) return;

      const primeiro = focaveis[0];
      const ultimo = focaveis[focaveis.length - 1];

      if (evento.shiftKey && document.activeElement === primeiro) {
        evento.preventDefault();
        ultimo.focus();
      } else if (!evento.shiftKey && document.activeElement === ultimo) {
        evento.preventDefault();
        primeiro.focus();
      }
    };

    document.addEventListener("keydown", aoTeclar);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", aoTeclar);
    };
  }, [aberto, fechar]);

  return { aberto, abrir, fechar, overlayRef, botaoFecharRef, botaoAbrirRef };
}
