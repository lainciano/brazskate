"use client";

import { useEffect, useRef } from "react";

export type Gsap = typeof import("gsap")["gsap"];

// Setup de motion aprovado (docs/05-DESIGN.md §6.2): gsap core +
// ScrollTrigger + os plugins liberados pela emenda D23 (docs/02-DECISOES.md)
// — nesta sub-etapa, CustomEase, DrawSVGPlugin e CustomWiggle. Guardrails
// embutidos:
// - lazy-init no idle, depois da hidratação — nunca bloqueia o primeiro paint;
// - reduced-motion via gsap.matchMedia — com a preferência ativa nada roda,
//   e o DOM já nasce no estado final (animação é revelação, só transform/opacity);
// - cleanup automático via revert() ao desmontar.
// Todo plugin novo entra por este mesmo import dinâmico — nunca no bundle
// inicial (§6.2 nº 3).
//
// `montar` precisa ser estável (useCallback ou função de módulo) — ele é
// dependência do efeito.
//
// Eases próprias do projeto (docs/superpowers/specs/2026-07-26-gsap-fundacao-motion-design.md):
// - "tintaSeca": entrada padrão de conteúdo — substitui power3.out genérico.
// A "carimbada" de sticker usa a ease NATIVA "elastic.out(1, 0.6)" (sem
// plugin, usada direto como string nos tweens) — CustomWiggle.create() foi
// tentado e DESCARTADO: quebra em runtime neste bundle ESM (sem
// window.gsap), travando o tween que a usa em opacity:0 permanentemente,
// sem erro visível no console. Confirmado com reprodução isolada
// (Node + Playwright/Firefox) nesta sessão.
// Eases registradas uma vez por montagem; recriar é idempotente (GSAP sobrescreve).
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
      const [{ gsap }, { ScrollTrigger }, { CustomEase }, { DrawSVGPlugin }] =
        await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
          import("gsap/CustomEase"),
          import("gsap/DrawSVGPlugin"),
        ]);
      if (cancelado || !escopoRef.current) return;

      gsap.registerPlugin(ScrollTrigger, CustomEase, DrawSVGPlugin);
      CustomEase.create("tintaSeca", "0.16, 1, 0.3, 1");

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
