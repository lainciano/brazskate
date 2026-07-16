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

export const metadata: Metadata = {
  title: "Braz Skate — ASB",
  description:
    "Campeonato Braz Skate, organizado pela ASB — Associação Skate Brazlândia.",
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
