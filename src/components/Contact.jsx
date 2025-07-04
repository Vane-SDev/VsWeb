import React, { useRef, useEffect } from 'react';
import './Contact.css';
import { FaWhatsapp, FaEnvelope, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const contactMethods = [
  {
    label: 'WhatsApp',
    icon: <FaWhatsapp />,
    href: 'https://wa.me/5492645207128', // Cambia por tu número real
    description: '¡Respondemos rápido!'
  },
  {
    label: 'Email',
    icon: <FaEnvelope />,
    href: 'mailto:info@vswebdesign.online',
    description: 'Envíanos tu idea o consulta.'
  },
  {
    label: 'LinkedIn',
    icon: <FaLinkedin />,
    href: 'https://www.linkedin.com/', // Cambia por tu perfil real
    description: 'Conectá con nosotros.'
  },
  {
    label: 'Instagram',
    icon: <FaInstagram />,
    href: 'https://www.instagram.com/', // Cambia por tu perfil real
    description: 'Seguinos para inspiración.'
  }
];

const Contact = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Animación de entrada de la sección
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      );
    }
    // Animación de cada tarjeta
    if (cardsRef.current.length) {
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 40, scale: 0.96, filter: 'blur(6px)' },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          stagger: 0.13,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          }
        }
      );
    }
  }, []);

  return (
    <section className="contact-section" ref={sectionRef}>
      <h2 className="contact-title">¿Listo para transformar tu proyecto? <span>Hablemos</span></h2>
      <p className="contact-microcopy">Respondemos rápido y nos encanta escuchar ideas nuevas. Sin compromiso.</p>
      <div className="contact-cards-wrapper">
        {contactMethods.map((m, idx) => (
          <a
            className="contact-card"
            href={m.href}
            key={m.label}
            target="_blank"
            rel="noopener noreferrer"
            ref={el => cardsRef.current[idx] = el}
            aria-label={m.label}
          >
            <span className="contact-icon">{m.icon}</span>
            <span className="contact-label">{m.label}</span>
            <span className="contact-description">{m.description}</span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Contact; 