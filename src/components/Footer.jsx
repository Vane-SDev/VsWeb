import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="main-footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} vswebdesign.online. Todos los derechos reservados.</p>
                <div className="social-links">
                    {/* Aquí irán tus redes */}
                    <a href="#">LinkedIn</a>
                    <a href="#">GitHub</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;