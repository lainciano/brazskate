import { avisos } from "@/data/avisos";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";

// Seção de avisos/atualizações (item 10 de docs/03-SPEC-SITE.md §3.2; D32,
// docs/02-DECISOES.md): lê SEMPRE de data/avisos.ts — nunca hardcode. Fica
// entre FAQ e Patrocínio (FAQ responde dúvidas, avisos dão novidades).

export function Avisos() {
  return (
    <section id="avisos" className="registro-concreto border-t-2 border-(--borda)">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <Reveal>
          <div data-reveal>
            <SectionHeader eyebrow="Fica ligado" titulo="Avisos e atualizações" />
          </div>

          <ul className="mt-10 flex flex-col gap-6">
            {avisos.map((aviso) => (
              <li key={aviso.id} data-reveal className="border-l-4 border-vermelho-500 pl-4">
                <time
                  dateTime={aviso.dataISO}
                  className="text-sm font-semibold uppercase tracking-[0.06em] text-(--fg-secundario)"
                >
                  {aviso.data}
                </time>
                <h3 className="mt-1 text-[1.125rem] font-bold leading-[1.2]">
                  {aviso.titulo}
                </h3>
                <p className="mt-2 max-w-[65ch] leading-[1.6] text-(--fg-secundario)">
                  {aviso.texto}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
