"use client";

import { useEffect, useRef } from "react";

type Gsap = typeof import("gsap")["gsap"];

// Setup de motion aprovado (docs/05-DESIGN.md §6.2): gsap core +
// ScrollTrigger, nada além. Guardrails embutidos:
// - lazy-init no idle, depois da hidratação — nunca bloqueia o primeiro paint;
// - reduced-motion via gsap.matchMedia — com a preferência ativa nada roda,
//   e o DOM já nasce no estado final (animação é revelação, só transform/opacity);
// - cleanup automático via revert() ao desmontar.
//
// `montar` precisa ser estável (useCallback ou função de módulo) — ele é
// dependência do efeito.
export function useMotion<T extends HTMLElement = HTMLDivElement>(
  montar: (gsap: Gsap, escopo: T) => void,
) {
  const escopoRef = useRef<T>(null);

  useEffect(() => {
    let cancelado = false;
    let contexto: { revert: () => void } | undefined;

    const idle =
      window.requestIdleCallback?.bind(window) ??
      ((cb: () => void) => window.setTimeout(cb, 1));
    const cancelarIdle =
      window.cancelIdleCallback?.bind(window) ?? window.clearTimeout.bind(window);

    const agendado = idle(async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelado || !escopoRef.current) return;

      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia(escopoRef.current);
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        montar(gsap, escopoRef.current as T);
      });
      contexto = mm;
    });

    return () => {
      cancelado = true;
      cancelarIdle(agendado);
      contexto?.revert();
    };
  }, [montar]);

  return escopoRef;
}
