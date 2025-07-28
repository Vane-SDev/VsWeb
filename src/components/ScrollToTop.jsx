import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import lenis from '../Lenis'; // Asegúrate de que la ruta sea correcta

const ScrollToTop = () => {
    // Extraemos el pathname de la ubicación actual
    const { pathname } = useLocation();

    // Este efecto se ejecutará cada vez que el 'pathname' cambie
    useEffect(() => {
        // Usamos lenis.scrollTo para un reseteo suave,
        // pero podrías usar window.scrollTo(0, 0) para uno instantáneo.
        lenis.scrollTo(0, { immediate: true }); // 'immediate: true' hace el scroll instantáneo
    }, [pathname]);

    return null; // Este componente no renderiza nada en la pantalla
};

export default ScrollToTop;