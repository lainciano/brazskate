"use client";

import { useEffect, useRef, type ReactNode } from "react";

// ScrollSmoother (docs/superpowers/specs/2026-07-26-gsap-avancado-parte2-design.md
// §5, decisão D23.1 em docs/02-DECISOES.md): envolve só o conteúdo do
// <main> + <Footer> — o <Header> (sticky) fica FORA deste wrapper de
// propósito, para não perder o sticky.
//
// Os dois divs (#smooth-wrapper / #smooth-content) nascem SEM nenhuma CSS
// especial — ScrollSmoother.create() aplica o `position: fixed` e o resto
// via inline style só quando o JS monta, no idle. Antes disso, o layout é
// idêntico a dois <div> comuns: zero salto visível até a suavização
// ligar (mitiga, mas não elimina, o risco documentado na spec ampla §3.2).
//
// Sob prefers-reduced-motion, o ScrollSmoother NUNCA é inicializado — o
// guardrail §6.2 exige desligamento completo (desconforto vestibular);
// os dois divs continuam como containers passivos, scroll 100% nativo.
export function SmoothScroll({ children }: { children: ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelado = false;
    let smoother: { kill: () => void } | undefined;

    const idle =
      window.requestIdleCallback?.bind(window) ??
      ((cb: () => void) => window.setTimeout(cb, 1));
    const cancelarIdle =
      window.cancelIdleCallback?.bind(window) ?? window.clearTimeout.bind(window);

    const agendado = idle(async () => {
      if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
        return;
      }

      const [{ gsap }, { ScrollTrigger }, { ScrollSmoother }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("gsap/ScrollSmoother"),
      ]);
      if (cancelado || !wrapperRef.current || !contentRef.current) return;

      gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
      smoother = ScrollSmoother.create({
        wrapper: wrapperRef.current,
        content: contentRef.current,
        smooth: 1.2,
        effects: false,
        normalizeScroll: false,
      });
    });

    return () => {
      cancelado = true;
      cancelarIdle(agendado);
      smoother?.kill();
    };
  }, []);

  return (
    <div id="smooth-wrapper" ref={wrapperRef}>
      <div id="smooth-content" ref={contentRef}>
        {children}
      </div>
    </div>
  );
}
