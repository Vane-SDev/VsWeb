export const personalizationData = {
  // La clave (en minúsculas) debe coincidir con las de businessEntities en botLogic.js
  peluqueria: {
    openingLine:
      "¡Genial! Un sitio para una estilista o peluquería es una vidriera increíble para tu arte.",
    suggestions:
      "Podríamos incluir una **galería con tus mejores trabajos**, una sección de **servicios y precios**, y lo más importante: un **sistema de reserva de turnos online** para que tus clientes agenden solos. ¿Qué te parece más importante para empezar?",
    // Opciones de botones personalizadas para este rubro
    options: [
      { text: "Una galería de trabajos", nextStepId: "qualify_corp_site" }, // Lo mandamos a un flujo existente o uno nuevo
      { text: "Un sistema de turnos online", nextStepId: "recommend_system" },
      { text: "Otra cosa", nextStepId: "fallback_ask_service" },
    ],
  },
  restaurante: {
    openingLine:
      "¡Excelente! Una web para un restaurante es fundamental hoy en día.",
    suggestions:
      "Podemos mostrar tu **menú digital con fotos**, integrar un **mapa con tu ubicación**, y hasta implementar un **sistema de reservas o de pedidos online**. ¿Cuál es tu prioridad?",
    options: [
      {
        text: "Mostrar mi menú y ubicación",
        nextStepId: "recommend_corp_site",
      },
      { text: "Sistema de pedidos/reservas", nextStepId: "recommend_system" },
    ],
  },
    

    
};
    