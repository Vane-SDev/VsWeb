// src/components/Contact.jsx - Versión Refinada

import React, { useState,useRef, useEffect } from 'react';
import './Contact.css';
import { FaWhatsapp, FaEnvelope, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const contactMethods = [
  {
    label: 'WhatsApp',
    icon: <FaWhatsapp />,
    href: 'https://wa.me/5492645207128',
    description: '¡Respondemos al instante!',
    cta: 'Iniciar Chat'
  },
  {
    label: 'Email',
    icon: <FaEnvelope />,
    href: 'mailto:info@vswebdesign.online',
    description: 'Ideal para enviarnos detalles de tu proyecto.',
    cta: 'Escribir Email'
  },
  {
    label: 'LinkedIn',
    icon: <FaLinkedin />,
    href: 'https://www.linkedin.com/', // Cambia por tu perfil real
    description: 'Conectemos en el ámbito profesional.',
    cta: 'Ver Perfil'
  },
  // {
  //   label: 'Instagram',
  //   icon: <FaInstagram />,
  //   href: 'https://www.instagram.com/', // Cambia por tu perfil real
  //   description: 'Inspiración y detrás de escena.',
  //   cta: 'Seguir'
  // }
];

const Contact = () => {
  const sectionRef = useRef(null);

  // Estado para controlar qué tarjeta está abierta ---
  const [expandedCard, setExpandedCard] = useState('WhatsApp'); // Abrimos la primera por defecto

  //  Función para manejar el clic en una tarjeta ---
  const handleCardClick = (label) => {
    // Si la tarjeta clickeada ya está abierta, la cerramos. Si no, la abrimos.
    setExpandedCard(prev => (prev === label ? null : label));
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación de entrada de la sección y las tarjetas
      gsap.fromTo(
        ".contact-card", // Apuntamos directamente a las tarjetas
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%', // La animación empieza cuando el 80% de la sección es visible
          }
        }
      );
    }, sectionRef); // El contexto se aplica a la sección

    return () => ctx.revert(); // Limpieza de GSAP
  }, []);

  return (
    <section className="contact-section" id="contacto" ref={sectionRef}>
      <div className="contact-container">
        <h2 className="section-title">¿Listo para dar el siguiente paso? <span>Hablemos.</span></h2>
        <p className="contact-microcopy">Elegí tu canal preferido. Respondemos rápido y nos encanta escuchar ideas nuevas.</p>
        
        <div className="contact-accordion-wrapper">
          {contactMethods.map((method) => (
            // Usamos un div como botón para tener más control
            <div
              className={`contact-card ${expandedCard === method.label ? 'expanded' : ''}`}
              key={method.label}
              onClick={() => handleCardClick(method.label)}
              role="button"
              tabIndex="0"
              aria-expanded={expandedCard === method.label}
            >
              <div className="card-header">
                <span className="contact-icon">{method.icon}</span>
                <span className="contact-label">{method.label}</span>
                <span className="expand-indicator">{expandedCard === method.label ? '−' : '+'}</span>
              </div>
              <div className="card-content">
                <p className="contact-description">{method.description}</p>
                <a
                  href={method.href}
                  className="contact-cta"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()} // Evita que el clic en el link cierre el acordeón
                >
                  {method.cta} &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;