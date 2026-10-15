import { SCALE, FAQ_PRICE, FAQ_TRANSCRIBE } from "./shared";
import type { LandingContent } from "./types";


/**
 * Todo el texto de entrenadores.fivo.info. Público: entrenador personal o coach online que ya factura
 * y tiene equipo (setters, closers y coaches), capta y vende con GoHighLevel y entrena con Harbiz.
 * Cualifica en la primera línea y repite el botón al final de cada bloque.
 */
export const entrenadores: LandingContent = {
  slug: "entrenadores",
  path: "/entrenadores",
  thanksPath: "/entrenadores/gracias",
  repeatCta: true,
  ctaLines: {
    herramientas: "¿Ya usas GoHighLevel y Harbiz? Te enseñamos cómo quedaría todo conectado.",
    problema: "Así se ve con Fivo. En la llamada lo vemos con tu negocio.",
    "como-funciona": "Te lo enseñamos con un negocio como el tuyo en **30 minutos**.",
    pregunta: "¿Qué le preguntarías tú a tu negocio? Tráelo a la llamada y lo vemos.",
    prueba: "Mira si encaja con tu negocio.",
    faq: "¿Te queda alguna duda? Resuélvela en la llamada.",
  },

  hero: {
    label: "Para entrenadores personales con equipo",
    title: "Tus leads viven en GoHighLevel y tus clientes en Harbiz. Júntalos en un sitio al que puedas preguntarle",
    subtitle:
      "Fivo une tu CRM, tus clientes, tus llamadas de venta y tus check-ins en un grafo de contexto, y lo conecta a Claude o ChatGPT. Deja de ser la única persona que sabe cómo va cada cliente.",
    videoLabel: "Vídeo de Fivo para entrenadores personales",
    videoEnd: { title: "¿Lo vemos con tu negocio?", replay: "Volver a ver" },
    trust: "Cumple RGPD. Datos alojados en la UE. Tú decides quién ve qué.",
  },

  tools: {
    ids: ["gohighlevel", "harbiz", "zoom", "meet", "gmail", "drive", "chatgpt", "claude"],
    title: "Se conecta a GoHighLevel, a Harbiz y a tu IA",
    srList: "GoHighLevel, Harbiz, Zoom, Google Meet, Gmail y Google Drive, y ChatGPT y Claude vía MCP.",
    after: {
      main: "Tu CRM por un lado y tus clientes por otro no son un sistema. Fivo los une sin que cambies ninguno.",
      small: "¿Usas algo que no está aquí? Los webhooks conectan el resto.",
    },
  },

  problem: {
    title: { main: "¿Cuántas veces al día preguntas “¿cómo va este cliente?”?" },
    pains: [
      { text: "Para saber cómo va un cliente abres Harbiz, GoHighLevel y el WhatsApp de su coach.", group: "clientes" },
      { text: "Lo que el closer promete en la llamada de venta no le llega al coach que lleva al cliente.", group: "ventas" },
      { text: "Cada vez que usas la IA tienes que explicarle tu método desde cero.", group: "ia" },
    ],
    groups: [
      {
        id: "ventas",
        label: "Leads y ventas",
        cx: 0.26,
        cy: 0.27,
        ring: [176, 156],
        labelTop: 84,
        nodes: [
          { f: "gohighlevel.svg", dx: -38, dy: -22 },
          { f: "zoom.svg", dx: 18, dy: -38 },
          { f: "googlemeet.svg", dx: -14, dy: 34 },
          { f: "gmail.svg", dx: 42, dy: 10 },
        ],
      },
      {
        id: "ia",
        label: "Tu IA",
        cx: 0.76,
        cy: 0.2,
        ring: [124, 100],
        labelTop: 60,
        nodes: [
          { f: "claude.svg", dx: -26, dy: -4 },
          { f: "openai.svg", dx: 26, dy: 10 },
        ],
      },
      {
        id: "clientes",
        label: "Clientes y entrenos",
        cx: 0.58,
        cy: 0.72,
        ring: [170, 150],
        labelTop: 82,
        nodes: [
          { f: "harbiz.svg", dx: -34, dy: -8 },
          { f: "googledrive.svg", dx: 36, dy: 12 },
        ],
      },
    ],
    compare: true,
    rows: [
      { topic: "Saber cómo va un cliente", today: "Abrir Harbiz, mirar sus check-ins y preguntar a su coach", fivo: "Preguntarlo y tener la respuesta al momento" },
      { topic: "Preparar una llamada de venta", today: "Buscar el lead en GoHighLevel y leer su chat con el setter", fivo: "Un resumen con lo que pidió y lo que le preocupa" },
      { topic: "Saber por qué alguien no renueva", today: "Intuirlo, si te acuerdas de su caso", fivo: "Su historia entera, del anuncio al último check-in" },
      { topic: "Usar Claude o ChatGPT", today: "Explicar tu método en cada conversación", fivo: "Tu IA ya conoce tu método y a tus clientes" },
    ],
  },

  how: {
    steps: [
      {
        title: "Conectas GoHighLevel, Harbiz y tus videollamadas. No cambias ninguna.",
        desc: "Escena animada: los logotipos de GoHighLevel, Harbiz, Zoom, Google Meet, Gmail, Google Drive, ChatGPT y Claude aparecen sueltos y se van conectando uno a uno con el nodo central de Fivo, hasta formar un grafo unido.",
      },
      {
        title: "Cada lead, cada llamada de venta y cada check-in entra en el grafo: quién es, qué se le prometió y cómo va.",
        desc: "Escena animada de ejemplo: en una llamada de venta con dos participantes entra el asistente de Fivo. Lo que pasa se convierte en tres nodos: qué se dijo (entrena con turnos de noche), quién lo hizo (el closer promete adaptar el plan) y en qué quedó (programa de 12 semanas). Los tres se conectan entre sí y vuelan al grafo.",
      },
      {
        title: "Preguntas a Fivo, o a tu propia IA, y te responde con datos de tu negocio.",
        desc: "Escena animada de ejemplo: en el chat se escribe la pregunta «¿Qué clientes pueden no renovar este mes?». Se iluminan en el grafo las fuentes de donde sale la respuesta. La respuesta dice que tres clientes renuevan este mes y han bajado sus sesiones en Harbiz, y que a Lucía se le prometió en la llamada de venta adaptar el plan a sus turnos, que es justo lo que ha fallado, así que conviene proponerle el ajuste antes de hablar de renovación. Cada referencia está enlazada con su fuente: la llamada de venta, el check-in de la semana 5 y el plan en Harbiz.",
      },
    ],
    scene: {
      callTitle: "Llamada de venta",
      initials: ["C", "L"],
      assistantCaption: "Asistente de Fivo",
      transcript: [
        { who: "Qué se dijo", text: "entrena con turnos de noche" },
        { who: "Quién lo hizo", text: "el closer promete adaptar el plan" },
        { who: "En qué quedó", text: "programa de 12 semanas" },
      ],
      combineLabel: "Se conectan entre sí",
      question: "¿Qué clientes pueden no renovar este mes?",
      answer: [
        "Tres clientes renuevan este mes y han bajado sus sesiones en Harbiz.",
        "A Lucía se le prometió en la llamada de venta adaptar el plan a sus turnos, y justo eso es lo que ha fallado. Propón el ajuste antes de hablar de renovación.",
      ],
      chips: [
        { text: "Llamada de venta", tone: "win" },
        { text: "Check-in semana 5", tone: "lose" },
        { text: "Plan en Harbiz", tone: "win" },
      ],
    },
  },

  ask: {
    title: "Pregúntale a tu negocio",
    placeholder: "Pregunta a tu negocio",
    searching: "Buscando en tu negocio",
    graphAria: "Grafo de tu negocio: se iluminan las fuentes de GoHighLevel, Harbiz y las llamadas de donde sale la respuesta.",
    cta: "Quiero ver esto con mi negocio",
    questions: [
      {
        id: "cliente",
        q: "¿Qué le prometimos a Lucía en la llamada de venta y cómo va desde entonces?",
        title: "Lucía entró por el Reto 21 días y renueva en tres semanas.",
        used: [0, 2, 4],
        calls: [
          { sourceLabel: "GoHighLevel", title: "Formulario del anuncio del Reto 21 días" },
          { sourceLabel: "Llamada", title: "Llamada de venta con Lucía" },
          { sourceLabel: "Harbiz", title: "Plan y check-ins de Lucía" },
        ],
        sr: "Lucía entró por el formulario del anuncio del Reto 21 días, en GoHighLevel, y renueva en tres semanas. En la llamada de venta se le prometió adaptar el plan a sus turnos de noche. En Harbiz tiene un plan de cuatro sesiones por semana, que cumplió hasta la semana 4. En la semana 5 hizo una sesión de cuatro, porque ha vuelto a los turnos de noche. Siguiente paso: proponerle el ajuste antes de la renovación. Ejemplo.",
        fallback:
          "Lucía entró por el Reto 21 días y renueva en tres semanas. Se le prometió adaptar el plan a sus turnos de noche, cumplió hasta la semana 4 y en la semana 5 hizo una sesión de cuatro. Siguiente paso: proponerle el ajuste antes de la renovación. Ejemplo.",
        answer: {
          kind: "timeline",
          events: [
            { label: "Entró", detail: "Por el formulario del anuncio del Reto 21 días, en GoHighLevel" },
            { label: "Se le prometió", detail: "Adaptar el plan a sus turnos de noche, en la llamada de venta" },
            { label: "En Harbiz", detail: "Plan de cuatro sesiones por semana, cumplido hasta la semana 4" },
            { label: "Semana 5", detail: "Una sesión de cuatro: ha vuelto a los turnos de noche" },
          ],
          nowLabel: "Siguiente paso",
          now: "Proponerle el ajuste antes de la renovación",
        },
      },
      {
        id: "bajas",
        q: "¿Por qué no renovaron los clientes que se fueron este trimestre?",
        title: "Los tres motivos que más se repiten en sus últimos check-ins.",
        used: [1, 3, 5],
        calls: [
          { sourceLabel: "GoHighLevel", title: "Clientes que no renovaron este trimestre" },
          { sourceLabel: "Harbiz", title: "Sesiones cumplidas antes de la baja" },
          { sourceLabel: "Harbiz", title: "Últimos check-ins de cada cliente" },
        ],
        sr: "Los tres motivos que más se repiten en los últimos check-ins de los clientes que no renovaron este trimestre: la falta de tiempo, que salió en la mayoría, porque casi todos dejaron de cumplir las sesiones dos o tres semanas antes de irse; no ver el progreso, que salió en muchos, porque en sus check-ins no había fotos ni medidas desde el primer mes; y molestias o lesión, que salió en algunos, porque lo contaron en el check-in y el plan no cambió. Ejemplo.",
        fallback:
          "La falta de tiempo salió en la mayoría, no ver el progreso en muchos y las molestias o lesiones en algunos. Casi todos dejaron de cumplir las sesiones dos o tres semanas antes de irse. Ejemplo.",
        answer: {
          kind: "tags",
          rows: [
            { tag: "Falta de tiempo", freq: "Salió en la mayoría", line: "Casi todos dejaron de cumplir las sesiones dos o tres semanas antes de irse." },
            { tag: "No ven el progreso", freq: "Salió en muchos", line: "En sus check-ins no había fotos ni medidas desde el primer mes." },
            { tag: "Molestias o lesión", freq: "Salió en algunos", line: "Lo contaron en el check-in y el plan no cambió." },
          ],
        },
      },
      {
        id: "closer",
        q: "¿Qué hace distinto el closer que más cierra?",
        title: "Irene es la closer que más cierra. Esto cambia entre sus llamadas que cierran y las que no.",
        used: [0, 3, 5],
        sourceLabel: "Llamada",
        calls: [
          { title: "Primera llamada de Irene que cierra", note: "Cierra", tone: "win" },
          { title: "Segunda llamada de Irene que cierra", note: "Cierra", tone: "win" },
          { title: "Llamada de Irene que no cierra", note: "No cierra", tone: "lose" },
        ],
        sr: "Irene es la closer que más cierra. Cuando cierra, pregunta por los intentos anteriores con otros entrenadores, repite el objetivo del cliente con sus palabras y le enseña cómo es una semana real del plan en la app. Cuando no cierra, habla del programa antes de entender el objetivo, responde al precio con descuentos y cuelga sin fecha para decidir. Ejemplo.",
        fallback:
          "Irene es la closer que más cierra. Cuando cierra, pregunta por los intentos anteriores, repite el objetivo del cliente con sus palabras y le enseña una semana real del plan. Cuando no cierra, habla del programa antes de entender el objetivo. Ejemplo.",
        answer: {
          kind: "columns",
          columns: [
            {
              h: "Cuando cierra",
              tone: "win",
              items: [
                "Pregunta por los intentos anteriores con otros entrenadores",
                "Repite el objetivo del cliente con sus palabras",
                "Le enseña cómo es una semana real del plan en la app",
              ],
            },
            {
              h: "Cuando no cierra",
              tone: "lose",
              items: ["Habla del programa antes de entender el objetivo", "Responde al precio con descuentos", "Cuelga sin fecha para decidir"],
            },
          ],
        },
      },
    ],
  },

  proof: {
    title: "Fivo ya funciona a esta escala",
    scale: SCALE,
    testimonials: [],
  },

  faq: {
    title: "Preguntas frecuentes",
    items: [
      FAQ_TRANSCRIBE,
      {
        q: "¿Tengo que dejar GoHighLevel o Harbiz?",
        a: "No. Siguen siendo tus herramientas de trabajo. Fivo se conecta a ellas y a tus videollamadas, tu correo y tus documentos. Si usas algo más, los webhooks conectan el resto.",
      },
      {
        q: "¿Mi equipo va a sentir que lo vigilo?",
        a: "Fivo sirve para entender qué funciona y enseñárselo al resto: tus closers aprenden de las llamadas que cierran y tus coaches llegan a cada check-in con el contexto preparado. Tú decides quién ve qué, con control de acceso por usuario y equipo.",
      },
      {
        q: "¿Dónde se guardan mis datos y los de mis clientes?",
        a: "Los datos se alojan en la UE y van cifrados en tránsito y en reposo. Tú decides quién ve qué, con control de acceso por usuario y equipo. Fivo cumple RGPD y SOC 2.",
      },
      {
        q: "¿Funciona con Claude y ChatGPT?",
        a: "Sí, vía MCP. La memoria de Fivo se conecta a Claude y ChatGPT, y también a Gemini, para que tu IA conozca tu negocio sin que se lo expliques cada vez.",
      },
      FAQ_PRICE,
    ],
  },

  footer: {
    disclaimer: "Los resultados dependen de cada negocio y no están garantizados.",
  },

  thanks: {
    title: "Tu llamada está agendada",
    ics: { prodid: "-//Fivo//Llamada entrenadores//ES" },
    calculator: {
      title: "Mientras llega la llamada, calcula cuánto te ahorraría Fivo",
      intro: "Tráelo a la llamada y lo vemos con tus números.",
      resultTitle: "Esto es lo que Fivo podría sumar a tu negocio cada año",
    },
  },
};
