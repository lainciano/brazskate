"use client";

import { useCallback, type ReactNode } from "react";
import { useMotion, type Gsap } from "@/lib/motion";

// Entrada padrão de conteúdo de seção (docs/05-DESIGN.md §6.1): fade +
// deslocamento com stagger, uma vez só, ao entrar na viewport. Marque os
// filhos a animar com data-reveal — sem a marca, nada anima.
//
// Marcadores disponíveis (todos opcionais e independentes):
// - data-reveal:   fade + y, com stagger (entrada padrão)
// - data-stencil:  "stencil puxado" (clip-path), para títulos de seção
// - data-carimbo:  "carimbada" (scale + back.out), para stickers
// - data-parallax: deriva lenta no scroll (scrub leve, só transform)
//
// O §6.2 proíbe `pin` e `scrub` PESADO — a deriva abaixo é o caso leve:
// distância curta, só `y`, `ease: none`, sem travar o scroll em momento
// nenhum. Some por completo com prefers-reduced-motion (gsap.matchMedia
// em lib/motion.ts), como todo o resto.
export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const montar = useCallback((gsap: Gsap, escopo: HTMLDivElement) => {
    // NodeList vazia faz o GSAP avisar "target not found" no console —
    // consultar antes evita o ruído em seções que não usam um marcador.
    const alvos = (seletor: string) => {
      const nos = escopo.querySelectorAll(seletor);
      return nos.length > 0 ? nos : null;
    };

    // Objeto novo por chamada — o GSAP associa a animação ao próprio objeto
    // de config; reusar a mesma referência entre os .from() faria a
    // segunda/terceira herdar estado da primeira.
    const entrada = () => ({
      trigger: escopo,
      start: "top 80%",
      once: true,
    });

    const reveal = alvos("[data-reveal]");
    if (reveal) {
      gsap.from(reveal, {
        y: 16,
        opacity: 0,
        duration: 0.45,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: entrada(),
      });
    }

    const stencil = alvos("[data-stencil]");
    if (stencil) {
      gsap.from(stencil, {
        clipPath: "inset(100% 0 0 0)",
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: entrada(),
      });
    }

    const carimbo = alvos("[data-carimbo]");
    if (carimbo) {
      gsap.from(carimbo, {
        scale: 1.15,
        opacity: 0,
        duration: 0.35,
        ease: "back.out(1.7)",
        scrollTrigger: entrada(),
      });
    }

    const parallax = alvos("[data-parallax]");
    if (parallax) {
      gsap.to(parallax, {
        y: -32,
        ease: "none",
        scrollTrigger: {
          trigger: escopo,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }
  }, []);

  const escopoRef = useMotion<HTMLDivElement>(montar);

  return (
    <div ref={escopoRef} className={className}>
      {children}
    </div>
  );
}
