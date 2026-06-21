import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  // Lógica interactiva nativa para ocultar/mostrar el Navbar según el scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      
      // Se oculta si scrolleas hacia abajo y pasas de los 80px. Se muestra al scrollear hacia arriba.
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 80);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav 
      style={{ fontFamily: "var(--font-darker, 'Darker Grotesque', sans-serif)" }}
      className={`fixed top-0 left-0 w-full z-50 bg-[#13263F]/95 backdrop-blur-md border-b border-[#F4F1ED]/10 px-4 md:px-8 py-3 transform transition-transform duration-300 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* BRANDING / LOGO OFICIAL (Forzado a Blanco Puro) */}
        <div className="flex items-center space-x-3">
          <img 
            src="/HMA.png" 
            alt="Human Moovearts Logo" 
            className="h-10 w-auto object-contain md:h-12 brightness-0 invert"
          />

        </div>

        {/* DESKTOP NAVIGATION (Oculta en celular) */}
        <ul className="hidden md:flex items-center space-x-8">
          <li>
            <a href="#inicio" className="text-[#F4F1ED] hover:text-[#E88973] text-base font-medium tracking-wide transition-colors">
              {t('navegacion.0.etiqueta')}
            </a>
          </li>
          <li>
            <a href="#quienes-somos" className="text-[#F4F1ED] hover:text-[#E88973] text-base font-medium tracking-wide transition-colors">
              {t('navegacion.1.etiqueta')}
            </a>
          </li>
          <li>
            <a href="#inversion" className="text-[#F4F1ED] hover:text-[#E88973] text-base font-medium tracking-wide transition-colors">
              {t('navegacion.2.etiqueta')}
            </a>
          </li>
          <li>
            <a href="#perfil-egresado" className="text-[#F4F1ED] hover:text-[#E88973] text-base font-medium tracking-wide transition-colors">
              {t('navegacion.3.etiqueta')}
            </a>
          </li>
          <li>
            <a href="#contacto" className="text-[#F4F1ED] hover:text-[#E88973] text-base font-medium tracking-wide transition-colors">
              {t('navegacion.4.etiqueta')}
            </a>
          </li>
        </ul>

        {/* SECCIÓN DE IDIOMA */}
        <div className="flex items-center space-x-2 bg-[#1F3A5F] p-1 rounded-full border border-[#F4F1ED]/20">
          <button
            onClick={() => changeLanguage('es')}
            className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 focus:outline-none ${
              i18n.language === 'es' 
                ? 'bg-[#E88973] text-white shadow-md scale-105' 
                : 'opacity-50 hover:opacity-80'
            }`}
            title="Español"
          >
            <span className="text-base">🇲🇽</span>
          </button>
          
          <button
            onClick={() => changeLanguage('en')}
            className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 focus:outline-none ${
              i18n.language === 'en' 
                ? 'bg-[#E88973] text-white shadow-md scale-105' 
                : 'opacity-50 hover:opacity-80'
            }`}
            title="English"
          >
            <span className="text-base">🇺🇸</span>
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;