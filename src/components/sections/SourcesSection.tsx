"use client";

import { useRef, useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
import type { LandingContent } from "@/content/types";
import { toolInfo } from "@/lib/scene/graph";
import { useLanding } from "../landing/LandingContext";
import { ToolDisc } from "../ToolDisc";

type Item = LandingContent["sources"]["items"][number];

const EASE = "cubic-bezier(0.16,1,0.3,1)";

/** Discos solapados de las primeras herramientas de un grupo y, si hay más, cuántas faltan. */
function Stack({ item, size = 28, max = 3 }: { item: Item; size?: number; max?: number }) {
  const shown = item.tools.slice(0, max);
  const rest = item.tools.length - shown.length;
  return (
    <span className="flex shrink-0 items-center" aria-hidden>
      {shown.map((id, k) => (
        <ToolDisc key={id} id={id} size={size} className={k ? "-ml-2 ring-2 ring-surface" : "ring-2 ring-surface"} />
      ))}
      {rest > 0 && <span className="ml-1.5 text-[12.5px] font-medium text-fg-muted">+{rest}</span>}
    </span>
  );
}

/** Qué lee Fivo de un grupo y qué le puedes preguntar. Lo comparten el panel de escritorio y el acordeón. */
function Detail({ item, wide }: { item: Item; wide: boolean }) {
  if (item.note) {
    return (
      <div className={`flex items-center gap-4 ${wide ? "p-8" : "pb-5 pt-1"}`}>
        <ToolDisc id={item.tools[0]} size={wide ? 48 : 40} />
        <p className="max-w-[460px] font-display text-xl font-bold leading-snug sm:text-2xl">{item.note}</p>
      </div>
    );
  }
  const names = item.tools.map((id) => toolInfo(id).name);
  return (
    <div className={wide ? "grid grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]" : "grid gap-5 pb-5 pt-1"}>
      <div className={wide ? "p-7 lg:p-8" : ""}>
        {item.tools.length > 1 && (
          <div className="mb-5 flex flex-wrap items-center gap-2">
            {item.tools.map((id) => (
              <ToolDisc key={id} id={id} size={32} />
            ))}
            <span className="sr-only">{names.join(", ")}</span>
          </div>
        )}
        <p className="text-[12.5px] font-medium text-fg-muted">Qué lee Fivo</p>
        <ul className="mt-2">
          {item.data?.map((d) => (
            <li key={d} className="flex items-start gap-3 border-t border-line py-2.5 text-[15px] leading-snug text-fg first:border-t-0">
              <i aria-hidden className="status-dot status-dot--brand mt-[8px]" />
              {d}
            </li>
          ))}
        </ul>
      </div>
      {item.question && (
        <div className={wide ? "flex flex-col justify-center border-l border-line p-7 lg:p-8" : ""}>
          <p className="flex items-center justify-between text-[12.5px] font-medium text-fg-muted">
            Puedes preguntarle
            <span className="inline-flex items-center gap-1.5">
              <i aria-hidden className="status-dot status-dot--brand" />
              Ejemplo
            </span>
          </p>
          <p className="mt-3 rounded-[12px] bg-accent-soft px-4 py-3 text-[15px] font-medium leading-snug text-fg sm:text-base">{item.question}</p>
        </div>
      )}
    </div>
  );
}

/**
 * "Qué entra en el grafo desde cada herramienta". En escritorio, una fila de herramientas que se eligen y
 * debajo un solo panel: lo que lee Fivo a un lado y una pregunta de ejemplo al otro. Todos los paneles
 * ocupan la misma celda, así que cambiar de herramienta no mueve la página. En móvil, un acordeón.
 */
export function SourcesSection() {
  const { sources } = useLanding();
  const [sel, setSel] = useState(0);
  const [open, setOpen] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const n = sources.items.length;

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const k = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!k) return;
    e.preventDefault();
    const next = (i + k + n) % n;
    setSel(next);
    tabs.current[next]?.focus();
  };

  return (
    <section aria-labelledby="grafo" className="bg-bg">
      <div className="mx-auto max-w-[1120px] px-5 pb-12 pt-12 lg:px-10 lg:pb-20 lg:pt-20">
        <h2 id="grafo" className="max-w-[760px] font-display text-3xl font-black tracking-[-0.015em] text-balance sm:text-4xl">
          {sources.title}
        </h2>

        {/* Escritorio y tableta */}
        <div className="mt-8 hidden sm:block">
          <div role="tablist" aria-label="Herramientas" className="flex flex-wrap gap-2">
            {sources.items.map((it, i) => (
              <button
                key={it.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                id={`fuente-tab-${it.id}`}
                type="button"
                role="tab"
                aria-selected={sel === i}
                aria-controls={`fuente-panel-${it.id}`}
                tabIndex={sel === i ? 0 : -1}
                onClick={() => setSel(i)}
                onKeyDown={(e) => onKey(e, i)}
                className={`flex min-h-[52px] cursor-pointer items-center gap-2 rounded-[8px] border px-3 text-[15px] font-semibold transition-colors duration-200 ${
                  sel === i ? "sel-brand text-fg" : "hover-ring-brand border-line bg-surface text-fg-muted hover:text-fg"
                }`}
              >
                <Stack item={it} max={2} />
                {it.name}
              </button>
            ))}
          </div>

          <div className="mt-4 grid overflow-hidden rounded-[12px] border border-line bg-surface">
            {sources.items.map((it, i) => (
              <div
                key={it.id}
                id={`fuente-panel-${it.id}`}
                role="tabpanel"
                aria-labelledby={`fuente-tab-${it.id}`}
                aria-hidden={sel !== i}
                inert={sel !== i}
                className="[grid-area:1/1]"
                style={{
                  opacity: sel === i ? 1 : 0,
                  visibility: sel === i ? "visible" : "hidden",
                  transition: `opacity 300ms ${EASE}, visibility 0ms ${sel === i ? "0ms" : "300ms"}`,
                }}
              >
                <Detail item={it} wide />
              </div>
            ))}
          </div>
        </div>

        {/* Móvil: acordeón */}
        <div className="mt-6 border-b border-line sm:hidden">
          {sources.items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={it.id} className="border-t border-line">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`fuente-acc-${it.id}`}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex min-h-[60px] w-full cursor-pointer items-center gap-3 py-3 text-left text-[16px] font-semibold"
                >
                  <Stack item={it} size={30} />
                  <span className="flex-1">{it.name}</span>
                  <CaretDown size={16} aria-hidden className="shrink-0 text-fg-muted transition-transform duration-300" style={{ transform: isOpen ? "rotate(180deg)" : "none" }} />
                </button>
                <div
                  id={`fuente-acc-${it.id}`}
                  className="grid transition-[grid-template-rows] duration-300"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  inert={!isOpen}
                >
                  <div className="overflow-hidden">
                    <Detail item={it} wide={false} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-6 text-[15px] text-fg-muted sm:mt-8 sm:text-base">{sources.footer}</p>
      </div>
    </section>
  );
}
