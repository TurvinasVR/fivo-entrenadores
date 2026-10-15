"use client";

import { useRef, useState } from "react";
import { ChatCircleText, VideoCamera } from "@phosphor-icons/react";
import type { LandingContent } from "@/content/types";
import { toolInfo } from "@/lib/scene/graph";
import { useLanding } from "../landing/LandingContext";
import { BlockCta } from "../landing/BlockCta";
import { ToolDisc } from "../ToolDisc";

type Role = LandingContent["team"]["roles"][number];

const EASE = "cubic-bezier(0.16,1,0.3,1)";

/** Ficha de fuente: logotipo (o icono de llamada) y qué parte de la herramienta. */
function Source({ s }: { s: Role["sources"][number] }) {
  return (
    <span className="inline-flex min-h-[28px] items-center gap-1.5 rounded-[6px] border border-line bg-surface-2 py-1 pl-1 pr-2.5 text-[12.5px] text-fg">
      {s.tool ? (
        <>
          <ToolDisc id={s.tool} size={20} />
          <span className="sr-only">{toolInfo(s.tool).name}: </span>
        </>
      ) : (
        <span className="inline-flex h-5 w-5 items-center justify-center" aria-hidden>
          <VideoCamera size={15} weight="bold" className="text-accent" />
        </span>
      )}
      {s.label}
    </span>
  );
}

/** El panel de un rol: qué recibe, qué deja de hacer y una pregunta de ejemplo con su respuesta y sus fuentes. */
function Panel({ r }: { r: Role }) {
  return (
    <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-10">
      <dl className="grid content-start gap-6">
        {r.receives && (
          <div>
            <dt className="text-[12.5px] font-medium text-fg-muted">Recibe del paso anterior</dt>
            <dd className="mt-1.5 text-[18px] font-semibold leading-snug text-fg">{r.receives}</dd>
          </div>
        )}
        <div>
          <dt className="text-[12.5px] font-medium text-fg-muted">Deja de</dt>
          <dd className="mt-1.5 text-[16px] leading-snug text-fg">{r.stops}</dd>
        </div>
      </dl>

      <div className="lg:border-l lg:border-line lg:pl-10">
        <p className="flex items-center justify-between text-[12.5px] font-medium text-fg-muted">
          Le pregunta a Fivo
          <span className="inline-flex items-center gap-1.5">
            <i aria-hidden className="status-dot text-accent" />
            Ejemplo
          </span>
        </p>
        <p className="mt-3 flex items-start gap-2.5 text-[17px] font-semibold leading-snug text-fg">
          <ChatCircleText size={20} aria-hidden className="mt-px shrink-0 text-accent" />
          {r.q}
        </p>
        <p className="mt-4 text-[15px] leading-relaxed text-fg sm:text-base">{r.a}</p>
        <p className="mt-4 flex flex-wrap items-center gap-1.5 text-[12.5px] text-fg-muted">
          <span className="mr-1">Fuentes</span>
          {r.sources.map((s, i) => (
            <Source key={i} s={s} />
          ))}
        </p>
      </div>
    </div>
  );
}

/**
 * "Del primer mensaje a la renovación, todo tu equipo con el mismo contexto". El equipo como cadena: en escritorio,
 * una línea con cinco paradas (pestañas) y, entre ellas, lo que pasa de una a otra; la línea se enciende hasta la
 * parada elegida. En móvil, una fila de pestañas que se desliza. Debajo, un solo panel: todos los roles ocupan la
 * misma celda (alto del más largo, sin saltos) y el elegido aparece con una transición corta de opacidad.
 */
