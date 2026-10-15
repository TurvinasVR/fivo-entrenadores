"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { toolInfo } from "@/lib/scene/graph";
import type { ToolId } from "@/lib/scene/graph";
import { useReducedMotion } from "@/lib/hooks";
import { useLanding } from "../landing/LandingContext";
import { BlockCta } from "../landing/BlockCta";
import { ToolDisc } from "../ToolDisc";

/*
 * "Conecta GoHighLevel y Harbiz. Fivo une las dos historias."
 *
 * Animación única al entrar en pantalla (unos 3,4 s), controlada por data-cx en la sección:
 *   sin atributo = estado final (HTML del servidor, sin JavaScript o con movimiento reducido)
 *   "idle"       = estado inicial, sin transiciones (se pone al montar si la sección aún no se ve)
 *   "play"       = cada pieza pasa al estado final con su retraso (--d)
 * Solo cambian opacity, transform y stroke-dashoffset (CSS .cx-* en globals.css): CLS 0.
 */

const STEP = 150; // ms entre fichas (GoHighLevel y Harbiz intercaladas)
const DOT = 100; // el punto sale 100 ms después de encenderse su ficha

type Side = "a" | "b";

/** Orden intercalado de las fichas: GoHighLevel 1, Harbiz 1, GoHighLevel 2… */
function chipDelays(na: number, nb: number) {
  const a: number[] = [];
  const b: number[] = [];
  let k = 0;
  for (let i = 0; i < Math.max(na, nb); i++) {
    if (i < na) a.push(k++ * STEP);
    if (i < nb) b.push(k++ * STEP);
  }
  return { a, b };
}

/** El grafo pequeño que sustituye al logotipo: 3 nodos de GoHighLevel (accent) y 3 de Harbiz (success) que se unen. */
const G_NODES = [
  { x: 30, y: 30, c: "var(--color-accent)", d: 1500 },
  { x: 20, y: 56, c: "var(--color-accent)", d: 1700 },
  { x: 38, y: 78, c: "var(--color-accent)", d: 1900 },
  { x: 70, y: 28, c: "var(--color-success)", d: 1600 },
  { x: 81, y: 55, c: "var(--color-success)", d: 1800 },
  { x: 62, y: 78, c: "var(--color-success)", d: 2000 },
];
const G_EDGES: [number, number, number][] = [
  [0, 1, 2000],
  [1, 2, 2100],
  [3, 4, 2050],
  [4, 5, 2150],
  // Las uniones entre las dos historias, al final
  [0, 3, 2400],
  [1, 4, 2500],
  [2, 5, 2600],
];
const Q_DELAY = 2900;

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

function ToolBlock({ id, side, delays }: { id: ToolId; side: Side; delays: number[] }) {
  const { sources, connect } = useLanding();
  const item = sources.items.find((it) => it.id === id);
  const t = toolInfo(id);
  return (
    <article
      aria-labelledby={`conexion-${id}`}
      data-cx-card={side}
      className="relative z-[1] flex flex-col rounded-[12px] border border-line bg-surface p-6 sm:p-7 lg:row-span-3 lg:grid lg:grid-rows-subgrid lg:gap-y-0"
    >
      <header className="flex items-center gap-4">
        <ToolDisc id={id} size={56} />
        <div className="min-w-0">
          <h3 id={`conexion-${id}`} className="font-display text-2xl font-bold leading-tight">
            {t.name}
          </h3>
          <p className="mt-1 inline-flex items-center gap-1.5 text-[13px] font-medium text-fg-muted">
            <i aria-hidden className="status-dot text-success" />
            {connect.status}
          </p>
        </div>
      </header>

      <div className="mt-6">
        <p className="text-[12.5px] font-medium text-fg-muted">Qué entra en el grafo</p>
        {/* Fichas en lista, una por fila, igual en las dos tarjetas */}
        <ul className="mt-3 grid gap-2">
          {item?.data?.map((x, i) => (
            <li key={x} data-cx-chip={side} className="relative rounded-[6px] border border-line bg-surface-2 px-3 py-2 text-[14px] leading-snug text-fg">
              <span aria-hidden className="cx-on pointer-events-none absolute inset-[-1px] rounded-[6px] border border-accent bg-accent-soft" style={d(delays[i] ?? 0)} />
              <span className="relative">{x}</span>
            </li>
          ))}
        </ul>
      </div>

      {item?.question && (
        <div className="cx-q mt-6 border-t border-line pt-5" style={d(Q_DELAY)}>
          <p className="flex items-center justify-between text-[12.5px] font-medium text-fg-muted">
            Puedes preguntarle
            <span className="inline-flex items-center gap-1.5">
              <i aria-hidden className="status-dot text-accent" />
              Ejemplo
            </span>
          </p>
          <p className="mt-2 font-display text-lg font-bold leading-snug text-fg">{item.question}</p>
        </div>
      )}
    </article>
  );
}

