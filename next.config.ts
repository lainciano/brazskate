import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Site 100% estático (SSG), sem rotas de API — ver docs/03-SPEC-SITE.md §2.
  output: "export",
  images: {
    // next/image não tem servidor de otimização disponível com output: 'export'.
    unoptimized: true,
  },
  // Sem isso, o WebSocket de HMR do `next dev` falha ao acessar por IP de
  // LAN (necessário para testar em celular real) — o handshake quebra e
  // toda interatividade client-side para (countdown preso em "—", menu
  // sem responder). Só afeta o modo dev; não entra no build de produção.
  // Ajustar o IP se a rede local mudar.
  allowedDevOrigins: ["10.0.0.101"],
};

export default nextConfig;
