"use client";

import { useEffect, useRef } from "react";
import { Grao } from "./grao";

// Abertura da galeria pós-evento (docs/superpowers/specs/
// 2026-09-27-pos-evento-galeria-resultados-design.md §7). Sem
// `videoSrcMp4`/`videoSrcWebm` (pendência: trecho do drone ainda não
// escolhido, ver §8 da spec) renderiza só o poster estático — nunca um
// <video> com fonte vazia. Quando os vídeos existem: toca só quando
// visível (IntersectionObserver), pausa com a aba oculta
// (visibilitychange), e nunca toca sob prefers-reduced-motion (só o
// poster nesse caso também).
//
// Ocupa a tela inteira (h-tela = 100dvh) em qualquer proporção de monitor:
// o vídeo/poster usa object-cover, então corta as bordas em vez de exigir
// rolagem para ver o fim (o header é fixed e sobrepõe o topo).
export function LoopDrone({
  poster,
  videoSrcMp4,
  videoSrcWebm,
}: {
  poster: string;
  videoSrcMp4?: string;
  videoSrcWebm?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const temVideo = Boolean(videoSrcMp4 && videoSrcWebm);

  useEffect(() => {
    if (!temVideo || !videoRef.current) return;
    const video = videoRef.current;

    const motionPermitido = window.matchMedia(
      "(prefers-reduced-motion: no-preference)",
    ).matches;
    if (!motionPermitido) return;

    // Falha de play() (AbortError por pause() pendente, política de
    // autoplay) é ignorada: o poster continua como fallback.
    const tocar = () => {
      video.play().catch(() => {});
    };

    let visivel = false;
    const observer = new IntersectionObserver(
      (entradas) => {
        const entrada = entradas.at(-1);
        if (!entrada) return;
        visivel = entrada.isIntersecting;
        if (visivel) tocar();
        else video.pause();
      },
      { threshold: 0.25 },
    );
    observer.observe(video);

    const aoMudarVisibilidade = () => {
      if (document.visibilityState === "hidden") video.pause();
      else if (visivel) tocar();
    };
    document.addEventListener("visibilitychange", aoMudarVisibilidade);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", aoMudarVisibilidade);
    };
  }, [temVideo]);

  return (
    <div className="relative h-tela w-full overflow-hidden">
      {temVideo ? (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          poster={poster}
          className="h-full w-full object-cover"
        >
          <source src={videoSrcWebm} type="video/webm" />
          <source src={videoSrcMp4} type="video/mp4" />
        </video>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element -- poster estático de fallback; sem otimizador (output: export)
        <img src={poster} alt="" className="h-full w-full object-cover" />
      )}
      <Grao />
      <div className="absolute inset-0 bg-gradient-to-t from-tinta/85 via-tinta/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4">
        <span className="inline-block rounded-sticker bg-creme px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.08em] text-tinta">
          13.09.2026
        </span>
        <p className="mt-2 font-display text-3xl uppercase leading-none text-creme">
          Pista de Brazlândia
        </p>
      </div>
    </div>
  );
}
