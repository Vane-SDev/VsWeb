// src/components/Services.jsx - VERSIÓN FINAL Y ESTRATÉGICA


import './Services.css';
import { FaWordpress, FaCode, FaRocket, FaStore, FaBuilding, FaCheckCircle } from 'react-icons/fa';

// ACTO 1: SERVICIOS DE CREACIÓN (con precio "desde")
const creationServicesData = [
  {
    icon: <FaRocket />,
    title: 'Página de Lanzamiento',
    idealFor: 'Emprendedores y nuevos proyectos',
    benefits: [
      'Diseño de impacto en una sola página (One-Page).',
      'Ideal para validar una idea o captar primeros clientes.',
      'Enfocada 100% en una acción (ej. contacto, registro).',
      'Incluye dominio y hosting por 1 año.'
    ],
    ctaText: "Lanzar mi Proyecto"
  },
  {
    icon: <FaBuilding />,
    title: 'Sitio Web Corporativo',
    idealFor: 'Pymes y profesionales establecidos',
    benefits: [
      'Diseño multipágina para presentar tu empresa.',
      'Secciones clave: Servicios, Nosotros, Contacto, etc.',
      'Plataforma autogestionable (WordPress).',
      'Optimizado para SEO y credibilidad.'
    ],
    isFeatured: true,
    ctaText: "Impulsar mi Empresa"
  },
  {
    icon: <FaStore />,
    title: 'Tienda Online (E-commerce)',
    idealFor: 'Negocios que quieren vender productos online',
    benefits: [
      'Catálogo de productos y carrito de compras.',
      'Integración con pasarelas de pago (Mercado Pago).',
      'Gestión de stock e inventario simplificada.',
      'Diseño enfocado en maximizar tus ventas.'
    ],
    isFeatured: false,
    ctaText: "Quiero Vender Online"
  },
  {
    icon: <FaCode />,
    title: 'Sistema a Medida',
    idealFor: 'Empresas con necesidades operativas únicas',
    benefits: [
      'Automatización de procesos y tareas repetitivas.',
      'Solución definitiva al caos de las planillas.',
      'Herramienta creada exclusivamente para tu negocio.',
      'Infraestructura robusta y escalable.'
    ],
    isFeatured: false,
    ctaText: "Necesito una Solución"
  }
];

// ACTO 2: PLANES DE PROTECCIÓN Y CRECIMIENTO
const maintenancePlansData = [
  {
    name: 'Plan Base',
    price: { monthly: '30', annual: '300' },
    description: 'La tranquilidad de saber que tu sitio está siempre seguro, rápido y funcionando.',
    features: [
      'Actualizaciones técnicas semanales',
      'Copias de seguridad diarias en la nube',
      'Monitoreo de seguridad y performance 24/7',
      'Corrección de links rotos y errores menores'
    ],
    isFeatured: false
  },
  {
    name: 'Plan Pro',
    price: { monthly: '70', annual: '700' },
    description: 'Para negocios dinámicos que necesitan mantener su web fresca y relevante.',
    features: [
      'Todo lo del Plan Base',
      'Banco de horas para actualización de contenidos',
      'Soporte técnico para dudas y consultas',
      'Optimización de velocidad trimestral'
    ],
    isFeatured: true
  },
  {
    name: 'Plan Socio',
    price: { monthly: '150', annual: '1500' },
    description: 'Nos convertimos en una extensión de tu equipo, enfocados en el crecimiento.',
    features: [
      'Todo lo del Plan Pro',
      'Horas de desarrollo para nuevas funcionalidades',
      'Consultoría y mejoras de diseño y UX',
      'Reportes y monitoreo SEO proactivo'
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
    <section id="servicios" className="services-section">
      <div className="services-container">
        <h2 className="section-title">Una Solución para Cada Etapa de Crecimiento.</h2>
        <p className="section-subtitle">
          Cada negocio está en una etapa diferente. Por eso, no ofrecemos soluciones genéricas. Descubrí cuál es la herramienta digital correcta para tu momento.
        </p>

        <div className="services-cards-grid">
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
            <p className="maintenance-subtitle">El lanzamiento es solo el comienzo. Con nuestros planes de asociación, nos aseguramos de que tu web se mantenga rápida, segura y siga creciendo junto a tu negocio.</p>
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