// src/App.jsx
import { Helmet, HelmetProvider } from 'react-helmet-async';
import React, { useRef, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import lenis from './Lenis';

// Importación de Hooks
import { usePageAnalytics } from './hooks/usePageAnalytics';
import { useTabTitleMessaging } from './hooks/useTabTitleMessaging';
import { useScrollEffects } from './hooks/useScrollEffects';


// Importación de Componentes
import Header from './components/Header';
import Footer from './components/Footer';
import BlobsBackground from './components/BlobsBackground';
import WhatsAppButton from './components/WhatsAppButton';
import HomePage from './components/HomePage'; 
import AboutUs from './components/AboutUs'; 
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsAndConditions from './components/TermsAndConditions'; // Asegúrate de que este componente exista
import './App.css';

function App() {
    const mainRef = useRef(null);
    const [servicesLinkId, setServicesLinkId] = useState('servicios');

    // --- ORQUESTACIÓN DE HOOKS ---
    usePageAnalytics();
    useTabTitleMessaging();
    const showScrollTop = useScrollEffects();


    // --- LÓGICA DE NAVEGACIÓN (se queda aquí porque conecta los componentes) ---
    const handleScrollTo = (targetId, options = {}) => {
        if (targetId === 'Hero' || targetId === 'top') {
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
                    <link rel="icon" type="image/svg+xml" href="/FAVICON.svg" />

                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

                    <meta name="theme-color" content="#e87a5d" />

                    <title>VS Web Design | Diseño con Impacto-Estrategia hecha código</title>
                    <meta name="description"
                        content="En VS Web Design transformamos negocios con soluciones digitales a medida. Creamos webs de alto impacto, tiendas e-commerce que venden y sistemas que optimizan procesos para llevar tu marca al siguiente nivel." />

                    <link rel="canonical" href="https://www.vswebdesign.online" />

                    <meta name="keywords"
                        content="desarrollo web, diseño web, sistemas a medida, wordpress, e-commerce, automatización, pymes, emprendedores, latinoamérica" />
                    <meta name="author" content="VS Web Design" />
                    <meta name="robots" content="index, follow" />

                    <meta property="og:title" content="VS Web Design | Diseño con Impacto-Estrategia hecha Código" />
                    <meta property="og:description"
                        content="¿Buscás más que una simple página web? Creamos las herramientas digitales que tu negocio necesita para destacarse, vender más y operar de forma más inteligente" />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content="https://www.vswebdesign.online" />
                    <meta property="og:image" content="https://www.vswebdesign.online/webdesign.jpg" />
                    <meta property="og:image:alt" content="Imagen representativa de VS Web Design" />
                    <meta property="og:site_name" content="VS Web Design" />

                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content="VS Web Design | Estrategia hecha Código" />
                    <meta name="twitter:description" content="¿Buscás más que una simple página web? Creamos las herramientas digitales que tu negocio necesita para destacarse, vender más y operar de forma más inteligente" />
                    <meta name="twitter:image" content="https://www.vswebdesign.online/webdesign.jpg" />
                </Helmet>

                <BlobsBackground />

                <Header servicesLinkId={servicesLinkId} onNavigate={handleScrollTo} />

                <main>
                    <Routes>
                        <Route path="/" element={<HomePage
                            onNavigate={handleScrollTo}
                            setServicesLinkId={setServicesLinkId} />} />
                        <Route path="/sobre-nosotros" element={<AboutUs />} />
                        <Route path="/politica-de-privacidad" element={<PrivacyPolicy />} />
                        <Route path="/terminos-y-condiciones" element={<TermsAndConditions />} />
                    </Routes>
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