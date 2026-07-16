import { Categorias } from "@/components/categorias";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Sobre } from "@/components/sobre";

// Home = cartaz vertical (docs/05-DESIGN.md §2.4). Seções de patrocínio,
// Pix e contato entram no PR 4 do roadmap.
export default function Home() {
  return (
    <>
      <Header />
      <main id="conteudo" className="flex-1">
        <Hero />
        <Sobre />
        <Categorias />
      </main>
      <Footer />
    </>
  );
}
