"use client";

import Image from "next/image";
import { useMenuOverlay } from "@/hooks/use-menu-overlay";
import { Grao } from "./grao";

// Header / nav por âncoras (docs/05-DESIGN.md §3.2): barra sticky em tinta
// translúcida; no mobile o menu abre um overlay full-screen estilo cartaz.

const links = [
  { href: "#sobre", rotulo: "Sobre" },
  { href: "#categorias", rotulo: "Categorias" },
  { href: "#patrocinio", rotulo: "Patrocínio" },
  { href: "#apoie", rotulo: "Apoie" },
  { href: "#contato", rotulo: "Contato" },
];

export function Header() {
  const { aberto, abrir, fechar, overlayRef, botaoFecharRef, botaoAbrirRef } =
    useMenuOverlay();

  return (
    <>
      <a
        href="#conteudo"
        className="sr-only z-50 bg-creme px-4 py-3 font-bold text-tinta focus:not-sr-only focus:fixed focus:left-2 focus:top-2"
      >
        Pular para o conteúdo
      </a>

      <header className="sticky top-0 z-40 bg-tinta/95 text-creme">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#conteudo" className="shrink-0" aria-label="Braz Skate — início">
            <Image
              src="/logo.png"
              alt=""
              width={40}
              height={40}
              className="rounded-full"
            />
          </a>

          <nav aria-label="Principal" className="hidden md:block">
            <ul className="flex items-center gap-6">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="py-2 font-semibold underline-offset-4 hover:underline"
                  >
                    {link.rotulo}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            ref={botaoAbrirRef}
            type="button"
            onClick={abrir}
            aria-expanded={aberto}
            aria-controls="menu-overlay"
            className="flex h-11 w-11 items-center justify-center md:hidden"
          >
            <span className="sr-only">Abrir menu</span>
            <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
              <path
                d="M3 6h18M3 12h18M3 18h18"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </header>

      {aberto && (
        <div
          id="menu-overlay"
          ref={overlayRef}
          className="registro-asfalto fixed inset-0 z-50 overflow-y-auto md:hidden"
        >
          <Grao />
          <div className="relative flex min-h-full flex-col px-4 py-3">
            <div className="flex h-16 items-center justify-end">
              <button
                ref={botaoFecharRef}
                type="button"
                onClick={fechar}
                className="flex h-11 w-11 items-center justify-center"
              >
                <span className="sr-only">Fechar menu</span>
                <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                  <path
                    d="M5 5l14 14M19 5L5 19"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <nav aria-label="Principal" className="flex flex-1 items-center">
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={fechar}
                      className="block py-2 font-display text-[clamp(2.5rem,10vw,4rem)] uppercase leading-none"
                    >
                      {link.rotulo}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
