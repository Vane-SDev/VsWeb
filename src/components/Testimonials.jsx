import React, { useRef, useEffect } from 'react';
import './Testimonials.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import logoAxiaval from '../assets/LogoAxiaval.webp';
import logoCamex from '../assets/LogoCamex.webp';
import logoSGA from '../assets/LogoSGAcomex.webp';
import logoVG from '../assets/LogoVG.webp';
gsap.registerPlugin(ScrollTrigger);

const testimonialsData = [
  {
    name: 'Leandro Pietra',
    role: 'Selección y Reclutamiento, Axiaval',
    logo: logoAxiaval,
    text: 'Valoro su actitud de servicio, buena predisposición y rápida respuesta durante todo el proceso. Me brindó un asesoramiento que fue más allá del desarrollo web.'
  },
  {
    name: 'Marcela Carol',
    role: 'Presidenta de CAMEX',
    logo: logoCamex,
    text: 'Si lo que buscas es aumentar visitas y seguidores, transmitir confianza y mostrar tus verdaderos valores, Vanesa es la profesional indicada.'
  },
  {
    name: 'Gabriela Salatino',
    role: 'Despachante de Aduana, SGA Comex',
    logo: logoSGA,
    text: 'Excelente profesional. Es destacable su dedicación y profesionalismo en la realización de cada etapa del proyecto. Muy conforme con su trabajo.'
  },
  {
    name: 'Valentina Guanco',
    role: 'Ejecutiva de Cuentas, Grupo VG',
    logo: logoVG,
    text: 'Fue muy accesible con todos los pedidos que le hice y su trabajo como diseñadora es súper recomendable.'
  }
];

const Testimonials = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Animación de entrada de la sección
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 80 },
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
    // Animación de cada testimonial
    if (cardsRef.current.length) {
      cardsRef.current.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 60, rotateZ: (i % 2 === 0 ? -4 : 4), scale: 0.96, filter: 'blur(6px)' },
          {
            opacity: 1,
            y: 0,
            rotateZ: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 0.9,
            delay: i * 0.18,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              toggleActions: 'play none none none',
            }
          }
        );
      });
    }
  }, []);

  return (
    <section id="testimonios" className="testimonials-section" ref={sectionRef}>
      <h2 className="section-title--dark">Testimonios de nuestros clientes</h2>
      <div className="testimonials-list">
        {testimonialsData.map((testimonial) => (
          <div className="testimonial-card" key={testimonial.name}>
            {/* 3. Reemplazamos el avatar por el logo del cliente */}
            <div className="testimonial-logo-wrapper">
              <img src={testimonial.logo} alt={`Logo de ${testimonial.name}`} className="testimonial-logo" />
            </div>
            <div className="testimonial-content">
              <p className="testimonial-text">"{testimonial.text}"</p>
              <div className="testimonial-meta">
                <span className="testimonial-name">{testimonial.name}</span>
                <span className="testimonial-role">{testimonial.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;