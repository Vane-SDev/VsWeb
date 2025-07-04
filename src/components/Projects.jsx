import React, { useState, useRef, useEffect } from 'react';
import './Projects.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    id: 1,
    name: 'Portfolio Creativo',
    type: 'Landing Page',
    description: 'Sitio web personal para mostrar trabajos creativos, animaciones y contacto.',
    image: 'https://placehold.co/600x400/222/fff?text=Portfolio',
    url: '#'
  },
  {
    id: 2,
    name: 'E-commerce Moderno',
    type: 'Tienda Online',
    description: 'Tienda online con carrito, pagos y panel de administración intuitivo.',
    image: 'https://placehold.co/600x400/333/fff?text=E-commerce',
    url: '#'
  },
  {
    id: 3,
    name: 'Blog Minimalista',
    type: 'Blog',
    description: 'Blog con diseño limpio, optimizado para lectura y SEO.',
    image: 'https://placehold.co/600x400/444/fff?text=Blog',
    url: '#'
  },
  {
    id: 4,
    name: 'Web Corporativa',
    type: 'Empresa',
    description: 'Página institucional para empresas con secciones de servicios y contacto.',
    image: 'https://placehold.co/600x400/555/fff?text=Corporativa',
    url: '#'
  },
  {
    id: 5,
    name: 'Landing Producto',
    type: 'Landing',
    description: 'Landing page para lanzamiento de producto con formularios y animaciones.',
    image: 'https://placehold.co/600x400/666/fff?text=Producto',
    url: '#'
  },
  {
    id: 6,
    name: 'App de Reservas',
    type: 'Web App',
    description: 'Sistema de reservas online para turnos y citas, con notificaciones.',
    image: 'https://placehold.co/600x400/777/fff?text=Reservas',
    url: '#'
  },
  {
    id: 7,
    name: 'Portfolio Fotografía',
    type: 'Portfolio',
    description: 'Galería de fotos profesional con animaciones y carga optimizada.',
    image: 'https://placehold.co/600x400/888/fff?text=Fotografía',
    url: '#'
  },
  {
    id: 8,
    name: 'Web de Eventos',
    type: 'Eventos',
    description: 'Sitio para eventos con agenda, inscripciones y galería multimedia.',
    image: 'https://placehold.co/600x400/999/fff?text=Eventos',
    url: '#'
  },
  {
    id: 9,
    name: 'Dashboard Analytics',
    type: 'Dashboard',
    description: 'Panel de métricas y estadísticas con gráficos interactivos.',
    image: 'https://placehold.co/600x400/aaa/fff?text=Dashboard',
    url: '#'
  },
  {
    id: 10,
    name: 'Sitio ONG',
    type: 'Institucional',
    description: 'Web para ONG con donaciones, blog y voluntariado.',
    image: 'https://placehold.co/600x400/bbb/fff?text=ONG',
    url: '#'
  }
];

const getFloatPosition = idx => {
  const positions = [
    'float-left',
    'float-right',
    'float-center',
    'float-top-left',
    'float-bottom-right',
  ];
  return positions[idx % positions.length];
};

const Projects = () => {
  const [showAll, setShowAll] = useState(false);
  const projectsToShow = showAll ? projectsData : projectsData.slice(0, 5);
  const projectsRefs = useRef([]);
  const sectionRef = useRef(null);

  // Limpiar refs antes de renderizar
  projectsRefs.current = [];

  useEffect(() => {
    const validRefs = projectsRefs.current.filter(Boolean);
    validRefs.forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 80, scale: 0.92, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1,
          delay: i * 0.18,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, xPercent: 40 },
        {
          opacity: 1,
          xPercent: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.animation-container',
            start: 'bottom bottom',
            end: '+=100',
            scrub: 1,
            toggleActions: 'play none none none',
          },
        }
      );
    }
  }, [showAll]);

  return (
    <section className="projects-section" ref={sectionRef}>
      <h2 className="projects-title">Mis Proyectos</h2>
      <div className="projects-list" id="projects-list">
        {projectsToShow.map((project, idx) => (
          <article
            key={project.id}
            ref={el => (projectsRefs.current[idx] = el)}
            className={`project-card ${getFloatPosition(idx)}`}
            tabIndex={0}
            aria-label={`Proyecto: ${project.name}`}
          >
            <div className="project-mockup">
              <div className="monitor">
                <img
                  src={project.image}
                  alt={`Mockup de ${project.name}`}
                  className="monitor-image"
                />
              </div>
            </div>
            <div className="project-info">
              <h3 className="project-name">{project.name}</h3>
              <p className="project-type">{project.type}</p>
              <p className="project-desc">{project.description}</p>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
              >
                Ver Proyecto
              </a>
            </div>
          </article>
        ))}
      </div>
      <div className="projects-cta-wrapper">
        <button
          className="projects-cta"
          onClick={() => setShowAll(prev => !prev)}
          aria-expanded={showAll}
          aria-controls="projects-list"
        >
          {showAll ? 'Mostrar menos' : 'Mostrar más'}
        </button>
      </div>
    </section>
  );
};

export default Projects;
