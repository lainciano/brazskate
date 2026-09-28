import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";
import { StickerBadge } from "./sticker-badge";
import { organizacao, fotografiaEVideo, type Pessoa } from "@/data/equipe";

// Agradecimentos, fim de /galeria (docs/superpowers/specs/
// 2026-09-27-pos-evento-galeria-resultados-design.md §4.4). Mesmo padrão
// visual de "Quem organiza" (components/sobre.tsx): StickerBadge com
// variante alternada, "carimbada" na entrada. Nome sem `instagram` entra
// sem link (política de placeholder) — não usar name como texto de link.
const GRUPOS: { titulo: string; descricao?: string; pessoas: readonly Pessoa[] }[] = [
  {
    titulo: "Organização",
    descricao: "Quem organizou e executou o evento.",
    pessoas: organizacao,
  },
  {
    titulo: "Fotografia e vídeo",
    pessoas: fotografiaEVideo,
  },
];

export function Agradecimentos() {
  return (
    <section
      id="agradecimentos"
      className="scroll-mt-16 border-t-2 border-(--borda) px-4 py-16 sm:px-6 md:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div data-reveal>
            <SectionHeader eyebrow="Quem fez acontecer" titulo="Agradecimentos" />
          </div>

          <div className="mt-10 flex flex-col gap-10">
            {GRUPOS.map((grupo) => (
              <div key={grupo.titulo} data-reveal>
                <h3 className="text-[1.375rem] font-bold leading-[1.2]">{grupo.titulo}</h3>
                {grupo.descricao && (
                  <p className="mt-2 max-w-[65ch] text-(--fg-secundario)">{grupo.descricao}</p>
                )}
                <ul className="mt-4 flex flex-wrap gap-3">
                  {grupo.pessoas.map((pessoa, indice) => {
                    const badge = (
                      <StickerBadge
                        variante={indice % 2 === 0 ? "info" : "breve"}
                        data-carimbo
                      >
                        {pessoa.nome}
                      </StickerBadge>
                    );
                    return (
                      <li key={pessoa.nome}>
                        {pessoa.instagram ? (
                          <a
                            href={`https://instagram.com/${pessoa.instagram}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {badge}
                          </a>
                        ) : (
                          badge
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
