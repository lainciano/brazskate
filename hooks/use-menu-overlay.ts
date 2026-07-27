"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Flip as FlipNamespace } from "gsap/Flip";
import { carregarFlip } from "@/lib/motion";

// Estado e comportamento do overlay do menu mobile, isolado da visão
// conforme D13 (docs/02-DECISOES.md): foco preso no overlay, Esc fecha,
// scroll do body travado, primeiro foco no X e retorno ao hambúrguer.
//
// Flip (docs/superpowers/specs/2026-07-26-gsap-avancado-parte2-design.md
// §2): o hambúrguer "cresce" até virar o overlay full-screen. Captura o
// estado do botão ANTES de abrir; depois que o overlay monta, aplica esse
// estado como ponto de partida do overlay (Flip.from com `targets`) e
// anima até a posição/tamanho natural (full-screen). Só a entrada usa
// Flip — fechar continua instantâneo (remoção condicional do DOM).
// Sob prefers-reduced-motion, pula o Flip inteiro: abre direto, sem
// captura nem animação (guardrail §6.2).
export function useMenuOverlay() {
  const [aberto, setAberto] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const botaoFecharRef = useRef<HTMLButtonElement>(null);
  const botaoAbrirRef = useRef<HTMLButtonElement>(null);
  const estadoFlipRef = useRef<ReturnType<typeof FlipNamespace.getState> | null>(null);

  const abrir = useCallback(async () => {
    const motionPermitido =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

    if (motionPermitido && botaoAbrirRef.current) {
      const { Flip } = await carregarFlip();
      estadoFlipRef.current = Flip.getState(botaoAbrirRef.current);
    }
    setAberto(true);
  }, []);

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

  useEffect(() => {
    if (!aberto || !estadoFlipRef.current || !overlayRef.current) return;
    let cancelado = false;

    carregarFlip().then(({ Flip }) => {
      if (cancelado || !overlayRef.current || !estadoFlipRef.current) return;
      Flip.from(estadoFlipRef.current, {
        targets: overlayRef.current,
        duration: 0.4,
        ease: "power3.inOut",
        absolute: true,
      });
      estadoFlipRef.current = null;
    });

    return () => {
      cancelado = true;
    };
  }, [aberto]);

  return { aberto, abrir, fechar, overlayRef, botaoFecharRef, botaoAbrirRef };
}
