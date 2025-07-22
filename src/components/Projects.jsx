import React, { useLayoutEffect, useRef, useState } from 'react';
import './Projects.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import img1 from '../assets/SandraMarzzanMockup.webp';
import img2 from '../assets/GenteDeDerechoMockup.webp'; 
import img3 from '../assets/SylvieBurstinMockup.webp';
import img4 from '../assets/Logo_vs.png';
import img5 from '../assets/LogoSGAcomex.webp';
import img6 from '../assets/LogoVG.webp';
import img7 from '../assets/LogoCamex.webp';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    id: 1,
    name: 'E-commerce',
    type: 'Tienda Online con WooCommerce',
    context: 'Proyecto reciente.',
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
    context: ' El diseño actual del sitio puede haber variado.',
    challenge: 'El cliente poseía un sitio web obsoleto: lento y difícil de actualizar. Su contenido multimedia estaba disperso y perdía impacto. Proyecto realizado en conjunto con la agencia de relaciones públicas Smok Media.',
    solution: 'Se realizó una reconstrucción completa desde cero, optimizando el rendimiento y la seguridad. El nuevo sitio integra sus contenidos, transformando un activo obsoleto en una herramienta de comunicación potente.',
    image: img2,
    url: '#',
    tags: ['Re-platforming', 'Performance', 'API Integration']
  },
  {
    id: 3, 
    name: 'Sylvie Burstin: Renacimiento Digital de Alta Costura',
    type: 'Migración, Desarrollo y Social Media Hub',
    context: 'El diseño actual del sitio puede haber variado.',
    challenge: 'La marca se encontraba un servidor y un diseño que no representaban la calidad de sus creaciones. Necesitaban una migración técnica completa y un rediseño desde cero que pusiera su arte visual en el centro del escenario. Proyecto realizado en conjunto con la agencia de relaciones públicas Smok Media.',
    solution: 'Se ejecutó una migración de servidor vía FTP y se reconstruyó la plataforma desde una base de código limpia. El nuevo sitio, enfocado en la performance visual, integra dinámicamente los feeds de Instagram y YouTube, creando una galería viva y siempre actualizada que refleja la esencia de la marca.',
    image: img3,
    url: '#',
    tags: ['Server Migration', 'UI/UX Design', 'Social API', 'WordPress']
  }
];

const moreProjects = [
  {
    id: 4,
    name: 'AXIAVAL',
    type: 'Sistema de Tasaciones',
    context: 'Web corporativa y sistema a medida.',
    challenge: 'El cliente necesitaba digitalizar y automatizar la gestión de tasaciones inmobiliarias.',
    solution: 'Desarrollamos un sistema web seguro y autogestionable, integrando notificaciones y reportes automáticos.',
    image: img4,
    url: '#',
    tags: ['React', 'Node.js', 'Automatización']
  },
  {
    id: 5,
    name: 'SGA Comex',
    type: 'Gestión Aduanera',
    context: 'Sistema para operadores de comercio exterior.',
    challenge: 'El cliente requería un sistema centralizado para el seguimiento de operaciones aduaneras.',
    solution: 'Creamos una plataforma con panel de control, reportes y alertas automáticas.',
    image: img5,
    url: '#',
    tags: ['React', 'API', 'UI/UX']
  },
  {
    id: 6,
    name: 'Grupo VG',
    type: 'Sitio Institucional',
    context: 'Rediseño de imagen digital.',
    challenge: 'Actualizar la presencia online y mejorar la captación de clientes.',
    solution: 'Rediseño completo con enfoque visual y optimización SEO.',
    image: img6,
    url: '#',
    tags: ['WordPress', 'SEO', 'Branding']
  },
  {
    id: 7,
    name: 'CamexTrans',
    type: 'Logística y Transporte',
    context: 'Web informativa y sistema de seguimiento.',
    challenge: 'El cliente necesitaba mostrar servicios y permitir seguimiento de envíos.',
    solution: 'Desarrollamos una web moderna con sistema de tracking integrado.',
    image: img7,
    url: '#',
    tags: ['Web', 'Tracking', 'Logística']
  }
];

