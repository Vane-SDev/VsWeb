// Archivo: conversationFlow.js
import { personalizationData } from "./personalization.js";
import { knowledgeDocs } from "./knowledgeDocs.js";
import { activePromotion } from "./promotions.js";

const getRandomMessage = (messages) => {
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
};

export const conversationFlow = {
  // --- 1. FLUJO INICIAL ---
  start: {
    messages: [
      () =>
        getRandomMessage([
          "¡Hola! Soy Arya, tu asistente virtual.",
          "¡Buenas! Mi nombre es Arya y estoy para ayudarte.",
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
    validation: "isName",
    repromptMessage: () =>
      getRandomMessage([
        "Mmm, eso no parece un nombre. Por favor, ¿podrías indicarme tu nombre para que podamos seguir?",
        "Creo que no entendí bien. ¿Podrías decirme tu nombre?",
      ]),
  },
  ask_initial_need: {
    message: (data) => {
      const businessType = data.businessType?.toLowerCase();
      if (businessType && personalizationData[businessType]) {
        return (
          personalizationData[businessType].openingLine +
          "\n\n" +
          personalizationData[businessType].suggestions
        );
      }
      return getRandomMessage([
        `¡Un gusto, ${data.userName}! Ahora, ¿qué tienes en mente o qué problema te gustaría resolver?`,
        `Genial, ${data.userName}. Cuéntame, ¿en qué puedo ayudarte hoy?`,
      ]);
    },
    type: "user_options",
    variableName: "initialQuery",
    options: (data) => {
      const businessType = data.businessType?.toLowerCase();
      if (businessType && personalizationData[businessType]) {
        return personalizationData[businessType].options;
      }
      return [
        {
          text: "Lanzar un nuevo proyecto/idea",
          nextStepId: "ask_goal_established",
        },
        {
          text: "Modernizar o mejorar mi web actual",
          nextStepId: "ask_goal_revamp",
        },
      ];
    },
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
      { text: "Sí, necesito un Blog", nextStepId: "qualify_domain_hosting" },
      {
        text: "Sí, un sistema de turnos/reservas",
        nextStepId: "qualify_domain_hosting",
      },
      {
        text: "No, algo sencillo por ahora",
        nextStepId: "qualify_domain_hosting",
      },
    ],
  },
  qualify_domain_hosting: {
    message: () =>
      "¡Genial! Una pregunta técnica rápida: ¿ya tienes un dominio (ej: tunombre.com) y un servicio de hosting comprados?",
    type: "user_options",
    variableName: "hasDomainHosting",
    options: [
      { text: "Sí, ya tengo ambos", nextStepId: "ask_for_reference_site" },
      { text: "No, necesito contratar", nextStepId: "ask_for_reference_site" },
      {
        text: "¿Qué es dominio y hosting?",
        nextStepId: "explain_domain_hosting",
      },
    ],
  },
  explain_domain_hosting: {
    message: () => knowledgeDocs.info_domain_hosting_simple,
    type: "bot_message",
    nextStepId: "reask_domain_hosting",
  },
  reask_domain_hosting: {
    message: () =>
      "Ahora que ya sabes qué es un dominio y hosting, ¿cuentas con uno?",
    type: "user_options",
    variableName: "hasDomainHosting",
    options: [
      { text: "Sí, ya tengo ambos", nextStepId: "ask_for_reference_site" },
      { text: "No, necesito contratar", nextStepId: "ask_for_reference_site" },
    ],
  },
  ask_for_reference_site: {
    message: (data) => {
      const confirmation =
        data.hasDomainHosting === "Sí, ya tengo ambos"
          ? "¡Perfecto! Un paso menos."
          : "No te preocupes, nos encargamos de todo el proceso de registro.";
      return `${confirmation} Ahora, para inspirarnos, ¿tienes algún sitio web de referencia que te guste cómo se ve o funciona? Puedes pegarme el link.`;
    },
    type: "user_input",
    variableName: "referenceSite",
    // SOLUCIÓN: Apuntamos al final del flujo, no hacia atrás.
    nextStepId: "pre_redirect_summary",
  },

  recommend_ecommerce: {
    message: () =>
      `¡Vamos por esas ventas! Una 'Tienda Online' es el camino. Para darte la mejor recomendación, necesito hacerte algunas preguntas.`,
    type: "bot_message",
    nextStepId: "qualify_ecommerce_1",
  },
  qualify_ecommerce_1: {
    message: () => "Primero, ¿qué tipo de productos vas a vender?",
    type: "user_options",
    variableName: "productType",
    options: [
      {
        text: "Productos Físicos (ej: ropa, deco)",
        nextStepId: "qualify_ecommerce_2",
      },
      {
        text: "Productos Digitales (ej: cursos, ebooks)",
        nextStepId: "qualify_ecommerce_2",
      },
      {
        text: "Servicios (ej: consultorías, clases)",
        nextStepId: "qualify_ecommerce_2",
      },
    ],
  },
  qualify_ecommerce_2: {
    message: () =>
      "Entendido. ¿Ya tienes los productos cargados en algún lugar, con fotos y descripciones, o empezamos desde cero?",
    type: "user_options",
    variableName: "hasProducts",
    options: [
      { text: "Sí, tengo todo listo", nextStepId: "qualify_ecommerce_3" },
      { text: "No, necesito ayuda con eso", nextStepId: "qualify_ecommerce_3" },
      { text: "Tengo algunas cosas", nextStepId: "qualify_ecommerce_3" },
    ],
  },
  qualify_ecommerce_3: {
    message: () =>
      "Perfecto. Hablemos de los pagos. ¿Cuál es la principal forma en que te gustaría cobrar a tus clientes?",
    type: "user_options",
    variableName: "paymentGateway",
    options: [
      { text: "Con Mercado Pago", nextStepId: "qualify_ecommerce_4" },
      {
        text: "Transferencia Bancaria / Efectivo",
        nextStepId: "qualify_ecommerce_4",
      },
      { text: "Aún no lo he decidido", nextStepId: "qualify_ecommerce_4" },
    ],
  },
  qualify_ecommerce_4: {
    message: () =>
      "¡Genial! Y por último, ¿cómo tienes pensado manejar los envíos de tus productos?",
    type: "user_options",
    variableName: "shippingMethod",
    options: [
      {
        text: "Con Correo Argentino / Andreani",
        nextStepId: "pre_redirect_summary",
      },
      {
        text: "Ofreceré retiro en mi local",
        nextStepId: "pre_redirect_summary",
      },
      { text: "Todavía no lo sé", nextStepId: "pre_redirect_summary" },
    ],
  },

  recommend_landing_page: {
    message: (data) =>
      `¡Entendido, ${data.userName}! Para validar tu idea o promocionar algo específico, una 'Página de Lanzamiento' es ideal. Te haré un par de preguntas para definir la estrategia.`,
    type: "bot_message",
    nextStepId: "qualify_landing_1",
  },
  qualify_landing_1: {
    message: () =>
      "Esta página tendrá un objetivo principal, una única acción que queremos que el usuario realice. ¿Cuál sería?",
    type: "user_options",
    variableName: "landingGoal",
    // Apuntamos al siguiente paso de cualificación
    options: [
      {
        text: "Capturar emails de interesados",
        nextStepId: "qualify_landing_2",
      },
      {
        text: "Vender un único producto/curso",
        nextStepId: "qualify_landing_2",
      },
      {
        text: "Promocionar un evento o webinar",
        nextStepId: "qualify_landing_2",
      },
    ],
  },
  qualify_landing_2: {
    message: () =>
      "Perfecto. Y después de que el usuario complete esa acción (dejar su email, comprar, etc.), ¿qué debería pasar?",
    type: "user_options",
    variableName: "postConversionAction",
    options: [
      {
        text: "Mostrarle una página de 'Gracias'",
        nextStepId: "qualify_landing_3",
      },
      {
        text: "Redirigirlo a otra web o un link de pago",
        nextStepId: "qualify_landing_3",
      },
      { text: "Aún no lo he decidido", nextStepId: "qualify_landing_3" },
    ],
  },
  qualify_landing_3: {
    message: () =>
      "¡Genial! Por último, ¿esta página está asociada a alguna fecha o campaña con una duración específica (ej: Hot Sale, promo del Día de la Madre, etc.)?",
    type: "user_options",
    variableName: "isCampaignBased",
    options: [
      {
        text: "Sí, es para una fecha/promo concreta",
        nextStepId: "offer_email_summary",
      }, // Terminamos y ofrecemos resumen por mail
      {
        text: "No, es una página permanente",
        nextStepId: "offer_email_summary",
      },
    ],
  },

  recommend_system: {
    message: () =>
      `¡Excelente visión! Dejar atrás las planillas es clave. Un 'Sistema a Medida' es la solución definitiva. Para entender bien tu necesidad, te haré algunas preguntas clave.`,
    type: "bot_message",
    nextStepId: "qualify_system_1",
  },
  qualify_system_1: {
    message: () =>
      "Para empezar, ¿cuál es el proceso principal de tu negocio que hoy te causa más problemas o te consume más tiempo?",
    type: "user_input",
    variableName: "processToAutomate",
    nextStepId: "qualify_system_2",
  },
  qualify_system_2: {
    message: () =>
      "Entendido. Y ¿quiénes serían los usuarios principales de este sistema?",
    type: "user_options",
    variableName: "systemUsers",
    options: [
      { text: "Mi equipo interno", nextStepId: "qualify_system_3" },
      { text: "Mis clientes", nextStepId: "qualify_system_3" },
      { text: "Ambos (equipo y clientes)", nextStepId: "qualify_system_3" },
    ],
  },
  qualify_system_3: {
    message: () =>
      "Perfecto. ¿Y desde dónde necesitarían usarlo principalmente?",
    type: "user_options",
    variableName: "usageEnvironment",
    options: [
      {
        text: "Desde computadoras en la oficina",
        nextStepId: "qualify_system_4",
      },
      {
        text: "Desde celulares o tablets (en la calle)",
        nextStepId: "qualify_system_4",
      },
      {
        text: "Desde ambos tipos de dispositivos",
        nextStepId: "qualify_system_4",
      },
    ],
  },
  qualify_system_4: {
    message: () =>
      "Ok, última pregunta. ¿Este nuevo sistema necesita conectarse o intercambiar datos con algún otro software que ya uses (ej. Google Sheets, sistema de facturación, etc.)?",
    type: "user_options",
    variableName: "needsIntegration",
    options: [
      { text: "Sí, necesita integrarse", nextStepId: "offer_email_summary" }, // Lo mandamos al flujo de captura de email
      { text: "No, es independiente", nextStepId: "offer_email_summary" },
      { text: "No estoy seguro/a", nextStepId: "offer_email_summary" },
    ],
  },

  // --- NUEVO: FLUJO PARA ASESORAR SOBRE PLANES DE MANTENIMIENTO ---

  advise_plan_1: {
    message: () =>
      getRandomMessage([
        "¡Claro! Te ayudo a decidir. Para empezar, ¿con qué frecuencia crees que necesitarás hacer cambios o subir contenido nuevo a tu web (fotos, textos, artículos de blog, etc.)?",
        "Por supuesto, encontremos el plan ideal para ti. Dime, ¿qué tan dinámica será tu web? ¿Necesitarás actualizar su contenido a menudo?",
      ]),
    type: "user_options",
    variableName: "updateFrequency", // Guardamos esta valiosa respuesta
    options: [
      {
        text: "Casi nunca, solo me importa la seguridad",
        nextStepId: "recommend_plan_base",
      },
      {
        text: "De vez en cuando (ej. una vez al mes)",
        nextStepId: "recommend_plan_pro",
      },
      {
        text: "Muy seguido, es una web muy activa",
        nextStepId: "recommend_plan_socio",
      },
    ],
  },

  recommend_plan_base: {
    message: () =>
      "Perfecto. En ese caso, te recomiendo el **Plan Base**. Te da la tranquilidad total de que tu sitio está seguro, rápido y con copias de seguridad, sin que tengas que preocuparte por nada. Es ideal si tu contenido no cambia a menudo.",
    type: "bot_message",
    nextStepId: "ask_more_help", // Un nuevo paso para ver si necesita algo más
  },

  recommend_plan_pro: {
    message: () =>
      "Entendido. El **Plan Pro** es ideal para ti. Te cubre toda la parte técnica y de seguridad, y además te incluye un banco de horas para que me pidas esas actualizaciones de contenido. Es nuestro plan más elegido.",
    type: "bot_message",
    nextStepId: "ask_more_help",
  },

  recommend_plan_socio: {
    message: () =>
      "¡Excelente! Para una web con tanto movimiento, el **Plan Socio** es la mejor opción. Nos convertimos en una extensión de tu equipo, no solo manteniendo la web, sino también proponiendo mejoras y desarrollando nuevas funciones para que tu proyecto no pare de crecer.",
    type: "bot_message",
    nextStepId: "ask_more_help",
  },

  ask_more_help: {
    message: () =>
      "¿Te ha sido útil la información? ¿Qué te gustaría hacer ahora?",
    type: "user_options",
    options: [
      {
        text: "Hablemos para contratar",
        nextStepId: "redirect_whatsapp_human_request",
      },
      // En lugar de ir a un fallback, vamos a nuestro nuevo menú de ayuda
      { text: "Tengo otra duda", nextStepId: "help_menu" },
    ],
  },

  // --- NUEVO: EL MENÚ DE AYUDA CENTRAL ---
  help_menu: {
    message: () =>
      "¡Por supuesto! Dime, ¿sobre qué te gustaría saber más? Puedes elegir una de estas opciones comunes o simplemente escribir tu pregunta.",
    type: "user_options",
    options: [
      // Cada opción apunta a un nuevo paso que dará una respuesta específica
      {
        text: "¿Qué es Dominio y Hosting?",
        nextStepId: "answer_hosting_domain",
      },
      { text: "¿Qué tecnologías usan?", nextStepId: "answer_tech_stack" },
      { text: "Ver ejemplos de trabajos", nextStepId: "answer_portfolio" },
      {
        text: "No, gracias. Hablemos con Vane",
        nextStepId: "redirect_whatsapp_human_request",
      },
    ],
  },

  // --- NUEVO: PASOS DE RESPUESTA PARA EL MENÚ DE AYUDA ---
  answer_hosting_domain: {
    // Reutilizamos el contenido que ya tenemos en knowledgeDocs para no repetir código
    message: () => knowledgeDocs.info_domain_hosting_simple,
    type: "bot_message",
    // Después de responder, volvemos a preguntar si necesita más ayuda
    nextStepId: "ask_more_help_again",
  },
  answer_tech_stack: {
    message: () => knowledgeDocs.info_tech_stack,
    type: "bot_message",
    nextStepId: "ask_more_help_again",
  },
  answer_portfolio: {
    message: () => knowledgeDocs.info_experience_proof,
    type: "bot_message",
    nextStepId: "ask_more_help_again",
  },

  // --- NUEVO: Un paso de "loop" para seguir ayudando ---
  ask_more_help_again: {
    message: () =>
      "Espero que eso haya sido útil. ¿Hay algo más en lo que pueda ayudarte?",
    type: "user_options",
    options: [
      { text: "Sí, tengo otra duda", nextStepId: "help_menu" },
      {
        text: "No, contactemos con Vane",
        nextStepId: "redirect_whatsapp_human_request",
      },
    ],
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
  // --- NUEVO: FLUJO DE PROMOCIÓN ESPECIAL ---
  promo_offer: {
    // Usamos la información del archivo de promociones
    message: (data) =>
      `¡Espera, ${data.userName}! Antes de continuar, y por ser un usuario valioso del asistente, tengo una oferta exclusiva para vos: ${activePromotion.details}`,
    type: "user_options",
    options: [
      {
        text: "¡Me interesa! Contame más",
        nextStepId: "redirect_whatsapp_human_request",
      },
      { text: "No, gracias. Sigamos.", nextStepId: "ask_more_help" },
    ],
  },
};


