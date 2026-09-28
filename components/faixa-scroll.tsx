"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import type { FotoEvento } from "@/data/gallery";

// Faixa horizontal com pin+scrub — ÚNICA exceção ao guardrail 4 de
// docs/05-DESIGN.md §6.2 ("sem pin, sem scrub"), registrada como D61
// (docs/02-DECISOES.md) e restrita a este componente, só em /galeria.
//
// Sem ScrollSmoother nesta rota (só a home usa <SmoothScroll>, ver
// app/page.tsx) — pinType padrão ("fixed") é suficiente.
//
// A marcação padrão é um scroller nativo (overflow-x-auto + scroll-snap), 100%
// utilizável antes do JS, sob prefers-reduced-motion, se o import do gsap
// falhar ou se não houver o que rolar. Só depois de ScrollTrigger.create ter
// dado certo o container recebe data-pinned, que troca para a apresentação
// fixada (overflow oculto, sem snap); o cleanup reverte tween, pin e atributo.
// A distância é medida por função e reavaliada a cada refresh
// (invalidateOnRefresh), então resize/orientação/breakpoint remedem.
export function FaixaScroll({ fotos }: { fotos: readonly FotoEvento[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trilhaRef = useRef<HTMLUListElement>(null);

  // useLayoutEffect (não useEffect): no unmount o React remove o container do DOM
  // ANTES dos cleanups passivos; o revert do pin (que desfaz o .pin-spacer) precisa
  // rodar antes disso, senão o removeChild falha com NotFoundError.
  useLayoutEffect(() => {
    const container = containerRef.current;
    const trilha = trilhaRef.current;
    if (!container || !trilha) return;
    let cancelado = false;
    let contexto: { revert: () => void } | undefined;

    const motionPermitido =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
    if (!motionPermitido) return;

    const distancia = () => Math.max(0, trilha.scrollWidth - container.clientWidth);

    const iniciar = async () => {
      if (cancelado) return;
      let gsap: typeof import("gsap").gsap;
      let ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger;
      try {
        [{ gsap }, { ScrollTrigger }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);
      } catch {
        return; // import falhou: a faixa segue como scroller nativo
      }
      if (cancelado) return;

      gsap.registerPlugin(ScrollTrigger);
      if (distancia() <= 0) return; // faixa curta: nada a rolar, pin desnecessário

      contexto = gsap.context(() => {
        container.scrollLeft = 0; // o tween assume a posição a partir daqui
        const tween = gsap.to(trilha, {
          x: () => -distancia(),
          ease: "none",
        });
        ScrollTrigger.create({
          trigger: container,
          start: "top top",
          end: () => `+=${distancia()}`,
          pin: true,
          scrub: 1,
          animation: tween,
          invalidateOnRefresh: true,
        });
      }, container);
      container.setAttribute("data-pinned", "");
    };

    let idleId: number | undefined;
    let timeoutId: number | undefined;
    const usouIdle = typeof window.requestIdleCallback === "function";
    if (usouIdle) {
      idleId = window.requestIdleCallback(() => void iniciar());
    } else {
      timeoutId = window.setTimeout(() => void iniciar(), 1);
    }

    return () => {
      cancelado = true;
      if (usouIdle) {
        window.cancelIdleCallback(idleId as number);
      } else {
        window.clearTimeout(timeoutId);
      }
      container.removeAttribute("data-pinned");
      contexto?.revert(); // mata tween e ScrollTrigger (kill com revert do pin)
    };
  }, []);

  if (fotos.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className="snap-x snap-mandatory overflow-x-auto data-[pinned]:snap-none data-[pinned]:overflow-x-hidden"
    >
      <ul ref={trilhaRef} className="flex gap-2">
        {fotos.map((foto) => (
          <li
            key={foto.src}
            className="relative aspect-[3/4] w-32 shrink-0 snap-start overflow-hidden sm:w-40"
          >
            <Image
              src={foto.src}
              alt={foto.alt}
              fill
              sizes="160px"
              className="object-cover"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
