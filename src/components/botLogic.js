// Archivo: src/botLogic.js (Arquitectura Final con Puntuación Ponderada)

import { conversationFlow } from "./conversationFlow.js";
import { knowledgeBase } from "./knowledgeBase.js";
import { serviceKeywords } from "./serviceKeywords.js";

// --- Constantes de Conversación ---
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
  "¿quieres que te contacte?",
];
const advancingQuestions = ["¿continuamos?", "¿te parece?"];

// --- DICCIONARIO DE ENTIDADES DE NEGOCIO ---
const businessEntities = {
  businessType: [
    "peluqueria",
    "restaurante",
    "consultorio",
    "estudio de abogados",
    "tienda de ropa",
    "gimnasio",
    "estudio contable",
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

// --- FUNCIONES DE ANÁLISIS Y EXTRACCIÓN ---

// 1. Extrae datos específicos como Nombre de una frase.
const extractInfoFromMessage = (message) => {
  let updates = {};
  const lowerCaseMessage = message.toLowerCase();
  const namePatterns = [
    /me llamo ([a-zA-ZáéíóúÁÉÍÓÚñÑ]+)/,
    /mi nombre es ([a-zA-ZáéíóúÁÉÍÓÚñÑ]+)/,
    /soy ([a-zA-ZáéíóúÁÉÍÓÚñÑ]+)/,
  ];
  for (const pattern of namePatterns) {
    const match = lowerCaseMessage.match(pattern);
    if (match && match[1] && !greetings.includes(match[1])) {
      const nombre = match[1].trim();
      updates.userName = nombre.charAt(0).toUpperCase() + nombre.slice(1);
      return updates;
    }
  }
  return updates;
};

// 2. Extrae contexto de negocio de una frase.
const extractBusinessContext = (message) => {
  const context = {};
  const lowerCaseMessage = message.toLowerCase();
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

// 3. Validador simple de nombre (último recurso).
const isValidName = (input) => {
  const text = input.toLowerCase().trim();
  if (greetings.includes(text)) return false;
  if (text.split(" ").length > 3) return false;
  if (/[¿?¡!*]/.test(text) || text.length < 2) return false;
  return true;
};

// --- EL CEREBRO: findNextStep ---
export const findNextStep = (userInput, context) => {
  const { currentStepId, lastBotMsg, lastBotIntent } = context;
  const lowerCaseMessage = userInput.toLowerCase();
  const currentStep = conversationFlow[currentStepId] || {};

  // --- PRIORIDAD MÁXIMA: Respuestas contextuales (Sí/No a preguntas directas) ---
  const isAffirmative = affirmativeWords.some(
    (w) => lowerCaseMessage.length < 10 && lowerCaseMessage === w
  );
  if (isAffirmative) {
    if (
      advancingQuestions.some((q) => lastBotMsg.includes(q)) &&
      lastBotIntent?.nextStep
    )
      return { nextStepId: lastBotIntent.nextStep };
    if (closingQuestions.some((q) => lastBotMsg.includes(q)))
      return {
        response: "¡Ok, te conecto con Vane!",
        nextStepId: "redirect_whatsapp_human_request",
      };
  }

  // --- PRIORIDAD 1: Búsqueda de la Mejor Intención (con Puntuación Ponderada) ---
  let bestMatch = { score: 0, decision: null };
  for (const item of knowledgeBase) {
    for (const keyword of item.keywords) {
      if (lowerCaseMessage.includes(keyword.toLowerCase())) {
        // SOLUCIÓN: El nuevo algoritmo de puntuación.
        // Multiplica la longitud de la palabra clave por su prioridad (o 1 si no tiene).
        const score = keyword.length * (item.priority || 1);
        if (score > bestMatch.score) {
          bestMatch = { score, decision: { ...item } };
        }
      }
    }
  }
  if (bestMatch.decision) return bestMatch.decision;

  // --- PRIORIDAD 2: Búsqueda de Servicios Específicos (en la pregunta inicial) ---
  if (currentStepId === "ask_initial_need") {
    for (const service of serviceKeywords) {
      if (service.keywords.some((k) => lowerCaseMessage.includes(k)))
        return { nextStepId: service.nextStep };
    }
  }

  // --- PRIORIDAD 3: Procesar el Flujo Guiado (con validación y extracción) ---
  if (currentStep.type === "user_input") {
    let dataToUpdate = {};
    const businessContext = extractBusinessContext(lowerCaseMessage);
    dataToUpdate = { ...businessContext };

    if (currentStep.validation === "isName") {
      const extracted = extractInfoFromMessage(userInput);
      if (extracted.userName) {
        dataToUpdate.userName = extracted.userName;
      } else if (isValidName(userInput)) {
        dataToUpdate.userName = userInput;
      } else {
        return {
          response:
            currentStep.repromptMessage ||
            "No entendí, ¿podrías decirme tu nombre?",
          nextStepId: null,
        };
      }
    } else {
      dataToUpdate[currentStep.variableName] = userInput;
    }
    return { nextStepId: currentStep.nextStep, dataToUpdate };
  }

  if (currentStep.type === "user_options") {
    return {
      response: "Por favor, seleccioná una de las opciones mostradas 😊",
    };
  }

  // --- PRIORIDAD 4: Fallback Final ---
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
