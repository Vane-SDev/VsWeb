import React from 'react';
import './PageStyles.css';
import { FaWordpress, FaReact, FaNodeJs, FaFigma, FaStore, FaCode, FaLightbulb } from 'react-icons/fa';
import ElectronIcon from '../components/icons/ElectronIcon.jsx'; // Asegúrate de que la ruta sea correcta

const AboutUs = () => {
    return (
        <div className="static-page-container about-us-modern">
            {/* SECCIÓN 1: El Manifiesto */}
            <div className="manifesto-section">
                <h1 className="manifesto-title">No creamos webs, creamos resultados.</h1>
                <p className="manifesto-subtitle">
                    Creemos que una presencia digital exitosa no se trata de tener la última tecnología, sino de tener la estrategia correcta. En VS Web Design, fusionamos un profundo análisis de negocio con una ejecución técnica impecable para construir las herramientas que realmente impulsan tu crecimiento.
                </p>
            </div>

            {/* SECCIÓN 2: La Metodología */}
            <div className="process-section">
                <h2 className="section-heading">Nuestra Metodología: El Proceso Dual</h2>
                <div className="process-steps">
                    <div className="step">
                        <div className="step-number">1</div>
                        <div className="step-content">
                            <h3>Inmersión y Estrategia</h3>
                            <p>Todo comienza con una conversación profunda para entender tu visión, objetivos y la voz de tu marca.</p>
                        </div>
                    </div>
                    <div className="step">
                        <div className="step-number">2</div>
                        <div className="step-content">
                            <h3>Diseño y Experiencia</h3>
                            <p>Transformamos la estrategia en una experiencia de usuario intuitiva y un diseño visual de alto impacto.</p>
                        </div>
                    </div>
                    <div className="step">
                        <div className="step-number">3</div>
                        <div className="step-content">
                            <h3>Desarrollo y Ejecución</h3>
                            <p>La visión se convierte en código. Construimos tu solución digital con las mejores prácticas de la industria.</p>
                        </div>
                    </div>
                    <div className="step">
                        <div className="step-number">4</div>
                        <div className="step-content">
                            <h3>Lanzamiento y Crecimiento</h3>
                            <p>Te acompañamos en el lanzamiento y te ofrecemos planes para que tu plataforma evolucione contigo.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* SECCIÓN 3: Las Herramientas */}
            <div className="tools-section">
                <h2 className="section-heading">Nuestro Ecosistema Tecnológico</h2>
                <p>
                    Nuestra lealtad no está con una herramienta, sino con el resultado. Seleccionamos el ecosistema que ofrezca la solución más robusta, escalable y eficiente para tu proyecto.
                </p>
                <div className="tool-icons">
                    <div className="tool-icon-item"><FaReact /><span>React</span></div>
                    <div className="tool-icon-item"><FaNodeJs /><span>Node.js</span></div>
                    <div className="tool-icon-item"><ElectronIcon /><span>Electron</span></div>
                    <div className="tool-icon-item"><FaWordpress /><span>WordPress</span></div>
                    <div className="tool-icon-item"><FaStore /><span>WooCommerce</span></div>
                    <div className="tool-icon-item"><FaFigma /><span>Figma</span></div>
                </div>
            </div>

            {/* SECCIÓN 4: El Equipo (DISEÑO REFINADO) */}
            <div className="team-section-modern">
                <h2 className="section-heading">Nuestro Equipo</h2>
                <div className="team-grid">
                    <div className="team-member-card">
                        {/* Agrupamos el ícono y el nombre */}
                        <div className="team-member-header">
                            <FaCode className="team-member-icon" />
                            <h3>Vanesa</h3>
                        </div>
                        <h4>Fundadora & Arquitecta Digital</h4>
                    </div>
                    <div className="team-member-card">
                        {/* Agrupamos el ícono y el nombre */}
                        <div className="team-member-header">
                            <FaLightbulb className="team-member-icon" />
                            <h3>Johana</h3>
                        </div>
                        <h4>Directora de Estrategia y Proyectos</h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;