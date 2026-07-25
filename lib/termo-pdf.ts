import type { termo as TermoData } from "@/data/termo";

// Monta o PDF do termo com a identidade visual do site (V1.4, docs/04-ROADMAP-V1.md;
// decisão do Lain em 25/07/2026: embutir Anton + cores da marca + logo, em
// vez de CSS de impressão). Importado SEMPRE via import dinâmico no clique
// (D19 em docs/02-DECISOES.md) — jsPDF e a fonte não podem entrar no bundle
// inicial (orçamento em docs/05-DESIGN.md §6.4).

const TINTA = "#191314";
const CREME = "#f5ebe4";
const VERMELHO_600 = "#9c4242";

const MARGEM = 20;
const LARGURA_PAGINA = 210;
const LARGURA_UTIL = LARGURA_PAGINA - MARGEM * 2;

export async function gerarTermoPdf(dados: typeof TermoData): Promise<Blob> {
  const [{ jsPDF }, { antonBase64 }, logoBase64] = await Promise.all([
    import("jspdf"),
    import("./anton-base64"),
    carregarLogoBase64(),
  ]);

  const doc = new jsPDF({ unit: "mm", format: "a4" });

  doc.addFileToVFS("Anton-Regular.ttf", antonBase64);
  doc.addFont("Anton-Regular.ttf", "Anton", "normal");

  let y = MARGEM;

  const cabecalho = (tituloBloco: string) => {
    y = MARGEM;

    if (logoBase64) {
      doc.addImage(logoBase64, "PNG", MARGEM, y, 16, 16);
    }

    doc.setFont("Anton", "normal");
    doc.setFontSize(20);
    doc.setTextColor(TINTA);
    doc.text("BRAZ SKATE", MARGEM + (logoBase64 ? 20 : 0), y + 8);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(VERMELHO_600);
    doc.text(
      "TERMO DE RESPONSABILIDADE E AUTORIZAÇÃO",
      MARGEM + (logoBase64 ? 20 : 0),
      y + 14,
    );

    y += 22;
    doc.setDrawColor(TINTA);
    doc.setLineWidth(0.4);
    doc.line(MARGEM, y, LARGURA_PAGINA - MARGEM, y);
    y += 8;

    doc.setFont("Anton", "normal");
    doc.setFontSize(14);
    doc.setTextColor(TINTA);
    doc.text(tituloBloco.toUpperCase(), MARGEM, y);
    y += 9;
  };

  const rodape = () => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(TINTA);
    doc.text(
      `Braz Skate — versão do texto: ${dados.versaoTexto}`,
      MARGEM,
      297 - 12,
    );
  };

  const garantirEspaco = (alturaNecessaria: number) => {
    if (y + alturaNecessaria > 297 - MARGEM - 12) {
      rodape();
      doc.addPage();
      y = MARGEM;
    }
  };

  dados.blocos.forEach((bloco, indiceBloco) => {
    if (indiceBloco > 0) {
      rodape();
      doc.addPage();
    }
    cabecalho(bloco.titulo);

    bloco.clausulas.forEach((clausula) => {
      garantirEspaco(14);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(TINTA);
      doc.text(clausula.titulo, MARGEM, y);
      y += 5.5;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(TINTA);
      const linhas: string[] = doc.splitTextToSize(clausula.texto, LARGURA_UTIL);
      linhas.forEach((linha) => {
        garantirEspaco(5.5);
        doc.text(linha, MARGEM, y);
        y += 5.5;
      });
      y += 4;
    });

    garantirEspaco(24);
    doc.setDrawColor(TINTA);
    doc.setFillColor(CREME);
    doc.rect(MARGEM, y, LARGURA_UTIL, 20, "FD");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(TINTA);
    doc.text("Assinatura: ____________________________", MARGEM + 4, y + 13);
    doc.text("Data: ___/___/______", LARGURA_PAGINA - MARGEM - 45, y + 13);
    y += 20;

    rodape();
  });

  return doc.output("blob");
}

async function carregarLogoBase64(): Promise<string | null> {
  try {
    const resposta = await fetch("/logo-completa.png");
    if (!resposta.ok) return null;
    const blob = await resposta.blob();
    return await new Promise<string>((resolve, reject) => {
      const leitor = new FileReader();
      leitor.onloadend = () => resolve(leitor.result as string);
      leitor.onerror = reject;
      leitor.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}
