"use client";

import { useTermoPdf } from "@/hooks/use-termo-pdf";
import { Botao } from "./botao";

// Botão de baixar o PDF do termo (V1.4). Ação, não navegação — Botao sem
// href renderiza <button> (§3.1 do design). Estado "gerando" anunciado via
// aria-live para leitor de tela; erro mantém o botão clicável de novo.
export function TermoPdfBotao() {
  const { estado, baixar } = useTermoPdf();

  return (
    <div className="flex flex-col items-start gap-2">
      <Botao variante="secundario" onClick={baixar} disabled={estado === "gerando"}>
        {estado === "gerando" ? "Gerando PDF…" : "Baixar PDF"}
      </Botao>
      <p aria-live="polite" className="sr-only">
        {estado === "gerando" && "Gerando o PDF do termo, aguarde."}
        {estado === "erro" &&
          "Não foi possível gerar o PDF agora. Tente novamente."}
      </p>
      {estado === "erro" && (
        <p role="alert" className="text-sm text-vermelho-700">
          Não foi possível gerar o PDF agora. Tente novamente.
        </p>
      )}
    </div>
  );
}
