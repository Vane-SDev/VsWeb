import React from 'react';
import './Footer.css';
import { FaLinkedin, FaGithub, FaInstagram, FaEnvelope } from 'react-icons/fa';
import logoVS from '../assets/LogoBlanco.svg';

const socialLinks = [
  {
    label: 'LinkedIn',
    icon: <FaLinkedin />,
    href: 'https://www.linkedin.com/', // Cambia por tu perfil real
  },
  {
    label: 'GitHub',
    icon: <FaGithub />,
    href: 'https://github.com/', // Cambia por tu perfil real
  },
  {
    label: 'Instagram',
    icon: <FaInstagram />,
    href: 'https://www.instagram.com/', // Cambia por tu perfil real
  },
  {
    label: 'Email',
    icon: <FaEnvelope />,
    href: 'mailto:info@vswebdesign.online',
  },
];

const Footer = () => {
  return (
    <footer className="main-footer glass-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <img src={logoVS} alt="VS Web Design Logo" className="footer-logo" />
          <span className="footer-brand-text">vswebdesign.online</span>
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