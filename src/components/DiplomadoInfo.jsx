import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function DiplomadoInfo() {
  const { t, i18n } = useTranslation();

  const sectionRef = useRef(null);
  const leftColumnRef = useRef(null);
  const desktopCardsRef = useRef(null);
  const mobileCardsRef = useRef(null);

  const enfoquesIndices = [0, 1, 2];
  const isEnglish = i18n.language === 'en';
  const seccionTitulo = isEnglish ? 'Diploma Program' : 'Diplomado';

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. ANIMACIÓN DE LA COLUMNA IZQUIERDA
      gsap.fromTo(leftColumnRef.current,
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play reverse play reverse',
          }
        }
      );

      // 2. ANIMACIÓN DE LAS TARJETAS EN DESKTOP
      if (desktopCardsRef.current) {
        const desktopCards = desktopCardsRef.current.children;
        gsap.fromTo(desktopCards,
          { opacity: 0, x: 100 },
          {
            opacity: 1,
            x: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play reverse play reverse',
            }
          }
        );
      }

      // 3. ANIMACIÓN DE LAS TARJETAS EN MÓVIL/TABLET
      if (mobileCardsRef.current) {
        const mobileCards = mobileCardsRef.current.children;
        gsap.fromTo(mobileCards,
          { opacity: 0, x: 50 },
          {
            opacity: 1,
            x: 0,
            duration: 1.0,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play reverse play reverse',
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="diplomado-info" 
      ref={sectionRef}
      className="w-full bg-[#F4F1ED] py-16 md:py-24 px-6 md:px-12 lg:px-20 select-none text-[#13263F] font-darker"
    >
      {/* CONTENEDOR PRINCIPAL */}
      <div 
      data-lenis-prevent
      className="max-w-6xl mx-auto w-full flex flex-col xl:flex-row justify-between items-start gap-12 xl:gap-24 overflow-y-auto">
        
        {/* COLUMNA IZQUIERDA: DIPLOMADO, DESCRIPCIÓN Y DETALLES */}
        <div 
          ref={leftColumnRef}
          className="w-full xl:w-5/12 flex flex-col justify-start shrink-0"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight uppercase mb-4 xl:mb-6 bg-gradient-to-r from-[#C46A4A] via-[#E88973] to-[#C46A4A] bg-clip-text text-transparent">
            {seccionTitulo}
          </h2>
          
          <p className="text-base md:text-lg lg:text-xl leading-relaxed text-[#13263F]/90 font-light tracking-wide mb-6">
            {t('diplomado.perfil_egreso.vision_general')}
          </p>

          <div className="space-y-2 mb-6 xl:mb-8 border-l border-[#13263F]/20 pl-4 py-0.5">
            <p className="text-xs md:text-sm font-light text-[#13263F]/80 tracking-wide">
              <span className="font-bold text-[#13263F] mr-1">{isEnglish ? 'Start Date:' : 'Inicio:'}</span>
              {t('diplomado.informacion_general.fecha_inicio')}
            </p>
            <p className="text-xs md:text-sm font-light text-[#13263F]/80 tracking-wide">
              <span className="font-bold text-[#13263F] mr-1">{isEnglish ? 'Schedule:' : 'Horarios:'}</span>
              {t('diplomado.informacion_general.horarios')}
            </p>
            <div className="text-xs md:text-sm font-light text-[#13263F]/80 tracking-wide">
              <span className="font-bold text-[#13263F] mr-1">{isEnglish ? 'Venues:' : 'Sedes:'}</span>
              <span className="text-[#13263F]/80">
                {t('diplomado.informacion_general.sedes.0')} • {t('diplomado.informacion_general.sedes.1')}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4 bg-white/50 border border-[#13263F]/5 p-3 rounded-2xl max-w-sm shadow-sm">
            <div className="w-12 h-12 shrink-0 flex items-center justify-center overflow-hidden rounded-xl bg-transparent">
              <img 
                src="/logo-buap-azul.jpeg"
                alt="Logo BUAP"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentNode.className = "w-12 h-12 shrink-0 border border-dashed border-[#E88973]/40 rounded-xl bg-[#13263F]/5 flex items-center justify-center text-[10px] font-bold text-[#E88973]";
                  e.currentTarget.parentNode.innerText = "BUAP LOGO";
                }}
              />
            </div>
            <p className="text-xs font-semibold text-[#E88973] tracking-wider uppercase leading-snug">
              {t('diplomado.aval')}
            </p>
          </div>
        </div>

        {/* COLUMNA DERECHA: PERFIL DEL EGRESADO */}
        <div className="w-full xl:w-7/12 mt-4 xl:mt-0">
          
          {/* VISTA DESKTOP GRANDE (Fluye libre con el scroll general) */}
          <div 
            ref={desktopCardsRef}
            className="hidden xl:flex flex-col space-y-8"
          >
            {enfoquesIndices.map((index, i) => (
              <div key={`desktop-${index}`} className="w-full">
                {i > 0 && <div className="w-full h-[1px] bg-[#13263F]/10 mb-8" />}
                <div className="flex flex-col space-y-2">
                  <h3 className="text-lg font-bold tracking-wide text-[#13263F]">
                    {t(`diplomado.perfil_egreso.enfoques_por_disciplina.${index}.disciplina`)}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#13263F]/75 font-light tracking-wide">
                    {t(`diplomado.perfil_egreso.enfoques_por_disciplina.${index}.resumen`)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* VISTA PARA MÓVIL Y PANTALLAS MEDIANAS ( data-lenis-prevent SÓLO aquí para el carrusel horizontal ) */}
          <div 
            ref={mobileCardsRef}
            data-lenis-prevent
            className="flex xl:hidden w-[calc(100%+2rem)] -mx-4 px-4 overflow-x-auto snap-x snap-mandatory scrollbar-none gap-4 pb-4 touch-pan-x"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {enfoquesIndices.map((index) => (
              <div 
                key={`mobile-${index}`} 
                className="w-[280px] sm:w-[320px] shrink-0 snap-center bg-white/70 backdrop-blur-sm border border-[#13263F]/5 p-5 rounded-2xl shadow-md flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-base font-bold tracking-wide text-[#13263F] mb-2">
                    {t(`diplomado.perfil_egreso.enfoques_por_disciplina.${index}.disciplina`)}
                  </h3>
                  <p className="text-xs leading-relaxed text-[#13263F]/80 font-light tracking-wide whitespace-normal break-words">
                    {t(`diplomado.perfil_egreso.enfoques_por_disciplina.${index}.resumen`)}
                  </p>
                </div>
                
                <div className="flex space-x-1.5 mt-4 justify-center">
                  {enfoquesIndices.map((dotIndex) => (
                    <span 
                      key={`dot-${index}-${dotIndex}`} 
                      className={`h-1 rounded-full transition-all duration-300 ${dotIndex === index ? 'w-3 bg-[#C46A4A]' : 'w-1.5 bg-[#13263F]/20'}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}