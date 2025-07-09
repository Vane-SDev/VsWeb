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
                <h1>
                    TECNOLOGÍA<br />A LA MEDIDA DE TU<br />VISIÓN
                </h1>
                <p>
                    EN VS WEB DESIGN CREAMOS SOLUCIONES DIGITALES QUE IMPULSAN NEGOCIOS. DESDE WEBS DE ALTO IMPACTO HASTA SISTEMAS COMPLEJOS QUE OPTIMIZAN TUS PROCESOS.
                </p>
                <a href="#contacto" className="cta-button">
                    Descubrí cómo
                </a>
            </div>
        </section>
    );
}

export default Hero;