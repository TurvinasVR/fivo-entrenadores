/** Datos del grafo compartidos por las versiones 3D y 2D. Todo se genera con una semilla fija. */

export function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type GNode = { x: number; y: number; z: number; tone: 0 | 1 | 2 };

/** Nodos sueltos con pocas conexiones: "información suelta y desconectada". */
export function buildHeroGraph(count = 90, seed = 11) {
  const r = rng(seed);
  const nodes: GNode[] = [];
  for (let i = 0; i < count; i++) {
    nodes.push({
      x: (r() - 0.5) * 22,
      y: (r() - 0.5) * 12,
      z: (r() - 0.5) * 10,
      tone: (r() < 0.55 ? 0 : r() < 0.7 ? 2 : 1) as 0 | 1 | 2,
    });
  }
  const edges: [number, number][] = [];
  const seen = new Set<string>();
  for (let i = 0; i < nodes.length; i++) {
    if (r() > 0.34) continue;
    let best = -1;
    let bestD = 4.2;
    for (let j = 0; j < nodes.length; j++) {
      if (j === i) continue;
      const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y, nodes[i].z - nodes[j].z);
      if (d < bestD) {
        bestD = d;
        best = j;
      }
    }
    const key = best < i ? `${best}-${i}` : `${i}-${best}`;
    if (best >= 0 && !seen.has(key)) {
      seen.add(key);
      edges.push([i, best]);
    }
  }
  return { nodes, edges };
}

/** Proyección sencilla para la versión SVG (viewBox 1600x900). */
export function projectHero(n: GNode) {
  const s = 14 / (14 - n.z);
  return { x: 800 + n.x * s * 58, y: 450 + n.y * s * 58, s };
}

export type ToolId =
  | "gohighlevel"
  | "harbiz"
  | "zoom"
  | "meet"
  | "teams"
  | "stripe"
  | "gmail"
  | "calendar"
  | "outlook"
  | "drive"
  | "notion"
  | "slack"
  | "clickup"
  | "trello"
  | "asana"
  | "zapier"
  | "chatgpt"
  | "claude"
  | "gemini";

export type ToolNode = {
  id: ToolId;
  name: string;
  file: string;
  /** Qué aporta a la memoria de Fivo. */
  gives: string;
  mcp?: boolean;
  /** Posición normalizada en el óvalo (-1 a 1) y profundidad. */
  u: number;
  v: number;
  z: number;
};

const DEFS: Record<ToolId, Omit<ToolNode, "id" | "u" | "v" | "z">> = {
  gohighlevel: { name: "GoHighLevel", file: "gohighlevel.svg", gives: "Leads, ventas y citas" },
  harbiz: { name: "Harbiz", file: "harbiz.svg", gives: "Clientes y entrenamientos" },
  zoom: { name: "Zoom", file: "zoom.svg", gives: "Llamadas" },
  meet: { name: "Google Meet", file: "googlemeet.svg", gives: "Llamadas" },
  gmail: { name: "Gmail", file: "gmail.svg", gives: "Correo" },
  teams: { name: "Microsoft Teams", file: "teams.svg", gives: "Llamadas" },
  stripe: { name: "Stripe", file: "stripe.svg", gives: "Cobros y suscripciones" },
  calendar: { name: "Google Calendar", file: "googlecalendar.svg", gives: "Agenda" },
  outlook: { name: "Outlook", file: "outlook.svg", gives: "Correo y agenda" },
  drive: { name: "Google Drive", file: "googledrive.svg", gives: "Documentos" },
  notion: { name: "Notion", file: "notion.svg", gives: "Documentos y procesos" },
  slack: { name: "Slack", file: "slack.svg", gives: "Mensajes del equipo" },
  clickup: { name: "ClickUp", file: "clickup.svg", gives: "Tareas" },
  trello: { name: "Trello", file: "trello.svg", gives: "Tareas" },
  asana: { name: "Asana", file: "asana.svg", gives: "Tareas" },
  zapier: { name: "Zapier", file: "zapier.svg", gives: "Cualquier otra herramienta" },
  chatgpt: { name: "ChatGPT", file: "openai.svg", gives: "Tu IA", mcp: true },
  claude: { name: "Claude", file: "claude.svg", gives: "Tu IA", mcp: true },
  gemini: { name: "Gemini", file: "gemini.svg", gives: "Tu IA", mcp: true },
};

