import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Sobre } from "@/components/sobre";

// Home = cartaz vertical (docs/05-DESIGN.md §2.4). Seções de categorias,
// patrocínio, Pix e contato entram nos PRs 3 e 4 do roadmap.
export default function Home() {
  return (
    <>
      <Header />
      <main id="conteudo" className="flex-1">
        <Hero />
        <Sobre />
      </main>
      <Footer />
    </>
  );
}
