"use client";

import { useCallback, type ReactNode } from "react";
import { useMotion, type Gsap } from "@/lib/motion";

// Entrada padrão de conteúdo de seção (docs/05-DESIGN.md §6.1): fade +
// deslocamento com stagger, uma vez só, ao entrar na viewport. Marque os
// filhos a animar com data-reveal — sem a marca, nada anima.
//
// Dois seletores adicionais (V1.6, motion residual — 25/07/2026), o mesmo
// tratamento que o hero já aplicava isoladamente:
// - data-stencil: "stencil puxado" (clip-path), para títulos de seção.
// - data-carimbo: "carimbada" (scale + back.out), para stickers fora do hero.
// Ambos rodam independentes do stagger de data-reveal — gsap.from em
// NodeList vazia é no-op, então seções sem um dos dois marcadores não
// quebram.
export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const montar = useCallback((gsap: Gsap, escopo: HTMLDivElement) => {
    // Objeto novo por chamada — o GSAP associa a animação ao próprio objeto
    // de config; reusar a mesma referência entre os três .from() faria a
    // segunda/terceira herdar estado da primeira.
    const scrollTrigger = () => ({
      trigger: escopo,
      start: "top 80%",
      once: true,
    });

    gsap.from(escopo.querySelectorAll("[data-reveal]"), {
      y: 16,
      opacity: 0,
      duration: 0.45,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: scrollTrigger(),
    });

    gsap.from(escopo.querySelectorAll("[data-stencil]"), {
      clipPath: "inset(100% 0 0 0)",
      duration: 0.5,
      ease: "power3.out",
      scrollTrigger: scrollTrigger(),
    });

    gsap.from(escopo.querySelectorAll("[data-carimbo]"), {
      scale: 1.15,
      opacity: 0,
      duration: 0.35,
      ease: "back.out(1.7)",
      scrollTrigger: scrollTrigger(),
    });
  }, []);

  const escopoRef = useMotion<HTMLDivElement>(montar);

  return (
    <div ref={escopoRef} className={className}>
      {children}
    </div>
  );
}
