import Image from "next/image";
import { CopiarChave } from "./copiar-chave";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";

// Bloco Pix (docs/05-DESIGN.md §3.7): tom de cumplicidade, discreto. O QR é
// asset estático (public/pix-qr.png, gerado do payload em docs/pix.md por
// script one-off) e a chave copiável existe como texto — o QR nunca é o
// único caminho.

// chave EVP extraída do payload em docs/pix.md (campo 01 do merchant account)
const CHAVE_PIX = "f36357b8-050c-487d-a909-feb2f66f2cae";

export function Pix() {
  return (
    <section id="apoie" className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
      <Reveal>
        <div data-reveal>
          <SectionHeader
            eyebrow="Apoie via Pix"
            titulo="Apoie a cena"
            corRabisco="rosa"
            lead="Qualquer valor ajuda a colocar o campeonato de pé."
          />
        </div>

        <div
          data-reveal
          className="mt-10 flex max-w-2xl flex-col gap-8 rounded-card border-2 border-(--borda) p-6 sm:flex-row sm:items-center"
        >
          <Image
            src="/pix-qr.png"
            alt="QR Code Pix — apoie o Braz Skate"
            width={180}
            height={180}
            className="shrink-0 rounded-card border-8 border-creme bg-white"
          />
          <div>
            <CopiarChave chave={CHAVE_PIX} />
            <p className="mt-5 max-w-[45ch] text-sm leading-[1.4] text-(--fg-secundario)">
              Os recursos vão para a premiação e a estrutura do evento, com
              prestação de contas à comunidade depois do campeonato.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
