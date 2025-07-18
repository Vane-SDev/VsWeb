// Archivo: conversationFlow.js

const getRandomMessage = (messages) => {
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
};

export const conversationFlow = {
  // --- 1. FLUJO INICIAL ---
  start: {
    // SOLUCIÓN: La propiedad 'messages' ahora es un array que contiene funciones.
    messages: [
      () =>
        getRandomMessage([
          "¡Hola! Soy Aria, tu asistente virtual.",
          "¡Buenas! Mi nombre es Aria y estoy para ayudarte.",
        ]),
      () =>
        getRandomMessage([
          "Estoy aquí para ayudarte a encontrar la solución digital perfecta. Primero, ¿cómo te llamas?",
          "Mi objetivo es guiarte hacia el proyecto ideal para ti. Para empezar, ¿me dices tu nombre?",
        ]),
    ],
    type: "user_input",
    variableName: "userName",
    nextStepId: "ask_initial_need",
    // --- NUEVAS PROPIEDADES PARA LA VALIDACIÓN ---
    validation: "isName", // Le decimos qué tipo de dato esperamos.
    repromptMessage:
      "Mmm, eso no parece un nombre. Por favor, ¿podrías indicarme tu nombre para que podamos seguir?", // Mensaje de error personalizado.
  },
  ask_initial_need: {
    message: (data) =>
      getRandomMessage([
        `¡Un gusto, ${data.userName}! Ahora, ¿qué tienes en mente o qué problema te gustaría resolver?`,
        `Genial, ${data.userName}. Cuéntame, ¿en qué puedo ayudarte hoy?`,
        `Ok, ${data.userName}. ¿Qué proyecto tienes en mente? Describe tu idea o necesidad.`,
      ]),
    type: "user_input",
    variableName: "initialQuery",
    nextStepId: "fallback_ask_service",
  },
  fallback_ask_service: {
    message: () =>
      getRandomMessage([
        "Entendido. Para poder guiarte mejor, ¿cuál de estas opciones describe lo que buscas?",
        "Perfecto. Ayúdame a entender un poco más, ¿cuál de estos puntos se acerca más a tu necesidad?",
      ]),
    type: "user_options",
    variableName: "serviceInterest",
    options: [
      {
        text: "Lanzar un nuevo proyecto/idea",
        nextStepId: "ask_goal_established",
      },
      {
        text: "Modernizar o mejorar mi web actual",
        nextStepId: "ask_goal_revamp",
      },
    ],
  },
  ask_goal_established: {
    message: () =>
      "¡Excelente! Siempre hay espacio para crecer. ¿Qué es lo más importante para vos en este momento?",
    type: "user_options",
    variableName: "mainGoal",
    options: [
      {
        text: "Atraer más clientes y mostrar profesionalismo",
        nextStepId: "recommend_corp_site",
      },
      { text: "Vender mis productos 24/7", nextStepId: "recommend_ecommerce" },
      {
        text: "Validar una idea con una página simple",
        nextStepId: "recommend_landing_page",
      },
      {
        text: "Optimizar procesos internos de mi negocio",
        nextStepId: "recommend_system",
      },
    ],
  },
  ask_goal_revamp: {
    message: () =>
      "¡Perfecto! Modernizar tu presencia online es una gran decisión. ¿Qué buscas principalmente?",
    type: "user_options",
    variableName: "mainGoal",
    options: [
      {
        text: "Un rediseño completo y moderno",
        nextStepId: "recommend_corp_site",
      },
      {
        text: "Añadir una tienda a mi web actual",
        nextStepId: "recommend_ecommerce",
      },
    ],
  },

  // --- 2. RUTAS DE CUALIFICACIÓN POR SERVICIO ---
  recommend_corp_site: {
    message: () =>
      `¡Excelente elección! Un 'Sitio Web Corporativo' es la mejor manera de mostrar profesionalismo.`,
    type: "bot_message",
    nextStepId: "qualify_corp_1",
  },
  qualify_corp_1: {
    message: () =>
      "Para orientarte mejor, ¿cuál es el objetivo principal de tu nueva web?",
    type: "user_options",
    variableName: "mainObjective",
    options: [
      {
        text: "Tener presencia online profesional",
        nextStepId: "qualify_corp_2",
      },
      { text: "Mostrar mis trabajos/portfolio", nextStepId: "qualify_corp_2" },
      { text: "Captar nuevos clientes (leads)", nextStepId: "qualify_corp_2" },
    ],
  },
  qualify_corp_2: {
    message: () =>
      "Entendido. ¿Y necesitarás alguna sección o función especial?",
    type: "user_options",
    variableName: "specialFeatures",
    options: [
      { text: "Sí, necesito un Blog", nextStepId: "pre_redirect_summary" },
      {
        text: "Sí, un sistema de turnos/reservas",
        nextStepId: "pre_redirect_summary",
      },
      { text: "No, algo sencillo por ahora", nextStepId: "pre_redirect_summary" },
    ],
  },
  recommend_ecommerce: {
    message: () => `¡Vamos por esas ventas! Una 'Tienda Online' es el camino.`,
    type: "bot_message",
    nextStepId: "qualify_ecommerce_1",
  },
  qualify_ecommerce_1: {
    message: () =>
      "Para entender mejor tu proyecto, ¿ya tienes los productos con sus descripciones y fotos?",
    type: "user_options",
    variableName: "hasProducts",
    options: [
      { text: "Sí, tengo todo listo", nextStepId: "qualify_ecommerce_2" },
      { text: "No, necesito ayuda con eso", nextStepId: "qualify_ecommerce_2" },
      { text: "Más o menos", nextStepId: "qualify_ecommerce_2" },
    ],
  },
  qualify_ecommerce_2: {
    message: () =>
      "Genial. ¿Necesitas que la tienda acepte pagos con alguna plataforma específica como Mercado Pago?",
    type: "user_options",
    variableName: "paymentGateway",
    options: [
      { text: "Sí, con Mercado Pago", nextStepId: "pre_redirect_summary" },
      { text: "Sí, con otra plataforma", nextStepId: "pre_redirect_summary" },
      { text: "Lo vemos después", nextStepId: "pre_redirect_summary" },
    ],
  },
  recommend_landing_page: {
    message: (data) =>
      `Entendido, ${data.userName}. Para validar tu idea o promocionar algo específico, una 'Página de Lanzamiento' es ideal.`,
    type: "bot_message",
    nextStepId: "qualify_landing_1",
  },
  qualify_landing_1: {
    message: () => "Esta página tendrá un objetivo principal. ¿Cuál sería?",
    type: "user_options",
    variableName: "landingGoal",
    options: [
      {
        text: "Capturar emails de interesados",
        nextStepId: "pre_redirect_summary",
      },
      {
        text: "Vender un único producto/curso",
        nextStepId: "pre_redirect_summary",
      },
      { text: "Promocionar un evento", nextStepId: "pre_redirect_summary" },
    ],
  },
  recommend_system: {
    message: () =>
      `¡Excelente visión! Dejar atrás las planillas es clave. La solución es un 'Sistema a Medida'.`,
    type: "bot_message",
    nextStepId: "qualify_system_1",
  },
  qualify_system_1: {
    message: () =>
      "Para empezar, ¿cuál es el proceso más importante que te gustaría automatizar o mejorar?",
    type: "user_input",
    variableName: "processToAutomate",
    nextStepId: "qualify_system_2",
  },
  qualify_system_2: {
    message: () =>
      "Ok. ¿Y este sistema necesita conectarse con algún otro software que ya uses (ej. Google Sheets, un sistema de facturación, etc.)?",
    type: "user_options",
    variableName: "needsIntegration",
    options: [
      { text: "Sí, necesita integrarse", nextStepId: "pre_redirect_summary" },
      { text: "No, es independiente", nextStepId: "pre_redirect_summary" },
      { text: "No estoy seguro/a", nextStepId: "pre_redirect_summary" },
    ],
  },

  // --- NUEVO: FLUJO PARA ASESORAR SOBRE PLANES DE MANTENIMIENTO ---

    advise_plan_1: {
        message: () => getRandomMessage([
            "¡Claro! Te ayudo a decidir. Para empezar, ¿con qué frecuencia crees que necesitarás hacer cambios o subir contenido nuevo a tu web (fotos, textos, artículos de blog, etc.)?",
            "Por supuesto, encontremos el plan ideal para ti. Dime, ¿qué tan dinámica será tu web? ¿Necesitarás actualizar su contenido a menudo?"
        ]),
        type: "user_options",
        variableName: "updateFrequency", // Guardamos esta valiosa respuesta
        options: [
            { text: "Casi nunca, solo me importa la seguridad", nextStepId: "recommend_plan_base" },
            { text: "De vez en cuando (ej. una vez al mes)", nextStepId: "recommend_plan_pro" },
            { text: "Muy seguido, es una web muy activa", nextStepId: "recommend_plan_socio" },
        ]
    },

    recommend_plan_base: {
        message: () => "Perfecto. En ese caso, te recomiendo el **Plan Base**. Te da la tranquilidad total de que tu sitio está seguro, rápido y con copias de seguridad, sin que tengas que preocuparte por nada. Es ideal si tu contenido no cambia a menudo.",
        type: "bot_message",
        nextStepId: "ask_more_help" // Un nuevo paso para ver si necesita algo más
    },

    recommend_plan_pro: {
        message: () => "Entendido. El **Plan Pro** es ideal para ti. Te cubre toda la parte técnica y de seguridad, y además te incluye un banco de horas para que me pidas esas actualizaciones de contenido. Es nuestro plan más elegido.",
        type: "bot_message",
        nextStepId: "ask_more_help"
    },

    recommend_plan_socio: {
        message: () => "¡Excelente! Para una web con tanto movimiento, el **Plan Socio** es la mejor opción. Nos convertimos en una extensión de tu equipo, no solo manteniendo la web, sino también proponiendo mejoras y desarrollando nuevas funciones para que tu proyecto no pare de crecer.",
        type: "bot_message",
        nextStepId: "ask_more_help"
    },

    ask_more_help: {
        message: () => "¿Te gustaría contratar este plan o tienes alguna otra consulta?",
        type: "user_options",
        options: [
            { text: "Hablemos para contratar", nextStepId: "redirect_whatsapp_human_request"},
            { text: "Tengo otra duda", nextStepId: "fallback_ask_service" },
        ]
    },


  // --- 3. FLUJO FINAL Y REDIRECCIÓN ---
  pre_redirect_summary: {
    message: (data) =>
      `¡Perfecto, ${data.userName}! Tengo toda la información. Te estoy preparando para hablar con Vane y darle este resumen de tu proyecto.`,
    type: "bot_message",
    nextStepId: "redirect_whatsapp",
  },
  redirect_whatsapp: {
    message: () =>
      "¡Listo! Te estoy redirigiendo a WhatsApp con un resumen de tu consulta para darte la mejor atención.",
    type: "redirect",
  },
  redirect_whatsapp_human_request: {
    message: () => "Redirigiendo a WhatsApp...",
    type: "redirect_simple",
  },
  fallback_final_redirect: {
    message: () =>
      "Mmm, parece que sigo sin entenderte. No te preocupes, para no dar más vueltas te conecto directamente con Vane. Ella te ayudará mejor.",
    type: "redirect_simple",
  },
};
