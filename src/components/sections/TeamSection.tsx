"use client";

import { useLanding } from "../landing/LandingContext";
import { BlockCta } from "../landing/BlockCta";

/**
 * "Cada persona de tu equipo, con lo que necesita". Una fila por rol, sin tarjetas: el disco de la persona
 * (DESIGN.md: personas como discos con su inicial) unido a los demás por una línea del grafo, lo que le da
 * Fivo y, a la derecha, lo que le pregunta.
 */
export function TeamSection() {
  const { team } = useLanding();
  return (
    <section aria-labelledby="equipo" className="bg-bg">
      <div className="mx-auto max-w-[1120px] px-5 pb-5 pt-12 lg:px-10 lg:pb-8 lg:pt-20">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
          <h2 id="equipo" className="max-w-[680px] font-display text-3xl font-black tracking-[-0.015em] text-balance sm:text-4xl">
            {team.title}
          </h2>
          <span className="inline-flex items-center gap-1.5 text-[12.5px] text-fg-muted">
            <i aria-hidden className="status-dot status-dot--brand" />
            Preguntas de ejemplo
          </span>
        </div>

        <ol className="relative mt-8 lg:mt-10">
          {/* La línea que une a las personas, por detrás de los discos */}
          <span aria-hidden className="absolute bottom-10 left-[21px] top-10 w-px bg-accent/40" />
          {team.roles.map((r) => (
            <li
              key={r.role}
              className="relative grid grid-cols-[44px_minmax(0,1fr)] gap-x-4 gap-y-3 border-t border-line py-6 first:border-t-0 md:grid-cols-[44px_minmax(0,1fr)_minmax(0,0.9fr)] md:items-center md:gap-x-8"
            >
              <span aria-hidden className="relative z-[1] flex h-11 w-11 items-center justify-center rounded-full bg-brand font-sans text-[15px] font-bold text-bg ring-4 ring-bg">
                {r.initial}
              </span>
              <div>
                <h3 className="font-display text-lg font-bold leading-snug sm:text-xl">{r.role}</h3>
                <p className="mt-1 max-w-[440px] text-[15px] leading-snug text-fg-muted sm:text-base">{r.gives}</p>
              </div>
              <p className="col-start-2 w-fit max-w-full rounded-[12px] bg-accent-soft px-4 py-3 text-[15px] font-medium leading-snug text-fg md:col-start-auto md:justify-self-end">
                <span className="sr-only">Ejemplo de pregunta: </span>
                {r.example}
              </p>
            </li>
          ))}
        </ol>

        <p className="mt-4 border-t border-line pt-5 text-[15px] text-fg-muted sm:text-base">{team.footer}</p>
        <BlockCta position="equipo" />
      </div>
    </section>
  );
}
