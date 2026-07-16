"use client";

import { useCallback, type ReactNode } from "react";
import { useMotion, type Gsap } from "@/lib/motion";

// Entrada padrão de conteúdo de seção (docs/05-DESIGN.md §6.1): fade +
// deslocamento com stagger, uma vez só, ao entrar na viewport. Marque os
// filhos a animar com data-reveal — sem a marca, nada anima.
export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const montar = useCallback((gsap: Gsap, escopo: HTMLDivElement) => {
    gsap.from(escopo.querySelectorAll("[data-reveal]"), {
      y: 16,
      opacity: 0,
      duration: 0.45,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: { trigger: escopo, start: "top 80%", once: true },
    });
  }, []);

  const escopoRef = useMotion<HTMLDivElement>(montar);

  return (
    <div ref={escopoRef} className={className}>
      {children}
    </div>
  );
}
