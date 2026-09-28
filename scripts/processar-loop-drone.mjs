#!/usr/bin/env node
// Pipeline do loop de drone (docs/superpowers/specs/
// 2026-09-27-pos-evento-galeria-resultados-design.md §7). Usa ffmpeg (já
// presente no sistema). Corta um trecho de 6-10s, remove áudio e
// metadado, gera MP4 (H.264) + WebM (VP9) em 720p, ≤1,5MB cada, e um
// poster WebP do primeiro quadro.
//
// Uso: node scripts/processar-loop-drone.mjs <origem.mp4> <inicio-seg> <duracao-seg>
// duracao-seg deve estar entre 6 e 10.

import { execFileSync } from "node:child_process";
import { mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const [, , origem, inicio, duracao] = process.argv;
const duracaoNum = Number(duracao);
if (!origem || inicio === undefined || !(duracaoNum >= 6 && duracaoNum <= 10)) {
  console.error(
    "Uso: node scripts/processar-loop-drone.mjs <origem.mp4> <inicio-seg> <duracao-seg (6-10)>",
  );
  process.exit(1);
}

const RAIZ = dirname(dirname(fileURLToPath(import.meta.url)));
const DIR_SAIDA = join(RAIZ, "public", "galeria");
mkdirSync(DIR_SAIDA, { recursive: true });

const TETO_MB = 1.5;

function verificarTeto(caminho) {
  const tamanhoMb = statSync(caminho).size / 1024 / 1024;
  if (tamanhoMb > TETO_MB) {
    console.warn(`Aviso: ${caminho} tem ${tamanhoMb.toFixed(2)}MB (teto: ${TETO_MB}MB)`);
  }
}

const mp4 = join(DIR_SAIDA, "loop-drone.mp4");
execFileSync("ffmpeg", [
  "-y",
  "-ss", inicio,
  "-i", origem,
  "-t", String(duracaoNum),
  "-an", // sem áudio
  "-vf", "scale=-2:720",
  "-r", "30",
  "-c:v", "libx264",
  "-crf", "28",
  "-preset", "slow",
  "-map_metadata", "-1",
  mp4,
]);
verificarTeto(mp4);

const webm = join(DIR_SAIDA, "loop-drone.webm");
execFileSync("ffmpeg", [
  "-y",
  "-ss", inicio,
  "-i", origem,
  "-t", String(duracaoNum),
  "-an",
  "-vf", "scale=-2:720",
  "-r", "30",
  "-c:v", "libvpx-vp9",
  "-crf", "32",
  "-b:v", "0",
  "-map_metadata", "-1",
  webm,
]);
verificarTeto(webm);

const poster = join(DIR_SAIDA, "loop-drone-poster.webp");
execFileSync("ffmpeg", [
  "-y",
  "-ss", inicio,
  "-i", origem,
  "-frames:v", "1",
  "-vf", "scale=-2:720",
  poster,
]);

console.log(JSON.stringify({ mp4, webm, poster }));
