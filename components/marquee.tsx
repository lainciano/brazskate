import Link from "next/link";

// Marquee (docs/05-DESIGN.md §3.9): faixa de texto repetido rolando em CSS
// puro, largura total. Pausa no hover/foco e fica estática com reduced-motion.
// O texto existe UMA vez para leitores de tela; as repetições que preenchem
// a faixa são aria-hidden. `href` opcional (§3.9 patrocínio): quando
// presente, a faixa inteira é um link — o texto sr-only descreve o destino,
// não repete o texto decorativo.

const REPETICOES = 6;

export function Marquee({
  texto,
  href,
  className = "",
}: {
  texto: string;
  href?: string;
  className?: string;
}) {
  // duas metades idênticas: a animação desloca -50% e reinicia sem emenda
  const metade = (
    <span aria-hidden="true" className="flex shrink-0">
      {Array.from({ length: REPETICOES }, (_, i) => (
        <span key={i} className="px-4">
          {texto} ·
        </span>
      ))}
    </span>
  );

  const faixa = (
    <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] motion-reduce:animate-none">
      {metade}
      {metade}
    </div>
  );

  return (
    <div
      className={`group overflow-hidden whitespace-nowrap font-display text-[clamp(1.5rem,4vw,2.5rem)] uppercase ${className}`}
    >
      {href ? (
        <Link href={href} className="block">
          <span className="sr-only">Seja um patrocinador do Braz Skate</span>
          {faixa}
        </Link>
      ) : (
        <>
          <span className="sr-only">{texto}</span>
          {faixa}
        </>
      )}
    </div>
  );
}
