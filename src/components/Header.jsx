import React, { useState, useEffect, useRef } from 'react';
import './Header.css';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import logo from '../assets/LogoNegro.svg';
import lenis from '../Lenis';

const Header = ({ servicesLinkId = 'servicios', onNavigate }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const inactivityTimerRef = useRef(null);

    useEffect(() => {
        const handleScroll = (e) => {
            setIsScrolled(e.scroll > 50);
        };
        lenis.on('scroll', handleScroll);
        return () => lenis.off('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const resetTimer = () => {
            clearTimeout(inactivityTimerRef.current);
            setIsVisible(true);
            inactivityTimerRef.current = setTimeout(() => {
                setIsVisible(false);
            }, 2000);
        };

        const activityEvents = ['mousemove', 'scroll', 'touchstart', 'keydown'];
        activityEvents.forEach(event => window.addEventListener(event, resetTimer));

        resetTimer();

        return () => {
            activityEvents.forEach(event => window.removeEventListener(event, resetTimer));
            clearTimeout(inactivityTimerRef.current);
        };
    }, []);

    const navLinks = [
        { label: 'Servicios', id: servicesLinkId },
        { label: 'Proyectos', id: 'proyectos' },
        { label: 'Testimonios', id: 'testimonios' },
        { label: 'Contacto', id: 'contacto' },
    ];

    const handleNavClick = (targetId) => {
        if (onNavigate) {
            onNavigate(targetId);
        }
        setDrawerOpen(false);
    };

    const handleLogoClick = (e) => {
        e.preventDefault();
        if (onNavigate) {
            onNavigate('Hero');
        }
    };

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    return (
        <header className={`main-header ${isScrolled ? 'scrolled' : ''} ${!isVisible ? 'hidden' : ''}`}>
            <nav className="main-nav">
                <div className="logo-container">
                    <a href="#Hero" onClick={handleLogoClick} aria-label="Volver al inicio">
                        <img src={logo} className="logo-text" alt="VS Web Design Logo" />
                    </a>
                </div>

                <ul className="nav-links">
                    {navLinks.map((link) => (
                        <li key={link.id}>
                            <a
                                href={`#${link.id}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavClick(link.id);
                                }}
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="hamburger-menu">
                    <button
                        className={`hamburger-icon${drawerOpen ? ' open' : ''}`}
                        aria-label={drawerOpen ? 'Cerrar menú' : 'Abrir menú'}
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
                                    marginTop: '3.6rem',
                                }
                            }
                        }}
                    >
                        <List sx={{ width: 220 }}>
                            {navLinks.map((link) => (
                                <ListItem key={link.id} disablePadding>
                                    <ListItemButton onClick={() => handleNavClick(link.id)}>
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
};

export default Header;