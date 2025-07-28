import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaGithub, FaInstagram, FaEnvelope } from 'react-icons/fa';
import logoVS from '../assets/LogoNegro.svg';

const socialLinks = [
  {
    label: 'LinkedIn',
    icon: <FaLinkedin />,
    href: 'https://www.linkedin.com/in/vanesa-soria-webdev/', 
  },
  {
    label: 'GitHub',
    icon: <FaGithub />,
    href: 'https://github.com/', 
  },
  // {
  //   label: 'Instagram',
  //   icon: <FaInstagram />,
  //   href: 'https://www.instagram.com/', 
  // },
  {
    label: 'Email',
    icon: <FaEnvelope />,
    href: 'mailto:info@vswebdesign.online',
  },
];

const Footer = ({ onLogoClick }) => {
  const handleLogoClick = (e) => {
    e.preventDefault();
    if (onLogoClick) {
      onLogoClick('Hero'); // Llama a la función del padre para ir al Hero
    }
  };
  return (
    <footer className="main-footer glass-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <a href="#Hero" onClick={handleLogoClick} aria-label="Volver al inicio">
            <img src={logoVS} alt="VS Web Design Logo" className="footer-logo" />
          </a>
          <span className="footer-brand-text">vswebdesign.online</span>
        </div>

        <div className="footer-links">
          <Link to="/sobre-nosotros" className="footer-link">Sobre Nosotros</Link>
          <Link to="/politica-de-privacidad" className="footer-link">Política de Privacidad</Link>
          <Link to="/terminos-y-condiciones" className="footer-link">Términos y Condiciones</Link>
        </div>

        <div className="footer-social">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="footer-social-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
            >
              {link.icon}
            </a>
          ))}
        </div>
        <div className="footer-copy">
          <p>&copy; {new Date().getFullYear()} vswebdesign.online. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;