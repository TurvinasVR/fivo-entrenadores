"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChatCircleText, VideoCamera } from "@phosphor-icons/react";
import type { LandingContent } from "@/content/types";
import { toolInfo } from "@/lib/scene/graph";
import { clamp01 } from "@/lib/scene/motion";
import { useLanding } from "../landing/LandingContext";
import { BlockCta } from "../landing/BlockCta";
import { ToolDisc } from "../ToolDisc";

type Role = LandingContent["team"]["roles"][number];

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

/** Lo que recibe y lo que deja de hacer (columna izquierda en escritorio). */
function Given({ r }: { r: Role }) {
  return (
    <dl className="grid content-start gap-6">
      {r.receives && (
        <div className="team-recv">
          <dt className="text-[12.5px] font-medium text-fg-muted">Recibe del paso anterior</dt>
          <dd className="mt-1.5 text-[18px] font-semibold leading-snug text-fg">{r.receives}</dd>
        </div>
      )}
      <div className="team-recv">
        <dt className="text-[12.5px] font-medium text-fg-muted">Deja de</dt>
        <dd className="mt-1.5 text-[16px] leading-snug text-fg">{r.stops}</dd>
      </div>
    </dl>
  );
}

/** La pregunta de ejemplo, su respuesta y sus fuentes (columna derecha en escritorio). */
function Answer({ r }: { r: Role }) {
  return (
    <div className="team-ans">
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
      <p className="mt-3 text-[15px] leading-relaxed text-fg sm:text-base">{r.a}</p>
      <p className="mt-4 flex flex-wrap items-center gap-1.5 text-[12.5px] text-fg-muted">
        <span className="mr-1">Fuentes</span>
        {r.sources.map((s, i) => (
          <Source key={i} s={s} />
        ))}
      </p>
    </div>
  );
}

const focusRing = "outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

/**
 * Escritorio con movimiento: la misma técnica que "Cómo funciona". Un recorrido alto con la escena fija (sticky)
 * dentro; el scroll lo avanza por los cinco roles. El alto del recorrido es CSS puro (escena + 60 dvh por rol), así que el HTML del servidor ya tiene su tamaño final. El progreso se lee en un bucle de
 * animación que solo corre mientras la sección está cerca de la pantalla (IntersectionObserver), sin escuchar el scroll.
 */
