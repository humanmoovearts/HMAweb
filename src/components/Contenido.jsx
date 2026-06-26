import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contenido() {
  const { t, i18n } = useTranslation();
  const [activeModulo, setActiveModulo] = useState(0);

  // Referencias para las animaciones
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardRef = useRef(null);
  const contentWrapperRef = useRef(null);

  // Módulos del 0 al 4 + posición 5 asignada al Evento de Cierre
  const totalModulos = [0, 1, 2, 3, 4, 5];
  const esEventoCierre = activeModulo === 5;

  // Extracción segura de arreglos y textos desde el JSON de traducción
  const maestrosArray = t(`contenido_tematico.modulos.${activeModulo}.clases`, { returnObjects: true }) || [];
  const moduloTitulo = t(`contenido_tematico.modulos.${activeModulo}.titulo`);

  const isEnglish = i18n.language === 'en';
  const seccionTitulo = isEnglish ? 'Content' : 'Contenido';
  const moduloLabel = isEnglish ? 'MODULE' : 'MÓDULO';
  const tabLabel = isEnglish ? 'MOD' : 'MÓD';
  const maestrosLabel = isEnglish ? 'FACULTY' : 'MAESTROS';
  const cierreLabel = isEnglish ? 'CLOSING' : 'CIERRE';

  // 1. Animación de entrada inicial por ScrollTrigger
  useEffect(() => {
    let ctx = gsap.context(() => {
      
      // Entrada del encabezado desde la izquierda
      gsap.fromTo(headerRef.current,
        { opacity: 0, x: -150 },
        {
          opacity: 1,
          x: 0,
          duration: 1.4,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            toggleActions: 'play reverse play reverse',
          }
        }
      );

      // Entrada de la tarjeta contenedora desde la derecha
      gsap.fromTo(cardRef.current,
        { opacity: 0, x: 200 },
        {
          opacity: 1,
          x: 0,
          duration: 1.5,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play reverse play reverse',
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 2. Animación fluida horizontal al cambiar de módulo (Pestaña)
  const handleModuloChange = (index) => {
    if (index === activeModulo) return;

    // Animación de salida (Hacia la izquierda y desvanecer)
    gsap.to(contentWrapperRef.current, {
      opacity: 0,
      x: -50,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => {
        // Cambiamos el estado exactamente cuando el elemento no es visible
        setActiveModulo(index);
        
        // Animación de entrada del nuevo contenido (Aparece desde la derecha)
        gsap.fromTo(contentWrapperRef.current,
          { opacity: 0, x: 50 },
          { 
            opacity: 1, 
            x: 0, 
            duration: 0.5, 
            ease: 'power3.out' 
          }
        );
      }
    });
  };

  return (
    <section 
      id="contenido" 
      ref={sectionRef}
      style={{ fontFamily: "var(--font-darker, 'Darker Grotesque', sans-serif)" }}
      className="relative w-full h-dvh max-h-dvh flex flex-col justify-between items-center overflow-hidden bg-gradient-to-br from-[#13263F] via-[#8B7AA8] to-[#C46A4A] pt-24 pb-8 px-4 sm:px-6 md:px-12 lg:px-20 select-none"
    >
      {/* DESTELLO ORGÁNICO CORPORATIVO */}
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[300px] bg-gradient-to-r from-[#E88973] via-[#C46A4A] to-transparent rounded-full blur-[90px] opacity-40 mix-blend-color-dodge pointer-events-none" />

      {/* CONTENEDOR LIMITADOR A PANTALLAS COMPLETAS */}
      <div className="max-w-6xl mx-auto w-full h-full flex flex-col justify-between relative z-10 overflow-hidden">
        
        {/* ENCABEZADO DE LA SECCIÓN */}
        <div 
          ref={headerRef}
          className="w-full flex flex-col md:flex-row justify-between items-start md:items-end mb-4 shrink-0 border-b border-[#F4F1ED]/10 pb-3"
        >
          <div>
            <h2 className="text-[#F4F1ED] text-3xl md:text-5xl font-black tracking-wide uppercase opacity-95">
              {seccionTitulo}
            </h2>
          </div>

          {/* SELECTOR DE MÓDULOS + BOTÓN DE EVENTO DE CIERRE */}
          <div className="flex flex-wrap gap-1.5 bg-[#13263F]/60 p-1 rounded-xl md:rounded-full border border-[#F4F1ED]/10 shadow-inner mt-2 md:mt-0">
            {totalModulos.map((index) => {
              const esBotonCierre = index === 5;
              const activo = activeModulo === index;
              return (
                <button
                  key={index}
                  onClick={() => handleModuloChange(index)}
                  className={`px-3 py-1.5 text-xs font-bold tracking-widest uppercase rounded-lg md:rounded-full transition-all duration-300 ${
                    activo
                      ? 'bg-[#E88973] text-white shadow-md scale-105'
                      : 'text-[#F4F1ED]/60 hover:text-[#F4F1ED] hover:bg-white/[0.05]'
                  }`}
                >
                  {esBotonCierre ? cierreLabel : `${tabLabel} 0${index + 1}`}
                </button>
              );
            })}
          </div>
        </div>

        {/* TARJETA PRINCIPAL PREMIUM GLASSMORPHISM */}
        <div 
          ref={cardRef}
          className="w-full flex-grow bg-[#13263F]/30 backdrop-blur-xl border border-[#F4F1ED]/15 p-6 md:p-8 rounded-2xl text-[#F4F1ED] shadow-2xl overflow-hidden mb-2"
        >
          {/* Sub-contenedor animable interno para el intercambio de información */}
          <div 
            ref={contentWrapperRef}
            className="w-full h-full grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch"
          >
            
            {/* CASO INTERNO A: VISTA DE UN MÓDULO REGULAR */}
            {!esEventoCierre && (
              <>
                {/* DETALLES DEL MÓDULO (Izquierda) */}
                <div className="md:col-span-5 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#F4F1ED]/10 pb-4 md:pb-0 md:pr-6 overflow-y-auto">
                  <div>
                    <h3 className="text-xl md:text-2xl font-black leading-none tracking-widest text-[#E88973] uppercase">
                      {moduloLabel} {activeModulo + 1}
                    </h3>
                    
                    <p className="text-base md:text-xl font-medium text-[#F4F1ED]/90 tracking-wide mt-4 leading-relaxed">
                      {moduloTitulo}
                    </p>
                  </div>

                  <div className="hidden md:block pt-4">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#8B7AA8] block">
                      Human Moovearts
                    </span>
                  </div>
                </div>

                {/* LISTA DE MAESTROS DEL MÓDULO (Derecha - Scroll exclusivo) */}
                <div className="md:col-span-7 flex flex-col justify-start overflow-hidden h-full">
                  <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#8B7AA8] mb-3 font-helvetica">
                    {maestrosLabel}
                  </h4>
                  <div className="flex-grow overflow-y-auto pr-1 space-y-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent max-h-full">
                    {maestrosArray.map((maestro, i) => (
                      <div 
                        key={i} 
                        className="flex items-center bg-white/[0.03] border border-white/[0.05] p-3 rounded-xl hover:bg-white/[0.07] hover:border-[#E88973]/20 transition-all duration-200"
                      >
                        {/* Indicador estético minimalista */}
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E88973] shrink-0 ml-1" />
                        
                        {/* Separador */}
                        <div className="w-[1px] h-4 bg-[#F4F1ED]/20 mx-3 shrink-0" />
                        
                        {/* Nombre del Profesor */}
                        <span className="text-xs md:text-sm font-light leading-none text-[#F4F1ED]/90 tracking-wide truncate">
                          {maestro}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* CASO INTERNO B: VISTA DETALLADA DEL EVENTO DE CIERRE */}
            {esEventoCierre && (
              <div className="col-span-12 flex flex-col justify-between h-full overflow-y-auto pr-1">
                <div className="space-y-4">
                  <div className="inline-block bg-[#E88973] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest font-helvetica shadow-sm">
                    {t('contenido_tematico.evento_cierre.nombre')}
                  </div>
                  <h3 className="text-2xl md:text-4xl font-light tracking-wide text-[#F4F1ED]">
                    {t('contenido_tematico.evento_cierre.nombre')}
                  </h3>
                  <p 
                    className="text-sm md:text-lg leading-relaxed font-light text-[#F4F1ED]/85 tracking-wide pt-4 border-t border-white/10"
                    dangerouslySetInnerHTML={{ __html: t('contenido_tematico.evento_cierre.descripcion').replace(/\n/g, '<br/>') }}
                  />
                </div>
                
                <div className="pt-4 border-t border-white/5 flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-[#8B7AA8]">
                  <span>Human Moovearts</span>
                  <span>© 2026</span>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}