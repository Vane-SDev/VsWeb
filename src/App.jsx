// src/App.jsx
import { Helmet, HelmetProvider } from 'react-helmet-async';
import React, { useRef, useState } from 'react';
import lenis from './Lenis';

// Importación de Hooks
import { usePageAnalytics } from './hooks/usePageAnalytics';
import { useTabTitleMessaging } from './hooks/useTabTitleMessaging';
import { useScrollEffects } from './hooks/useScrollEffects';
import { useHeroAnimation } from './hooks/useHeroAnimation';

// Importación de Componentes
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import BlobsBackground from './components/BlobsBackground';
import Footer from './components/Footer';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import WhatsAppButton from './components/WhatsAppButton';
import './App.css';

function App() {
  const mainRef = useRef(null);
  const [servicesLinkId, setServicesLinkId] = useState('servicios');

  // --- ORQUESTACIÓN DE HOOKS ---
  usePageAnalytics();
  useTabTitleMessaging();
  const showScrollTop = useScrollEffects();
  useHeroAnimation(mainRef, setServicesLinkId);

  // --- LÓGICA DE NAVEGACIÓN (se queda aquí porque conecta los componentes) ---
  const handleScrollTo = (targetId, options = {}) => {
    if (targetId === 'top') {
      lenis.scrollTo(0, options);
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        lenis.scrollTo(element, options);
      }
    }
  };

  return (
    <HelmetProvider>
      <div className="App" ref={mainRef}>
        <Helmet>
          <title>Diseño con Impacto-Estrategia hecha código | VS Web Design</title>
          <meta name="description" content="En VS Web Design creamos soluciones digitales a medida. Webs que convierten, tiendas online que venden y sistemas que liberan tu tiempo." />
          <meta name="keywords" content="desarrollo web, diseño web, sistemas a medida, wordpress, e-commerce, automatización, pymes, emprendedores, latinoamérica" />

          {/* --- Open Graph (para WhatsApp, Facebook, LinkedIn, etc.) --- */}
          <meta property="og:title" content="VS Web Design | Diseño con Impacto-Estrategia hecha Código" />
          <meta property="og:description" content="Soluciones web a medida para pymes y profesionales que buscan crecer. Webs de alto impacto, e-commerce y sistemas para optimizar tu negocio." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.vswebdesign.online" />
          <meta property="og:image" content="https://www.vswebdesign.online/webdesign.jpg" />

          {/* --- Twitter Cards --- */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="VS Web Design | Estrategia hecha Código" />
          <meta name="twitter:description" content="Soluciones web a medida para pymes y profesionales que buscan crecer." />
          <meta name="twitter:image" content="https://www.vswebdesign.online/webdesign.jpg" />
        </Helmet>

        <BlobsBackground />

        <Header servicesLinkId={servicesLinkId} onNavigate={handleScrollTo} />

        <main id="Hero">
          <div className="animation-container">
            <div className="animation-stage">
              <div className="hero-container">
                <Hero onNavigate={handleScrollTo} />
              </div>
              <Services />
            </div>
          </div>
          <Projects />
          <Testimonials />
          <Contact />
        </main>

        <Footer onLogoClick={handleScrollTo} />

        <div className="floating-buttons-container">
          {showScrollTop && (
            <button
              className="scroll-to-top-btn glass-effect"
              onClick={() => handleScrollTo('Hero')}
              aria-label="Subir al inicio"
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="16" fill="rgba(255,255,255,0.7)" />
                <path d="M10 18l6-6 6 6" stroke="#E87A5D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}

          <WhatsAppButton />
        </div>
      </div>
    </HelmetProvider>
  );
}

export default App;