/**
 * Lado de la caja del logotipo dentro de su disco de 48px. Los logotipos son marcas casi cuadradas en 24px;
 * el de Harbiz es un logotipo de texto apaisado y necesita más ancho para verse del mismo tamaño.
 */
const LOGO_SCALE: Record<string, number> = { "harbiz.svg": 1.42 };
export const logoBox = (file: string) => Math.round(24 * (LOGO_SCALE[file] ?? 1));

/** Nombre, logotipo y lo que aporta una herramienta, fuera de las escenas (secciones de integraciones). */
export const toolInfo = (id: ToolId) => ({ id, ...DEFS[id] });

/** Herramientas del grafo decorativo por defecto, en su orden en el anillo. */
export const TOOL_IDS_DEFAULT: ToolId[] = ["gohighlevel", "harbiz", "zoom", "meet", "stripe", "gmail", "calendar", "drive", "notion", "slack", "chatgpt", "claude"];

const toolCache = new Map<string, ToolNode[]>();

/** Herramientas repartidas a partes iguales en el óvalo (con 9 son 40 grados, como siempre). */
export function toolsFor(ids: readonly ToolId[], startDeg = 90): ToolNode[] {
  const key = `${startDeg}:${ids.join(",")}`;
  const hit = toolCache.get(key);
  if (hit) return hit;
  const step = 360 / ids.length;
  const built = ids.map((id, i) => {
    const a = ((startDeg + i * step) * Math.PI) / 180;
    return { id, ...DEFS[id], u: Math.cos(a) * 0.86, v: Math.sin(a) * 0.8, z: Math.sin(a * 2 + 0.6) * 1.3 };
  });
  toolCache.set(key, built);
  return built;
}

export const TOOLS: ToolNode[] = toolsFor(TOOL_IDS_DEFAULT);

/**
 * Anillo de "Cómo funciona": el panel de la llamada y el chat ocupan el lado izquierdo del grafo. Si un nodo
 * cae justo a 180 grados (con 8 herramientas, por ejemplo), el anillo gira medio paso para no pegarlo al panel.
 */
export function howToolsFor(ids: readonly ToolId[]): ToolNode[] {
  const step = 360 / ids.length;
  return toolsFor(ids, Number.isInteger(90 / step) ? 90 + step / 2 : 90);
}

/**
 * Reparto en anillo por longitud de arco (para el contenedor estrecho del móvil):
 * los nodos quedan a la misma distancia entre sí, sin amontonarse arriba o abajo.
 */
export function compactRing(count: number, rxPx = 126, ryPx = 179, startDeg = 90) {
  const N = 720;
  const pts: { a: number; s: number }[] = [];
  let s = 0;
  let prev = { x: Math.cos(0) * rxPx, y: 0 };
  for (let i = 0; i <= N; i++) {
    const a = (i / N) * Math.PI * 2;
    const p = { x: Math.cos(a) * rxPx, y: Math.sin(a) * ryPx };
    if (i > 0) s += Math.hypot(p.x - prev.x, p.y - prev.y);
    pts.push({ a, s });
    prev = p;
  }
  const total = s;
  const start = (startDeg * Math.PI) / 180;
  // longitud de arco hasta el ángulo de inicio
  const s0 = pts.reduce((best, p) => (Math.abs(p.a - start) < Math.abs(best.a - start) ? p : best)).s;
  return Array.from({ length: count }, (_, k) => {
    const target = (s0 + (k / count) * total) % total;
    const hit = pts.find((p) => p.s >= target) ?? pts[0];
    return { u: Math.cos(hit.a), v: Math.sin(hit.a) };
  });
}
