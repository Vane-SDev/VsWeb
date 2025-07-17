import { useState, useLayoutEffect, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import lenis from "../Lenis";

gsap.registerPlugin(ScrollTrigger);

export const useScrollEffects = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Conecta Lenis con el ticker de GSAP para la sincronización de animaciones
  useLayoutEffect(() => {
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
  }, []);

  // Controla la visibilidad del botón para subir
  useEffect(() => {
    const handleScroll = (e) => {
      setShowScrollTop(e.scroll > 200);
    };
    lenis.on("scroll", handleScroll);
    return () => lenis.off("scroll", handleScroll);
  }, []);

  return showScrollTop;
};
