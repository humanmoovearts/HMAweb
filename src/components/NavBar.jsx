import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Diccionario local para la navegación, manteniendo el componente independiente
const localNav = {
  es: [
    { etiqueta: "Inicio", href: "#inicio" },
    { etiqueta: "Quiénes Somos", href: "#quienes-somos" },
    { etiqueta: "Inversión", href: "#inversion" },
    { etiqueta: "Perfil de Egresado", href: "#perfil-egresado" },
    { etiqueta: "Contacto", href: "#contacto" }
  ],
  en: [
    { etiqueta: "Home", href: "#heroRef" },
    { etiqueta: "About Us", href: "#quienes-somos" },
    { etiqueta: "Investment", href: "#inversion" },
    { etiqueta: "Graduate Profile", href: "#perfil-egresado" },
    { etiqueta: "Contact", href: "#contacto" }
  ]
};

const Navbar = () => {
  const { i18n } = useTranslation();
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      
      // Controla si estamos en el tope absoluto de la página
      setIsAtTop(currentScrollPos < 20);

      // Oculta si scrolleas hacia abajo y pasa de los 80px. Muestra al subir.
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 80);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  // Detecta el idioma activo (cae en español por defecto)
  const currentLang = localNav[i18n.language] ? i18n.language : 'es';
  const links = localNav[currentLang];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 font-darker px-4 md:px-8 py-4 transition-all duration-500 transform ${
        visible ? 'translate-y-0' : '-translate-y-full'
      } ${
        isAtTop 
          ? 'bg-transparent border-b border-transparent' 
          : 'bg-white/[0.02] backdrop-blur-md border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.05)]'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* BRANDING / LOGO OFICIAL (Flotando suavemente) */}
        <div className="flex items-center space-x-3 transition-opacity duration-300 hover:opacity-80">
          <a href="#inicio">
            <img 
              src="/HMA.png" 
              alt="Human Moovearts Logo" 
              className="h-10 w-auto object-contain md:h-12 brightness-0 invert"
            />
          </a>
        </div>

        {/* NAVIGATION LINKS */}
        <ul className="hidden md:flex items-center space-x-8">
          {links.map((link, index) => (
            <li key={index}>
              <a 
                href={link.href} 
                className="text-hueso/80 hover:text-coral text-base font-medium tracking-wide transition-colors duration-300"
              >
                {link.etiqueta}
              </a>
            </li>
          ))}
        </ul>

        {/* SECCIÓN DE IDIOMA (Cápsula Frosted Glass translúcida) */}
        <div className="flex items-center space-x-1.5 bg-white/[0.05] p-1 rounded-full border border-white/10 backdrop-blur-sm">
          <button
            onClick={() => changeLanguage('es')}
            className={`flex items-center justify-center w-7 h-7 rounded-full transition-all duration-300 focus:outline-none ${
              i18n.language === 'es' 
                ? 'bg-coral text-white shadow-md scale-105' 
                : 'opacity-40 hover:opacity-90'
            }`}
            title="Español"
          >
            <span className="text-sm">🇲🇽</span>
          </button>
          
          <button
            onClick={() => changeLanguage('en')}
            className={`flex items-center justify-center w-7 h-7 rounded-full transition-all duration-300 focus:outline-none ${
              i18n.language === 'en' 
                ? 'bg-coral text-white shadow-md scale-105' 
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