import { useState, useEffect, useRef } from "react";
import lenis from "../Lenis"; // Usamos la misma instancia de Lenis

export const useProactiveTooltip = ({
  timeDelay = 15000,
  scrollDepth = 1200,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipTriggered = useRef(false); // Para asegurar que se active solo una vez

  useEffect(() => {
    // Si el tooltip ya se mostró, no hacemos nada más.
    if (tooltipTriggered.current) return;

    // Función para activar el tooltip
    const triggerTooltip = () => {
      if (!tooltipTriggered.current) {
        setShowTooltip(true);
        tooltipTriggered.current = true;
        // Opcional: Ocultar el tooltip después de un tiempo
        // setTimeout(() => setShowTooltip(false), 8000);
      }
    };

    // TRIGGER 1: Por tiempo
    const timer = setTimeout(triggerTooltip, timeDelay);

    // TRIGGER 2: Por scroll
    const handleScroll = (e) => {
      if (e.scroll > scrollDepth) {
        triggerTooltip();
      }
    };

    lenis.on("scroll", handleScroll);

    // Función de limpieza para cuando el componente se desmonte
    return () => {
      clearTimeout(timer);
      lenis.off("scroll", handleScroll);
    };
  }, [timeDelay, scrollDepth]); // Dependencias por si quisiéramos hacerlas dinámicas

  return showTooltip;
};
