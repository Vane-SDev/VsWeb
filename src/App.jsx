// src/App.jsx
import React, { useLayoutEffect, useRef, useEffect} from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import BlobsBackground from './components/BlobsBackground';
import Footer from './components/Footer';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef(null);
  const originalTitleRef = useRef(document.title);

  useLayoutEffect(() => {
    // --- SETUP DE SCROLL SUAVE (LENIS) ---
    const lenis = new Lenis({ duration: 1.2 });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });

    // --- LÍNEA DE TIEMPO MAESTRA ---
    const ctx = gsap.context(() => {
      // Establecer perspectiva en el contenedor para efecto 3D
      gsap.set(".animation-container", { perspective: 1200 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".animation-container",
          start: "top top",
          end: "+=100%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          
        }
      });

      // Hero sale como puerta (rota en Y negativa, se abre hacia la izquierda)
      tl.to(".hero-container", {
        opacity: 0.3,
        rotateY: -90,
        filter: "blur(10px)",
        transformOrigin: "left center",
        ease: "power2.inOut"
      });

      // Services entra desde la derecha, como si atravesara la puerta
      tl.fromTo(".services-section", {
        opacity: 0,
        xPercent: 100
      }, {
        opacity: 1,
        xPercent: 0,
        ease: "power2.out"
      }, "-=0.2");

      // Animación de los hijos de Services
      tl.fromTo(".services-container > *", {
        opacity: 0,
        y: 40
      }, {
        opacity: 1,
        y: 0,
        stagger: 0.18,
        ease: "power3.out"
      }, "-=0.15");

    }, mainRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    let intervalId = null;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // El usuario cambió de pestaña
        const messages = [
          "¡No te vayas! 👀",
          "Tenemos lo que buscás...",
          "✨ Tu web te espera ✨",
          "¡Volvé! رجع", 
          "VS Web Design"
        ];
        let messageIndex = 0;

        // Empezamos a cambiar el título cada 1.5 segundos
        intervalId = setInterval(() => {
          document.title = messages[messageIndex];
          messageIndex = (messageIndex + 1) % messages.length;
        }, 1500);

      } else {
        // El usuario volvió
        clearInterval(intervalId); // Detenemos la animación
        document.title = originalTitleRef.current; // Restauramos el título original
      }
    };

    // "Escuchamos" el evento de cambio de visibilidad
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Función de limpieza para cuando el componente se desmonte
    return () => {
      clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div className="App" ref={mainRef}>
      <BlobsBackground />
      <Header />
      <main>
        {/* Este contenedor es clave para la animación de pin */}
        <div className="animation-container">
          <div className="hero-container">
            <Hero />
          </div>
          <Services />
        </div>
        {/* Sección de proyectos después de la animación */}
        <Projects />
        <Testimonials />
        <Contact />
        {/* Las futuras secciones irían aquí, fuera del contenedor de animación */}
        {/* <Testimonials /> */}
      </main>
      <Footer />
    </div>
  );
}

export default App;