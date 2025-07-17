// src/components/Hero.jsx (CON PARALLAX)

import React from 'react';
import './Hero.css';
import logoVS from '../assets/LogoBlanco.svg';


const Hero = ({ onNavigate }) => {
    const handleButtonClick = () => {
        // Usa la función del padre en lugar de llamar a Lenis directamente
        if (onNavigate) {
            onNavigate('servicios');
        }
    };
    return (
        <section id="hero" className="hero-container">
            {/* Logo de fondo gigante, sutil */}
            <img src={logoVS} alt="Logo VS Web Design" className="hero-logo-bg" aria-hidden="true" />
            <div className="hero-content">
                <h1 className="hero-title">
                    <span className="hero-title-line">
                        <span className="main-word">Diseño</span>
                        <span className="highlight dark-bg">con Impacto</span>
                    </span>
                    <span className="hero-title-line">
                        <span className="main-word">Estrategia</span>
                        <span className="highlight accent-bg">hecha Código</span>
                    </span>
                </h1>
                <p>
                    Creamos las herramientas digitales que tu marca necesita para <strong>crecer</strong>. Webs, tiendas online y sistemas a medida que marcan la <strong>diferencia</strong>.
                </p>
                <button className="cta-button" onClick={handleButtonClick}>
                    Explorar Soluciones
                </button>
            </div>
        </section>
    );
}

export default Hero;