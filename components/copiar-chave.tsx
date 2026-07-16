"use client";

import { useCopiar } from "@/hooks/use-copiar";
import { Botao } from "./botao";

// Chave Pix copiável (docs/05-DESIGN.md §3.7): truncada em repouso, botão
// com estados, status anunciado em aria-live. Se o clipboard falhar, a chave
// completa aparece selecionável — o QR nunca é o único caminho.
export function CopiarChave({ chave }: { chave: string }) {
  const { estado, copiar } = useCopiar(chave);

  const chaveExibida =
    estado === "falhou" ? chave : `${chave.slice(0, 8)}…${chave.slice(-12)}`;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-4">
        <code
          className={`rounded-btn border-2 border-(--borda) px-3 py-2 text-sm ${
            estado === "falhou" ? "select-all break-all" : ""
          }`}
        >
          {chaveExibida}
        </code>
        <Botao variante="secundario" onClick={copiar}>
          {estado === "copiado" ? "Copiado ✓" : "Copiar chave"}
        </Botao>
      </div>
      <span aria-live="polite" className="sr-only">
        {estado === "copiado" ? "Chave Pix copiada" : ""}
      </span>
      {estado === "falhou" && (
        <p className="mt-3 text-sm text-(--fg-secundario)">
          Não deu pra copiar automaticamente — toque e segure na chave acima
          para selecionar.
        </p>
      )}
    </div>
  );
}
