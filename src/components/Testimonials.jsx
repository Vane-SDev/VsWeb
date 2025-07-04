import React, { useRef, useEffect } from 'react';
import './Testimonials.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const testimonialsData = [
  {
    name: 'María González',
    role: 'CEO, Creativa Studio',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    text: 'El equipo superó nuestras expectativas. El sitio es rápido, moderno y nos ayudó a captar más clientes. ¡Recomiendo 100%!' 
  },
  {
    name: 'Juan Pérez',
    role: 'Fundador, Tienda Online',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    text: 'La automatización que implementaron nos ahorró horas de trabajo cada semana. El soporte es excelente y siempre atentos.'
  },
  {
    name: 'Lucía Fernández',
    role: 'Directora, ONG Futuro',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    text: 'Nos guiaron en todo el proceso y el resultado fue una web profesional y fácil de actualizar. ¡Gracias por el compromiso!'
  },
  {
    name: 'Carlos Ramírez',
    role: 'CTO, Analytics Pro',
    avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
    text: 'El dashboard es intuitivo y visualmente atractivo. La integración con nuestros sistemas fue impecable.'
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
    <section className="testimonials-section" ref={sectionRef}>
      <h2 className="testimonials-title">Testimonios de Clientes</h2>
      <div className="testimonials-list">
        {testimonialsData.map((t, idx) => (
          <div
            className="testimonial-card"
            key={t.name}
            ref={el => cardsRef.current[idx] = el}
          >
            <div className="testimonial-avatar-wrapper">
              <img src={t.avatar} alt={t.name} className="testimonial-avatar" />
            </div>
            <div className="testimonial-content">
              <p className="testimonial-text">“{t.text}”</p>
              <div className="testimonial-meta">
                <span className="testimonial-name">{t.name}</span>
                <span className="testimonial-role">{t.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;