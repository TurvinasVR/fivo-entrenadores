"use client";

import { Proof } from "../Proof";
import { Faq } from "../Faq";
import { Footer } from "../Footer";
import { StickyCta } from "../StickyCta";
import { HowItWorks } from "../HowItWorks";
import { ProblemSection } from "../sections/ProblemSection";
import { AskSection } from "../sections/AskSection";
import { AiSection } from "../sections/AiSection";
import { TeamSection } from "../sections/TeamSection";
import { ConnectSection } from "../sections/ConnectSection";
import Reviews from "../reviews/Reviews";
import { TestimonialsBlock } from "../reviews/TestimonialsBlock";
import { siteConfig } from "@/config/site";
import { useLanding } from "./LandingContext";

/** Todo lo que hay debajo de la primera pantalla. */
export default function BelowFold() {
  const content = useLanding();
  // Testimonios de entrenadores: ocultos hasta que haya reales y se active `ready.testimonials` en la configuración
  const showTestimonials = siteConfig.landings[content.slug].ready.testimonials && content.proof.testimonials.length > 0;
  return (
    <>
      <main className="relative z-[2] overflow-x-clip">
        {/* Reseñas: lo primero tras la primera pantalla. Van en el HTML; no llevan imágenes ni librerías */}
        <div className="mx-auto max-w-[1120px] px-5 pb-4 pt-5 lg:px-10 lg:pb-8 lg:pt-6">
          <Reviews
            headingLevel={2}
            className=""
            title={content.reviews.title}
            lead={showTestimonials ? <TestimonialsBlock testimonials={content.proof.testimonials} /> : undefined}
          />
        </div>
        <HowItWorks />
        <ConnectSection />
        <ProblemSection />
        <TeamSection />
        <AskSection />
        <AiSection />
        <Proof />
        <Faq />
      </main>
      <div className="relative z-[2]">
        <Footer content={content} />
      </div>
      <StickyCta hideNearBlockCtas={content.repeatCta} />
    </>
  );
}