export function TeamSection() {
  const { team } = useLanding();
  const roles = team.roles;
  const [sel, setSel] = useState(0);
  const desk = useRef<(HTMLButtonElement | null)[]>([]);
  const mob = useRef<(HTMLButtonElement | null)[]>([]);

  const choose = (i: number, refs: typeof desk, focus: boolean) => {
    setSel(i);
    const b = refs.current[i];
    if (focus) b?.focus();
    b?.scrollIntoView({ block: "nearest", inline: "nearest" });
  };
  const onKey = (e: React.KeyboardEvent, i: number, refs: typeof desk) => {
    const n = roles.length;
    const next = e.key === "ArrowRight" ? (i + 1) % n : e.key === "ArrowLeft" ? (i - 1 + n) % n : e.key === "Home" ? 0 : e.key === "End" ? n - 1 : -1;
    if (next < 0) return;
    e.preventDefault();
    choose(next, refs, true);
  };
  const focusRing = "outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";
  const progress = roles.length > 1 ? sel / (roles.length - 1) : 0;

  return (
    <section aria-labelledby="equipo" className="bg-bg">
      <div className="mx-auto max-w-[1120px] px-5 pb-5 pt-12 lg:px-10 lg:pb-8 lg:pt-20">
        <h2 id="equipo" className="max-w-[820px] font-display text-3xl font-black tracking-[-0.015em] text-balance sm:text-4xl">
          {team.title}
        </h2>

        {/* Escritorio: el recorrido */}
        <div role="tablist" aria-label="Personas del equipo" className="relative mt-12 hidden grid-cols-5 lg:grid">
          {/* La línea: base en line-strong y, encima, la parte recorrida en accent (solo transform) */}
          <span aria-hidden className="absolute left-[10%] right-[10%] top-[9px] h-px bg-line-strong" />
          <span
            aria-hidden
            className="absolute left-[10%] right-[10%] top-[9px] h-px origin-left bg-accent motion-safe:transition-transform motion-safe:duration-500"
            style={{ transform: `scaleX(${progress})`, transitionTimingFunction: EASE }}
          />
          {roles.map((r, i) => {
            const on = sel === i;
            const passed = i <= sel;
            return (
              <div key={r.id} className="relative flex justify-center">
                {/* Lo que pasa desde la parada anterior, sobre la línea */}
                {r.handoff && (
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute left-0 top-[9px] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap bg-bg px-2 text-[12.5px] ${passed ? "text-fg" : "text-fg-muted"}`}
                  >
                    {r.handoff}
                  </span>
                )}
                <button
                  ref={(el) => {
                    desk.current[i] = el;
                  }}
                  id={`equipo-tab-${r.id}`}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  aria-controls={`equipo-panel-${r.id}`}
                  tabIndex={on ? 0 : -1}
                  onClick={() => choose(i, desk, false)}
                  onKeyDown={(e) => onKey(e, i, desk)}
                  className={`group flex cursor-pointer flex-col items-center gap-3 rounded-[8px] px-2 pb-1 ${focusRing}`}
                >
                  <span aria-hidden className="relative flex h-[19px] w-[19px] items-center justify-center">
                    <span className={`h-[11px] w-[11px] rounded-full border ${passed ? "border-accent bg-accent" : "border-line-strong bg-bg group-hover:border-fg-muted"}`} />
                    <span className="absolute inset-0 rounded-full bg-accent-soft motion-safe:transition-opacity motion-safe:duration-300" style={{ opacity: on ? 1 : 0 }} />
                  </span>
                  <span className={`text-[15px] font-semibold ${on ? "text-fg" : "text-fg-muted group-hover:text-fg"}`}>{r.role}</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Móvil: pestañas que se deslizan; el degradado del borde derecho indica que hay más */}
        <div className="relative mt-8 lg:hidden">
          <div
            role="tablist"
            aria-label="Personas del equipo"
            className="-mx-5 flex snap-x scroll-px-5 gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{ maskImage: "linear-gradient(90deg, var(--color-bg) 85%, transparent)", WebkitMaskImage: "linear-gradient(90deg, var(--color-bg) 85%, transparent)" }}
          >
            {roles.map((r, i) => {
              const on = sel === i;
              return (
                <button
                  key={r.id}
                  ref={(el) => {
                    mob.current[i] = el;
                  }}
                  id={`equipo-tabm-${r.id}`}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  aria-controls={`equipo-panel-${r.id}`}
                  tabIndex={on ? 0 : -1}
                  onClick={() => choose(i, mob, false)}
                  onKeyDown={(e) => onKey(e, i, mob)}
                  className={`flex min-h-[44px] shrink-0 snap-start items-center gap-2 whitespace-nowrap rounded-[8px] border px-4 text-[15px] font-semibold ${focusRing} ${
                    on ? "border-accent bg-accent-soft text-fg" : "border-line bg-surface text-fg-muted"
                  }`}
                >
                  <span aria-hidden className={`h-[6px] w-[6px] rounded-full ${i <= sel ? "bg-accent" : "bg-line-strong"}`} />
                  {r.role}
                </button>
              );
            })}
            <span aria-hidden className="w-6 shrink-0" />
          </div>
        </div>

        {/* El panel: todos los roles en la misma celda; solo el elegido es visible e interactivo */}
        <div className="mt-6 grid rounded-[12px] border border-line bg-surface lg:mt-8">
          {roles.map((r, i) => {
            const on = sel === i;
            return (
              <div
                key={r.id}
                id={`equipo-panel-${r.id}`}
                role="tabpanel"
                aria-labelledby={`equipo-tab-${r.id}`}
                aria-hidden={!on}
                inert={!on}
                tabIndex={on ? 0 : -1}
                className={`[grid-area:1/1] ${focusRing} rounded-[12px]`}
                style={{ visibility: on ? "visible" : "hidden" }}
              >
                <div className="h-full motion-safe:transition-opacity motion-safe:duration-200" style={{ opacity: on ? 1 : 0 }}>
                  <Panel r={r} />
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-5 text-[15px] text-fg-muted sm:text-base">{team.footer}</p>
        <BlockCta position="equipo" />
      </div>
    </section>
  );
}