/** El nodo de Fivo: el logotipo, que deja paso a un grafo pequeño cuando llegan los datos. Tamaño fijo (sin saltos). */
function Hub({ size }: { size: number }) {
  return (
    <div
      data-cx-hub
      className="relative z-[2] shrink-0 rounded-full border border-accent/60 bg-bg"
      style={{
        width: size,
        height: size,
        // Brillo suave y fijo: las luces pertenecen a los nodos del grafo (DESIGN.md)
        boxShadow: "0 0 0 8px color-mix(in srgb, var(--color-accent) 10%, transparent), 0 0 40px color-mix(in srgb, var(--color-accent) 40%, transparent)",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logos/fivo-mark.svg" alt="" width={30} height={35} className="cx-logo absolute left-1/2 top-1/2 h-[35px] w-[30px]" style={d(1150)} />
      <svg viewBox="0 0 100 100" className="absolute inset-[14%] h-[72%] w-[72%] overflow-visible" aria-hidden>
        {G_EDGES.map(([i, j, ms]) => (
          <line
            key={`${i}-${j}`}
            className="cx-edge"
            x1={G_NODES[i].x}
            y1={G_NODES[i].y}
            x2={G_NODES[j].x}
            y2={G_NODES[j].y}
            pathLength={1}
            strokeDasharray={1}
            stroke="var(--color-accent)"
            strokeOpacity={0.75}
            strokeWidth={2.4}
            style={d(ms)}
          />
        ))}
        {G_NODES.map((n, i) => (
          <circle key={i} className="cx-node" cx={n.x} cy={n.y} r={7} fill={n.c} style={d(n.d)} />
        ))}
      </svg>
    </div>
  );
}

type Geo = {
  w: number;
  h: number;
  lines: { x1: number; y1: number; x2: number; y2: number; delay: number }[];
  dots: { x: number; y: number; dx: number; dy: number; delay: number }[];
};

/**
 * Líneas y puntos de luz, medidos sobre el diseño real: en escritorio, una línea por ficha desde el borde de su
 * tarjeta hasta el nodo (un abanico); en móvil, una línea vertical por tarjeta. Cada punto sale de su ficha.
 */
function useGeometry(wrap: React.RefObject<HTMLDivElement | null>, delays: { a: number[]; b: number[] }) {
  const [geo, setGeo] = useState<Geo | null>(null);
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const measure = () => {
      const o = el.getBoundingClientRect();
      const hubEl = [...el.querySelectorAll<HTMLElement>("[data-cx-hub]")].find((n) => n.offsetParent !== null);
      if (!hubEl) return;
      const hr = hubEl.getBoundingClientRect();
      const hx = hr.left + hr.width / 2 - o.left;
      const hy = hr.top + hr.height / 2 - o.top;
      const wide = window.matchMedia("(min-width: 1024px)").matches;
      const lines: Geo["lines"] = [];
      const dots: Geo["dots"] = [];
      (["a", "b"] as Side[]).forEach((side) => {
        const card = el.querySelector<HTMLElement>(`[data-cx-card="${side}"]`)!.getBoundingClientRect();
        const chips = [...el.querySelectorAll<HTMLElement>(`[data-cx-chip="${side}"]`)];
        if (!wide) {
          // Móvil: GoHighLevel arriba y Harbiz abajo, una línea vertical cada uno
          const y0 = side === "a" ? card.bottom - o.top : card.top - o.top;
          lines.push({ x1: hx, y1: y0, x2: hx, y2: hy, delay: 0 });
          // Un solo punto por tarjeta, a mitad de su secuencia de fichas
          const mid = delays[side][Math.floor(delays[side].length / 2)] ?? 0;
          dots.push({ x: hx, y: y0, dx: 0, dy: hy - y0, delay: mid + DOT });
          return;
        }
        const edge = side === "a" ? card.right - o.left : card.left - o.left;
        chips.forEach((c, i) => {
          const r = c.getBoundingClientRect();
          const y = r.top + r.height / 2 - o.top;
          lines.push({ x1: edge, y1: y, x2: hx, y2: hy, delay: delays[side][i] });
          dots.push({ x: edge, y, dx: hx - edge, dy: hy - y, delay: delays[side][i] + DOT });
        });
      });
      setGeo({ w: o.width, h: o.height, lines, dots });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [wrap, delays]);
  return geo;
}

export function ConnectSection() {
  const { connect, sources } = useLanding();
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const [left, right] = connect.tools;
  const na = sources.items.find((it) => it.id === left)?.data?.length ?? 0;
  const nb = sources.items.find((it) => it.id === right)?.data?.length ?? 0;
  const delays = useMemo(() => chipDelays(na, nb), [na, nb]);
  const geo = useGeometry(wrap, delays);

  // Una sola vez: si al montar la sección aún no se ve, vuelve al estado inicial y se reproduce al entrar
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    // Movimiento reducido: estado final, sin animación (se mira matchMedia directamente: el hook aún no lo sabe al montar)
    if (reduced || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      delete el.dataset.cx;
      return;
    }
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.85 && r.bottom > 0) return; // ya a la vista: se queda en el estado final
    el.dataset.cx = "idle";
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        // Un fotograma en "idle" ya pintado antes de "play", para que las transiciones arranquen
        requestAnimationFrame(() => requestAnimationFrame(() => (el.dataset.cx = "play")));
      },
      { threshold: 0.35 },
    );
    io.observe(wrap.current ?? el);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <section ref={sectionRef} aria-labelledby="conexion" className="cx bg-bg">
      <div className="mx-auto max-w-[1120px] px-5 pb-5 pt-12 lg:px-10 lg:pb-8 lg:pt-20">
        <h2 id="conexion" className="mx-auto max-w-[760px] text-center font-display text-3xl font-black tracking-[-0.015em] text-balance sm:text-4xl">
          {connect.title}
        </h2>

        <div ref={wrap} className="relative mt-10 grid lg:mt-12 lg:grid-cols-[minmax(0,1fr)_240px_minmax(0,1fr)] lg:grid-rows-[auto_auto_auto]">
          {/* Líneas y puntos (medidos tras montar; posición absoluta, no mueven nada) */}
          {geo && (
            <svg aria-hidden className="pointer-events-none absolute left-0 top-0 z-0 overflow-visible" width={geo.w} height={geo.h}>
              {geo.lines.map((l, i) => (
                <line key={i} className="cx-edge" x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} pathLength={1} strokeDasharray={1} stroke="var(--color-accent)" strokeOpacity={0.45} strokeWidth={1.2} style={d(l.delay)} />
              ))}
            </svg>
          )}
          {geo &&
            !reduced &&
            geo.dots.map((p, i) => (
              <span
                key={i}
                aria-hidden
                className="cx-dot pointer-events-none absolute z-[1] h-[7px] w-[7px] rounded-full bg-accent"
                style={{ left: p.x - 3.5, top: p.y - 3.5, "--dx": `${p.dx}px`, "--dy": `${p.dy}px`, "--d": `${p.delay}ms` } as CSSProperties}
              />
            ))}

          <ToolBlock id={left} side="a" delays={delays.a} />

          <div className="flex h-[176px] items-center justify-center lg:hidden">
            <div className="relative flex items-center">
              <Hub size={104} />
              <span className="absolute left-[calc(100%+16px)] whitespace-nowrap text-[12.5px] font-medium text-fg-muted">Grafo de Fivo</span>
            </div>
          </div>
          <div className="hidden lg:row-span-3 lg:flex lg:flex-col lg:items-center lg:justify-center">
            <Hub size={120} />
            <span className="mt-6 text-[12.5px] font-medium text-fg-muted">Grafo de Fivo</span>
          </div>

          <ToolBlock id={right} side="b" delays={delays.b} />
        </div>

        {/* La frase de cierre es la línea del botón del bloque (ctaLines.conexion), con su separación de siempre */}
        <BlockCta position="conexion" />
      </div>
    </section>
  );
}
