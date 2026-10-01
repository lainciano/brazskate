import Image from "next/image";
import { Grao } from "./grao";
import { evento } from "@/data/evento";

// Footer (docs/05-DESIGN.md §3.8): registro asfalto com grão, fechando o
// cartaz com o mesmo clima do hero. Canais reais — WhatsApp + Instagram + e-mail (V1.1).
// Ícones desenhados à mão (mesmo padrão de components/rabiscos.tsx, sem lib
// externa) — genéricos, não são os logos oficiais de marca registrada.

const linksAncora = [
  { href: "#sobre", rotulo: "Sobre" },
  { href: "#categorias", rotulo: "Categorias" },
  { href: "#patrocinio", rotulo: "Patrocínio" },
  { href: "#apoie", rotulo: "Apoie" },
];

// Regulamento e termo só existem com a edição ativa (D64).
const linksEdicao = [
  { href: "/regulamento", rotulo: "Regulamento" },
  { href: "/termo", rotulo: "Termo de responsabilidade" },
];

function IconeInstagram() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="h-5 w-5">
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

function IconeWhatsapp() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="h-5 w-5">
      <path
        d="M12 3a9 9 0 0 0-7.75 13.55L3 21l4.6-1.2A9 9 0 1 0 12 3Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M8.8 8.6c-.3.6-.5 1.1-.3 1.9.4 1.6 2.4 3.6 4 4 .8.2 1.3 0 1.9-.3l.5-.9-1.8-1-.5.6c-.9-.3-1.9-1.3-2.2-2.2l.6-.5-1-1.8-.9.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconeEmail() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="h-5 w-5">
      <rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="m4 6.5 8 6 8-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Footer() {
  const redes = [
    {
      href: "https://www.instagram.com/brazskate",
      rotulo: "Instagram do Braz Skate",
      Icone: IconeInstagram,
    },
    {
      href: "https://wa.me/5561995099761",
      rotulo: "WhatsApp da organização",
      Icone: IconeWhatsapp,
    },
    {
      href: `mailto:${evento.email}`,
      rotulo: "E-mail da organização",
      Icone: IconeEmail,
    },
  ];

  return (
    <footer className="registro-asfalto relative overflow-hidden">
      <Grao />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <Image
              src="/logo.png"
              alt="Braz Skate"
              width={48}
              height={34}
              className="rounded-full"
            />
            <p className="mt-4 text-sm leading-[1.6] text-(--fg-secundario)">
              Campeonato de skate de Brazlândia-DF, organizado pela ASB —
              Associação Skate Brazlândia.
            </p>
          </div>

          <nav aria-label="Rodapé">
            <ul className="flex flex-col gap-2">
              {[...linksAncora, ...(evento.edicaoAtiva ? linksEdicao : [])].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="py-1 font-semibold underline-offset-4 hover:underline"
                  >
                    {link.rotulo}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="flex items-center gap-2">
            {redes.map(({ href, rotulo, Icone }) => (
              <li key={href}>
                <a
                  href={href}
                  rel="noopener"
                  className="flex h-11 w-11 items-center justify-center text-(--link) transition-opacity hover:opacity-70"
                >
                  <Icone />
                  <span className="sr-only">{rotulo}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-12 text-sm text-(--fg-secundario)">
          © {new Date().getFullYear()} ASB — Associação Skate Brazlândia
        </p>
        <p className="mt-2 text-sm text-(--fg-secundario)">
          Desenvolvido por{" "}
          <a
            href="https://www.instagram.com/lainciano"
            rel="noopener"
            className="font-semibold underline-offset-4 hover:underline"
          >
            @lainciano
          </a>
        </p>
      </div>

      {/* wordmark gigante fechando a página (§3.8) — decorativo, o nome já
          existe como texto acima */}
      <p
        aria-hidden="true"
        className="relative -mb-[0.5vw] select-none whitespace-nowrap text-center font-display text-[13.5vw] uppercase leading-[0.8] text-creme"
      >
        Braz Skate
      </p>
    </footer>
  );
}
