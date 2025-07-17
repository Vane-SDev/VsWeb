// src/components/Hero.jsx (CON PARALLAX)

import React from 'react';
import './Hero.css';
import logoVS from '../assets/LogoBlanco.svg';

const Hero = () => {
    return (
        <section className="hero-container">
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
                    En VS WebDesign creamos soluciones digitales a medida: SITIOS WEB que transmiten confianza, TIENDAS ONLINE que venden y SISTEMAS que simplifican tu día a día.
                </p>
                <a href="#servicios" className="cta-button">
                    Descubrí qué podemos crear juntos
                </a>
            </div>
        </section>
    );
}

export default Hero;