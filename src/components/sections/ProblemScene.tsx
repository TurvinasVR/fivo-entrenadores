"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { LandingContent } from "@/content/types";
import { useInView, useReducedMotion } from "@/lib/hooks";
import { logoBox } from "@/lib/scene/graph";
import { useLanding } from "../landing/LandingContext";

const EASE = "cubic-bezier(0.16,1,0.3,1)";

type Problem = LandingContent["problem"];

const nodesOf = (groups: Problem["groups"]) => groups.flatMap((g) => g.nodes.map((n) => ({ ...n, group: g.id, cx: g.cx, cy: g.cy })));

/**
 * Las herramientas sueltas, en grupos aislados. `lit` dice qué grupos se han encendido ya (entrada única) y
 * `hover` cuál resalta el ratón. Encendido = anillo y etiqueta en accent; resaltado = además un halo suave.
 * Todos los grupos encendidos se ven igual: ninguno brilla más que otro salvo el resaltado.
 */
function Field({ problem, lit, hover, label }: { problem: Problem; lit: boolean[]; hover: string | null; label: string }) {
  const { groups } = problem;
  const NODES = useMemo(() => nodesOf(groups), [groups]);
  const box = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 560, h: 380 });
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setSize({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const { w, h } = size;
  const on = (g: string) => lit[groups.findIndex((G) => G.id === g)] ?? false;

  return (
    <div ref={box} className="relative h-[420px] w-full sm:h-[360px] lg:h-[380px]" role="img" aria-label={label}>
      {groups.map((G) => {
        const isOn = on(G.id);
        const hi = hover === G.id;
        return (
          <div key={G.id} className="absolute left-0 top-0" style={{ transform: `translate(${G.cx * w}px, ${G.cy * h}px)` }} aria-hidden>
            {/* Anillo apagado (line-strong) y, encima, el encendido (accent) y el halo del resaltado: solo cambia su opacidad */}
            <span className="absolute left-0 top-0 rounded-full border border-dashed border-line-strong" style={{ width: G.ring[0], height: G.ring[1], transform: "translate(-50%,-50%)" }} />
            <span
              className="absolute left-0 top-0 rounded-full border border-dashed border-accent"
              style={{ width: G.ring[0], height: G.ring[1], transform: `translate(-50%,-50%) scale(${hi ? 1.05 : 1})`, opacity: isOn ? 0.75 : 0, transition: `opacity 600ms ${EASE}, transform 500ms ${EASE}` }}
            />
            <span
              className="absolute left-0 top-0 rounded-full"
              style={{
                width: G.ring[0],
                height: G.ring[1],
                transform: `translate(-50%,-50%) scale(${hi ? 1.05 : 1})`,
                boxShadow: "0 0 36px color-mix(in srgb, var(--color-accent) 28%, transparent)",
                opacity: hi ? 1 : 0,
                transition: `opacity 400ms ${EASE}, transform 500ms ${EASE}`,
              }}
            />
            <span
              className="absolute left-0 whitespace-nowrap rounded-[6px] border bg-surface px-3 py-1 text-[13px] font-medium"
              style={{ top: G.labelTop, transform: "translate(-50%, 0)", borderColor: isOn ? "var(--color-accent)" : "var(--color-line)", color: isOn ? "var(--color-fg)" : "var(--color-fg-muted)", transition: `color 600ms ${EASE}, border-color 600ms ${EASE}` }}
            >
              {G.label}
            </span>
          </div>
        );
      })}

      {NODES.map((n) => {
        const isOn = on(n.group);
        return (
          <span
            key={n.f}
            className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full bg-fg"
            style={{
              transform: `translate3d(${(n.cx * w + n.dx).toFixed(1)}px,${(n.cy * h + n.dy).toFixed(1)}px,0) translate(-50%,-50%)`,
              opacity: isOn ? 1 : 0.45,
              transition: `opacity 600ms ${EASE}`,
              zIndex: 2,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/logos/tools/${n.f}`} alt="" width={logoBox(n.f)} height={logoBox(n.f)} style={{ width: logoBox(n.f), height: logoBox(n.f) }} />
          </span>
        );
      })}
    </div>
  );
}

/** Las tres frases, enteras y con el mismo peso. En escritorio, pasar el ratón por una resalta su grupo. */
function Pains({ pains, onHover }: { pains: Problem["pains"]; onHover: (g: string | null) => void }) {
  return (
    <ul className="divide-y divide-line" onPointerLeave={() => onHover(null)}>
      {pains.map((p) => (
        <li
          key={p.text}
          className="flex items-start gap-4 py-5 first:pt-0"
          onPointerEnter={(e) => e.pointerType === "mouse" && onHover(p.group)}
        >
          <i aria-hidden className="status-dot mt-[13px] text-accent sm:mt-[15px]" />
          <span className="font-display text-xl font-bold leading-snug text-fg sm:text-2xl">{p.text}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * El problema: las tres frases y las herramientas sueltas, en grupos aislados. Sin scroll anclado: al entrar la
 * sección en pantalla, los tres grupos se encienden una vez, uno detrás de otro, y se quedan encendidos. Con
 * movimiento reducido, todo encendido desde el principio. La conexión la enseña la sección de GoHighLevel y Harbiz.
 */
export default function ProblemScene() {
  const { problem } = useLanding();
  const reduced = useReducedMotion();
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.35 });
  const n = problem.groups.length;
  const [lit, setLit] = useState<boolean[]>(() => Array(n).fill(false));
  const [hover, setHover] = useState<string | null>(null);
  const label = "Herramientas de leads y ventas, de tu equipo y de clientes y pagos, sueltas y sin conexión entre ellas.";

  useEffect(() => {
    if (reduced) {
      setLit(Array(n).fill(true));
      return;
    }
    if (!inView) return;
    // En el orden de las frases: cada grupo se enciende cuando le toca a su frase
    const order = problem.pains.map((p) => problem.groups.findIndex((G) => G.id === p.group)).filter((i) => i >= 0);
    const ids = order.map((gi, k) => window.setTimeout(() => setLit((l) => l.map((v, j) => (j === gi ? true : v))), 200 + k * 450));
    return () => ids.forEach(window.clearTimeout);
  }, [inView, reduced, n, problem]);

  return (
    <div ref={ref} className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-10">
      <div className="lg:col-span-5">
        <Pains pains={problem.pains} onHover={setHover} />
      </div>
      <div className="lg:col-span-7">
        <Field problem={problem} lit={lit} hover={reduced ? null : hover} label={label} />
      </div>
    </div>
  );
}
