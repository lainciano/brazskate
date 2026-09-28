"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { FotoGaleria } from "@/data/gallery";

// Faixa horizontal de "fotos impressas" com scroll-snap nativo,
// compartilhada pelo arquivo de 2021 (galeria-2021.tsx) e pelos destaques
// de 2026 na home (destaques-2026.tsx). Rotação fixa por índice — nunca
// Math.random() (StickerBadge §3.6, docs/05-DESIGN.md §4.3).
//
// No toque, o deslize é o scroll nativo. No desktop não há como "deslizar"
// com o mouse, então há dois caminhos extras: setas (também são o caminho
// por teclado) e arrastar com o mouse (só pointerType "mouse"; o snap é
// desligado durante o arrasto e volta ao soltar, encaixando na foto mais
// próxima). As setas só aparecem quando há para onde rolar.
//
// `aspecto` é a classe de proporção do quadro: 2021 são recortes quadrados;
// as fotos de 2026 são em maioria retrato (4/5).

const ROTACOES = ["-rotate-2", "rotate-1", "-rotate-1"];

const BOTAO_SETA =
  "flex size-11 items-center justify-center rounded-full border-2 border-(--fg) bg-transparent text-xl leading-none text-(--fg) shadow-sticker transition-opacity hover:shadow-card disabled:cursor-default disabled:opacity-30 disabled:shadow-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-azul-600 focus-visible:outline-offset-2";

export function FaixaPolaroid({
  fotos,
  aspecto = "aspect-square",
  posicaoDaImagem = "object-center",
}: {
  fotos: readonly FotoGaleria[];
  aspecto?: string;
  posicaoDaImagem?: string;
}) {
  const trilhaRef = useRef<HTMLUListElement>(null);
  const arrastoRef = useRef<{ x: number; scroll: number } | null>(null);
  const [pode, setPode] = useState({ anterior: false, proximo: false });
  const [arrastando, setArrastando] = useState(false);

  const atualizar = useCallback(() => {
    const el = trilhaRef.current;
    if (!el) return;
    setPode({
      anterior: el.scrollLeft > 4,
      proximo: el.scrollLeft + el.clientWidth < el.scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    const el = trilhaRef.current;
    if (!el) return;
    atualizar();
    const observer = new ResizeObserver(atualizar);
    observer.observe(el);
    return () => observer.disconnect();
  }, [atualizar]);

  const rolar = (sentido: 1 | -1) => {
    const el = trilhaRef.current;
    if (!el) return;
    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({
      left: sentido * el.clientWidth * 0.8,
      behavior: reduzido ? "auto" : "smooth",
    });
  };

  const aoPressionar = (evento: React.PointerEvent<HTMLUListElement>) => {
    if (evento.pointerType !== "mouse" || evento.button !== 0) return;
    const el = evento.currentTarget;
    arrastoRef.current = { x: evento.clientX, scroll: el.scrollLeft };
    el.setPointerCapture(evento.pointerId);
    setArrastando(true);
  };

  const aoMover = (evento: React.PointerEvent<HTMLUListElement>) => {
    const arrasto = arrastoRef.current;
    if (!arrasto) return;
    evento.currentTarget.scrollLeft = arrasto.scroll - (evento.clientX - arrasto.x);
  };

  const aoSoltar = () => {
    arrastoRef.current = null;
    setArrastando(false);
  };

  const temParaRolar = pode.anterior || pode.proximo;

  return (
    <div>
      <ul
        ref={trilhaRef}
        onScroll={atualizar}
        onPointerDown={aoPressionar}
        onPointerMove={aoMover}
        onPointerUp={aoSoltar}
        onPointerCancel={aoSoltar}
        onDragStart={(evento) => evento.preventDefault()}
        className={`-mx-4 mt-3 flex overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0 gap-4 ${
          arrastando
            ? "cursor-grabbing select-none snap-none"
            : "cursor-grab snap-x snap-mandatory"
        }`}
      >
        {fotos.map((foto, indice) => (
          <li
            key={foto.src}
            className={`w-[72%] shrink-0 snap-center rounded-card border-2 border-tinta bg-creme p-2 pb-3 shadow-card sm:w-[45%] md:w-[30%] ${ROTACOES[indice % ROTACOES.length]}`}
          >
            <div className={`relative ${aspecto} overflow-hidden rounded-[2px]`}>
              <Image
                src={foto.src}
                alt={foto.alt}
                fill
                draggable={false}
                loading="lazy"
                sizes="(min-width: 768px) 30vw, (min-width: 640px) 45vw, 72vw"
                className={`object-cover ${posicaoDaImagem}`}
              />
            </div>
            <p className="mt-2 text-center text-[0.6875rem] leading-[1.3] text-tinta">
              {foto.legenda && <span className="block font-semibold">{foto.legenda}</span>}
              <span className="text-tinta/60">Foto: {foto.credito}</span>
            </p>
          </li>
        ))}
      </ul>

      {temParaRolar && (
        <div className="mt-4 flex gap-3">
          <button
            type="button"
            onClick={() => rolar(-1)}
            disabled={!pode.anterior}
            aria-label="Fotos anteriores"
            className={BOTAO_SETA}
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            onClick={() => rolar(1)}
            disabled={!pode.proximo}
            aria-label="Próximas fotos"
            className={BOTAO_SETA}
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      )}
    </div>
  );
}
