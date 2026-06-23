import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Proposito() {
  const { t, i18n } = useTranslation();
  const [currentImg, setCurrentImg] = useState(0);
  
  const sectionRef = useRef(null);
  const leftColumnRef = useRef(null);
  const rightColumnRef = useRef(null);
  const imageRef = useRef(null);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const galeriaFotos = [
    "/edicion-pasada/1.jpeg", 
    "/edicion-pasada/2.jpeg",
    "/edicion-pasada/3.jpeg",
    "/edicion-pasada/4.jpeg",
    "/edicion-pasada/5.jpeg",
    "/edicion-pasada/6.jpeg",
    "/edicion-pasada/7.jpeg",
    "/edicion-pasada/8.jpeg",
    "/edicion-pasada/9.jpeg",
    "/edicion-pasada/10.jpeg"
  ];

  // 1. Animaciones de Entrada Optimizadas para evitar entradas/salidas bruscas
  useEffect(() => {
    let ctx = gsap.context(() => {
      
      // Galería (Izquierda): Empieza a entrar apenas asoma la sección por abajo (90% de la pantalla)
      gsap.fromTo(leftColumnRef.current,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 90%', // <-- Se dispara mucho antes
            toggleActions: 'play none none none' // <-- Se reproduce una vez y se queda estático para leer con calma
          }
        }
      );

      // Bloques Editoriales (Derecha): Cascada limpia que arranca de inmediato
      if (rightColumnRef.current) {
        const textBlocks = rightColumnRef.current.children;
        gsap.fromTo(textBlocks,
          { opacity: 0, x: 40 },
          {
            opacity: 1,
            x: 0,
            duration: 1.2,
            stagger: 0.2, 
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%', // <-- Entra casi a la par de la galería
              toggleActions: 'play none none none' // <-- Inmune al scroll inverso
            }
          }
        );
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 2. Animación interna de la galería de fotos
  const animateSlideChange = (nextIndex) => {
    gsap.to(imageRef.current, {
      opacity: 0,
      x: -20,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        setCurrentImg(nextIndex);
        gsap.fromTo(imageRef.current,
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 0.4, ease: 'power3.out' }
        );
      }
    });
  };

  const nextSlide = () => {
    const nextIndex = currentImg === galeriaFotos.length - 1 ? 0 : currentImg + 1;
    animateSlideChange(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = currentImg === 0 ? galeriaFotos.length - 1 : currentImg - 1;
    animateSlideChange(prevIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, [currentImg]);

  const handleTouchStart = (e) => { touchStartX.current = e.targetTouches[0].clientX; };
  const handleTouchMove = (e) => { touchEndX.current = e.targetTouches[0].clientX; };
  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diffX = touchStartX.current - touchEndX.current;
    const swipeThreshold = 50;
    if (diffX > swipeThreshold) nextSlide();
    else if (diffX < -swipeThreshold) prevSlide();
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const currentLang = i18n.language || 'es';
  const labels = {
    es: { proposito: "Propósito", metodologia: "Metodología", edicionPasada: "Edición Pasada" },
    en: { proposito: "Purpose", metodologia: "Methodology", edicionPasada: "Past Edition" }
  };
  const activeLabel = labels[currentLang] || labels.es;

  return (
    <section 
      id="quienes-somos" 
      ref={sectionRef}
      style={{ fontFamily: "var(--font-darker, 'Darker Grotesque', sans-serif)" }}
      className="relative w-full min-h-screen flex flex-col justify-center items-center bg-[#F4F1ED] py-16 md:py-24 px-6 md:px-12 lg:px-20 select-none text-[#13263F] overflow-hidden"
    >
      {/* AURAS ORGÁNICAS DE FONDO */}
      <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#E88973]/15 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-15%] w-[55vw] h-[55vw] rounded-full bg-[#8B7AA8]/20 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 lg:gap-20 items-start w-full relative z-10">
        
        {/* COLUMNA IZQUIERDA: GALERÍA */}
        <div 
          ref={leftColumnRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="md:col-span-5 relative w-full h-[380px] sm:h-[450px] md:h-[55vh] md:max-h-[460px] rounded-[45px] overflow-hidden bg-[#13263F]/5 border border-[#13263F]/10 shadow-2xl group flex items-center justify-center shrink-0 md:sticky md:top-28 cursor-grab active:cursor-grabbing"
        >
          <div className="absolute top-6 left-6 z-20 bg-[#F4F1ED]/80 backdrop-blur-md text-[#13263F] border border-[#13263F]/10 px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase shadow-sm">
            {activeLabel.edicionPasada}
          </div>
          
          <img 
            ref={imageRef}
            src={galeriaFotos[currentImg]} 
            alt={`Human Moovearts Gallery ${currentImg + 1}`} 
            className="w-full h-full object-cover contrast-115 select-none pointer-events-none"
            onError={(e) => {
              e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' h='100' viewBox='0 0 24 24' fill='none' stroke='%2313263F' stroke-width='0.5' opacity='0.3'%3E%3Crect x='3' y='3' width='18' h='18' rx='2' ry='2'/%3E%3Ccircle cx='8.5' cy='8.5' r='1.5'/%3E%3Cpolyline points='21 15 16 10 5 21'/%3E%3C/svg%3E";
            }}
          />

          {galeriaFotos.length > 1 && (
            <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden md:flex">
              <button 
                onClick={prevSlide}
                className="pointer-events-auto w-10 h-10 rounded-full bg-[#13263F]/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-[#F4F1ED] hover:bg-[#13263F]/40 active:scale-90 transition-all shadow-md focus:outline-none"
                aria-label="Anterior foto"
              >
                <svg className="w-5 h-5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button 
                onClick={nextSlide}
                className="pointer-events-auto w-10 h-10 rounded-full bg-[#13263F]/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-[#F4F1ED] hover:bg-[#13263F]/40 active:scale-90 transition-all shadow-md focus:outline-none"
                aria-label="Siguiente foto"
              >
                <svg className="w-5 h-5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}

          {galeriaFotos.length > 0 && (
            <div className="absolute bottom-4 right-6 bg-[#13263F]/70 backdrop-blur-md text-[#F4F1ED] px-3 py-1 rounded-full text-[10px] font-mono tracking-widest">
              {String(currentImg + 1).padStart(2, '0')} / {String(galeriaFotos.length).padStart(2, '0')}
            </div>
          )}
        </div>

        {/* COLUMNA DERECHA: TEXTOS */}
        <div 
          ref={rightColumnRef}
          className="md:col-span-7 flex flex-col justify-start space-y-12 md:space-y-16 w-full"
        >
          {/* BLOQUE: PROPÓSITO  */}
          <div className="border-t border-[#13263F]/10 pt-8 flex flex-col space-y-4">
            <h3 className="text-sm md:text-base font-black tracking-[0.2em] uppercase text-[#E88973]">
              {activeLabel.proposito}
            </h3>
            <p className="text-base md:text-lg lg:text-xl leading-relaxed font-light text-[#13263F]/90 tracking-wide">
              {t('organizacion.proposito')}
            </p>
          </div>

          {/* BLOQUE: METODOLOGÍA */}
          <div className="border-t border-[#13263F]/10 pt-8 flex flex-col space-y-4">
            <h3 className="text-sm md:text-base font-black tracking-[0.2em] uppercase text-[#8B7AA8]">
              {activeLabel.metodologia}
            </h3>
            <p className="text-base md:text-lg leading-relaxed font-light text-[#13263F]/80 tracking-wide">
              {t('organizacion.metodologia')} 
            </p>
          </div>

          <div className="border-b border-[#13263F]/10 pb-4" />

        </div>

      </div>
    </section>
  );
}