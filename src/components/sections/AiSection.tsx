"use client";

import { VideoCamera } from "@phosphor-icons/react";
import { toolInfo } from "@/lib/scene/graph";
import { useLanding } from "../landing/LandingContext";
import { BlockCta } from "../landing/BlockCta";
import { ToolDisc } from "../ToolDisc";

/**
 * "Tu IA ya conoce tu negocio": Fivo dentro de Claude, ChatGPT y Gemini por MCP. A un lado el mensaje y
 * las tres IA; al otro, una sola ventana con tres peticiones de ejemplo y las fuentes que usa cada una.
 */
export function AiSection() {
  const { ai } = useLanding();
  return (
    <section aria-labelledby="tu-ia" className="bg-bg">
      <div className="mx-auto max-w-[1120px] px-5 pb-5 pt-12 lg:px-10 lg:pb-8 lg:pt-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:items-center lg:gap-14">
          <div>
            <h2 id="tu-ia" className="font-display text-3xl font-black tracking-[-0.015em] sm:text-4xl">
              {ai.title}
            </h2>
            <p className="mt-4 max-w-[460px] text-[17px] leading-relaxed text-fg-muted">{ai.text}</p>
            <ul className="mt-7 flex flex-wrap gap-x-4 gap-y-3 sm:gap-x-6">
              {ai.tools.map((id) => (
                <li key={id} className="flex items-center gap-2.5 text-[15px] font-semibold">
                  <ToolDisc id={id} size={36} />
                  {toolInfo(id).name}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[12px] border border-line bg-surface">
            <div className="flex items-center justify-between border-b border-line px-5 py-3 text-[12.5px] text-fg-muted">
              <span>Lo que le pides a tu IA</span>
              <span className="inline-flex items-center gap-1.5">
                <i aria-hidden className="status-dot status-dot--brand" />
                Ejemplo
              </span>
            </div>
            <ol>
              {ai.prompts.map((p, i) => (
                <li key={i} className={`px-5 py-5 ${i ? "border-t border-line" : ""}`}>
                  <p className="ml-auto max-w-[94%] rounded-[12px] bg-accent-soft px-4 py-3 text-[15px] font-medium leading-snug text-fg">{p.text}</p>
                  <p className="mt-3 flex flex-wrap items-center gap-1.5 text-[12.5px] text-fg-muted">
                    <span className="mr-1">Usa</span>
                    {p.sources.map((s) => (
                      <span key={s.label} className="inline-flex min-h-[28px] items-center gap-1.5 rounded-[6px] border border-line bg-surface-2 py-1 pl-1 pr-2.5 text-fg">
                        {s.tool ? (
                          <ToolDisc id={s.tool} size={20} />
                        ) : (
                          <span className="inline-flex h-5 w-5 items-center justify-center" aria-hidden>
                            <VideoCamera size={15} weight="bold" className="text-accent" />
                          </span>
                        )}
                        {s.label}
                      </span>
                    ))}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <BlockCta position="ia" />
      </div>
    </section>
  );
}
