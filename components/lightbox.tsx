"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { carregarFlip } from "@/lib/motion";
import type { FotoEvento } from "@/data/gallery";

// Lightbox da galeria pós-evento (docs/superpowers/specs/
// 2026-09-27-pos-evento-galeria-resultados-design.md §5). Foco preso,
// primeiro foco no botão Fechar, Esc fecha, setas navegam (Observer),
// foco volta à miniatura de origem ao fechar (mesmo padrão de foco de
// hooks/use-menu-overlay.ts). Flip anima miniatura → imagem cheia e
// volta; sob prefers-reduced-motion, abre/fecha sem animação (o próprio
// carregarFlip só é chamado quando o motion é permitido — ver Step 1 do
// caller em galeria-grade.tsx).
//
// `elementoOrigemRef` é o <button> da miniatura que abriu o lightbox —
// passado pelo pai porque só ele sabe qual dos N itens da grade foi
// clicado; o Flip precisa da posição/tamanho REAL desse elemento no DOM,
// não de um recorte guardado em estado.
export function Lightbox({
  fotos,
  indiceAberto,
  elementoOrigemRef,
  onFechar,
  onNavegar,
}: {
  fotos: readonly FotoEvento[];
  indiceAberto: number | null;
  elementoOrigemRef: React.RefObject<HTMLElement | null>;
  onFechar: () => void;
  onNavegar: (indice: number) => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const botaoFecharRef = useRef<HTMLButtonElement>(null);
  const imagemRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<{ kill: () => void } | null>(null);

  const aberto = indiceAberto !== null;
  const foto = aberto ? fotos[indiceAberto] : null;

  // Foco preso + Esc + retorno de foco (mesmo padrão de use-menu-overlay.ts)
  useEffect(() => {
    if (!aberto) return;

    botaoFecharRef.current?.focus();
    document.body.style.overflow = "hidden";

    const aoTeclar = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") {
        onFechar();
        return;
      }
      if (evento.key === "ArrowRight" && indiceAberto !== null) {
        onNavegar((indiceAberto + 1) % fotos.length);
        return;
      }
      if (evento.key === "ArrowLeft" && indiceAberto !== null) {
        onNavegar((indiceAberto - 1 + fotos.length) % fotos.length);
        return;
      }
      if (evento.key !== "Tab") return;

      const focaveis = dialogRef.current?.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])",
      );
      if (!focaveis?.length) return;
      const primeiro = focaveis[0];
      const ultimo = focaveis[focaveis.length - 1];
      if (evento.shiftKey && document.activeElement === primeiro) {
        evento.preventDefault();
        ultimo.focus();
      } else if (!evento.shiftKey && document.activeElement === ultimo) {
        evento.preventDefault();
        primeiro.focus();
      }
    };

    document.addEventListener("keydown", aoTeclar);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", aoTeclar);
    };
  }, [aberto, indiceAberto, fotos.length, onFechar, onNavegar]);

  // Retorna o foco à miniatura de origem ao fechar
  useEffect(() => {
    if (aberto) return;
    elementoOrigemRef.current?.focus();
  }, [aberto, elementoOrigemRef]);

  // Flip: miniatura → imagem cheia, ao abrir/trocar de foto
  useEffect(() => {
    if (!aberto || !imagemRef.current || !elementoOrigemRef.current) return;
    let cancelado = false;

    const motionPermitido =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
    if (!motionPermitido) return;

    carregarFlip().then(({ Flip }) => {
      if (cancelado || !imagemRef.current || !elementoOrigemRef.current) return;
      const estado = Flip.getState(elementoOrigemRef.current);
      Flip.from(estado, {
        targets: imagemRef.current,
        duration: 0.45,
        ease: "power3.out",
      });
    });

    return () => {
      cancelado = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aberto, indiceAberto]);

  // Observer: swipe horizontal navega
  useEffect(() => {
    if (!aberto || !dialogRef.current) return;
    let cancelado = false;

    const motionPermitido =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
    if (!motionPermitido) return;

    carregarFlip().then(({ Observer }) => {
      if (cancelado || !dialogRef.current || indiceAberto === null) return;
      observerRef.current = Observer.create({
        target: dialogRef.current,
        type: "touch,pointer",
        // gsap 3.15 Observer não tem onSwipeLeft/onSwipeRight — o par real
        // é onLeft/onRight (dispara quando o gesto se move para a
        // esquerda/direita, via self.deltaX), então é isso que fica
        // registrado como listener em runtime.
        onLeft: () => onNavegar((indiceAberto + 1) % fotos.length),
        onRight: () => onNavegar((indiceAberto - 1 + fotos.length) % fotos.length),
      });
    });

    return () => {
      cancelado = true;
      observerRef.current?.kill();
      observerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aberto, indiceAberto]);

  if (!aberto || !foto) return null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={foto.alt}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-tinta/95 p-4"
      onClick={(evento) => {
        if (evento.target === evento.currentTarget) onFechar();
      }}
    >
      <div
        ref={imagemRef}
        className="relative w-full max-w-3xl"
        style={{ aspectRatio: `${foto.largura} / ${foto.altura}` }}
      >
        <Image
          src={foto.srcGrande}
          alt={foto.alt}
          fill
          sizes="(min-width: 768px) 768px, 100vw"
          className="object-contain"
        />
      </div>

      <div className="flex w-full max-w-3xl items-center justify-between text-creme">
        <button
          type="button"
          onClick={() => indiceAberto !== null && onNavegar((indiceAberto - 1 + fotos.length) % fotos.length)}
          className="min-h-11 min-w-11 px-3 font-bold uppercase"
        >
          Anterior
        </button>
        <span className="text-[0.8125rem]">
          Foto:{" "}
          {foto.creditoUrl ? (
            <a href={foto.creditoUrl} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline">
              {foto.credito}
            </a>
          ) : (
            foto.credito
          )}
        </span>
        <button
          type="button"
          onClick={() => indiceAberto !== null && onNavegar((indiceAberto + 1) % fotos.length)}
          className="min-h-11 min-w-11 px-3 font-bold uppercase"
        >
          Próxima
        </button>
      </div>

      <button
        ref={botaoFecharRef}
        type="button"
        onClick={onFechar}
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-creme text-tinta"
      >
        <span className="sr-only">Fechar</span>
        <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
          <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
