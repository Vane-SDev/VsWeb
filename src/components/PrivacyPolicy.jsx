import React from 'react';
import './PageStyles.css';

const PrivacyPolicy = () => {
    return (
        <div className="static-page-container">
            <h1 className="static-page-title">Política de Privacidad</h1>
            <div className="static-page-content">
                <p><strong>Última actualización: 27 de Julio, 2025</strong></p>
                <p>En vswebdesign.online, la privacidad de nuestros visitantes es de extrema importancia. Este documento de política de privacidad describe los tipos de información personal que se reciben y recopilan y cómo se utilizan.</p>

                <h2>Información que Recopilamos</h2>
                <p>El único dato personal que solicitamos de forma activa es tu nombre a través de nuestro Asistente Virtual. Este dato se utiliza únicamente para personalizar la conversación en tiempo real y no se almacena en ninguna base de datos una vez que cierras la ventana del chat.</p>
                <p>Si decides contactarnos a través de WhatsApp o correo electrónico, utilizaremos tu número de teléfono o dirección de email para responder a tu consulta. Esta información no se utilizará para fines de marketing sin tu consentimiento explícito.</p>

                <h2>Analíticas Web</h2>
                <p>Utilizamos Google Analytics para recopilar información anónima sobre el uso del sitio, como las páginas visitadas y el tiempo de permanencia. Estos datos nos ayudan a mejorar la experiencia del usuario, pero no están vinculados a ninguna información de identificación personal.</p>

                <h2>Seguridad de los Datos</h2>
                <p>La seguridad de tu información es importante para nosotros, pero recuerda que ningún método de transmisión por Internet o de almacenamiento electrónico es 100% seguro. Si bien nos esforzamos por utilizar medios comercialmente aceptables para proteger tu información, no podemos garantizar su seguridad absoluta.</p>
            </div>
        </div>
    );
};

export default PrivacyPolicy;