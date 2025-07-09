import React, { useState } from 'react';
import './Header.css';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import logo from '../assets/logoNegro.svg'; 


const navLinks = [
    { label: 'Servicios', href: '#servicios' },
    { label: 'Proyectos', href: '#proyectos' },
    { label: 'Contacto', href: '#contacto' },
];

const Header = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    return (
        <header className="main-header">
            <nav className="main-nav">
                <div className="logo-container">
                    <img src={logo} className="logo-text"  alt="VS Web Design Logo" />
                    {/* <a href="/" className="logo-text">VS Web Design</a> */}
                </div>
                <ul className="nav-links">
                    {navLinks.map(link => (
                        <li key={link.href}><a href={link.href}>{link.label}</a></li>
                    ))}
                </ul>
                {/* Botón hamburguesa solo visible en móviles */}
                <div className="hamburger-menu">
                    <button
                        className={`hamburger-icon${drawerOpen ? ' open' : ''}`}
                        aria-label={drawerOpen ? 'Cerrar menú' : 'Abrir menú'}
                        onClick={toggleDrawer(!drawerOpen)}
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