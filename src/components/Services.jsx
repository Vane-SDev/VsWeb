// src/components/Services.jsx - VERSIÓN FINAL Y ESTRATÉGICA

import React, { useState } from 'react';
import './Services.css';
import { FaWordpress, FaCode, FaRocket, FaCheckCircle } from 'react-icons/fa';

// ACTO 1: SERVICIOS DE CREACIÓN (con precio "desde")
const creationServicesData = [
  {
    icon: <FaRocket />,
    title: 'Lanzá tu Negocio Online',
    serviceName: 'Sitio One-Page',
    description: 'La forma más rápida y profesional de validar tu idea y captar tus primeros clientes.',
    benefits: [
      'Diseño de impacto en una sola página.',
      'Enfocado 100% en la conversión.',
      'Dominio y Hosting por 1 año incluidos.'
    ],
    startingPrice: '290',
    isFeatured: false,
    ctaText: "Quiero mi One-Page"
  },
  {
    icon: <FaWordpress />,
    title: 'Digitalizá tu Empresa',
    serviceName: 'Web Autogestionable',
    description: 'La solución completa para pymes y profesionales que buscan crecer y tener el control.',
    benefits: [
      'Control total para actualizar tu contenido.',
      'Diseño a medida, sin plantillas genéricas.',
      'Optimizado para SEO desde el día uno.',
      'Dominio y Hosting por 1 año incluidos.'
    ],
    startingPrice: '550',
    isFeatured: true, // ¡Esta es nuestra oferta destacada!
    ctaText: "Necesito mi Web"
  },
  {
    icon: <FaCode />,
    title: 'Optimizá tu Operación',
    serviceName: 'Sistema a Medida',
    description: 'Convertimos procesos manuales y caóticos en sistemas eficientes que te ahorran tiempo y dinero.',
    benefits: [
      'Automatización de tareas repetitivas.',
      'Gestión de datos centralizada y segura.',
      'Infraestructura robusta incluida.'
    ],
    startingPrice: '1500',
    isFeatured: false,
    ctaText: "Quiero un Sistema"
  }
];

// ACTO 2: PLANES DE PROTECCIÓN Y CRECIMIENTO
const maintenancePlansData = [
  {
    name: 'Plan Esencial',
    price: { monthly: '30', annual: '300' },
    description: 'Para que duermas tranquilo sabiendo que tu web está segura y actualizada.',
    features: [
      'Actualizaciones de WordPress y plugins',
      'Copias de seguridad diarias',
      'Monitoreo de seguridad 24/7',
      'Informe mensual de estado'
    ],
    isFeatured: false
  },
  {
    name: 'Plan Crecimiento',
    price: { monthly: '70', annual: '700' },
    description: 'Ideal para negocios que necesitan agilidad y soporte para cambios.',
    features: [
      'Todo lo del Plan Esencial',
      '2 horas de soporte mensual',
      'Optimización de velocidad',
      'Soporte prioritario'
    ],
    isFeatured: true
  },
  {
    name: 'Plan Estratégico',
    price: { monthly: '150', annual: '1500' },
    description: 'Nos convertimos en tu departamento técnico y de estrategia digital.',
    features: [
      'Todo lo del Plan Crecimiento',
      '5 horas de soporte mensual',
      'Monitoreo y reportes SEO',
      'Consultoría estratégica trimestral'
    ],
    isFeatured: false
  }
];

