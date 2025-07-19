// Archivo nuevo: src/promotions.js

export const activePromotion = {
  // Identificador único de la promo
  id: "ONPAGE_AGOSTO_2025",

  // Condiciones para que se active
  month: 7, // Mes para la promo (7 es Agosto, porque Enero es 0)
  year: 2025,

  // Contenido de la promo
  title: "¡Promo Exclusiva de Agosto!",
  details:
    "¡Por ser agosto, te ofrezco una **Página de Lanzamiento (One-Page)** con **un año de hosting totalmente gratis!** Es la oportunidad perfecta para lanzar ese nuevo proyecto.",

  // A qué paso del guion debe saltar el bot para ofrecerla
  entryStepId: "promo_offer",
};

// Si no hay promo activa, simplemente exporta un objeto vacío o null
// export const activePromotion = null;
