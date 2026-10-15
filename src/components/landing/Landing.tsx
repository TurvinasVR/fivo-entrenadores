import type { LandingContent } from "@/content/types";
import { TopBar, TopBarSpacer } from "../TopBar";
import { Hero } from "../Hero";
import { SceneRoot } from "../scene/SceneRoot";
import { HeroBackdrop } from "../scene/HeroBackdrop";
import { LandingProvider } from "./LandingContext";
import BelowFold from "./BelowFold";

/** La landing completa. Cada ruta le pasa su contenido (src/content); la estructura es la misma. */
export function Landing({ content }: { content: LandingContent }) {
  return (
    <>
      {/* Capas: fondo (0), canvas WebGL único (1), contenido (2) */}
      <SceneRoot />
      {/* La barra fija va fuera de la capa de contenido para quedar por encima de todo (y bajo las cookies) */}
      <TopBar />
      {/* Chrome no pinta hasta haber leído el HTML hasta #hero-end: sin esto, con una CPU lenta pinta la primera pantalla a
          medias (un logotipo solo en el centro, un botón con medio texto) y los elementos centrados saltan al llegar el
          resto (CLS). React sube este <link> al <head>; los navegadores que no lo conocen lo ignoran. */}
      <link rel="expect" href="#hero-end" blocking="render" />
      <div className="relative">
        <HeroBackdrop />
        <div className="relative z-[2]">
          <TopBarSpacer />
          <Hero content={content} />
        </div>
      </div>
      <div id="hero-end" aria-hidden />
      {/* Todo lo de debajo va en el HTML inicial, con cada escena ya pintada en su estado final */}
      <LandingProvider content={content}>
        <BelowFold />
      </LandingProvider>
    </>
  );
}
