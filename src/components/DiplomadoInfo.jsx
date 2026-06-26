import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registramos el plugin de ScrollTrigger de manera formal
gsap.registerPlugin(ScrollTrigger);

export default function DiplomadoInfo() {
  const { t, i18n } = useTranslation();

  // Referencias para la coreografía con GSAP
  const sectionRef = useRef(null);
  const leftColumnRef = useRef(null);
  const desktopCardsRef = useRef(null);
  const mobileCardsRef = useRef(null);

  const enfoquesIndices = [0, 1, 2];
  const isEnglish = i18n.language === 'en';
  const seccionTitulo = isEnglish ? 'Diploma Program' : 'Diplomado';

  useEffect(() => {
    // Usamos gsap.context para agrupar y limpiar las animaciones de React 19
    let ctx = gsap.context(() => {
      
      // 1. ANIMACIÓN DE LA COLUMNA IZQUIERDA (Entra desde afuera por la IZQUIERDA)
      gsap.fromTo(leftColumnRef.current,
        { 
          opacity: 0, 
          x: -300 // Desplazamiento masivo para mayor dinamismo
        },
        {
          opacity: 1,
          x: 0,
          duration: 1.6,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%', // Se dispara cuando la sección entra bien al viewport
            toggleActions: 'play reverse play reverse', // Entra y sale dinámicamente
          }
        }
      );

      // 2. ANIMACIÓN DE LAS TARJETAS EN DESKTOP (Entran desde afuera por la DERECHA en cascada)
      if (desktopCardsRef.current) {
        const desktopCards = desktopCardsRef.current.children;
        gsap.fromTo(desktopCards,
          { 
            opacity: 0, 
            x: 300 
          },
          {
            opacity: 1,
            x: 0,
            duration: 1.4,
            stagger: 0.25, // Cascada dancística entre cada enfoque
            ease: 'power4.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              toggleActions: 'play reverse play reverse',
            }
          }
        );
      }

      // 3. ANIMACIÓN DE LAS TARJETAS EN MÓVIL/TABLET (Entran desde la DERECHA con stagger fluido)
      if (mobileCardsRef.current) {
        const mobileCards = mobileCardsRef.current.children;
        gsap.fromTo(mobileCards,
          { 
            opacity: 0, 
            x: 200 
          },
          {
            opacity: 1,
            x: 0,
            duration: 1.4,
            stagger: 0.2, // Entrada consecutiva de los slides
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
              toggleActions: 'play reverse play reverse',
            }
          }
        );
      }

    }, sectionRef); // Scope controlado

    // Limpieza estricta de ScrollTriggers al desmontar el componente
    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="diplomado-info" 
      ref={sectionRef}
      className="w-full min-h-h-dvhflex flex-col justify-center items-center bg-[#F4F1ED] pt-6 pb-12 xl:py-24 px-6 md:px-12 lg:px-20 select-none text-[#13263F] font-darker overflow-hidden"
    >
      {/* CONTENEDOR PRINCIPAL */}
      <div className="max-w-6xl mx-auto w-full flex flex-col xl:flex-row justify-between items-start gap-4 xl:gap-24">
        
        {/* COLUMNA IZQUIERDA: DIPLOMADO, DESCRIPCIÓN Y DETALLES */}
        <div 
          ref={leftColumnRef}
          className="w-full xl:w-5/12 flex flex-col justify-start shrink-0"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight uppercase mb-3 xl:mb-6 bg-gradient-to-r from-[#C46A4A] via-[#E88973] to-[#C46A4A] bg-clip-text text-transparent">
            {seccionTitulo}
          </h2>
          
          <p className="text-base md:text-lg lg:text-xl leading-relaxed text-[#13263F]/90 font-light tracking-wide mb-3 xl:mb-6">
            {t('diplomado.perfil_egreso.vision_general')}
          </p>

          <div className="space-y-1 md:space-y-2 mb-4 xl:mb-8 border-l border-[#13263F]/20 pl-4 py-0.5">
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
        <div className="w-full xl:w-7/12 max-w-full mt-0">
          
          {/* VISTA DESKTOP GRANDE (Desde xl en adelante) */}
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

          {/* VISTA PARA MÓVIL Y PANTALLAS MEDIANAS (Debajo de xl) */}
          <div 
            ref={mobileCardsRef}
            className="flex xl:hidden w-full overflow-x-auto snap-x snap-mandatory scrollbar-none gap-4 -mt-2 pb-2"
          >
            {enfoquesIndices.map((index) => (
              <div 
                key={`mobile-${index}`} 
                className="w-full shrink-0 snap-center bg-white/70 backdrop-blur-sm border border-[#13263F]/5 p-5 rounded-2xl shadow-md flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-sm md:text-base font-bold tracking-wide text-[#13263F] mb-1">
                    {t(`diplomado.perfil_egreso.enfoques_por_disciplina.${index}.disciplina`)}
                  </h3>
                  <p className="text-[11px] md:text-xs leading-relaxed text-[#13263F]/80 font-light tracking-wide whitespace-normal break-words">
                    {t(`diplomado.perfil_egreso.enfoques_por_disciplina.${index}.resumen`)}
                  </p>
                </div>
                
                <div className="flex space-x-1.5 mt-3 justify-center">
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