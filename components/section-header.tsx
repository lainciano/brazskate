import { RabiscoSublinhado } from "./rabiscos";

// SectionHeader (docs/05-DESIGN.md §3.3): eyebrow + h2 em Anton + rabisco de
// sublinhado + lead opcional. Alinhado à esquerda (cartaz, não centralizado
// genérico). Um h1 por página (o hero) — seções usam h2.

export function SectionHeader({
  eyebrow,
  titulo,
  lead,
  corRabisco = "vermelho",
  className = "",
}: {
  eyebrow?: string;
  titulo: string;
  lead?: string;
  corRabisco?: "vermelho" | "rosa";
  className?: string;
}) {
  return (
    <div className={className}>
      {eyebrow && (
        <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.1em] text-(--acento)">
          {eyebrow}
        </p>
      )}
      <h2
        data-stencil
        style={{ clipPath: "inset(0% 0 0 0)" }}
        className="mt-2 font-display text-[clamp(2rem,6vw,3.25rem)] uppercase leading-none"
      >
        {titulo}
      </h2>
      {/* o rabisco deriva no scroll (data-parallax) e se desenha ao entrar
          (data-rabisco, DrawSVGPlugin) — ver components/reveal.tsx;
          decorativo e aria-hidden, então mover/desenhar não afeta leitura */}
      <span data-parallax data-rabisco className="block">
        <RabiscoSublinhado
          className={`mt-3 h-3 w-44 max-w-full ${
            corRabisco === "vermelho" ? "text-vermelho-500" : "text-rosa"
          }`}
        />
      </span>
      {lead && (
        <p className="mt-6 max-w-[65ch] text-lg leading-[1.55] text-(--fg-secundario)">
          {lead}
        </p>
      )}
    </div>
  );
}
