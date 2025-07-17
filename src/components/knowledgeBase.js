// Archivo: knowledgeBase.js

export const knowledgeBase = [
  // --- Small Talk (Charla casual) ---
  {
    intent: "thank_you",
    keywords: ["gracias", "muchas gracias", "te agradezco", "mil gracias"],
    response:
      "¡De nada! Para eso estoy. ¿Hay algo más en lo que pueda ayudarte?",
    nextStep: "fallback_ask_service",
  },
  {
    intent: "bot_compliment",
    keywords: ["que genio", "que bien", "muy util", "muy bueno", "excelente"],
    response:
      "¡Gracias! Me alegra mucho ser de ayuda 😊. Mi objetivo es que encuentres la mejor solución.",
  },
  {
    intent: "user_correction",
    keywords: [
      "no es asi",
      "incorrecto",
      "no me llamo",
      "te equivocaste",
      "no quise decir eso",
    ],
    response:
      "¡Ups! Mis disculpas. A veces puedo confundirme. Empecemos de nuevo para asegurarnos de tener la información correcta.",
    nextStep: "start",
  },

  // --- Intenciones Principales ---
  {
    intent: "ask_who_are_you",
    keywords: ["quien sos", "que sos", "que haces", "sos un bot"],
    response:
      "Soy AVI, un asistente virtual diseñado por Vane para ayudarte a encontrar la solución digital que necesitas. Mi objetivo es entender tu proyecto. ¿Continuamos?",
    nextStep: "fallback_ask_service",
    priority: 1, // baja prioridad, respuesta directa
  },
  {
    intent: "ask_price",
    keywords: ["precio", "costo", "sale", "valor", "presupuesto", "cuesta"],
    response:
      "Entiendo que el precio es clave. Como cada proyecto es a medida, lo mejor es que definamos qué necesitas para que Vane pueda darte un presupuesto exacto. ¿Te parece?",
    nextStep: "fallback_ask_service",
    priority: 3,
  },
  {
    intent: "ask_human",
    keywords: ["humano", "persona", "ayuda", "hablar", "contactar", "vane"],
    response: "¡Por supuesto! Te pongo en contacto con Vane ahora mismo.",
    nextStep: "redirect_whatsapp_human_request",
  },
  {
    intent: "ask_creator",
    keywords: [
      "quién te creó",
      "quién te hizo",
      "quién es tu creador",
      "quien es vane",
    ],
    response:
      "Fui creada y entrenada por Vane, la fundadora de VS Web Design. Ella me programó para ayudarte a encontrar la mejor solución digital. ¿Quieres hablar con ella?.",
  },

  // --- Intenciones ligadas a knowledgeDocs ---
  {
    intent: "ask_about_vane_experience",
    keywords: ["experiencia de vane", "sobre vos", "quien sos vos"],
    topicId: "info_about_vane",
  },
  {
    intent: "ask_about_bot",
    keywords: ["que eres tu", "que es avi", "eres un programa"],
    topicId: "info_about_bot",
  },
  {
    intent: "ask_about_experience_proof",
    keywords: [
      "que proyectos hiciste",
      "muestrame tu trabajo",
      "ejemplos",
      "portfolio",
      "experiencia",
    ],
    topicId: "info_experience_proof",
  },
  {
    intent: "ask_about_technologies",
    keywords: [
      "que tecnologias usas",
      "con que programas",
      "stack tecnologico",
      "react",
      "node",
    ],
    topicId: "info_tech_stack",
  },
  {
    intent: "ask_about_maintenance_plans",
    keywords: [
      "planes de mantenimiento",
      "plan pro",
      "plan base",
      "cuanto sale mantener la web",
    ],
    topicId: "info_maintenance_plans",
    priority: 3, // Alta prioridad, respuesta directa
  },
  {
    intent: "ask_workflow",
    keywords: [
      "como funciona",
      "como es el proceso",
      "como trabajas",
      "metodologia",
      "pasos",
    ],
    response:
      "El proceso es simple: primero entendemos tus necesidades, luego diseñamos una propuesta y, si te gusta, comenzamos el desarrollo. Te acompañamos en cada paso.",
    topicId: "info_workflow",
    priority: 1, // Prioridad baja, solo si no hay coincidencias más relevantes
  },
  {
    intent: "ask_what_is_maintenance",
    // Aplicamos la nueva estrategia de keywords:
    keywords: [
      "que es mantenimiento", // Frase completa y exacta
      "en que consiste el mantenimiento", // Variación
      "para que sirve el mantenimiento", // Otra variación
      "que incluye el mantenimiento", // Otra variación
    ],
    // Usaremos un nuevo doc para la explicación conceptual
    topicId: "info_mantenimiento_intro",
    priority: 2, // Prioridad normal
  },

  // INTENCIÓN PARA PREGUNTAS SOBRE "PLANES Y PRECIOS" DE MANTENIMIENTO
  {
    intent: "ask_about_maintenance_plans",
    keywords: [
      "planes de mantenimiento", // Frase específica
      "plan de mantenimiento", // Singular
      "plan pro",
      "plan base",
      "plan socio", // Nombres de productos
      "cuanto sale mantener", // Pregunta de precio
      "precio del mantenimiento", // Otra de precio
      "mantenimiento", // Palabra clave nuclear (genérica)
      "soporte", // Palabra clave relacionada
      "actualizaciones", // Palabra clave relacionada
    ],
    // Usaremos el doc que ya tenías para los detalles de los planes
    topicId: "info_maintenance_plans_details",
    priority: 3, // Prioridad ALTA porque se refiere a un servicio concreto
  },
];
