import Image from "next/image";
import { Grao } from "./grao";

// Footer (docs/05-DESIGN.md §3.8): registro asfalto com grão, fechando o
// cartaz com o mesmo clima do hero. Canais reais — sem e-mail (não existe).

const linksAncora = [
  { href: "#sobre", rotulo: "Sobre" },
  { href: "#categorias", rotulo: "Categorias" },
  { href: "#patrocinio", rotulo: "Patrocínio" },
  { href: "#apoie", rotulo: "Apoie" },
];

export function Footer() {
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
              {linksAncora.map((link) => (
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

          <ul className="flex flex-col gap-2">
            <li>
              <a
                href="https://www.instagram.com/brazskate"
                rel="noopener"
                className="py-1 font-semibold text-(--link) underline-offset-4 hover:underline"
              >
                Instagram do Braz Skate
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/5561995099761"
                rel="noopener"
                className="py-1 font-semibold text-(--link) underline-offset-4 hover:underline"
              >
                WhatsApp da organização
              </a>
            </li>
          </ul>
        </div>

        <p className="mt-12 text-sm text-(--fg-secundario)">
          © {new Date().getFullYear()} ASB — Associação Skate Brazlândia
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
