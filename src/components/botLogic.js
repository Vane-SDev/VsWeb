// Archivo: src/botLogic.js (Versión Final con Análisis Combinado Corregido)

import { conversationFlow } from "./conversationFlow.js";
import { knowledgeBase } from "./knowledgeBase.js";
import { serviceKeywords } from "./serviceKeywords.js";
import ReactGA from "react-ga4";

// --- Constantes y Funciones Auxiliares (sin cambios) ---
const affirmativeWords = [
  "si",
  "sí",
  "dale",
  "ok",
  "claro",
  "por supuesto",
  "continuar",
  "siguiente",
  "vamos",
];
const greetings = [
  "hola",
  "buenas",
  "buenos días",
  "buenas tardes",
  "buenas noches",
  "saludos",
  "hello",
  "hi",
];
const closingQuestions = [
  "¿quieres hablar con ella?",
  "¿quieres hablar con vane?",
  "¿quieres que te contacte vane?",
];
const advancingQuestions = ["¿continuamos?", "¿te parece?"];
const businessEntities = {
  businessType: [
    "peluqueria",
    "estilista",
    "restaurante",
    "consultorio",
    "abogados",
    "tienda de ropa",
    "gimnasio",
    "contable",
    "inmobiliaria",
    "emprendimiento",
  ],
  userGoal: [
    "vender mas",
    "conseguir clientes",
    "mostrar mi trabajo",
    "tener presencia",
    "automatizar",
    "mejorar mi imagen",
  ],
};
const normalizeText = (text = "") => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};
const extractInfoFromMessage = (message) => {
  let updates = {};
  const lowerCaseMessage = normalizeText(message);
  const namePatterns = [
    /me llamo ([a-zA-Z]+)/,
    /mi nombre es ([a-zA-Z]+)/,
    /soy ([a-zA-Z]+)(?!.*[¿?¡!])/,
  ];
  for (const pattern of namePatterns) {
    const match = lowerCaseMessage.match(pattern);
    if (
      match &&
      match[1] &&
      !greetings.includes(match[1]) &&
      !Object.values(businessEntities).flat().includes(match[1])
    ) {
      const nombre = match[1].trim();
      updates.userName = nombre.charAt(0).toUpperCase() + nombre.slice(1);
      return updates;
    }
  }
  return updates;
};
const extractBusinessContext = (message) => {
  const context = {};
  const lowerCaseMessage = normalizeText(message);
  for (const type of businessEntities.businessType) {
    if (lowerCaseMessage.includes(type)) {
      context.businessType = type.charAt(0).toUpperCase() + type.slice(1);
      break;
    }
  }
  for (const goal of businessEntities.userGoal) {
    if (lowerCaseMessage.includes(goal)) {
      context.userGoal = goal.charAt(0).toUpperCase() + goal.slice(1);
      break;
    }
  }
  return context;
};
const isValidName = (input) => {
  const text = normalizeText(input);
  if (greetings.includes(text)) return false;
  if (text.split(" ").length > 3) return false;
  if (/[¿?¡!*]/.test(text) || text.length < 2) return false;
  if (
    Object.values(businessEntities)
      .flat()
      .some((word) => text.includes(word))
  )
    return false;
  return true;
};

const isValidEmail = (input) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(input.trim());
};

