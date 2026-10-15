import type { ToolId } from "@/lib/scene/graph";
import type { CtaPosition } from "@/components/CtaButton";

export type LandingSlug = "entrenadores";

export type ScaleFigure = { figure: string; label: string; sr: string };

/**
 * Testimonio de un entrenador. Va en `proof.testimonials` y se activa con `ready.testimonials` en src/config/site.ts:
 * entonces sale justo antes del resto de reseñas. Sin testimonios reales (o con `ready` en false) no se ve nada.
 */
export type TestimonialData = {
  /** Foto, p. ej. "/testimonios/nombre.webp" (en public/). Sin ella, la tarjeta muestra la inicial del nombre. */
  logoOrPhoto: string | null;
  name: string;
  /** Tipo de negocio, p. ej. "Coach online". */
  role: string;
  /** Tamaño del equipo, p. ej. "Equipo de 6 personas". */
  extra: string;
  /** La frase, de tres líneas como máximo. */
  quote: string;
  /** El resultado: la cifra (p. ej. "+30 %")... */
  figure: string;
  /** ...y lo que mide (p. ej. "renovaciones en tres meses"). Solo datos reales y confirmados por el cliente. */
  figureLabel: string;
};

/** Texto del escenario de "Cómo funciona" (videollamada y chat). Las herramientas salen de `tools.ids`. */
export type HowScene = {
  callTitle: string;
  initials: string[];
  assistantCaption: string;
  /** Lo dicho en la llamada, convertido en tres nodos. */
  transcript: { who: string; text: string }[];
  combineLabel: string;
  question: string;
  answer: string[];
  chips: { text: string; tone: "win" | "lose" }[];
};

export type ProblemGroup = {
  id: string;
  label: string;
  /** Posición del grupo (0 a 1 del escenario). */
  cx: number;
  cy: number;
  /** Tamaño del anillo discontinuo y distancia de su etiqueta. */
  ring: [number, number];
  labelTop: number;
  nodes: { f: string; dx: number; dy: number }[];
};

export type AskAnswer =
  | { kind: "tags"; rows: { tag: string; freq?: string; line: string }[] }
  | { kind: "columns"; columns: { h: string; tone: "win" | "lose"; items: string[] }[] }
  | { kind: "timeline"; events: { label: string; detail: string }[]; nowLabel: string; now: string };

export type AskQuestion = {
  id: string;
  q: string;
  title: string;
  /** Nodos de llamadas (0 a 5) que sustentan la respuesta. */
  used: number[];
  /** Fichas de fuente. `sourceLabel` en una ficha le da nombre propio ("GoHighLevel", "Harbiz"...), sin número. */
  calls: { title: string; note?: string; tone?: "win" | "lose"; sourceLabel?: string }[];
  /** Nombre de las fichas de fuente sin nombre propio, numeradas ("Llamada" por defecto). */
  sourceLabel?: string;
  /** Respuesta completa para lectores de pantalla. */
  sr: string;
  /** Respuesta corta, antes de que cargue la demo. */
  fallback: string;
  answer: AskAnswer;
};

export type FaqItem = {
  q: string;
  /** Respuesta publicable, solo con hechos ya publicados. Vacía = sin respuesta aún. */
  a: string;
};

export type LandingContent = {
  slug: LandingSlug;
  path: string;
  thanksPath: string;
  /** Repite el botón "Agendar mi llamada" al final de cada bloque. */
  repeatCta: boolean;
  /**
   * Frase corta sobre el botón de cada bloque, que enlaza lo que se acaba de ver con la llamada.
   * Sin frase para una posición, el botón va solo. `**texto**` va en negrita.
   */
  ctaLines?: Partial<Record<CtaPosition, string>>;

  hero: {
    label: string;
    title: string;
    subtitle: string;
    videoLabel: string;
    /** Pantalla final del vídeo: titular y texto del botón de repetir. Sin esto, el vídeo termina sin pantalla final. */
    videoEnd?: { title: string; replay: string };
    trust: string;
    /** Línea bajo el subtítulo con los logotipos de las integraciones principales. */
    integrations?: { tools: ToolId[]; text: string };
  };

  /** Herramientas de la escena de "Cómo funciona" (paso 1), en su orden en el anillo. */
  tools: {
    ids: ToolId[];
  };

  /** "Conecta GoHighLevel y Harbiz": un bloque por herramienta (lo que entra en el grafo y una pregunta de ejemplo). */
  connect: {
    title: string;
    status: string;
    items: { tool: ToolId; data: string[]; question: string }[];
  };

  /**
   * El equipo como cadena: cada parada recibe el contexto de la anterior. `handoff` es lo que pasa desde la
   * parada anterior (la etiqueta sobre la línea); `receives` falta en la primera.
   */
  team: {
    title: string;
    roles: {
      id: string;
      role: string;
      handoff?: string;
      receives?: string;
      stops: string;
      q: string;
      a: string;
      sources: { label: string; tool?: ToolId }[];
    }[];
    footer: string;
  };

  /** "Tu IA ya conoce tu negocio": Fivo por MCP dentro de Claude, ChatGPT y Gemini. */
  ai: {
    title: string;
    text: string;
    tools: ToolId[];
    prompts: { text: string; sources: { label: string; tool?: ToolId }[] }[];
  };

  problem: {
    title: { muted?: string; main: string };
    pains: { text: string; group: string }[];
    groups: ProblemGroup[];
  };

  how: {
    steps: { title: string; desc: string }[];
    scene: HowScene;
  };

  ask: {
    title: string;
    placeholder: string;
    searching: string;
    graphAria: string;
    /** Enlace de texto bajo cada respuesta de la demo (lleva al formulario). Sin esto, no hay enlace. */
    cta?: string;
    questions: AskQuestion[];
  };

  /** Reseñas de clientes (el carrusel va justo después de la primera pantalla). */
  reviews: { title: string };

  proof: {
    title: string;
    scale: ScaleFigure[];
    /** Testimonios de entrenadores: salen antes de las reseñas cuando `ready.testimonials` está activo. */
    testimonials: TestimonialData[];
  };

  faq: { title: string; items: FaqItem[] };

  footer: { disclaimer?: string };

  thanks: {
    title: string;
    ics: { prodid: string };
    /** Calculadora de ahorro de /gracias. */
    calculator: { title: string; intro: string; resultTitle: string };
  };
};
