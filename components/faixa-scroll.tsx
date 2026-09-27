"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { FotoEvento } from "@/data/gallery";

// Faixa horizontal com pin+scrub — ÚNICA exceção ao guardrail 4 de
// docs/05-DESIGN.md §6.2 ("sem pin, sem scrub"), registrada como D61
// (docs/02-DECISOES.md) e restrita a este componente, só em /galeria.
//
// Sem ScrollSmoother nesta rota (só a home usa <SmoothScroll>, ver
// app/page.tsx) — pinType padrão ("fixed") é suficiente, ao contrário do
// que a spec original presumia (corrigido durante a implementação, ver
// Architecture do plano). Sob prefers-reduced-motion, ou antes do JS
// carregar, a faixa é simplesmente uma <ul> com overflow-x + scroll-snap
// — sem pin, sem scrub, 100% utilizável.
export function FaixaScroll({ fotos }: { fotos: readonly FotoEvento[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trilhaRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!containerRef.current || !trilhaRef.current) return;
    let cancelado = false;
    let scrollTriggerInstancia: { kill: () => void } | undefined;

    const motionPermitido =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
    if (!motionPermitido) return;

    const idle =
      window.requestIdleCallback?.bind(window) ??
      ((cb: () => void) => window.setTimeout(cb, 1));

    const agendado = idle(async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelado || !containerRef.current || !trilhaRef.current) return;

      gsap.registerPlugin(ScrollTrigger);
      const distancia = trilhaRef.current.scrollWidth - containerRef.current.clientWidth;
      if (distancia <= 0) return; // faixa curta: nada a rolar, pin desnecessário

      const tween = gsap.to(trilhaRef.current, {
        x: -distancia,
        ease: "none",
      });
      scrollTriggerInstancia = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${distancia}`,
        pin: true,
        scrub: 1,
        animation: tween,
      });
    });

    return () => {
      cancelado = true;
      scrollTriggerInstancia?.kill();
    };
  }, []);

  if (fotos.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className="overflow-x-auto motion-safe:overflow-x-hidden"
    >
      <ul
        ref={trilhaRef}
        className="flex gap-2 snap-x snap-mandatory motion-safe:snap-none"
      >
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
