import React from 'react';
import { useTranslation } from 'react-i18next';

const BotonContacto = () => {
  const { t } = useTranslation();

  // 1. CONFIGURACIÓN: Coloca el número real de tu cliente (Lada + número, sin espacios ni el signo +)
  const telefonoWhatsApp = "522228635691"; 
  
  // 2. TEXTO: El mensaje predeterminado que le llegará a tu cliente cuando le escriban
  const mensajePredeterminado = "¡Hola! 😊 me podrías dar más información del Diplomado de bienestar integral con avaluo de la Benemérita Universidad Autónoma de Puebla.";

  // 3. ENLACE: Codificación segura para que los espacios no rompan la URL
  const whatsappUrl = `https://wa.me/${telefonoWhatsApp}?text=${encodeURIComponent(mensajePredeterminado)}`; 
  
  // Apunta directamente al archivo que descargaste en la carpeta public[cite: 6]
  const logoName = "whatsapp.png";

  return (
    <div className="fixed bottom-6 right-6 z-[9999] pointer-events-auto">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-xl transition-transform duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 group relative isolate"
        aria-label="Contactar por WhatsApp"
      >
        {/* Tooltip Editorial al hacer Hover */}
        <span 
          style={{ fontFamily: "var(--font-darker, 'Darker Grotesque', sans-serif)" }}
          className="absolute right-18 bg-[#13263F] text-[#F4F1ED] text-xs font-semibold tracking-wider px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 shadow-md whitespace-nowrap uppercase"
        >
          {t('contacto.whatsapp_tooltip', '¿Dudas? Escríbenos')}
        </span>

        {/* Colocamos la imagen dentro del contenedor con rounded-full y object-cover[cite: 6]
          para obligar al navegador a recortar perfectamente cualquier borde raro[cite: 6]
        */}
        <img 
          src={`/${logoName}`}
          alt="WhatsApp"
          className="h-full w-full object-cover rounded-full select-none pointer-events-none"
          onError={(e) => {
            // Por si acaso el navegador llega a perder la ruta del archivo, no se rompa la app[cite: 6]
            e.target.style.display = 'none';
          }}
        />
      </a>
    </div>
  );
};

export default BotonContacto;