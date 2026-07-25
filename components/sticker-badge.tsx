import type { ComponentPropsWithoutRef, ReactNode } from "react";

// StickerBadge (docs/05-DESIGN.md §3.6) — a assinatura do site: informação
// pendente vira adesivo, não site incompleto. Rotação FIXA por variante
// (nunca aleatória em runtime, para não variar entre builds).

type Variante = "data" | "breve" | "info";

const variantes: Record<Variante, string> = {
  data: "bg-vermelho-600 text-creme -rotate-2",
  breve: "bg-creme text-tinta rotate-[1.5deg]",
  info: "bg-creme text-tinta -rotate-1",
};

export function StickerBadge({
  variante = "info",
  className = "",
  children,
  ...rest
}: {
  variante?: Variante;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<"span">, "className" | "children">) {
  return (
    <span
      {...rest}
      className={`inline-block rounded-sticker border-2 border-tinta px-4 py-1.5 text-[0.8125rem] font-bold uppercase tracking-[0.06em] shadow-sticker ${variantes[variante]} ${className}`}
    >
      {children}
    </span>
  );
}
