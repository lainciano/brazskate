"use client";

import { useEffect, useRef } from "react";

export type Gsap = typeof import("gsap")["gsap"];

// Setup de motion aprovado (docs/05-DESIGN.md §6.2): gsap core +
// ScrollTrigger + os plugins liberados pela emenda D23 (docs/02-DECISOES.md)
// — CustomEase, DrawSVGPlugin, SplitText, MorphSVGPlugin, ScrambleTextPlugin
// (conteúdo, no idle) e Flip (interação do menu, sob demanda via
// `carregarFlip()`). Guardrails embutidos:
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
      const [
        { gsap },
        { ScrollTrigger },
        { CustomEase },
        { DrawSVGPlugin },
        { SplitText },
        { MorphSVGPlugin },
        { ScrambleTextPlugin },
      ] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("gsap/CustomEase"),
        import("gsap/DrawSVGPlugin"),
        import("gsap/SplitText"),
        import("gsap/MorphSVGPlugin"),
        import("gsap/ScrambleTextPlugin"),
      ]);
      if (cancelado || !escopoRef.current) return;

      gsap.registerPlugin(
        ScrollTrigger,
        CustomEase,
        DrawSVGPlugin,
        SplitText,
        MorphSVGPlugin,
        ScrambleTextPlugin,
      );
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

// Salto de âncora ciente do ScrollSmoother (D23.1): um <a href="#id">
// nativo não passa pelo rastreamento interno de posição do ScrollSmoother —
// a página pula visualmente até a seção, mas window.scrollY nunca é
// atualizado, então qualquer lógica que dependa dele (ex.: a opacidade do
// fundo do Header em scroll) fica presa no estado de topo de página, mesmo
// depois do salto. `smoother.scrollTo()` resolve os dois problemas de uma
// vez, porque passa pelo mesmo pipeline que o scroll de mouse/touch usa
// (por isso ESSE sim sincroniza window.scrollY corretamente). Sem
// ScrollSmoother ativo (reduced-motion, ou clique antes do idle-init que
// monta o smoother), cai no scrollIntoView nativo — sem offset de header
// fixo aí, então os alvos precisam de `scroll-margin-top` em CSS.
export async function irParaAncora(alvo: Element, offsetPx = 0) {
  const { ScrollSmoother } = await import("gsap/ScrollSmoother");
  const smoother = ScrollSmoother.get();
  if (smoother) {
    smoother.scrollTo(smoother.offset(alvo, "top top") - offsetPx, true);
    return;
  }
  alvo.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Flip + Observer são carregados sob demanda (não no idle da página)
// porque só são usados em interação — o menu mobile (Flip apenas,
// docs/superpowers/specs/2026-07-26-gsap-avancado-parte2-design.md §2) e
// o lightbox da galeria pós-evento (Flip + Observer, docs/superpowers/
// specs/2026-09-27-pos-evento-galeria-resultados-design.md §5). `gsap`
// core já deve estar carregado antes (via alguma instância de `useMotion`
// na página), mas o import é idempotente — reimportar um módulo já
// resolvido só devolve o cache. Observer vem sempre junto: o único
// consumidor de Observer (lightbox) também precisa do Flip, e carregar
// os dois numa função só evita um segundo Promise.all no chamador.
export async function carregarFlip() {
  const [{ gsap }, { Flip }, { Observer }] = await Promise.all([
    import("gsap"),
    import("gsap/Flip"),
    import("gsap/Observer"),
  ]);
  gsap.registerPlugin(Flip, Observer);
  return { gsap, Flip, Observer };
}
