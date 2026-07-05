import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [visible, setVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  
  const prevScrollPosRef = useRef(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const prevScrollPos = prevScrollPosRef.current;
      
      const atTop = currentScrollPos < 20;
      setIsAtTop(atTop);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      if (atTop) {
        setVisible(true);
      } else if (currentScrollPos > prevScrollPos) {
        setVisible(false); // Ocultar al bajar
      } else if (prevScrollPos > currentScrollPos) {
        setVisible(true); // Mostrar al subir
        timeoutRef.current = setTimeout(() => {
          setVisible(false);
        }, 2000);
      }

      prevScrollPosRef.current = currentScrollPos;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  // Claves para el mapeo. El cuarto elemento ahora apunta a la sección de contenido de los módulos
  const navKeys = ['inicio', 'quienes_somos', 'inversion', 'contenido', 'contacto'];
  const navAnchors = ['#inicio', '#quienes-somos', '#inversion', '#contenido', '#contacto'];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 font-darker px-4 md:px-8 py-3.5 transition-all duration-500 transform ${
        visible ? 'translate-y-0' : '-translate-y-full'
      } ${
        isAtTop 
          ? 'bg-transparent border-b border-transparent' 
          : 'bg-[#F4F1ED]/75 backdrop-blur-lg border-b border-[#13263F]/10 shadow-[0_4px_30px_rgba(20,38,63,0.08)]'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* BRANDING / LOGO OFICIAL (Cambia de blanco invertido a color real) */}
        <div className="flex items-center space-x-3 transition-opacity duration-300 hover:opacity-80">
          <a href="#inicio">
            <img 
              src="/HMA.png" 
              alt="Human Moovearts Logo" 
              className={`h-10 w-auto object-contain md:h-11 transition-all duration-500 ${
                isAtTop ? 'brightness-0 invert' : ''
              }`}
            />
          </a>
        </div>

        {/* NAVIGATION LINKS (Cambian de color Hueso a Azul Oscuro) */}
        <ul className="hidden md:flex items-center space-x-8">
          {navKeys.map((key, index) => (
            <li key={key}>
              <a 
                href={navAnchors[index]} 
                className={`text-base font-medium tracking-wide transition-colors duration-500 ${
                  isAtTop 
                    ? 'text-[#F4F1ED]/80 hover:text-[#E88973]' 
                    : 'text-[#13263F]/90 hover:text-[#C46A4A]'
                }`}
              >
                {/* Fallbacks nativos en base al cambio solicitado */}
                {t(`navegacion.${index}.etiqueta`, 
                  key === 'quienes_somos' ? 'Quiénes Somos' : 
                  key === 'contenido' ? 'Contenido Temático' : 
                  key.charAt(0).toUpperCase() + key.slice(1)
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* SECCIÓN DE IDIOMA */}
        <div className={`flex items-center space-x-1.5 p-1 rounded-full border transition-all duration-500 backdrop-blur-sm ${
          isAtTop ? 'bg-white/[0.08] border-white/10' : 'bg-[#13263F]/10 border-[#13263F]/20'
        }`}>
          <button
            onClick={() => changeLanguage('es')}
            className={`flex items-center justify-center w-7 h-7 rounded-full transition-all duration-300 focus:outline-none ${
              i18n.language?.startsWith('es') 
                ? (isAtTop ? 'bg-[#E88973] text-white' : 'bg-[#C46A4A] text-white') + ' shadow-md scale-105' 
                : 'opacity-40 hover:opacity-90'
            }`}
            title="Español"
          >
            <span className="text-sm">🇲🇽</span>
          </button>
          
          <button
            onClick={() => changeLanguage('en')}
            className={`flex items-center justify-center w-7 h-7 rounded-full transition-all duration-300 focus:outline-none ${
              i18n.language?.startsWith('en') 
                ? (isAtTop ? 'bg-[#E88973] text-white' : 'bg-[#C46A4A] text-white') + ' shadow-md scale-105' 
                : 'opacity-40 hover:opacity-90'
            }`}
            title="English"
          >
            <span className="text-sm">🇺🇸</span>
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;