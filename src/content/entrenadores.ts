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
    equipo: "Te enseñamos cómo lo usaría cada persona de tu equipo.",
    ia: "¿Usas Claude o ChatGPT? En la llamada te enseñamos cómo quedaría con tu negocio.",
    "como-funciona": "Te lo enseñamos con un negocio como el tuyo en **30 minutos**.",
    pregunta: "¿Qué le preguntarías tú a tu negocio? Tráelo a la llamada y lo vemos.",
    prueba: "Mira si encaja con tu negocio.",
    faq: "¿Te queda alguna duda? Resuélvela en la llamada.",
  },

  hero: {
    label: "Para entrenadores personales con equipo",
    title: "El segundo cerebro de tu negocio de entrenamiento",
    subtitle:
      "Fivo conecta GoHighLevel, Harbiz y las herramientas de tu equipo en una sola memoria. Pregúntale cómo va cualquier cliente, lead o persona de tu equipo, también desde Claude o ChatGPT.",
    videoLabel: "Vídeo de Fivo para entrenadores personales",
    videoEnd: { title: "¿Lo vemos con tu negocio?", replay: "Volver a ver" },
    trust: "Cumple RGPD. Datos alojados en la UE. Tú decides quién ve qué.",
    integrations: { tools: ["gohighlevel", "harbiz"], text: "Se conecta con GoHighLevel y Harbiz" },
  },

  tools: {
    ids: ["gohighlevel", "harbiz", "zoom", "meet", "stripe", "gmail", "notion", "slack", "chatgpt", "claude"],
    title: "Se conecta a todo lo que usa tu equipo",
    intro: "Pulsa una herramienta para ver qué lee Fivo.",
    featured: ["gohighlevel", "harbiz"],
    srList:
      "GoHighLevel, Harbiz, Zoom, Google Meet, Stripe, Gmail, Notion y Slack, y ChatGPT y Claude vía MCP.",
  },

  sources: {
    title: "Qué entra en el grafo desde cada herramienta",
    items: [
      {
        id: "gohighlevel",
        name: "GoHighLevel",
        tools: ["gohighlevel"],
        featured: true,
        data: [
          "Contactos y sus etiquetas",
          "Origen del lead: anuncio, formulario o campaña",
          "Oportunidades y su etapa en el pipeline",
          "Conversaciones de WhatsApp, Instagram, Facebook, SMS y email",
          "Citas del calendario y quién no se presentó",
          "Respuestas de formularios y encuestas",
        ],
        question: "¿Qué leads de esta semana han reservado llamada y cuáles se han quedado en el chat con el setter?",
      },
      {
        id: "harbiz",
        name: "Harbiz",
        tools: ["harbiz"],
        featured: true,
        data: [
          "Clientes",
          "Planes de entrenamiento",
          "Sesiones completadas",
          "Pautas nutricionales",
          "Seguimiento y progreso",
          "Reservas",
          "Pagos y suscripciones",
        ],
        question: "¿Qué clientes han bajado sus sesiones este mes y cuándo renuevan?",
      },
      {
        id: "llamadas",
        name: "Videollamadas",
        tools: ["zoom", "meet", "teams"],
        data: [
          "Llamadas de venta",
          "Llamadas de onboarding",
          "Reuniones de equipo",
          "El resumen de cada una: qué se dijo, quién lo dijo y en qué quedó",
        ],
        question: "¿Qué objeción se repite en las llamadas que no cierran?",
      },
      {
        id: "equipo",
        name: "Equipo y organización",
        tools: ["slack", "notion", "drive", "gmail", "calendar", "outlook", "clickup", "trello", "asana"],
        data: ["Mensajes del equipo", "Documentos y procesos", "Correo", "Agenda", "Tareas"],
        question: "¿Qué tareas del lanzamiento del nuevo reto están paradas y quién las tiene?",
      },
      {
        id: "pagos",
        name: "Pagos",
        tools: ["stripe"],
        data: ["Cobros", "Suscripciones", "Impagos"],
        question: "¿Qué clientes tienen un pago fallido y siguen entrenando?",
      },
      {
        id: "ia",
        name: "Tu IA",
        tools: ["claude", "chatgpt", "gemini"],
        note: "Claude, ChatGPT y Gemini consultan todo esto por MCP, sin copiar y pegar nada.",
      },
      {
        id: "resto",
        name: "Todo lo demás",
        tools: ["zapier"],
        note: "Zapier y los webhooks conectan cualquier otra herramienta.",
      },
    ],
    footer: "No cambias ninguna herramienta. Tu equipo sigue trabajando igual.",
  },

  connect: {
    title: "Conecta GoHighLevel y Harbiz. Fivo une las dos historias.",
    tools: ["gohighlevel", "harbiz"],
    status: "Conectado",
    closing: "GoHighLevel sabe cómo entró cada cliente. Harbiz sabe cómo entrena. Fivo te dice lo que pasa entre medias.",
  },

  team: {
    title: "Cada persona de tu equipo, con lo que necesita",
    roles: [
      { initial: "T", role: "Tú", gives: "Sabes cómo va todo sin preguntar a nadie.", example: "¿Cómo ha ido la semana en ventas y en renovaciones?" },
      { initial: "S", role: "Setters", gives: "Saben qué leads tocar primero y con qué mensaje.", example: "¿Qué leads de ayer no han tenido respuesta?" },
      {
        initial: "C",
        role: "Closers",
        gives: "Llegan a cada llamada sabiendo lo que quiere el lead, y aprenden de las llamadas que cierran.",
        example: "Prepárame la llamada de las 17:00.",
      },
      {
        initial: "C",
        role: "Coaches",
        gives: "Saben lo que se le prometió a cada cliente en la venta y cómo va desde entonces.",
        example: "Resúmeme a Marta antes de su check-in.",
      },
      {
        initial: "N",
        role: "Nutricionista y atención al cliente",
        gives: "Tienen el historial de cada cliente sin pedirlo.",
        example: "¿Qué le pasó a Javier con la pauta de la semana pasada?",
      },
    ],
    footer: "Tú decides quién ve qué, con permisos por persona y por equipo.",
  },

  ai: {
    title: "Tu IA ya conoce tu negocio",
    text: "Fivo se conecta por MCP a Claude, ChatGPT y Gemini. Les das acceso a todo lo de arriba sin copiar y pegar nada.",
    tools: ["claude", "chatgpt", "gemini"],
    prompts: [
      {
        text: "Escribe a Lucía para proponerle ajustar el plan a sus turnos antes de que renueve.",
        sources: [{ label: "Llamada de venta" }, { label: "Harbiz", tool: "harbiz" }],
      },
      {
        text: "Prepárame un guion de llamada para los leads del Reto 21 días que se quedaron en el chat.",
        sources: [{ label: "GoHighLevel", tool: "gohighlevel" }, { label: "Llamadas" }],
      },
      {
        text: "Hazme el resumen del mes para la reunión del equipo: ventas, bajas y qué ha funcionado.",
        sources: [
          { label: "GoHighLevel", tool: "gohighlevel" },
          { label: "Harbiz", tool: "harbiz" },
          { label: "Stripe", tool: "stripe" },
          { label: "Llamadas" },
        ],
      },
    ],
  },

  problem: {
    title: { main: "Si todo pasa por tu cabeza, tu negocio no puede crecer más que tú" },
    pains: [
      { text: "Tu setter, tu closer y tu coach te preguntan a ti lo que ya está en GoHighLevel o en Harbiz.", group: "equipo" },
      { text: "Lo que el closer promete en la llamada no le llega al coach que lleva al cliente.", group: "ventas" },
      {
        text: "No sabes por qué un closer cierra más que otro ni por qué un cliente deja de renovar, porque no tienes tiempo de mirarlo.",
        group: "clientes",
      },
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
          { f: "googlecalendar.svg", dx: 42, dy: 10 },
        ],
      },
      {
        id: "equipo",
        label: "Tu equipo",
        cx: 0.76,
        cy: 0.22,
        ring: [160, 140],
        labelTop: 76,
        nodes: [
          { f: "slack.svg", dx: -34, dy: -18 },
          { f: "notion.svg", dx: 24, dy: -26 },
          { f: "gmail.svg", dx: -4, dy: 30 },
        ],
      },
      {
        id: "clientes",
        label: "Clientes y pagos",
        cx: 0.56,
        cy: 0.72,
        ring: [170, 150],
        labelTop: 82,
        nodes: [
          { f: "harbiz.svg", dx: -40, dy: -12 },
          { f: "stripe.svg", dx: 30, dy: -24 },
          { f: "googledrive.svg", dx: 14, dy: 30 },
        ],
      },
    ],
  },

  how: {
    steps: [
      {
        title: "Conectas GoHighLevel, Harbiz y las herramientas de tu equipo. No cambias ninguna.",
        desc: "Escena animada: los logotipos de GoHighLevel, Harbiz, Zoom, Google Meet, Stripe, Gmail, Notion, Slack, ChatGPT y Claude aparecen sueltos y se van conectando uno a uno con el nodo central de Fivo, hasta formar un grafo unido.",
      },
      {
        title: "Cada lead, cada llamada, cada check-in y cada pago entra en el grafo, unido a su persona y a su momento.",
        desc: "Escena animada de ejemplo: en una llamada de venta con dos participantes entra el asistente de Fivo. Lo que pasa se convierte en tres nodos: qué se dijo (entrena con turnos de noche), quién lo hizo (el closer promete adaptar el plan) y en qué quedó (programa de 12 semanas). Los tres se conectan entre sí y vuelan al grafo.",
      },
      {
        title: "Preguntas a Fivo, o a tu IA, y te responde con datos de tu negocio.",
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
      {
        id: "lanzamiento",
        q: "¿Qué se ha quedado sin hacer del lanzamiento del nuevo reto?",
        title: "La página del nuevo reto está parada desde el jueves.",
        used: [0, 2, 5],
        calls: [
          { sourceLabel: "ClickUp", title: "Tarea: página del nuevo reto" },
          { sourceLabel: "Slack", title: "Canal del lanzamiento" },
          { sourceLabel: "GoHighLevel", title: "Embudo del nuevo reto" },
        ],
        sr: "Del lanzamiento del nuevo reto, lo que se ha quedado sin hacer es la página del reto. Se decidió en la reunión del lunes, se asignó a Pablo y está parada desde el jueves, esperando los vídeos de los ejercicios. Lo tiene ahora Pablo, esperando a contenido. Ejemplo.",
        fallback:
          "La página del nuevo reto se decidió en la reunión del lunes, se asignó a Pablo y está parada desde el jueves, esperando los vídeos de los ejercicios. Lo tiene ahora Pablo, esperando a contenido. Ejemplo.",
        answer: {
          kind: "timeline",
          events: [
            { label: "Decidido", detail: "En la reunión del lunes" },
            { label: "Asignado", detail: "La página del reto, a Pablo" },
            { label: "Parado", detail: "Esperando los vídeos de los ejercicios desde el jueves" },
          ],
          nowLabel: "Lo tiene ahora",
          now: "Pablo, esperando a contenido",
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
        q: "¿Qué datos lee Fivo de GoHighLevel y de Harbiz?",
        a: "De GoHighLevel, tus contactos, oportunidades, conversaciones, citas y formularios. De Harbiz, tus clientes, planes, sesiones, nutrición, seguimiento y pagos. Tú eliges qué conectas.",
      },
      {
        q: "¿Mi equipo tiene que aprender algo nuevo?",
        a: "No. Siguen trabajando en GoHighLevel, en Harbiz y en sus herramientas de siempre. Fivo se alimenta de lo que ya hacen.",
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
