import React from 'react';
import { useTranslation } from 'react-i18next';

export default function ContactoFooter() {
  const { t, i18n } = useTranslation();

  const isEnglish = i18n.language === 'en';
  const labelContacto = isEnglish ? 'Contact' : 'Contacto';

  // URLs oficiales desde el JSON
  const instagramUrl = t('contacto.redes_sociales.0.url');
  const tiktokUrl = t('contacto.redes_sociales.1.url');
  const youtubeUrl = t('contacto.redes_sociales.2.url');
  const emailUrl = t('contacto.redes_sociales.3.url');

  return (
    <footer 
      style={{ fontFamily: "var(--font-darker, 'Darker Grotesque', sans-serif)" }}
      className="w-full bg-[#C46A4A] text-[#F4F1ED] overflow-hidden flex flex-col"
    >
      {/* 📸 FOTO PANORÁMICA SUPERIOR */}
      <div className="w-full h-[25vh] min-h-[150px] md:h-[35vh] overflow-hidden relative">
        <div className="absolute inset-0 bg-[#13263F]/10 pointer-events-none" />
        <img 
          src="/footer_foto.JPG" 
          alt="Human Moovearts Colectivo" 
          className="w-full h-full object-cover object-bottom grayscale contrast-115"
          onError={(e) => {
            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' h='100%25' viewBox='0 0 24 24' fill='none' stroke='%23F4F1ED' stroke-width='0.2' opacity='0.2'%3E%3Crect width='24' height='24'/%3E%3Cpath d='M1 12h22M12 1v22'/%3E%3C/svg%3E";
          }}
        />
      </div>

      {/* 🧱 CONTENEDOR DE TEXTO Y REDES SOCIALES */}
      <div className="px-6 py-14 md:py-18 flex flex-col items-center justify-center text-center max-w-5xl mx-auto w-full select-none">
        
        {/* TEXTO MANIFIESTO REAL */}
        <p className="text-sm md:text-base lg:text-lg leading-relaxed font-light text-[#F4F1ED]/95 max-w-4xl mb-10 md:mb-12 tracking-wide">
          {t('contacto.manifiesto_invitacion')}
        </p>

        {/* ETIQUETA DE CONTACTO */}
        <h3 className="text-xs font-bold tracking-[0.3em] uppercase text-[#F4F1ED]/80 mb-6 font-sans">
          {labelContacto}
        </h3>

        {/* 📱 ICONOS DE REDES SOCIALES REALES EXCLUSIVAS */}
        <div className="flex items-center justify-center space-x-8 md:space-x-10">
          
          {/* INSTAGRAM */}
          <a 
            href={instagramUrl} 
            target="_blank" 
            rel="noreferrer" 
            className="text-[#F4F1ED] hover:text-[#13263F] hover:scale-110 transition-all duration-300 focus:outline-none"
            aria-label="Instagram"
          >
            <svg className="w-6 h-6 stroke-current fill-none" strokeWidth="1.75" viewBox="0 0 24 24">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>

          {/* TIKTOK (SVG Lineal Oficial Corregido) */}
          <a 
            href={tiktokUrl} 
            target="_blank" 
            rel="noreferrer" 
            className="text-[#F4F1ED] hover:text-[#13263F] hover:scale-110 transition-all duration-300 focus:outline-none"
            aria-label="TikTok"
          >
            <svg className="w-6 h-6 stroke-current fill-none" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
            </svg>
          </a>

          {/* YOUTUBE */}
          <a 
            href={youtubeUrl} 
            target="_blank" 
            rel="noreferrer" 
            className="text-[#F4F1ED] hover:text-[#13263F] hover:scale-110 transition-all duration-300 focus:outline-none"
            aria-label="YouTube"
          >
            <svg className="w-6 h-6 stroke-current fill-none" strokeWidth="1.75" viewBox="0 0 24 24">
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25a29 29 0 0 0-.46-5.33z"></path>
              <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
            </svg>
          </a>

          {/* EMAIL */}
          <a 
            href={emailUrl} 
            className="text-[#F4F1ED] hover:text-[#13263F] hover:scale-110 transition-all duration-300 focus:outline-none"
            aria-label="Email"
          >
            <svg className="w-6 h-6 stroke-current fill-none" strokeWidth="1.75" viewBox="0 0 24 24">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </a>

        </div>
      </div>
    </footer>
  );
}