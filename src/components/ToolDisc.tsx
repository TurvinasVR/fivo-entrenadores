import { logoBox, toolInfo } from "@/lib/scene/graph";
import type { ToolId } from "@/lib/scene/graph";

/**
 * Logotipo oficial de una herramienta en su disco claro, como en las escenas del grafo (DESIGN.md: logo real
 * sobre blanco, sin recolorear). `size` es el lado del disco; el logotipo ocupa la mitad.
 */
export function ToolDisc({ id, size = 40, className = "" }: { id: ToolId; size?: number; className?: string }) {
  const t = toolInfo(id);
  const logo = Math.round((logoBox(t.file) * size) / 48);
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-fg ${className}`}
      style={{ width: size, height: size }}
      title={t.name}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/logos/tools/${t.file}`} alt="" width={logo} height={logo} style={{ width: logo, height: logo }} loading="lazy" />
    </span>
  );
}
