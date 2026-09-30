import { Avisos } from "@/components/avisos";
import { Categorias } from "@/components/categorias";
import { Contato } from "@/components/contato";
import { Faq } from "@/components/faq";
import { GaleriaSecao } from "@/components/galeria-secao";
import { Footer } from "@/components/footer";
import { Grao } from "@/components/grao";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Localizacao } from "@/components/localizacao";
import { PatrocinioResumo } from "@/components/patrocinio-resumo";
import { Pix } from "@/components/pix";
import { Rasgo } from "@/components/rasgo";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Sobre } from "@/components/sobre";
import { TeaserPosEvento } from "@/components/teaser-pos-evento";

// Home = cartaz vertical (docs/05-DESIGN.md §2.4): asfalto (hero) →
// galeria pós-evento (D63: vídeo, Edição 2026, Edição 2021, Agradecimentos) →
// concreto (sobre, categorias, patrocínio) → asfalto (Pix, contato, footer).
//
// <Header> fica FORA do <SmoothScroll> (D23.1, docs/02-DECISOES.md) — o
// ScrollSmoother suaviza só <main>+<Footer>, preservando o sticky do header.
export default function Home() {
  return (
    <>
      <Header />
      <SmoothScroll>
        <main id="conteudo" className="flex-1">
          <Hero fotoSrc="/hero-manobra.webp" />
          <GaleriaSecao />
          <TeaserPosEvento />
          <Sobre />
          <Localizacao />
          <Categorias />
          <Faq />
          <Avisos />
          <PatrocinioResumo />
          <div className="registro-asfalto relative overflow-hidden">
            <Rasgo cor="creme" />
            <Grao />
            <Pix />
            <Contato />
          </div>
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
