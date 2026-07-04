import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

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
  const [isAtTop, setIsAtTop] = useState(true);
  
  // Guardamos la última posición del scroll y el ID del timer en refs
  // Esto evita re-declaraciones basura y desfazamientos en el useEffect
  const prevScrollPosRef = useRef(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const prevScrollPos = prevScrollPosRef.current;
      
      // 1. Controlar si estamos en el tope absoluto de la página
      const atTop = currentScrollPos < 20;
      setIsAtTop(atTop);

      // Limpiamos CUALQUIER temporizador activo inmediatamente al detectar scroll
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // 2. Comportamiento base de dirección de scroll
      if (atTop) {
        // Si está arriba del todo, siempre es visible
        setVisible(true);
      } else if (currentScrollPos > prevScrollPos) {
        // Si scrollea hacia abajo, la ocultamos de inmediato
        setVisible(false);
      } else if (prevScrollPos > currentScrollPos) {
        // SI SCROLLEA HACIA ARRIBA: La hacemos visible...
        setVisible(true);

        // ...PERO programamos su desaparición por inactividad de scroll (ej. 2 segundos)
        timeoutRef.current = setTimeout(() => {
          setVisible(false);
        }, 2000); // Ajusta el tiempo en milisegundos aquí
      }

      // Actualizamos la referencia de la posición actual
      prevScrollPosRef.current = currentScrollPos;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []); // Efecto limpio sin dependencias reactivas que causen bucles intermitentes

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

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
        
        {/* BRANDING / LOGO OFICIAL */}
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

        {/* SECCIÓN DE IDIOMA */}
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