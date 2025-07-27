// src/components/Projects.jsx

import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';

// Estilos de Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Tu CSS para la sección
import './Projects.css';

// El nuevo componente para el modal
import ProjectModal from './ProjectModal';

// Importación de imágenes
import img1 from '../assets/SandraMarzzan.webp';
import img2 from '../assets/GenteDeDerecho.webp';
import img3 from '../assets/SylvieBurstin.webp';
import img4 from '../assets/GrupoVG.webp';
import img5 from '../assets/SGAComex.webp';
import img6 from '../assets/Axiaval.webp';
import img7 from '../assets/FPC.webp';


// Combinamos TODOS tus proyectos en un solo array
const allProjectsData = [
  {
    id: 1,
    category: 'E-commerce B2C',
    title: 'Sandra Marzzan',
    summary: 'Tienda Online con WooCommerce para expansión nacional.',
    image: img1,
    challenge: 'El cliente necesitaba una plataforma de venta robusta e independiente para expandir su alcance y tener control total sobre sus productos y promociones. (Proyecto vía Bica Digital).',
    solution: 'Desarrollamos un e-commerce completo con WordPress y WooCommerce, implementando un diseño atractivo, pasarelas de pago y un sistema de gestión de inventario fácil de usar.',
    tags: ['WordPress', 'WooCommerce', 'E-commerce'],
    url: '#'
  },
  {
    id: 6,
    category: 'Plataforma de Contenidos',
    title: 'Gente de Derecho',
    summary: 'Reconstrucción de un sitio obsoleto a un hub de contenidos.',
    image: img2,
    challenge: 'El cliente poseía un sitio web obsoleto: lento y difícil de actualizar. Su contenido multimedia estaba disperso y perdía impacto. (Proyecto vía Smok Media).',
    solution: 'Se realizó una reconstrucción completa desde cero, optimizando el rendimiento y la seguridad. El nuevo sitio integra sus contenidos, transformando un activo obsoleto en una herramienta de comunicación potente.',
    tags: ['Re-platforming', 'Performance', 'API Integration'],
    url: '#'
  },
  {
    id: 3,
    category: 'Sitio Web de Alta Costura',
    title: 'Sylvie Burstin',
    summary: 'Renacimiento digital para una marca de alta costura.',
    image: img3,
    challenge: 'La marca se encontraba un servidor y un diseño que no representaban la calidad de sus creaciones. Necesitaban una migración técnica completa y un rediseño desde cero que pusiera su arte visual en el centro del escenario. (Proyecto vía Smok Media).',
    solution: 'Se ejecutó una migración de servidor vía FTP y se reconstruyó la plataforma desde una base de código limpia. El nuevo sitio, enfocado en la performance visual, integra dinámicamente los feeds de Instagram y YouTube, creando una galería viva y siempre actualizada que refleja la esencia de la marca.',
    tags: ['Server Migration', 'UI/UX Design', 'Social API', 'WordPress'],
    url: '#'
  },
  {
    id: 2,
    category: 'Diseño Web y Branding',
    title: 'Estudio Guanco VG',
    summary: 'Sitio web corporativo y diseño de marca para estudio aduanero.',
    image: img4,
    challenge: 'El estudio necesitaba una identidad visual profesional y un sitio web que comunicara su experiencia en comercio exterior para generar confianza y captar clientes de alto valor.',
    solution: 'Diseñamos una identidad de marca completa, incluyendo el logotipo, y desarrollamos un sitio corporativo enfocado en la autoridad, presentando sus servicios de gestión aduanera de forma integral.',
    tags: ['Branding', 'WordPress', 'Diseño Corporativo'],
    url: '#'
  },
  {
    id: 5,
    category: 'Diseño Web y Branding',
    title: 'SGA Comex',
    summary: 'Web corporativa y marca para consultora de comercio internacional.',
    image: img5,
    challenge: 'A pesar de su posicionamiento y década de experiencia, SGA Comex carecía de una identidad visual y presencia digital profesional. Requerían una marca y un sitio web creados desde cero que estuvieran a la altura de su reputación como expertos.',
    solution: 'Creamos una identidad de marca integral, incluyendo logotipo, y un sitio web elegante que sirve como carta de presentación. La plataforma destaca su equipo y sus soluciones para el comercio global.',
    tags: ['Branding', 'WordPress', 'Consultoría', 'UI/UX'],
    url: '#'
  },
  {
    id: 4,
    category: 'Portal Web con Job Board',
    title: 'Axiaval',
    summary: 'Portal de RR.HH. con bolsa de trabajo integrada.',
    image: img6,
    challenge: 'La empresa de RR.HH. buscaba centralizar sus servicios y ofertas de empleo en una única plataforma digital, facilitando la postulación de candidatos y la gestión de procesos.',
    solution: 'Desarrollamos un sitio web corporativo con una sección de \'Bolsa de Trabajo\' a medida, permitiendo a los candidatos filtrar búsquedas y postularse a través de formularios personalizados.',
    tags: ['WordPress', 'Job Board', 'RR.HH.'],
    url: '#'
  },
  {
    id: 7,
    category: 'Migración y Rediseño Web',
    title: 'FPC',
    summary: 'Migración y rediseño completo para empresa de alta tecnología.',
    image: img7,
    challenge: 'El sitio web de FPC estaba obsoleto. Requerían una migración completa y un rediseño que comunicara su liderazgo en ingeniería industrial y tecnológica. (Proyecto vía Smok Media).',
    solution: 'Ejecutamos una migración de servidor exitosa y reconstruimos el sitio desde cero. El nuevo diseño pone en valor sus productos y servicios de alta tecnología, reflejando su misión de innovación y excelencia.',
    tags: ['Server Migration', 'Rediseño Web', 'WordPress'],
    url: '#'
  }
];
const Projects = () => {
  const sectionRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  
  const openModal = (project) => setSelectedProject(project);
  const closeModal = () => setSelectedProject(null);

  return (
    <section id="proyectos" className="projects-section" ref={sectionRef}>
      {/* Contenedor principal para el nuevo layout */}
      <div className="projects-layout-container">

        {/* Columna Izquierda: Título, descripción y controles */}
        <div className="projects-header">
          <h2 className="section-title">Proyectos Destacados</h2>
          <p className="projects-description">
            La prueba de que una estrategia bien ejecutada genera un impacto real. Aquí no solo mostramos el resultado final; detallamos cómo nuestro enfoque se aplicó para resolver desafíos de negocio concretos y medibles.
          </p>
          <div className="swiper-controls-desktop">
            <div className="swiper-button-prev"></div>
            <div className="swiper-pagination"></div>
            <div className="swiper-button-next"></div>
          </div>
        </div>

        {/* Columna Derecha: El carrusel */}
        <div className="swiper-area">
          <Swiper
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={30}
            // Hacemos visible parte de la siguiente tarjeta en desktop
            slidesPerView={'auto'}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            }}
            pagination={{
              clickable: true,
              el: '.swiper-pagination'
            }}
            className="my-swiper"
            breakpoints={{
              // Para vistas mayores a 900px (escritorio), usamos tu configuración original
              901: {
                slidesPerView: 'auto',
                spaceBetween: 30,
                centeredSlides: false,
                loop: true,
              },
              // Para vistas de 0 a 900px (móvil y tablet)
              0: {
                slidesPerView: 1.2, // Mostramos 1 tarjeta y un poco de la siguiente
                spaceBetween: 20,
                centeredSlides: true,
                loop: true,
              }
            }}
          >
          
            {allProjectsData.map((project) => (
              <SwiperSlide key={project.id} onClick={() => openModal(project)}>
                <div className="project-card-structured">
                  <div className="project-card-image-area">
                    <img src={project.image} alt={project.title} className="project-card-img" />
                  </div>
                  <div className="project-card-text-area">
                    <div>
                      <p className="project-card-category">{project.category}</p>
                      <h3 className="project-card-title">{project.title}</h3>
                      <p className="project-card-summary">{project.summary}</p>
                    </div>
                    <span className="project-card-cta">
                      Ver Detalles
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Controles para móvil (se mantiene oculto en desktop) */}
      <div className="swiper-controls-mobile">
        <div className="swiper-button-prev"></div>
        <div className="swiper-pagination"></div>
        <div className="swiper-button-next"></div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          open={!!selectedProject}
          onClose={closeModal}
        />
      )}
    </section>
  );
};

export default Projects;