const Projects = () => {
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);
  const moreRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Estados para el drag/swipe
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const goToSlide = (index) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 800);
  };

  // Función para manejar el inicio del drag
  const handleDragStart = (e) => {
    if (isAnimating) return;
    
    setIsDragging(true);
    const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    setStartX(clientX);
    setDragDistance(0);
  };

  // Función para manejar el movimiento del drag
  const handleDragMove = (e) => {
    if (!isDragging || isAnimating) return;
    
    // e.preventDefault();
    const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    setDragDistance(clientX - startX);
  };

  // Función para manejar el fin del drag
  const handleDragEnd = () => {
    if (!isDragging || isAnimating) return;
    
    setIsDragging(false);
    
    // Determinar la dirección del swipe y cambiar slide
    const threshold = 100; // Distancia mínima para considerar un swipe
    
    if (Math.abs(dragDistance) > threshold) {
      if (dragDistance > 0 && currentSlide > 0) {
        // Swipe hacia la derecha - slide anterior
        goToSlide(currentSlide - 1);
      } else if (dragDistance < 0 && currentSlide < projectsData.length - 1) {
        // Swipe hacia la izquierda - slide siguiente
        goToSlide(currentSlide + 1);
      }
    }
    
    setDragDistance(0);
  };

  // Event listeners para mouse
  const handleMouseDown = (e) => {
    handleDragStart(e);
  };

  const handleMouseMove = (e) => {
    handleDragMove(e);
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleDragEnd();
    }
  };

  // Event listeners para touch
  const handleTouchStart = (e) => {
    handleDragStart(e);
  };

  const handleTouchMove = (e) => {
    handleDragMove(e);
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animación de entrada de la sección
      gsap.fromTo(sectionRef.current, 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Animación del título
      gsap.fromTo('.section-title', 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          delay: 0.2,
          ease: 'power2.out'
        }
      );

      // Animación inicial de las tarjetas
      // gsap.fromTo('.project-card', 
      //   { opacity: 0, scale: 0.9, y: 30 },
      //   { 
      //     opacity: 1, 
      //     scale: 1, 
      //     y: 0, 
      //     duration: 0.8,
      //     delay: 0.4,
      //     ease: 'power2.out'
      //   }
      // );



      // Animación de los indicadores
      gsap.fromTo('.carousel-indicators', 
        { opacity: 0, scale: 0.8 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 0.6,
          delay: 0.8,
          ease: 'back.out(1.7)'
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animación de cambio de slide
  useLayoutEffect(() => {
    if (carouselRef.current) {
      const cards = carouselRef.current.querySelectorAll('.project-card');
      
      cards.forEach((card, index) => {
        if (index === currentSlide) {
          gsap.to(card, {
            opacity: 1,
            scale: 1,
            x: 0,
            duration: 0.6,
            ease: 'power2.out'
          });
        } else {
          gsap.to(card, {
            opacity: 0.3,
            scale: 0.85,
            x: index < currentSlide ? -50 : 50,
            duration: 0.6,
            ease: 'power2.out'
          });
        }
      });
    }
  }, [currentSlide]);

  useLayoutEffect(() => {
    if (showAll && moreRef.current) {
      gsap.fromTo(moreRef.current, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' });
    }
  }, [showAll]);

  return (
    <section id="proyectos" className="projects-section" ref={sectionRef}>
      <div className="projects-container">
        <h2 className="section-title">Proyectos Destacados</h2>
        
        {/* Carrusel Principal */}
        <div className="carousel-container">
          <div 
            className="carousel-track" 
            ref={carouselRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          >
            {projectsData.map((project, index) => (
              <div 
                key={project.id} 
                className={`project-card ${index === currentSlide ? 'active' : ''}`}
                style={{ 
                  transform: `translateX(${(index - currentSlide) * 100}%)`,
                  zIndex: index === currentSlide ? 10 : 1
                }}
              >
                <div className="project-card-glass">
                  <div className="project-image-section">
                    <div className="project-image-wrapper">
                      <img 
                        src={project.image} 
                        alt={`Mockup de ${project.name}`} 
                        className="project-image" 
                      />
                    </div>
                    <div className="project-overlay">
                      <div className="project-badge">
                        <span className="project-number">0{index + 1}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="project-content">
                    <div className="project-header">
                      <h3 className="project-name">{project.name}</h3>
                      <p className="project-type">{project.type}</p>
                      {project.context && (
                        <div className="project-context-badge">
                          {project.context}
                        </div>
                      )}
                    </div>
                    
                    <div className="project-details">
                      <div className="project-challenge">
                        <h4>Desafío</h4>
                        <p>{project.challenge}</p>
                      </div>
                      <div className="project-solution">
                        <h4>Solución</h4>
                        <p>{project.solution}</p>
                      </div>
                    </div>
                    
                    <div className="project-footer">
                      <div className="project-tags">
                        {project.tags.map(tag => (
                          <span className="tag" key={tag}>{tag}</span>
                        ))}
                      </div>
                      {/* {project.url !== '#' && (
                        <a 
                          href={project.url} 
                          className="project-link" 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <span>Visitar sitio</span>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </a>
                      )} */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          

        </div>
        
        {/* Indicadores */}
        <div className="carousel-indicators">
          {projectsData.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              disabled={isAnimating}
            >
              <span className="indicator-dot"></span>
            </button>
          ))}
        </div>
        
        {/* CTA: solo mostrar aquí si la grilla NO está visible */}
        {/* {!showAll && (
          <div className="projects-cta-wrapper">
            <button
              className="projects-cta-secondary"
              onClick={() => setShowAll(true)}
              aria-expanded={showAll}
            >
              Explorar todos los trabajos
            </button>
          </div>
        )} */}
        {/* Grilla de más proyectos */}
        {showAll && (
          <>
            <div className="all-projects-grid" ref={moreRef}>
              {moreProjects.map((project, idx) => (
                <div key={project.id} className="project-card active">
                  <div className="project-card-glass">
                    <div className="project-image-section">
                      <div className="project-image-wrapper">
                        <img
                          src={project.image}
                          alt={`Mockup de ${project.name}`}
                          className="project-image"
                        />
                      </div>
                      <div className="project-overlay">
                        <div className="project-badge">
                          <span className="project-number">0{idx + 4}</span>
                        </div>
                      </div>
                    </div>
                    <div className="project-content">
                      <div className="project-header">
                        <h3 className="project-name">{project.name}</h3>
                        <p className="project-type">{project.type}</p>
                        {project.context && (
                          <div className="project-context-badge">
                            {project.context}
                          </div>
                        )}
                      </div>
                      <div className="project-details">
                        <div className="project-challenge">
                          <h4>Desafío</h4>
                          <p>{project.challenge}</p>
                        </div>
                        <div className="project-solution">
                          <h4>Solución</h4>
                          <p>{project.solution}</p>
                        </div>
                      </div>
                      <div className="project-footer">
                        <div className="project-tags">
                          {project.tags.map(tag => (
                            <span className="tag" key={tag}>{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* CTA: mostrar aquí si la grilla está visible */}
            <div className="projects-cta-wrapper">
              <button
                className="projects-cta-secondary"
                onClick={() => {
                  setShowAll(false);
                  setTimeout(() => {
                    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 100);
                }}
                aria-expanded={showAll}
              >
                Ver menos
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Projects;