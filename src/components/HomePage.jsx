// src/components/HomePage.jsx
import React, { useRef } from 'react';
import Hero from './Hero';
import Services from './Services';
import Projects from './Projects';
import Testimonials from './Testimonials';
import Contact from './Contact';
import { useHeroAnimation } from '../hooks/useHeroAnimation';

// Este componente recibe 'onNavigate' para que el scroll siga funcionando
const HomePage = ({ onNavigate, setServicesLinkId }) => {
    const homePageRef = useRef(null);
    useHeroAnimation(homePageRef, setServicesLinkId);
    return (
        // Usamos un Fragment (<>) para no agregar divs innecesarios
        <div ref={homePageRef} >
            <main id="Hero">
                <div className="animation-container">
                    <div className="animation-stage">
                        <div className="hero-container">
                            <Hero onNavigate={onNavigate} />
                        </div>
                        <Services />
                    </div>
                </div>
                <Projects />
                <Testimonials />
                <Contact />
            </main>
        </div>
    );
};

export default HomePage;