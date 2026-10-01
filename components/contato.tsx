import Image from "next/image";
import { Botao } from "./botao";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";
import { evento } from "@/data/evento";

// Contato (roadmap PR 4): canais reais — WhatsApp + Instagram. E-mail adicionado em V1.1
// (ver 05-DESIGN.md §7). Bloco do grupo de WhatsApp (QR Code) adicionado em D45.
export function Contato() {
  return (
    <section id="contato" className="relative mx-auto max-w-6xl scroll-mt-16 px-4 pb-16 sm:px-6 md:pb-24">
      <Reveal>
        <div data-reveal>
          <SectionHeader
            eyebrow="Contato"
            titulo="Chama a organização"
            corRabisco="rosa"
            lead="Dúvida sobre o campeonato, proposta de apoio ou vontade de ajudar? É só chamar."
          />
        </div>

        <div
          data-reveal
          className="mt-10 flex max-w-2xl flex-col gap-8 rounded-card border-2 border-(--borda) p-6 sm:flex-row sm:items-center"
        >
          <Image
            src="/whatsapp-qr.png"
            alt="QR Code — Grupo do WhatsApp"
            width={180}
            height={180}
            className="shrink-0 rounded-card border-8 border-creme bg-white"
          />
          <div>
            <h3 className="mb-4 text-xl font-bold uppercase text-(--fg-primario)">
              Grupo Oficial
            </h3>
            <p className="mb-5 max-w-[45ch] text-sm leading-[1.4] text-(--fg-secundario)">
              Entre no grupo do WhatsApp para ficar por dentro de todas as novidades da próxima edição do campeonato em primeira mão.
            </p>
            <Botao href="https://chat.whatsapp.com/Eu2Tz8qt3Cl5P8gQA03Udo?s=cl&p=i&mlu=4&amv=0" rel="noopener">
              Entrar no Grupo
            </Botao>
          </div>
        </div>

        <div data-reveal className="mt-8 flex flex-wrap items-center gap-4">
          <Botao href="https://wa.me/5561995099761" rel="noopener" variante="secundario">
            Organização no WhatsApp
          </Botao>
          <Botao
            href="https://www.instagram.com/brazskate"
            rel="noopener"
            variante="secundario"
          >
            @brazskate no Instagram
          </Botao>
          <Botao
            href={`mailto:${evento.email}`}
            variante="secundario"
          >
            Falar por e-mail
          </Botao>
        </div>
      </Reveal>
    </section>
  );
}
