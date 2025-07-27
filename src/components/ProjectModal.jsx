// src/components/ProjectModal.jsx

import React, { useEffect, useRef, useState } from 'react';
import './ProjectModal.css';
import { gsap } from 'gsap';
import { Launch as LaunchIcon } from '@mui/icons-material';
import lenis from '../Lenis'; // <-- IMPORTANTE: Importamos Lenis

const ProjectModal = ({ project, open, onClose }) => {
    const modalRef = useRef(null);
    const overlayRef = useRef(null);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        if (open) {
            setIsClosing(false);
            lenis.stop(); // <-- LA SOLUCIÓN: Detenemos el scroll de Lenis
            gsap.to(overlayRef.current, { opacity: 1, duration: 0.4 });
            gsap.fromTo(modalRef.current,
                { opacity: 0, scale: 0.95, y: 30 },
                { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: 0.1 }
            );
        }

        // Función de limpieza para cuando el componente se desmonta
        return () => {
            lenis.start();
        };
    }, [open]);

    const handleClose = () => {
        if (isClosing) return;
        setIsClosing(true);
        lenis.start(); // <-- LA SOLUCIÓN: Reanudamos el scroll de Lenis
        gsap.to(modalRef.current, {
            opacity: 0, scale: 0.95, y: 30, duration: 0.4, ease: 'power3.in',
            onComplete: () => {
                onClose();
                setIsClosing(false);
            }
        });
        gsap.to(overlayRef.current, { opacity: 0, duration: 0.5, delay: 0.1 });
    };

    if (!project) return null;

    return (
        <div className="modal-overlay" ref={overlayRef} onClick={handleClose}>
            <div className="modal-content" ref={modalRef} onClick={(e) => e.stopPropagation()}>

                <button className="modal-close-btn animated" onClick={handleClose} aria-label="Cerrar modal">
                    <span></span>
                    <span></span>
                </button>

                <div className="modal-details-section">
                    <h2 className="modal-project-name">{project.title}</h2>

                    <div className="modal-info-block">
                        <h4>🎯 Desafío</h4>
                        <p>{project.challenge}</p>
                    </div>
                    <div className="modal-info-block">
                        <h4>✨ Solución</h4>
                        <p>{project.solution}</p>
                    </div>

                    <div className="modal-footer">
                        <div className="modal-tags">
                            {project.tags.map(tag => <span className="tag-innovative" key={tag}>{tag}</span>)}
                        </div>
                        {project.url && project.url !== '#' && (
                            <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="modal-visit-btn"
                            >
                                Visitar Sitio <LaunchIcon sx={{ fontSize: '1rem', marginLeft: '0.5rem' }} />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectModal;