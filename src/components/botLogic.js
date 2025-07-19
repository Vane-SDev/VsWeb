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
const nonNameWords = [
  "que",
  "cual",
  "como",
  "cuando",
  "donde",
  "quiero",
  "necesito",
  "precio",
  "costo",
  "promo",
  "planes",
  "mantenimiento",
  "hosting",
  "hacen",
  "hacen web",
  "hacen sitios",
  "hacen páginas",
  "hacen páginas web",
  "yo quiero un sitio",
  "yo quiero una web",
  "yo quiero una página",

];
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
const normalizeText = (text = "") => {
  return text
    .toLowerCase()
    .normalize("NFD") // Descompone los caracteres en su base + diacrítico
    .replace(/[\u0300-\u036f]/g, ""); // Elimina los diacríticos
};
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
  // NUEVA REGLA: Si incluye una palabra "prohibida", no es un nombre.
  if (nonNameWords.some((word) => text.includes(word))) return false;
  return true;
};
// --- EL CEREBRO: findNextStep ---
// --- EL CEREBRO: findNextStep (LÓGICA FINAL) ---
export const findNextStep = (userInput, context) => {
  const { currentStepId, lastBotMsg, lastBotIntent } = context;
  const normalizedMessage = normalizeText(userInput);
  const currentStep = conversationFlow[currentStepId] || {};

  // --- PRIORIDAD MÁXIMA: Respuestas contextuales (Sí/No a preguntas directas) ---
  const isAffirmative = affirmativeWords.some((w) => normalizedMessage.length < 10 && normalizedMessage === w);
  if (isAffirmative) {
    if (advancingQuestions.some((q) => normalizeText(lastBotMsg).includes(q)) && lastBotIntent?.nextStepId) return { nextStepId: lastBotIntent.nextStepId };
    if (closingQuestions.some((q) => normalizeText(lastBotMsg).includes(q))) return { response: "¡Ok, te conecto con Vane!", nextStepId: "redirect_whatsapp_human_request" };
  }

  // --- PRIORIDAD 1: BÚSQUEDA DE LA MEJOR INTENCIÓN EN KNOWLEDGEBASE ---
  // Esta es la lógica más importante. Si encontramos una intención aquí, la conversación sigue este camino.
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
  // Si encontramos una intención con una puntuación decente, la devolvemos y terminamos aquí.
  if (bestMatch.score > 0) {
      return bestMatch.decision;
  }

  // --- PRIORIDAD 2: PROCESAR EL FLUJO GUIADO (SI NO HUBO INTENCIÓN) ---
  // Si el cerebro no encontró una intención específica, entonces asume que el usuario está siguiendo el guion.
  
  // A. Búsqueda de Servicios Específicos (solo en la pregunta inicial)
  if (currentStepId === "ask_initial_need") {
    for (const service of serviceKeywords) {
      if (service.keywords.some((k) => normalizedMessage.includes(normalizeText(k)))) {
        return { nextStepId: service.nextStepId };
      }
    }
  }

  // B. Procesar un input de texto
  if (currentStep.type === "user_input") {
    let dataToUpdate = {};
    const businessContext = extractBusinessContext(normalizedMessage);
    dataToUpdate = { ...businessContext };

    if (currentStep.validation === "isName") {
      const extracted = extractInfoFromMessage(userInput);
      if (extracted.userName) {
        dataToUpdate.userName = extracted.userName;
      } else if (isValidName(userInput)) {
        dataToUpdate.userName = userInput;
      } else {
        return { response: currentStep.repromptMessage || "No entendí, ¿podrías decirme tu nombre?", nextStepId: null };
      }
    } else {
      dataToUpdate[currentStep.variableName] = userInput;
    }
    return { nextStepId: currentStep.nextStepId, dataToUpdate };
  }

  // C. Si el usuario escribe en lugar de usar un botón
  if (currentStep.type === "user_options") {
    return { response: "Por favor, seleccioná una de las opciones mostradas 😊" };
  }

  // --- PRIORIDAD 3: FALLBACK FINAL ---
  // Si nada de lo anterior funcionó, vamos al menú principal.
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
