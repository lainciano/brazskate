// Marquee (docs/05-DESIGN.md §3.9): faixa de texto repetido rolando em CSS
// puro, largura total. Pausa no hover e fica estática com reduced-motion.
// O texto existe UMA vez para leitores de tela; as repetições que preenchem
// a faixa são aria-hidden.

const REPETICOES = 6;

export function Marquee({
  texto,
  className = "",
}: {
  texto: string;
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

  return (
    <div
      className={`overflow-hidden whitespace-nowrap font-display text-[clamp(1.5rem,4vw,2.5rem)] uppercase ${className}`}
    >
      <span className="sr-only">{texto}</span>
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
        {metade}
        {metade}
      </div>
    </div>
  );
}
