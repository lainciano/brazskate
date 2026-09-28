"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { Lightbox } from "./lightbox";
import type { FotoEvento } from "@/data/gallery";

// Grade em colagem da galeria pós-evento (docs/superpowers/specs/
// 2026-09-27-pos-evento-galeria-resultados-design.md §4.2). Cada item é
// um <button> — progressive enhancement: sem JS, cada um também é um
// <a> pra imagem 1600w (o <button> vira um link real quando JS não
// rodou, já que Next faz SSR/SSG do markup). Array vazio não renderiza
// nada (anti-casca-vazia, padrão D57).
//
// `onFechar`/`onNavegar` em useCallback (não closures inline): os efeitos
// internos do Lightbox dependem da identidade dessas callbacks (ver
// components/lightbox.tsx, array de deps do listener de teclado), mesmo
// padrão de hooks/use-menu-overlay.ts (`abrir`/`fechar`).
export function GaleriaGrade({ fotos }: { fotos: readonly FotoEvento[] }) {
  const [indiceAberto, setIndiceAberto] = useState<number | null>(null);
  const botoesRef = useRef<(HTMLButtonElement | null)[]>([]);
  const origemRef = useRef<HTMLElement | null>(null);

  const abrir = useCallback((indice: number) => {
    origemRef.current = botoesRef.current[indice];
    setIndiceAberto(indice);
  }, []);

  const fechar = useCallback(() => {
    setIndiceAberto(null);
  }, []);

  const navegar = useCallback((proximoIndice: number) => {
    origemRef.current = botoesRef.current[proximoIndice];
    setIndiceAberto(proximoIndice);
  }, []);

  if (fotos.length === 0) return null;

  return (
    <>
      <div data-reveal className="grid grid-cols-3 gap-1.5">
        {fotos.map((foto, indice) => (
          <button
            key={foto.src}
            ref={(el) => {
              botoesRef.current[indice] = el;
            }}
            type="button"
            onClick={() => abrir(indice)}
            aria-label={`Ver foto: ${foto.alt}`}
            data-carimbo
            className="relative aspect-square overflow-hidden focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-azul-600 focus-visible:outline-offset-2"
          >
            <Image
              src={foto.src}
              alt=""
              fill
              sizes="(min-width: 1024px) 33vw, 33vw"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* O Lightbox é portado para <body> (ver lightbox.tsx); fica fora do div
        data-reveal por clareza: o GSAP deixa `transform` nesse div depois da
        animação de entrada. */}
    <Lightbox
        fotos={fotos}
        indiceAberto={indiceAberto}
        elementoOrigemRef={origemRef}
        onFechar={fechar}
        onNavegar={navegar}
      />
    </>
  );
}