function StickyJourney({ roles, title }: { roles: Role[]; title: string }) {
  const n = roles.length;
  const track = useRef<HTMLDivElement>(null);
  const stick = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLSpanElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  // Mientras dura el desplazamiento de un clic o una flecha, el rol elegido no cambia (la línea sigue rellenándose)
  const lock = useRef(false);

  const progress = useCallback(() => {
    const el = track.current;
    const st = stick.current;
    if (!el || !st) return 0;
    const r = el.getBoundingClientRect();
    const top = parseFloat(getComputedStyle(st).top) || 0;
    return clamp01((top - r.top) / Math.max(1, r.height - st.offsetHeight));
  }, []);

  // Centrada en la ventana mientras está fija (nunca bajo la barra superior), como "Cómo funciona"
  useEffect(() => {
    const st = stick.current;
    if (!st) return;
    const place = () => (st.style.top = `${Math.max(88, Math.round((window.innerHeight - st.offsetHeight) / 2))}px`);
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let raf = 0;
    const loop = () => {
      const p = progress();
      if (fill.current) fill.current.style.transform = `scaleX(${Math.min(1, (p * n) / (n - 1)).toFixed(4)})`;
      const a = Math.min(n - 1, Math.floor(p * n));
      if (!lock.current && a !== activeRef.current) {
        activeRef.current = a;
        setActive(a);
      }
      raf = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver(
      ([e]) => {
        cancelAnimationFrame(raf);
        if (e.isIntersecting) raf = requestAnimationFrame(loop);
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [n, progress]);

  /** Pulsar un rol (o las flechas): baja o sube suave hasta su punto del recorrido. */
  const goTo = (i: number, focus = false) => {
    const el = track.current;
    const st = stick.current;
    if (!el || !st) return;
    const top = parseFloat(getComputedStyle(st).top) || 0;
    const total = el.offsetHeight - st.offsetHeight;
    const y = el.getBoundingClientRect().top + window.scrollY - top + ((i + 0.5) / n) * total;
    activeRef.current = i;
    setActive(i);
    lock.current = true;
    const release = () => {
      lock.current = false;
      window.removeEventListener("scrollend", release);
    };
    window.addEventListener("scrollend", release);
    window.setTimeout(release, 1200); // por si el navegador no tiene scrollend
    window.scrollTo({ top: y, behavior: "smooth" });
    if (focus) tabs.current[i]?.focus({ preventScroll: true });
  };
  const onKey = (e: React.KeyboardEvent, i: number) => {
    const next = e.key === "ArrowRight" ? Math.min(n - 1, i + 1) : e.key === "ArrowLeft" ? Math.max(0, i - 1) : e.key === "Home" ? 0 : e.key === "End" ? n - 1 : -1;
    if (next < 0) return;
    e.preventDefault();
    goTo(next, true);
  };

  return (
    <div ref={track} data-team-track className="relative">
      <div ref={stick} className="sticky top-[88px]">
        <h2 id="equipo" className="max-w-[820px] font-display text-3xl font-black tracking-[-0.015em] text-balance sm:text-4xl">
          {title}
        </h2>
        <div role="tablist" aria-label="Personas del equipo" className="relative mt-10 grid grid-cols-5">
          {/* La línea: base en line-strong y la parte recorrida en accent, rellenada por el scroll (solo transform) */}
          <span aria-hidden className="absolute left-[10%] right-[10%] top-[9px] h-px bg-line-strong" />
          <span ref={fill} aria-hidden className="absolute left-[10%] right-[10%] top-[9px] h-px origin-left bg-accent" style={{ transform: "scaleX(0)" }} />
          {roles.map((r, i) => {
            const on = active === i;
            const reached = i <= active;
            return (
              <div key={r.id} className="relative flex justify-center">
                {/* Lo que pasa desde la parada anterior: se ilumina en accent justo al pasar, después queda en fg */}
                {r.handoff && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-0 top-[9px] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap bg-bg px-2 text-[12.5px] transition-colors duration-200 ease-[var(--ease-out-expo)]"
                    style={{ color: on ? "var(--color-accent)" : reached ? "var(--color-fg)" : "var(--color-fg-muted)" }}
                  >
                    {r.handoff}
                  </span>
                )}
                <button
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  id={`equipo-tab-${r.id}`}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  aria-controls={`equipo-panel-${r.id}`}
                  tabIndex={on ? 0 : -1}
                  onClick={() => goTo(i)}
                  onKeyDown={(e) => onKey(e, i)}
                  className={`group flex cursor-pointer flex-col items-center gap-3 rounded-[8px] px-2 pb-1 ${focusRing}`}
                >
                  <span aria-hidden className="relative flex h-[19px] w-[19px] items-center justify-center">
                    <span
                      className="h-[11px] w-[11px] rounded-full border transition-colors duration-200 ease-[var(--ease-out-expo)]"
                      style={{ borderColor: reached ? "var(--color-accent)" : "var(--color-line-strong)", background: reached ? "var(--color-accent)" : "var(--color-bg)" }}
                    />
                    <span className="absolute inset-0 rounded-full border border-accent bg-accent-soft transition-opacity duration-200 ease-[var(--ease-out-expo)]" style={{ opacity: on ? 1 : 0 }} />
                  </span>
                  <span className={`text-[15px] font-semibold transition-colors duration-200 ease-[var(--ease-out-expo)] ${reached ? "text-fg" : "text-fg-muted group-hover:text-fg"}`}>{r.role}</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Todos los paneles en la misma celda: alto del más largo, el contenido centrado (sin hueco solo abajo) */}
        <div className="mt-8 grid rounded-[12px] border border-line bg-surface">
          {roles.map((r, i) => {
            const on = active === i;
            return (
              <div
                key={r.id}
                id={`equipo-panel-${r.id}`}
                role="tabpanel"
                aria-labelledby={`equipo-tab-${r.id}`}
                aria-hidden={!on}
                inert={!on}
                className={`team-panel grid grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] content-center items-start gap-10 p-8 [grid-area:1/1] ${on ? "is-on" : ""}`}
                style={{ visibility: on ? "visible" : "hidden" }}
              >
                <Given r={r} />
                <div className="border-l border-line pl-10">
                  <Answer r={r} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* El recorrido del scroll: 60 dvh por rol */}
      <div aria-hidden style={{ height: `${n * 60}dvh` }} />
    </div>
  );
}

/**
 * Móvil y movimiento reducido: los cinco roles en vertical, con la línea del recorrido a la izquierda. Cada tarjeta
 * se enciende al entrar en pantalla y la línea se rellena hasta la última encendida (IntersectionObserver).
 * Con movimiento reducido, todo encendido desde el principio.
 */
function VerticalJourney({ roles }: { roles: Role[] }) {
  const refs = useRef<(HTMLLIElement | null)[]>([]);
  const [lit, setLit] = useState(-1);
  const [live, setLive] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setLive(true);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const i = refs.current.indexOf(e.target as HTMLLIElement);
          setLit((l) => Math.max(l, i));
        });
      },
      { rootMargin: "0px 0px -35% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const n = roles.length;
  // Sin JavaScript o con movimiento reducido: todo encendido y la línea entera
  const fillTo = !live ? 1 : lit < 0 ? 0 : Math.min(1, (lit + 0.5) / n);

  return (
    <ol className="relative mt-8 lg:max-w-[760px]">
      <span aria-hidden className="absolute bottom-6 left-[9px] top-6 w-px bg-line-strong" />
      <span aria-hidden className="absolute bottom-6 left-[9px] top-6 w-px origin-top bg-accent motion-safe:transition-transform motion-safe:duration-500" style={{ transform: `scaleY(${fillTo})` }} />
      {roles.map((r, i) => {
        const on = !live || i <= lit;
        return (
          <li
            key={r.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className="relative pb-6 pl-9 last:pb-0"
          >
            <span
              aria-hidden
              className="absolute left-[4px] top-[22px] h-[11px] w-[11px] rounded-full border motion-safe:transition-colors motion-safe:duration-500"
              style={{ borderColor: on ? "var(--color-accent)" : "var(--color-line-strong)", background: on ? "var(--color-accent)" : "var(--color-bg)" }}
            />
            {r.handoff && (
              <p className="mb-2 text-[12.5px] motion-safe:transition-colors motion-safe:duration-500" style={{ color: on ? "var(--color-fg)" : "var(--color-fg-muted)" }}>
                {r.handoff}
              </p>
            )}
            <article className="rounded-[12px] border border-line bg-surface p-5 motion-safe:transition-opacity motion-safe:duration-500" style={{ opacity: on ? 1 : 0.45 }}>
              <h3 className="font-display text-xl font-bold leading-tight">{r.role}</h3>
              <div className="mt-4 grid gap-6">
                <Given r={r} />
                <div className="border-t border-line pt-5">
                  <Answer r={r} />
                </div>
              </div>
            </article>
          </li>
        );
      })}
    </ol>
  );
}

/**
 * "Del primer mensaje a la renovación, todo tu equipo con el mismo contexto". El equipo como cadena: en escritorio,
 * escena fija que el scroll recorre parada a parada; en móvil y con movimiento reducido, los cinco roles en vertical.
 * Nada avanza solo: solo el scroll o el clic.
 */
export function TeamSection() {
  const { team } = useLanding();
  return (
    <section aria-labelledby="equipo" className="bg-bg">
      <div className="mx-auto max-w-[1120px] px-5 pb-5 pt-12 lg:px-10 lg:pb-8 lg:pt-20">
        {/* Escritorio con movimiento: el titular va dentro de la escena fija. Móvil y movimiento reducido: su propio titular */}
        <div className="hidden lg:block motion-reduce:lg:hidden">
          <StickyJourney roles={team.roles} title={team.title} />
        </div>
        <div className="block lg:hidden motion-reduce:lg:block">
          <h2 className="max-w-[820px] font-display text-3xl font-black tracking-[-0.015em] text-balance sm:text-4xl">{team.title}</h2>
          <VerticalJourney roles={team.roles} />
        </div>

        <p className="mt-6 text-[15px] text-fg-muted sm:text-base">{team.footer}</p>
        <BlockCta position="equipo" />
      </div>
    </section>
  );
}
