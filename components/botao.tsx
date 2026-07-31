import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { IconePix } from "./rabiscos";

// Botão/CTA (docs/05-DESIGN.md §3.1). É <a> quando navega, <button> quando
// age. As variantes usam as variáveis do registro (--fg) para funcionarem
// tanto em fundo concreto quanto asfalto.

type Variante = "primario" | "secundario" | "terciario";

const caixa =
  "inline-flex min-h-11 items-center justify-center gap-2 px-6 py-3 " +
  "font-bold uppercase tracking-[0.02em] rounded-btn " +
  "transition-[transform,box-shadow] duration-150 motion-reduce:transition-none " +
  "hover:-translate-x-0.5 hover:-translate-y-0.5 " +
  "active:translate-x-0 active:translate-y-0 " +
  "active:shadow-[2px_2px_0_var(--color-tinta)] " +
  "disabled:cursor-not-allowed disabled:opacity-50";

const variantes: Record<Variante, string> = {
  primario: `${caixa} bg-vermelho-600 text-creme shadow-card hover:shadow-card-hover`,
  secundario: `${caixa} border-2 border-(--fg) bg-transparent text-(--fg) shadow-sticker hover:shadow-card`,
  // terciário não tem caixa: link "Apoie via Pix" com ícone do Pix e sublinhado que cresce
  terciario:
    "group relative inline-flex min-h-11 items-center gap-2 py-3 font-bold uppercase tracking-[0.02em] text-(--fg)",
};

type PropsComuns = {
  variante?: Variante;
  className?: string;
  children: ReactNode;
};

type PropsLink = PropsComuns &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type PropsBotao = PropsComuns &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

export function Botao(props: PropsLink | PropsBotao) {
  const { variante = "primario", className = "", children, ...resto } = props;

  const conteudo =
    variante === "terciario" ? (
      <>
        <span className="relative">
          {children}
          <RabiscoSublinhadoHover />
        </span>
        <IconePix className="w-5 shrink-0" />
      </>
    ) : (
      children
    );

  const classes = `${variantes[variante]} ${className}`;

  if (resto.href !== undefined) {
    return (
      <a className={classes} {...(resto as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {conteudo}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      {...(resto as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {conteudo}
    </button>
  );
}

// Sublinhado-rabisco que cresce no hover (§6.1) — CSS puro, sem JS.
function RabiscoSublinhadoHover() {
  return (
    <span
      aria-hidden="true"
      className="absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 bg-current transition-transform duration-200 group-hover:scale-x-100 motion-reduce:transition-none"
    />
  );
}
