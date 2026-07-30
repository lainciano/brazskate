"use client";

import Image from "next/image";
import { useCallback } from "react";
import { evento } from "@/data/evento";
import { useMotion, type Gsap } from "@/lib/motion";
import { Botao } from "./botao";
import { Countdown } from "./countdown";
import { Grao } from "./grao";
import { RabiscoSublinhado } from "./rabiscos";
import { StickerBadge } from "./sticker-badge";

// Hero cartaz (docs/05-DESIGN.md §4.1): 100% gráfico, sangrando nas bordas,
// com slot de foto preparado (§4.2) — quando a foto própria da pista existir
// (pendência I2), ela entra em duotone + scrim via `fotoSrc`, as formas
// geométricas saem e tipografia/sticker/CTAs não mudam.
export function Hero({ fotoSrc }: { fotoSrc?: string }) {
  const montar = useCallback((gsap: Gsap, escopo: HTMLElement) => {
    // Formas geométricas do fundo (§4.1): entram antes do texto, como quem
    // cola o cartaz e só depois escreve por cima. São decorativas
    // (aria-hidden), então não há risco de acessibilidade em animá-las.
    // Só existem quando NÃO há foto (o slot de foto as substitui, §4.2) —
    // por isso a consulta é guardada.
    const selo = escopo.querySelector("[data-hero-selo]");
    const faixa = escopo.querySelector("[data-hero-faixa]");

    if (selo) {
      gsap.from(selo, {
        scale: 0.82,
        rotate: -12,
        opacity: 0,
        duration: 0.9,
        ease: "tintaSeca",
      });
      // deriva no scroll: o selo sobe mais devagar que a página, dando
      // profundidade ao cartaz (scrub leve, só transform — §6.2)
      gsap.to(selo, {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: escopo,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }

    if (faixa) {
      // A faixa rosa é pincelada da esquerda para a direita.
      // A origem do transform NÃO entra aqui: ela vive no CSS (origin-left
      // no className). Setar transformOrigin só durante o tween fazia o
      // GSAP devolver a origem ao centro ao terminar — e como a faixa é
      // rotacionada (-rotate-6), trocar o pivô move a barra visualmente,
      // produzindo um "pulo" para baixo no fim da animação.
      gsap.from(faixa, {
        scaleX: 0,
        duration: 0.7,
        delay: 0.15,
        ease: "tintaSeca",
      });
      gsap.to(faixa, {
        y: -28,
        ease: "none",
        scrollTrigger: {
          trigger: escopo,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }

    // linguagem "tinta fresca seca rápido" (§6.1): stencil, carimbo, stagger
    const tl = gsap.timeline({ defaults: { ease: "tintaSeca" } });
    tl.from(escopo.querySelector("[data-hero-titulo]"), {
      clipPath: "inset(100% 0 0 0)",
      duration: 0.5,
    })
      .from(
        escopo.querySelector("[data-hero-sticker]"),
        { scale: 1.15, opacity: 0, duration: 0.35, ease: "elastic.out(1, 0.6)" },
        "-=0.1",
      )
      .from(
        escopo.querySelectorAll("[data-hero-item]"),
        { y: 16, opacity: 0, duration: 0.45, stagger: 0.08 },
        "-=0.15",
      );

    // o rabisco se desenha (§6.1) via DrawSVGPlugin — substitui o cálculo
    // manual de getTotalLength()/strokeDashoffset (docs/superpowers/specs/
    // 2026-07-26-gsap-fundacao-motion-design.md §4)
    gsap.fromTo(
      escopo.querySelectorAll("[data-hero-rabisco] path"),
      { drawSVG: "0%" },
      { drawSVG: "100%", duration: 0.6, delay: 0.3, ease: "power2.out" },
    );
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
        //
        // z-10 AQUI no wrapper (não só no filho) é o que de fato compara
        // contra o z-20 do <div> de conteúdo abaixo — os dois são filhos
        // diretos da <section>, mesmo contexto de empilhamento. Um z-index
        // só no filho interno (data-hero-selo) NÃO tem efeito nenhum contra
        // elementos fora deste wrapper (docs/superpowers/specs/
        // 2026-07-26-hero-selo-sobreposicao-design.md §1) — era exatamente
        // o bug que fazia o selo nunca sobrepor nada.
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10">
          {/* pointer-events-none no pai é obrigatório: sem isso o selo
              cobriria os CTAs e engoliria os cliques. */}
          <div
            data-hero-selo
            className="absolute -bottom-[24vw] -right-[6vw] h-[72vw] w-[72vw] bg-vermelho-500 [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
            style={{ maskImage: "url(/logo-pin.png)" }}
          />
          <div
            data-hero-faixa
            className="absolute -left-[8vw] top-[14%] hidden h-[max(3vw,1rem)] w-[52vw] origin-left -rotate-6 bg-rosa/80 sm:block"
          />
        </div>
      )}
      <Grao />

      {/* z-20: sempre acima do selo (z-10) — texto/CTA nunca perdem
          contraste, não importa quanto o selo cruze visualmente esta área */}
      <div className="relative z-20 mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-20">
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
            className="h-auto w-[clamp(10rem,38vw,14rem)]"
          />
        </h1>

        <span data-hero-rabisco className="mt-2 block w-56 max-w-[60vw] text-vermelho-500">
          <RabiscoSublinhado className="h-4 w-full" />
        </span>

        <div
          data-hero-sticker
          className="mt-4 flex flex-wrap items-center gap-4 sm:mt-8"
        >
          <StickerBadge variante="data">
            Data: {evento.dataPrevistaCurta}
          </StickerBadge>
          <Countdown />
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
          <StickerBadge
            variante="breve"
            className="animate-sticker-pulse motion-reduce:animate-none"
          >
            Inscrição: previsão {evento.inscricaoAbrePrevistaCurta}
          </StickerBadge>
        </div>
      </div>
    </section>
  );
}
