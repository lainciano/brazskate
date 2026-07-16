"use client";

import Image from "next/image";
import { useCallback } from "react";
import { useMotion, type Gsap } from "@/lib/motion";
import { Botao } from "./botao";
import { Grao } from "./grao";
import { RabiscoSublinhado } from "./rabiscos";
import { StickerBadge } from "./sticker-badge";

// Hero cartaz (docs/05-DESIGN.md §4.1): 100% gráfico, sangrando nas bordas,
// com slot de foto preparado (§4.2) — quando a foto própria da pista existir
// (pendência I2), ela entra em duotone + scrim via `fotoSrc`, as formas
// geométricas saem e tipografia/sticker/CTAs não mudam.
export function Hero({ fotoSrc }: { fotoSrc?: string }) {
  const montar = useCallback((gsap: Gsap, escopo: HTMLElement) => {
    // linguagem "tinta fresca seca rápido" (§6.1): stencil, carimbo, stagger
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(escopo.querySelector("[data-hero-titulo]"), {
      clipPath: "inset(100% 0 0 0)",
      duration: 0.5,
    })
      .from(
        escopo.querySelector("[data-hero-sticker]"),
        { scale: 1.15, opacity: 0, duration: 0.35, ease: "back.out(1.7)" },
        "-=0.1",
      )
      .from(
        escopo.querySelectorAll("[data-hero-item]"),
        { y: 16, opacity: 0, duration: 0.45, stagger: 0.08 },
        "-=0.15",
      );

    // o rabisco se desenha (§6.1): stroke-dashoffset após o load
    escopo
      .querySelectorAll<SVGPathElement>("[data-hero-rabisco] path")
      .forEach((traco) => {
        const comprimento = traco.getTotalLength();
        gsap.fromTo(
          traco,
          { strokeDasharray: comprimento, strokeDashoffset: comprimento },
          {
            strokeDashoffset: 0,
            duration: 0.6,
            delay: 0.3,
            ease: "power2.out",
          },
        );
      });
  }, []);

  const escopoRef = useMotion<HTMLElement>(montar);

  return (
    <section
      ref={escopoRef}
      className="registro-asfalto relative flex min-h-[calc(100svh-4rem)] flex-col justify-center overflow-hidden"
    >
      {fotoSrc ? (
        // camada de foto com tratamento de marca (§4.2): duotone + grão + scrim
        <div aria-hidden="true" className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element -- export estático sem otimizador; tratamento é via CSS */}
          <img
            src={fotoSrc}
            alt=""
            className="h-full w-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-vermelho-500 opacity-40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-tinta/80 via-tinta/50 to-tinta/30" />
        </div>
      ) : (
        // abstração de rampa/transição (§4.1): formas grandes recortadas nas
        // bordas — não é ilustração literal nem redesenho do logo
        <div aria-hidden="true" className="absolute inset-0">
          <div className="absolute -bottom-[34vw] -right-[16vw] h-[72vw] w-[72vw] rounded-full bg-vermelho-500" />
          <div className="absolute -left-[8vw] top-[14%] h-[max(3vw,1rem)] w-[52vw] -rotate-6 bg-rosa/80" />
        </div>
      )}
      <Grao />

      <div className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
        <Image
          data-hero-item
          src="/logo.png"
          alt=""
          width={88}
          height={88}
          priority
          className="rotate-3 rounded-full shadow-sticker"
        />

        <p
          data-hero-item
          className="mt-8 text-[0.8125rem] font-semibold uppercase tracking-[0.1em] text-rosa"
        >
          Campeonato de skate · Brazlândia-DF
        </p>

        <h1
          data-hero-titulo
          style={{ clipPath: "inset(0% 0 0 0)" }}
          className="mt-3 font-display text-[clamp(3rem,11vw,6.5rem)] uppercase leading-[0.95]"
        >
          Braz
          <br />
          Skate
        </h1>

        <span data-hero-rabisco className="mt-2 block w-56 max-w-[60vw] text-vermelho-500">
          <RabiscoSublinhado className="h-4 w-full" />
        </span>

        <div data-hero-sticker className="mt-8 w-fit">
          <StickerBadge variante="data">Data a confirmar</StickerBadge>
        </div>

        <p
          data-hero-item
          className="mt-6 max-w-[34ch] text-lg leading-[1.55] text-(--fg-secundario)"
        >
          Na pista de Brazlândia, à beira do lago — a cena de volta ao
          campeonato.
        </p>

        <div data-hero-item className="mt-10 flex flex-wrap items-center gap-4">
          <Botao href="#categorias">Quero competir</Botao>
          <Botao href="#patrocinio" variante="secundario">
            Seja um patrocinador
          </Botao>
        </div>

        <div data-hero-item className="mt-5 flex flex-wrap items-center gap-4">
          <Botao href="#apoie" variante="terciario">
            Apoie via Pix
          </Botao>
          <StickerBadge variante="breve">Pré-inscrição em breve</StickerBadge>
        </div>
      </div>
    </section>
  );
}
