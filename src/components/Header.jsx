// src/components/Header.jsx - VERSIÓN FINAL CON EFECTO ON-SCROLL

import React, { useState, useEffect } from 'react'; // Importamos useEffect
import './Header.css';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import logo from '../assets/LogoNegro.svg';

const navLinks = [
    { label: 'Servicios', href: '#servicios' },
    { label: 'Proyectos', href: '#proyectos' },
    { label: 'Testimonios', href: '#testimonios' }, // Añadí el link que faltaba
    { label: 'Contacto', href: '#contacto' },
];

const Header = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    // --- NUEVO: 1. Creamos un estado para saber si el usuario ha hecho scroll ---
    const [isScrolled, setIsScrolled] = useState(false);

    // --- NUEVO: 2. Este efecto escucha el evento de scroll ---
    useEffect(() => {
        const handleScroll = () => {
            // Si el scroll es mayor a 50px, ponemos isScrolled en true. Si no, en false.
            setIsScrolled(window.scrollY > 50);
        };

        // Agregamos el "oyente" de eventos
        window.addEventListener('scroll', handleScroll);

        // Limpiamos el "oyente" cuando el componente se va (buena práctica)
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // El array vacío [] asegura que el efecto se configure solo una vez

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    // --- NUEVO: 3. Añadimos la clase 'scrolled' dinámicamente al header ---
    return (
        <header className={`main-header ${isScrolled ? 'scrolled' : ''}`}>
            <nav className="main-nav">
                <div className="logo-container">
                    <img src={logo} className="logo-text" alt="VS Web Design Logo" />
                </div>
                <ul className="nav-links">
                    {navLinks.map(link => (
                        <li key={link.href}><a href={link.href}>{link.label}</a></li>
                    ))}
                </ul>
                <div className="hamburger-menu">
                    <button
                        className={`hamburger-icon${drawerOpen ? ' open' : ''}`}
                        aria-label={drawerOpen ? 'Cerrar menú' : 'Abrir menú'}
                        // AJUSTE: El onClick debe recibir una función para abrir.
                        onClick={toggleDrawer(true)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    <Drawer
                        anchor="right"
                        open={drawerOpen}
                        onClose={toggleDrawer(false)}
                        slotProps={{
                            paper: {
                                sx: {
                                    background: 'rgba(30, 30, 40, 0.55)',
                                    backdropFilter: 'blur(18px) saturate(160%)',
                                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                                    borderRadius: '18px 0 0 18px',
                                    border: '1px solid rgba(255,255,255,0.12)',
                                    color: '#fafafa',
                                    marginTop: '3.6rem', // Esto podría ser un problema en algunos móviles, a revisar si es necesario
                                }
                            }
                        }}
                    >
                        <List sx={{ width: 220 }}>
                            {navLinks.map(link => (
                                <ListItem key={link.href} disablePadding>
                                    <ListItemButton component="a" href={link.href} onClick={toggleDrawer(false)}>
                                        <ListItemText primary={link.label} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Drawer>
                </div>
            </nav>
        </header>
    );
}

export default Header;