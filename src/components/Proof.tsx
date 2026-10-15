"use client";

import { Reveal } from "./Reveal";
import { useLanding } from "./landing/LandingContext";

/**
 * Prueba de escala: cuatro cifras grandes con su etiqueta. Los testimonios de entrenadores ya no van aquí:
 * salen antes de las reseñas (ver TestimonialsBlock) cuando haya reales y se active en la configuración.
 */
export function Proof() {
  const { proof } = useLanding();
  const SCALE = proof.scale;
  return (
    <section aria-labelledby="prueba">
      <div className="mx-auto max-w-[1120px] px-5 pb-5 pt-12 lg:px-10 lg:pb-8 lg:pt-20">
        <h2 id="prueba" className="font-display text-3xl font-black tracking-[-0.015em] sm:text-4xl">
          {proof.title}
        </h2>
        <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-8 lg:mt-10 lg:grid-cols-4 lg:gap-x-8">
          {SCALE.map((s, i) => (
            <Reveal key={s.figure} delay={i * 80}>
              <div>
                <dt className="sr-only">{s.sr}</dt>
                <dd aria-hidden className="font-display text-[clamp(2.25rem,1.6rem+3vw,3.75rem)] font-black leading-none tracking-[-0.02em] text-fg">
                  {s.figure}
                </dd>
                <dd aria-hidden className="mt-2 text-[14px] leading-snug text-fg-muted">
                  {s.label}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