const Services = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const handleBillingCycleChange = (event) => {
    setBillingCycle(event.target.value);
  };

  return (
    <section id="servicios" className="services-section">
      <div className="services-container">

        {/* --- ACTO 1: LA CREACIÓN --- */}
        <h2 className="section-title">Webs y Sistemas que trabajan para vos, no al revés.</h2>
        <p className="section-subtitle">
          Para pymes y profesionales que no tienen tiempo que perder. Creamos las herramientas digitales que te liberan para que te dediques a lo que mejor sabés hacer: hacer crecer tu negocio.
        </p>
        <div className="services-cards-grid">
          {creationServicesData.map((service, index) => (
            <div className={`service-card ${service.isFeatured ? 'featured' : ''}`} key={index}>

              {/* Añadimos un badge para la tarjeta destacada */}
              {service.isFeatured && <div className="featured-badge">Más Elegido</div>}

              <div className="service-icon-wrapper">{service.icon}</div>

              {/* Nuevo Título y Subtítulo de la card */}
              <h3 className="service-title">{service.title}</h3>
              <p className="service-card-subtitle">{service.serviceName}</p>

              {/* Nueva lista de beneficios "escaneable" */}
              <ul className="service-benefits-list">
                {service.benefits.map((benefit, i) => (
                  <li key={i}><FaCheckCircle className="feature-icon" /> {benefit}</li>
                ))}
              </ul>

              <div className="service-starting-price">
                Proyectos desde US$ {service.startingPrice}
              </div>
              <a href={`https://wa.me/5492645207128?text=Hola!%20Quisiera%20consultar%20por%20el%20servicio%20de%20${service.serviceName}`} className="service-cta" target="_blank" rel="noopener noreferrer">
                {service.ctaText}
              </a>
            </div>
          ))}
        </div>

        {/* --- ACTO 2: LA PROTECCIÓN Y CRECIMIENTO --- */}
        <div className="maintenance-section">
          <div className="maintenance-header">
            <div className="maintenance-icon-wrapper"><FaRocket /></div>
            <h3 className="maintenance-title">El lanzamiento es solo el comienzo.</h3>
            <p className="maintenance-subtitle">Tu web es un activo que necesita cuidado para crecer seguro. Elegí la tranquilidad que mejor se adapte a tu momento.</p>
          </div>

          <div className="billing-toggle">
            <label className={billingCycle === 'monthly' ? 'active' : ''}>
              <input type="radio" name="billingCycle" value="monthly" checked={billingCycle === 'monthly'} onChange={handleBillingCycleChange} />
              Facturación Mensual
            </label>
            <label className={billingCycle === 'annual' ? 'active' : ''}>
              <input type="radio" name="billingCycle" value="annual" checked={billingCycle === 'annual'} onChange={handleBillingCycleChange} />
              Facturación Anual
              <span className="discount-badge">Ahorrá 2 meses</span>
            </label>
          </div>

          <div className="maintenance-plans-grid">
            {maintenancePlansData.map((plan, index) => {
              // Calculamos el precio anual original para mostrar el ahorro
              const originalAnnualPrice = plan.price.monthly * 12;

              return (
                <div className={`maintenance-plan-card ${plan.isFeatured ? 'featured' : ''}`} key={index}>
                  <h4 className="plan-name">{plan.name}</h4>

                  {/* --- LÓGICA DE PRECIOS MEJORADA --- */}
                  <div className="plan-price-wrapper">
                    <span className="plan-price-currency">US$</span>
                    <span className="plan-price-amount">{plan.price[billingCycle]}</span>
                    <span className="plan-price-cycle">/ {billingCycle === 'monthly' ? 'mes' : 'año'}</span>

                    {/* Mostramos el precio tachado solo en la vista anual */}
                    {billingCycle === 'annual' && (
                      <span className="original-price">Antes US$ {originalAnnualPrice}</span>
                    )}
                  </div>

                  <p className="plan-description">{plan.description}</p>
                  <ul className="plan-features-list">
                    {plan.features.map((feature, i) => (
                      <li key={i}><FaCheckCircle className="feature-icon" /> {feature}</li>
                    ))}
                  </ul>
                  <a href={`https://wa.me/5492645207128?text=Hola!%20Quisiera%20contratar%20el%20${plan.name}`} className="plan-cta" target="_blank" rel="noopener noreferrer">
                    Contratar Plan
                  </a>
                </div>
              );
            })}
          </div>

          {/* --- NOTA DE ACLARACIÓN PARA ARGENTINA --- */}
          <p className="payment-note-ar">
            * Para clientes en Argentina: los pagos se realizan en pesos a la cotización del día.
          </p>
        </div>

      </div>
    </section>
  );
}

export default Services;