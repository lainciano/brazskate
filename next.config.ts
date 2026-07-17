import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Site 100% estático (SSG), sem rotas de API — ver docs/03-SPEC-SITE.md §2.
  output: "export",
  images: {
    // next/image não tem servidor de otimização disponível com output: 'export'.
    unoptimized: true,
  },
};

export default nextConfig;
