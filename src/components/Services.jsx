import React from 'react';
import './Services.css';
import { FaWordpress, FaCode, FaRocket } from 'react-icons/fa';
import { FaWhatsapp } from 'react-icons/fa';

// Array con los datos de los servicios para mantener el código limpio
const servicesData = [
  {
    icon: <FaWordpress />,
    title: 'Plataformas Autogestionables',
    description: 'Te entregamos un sitio web o e-commerce potente sobre WordPress que vos mismo podés actualizar fácilmente. Agregá productos, cambiá textos o publicá en tu blog sin depender de nadie. Tomá el control de tu negocio online.'
  },
  {
    icon: <FaCode />,
    title: 'Automatización para tu Negocio',
    description: '¿Cansado de gestionar todo en planillas de Excel que son un caos? Creamos sistemas a medida para que automatices tareas repetitivas, gestiones tu stock o coordines turnos de forma eficiente. Ahorrá tiempo y tomá mejores decisiones.'
  },
  {
    icon: <FaRocket />,
    title: 'Tu Socio Tecnológico a Largo Plazo',
    description: 'Lanzar tu web es solo el comienzo. Ofrecemos un servicio de mantenimiento y soporte continuo para que duermas tranquilo. Nos encargamos de la seguridad, las actualizaciones y las mejoras para que tu inversión esté siempre protegida y evolucionando.'
  }
];

const Services = () => {
  return (
    <section id="servicios" className="services-section">
      <div className="services-container">
        <h2 className="section-title">Convertimos tus Desafíos en Activos Digitales.</h2>
        <p className="section-subtitle">
          Tu negocio necesita más que una simple página web. Necesita herramientas que ahorren tiempo, generen ventas y te den tranquilidad. Nosotros las construimos.
        </p>
        <div className="services-cards-grid">
          {servicesData.map((service, index) => (
            <div
              className="service-card"
              key={index}
            >
              <div className="service-icon-wrapper">
                {service.icon}
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <a
                href="https://wa.me/5491123456789" // Cambia por tu número real
                className="service-cta"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Consultar sobre ${service.title} por WhatsApp`}
              >
                <FaWhatsapp style={{ marginRight: '0.5rem', fontSize: '1.2em', verticalAlign: 'middle' }} />
                Consultar por WhatsApp
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;