// Archivo: src/hooks/useProactiveTooltip.js (Versión Final Robusta)

import { useState, useEffect, useRef } from "react";
import lenis from "../Lenis"; // Mantenemos tu instancia de Lenis

export const useProactiveTooltip = ({
  initialDelay = 10000,
  showDuration = 7000,
  intervalDelay = 20000,
  scrollDepth = 1200,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const cycleStarted = useRef(false);

  useEffect(() => {
    // SOLUCIÓN: Declaramos todas nuestras variables de temporizador aquí arriba
    let initialTimer;
    let intervalId;
    let hideTimer;

    const startTooltipCycle = () => {
      if (cycleStarted.current) return;
      cycleStarted.current = true;

      setIsVisible(true);

      // Asignamos el ID del temporizador a la variable que declaramos antes
      hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, showDuration);

      intervalId = setInterval(() => {
        setIsVisible(true);
        // También creamos un temporizador aquí para ocultarlo
        setTimeout(() => {
          setIsVisible(false);
        }, showDuration);
        // Podríamos guardar este ID en un array si necesitáramos limpiarlos todos,
        // pero para este caso, el clearInterval general es suficiente.
      }, intervalDelay);
    };

    initialTimer = setTimeout(startTooltipCycle, initialDelay);

    const handleScroll = (e) => {
      if (e.scroll > scrollDepth) {
        startTooltipCycle();
      }
    };
    lenis.on("scroll", handleScroll);

    // --- Función de Limpieza Definitiva ---
    return () => {
      // Limpiamos TODOS los posibles temporizadores e intervalos
      clearTimeout(initialTimer);
      clearTimeout(hideTimer); // <-- Ahora sí usamos la variable para limpiar
      clearInterval(intervalId);
      lenis.off("scroll", handleScroll);
    };
  }, [initialDelay, showDuration, intervalDelay, scrollDepth]);

  return isVisible;
};
