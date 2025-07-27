// src/components/Services.jsx - VERSIÓN FINAL Y ESTRATÉGICA


import './Services.css';
import { FaWordpress, FaCode, FaRocket, FaStore, FaBuilding, FaCheckCircle } from 'react-icons/fa';

// ACTO 1: SERVICIOS DE CREACIÓN (con precio "desde")
const creationServicesData = [
  {
    icon: <FaRocket />,
    title: 'Página de Lanzamiento (One-Page)',
    idealFor: 'Para probar una idea de negocio y conseguir los primeros interesados',
    benefits: [
      'Diseño de alto impacto enfocado en que el visitante realice una acción.',
      'La herramienta más rápida para validar un nuevo producto o servicio.',
      'Optimización para que más visitantes se conviertan en clientes.',
      'Puesta en marcha y despliegue inicial',
    ],
    ctaText: "Consultar por esta solución"
  },
  {
    icon: <FaBuilding />,
    title: 'Sitio Web Corporativo',
    idealFor: 'Para construir autoridad y comunicar valor de marca',
    benefits: [
      'Plataforma digital profesional para presentar tus servicios y consolidar tu marca.',
      'Contenido organizado de forma lógica para que los usuarios encuentren todo fácilmente.',
      'Panel de control para que puedas gestionar tu contenido sin depender de nadie.',
      'Optimización para buscadores (Google) para aumentar la visibilidad.',
      
    ],
    isFeatured: true,
    ctaText: "Analizar mi proyecto"
  },
  {
    icon: <FaStore />,
    title: 'Tienda Online (E-commerce)',
    idealFor: 'Para escalar ventas y automatizar el proceso comercial',
    benefits: [
      'Canal de ventas propio, operativo 24/7 y sin pagar comisiones por venta.',
      'Integración con pasarelas de pago como Mercado Pago, para que tus clientes paguen de forma segura.',
      'Sistema para gestionar tu stock y tus pedidos de forma simple.',
      'Diseño intuitivo para que tus clientes compren de forma fácil y agradable.',
      
    ],
    isFeatured: false,
    ctaText: "Quiero vender online"
  },
  {
    icon: <FaCode />,
    title: 'Software a Medida',
    idealFor: 'Para optimizar operaciones y resolver problemas únicos',
    benefits: [
      'Automatización de tareas repetitivas para que tu equipo libere tiempo valioso.',
      'La solución definitiva a las limitaciones y el caos de las planillas de cálculo.',
      'Una herramienta de software diseñada exclusivamente para tu forma de trabajar.',
      'Una base de código sólida, preparada para crecer a futuro sin problemas.'
    ],
    isFeatured: false,
    ctaText: "Necesito una solución"
  }
];

// ACTO 2: PLANES DE PROTECCIÓN Y CRECIMIENTO
const maintenancePlansData = [
  {
    name: 'Plan Base: Mantenimiento Técnico',
    price: { monthly: '30', annual: '300' },
    description: 'La garantía de que la "mecánica" de tu sitio está siempre en perfecto estado: seguro, rápido y funcionando.',
    features: [
      'Actualizaciones de seguridad semanales',
      'Copias de seguridad diarias automáticas',
      'Monitoreo de velocidad y funcionamiento 24/7',
      'Soporte técnico para la corrección de errores'
    ],
    isFeatured: false
  },
  {
    name: 'Plan Pro: Mantenimiento y Contenidos',
    price: { monthly: '70', annual: '700' },
    description: 'Ideal para quienes además del mantenimiento técnico, necesitan delegar la carga de novedades en su web.',
    features: [
      'Todo lo del Plan Base',
      'Banco de horas para Actualización de Contenidos (subir artículos, cambiar fotos, textos, etc.)',
      'Soporte prioritario para resolver tus dudas',
      'Revisión y optimización de velocidad trimestral'
    ],
    isFeatured: true
  },
  {
    name: 'Plan Socio: Evolución Estratégica',
    price: { monthly: '150', annual: '1500' },
    description: 'Nos convertimos en tu equipo técnico, asegurando no solo el presente, sino el crecimiento futuro de tu plataforma.',
    features: [
      'Todo lo del Plan Pro',
      'Horas de desarrollo para Nuevas Funcionalidades',
      'Consultoría proactiva para mejoras de diseño (UX)',
      'Análisis y reportes de posicionamiento (SEO)'
    ],
    isFeatured: false
  }
];

const Services = () => {
  // const [billingCycle, setBillingCycle] = useState('monthly');

  // const handleBillingCycleChange = (event) => {
  //   setBillingCycle(event.target.value);
  // };

  return (
    <section id="services" className="services-section">
      <div className="services-container">
        <h2 className="section-title">Soluciones Digitales, Resultados Tangibles.</h2>
        <p className="section-subtitle">
          Nuestro método combina un análisis estratégico con un desarrollo técnico preciso. No ofrecemos productos genéricos; diseñamos y construimos la herramienta digital exacta que cada modelo de negocio requiere para ser más eficiente y competitivo.
        </p>
        <div
          id="servicios"
          aria-hidden="true"
          style={{
            position: 'absolute',
            width: '1px',
            height: '1px',
            margin: '-1px',
            padding: 0,
            overflow: 'hidden',
            clip: 'rect(0, 0, 0, 0)',
            border: 0,
          }}
        />
        <div  className="services-cards-grid">
          {creationServicesData.map((service, index) => (
            <div className={`service-card ${service.isFeatured ? 'featured' : ''}`} key={index}>
              {service.isFeatured && <div className="featured-badge">Más Elegido</div>}
              <div className="service-icon-wrapper">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-ideal-for">{service.idealFor}</p> {/* NUEVO ELEMENTO */}
              <ul className="service-benefits-list">
                {service.benefits.map((benefit, i) => (
                  <li key={i}><FaCheckCircle className="feature-icon" /> {benefit}</li>
                ))}
              </ul>
              <a href={`https://wa.me/5492645207128?text=Hola!%20Quisiera%20consultar%20por%20el%20servicio%20de%20${service.title}`} className="service-cta" target="_blank" rel="noopener noreferrer">
                {service.ctaText}
              </a>
            </div>
            
          ))}
        </div>
        
          
        {/* --- ACTO 2: LA PROTECCIÓN Y CRECIMIENTO --- */}
        <div className="maintenance-section">
          <div className="maintenance-header">
            <div className="maintenance-icon-wrapper"><FaRocket style={{ transform: 'rotate(90deg)' }} /></div>
            <h3 className="maintenance-title">Tu Inversión Digital, Siempre Segura y en Evolución.</h3>
            <p className="maintenance-subtitle">El lanzamiento es solo el comienzo. Con nuestros planes de mantenimiento, nos aseguramos de que tu web se mantenga rápida, segura y siga creciendo junto a tu negocio.</p>
          </div>

          <div className="maintenance-plans-grid">
            {maintenancePlansData.map((plan, index) => (
              <div className={`maintenance-plan-card ${plan.isFeatured ? 'featured' : ''}`} key={index}>
                {plan.isFeatured && <div className="featured-badge">Recomendado</div>}
                <h4 className="plan-name">{plan.name}</h4>
                <p className="plan-description">{plan.description}</p>
                <ul className="plan-features-list">
                  {plan.features.map((feature, i) => (
                    <li key={i}><FaCheckCircle className="feature-icon" /> {feature}</li>
                  ))}
                </ul>
                <a href={`https://wa.me/5492645207128?text=Hola!%20Quisiera%20saber%20más%20sobre%20el%20${plan.name}`} className="plan-cta" target="_blank" rel="noopener noreferrer">
                  Me Interesa
                </a>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default Services;