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
// - data-carimbo:  "carimbada" (scale + elastic.out), para stickers
// - data-parallax: deriva lenta no scroll (scrub leve, só transform)
// - data-rabisco:  traço se desenha (DrawSVGPlugin), para rabiscos SVG
// - data-split-lead: reveal por palavra (SplitText), para o lead do SectionHeader
// - data-scramble: embaralha até assentar no texto original (ScrambleTextPlugin)
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
        ease: "tintaSeca",
        scrollTrigger: entrada(),
      });
    }

    const stencil = alvos("[data-stencil]");
    if (stencil) {
      gsap.from(stencil, {
        clipPath: "inset(100% 0 0 0)",
        duration: 0.5,
        ease: "tintaSeca",
        scrollTrigger: entrada(),
      });
    }

    const carimbo = alvos("[data-carimbo]");
    if (carimbo) {
      gsap.from(carimbo, {
        scale: 1.15,
        opacity: 0,
        duration: 0.35,
        ease: "elastic.out(1, 0.6)",
        scrollTrigger: entrada(),
      });
    }

    // traço se desenha ao entrar (DrawSVGPlugin) — mesma marca de "traço à
    // mão" do rabisco do hero, aplicada ao sublinhado do SectionHeader
    const rabisco = alvos("[data-rabisco] path");
    if (rabisco) {
      gsap.fromTo(
        rabisco,
        { drawSVG: "0%" },
        { drawSVG: "100%", duration: 0.5, ease: "power2.out", scrollTrigger: entrada() },
      );
    }

    // lead splita por palavra (SplitText) e revela com stagger sutil — só
    // depois que a fonte carregou de verdade, senão a métrica do split
    // fica errada e reflui na troca (docs/superpowers/specs/
    // 2026-07-26-gsap-avancado-parte2-design.md §1)
    const splitLead = alvos("[data-split-lead]");
    if (splitLead) {
      document.fonts.ready.then(async () => {
        if (!escopo.isConnected) return;
        const { SplitText } = await import("gsap/SplitText");
        splitLead.forEach((no) => {
          const split = new SplitText(no as HTMLElement, { type: "words" });
          gsap.from(split.words, {
            opacity: 0,
            y: 8,
            duration: 0.4,
            stagger: 0.03,
            ease: "tintaSeca",
            scrollTrigger: entrada(),
          });
        });
      });
    }

    // sticker "em breve" embaralha até assentar no texto original —
    // "{original}" evita capturar/reescrever o textContent na mão
    const scramble = alvos("[data-scramble]");
    if (scramble) {
      gsap.to(scramble, {
        duration: 0.8,
        scrambleText: "{original}",
        scrollTrigger: entrada(),
      });
    }

    // chevron do FAQ morfa "+" (fechado) ⇄ "−" (aberto) no toggle nativo do
    // <details> — MorphSVGPlugin já registrado no idle (lib/motion.ts)
    const detalhes = escopo.querySelectorAll("details");
    detalhes.forEach((detEl) => {
      const path = detEl.querySelector<SVGPathElement>("[data-morph-chevron] path");
      if (!path) return;
      detEl.addEventListener("toggle", () => {
        gsap.to(path, {
          duration: 0.3,
          morphSVG: detEl.open ? "M3 8h10" : "M8 3v10M3 8h10",
          ease: "power2.inOut",
        });
      });
    });

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
