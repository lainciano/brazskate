#!/usr/bin/env node
// Pipeline de fotos da galeria pós-evento (docs/superpowers/specs/
// 2026-09-27-pos-evento-galeria-resultados-design.md §7). Usa o
// ImageMagick já presente no sistema (mesma ferramenta usada ad hoc pra
// D59/D60) — sem dependência nova no package.json. Masters NUNCA entram
// no repo; só a saída (public/galeria/).
//
// Uso: node scripts/processar-fotos-evento.mjs <origem.jpg> <slug>
// Saída: public/galeria/<slug>-640w.webp, public/galeria/<slug>-1600w.webp
// Imprime em stdout: {"largura":N,"altura":N} (dimensões pós-orientação,
// pra colar em data/gallery.ts).

import { execFileSync } from "node:child_process";
import { mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const [, , origem, slug] = process.argv;
if (!origem || !slug) {
  console.error("Uso: node scripts/processar-fotos-evento.mjs <origem.jpg> <slug>");
  process.exit(1);
}

const RAIZ = dirname(dirname(fileURLToPath(import.meta.url)));
const DIR_SAIDA = join(RAIZ, "public", "galeria");
mkdirSync(DIR_SAIDA, { recursive: true });

const TETO_640_KB = 120;
const TETO_1600_KB = 350;

function gerarVariante(largura, tetoKb) {
  const saida = join(DIR_SAIDA, `${slug}-${largura}w.webp`);
  let qualidade = 78;
  for (let tentativa = 0; tentativa < 5; tentativa++) {
    execFileSync("magick", [
      origem,
      "-auto-orient",
      "-strip", // remove todo EXIF/GPS — repo é público
      "-resize", `${largura}x${largura * 2}>`,
      "-filter", "Lanczos",
      "-quality", String(qualidade),
      saida,
    ]);
    const tamanhoKb = statSync(saida).size / 1024;
    if (tamanhoKb <= tetoKb) break;
    qualidade -= 8;
  }
  return saida;
}

gerarVariante(640, TETO_640_KB);
gerarVariante(1600, TETO_1600_KB);

// Dimensões pós-orientação, pra `largura`/`altura` em data/gallery.ts
const identificar = execFileSync("magick", [
  "identify",
  "-auto-orient",
  "-format",
  "%w %h",
  origem,
]).toString().trim();
const [largura, altura] = identificar.split(" ").map(Number);
console.log(JSON.stringify({ largura, altura }));
