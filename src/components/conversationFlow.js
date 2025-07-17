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
    nextStep: "ask_initial_need",
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
    nextStep: "fallback_ask_service",
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
        nextStep: "ask_goal_established",
      },
      {
        text: "Modernizar o mejorar mi web actual",
        nextStep: "ask_goal_revamp",
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
        nextStep: "recommend_corp_site",
      },
      { text: "Vender mis productos 24/7", nextStep: "recommend_ecommerce" },
      {
        text: "Validar una idea con una página simple",
        nextStep: "recommend_landing_page",
      },
      {
        text: "Optimizar procesos internos de mi negocio",
        nextStep: "recommend_system",
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
        nextStep: "recommend_corp_site",
      },
      {
        text: "Añadir una tienda a mi web actual",
        nextStep: "recommend_ecommerce",
      },
    ],
  },

  // --- 2. RUTAS DE CUALIFICACIÓN POR SERVICIO ---
  recommend_corp_site: {
    message: () =>
      `¡Excelente elección! Un 'Sitio Web Corporativo' es la mejor manera de mostrar profesionalismo.`,
    type: "bot_message",
    nextStep: "qualify_corp_1",
  },
  qualify_corp_1: {
    message: () =>
      "Para orientarte mejor, ¿cuál es el objetivo principal de tu nueva web?",
    type: "user_options",
    variableName: "mainObjective",
    options: [
      {
        text: "Tener presencia online profesional",
        nextStep: "qualify_corp_2",
      },
      { text: "Mostrar mis trabajos/portfolio", nextStep: "qualify_corp_2" },
      { text: "Captar nuevos clientes (leads)", nextStep: "qualify_corp_2" },
    ],
  },
  qualify_corp_2: {
    message: () =>
      "Entendido. ¿Y necesitarás alguna sección o función especial?",
    type: "user_options",
    variableName: "specialFeatures",
    options: [
      { text: "Sí, necesito un Blog", nextStep: "pre_redirect_summary" },
      {
        text: "Sí, un sistema de turnos/reservas",
        nextStep: "pre_redirect_summary",
      },
      { text: "No, algo sencillo por ahora", nextStep: "pre_redirect_summary" },
    ],
  },
  recommend_ecommerce: {
    message: () => `¡Vamos por esas ventas! Una 'Tienda Online' es el camino.`,
    type: "bot_message",
    nextStep: "qualify_ecommerce_1",
  },
  qualify_ecommerce_1: {
    message: () =>
      "Para entender mejor tu proyecto, ¿ya tienes los productos con sus descripciones y fotos?",
    type: "user_options",
    variableName: "hasProducts",
    options: [
      { text: "Sí, tengo todo listo", nextStep: "qualify_ecommerce_2" },
      { text: "No, necesito ayuda con eso", nextStep: "qualify_ecommerce_2" },
      { text: "Más o menos", nextStep: "qualify_ecommerce_2" },
    ],
  },
  qualify_ecommerce_2: {
    message: () =>
      "Genial. ¿Necesitas que la tienda acepte pagos con alguna plataforma específica como Mercado Pago?",
    type: "user_options",
    variableName: "paymentGateway",
    options: [
      { text: "Sí, con Mercado Pago", nextStep: "pre_redirect_summary" },
      { text: "Sí, con otra plataforma", nextStep: "pre_redirect_summary" },
      { text: "Lo vemos después", nextStep: "pre_redirect_summary" },
    ],
  },
  recommend_landing_page: {
    message: (data) =>
      `Entendido, ${data.userName}. Para validar tu idea o promocionar algo específico, una 'Página de Lanzamiento' es ideal.`,
    type: "bot_message",
    nextStep: "qualify_landing_1",
  },
  qualify_landing_1: {
    message: () => "Esta página tendrá un objetivo principal. ¿Cuál sería?",
    type: "user_options",
    variableName: "landingGoal",
    options: [
      {
        text: "Capturar emails de interesados",
        nextStep: "pre_redirect_summary",
      },
      {
        text: "Vender un único producto/curso",
        nextStep: "pre_redirect_summary",
      },
      { text: "Promocionar un evento", nextStep: "pre_redirect_summary" },
    ],
  },
  recommend_system: {
    message: () =>
      `¡Excelente visión! Dejar atrás las planillas es clave. La solución es un 'Sistema a Medida'.`,
    type: "bot_message",
    nextStep: "qualify_system_1",
  },
  qualify_system_1: {
    message: () =>
      "Para empezar, ¿cuál es el proceso más importante que te gustaría automatizar o mejorar?",
    type: "user_input",
    variableName: "processToAutomate",
    nextStep: "qualify_system_2",
  },
  qualify_system_2: {
    message: () =>
      "Ok. ¿Y este sistema necesita conectarse con algún otro software que ya uses (ej. Google Sheets, un sistema de facturación, etc.)?",
    type: "user_options",
    variableName: "needsIntegration",
    options: [
      { text: "Sí, necesita integrarse", nextStep: "pre_redirect_summary" },
      { text: "No, es independiente", nextStep: "pre_redirect_summary" },
      { text: "No estoy seguro/a", nextStep: "pre_redirect_summary" },
    ],
  },

  // --- 3. FLUJO FINAL Y REDIRECCIÓN ---
  pre_redirect_summary: {
    message: (data) =>
      `¡Perfecto, ${data.userName}! Tengo toda la información. Te estoy preparando para hablar con Vane y darle este resumen de tu proyecto.`,
    type: "bot_message",
    nextStep: "redirect_whatsapp",
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
