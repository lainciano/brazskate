import type { Metadata } from "next";
import { Anton, Archivo } from "next/font/google";
import "./globals.css";

// Dupla aprovada (docs/05-DESIGN.md §2.2): Anton só em títulos de cartaz,
// Archivo em todo o resto. Subsets latin + latin-ext cobrem pt-BR.
const anton = Anton({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-anton",
});

const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-archivo",
});

// Domínio do MVP (D11, docs/02-DECISOES.md): *.vercel.app até o evento
// ter data confirmada.
const SITE_URL = "https://brazskate.vercel.app";
const TITLE = "Braz Skate — Campeonato de Skate de Brazlândia";
const DESCRIPTION =
  "Campeonato de skate em Brazlândia-DF, organizado pela ASB — Associação Skate Brazlândia. Data a confirmar.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s — Braz Skate",
  },
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Braz Skate",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Braz Skate — Campeonato de Skate de Brazlândia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${anton.variable} ${archivo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
