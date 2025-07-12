// src/App.jsx
import { Helmet, HelmetProvider } from 'react-helmet-async';
import React, { useLayoutEffect, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import ReactGA from 'react-ga4';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import BlobsBackground from './components/BlobsBackground';
import Footer from './components/Footer';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import './App.css';

const MEASUREMENT_ID = "G-FYSX7E4Y67";
ReactGA.initialize(MEASUREMENT_ID);

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef(null);
  const originalTitleRef = useRef(document.title);

  useEffect(() => {
    // --- INICIALIZACIÓN DE GOOGLE ANALYTICS ---
    ReactGA.send({ hitType: "pageview", page: window.location.pathname + window.location.search, title: "Página de Inicio" });
  }, []);

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
    <HelmetProvider>

      <div className="App" ref={mainRef}>
        <Helmet>
          {/* --- TÍTULO ENFOCADO EN EL BENEFICIO PARA TU NICHO --- */}
          <title>Webs que Venden y Sistemas a Medida para Pymes | VS Web Design</title>

          {/* --- DESCRIPCIÓN QUE HABLA EL IDIOMA DE TU CLIENTE --- */}
          <meta name="description" content="Ayudo a pymes, emprendedores y profesionales a crecer con webs autogestionables en WordPress y sistemas a medida. Tomá el control de tu negocio y automatizá tus procesos." />

          {/* --- KEYWORDS (recordá que no son para Google, pero ayudan a centrar ideas) --- */}
          <meta name="keywords" content="desarrollo web para pymes, web autogestionable, experto wordpress para negocios, sistemas para emprendedores, tienda online, automatización, argentina, latinoamérica" />

          {/* --- OPEN GRAPH (PARA REDES SOCIALES) --- */}
          <meta property="og:title" content="Webs que Venden y Sistemas a Medida para Pymes | VS Web Design" />
          <meta property="og:description" content="Ayudo a pymes y emprendedores a tomar el control de su negocio con webs en WordPress y sistemas que automatizan procesos." />
          {/* El resto de tus etiquetas OG y Twitter están bien. */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.vswebdesign.online" />
          <meta property="og:image" content="https://www.vswebdesign.online/og-image.jpg" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Webs que Venden y Sistemas a Medida para Pymes | VS Web Design" />
          <meta name="twitter:description" content="Ayudo a pymes y emprendedores a tomar el control de su negocio con webs en WordPress y sistemas que automatizan procesos." />
          <meta name="twitter:image" content="https://www.vswebdesign.online/og-image.jpg" />
        </Helmet>

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
    </HelmetProvider>
  );
}

export default App;