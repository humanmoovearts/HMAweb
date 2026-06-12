import React from 'react';

export default function Navbar() {
  return (
    <nav className="absolute top-0 left-0 w-full z-50 bg-transparent px-6 py-6 md:px-12">
      <div className="max-w-7xl mx-auto hidden md:flex items-center justify-between">
        
        {/* LOGO */}
        <div className="flex items-center">
          <img 
            src="/path-to-your-logo.png" 
            alt="Human Mooveart Logo" 
            className="h-10 w-auto object-contain brightness-0 invert" 
          />
        </div>

        {/* MENÚ DE NAVEGACIÓN */}
        <ul className="flex items-center space-x-8 lg:space-x-12 text-white font-medium text-xs tracking-widest">
          <li>
            <a href="#inicio" className="hover:text-gray-300 transition-colors uppercase">
              Inicio
            </a>
          </li>
          <li>
            <a href="#quienes-somos" className="hover:text-gray-300 transition-colors uppercase">
              Quienes Somos
            </a>
          </li>
          <li>
            <a href="#inversion" className="hover:text-gray-300 transition-colors uppercase">
              Inversión
            </a>
          </li>
          <li className="text-center max-w-[120px] leading-tight">
            <a href="#perfil-egresado" className="hover:text-gray-300 transition-colors uppercase block">
              Perfil del Egresado
            </a>
          </li>
          <li>
            <a href="#contacto" className="hover:text-gray-300 transition-colors uppercase">
              Contacto
            </a>
          </li>
        </ul>

        {/* SELECTOR DE IDIOMA */}
        <div className="flex items-center space-x-2 text-white font-medium text-xs tracking-widest uppercase">
          <span>Idioma</span>
          <img 
            src="https://flagcdn.com/w20/gb.png" 
            alt="English" 
            className="w-5 h-auto rounded-sm object-cover"
          />
        </div>

      </div>
    </nav>
  );
}