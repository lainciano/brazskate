import { Categorias } from "@/components/categorias";
import { Contato } from "@/components/contato";
import { Footer } from "@/components/footer";
import { Grao } from "@/components/grao";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { PatrocinioResumo } from "@/components/patrocinio-resumo";
import { Pix } from "@/components/pix";
import { Rasgo } from "@/components/rasgo";
import { Sobre } from "@/components/sobre";

// Home = cartaz vertical (docs/05-DESIGN.md §2.4): asfalto (hero) →
// concreto (sobre, categorias, patrocínio) → asfalto (Pix, contato, footer).
export default function Home() {
  return (
    <>
      <Header />
      <main id="conteudo" className="flex-1">
        <Hero />
        <Sobre />
        <Categorias />
        <PatrocinioResumo />
        <div className="registro-asfalto relative overflow-hidden">
          <Rasgo cor="creme" />
          <Grao />
          <Pix />
          <Contato />
        </div>
      </main>
      <Footer />
    </>
  );
}
