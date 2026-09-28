#!/usr/bin/env node
// Pipeline de fotos da galeria pós-evento (docs/superpowers/specs/
// 2026-09-27-pos-evento-galeria-resultados-design.md §7). Usa o
// ImageMagick já presente no sistema (mesma ferramenta usada ad hoc pra
// D59/D60) — sem dependência nova no package.json. Masters NUNCA entram
// no repo; só a saída (public/galeria/).
//
// Uso: node scripts/processar-fotos-evento.mjs <origem.jpg> <slug>
// Saída: public/galeria/2026/<slug>-640w.webp, public/galeria/2026/<slug>-1600w.webp
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
const DIR_SAIDA = join(RAIZ, "public", "galeria", "2026");
mkdirSync(DIR_SAIDA, { recursive: true });

const TETO_640_KB = 120;
const TETO_1600_KB = 350;
const QUALIDADE_INICIAL = 78;
const QUALIDADE_PISO = 30;
const PASSO_QUALIDADE = 8;

function gerarVariante(largura, tetoKb) {
  const saida = join(DIR_SAIDA, `${slug}-${largura}w.webp`);
  let qualidade = QUALIDADE_INICIAL;
  for (;;) {
    execFileSync("magick", [
      origem,
      "-auto-orient",
      "-strip", // remove todo EXIF/GPS — repo é público
      "-filter", "Lanczos", // precisa vir ANTES do -resize pra valer
      "-resize", `${largura}x${largura * 2}>`,
      "-quality", String(qualidade),
      saida,
    ]);
    const tamanhoKb = statSync(saida).size / 1024;
    if (tamanhoKb <= tetoKb) return saida;
    if (qualidade <= QUALIDADE_PISO) {
      console.error(
        `Erro: ${saida} tem ${tamanhoKb.toFixed(1)}KB, acima do teto de ${tetoKb}KB mesmo com qualidade ${qualidade}.`,
      );
      process.exit(1);
    }
    qualidade = Math.max(QUALIDADE_PISO, qualidade - PASSO_QUALIDADE);
  }
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
