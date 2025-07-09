import React, { useLayoutEffect, useRef } from 'react';
import './Projects.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import img1 from '../assets/SandraMarzzan.svg';
import img2 from '../assets/GenteDeDerecho.svg'; 
import img3 from '../assets/SylvieBurstin.svg'; // Asegúrate de tener estas imágenes en la ruta correcta

gsap.registerPlugin(ScrollTrigger);

// Dejamos solo nuestros 3 casos de éxito seleccionados
const projectsData = [
  {
    id: 1,
    name: 'E-commerce Sandra Marzzan',
    type: 'Tienda Online con WooCommerce',
    context: 'Proyecto reciente y actualmente online.',
    challenge: 'El cliente necesitaba una plataforma de venta robusta e independiente para expandir su alcance y tener control total sobre sus productos y promociones.',
    solution: 'Desarrollamos un e-commerce completo con WordPress y WooCommerce, implementando un diseño atractivo, pasarelas de pago y un sistema de gestión de inventario fácil de usar.',
    image: img1,
    url: 'https://sandramarzzanar.com.ar/',
    tags: ['WordPress', 'WooCommerce', 'E-commerce']
  },
  {
    id: 2,
    name: 'Reconstrucción y Modernización: "Gente de Derecho"',
    type: 'Re-platforming y Hub de Contenidos',
    context: 'Proyecto realizado en 2022. El diseño actual del sitio puede haber variado.',
    challenge: 'El cliente poseía un sitio web obsoleto: lento y difícil de actualizar. Su valioso contenido multimedia estaba disperso y perdía impacto.',
    solution: 'Se realizó una reconstrucción completa desde cero, optimizando el rendimiento y la seguridad. El nuevo sitio integra sus contenidos, transformando un activo obsoleto en una herramienta de comunicación potente.',
    image: img2,
    url: '#',
    tags: ['Re-platforming', 'Performance', 'API Integration']
  },
  {
    id: 3, 
    name: 'Sylvie Burstin: Renacimiento Digital de Alta Costura',
    type: 'Migración, Diseño UI/UX y Social Media Hub',
    context: 'El diseño actual del sitio puede haber variado.',
    challenge: 'La marca de alta costura estaba "atrapada" en un servidor y un diseño que no representaban la calidad de sus creaciones. Necesitaban una migración técnica completa y un rediseño desde cero que pusiera su arte visual en el centro del escenario.',
    solution: 'Se ejecutó una migración de servidor vía FTP y se reconstruyó la plataforma desde una base de código limpia. El nuevo sitio, enfocado en la performance visual, integra dinámicamente los feeds de Instagram y YouTube, creando una galería viva y siempre actualizada que refleja la esencia de la marca.',
    image: img3, // <-- REEMPLAZÁ ESTA RUTA
    url: '#',
    tags: ['Server Migration', 'UI/UX Design', 'Social API', 'WordPress']
  }
];

// Tu función de posicionamiento se mantiene
const getFloatPosition = idx => {
  const positions = ['float-left', 'float-right', 'float-center'];
  return positions[idx % positions.length];
};

const Projects = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const isMobile = window.matchMedia('(max-width: 600px)').matches;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.project-card-container');
      if (isMobile) {
        cards.forEach(card => {
          gsap.from(card, {
            opacity: 0,
            scale: 0.92,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'left 90%',
              horizontal: true,
              toggleActions: 'play none none none',
            }
          });
        });
      } else {
        cards.forEach(card => {
          gsap.from(card, {
            opacity: 0,
            y: 80,
            scale: 0.95,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            }
          });
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="proyectos" className="projects-section" ref={sectionRef}>
      <h2 className="section-title">Proyectos Destacados</h2>
      <div className="projects-list">
        {projectsData.map((project, idx) => (
          <article key={project.id} className={`project-card ${getFloatPosition(idx)}`}>
            {/* ... toda la estructura de tu tarjeta se mantiene igual ... */}
            <div className="project-mockup">
              <div className="project-image-wrapper">
                <img src={project.image} alt={`Mockup de ${project.name}`} className="project-mockup-image" />
              </div>
            </div>
            <div className="project-info">
              <h3 className="project-name">{project.name}</h3>
              <p className="project-type">{project.type}</p>
              {project.context && <p className="project-context">{project.context}</p>}
              <p className="project-desc"><strong>Desafío:</strong> {project.challenge}</p>
              <p className="project-desc"><strong>Solución:</strong> {project.solution}</p>
              <div className="project-tags">
                {project.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}
              </div>
              {project.url !== '#' && (
                <a href={project.url} className="project-link" target="_blank" rel="noopener noreferrer">
                  Visitar sitio
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
      {/* AQUÍ ESTÁ LA PUERTA AL CATÁLOGO COMPLETO */}
      <div className="projects-cta-wrapper">
        <a href="#" className="projects-cta-secondary">
          Explorar todos los trabajos
        </a>
      </div>
    </section>
  );
};

export default Projects;