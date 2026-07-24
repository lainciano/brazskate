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
        // abstração de rampa/transição (§4.1): selo da logo (pin) em
        // vermelho-500 — recorte via mask, não PNG colorido
        <div aria-hidden="true" className="absolute inset-0">
          <div
            className="absolute -bottom-[34vw] -right-[16vw] h-[72vw] w-[72vw] bg-vermelho-500 [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
            style={{ maskImage: "url(/logo-pin.png)" }}
          />
          <div className="absolute -left-[8vw] top-[14%] h-[max(3vw,1rem)] w-[52vw] -rotate-6 bg-rosa/80" />
        </div>
      )}
      <Grao />

      <div className="relative mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-20">
        <p
          data-hero-item
          className="text-[0.8125rem] font-semibold uppercase tracking-[0.1em] text-rosa"
        >
          Campeonato de skate · Brazlândia-DF
        </p>

        <h1
          data-hero-titulo
          style={{ clipPath: "inset(0% 0 0 0)" }}
          className="mt-3"
        >
          <Image
            src="/logo-completa.png"
            alt="Braz Skate"
            width={1224}
            height={902}
            priority
            className="h-auto w-[clamp(12rem,38vw,14rem)]"
          />
        </h1>

        <span data-hero-rabisco className="mt-2 block w-56 max-w-[60vw] text-vermelho-500">
          <RabiscoSublinhado className="h-4 w-full" />
        </span>

        <div data-hero-sticker className="mt-4 w-fit sm:mt-8">
          <StickerBadge variante="data">Data a confirmar</StickerBadge>
        </div>

        <p
          data-hero-item
          className="mt-3 max-w-[34ch] text-base leading-[1.5] text-(--fg-secundario) sm:mt-6 sm:text-lg sm:leading-[1.55]"
        >
          Na pista de Brazlândia, à beira do lago — a cena de volta ao
          campeonato.
        </p>

        <div data-hero-item className="mt-4 flex flex-wrap items-center gap-2 sm:mt-10 sm:gap-4">
          <Botao href="#categorias">Quero competir</Botao>
          <Botao href="#patrocinio" variante="secundario">
            Seja um patrocinador
          </Botao>
        </div>

        <div data-hero-item className="mt-3 flex flex-col items-start gap-2 sm:mt-5 sm:flex-row sm:items-center sm:gap-4">
          <Botao href="#apoie" variante="terciario">
            Apoie via Pix
          </Botao>
          <StickerBadge variante="breve">Pré-inscrição em breve</StickerBadge>
        </div>
      </div>
    </section>
  );
}