// --- EL CEREBRO: findNextStep (CON LÓGICA CORREGIDA) ---
export const findNextStep = (userInput, context) => {
  const { currentStepId, lastBotMsg, lastBotIntent } = context;
  const normalizedMessage = normalizeText(userInput);
  const currentStep = conversationFlow[currentStepId] || {};

  // --- PRIORIDAD 0: EXTRACCIÓN DE DATOS SI SE ESPERAN ---
  if (
    currentStep.type === "user_input" &&
    currentStep.validation === "isName"
  ) {
    const extracted = extractInfoFromMessage(userInput);
    if (extracted.userName) {
      return { nextStepId: currentStep.nextStepId, dataToUpdate: extracted };
    }
  }

  // --- PRIORIDAD 1: RESPUESTAS CONTEXTUALES (SÍ/NO) ---
  const isAffirmative = affirmativeWords.some(
    (w) => normalizedMessage.length < 10 && normalizedMessage === w
  );
  if (isAffirmative) {
    if (
      advancingQuestions.some((q) => normalizeText(lastBotMsg).includes(q)) &&
      lastBotIntent?.nextStepId
    )
      return { nextStepId: lastBotIntent.nextStepId };
    if (closingQuestions.some((q) => normalizeText(lastBotMsg).includes(q)))
      return {
        response: "¡Ok, te conecto con Vane!",
        nextStepId: "redirect_whatsapp_human_request",
      };
  }

  // --- PRIORIDAD 2: BÚSQUEDA DE INTENCIÓN GENERAL (KNOWLEDGEBASE) ---
  let bestMatch = { score: 0, decision: null };
  for (const item of knowledgeBase) {
    for (const keyword of item.keywords) {
      if (normalizedMessage.includes(normalizeText(keyword))) {
        const score = keyword.length * (item.priority || 1);
        if (score > bestMatch.score) {
          bestMatch = { score, decision: { ...item } };
        }
      }
    }
  }
  if (bestMatch.score > 0) return bestMatch.decision;

  // --- PRIORIDAD 3: ANÁLISIS COMBINADO DE LA CONSULTA INICIAL ---
  if (currentStepId === "ask_initial_need") {
    const businessContext = extractBusinessContext(normalizedMessage);
    let serviceMatchId = null;
    for (const service of serviceKeywords) {
      if (
        service.keywords.some((k) =>
          normalizedMessage.includes(normalizeText(k))
        )
      ) {
        serviceMatchId = service.nextStepId;
        break;
      }
    }

    if (serviceMatchId) {
      return {
        nextStepId: serviceMatchId,
        dataToUpdate: { ...businessContext, initialQuery: userInput },
      };
    } else if (businessContext.businessType) {
      return {
        nextStepId: currentStepId,
        dataToUpdate: { ...businessContext, initialQuery: userInput },
      };
    }
  }

  // --- PRIORIDAD 4: PROCESAR EL FLUJO GUIADO POR DEFECTO ---
if (currentStep.type === "user_input") {
  // Esta sección ahora puede validar tanto nombres como emails
  let isValid = true;
  let dataToUpdate = {};

  // Primero, aplicamos la validación que corresponda según el guion
  if (currentStep.validation === "isName") {
    const extracted = extractInfoFromMessage(userInput);
    if (extracted.userName) {
      dataToUpdate.userName = extracted.userName;
    } else if (isValidName(userInput)) {
      dataToUpdate.userName = userInput;
    } else {
      isValid = false;
    }
  } else if (currentStep.validation === "isEmail") {
    // ¡Aquí usamos nuestra nueva función!
    if (isValidEmail(userInput)) {
      dataToUpdate.email = userInput;
    } else {
      isValid = false;
    }
  } else {
    // Para otros inputs sin validación específica
    const businessContext = extractBusinessContext(normalizedMessage);
    dataToUpdate = {
      ...businessContext,
      [currentStep.variableName]: userInput,
    };
  }

  // Ahora, decidimos qué hacer basándonos en si el input fue válido
  if (isValid) {
    return {
      nextStepId: currentStep.nextStepId,
      dataToUpdate: dataToUpdate,
    };
  } else {
    // Si no fue válido, volvemos a preguntar
    return {
      response: currentStep.repromptMessage,
      nextStepId: null,
    };
  }
}

  if (currentStep.type === "user_options") {
    return {
      response: "Por favor, seleccioná una de las opciones mostradas 😊",
    };
  }

  // --- PRIORIDAD 5: FALLBACK FINAL ---
  ReactGA.event({
    category: "Chatbot",
    action: "Pregunta_No_Respondida",
    label: userInput,
  });
  return { nextStepId: "fallback_ask_service" };
};
// --- CONSTRUCTOR DE RESUMEN PARA WHATSAPP ---
export const buildWhatsAppSummary = (data) => {
  let summary = `¡Hola! Soy ${
    data.userName || "alguien"
  }.\n\nResumen de mi consulta:\n`;
  if (data.serviceInterest)
    summary += `\n*Tipo de Proyecto:* ${data.serviceInterest}.`;
  if (data.mainGoal) summary += `\n*Objetivo Principal:* ${data.mainGoal}.`;
  if (data.businessType)
    summary += `\n*Tipo de Negocio:* ${data.businessType}.`;
  if (data.userGoal) summary += `\n*Meta de Negocio:* ${data.userGoal}.`;
  if (data.processToAutomate)
    summary += `\n*Proceso a Automatizar:* "${data.processToAutomate}".`;
  if (data.needsIntegration)
    summary += `\n*Necesita Integración:* ${data.needsIntegration}.`;
  if (data.initialQuery && data.initialQuery.length > 5)
    summary += `\n*Consulta Inicial:* "${data.initialQuery}"`;

  summary += `\n\nEl asistente de tu web me guió hasta aquí.`;
  return summary;
};
