"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import type { FotoGaleria } from "@/data/gallery";

// Carrossel de fotos horizontais (formato original 16:9, sem recorte pra
// quadrado como a Colagem) — usado onde a foto precisa aparecer grande,
// não em miniatura. Um slide visível por vez, navegação por botão/dots/
// swipe. `aspect-video` casa com o aspect ratio de origem das fotos da
// pista (2000x1125), então normalmente não há corte real do `object-cover`.

const LIMIAR_SWIPE_PX = 40;

export function CarrosselFotos({ fotos }: { fotos: readonly FotoGaleria[] }) {
  const [indice, setIndice] = useState(0);
  const inicioToqueX = useRef<number | null>(null);

  if (fotos.length === 0) return null;

  function irPara(proximoIndice: number) {
    setIndice((proximoIndice + fotos.length) % fotos.length);
  }

  function aoTocarInicio(evento: React.TouchEvent) {
    inicioToqueX.current = evento.touches[0].clientX;
  }

  function aoTocarFim(evento: React.TouchEvent) {
    if (inicioToqueX.current === null) return;
    const delta = evento.changedTouches[0].clientX - inicioToqueX.current;
    if (delta > LIMIAR_SWIPE_PX) irPara(indice - 1);
    else if (delta < -LIMIAR_SWIPE_PX) irPara(indice + 1);
    inicioToqueX.current = null;
  }

  const foto = fotos[indice];

  return (
    <div
      role="region"
      aria-roledescription="carrossel"
      aria-label="Fotos da pista de Brazlândia"
      className="w-full"
    >
      <div
        className="relative aspect-video w-full overflow-hidden rounded-card border-2 border-tinta shadow-card"
        onTouchStart={aoTocarInicio}
        onTouchEnd={aoTocarFim}
      >
        <Image
          key={foto.src}
          src={foto.src}
          alt={foto.alt}
          fill
          sizes="(min-width: 1024px) 900px, 100vw"
          priority={indice === 0}
          className="object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-tinta/85 to-transparent px-4 pb-2.5 pt-8 text-[0.8125rem] text-creme/90">
          Foto:{" "}
          {foto.creditoUrl ? (
            <a
              href={foto.creditoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-2 hover:underline"
            >
              {foto.credito}
            </a>
          ) : (
            foto.credito
          )}
        </div>

        {fotos.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => irPara(indice - 1)}
              aria-label="Foto anterior"
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-creme/90 text-tinta shadow-card transition-transform duration-150 hover:scale-105 motion-reduce:transition-none"
            >
              <span aria-hidden="true">‹</span>
            </button>
            <button
              type="button"
              onClick={() => irPara(indice + 1)}
              aria-label="Próxima foto"
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-creme/90 text-tinta shadow-card transition-transform duration-150 hover:scale-105 motion-reduce:transition-none"
            >
              <span aria-hidden="true">›</span>
            </button>
          </>
        )}
      </div>

      {fotos.length > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {fotos.map((f, i) => (
            <button
              key={f.src}
              type="button"
              onClick={() => irPara(i)}
              aria-label={`Ir para foto ${i + 1} de ${fotos.length}`}
              aria-current={i === indice}
              className={`h-2.5 w-2.5 rounded-full transition-[transform,background-color] duration-150 motion-reduce:transition-none ${
                i === indice
                  ? "scale-110 bg-tinta"
                  : "bg-tinta/25 hover:bg-tinta/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
