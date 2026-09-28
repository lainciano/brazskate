#!/usr/bin/env node
// Pipeline do loop de drone (docs/superpowers/specs/
// 2026-09-27-pos-evento-galeria-resultados-design.md §7). Requer um ffmpeg
// com libx264, libvpx-vp9 e libwebp (checado antes de gerar qualquer
// arquivo). Corta um trecho de 6-10s, remove áudio e metadado, gera MP4
// (H.264) + WebM (VP9) em 720p/30fps/yuv420p e um poster WebP do primeiro
// quadro. Cada vídeo precisa ter ≤1,5MB: se passar, o script reencoda com
// CRF mais alto (de 3 em 3) até caber; se não couber nem no CRF máximo,
// falha com erro (exit 1) em vez de entregar arquivo acima do teto.
//
// Uso: node scripts/processar-loop-drone.mjs <origem.mp4> <inicio-seg> <duracao-seg>
// duracao-seg deve estar entre 6 e 10.

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, rmSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const [, , origem, inicio, duracao] = process.argv;
const duracaoNum = Number(duracao);
const inicioNum = Number(inicio);
if (
  !origem ||
  inicio === undefined ||
  !(Number.isFinite(inicioNum) && inicioNum >= 0) ||
  !(duracaoNum >= 6 && duracaoNum <= 10)
) {
  console.error(
    "Uso: node scripts/processar-loop-drone.mjs <origem.mp4> <inicio-seg (>=0)> <duracao-seg (6-10)>",
  );
  process.exit(1);
}
if (!existsSync(origem)) {
  console.error(`Erro: arquivo de origem não encontrado: ${origem}`);
  process.exit(1);
}

// Textos de erro do ffmpeg vêm como Buffer; devolve string curta e legível.
function textoDoErro(erro) {
  const stderr = erro?.stderr ? erro.stderr.toString().trim() : "";
  return stderr || (erro instanceof Error ? erro.message : String(erro));
}

// Preflight: antes de criar qualquer arquivo, confirma que o ffmpeg tem os
// encoders necessários (builds mínimas, como o ffmpeg-free do Fedora, não
// têm libx264).
function verificarEncoders() {
  let saida;
  try {
    saida = execFileSync("ffmpeg", ["-hide_banner", "-encoders"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
  } catch (erro) {
    console.error(`Erro: não foi possível executar o ffmpeg: ${textoDoErro(erro)}`);
    process.exit(1);
  }
  const faltando = ["libx264", "libvpx-vp9", "libwebp"].filter(
    (nome) => !new RegExp(`^\\s*V\\S*\\s+${nome}\\s`, "m").test(saida),
  );
  if (faltando.length > 0) {
    console.error(
      `Erro: este ffmpeg não tem o(s) encoder(s) ${faltando.join(", ")}. ` +
        "É preciso um ffmpeg com libx264, libvpx-vp9 e libwebp. " +
        "No Fedora: habilite o RPM Fusion e troque o ffmpeg-free pelo ffmpeg " +
        "(sudo dnf swap ffmpeg-free ffmpeg --allowerasing), ou use um build " +
        "estático do ffmpeg no PATH.",
    );
    process.exit(1);
  }
}
verificarEncoders();

const RAIZ = dirname(dirname(fileURLToPath(import.meta.url)));
const DIR_SAIDA = join(RAIZ, "public", "galeria");
mkdirSync(DIR_SAIDA, { recursive: true });

const TETO_MB = 1.5;
const PASSO_CRF = 3;

function rodarFfmpeg(etapa, args) {
  try {
    execFileSync("ffmpeg", ["-hide_banner", "-loglevel", "error", ...args], {
      stdio: ["ignore", "ignore", "pipe"],
    });
  } catch (erro) {
    console.error(`Erro no ffmpeg (${etapa}): ${textoDoErro(erro)}`);
    process.exit(1);
  }
}

// Encoda e, se passar do teto, reencoda com CRF mais alto (passo a passo)
// até caber; no CRF máximo ainda acima do teto, apaga o arquivo e sai com 1.
function encodarAteCaber(caminho, montarArgs, crfInicial, passo, crfTeto) {
  let crf = crfInicial;
  for (;;) {
    rodarFfmpeg(caminho, montarArgs(crf));
    const tamanhoMb = statSync(caminho).size / 1024 / 1024;
    if (tamanhoMb <= TETO_MB) return;
    if (crf >= crfTeto) {
      rmSync(caminho, { force: true });
      console.error(
        `Erro: ${caminho} tem ${tamanhoMb.toFixed(2)}MB, acima do teto de ${TETO_MB}MB mesmo com CRF ${crf}. ` +
          "Arquivo removido; escolha um trecho mais simples ou mais curto.",
      );
      process.exit(1);
    }
    crf = Math.min(crf + passo, crfTeto);
  }
}

// Opções comuns aos dois vídeos: sem áudio, 720p, 30fps, yuv420p (a fonte
// pode ser 10-bit/4:2:2, que o navegador não toca) e sem metadado/versão
// do ffmpeg (repo é público).
function argsVideo(saida, codec) {
  return [
    "-y",
    "-ss", inicio,
    "-i", origem,
    "-t", String(duracaoNum),
    "-an", // sem áudio
    "-vf", "scale=-2:720",
    "-r", "30",
    "-pix_fmt", "yuv420p",
    "-map_metadata", "-1",
    "-map_chapters", "-1",
    "-fflags", "+bitexact",
    "-flags:v", "+bitexact",
    ...codec,
    saida,
  ];
}

const mp4 = join(DIR_SAIDA, "loop-drone.mp4");
encodarAteCaber(
  mp4,
  (crf) =>
    argsVideo(mp4, [
      "-c:v", "libx264",
      "-crf", String(crf),
      "-preset", "slow",
      "-movflags", "+faststart",
    ]),
  28,
  PASSO_CRF,
  40,
);

const webm = join(DIR_SAIDA, "loop-drone.webm");
encodarAteCaber(
  webm,
  (crf) =>
    argsVideo(webm, [
      "-c:v", "libvpx-vp9",
      "-crf", String(crf),
      "-b:v", "0",
    ]),
  32,
  PASSO_CRF,
  50,
);

const poster = join(DIR_SAIDA, "loop-drone-poster.webp");
rodarFfmpeg(poster, [
  "-y",
  "-ss", inicio,
  "-i", origem,
  "-frames:v", "1",
  "-vf", "scale=-2:720",
  poster,
]);

console.log(JSON.stringify({ mp4, webm, poster }));
