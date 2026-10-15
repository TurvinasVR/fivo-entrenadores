"use client";

import { toolInfo } from "@/lib/scene/graph";
import type { ToolId } from "@/lib/scene/graph";
import { useInView, useReducedMotion } from "@/lib/hooks";
import { useLanding } from "../landing/LandingContext";
import { BlockCta } from "../landing/BlockCta";
import { ToolDisc } from "../ToolDisc";

/** Un bloque por herramienta: logotipo, "Conectado", lo que entra en el grafo y una pregunta de ejemplo. */
function ToolBlock({ id }: { id: ToolId }) {
  const { sources, connect } = useLanding();
  const item = sources.items.find((it) => it.id === id);
  const t = toolInfo(id);
  return (
    <article aria-labelledby={`conexion-${id}`} className="relative z-[1] flex flex-col rounded-[12px] border border-line bg-surface p-6 sm:p-7">
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

      <p className="mt-6 text-[12.5px] font-medium text-fg-muted">Qué entra en el grafo</p>
      {/* Fichas, no filas: este bloque no repite el panel de "Qué entra en el grafo" */}
      <ul className="mt-3 flex flex-wrap gap-2">
        {item?.data?.map((d) => (
          <li key={d} className="rounded-[6px] border border-line bg-surface-2 px-2.5 py-1.5 text-[14px] leading-snug text-fg">
            {d}
          </li>
        ))}
      </ul>

      {item?.question && (
        <div className="mt-auto pt-6">
          <div className="border-t border-line pt-5">
            <p className="flex items-center justify-between text-[12.5px] font-medium text-fg-muted">
              Puedes preguntarle
              <span className="inline-flex items-center gap-1.5">
                <i aria-hidden className="status-dot text-accent" />
                Ejemplo
              </span>
            </p>
            <p className="mt-2 font-display text-lg font-bold leading-snug text-fg">{item.question}</p>
          </div>
        </div>
      )}
    </article>
  );
}

/** El nodo de Fivo, como el del anillo de herramientas. */
function Hub({ size }: { size: number }) {
  return (
    <div
      className="relative z-[2] flex shrink-0 items-center justify-center rounded-full border border-accent/60 bg-bg"
      style={{
        width: size,
        height: size,
        boxShadow: "0 0 0 8px color-mix(in srgb, var(--color-accent) 10%, transparent), 0 0 44px color-mix(in srgb, var(--color-accent) 50%, transparent)",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logos/fivo-mark.svg" alt="" width={Math.round(size * 0.36)} height={Math.round(size * 0.42)} style={{ width: Math.round(size * 0.36), height: Math.round(size * 0.42) }} />
    </div>
  );
}

/**
 * Las dos historias entrando en el grafo: una línea desde cada bloque hasta el nodo de Fivo, con un pulso de
 * luz que viaja hacia él (como en la demo de "Pregúntale a tu negocio"). Horizontal en escritorio, vertical en
 * móvil. Con movimiento reducido, solo las líneas.
 */
function Connector({ vertical, reduced, run }: { vertical: boolean; reduced: boolean; run: boolean }) {
  const len = 100;
  const a = vertical ? "M50 0 L50 50" : "M0 50 L50 50";
  const b = vertical ? "M50 100 L50 50" : "M100 50 L50 50";
  return (
    <div className={`relative flex items-center justify-center ${vertical ? "h-[132px] w-full" : "h-full w-[220px]"}`} aria-hidden>
      <svg viewBox={`0 0 ${len} ${len}`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
        {[a, b].map((d) => (
          <path key={d} d={d} stroke="var(--color-accent)" strokeOpacity="0.7" strokeWidth="1.4" fill="none" vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
      {/* Pulsos de luz hacia el nodo: en CSS, para que sean redondos aunque el conector se estire */}
      {!reduced &&
        run &&
        (["a", "b"] as const).map((side, k) => (
          <span
            key={side}
            className={`conn-pulse ${vertical ? `conn-pulse--y-${side}` : `conn-pulse--x-${side}`}`}
            style={{ animationDelay: `${k * 1.2}s` }}
          />
        ))}
      <div className="flex flex-col items-center">
        <Hub size={vertical ? 64 : 76} />
        <span className={`absolute text-[12.5px] font-medium text-fg-muted ${vertical ? "left-[calc(50%+48px)]" : "top-[calc(50%+56px)]"}`}>Grafo de Fivo</span>
      </div>
    </div>
  );
}

/** "Conecta GoHighLevel y Harbiz. Fivo une las dos historias." Va justo después del problema. */
export function ConnectSection() {
  const { connect } = useLanding();
  const reduced = useReducedMotion();
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.35 });
  const [left, right] = connect.tools;
  return (
    <section aria-labelledby="conexion" className="bg-bg">
      <div className="mx-auto max-w-[1120px] px-5 pb-5 pt-12 lg:px-10 lg:pb-8 lg:pt-20">
        <h2 id="conexion" className="mx-auto max-w-[760px] text-center font-display text-3xl font-black tracking-[-0.015em] text-balance sm:text-4xl">
          {connect.title}
        </h2>

        <div ref={ref} className="mt-10 grid lg:mt-12 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-stretch">
          <ToolBlock id={left} />
          <div className="lg:hidden">
            <Connector vertical reduced={reduced} run={inView} />
          </div>
          <div className="hidden lg:flex">
            <Connector vertical={false} reduced={reduced} run={inView} />
          </div>
          <ToolBlock id={right} />
        </div>

        <p className="mx-auto mt-10 max-w-[720px] text-center font-display text-xl font-bold leading-snug text-balance sm:text-2xl lg:mt-12">{connect.closing}</p>
        <BlockCta position="conexion" />
      </div>
    </section>
  );
}
