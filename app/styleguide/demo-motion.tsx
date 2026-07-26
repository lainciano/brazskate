"use client";

import { useCallback } from "react";
import { useMotion } from "@/lib/motion";
import { StickerBadge } from "@/components/sticker-badge";

// Demo viva do setup de motion (docs/05-DESIGN.md §6.1): "carimbada" do
// sticker e stagger de cards ao entrar na viewport. Serve de referência de
// uso do useMotion e de teste manual do reduced-motion.
export function DemoMotion() {
  const montar = useCallback(
    (gsap: typeof import("gsap")["gsap"], escopo: HTMLDivElement) => {
      gsap.from(escopo.querySelector("[data-demo-sticker]"), {
        scale: 1.15,
        opacity: 0,
        duration: 0.35,
        ease: "carimbada",
        scrollTrigger: { trigger: escopo, start: "top 85%", once: true },
      });
      gsap.from(escopo.querySelectorAll("[data-demo-card]"), {
        y: 16,
        opacity: 0,
        duration: 0.45,
        stagger: 0.08,
        ease: "tintaSeca",
        scrollTrigger: { trigger: escopo, start: "top 85%", once: true },
      });
    },
    [],
  );

  const escopoRef = useMotion<HTMLDivElement>(montar);

  return (
    <div ref={escopoRef} className="flex flex-col gap-6">
      <div data-demo-sticker className="w-fit">
        <StickerBadge variante="data">Data a confirmar</StickerBadge>
      </div>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {["Um", "Dois", "Três"].map((rotulo) => (
          <li
            key={rotulo}
            data-demo-card
            className="rounded-card bg-(--surface) p-6 shadow-card"
          >
            <h3 className="text-[1.375rem] font-bold leading-[1.2]">
              Card {rotulo}
            </h3>
            <p className="mt-2 leading-[1.6] text-(--fg-secundario)">
              Entra com fade + deslocamento e stagger de 0.08s.
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
