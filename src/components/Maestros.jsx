import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';

export default function MaestrosSection() {
  const { t, i18n } = useTranslation();
  const scrollContainerRef = useRef(null);

  // Índices para recorrer los 22 docentes reales del archivo translation.json
  const totalMaestros = Array.from({ length: 22 }, (_, i) => i);

  // Traducción dinámica del título principal
  const isEnglish = i18n.language === 'en';
  const seccionTitulo = isEnglish ? 'Our Faculty' : 'Nuestros Maestros';

  // Navegación fluida por flechas laterales
  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Mapeador exacto basado en la misma lógica limpia que usamos para los testimonios
  // Mapeador dinámico y corregido para la carpeta de maestros (.jpg)
const getFotoUrl = (name) => {
    if (!name) return '';
    
    const nameClean = name.trim();

    // Expresión regular para detectar si el nombre del JSON tiene alguna vocal con acento
    const tieneAcento = /[áéíóúÁÉÍÓÚ]/.test(nameClean);

    if (tieneAcento) {
      // SOLO SI TIENE ACENTO: Lo transformamos al formato "amigable" (minúsculas y guiones bajos)
      let transformado = nameClean.toLowerCase();
      
      transformado = transformado.replace(/[á]/g, 'a');
      transformado = transformado.replace(/[é]/g, 'e');
      transformado = transformado.replace(/[í]/g, 'i');
      transformado = transformado.replace(/[ó]/g, 'o');
      transformado = transformado.replace(/[ú]/g, 'u');
      
      // Removemos puntos de títulos académicos y caracteres raros
      transformado = transformado.replace(/[^a-z0-9\s-_]/g, '');
      
      // Cambiamos los espacios por guiones bajos
      const archivoLimpio = transformado.replace(/[\s-]+/g, '_');
      
      return `/maestros/${archivoLimpio}.webp`;
    }

    // SI NO TIENE ACENTO: Mantiene el archivo original con sus mayúsculas y espacios nativos
    return encodeURI(`/maestros/${nameClean}.webp`);
  };

  return (
    <section 
      id="maestros" 
      className="relative w-full min-h-screen flex flex-col justify-center items-center bg-[#F4F1ED] py-16 select-none font-['Darker_Grotesque',_sans-serif]"
    >
      {/* AURAS EN TONOS SALVIA Y VIOLETA SUTILES SOBRE EL FONDO CLARO */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#8B7AA8]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#E88973]/10 blur-[120px] pointer-events-none" />

      {/* CONTENEDOR INTERNO */}
      <div className="w-full max-w-7xl flex flex-col relative z-10 overflow-hidden">
        
        {/* TÍTULO DE LA SECCIÓN (Color Azul Profundo corporativo) */}
        <div className="w-full flex justify-end px-6 md:px-12 lg:px-20 mb-8">
          <h2 className="text-[#13263F] text-4xl md:text-5xl font-black tracking-wide uppercase font-['Helvetica',_sans-serif]">
            {seccionTitulo}
          </h2>
        </div>

        {/* CONTENEDOR INTERMEDIO CON FLECHAS FLOTANTES */}
        <div className="relative w-full flex items-center overflow-hidden px-2 md:px-12 lg:px-16">
          
          {/* BOTÓN IZQUIERDO FLOTANTE */}
          <button 
            onClick={() => handleScroll('left')}
            className="absolute left-4 md:left-6 z-20 w-12 h-12 rounded-full bg-[#13263F]/10 backdrop-blur-md border border-[#13263F]/20 flex items-center justify-center text-[#13263F] active:scale-95 hover:bg-[#13263F]/20 transition-all shadow-md focus:outline-none"
            aria-label="Anterior"
          >
            <svg className="w-6 h-6 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* CARRUSEL HORIZONTAL MEJORADO */}
          <div 
            ref={scrollContainerRef}
            className="w-full flex items-stretch overflow-x-auto overflow-y-hidden space-x-6 snap-x snap-mandatory scrollbar-none px-12 py-6"
          >
            {totalMaestros.map((index) => {
              const maestroNombre = t(`maestros.${index}.nombre`);
              const maestroPais = t(`maestros.${index}.pais`);
              const maestroPerfil = t(`maestros.${index}.perfil`);

              return (
                <div 
                  key={index} 
                  className="snap-center shrink-0 relative w-[80vw] sm:w-[340px] min-h-[520px] md:min-h-[560px] rounded-[40px] p-8 flex flex-col items-center justify-start text-[#F4F1ED] bg-[#13263F] border border-white/5 shadow-2xl transition-all duration-500 group"
                >
                  {/* Detalle estético interno en hover */}
                  <div className="absolute -top-16 -right-16 w-44 h-44 bg-[#E88973]/10 rounded-full blur-2xl pointer-events-none transition-transform duration-700 group-hover:translate-x-3" />
                  
                  {/* Contenedor de Foto de Perfil Circular */}
                  <div className="relative w-24 h-24 mt-2 flex items-center justify-center shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#8B7AA8]/30 to-[#E88973]/20 rounded-full blur-md opacity-80 group-hover:scale-110 transition-transform duration-500" />
                    <div className="relative w-full h-full rounded-full overflow-hidden border border-white/10 bg-[#13263F]/50 shadow-inner">
                      <img 
                        src={getFotoUrl(maestroNombre)} 
                        alt={maestroNombre} 
                        className="w-full h-full object-cover  contrast-115 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                        onError={(e) => {
                          e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' h='100' viewBox='0 0 24 24' fill='none' stroke='%23F4F1ED' stroke-width='1'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E";
                        }}
                      />
                    </div>
                  </div>

                  {/* Textos y Encabezado de la Tarjeta */}
                  <div className="text-center w-full flex flex-col justify-start pt-5 shrink-0">
                    <h4 className="text-xl font-bold tracking-wide text-[#F4F1ED] font-['Helvetica',_sans-serif]">
                      {maestroNombre}
                    </h4>
                    <p className="text-xs uppercase tracking-[0.2em] text-[#E88973] font-bold mt-1">
                      {maestroPais}
                    </p>
                  </div>
                  
                  {/* CONTENEDOR DE LA SEMBLANZA SIN RESTRICCIONES DE CLAMP Y CON SCROLL INVISIBLE */}
                  <div className="w-full mt-4 flex-grow overflow-y-auto scrollbar-none text-center pr-1 max-h-[260px]">
                    <p className="text-sm md:text-base leading-relaxed text-[#F4F1ED]/80 font-light tracking-wide group-hover:text-[#F4F1ED] transition-colors duration-300">
                      {maestroPerfil}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* BOTÓN DERECHO FLOTANTE */}
          <button 
            onClick={() => handleScroll('right')}
            className="absolute right-4 md:right-6 z-20 w-12 h-12 rounded-full bg-[#13263F]/10 backdrop-blur-md border border-[#13263F]/20 flex items-center justify-center text-[#13263F] active:scale-95 hover:bg-[#13263F]/20 transition-all shadow-md focus:outline-none"
            aria-label="Siguiente"
          >
            <svg className="w-6 h-6 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

        </div>

      </div>
    </section>
  );
}