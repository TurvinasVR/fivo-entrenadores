"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { LandingContent } from "@/content/types";
import { useInView, useReducedMotion } from "@/lib/hooks";
import { logoBox } from "@/lib/scene/graph";
import { useLanding } from "../landing/LandingContext";

const EASE = "cubic-bezier(0.16,1,0.3,1)";

type Problem = LandingContent["problem"];

const nodesOf = (groups: Problem["groups"]) => groups.flatMap((g) => g.nodes.map((n) => ({ ...n, group: g.id, cx: g.cx, cy: g.cy })));

/** Las herramientas sueltas, en grupos aislados. Cada dolor resalta el suyo. */
function Field({ problem, active, instant = false, label }: { problem: Problem; active: number; instant?: boolean; label: string }) {
  const { groups, pains } = problem;
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
  const hiGroup = pains[active]?.group;

  return (
    <div ref={box} className="relative h-[350px] w-full sm:h-[360px] lg:h-[380px]" role="img" aria-label={label}>
      {/* Anillos discontinuos y etiquetas de cada grupo aislado */}
      {groups.map((G) => {
        const g = G.id;
        const hi = hiGroup === g;
        const dim = active !== -1 && !hi;
        return (
          <div key={g} className="absolute left-0 top-0" style={{ transform: `translate(${G.cx * w}px, ${G.cy * h}px)`, opacity: dim ? 0.3 : 1, transition: instant ? "none" : `opacity 500ms ${EASE}` }} aria-hidden>
            <span
              className="absolute left-0 top-0 rounded-full border border-dashed"
              style={{
                width: G.ring[0],
                height: G.ring[1],
                borderColor: hi ? "var(--color-accent)" : "var(--color-line-strong)",
                boxShadow: hi ? "0 0 36px color-mix(in srgb, var(--color-accent) 25%, transparent)" : "none",
                transform: `translate(-50%,-50%) scale(${hi ? 1.06 : 1})`,
                transition: `all 500ms ${EASE}`,
              }}
            />
            <span
              className="absolute left-0 whitespace-nowrap rounded-[6px] border bg-surface px-3 py-1 text-[13px] font-medium"
              style={{ top: G.labelTop, transform: "translate(-50%, 0)", borderColor: hi ? "var(--color-accent)" : "var(--color-line)", color: hi ? "var(--color-fg)" : "var(--color-fg-muted)", transition: `all 400ms ${EASE}` }}
            >
              {G.label}
            </span>
          </div>
        );
      })}

      {NODES.map((n) => {
        const hi = hiGroup === n.group;
        return (
          <span
            key={n.f}
            className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full border bg-fg"
            style={{
              transform: `translate3d(${(n.cx * w + n.dx).toFixed(1)}px,${(n.cy * h + n.dy).toFixed(1)}px,0) translate(-50%,-50%)`,
              opacity: active !== -1 && !hi ? 0.3 : 0.75,
              borderColor: hi ? "var(--color-accent)" : "transparent",
              boxShadow: hi ? "0 0 0 4px color-mix(in srgb, var(--color-accent) 12%, transparent)" : "none",
              transition: instant ? "none" : `opacity 500ms ${EASE}, border-color 400ms, box-shadow 500ms`,
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

function Pains({ pains, active, reduced, pick }: { pains: Problem["pains"]; active: number; reduced: boolean; pick: (i: number) => void }) {
  return (
    <ul className="divide-y divide-line">
      {pains.map((p, i) => {
        const on = active === i || reduced;
        return (
          <li key={p.text}>
            <button
              type="button"
              aria-pressed={active === i}
              onPointerEnter={() => pick(i)}
              onFocus={() => pick(i)}
              onClick={() => pick(i)}
              className="flex w-full cursor-pointer items-start gap-4 py-5 text-left first:pt-0"
            >
              <i aria-hidden className="status-dot mt-[13px] sm:mt-[15px]" style={{ color: active === i ? "var(--color-accent)" : "var(--color-fg-subtle)", transition: `color 300ms ${EASE}` }} />
              <span className="font-display text-xl font-bold leading-snug sm:text-2xl" style={{ color: active === -1 || active === i || on ? "var(--color-fg)" : "var(--color-fg-muted)", transition: "color 300ms" }}>
                {p.text}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

/**
 * El problema: los tres dolores y las herramientas sueltas, en grupos aislados. Al entrar, cada dolor
 * resalta su grupo una vez; después queda en reposo y el visitante puede recorrerlos. La conexión la
 * enseña la sección siguiente (GoHighLevel y Harbiz unidos en el grafo de Fivo).
 */
export default function ProblemScene() {
  const { problem } = useLanding();
  const reduced = useReducedMotion();
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.4 });
  const [active, setActive] = useState(-1);
  const touched = useRef(false);
  const label = "Herramientas de leads y ventas, de tu equipo y de clientes y pagos, sueltas y sin conexión entre ellas.";

  useEffect(() => {
    if (!inView || reduced) return;
    const ids = [0, 1, 2].map((i) => window.setTimeout(() => !touched.current && setActive(i), 400 + i * 1900));
    const end = window.setTimeout(() => !touched.current && setActive(-1), 400 + 3 * 1900);
    return () => [...ids, end].forEach(window.clearTimeout);
  }, [inView, reduced]);

  const pick = (i: number) => {
    touched.current = true;
    setActive(i);
  };

  if (reduced) {
    return (
      <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="lg:col-span-5">
          <Pains pains={problem.pains} active={-1} reduced pick={() => {}} />
        </div>
        <div className="lg:col-span-7">
          <Field problem={problem} active={-1} instant label={label} />
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-10">
      <div className="lg:col-span-5">
        <Pains pains={problem.pains} active={active} reduced={false} pick={pick} />
      </div>
      <div className="lg:col-span-7">
        <Field problem={problem} active={active} label={label} />
      </div>
    </div>
  );
}
