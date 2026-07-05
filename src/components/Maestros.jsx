import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';

export default function MaestrosSection() {
  const { t } = useTranslation();
  const scrollContainerRef = useRef(null);


  const maestrosData = t('maestros', { returnObjects: true }) || [];

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const getFotoUrl = (name) => {
    if (!name) return '';
    const nameClean = name.trim();
    const tieneAcento = /[áéíóúÁÉÍÓÚ]/.test(nameClean);

    if (tieneAcento) {
      let transformado = nameClean.toLowerCase();
      transformado = transformado
        .replace(/[á]/g, 'a')
        .replace(/[é]/g, 'e')
        .replace(/[í]/g, 'i')
        .replace(/[ó]/g, 'o')
        .replace(/[ú]/g, 'u')
        .replace(/[^a-z0-9\s-_]/g, '');
      const archivoLimpio = transformado.replace(/[\s-]+/g, '_');
      return `/maestros/${archivoLimpio}.webp`;
    }

    return encodeURI(`/maestros/${nameClean}.webp`);
  };

  return (
    <section 
      id="maestros" 
      data-lenis-prevent
      
      className="relative w-full min-h-screen flex flex-col justify-center items-center bg-[#F4F1ED] py-8 select-none font-['Darker_Grotesque',_sans-serif] overflow-hidden"
    >
     
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#8B7AA8]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#E88973]/10 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-7xl flex flex-col relative z-10">
        
       
        <div className="w-full flex justify-end px-6 md:px-12 lg:px-20 mb-6">
          <h2 className="text-[#13263F] text-4xl md:text-5xl font-black tracking-wide uppercase font-['Helvetica',_sans-serif]">
            {t('diplomado.nombre') === "Human Moove Arts" ? "Nuestros Maestros" : t('diplomado.nombre')}
          </h2>
        </div>

        {/* Carrusel */}
        <div className="relative w-full flex items-center px-2 md:px-12 lg:px-16">
          
          <button 
            onClick={() => handleScroll('left')}
            className="absolute left-4 md:left-6 z-20 w-12 h-12 rounded-full bg-[#13263F]/10 backdrop-blur-md border border-[#13263F]/20 flex items-center justify-center text-[#13263F] active:scale-95 hover:bg-[#13263F]/20 transition-all shadow-md focus:outline-none"
            aria-label="Anterior"
          >
            <svg className="w-6 h-6 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div 
            ref={scrollContainerRef}
            className="w-full flex items-stretch overflow-x-auto overflow-y-hidden space-x-6 snap-x snap-mandatory scrollbar-none px-12 py-2"
          >
            <div className="flex items-stretch space-x-6">
              {maestrosData.map((maestro, index) => {
                return (
                  <div 
                    key={index} 
                    className="snap-center shrink-0 relative w-[80vw] sm:w-[340px] h-[460px] rounded-[40px] p-6 flex flex-col items-center justify-start text-[#F4F1ED] bg-[#13263F] border border-white/5 shadow-2xl transition-all duration-500 group"
                  >
                    <div className="absolute -top-16 -right-16 w-44 h-44 bg-[#E88973]/10 rounded-full blur-2xl pointer-events-none transition-transform duration-700 group-hover:translate-x-3" />
                    
                    {/* Contenedor Foto */}
                    <div className="relative w-20 h-20 mt-1 flex items-center justify-center shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#8B7AA8]/30 to-[#E88973]/20 rounded-full blur-md opacity-80 group-hover:scale-110 transition-transform duration-500" />
                      <div className="relative w-full h-full rounded-full overflow-hidden border border-white/10 bg-[#13263F]/50 shadow-inner">
                        <img 
                          src={getFotoUrl(maestro.nombre)} 
                          alt={maestro.nombre} 
                          className="w-full h-full object-cover contrast-115 group-hover:scale-105 transition-all duration-700 ease-out"
                          onError={(e) => {
                            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 24 24' fill='none' stroke='%23F4F1ED' stroke-width='1'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E";
                          }}
                        />
                      </div>
                    </div>

                    {/* Nombres e Info */}
                    <div className="text-center w-full flex flex-col justify-start pt-4 shrink-0">
                      <h4 className="text-lg font-bold tracking-wide text-[#F4F1ED] font-['Helvetica',_sans-serif] line-clamp-1">
                        {maestro.nombre}
                      </h4>
                      <p className="text-xs uppercase tracking-[0.2em] text-[#E88973] font-bold mt-0.5">
                        {maestro.pais}
                      </p>
                    </div>
                    
                    {/* Descripción de Perfil */}
                    <div 
                      data-lenis-prevent
                      className="w-full mt-3 flex-grow overflow-y-auto scrollbar-none text-center pr-1 max-h-[220px]"
                    >
                      <p className="text-sm leading-relaxed text-[#F4F1ED]/80 font-light tracking-wide group-hover:text-[#F4F1ED] transition-colors duration-300">
                        {maestro.perfil}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

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