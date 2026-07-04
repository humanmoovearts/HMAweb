import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MaestrosSection() {
  const { t, i18n } = useTranslation();
  const scrollContainerRef = useRef(null);
  
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsContainerRef = useRef(null);

  const totalMaestros = Array.from({ length: 22 }, (_, i) => i);
  const isEnglish = i18n.language === 'en';
  const seccionTitulo = isEnglish ? 'Our Faculty' : 'Nuestros Maestros';

useEffect(() => {
    let ctx = gsap.context(() => {
      
      // Título: Entrada limpia y fluida
      gsap.fromTo(titleRef.current,
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 55%', // Calibrado al punto de atención ideal
            toggleActions: 'play reverse play reverse',
          }
        }
      );

      // Tarjetas: Brotan de inmediato al llegar al punto de scroll, sin retrasos
      if (cardsContainerRef.current) {
        const cards = cardsContainerRef.current.children;
        
        gsap.fromTo(cards,
          { 
            opacity: 0, 
            scale: 0.4, // Un poco más grande desde el inicio para que no tarde en escalar
            y: 30 
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.95, // Animación más rápida y enérgica
            delay: 0,       // ELIMINADO el tiempo muerto blanco
            stagger: 0.12,  // Cascada más pegadita y rítmica
            ease: 'back.out(1.6)', // Rebote elástico reactivo
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 55%', // Sincronizado exactamente igual
              toggleActions: 'play reverse play reverse',
            }
          }
        );
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

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
      transformado = transformado.replace(/[á]/g, 'a');
      transformado = transformado.replace(/[é]/g, 'e');
      transformado = transformado.replace(/[í]/g, 'i');
      transformado = transformado.replace(/[ó]/g, 'o');
      transformado = transformado.replace(/[ú]/g, 'u');
      transformado = transformado.replace(/[^a-z0-9\s-_]/g, '');
      const archivoLimpio = transformado.replace(/[\s-]+/g, '_');
      return `/maestros/${archivoLimpio}.webp`;
    }

    return encodeURI(`/maestros/${nameClean}.webp`);
  };

  return (
    <section 
      id="maestros" 
      ref={sectionRef}
      data-lenis-prevent
      className="relative w-full min-h-dvh flex flex-col justify-center items-center bg-[#F4F1ED] py-10 select-none font-['Darker_Grotesque',_sans-serif] overflow-y-auto"
    >
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#8B7AA8]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#E88973]/10 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-7xl flex flex-col relative z-10">
        
        <div 
          ref={titleRef}
          className="w-full flex justify-end px-6 md:px-12 lg:px-20 mb-8"
        >
          <h2 className="text-[#13263F] text-4xl md:text-5xl font-black tracking-wide uppercase font-['Helvetica',_sans-serif]">
            {seccionTitulo}
          </h2>
        </div>

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
            className="w-full flex items-stretch overflow-x-auto overflow-y-hidden space-x-6 snap-x snap-mandatory scrollbar-none px-12 py-1"
          >
            <div 
              ref={cardsContainerRef}
              className="flex items-stretch space-x-6"
            >
              {totalMaestros.map((index) => {
                const maestroNombre = t(`maestros.${index}.nombre`);
                const maestroPais = t(`maestros.${index}.pais`);
                const maestroPerfil = t(`maestros.${index}.perfil`);

                return (
                  <div 
                    key={index} 
                    className="snap-center shrink-0 relative w-[80vw] sm:w-[340px] min-h-[520px] md:min-h-[480px] rounded-[40px] p-8 flex flex-col items-center justify-start text-[#F4F1ED] bg-[#13263F] border border white/5 shadow-2xl transition-all duration-500 group"
                  >
                    <div className="absolute -top-16 -right-16 w-44 h-44 bg-[#E88973]/10 rounded-full blur-2xl pointer-events-none transition-transform duration-700 group-hover:translate-x-3" />
                    
                    <div className="relative w-24 h-24 mt-2 flex items-center justify-center shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#8B7AA8]/30 to-[#E88973]/20 rounded-full blur-md opacity-80 group-hover:scale-110 transition-transform duration-500" />
                      <div className="relative w-full h-full rounded-full overflow-hidden border border-white/10 bg-[#13263F]/50 shadow-inner">
                        <img 
                          src={getFotoUrl(maestroNombre)} 
                          alt={maestroNombre} 
                          className="w-full h-full object-cover contrast-115 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                          onError={(e) => {
                            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' h='100' viewBox='0 0 24 24' fill='none' stroke='%23F4F1ED' stroke-width='1'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E";
                          }}
                        />
                      </div>
                    </div>

                    <div className="text-center w-full flex flex-col justify-start pt-5 shrink-0">
                      <h4 className="text-xl font-bold tracking-wide text-[#F4F1ED] font-['Helvetica',_sans-serif]">
                        {maestroNombre}
                      </h4>
                      <p className="text-xs uppercase tracking-[0.2em] text-[#E88973] font-bold mt-1">
                        {maestroPais}
                      </p>
                    </div>
                    
                    <div 
                    data-lenis-prevent
                    className="w-full mt-4 flex-grow overflow-y-auto scrollbar-none text-center pr-1 max-h-[260px]">
                      <p className="text-sm md:text-base leading-relaxed text-[#F4F1ED]/80 font-light tracking-wide group-hover:text-[#F4F1ED] transition-colors duration-300">
                        {maestroPerfil}
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