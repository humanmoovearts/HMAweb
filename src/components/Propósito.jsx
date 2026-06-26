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

  // Helper para formatear los saltos de línea e indicaciones de texto del JSON en HTML real
  const formatTranslationHtml = (text) => {
    if (!text) return '';
    // Reemplaza los guiones con saltos de línea estéticos por etiquetas <br />
    return text.replace(/-\s*\n\n/g, '<br/><br/>').replace(/\n/g, '<br/>');
  };

  // 1. Animaciones de Entrada Optimizadas con gsap.context
  useEffect(() => {
    let ctx = gsap.context(() => {
      
      // Galería (Izquierda)
      gsap.fromTo(leftColumnRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          }
        }
      );

      // Textos (Derecha)
      gsap.fromTo(rightColumnRef.current,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert(); // Limpieza estricta de ScrollTrigger
  }, []);

  // 2. Manejo de cambio de imágenes (Carrusel automatizado y gestos táctiles)
  useEffect(() => {
    const intervalo = setInterval(() => {
      nextImage();
    }, 5000);
    return () => clearInterval(intervalo);
  }, [currentImg]);

  const nextImage = () => {
    gsap.to(imageRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        setCurrentImg((prev) => (prev + 1) % galeriaFotos.length);
        gsap.to(imageRef.current, { opacity: 1, duration: 0.4 });
      }
    });
  };

  const prevImage = () => {
    gsap.to(imageRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        setCurrentImg((prev) => (prev - 1 + galeriaFotos.length) % galeriaFotos.length);
        gsap.to(imageRef.current, { opacity: 1, duration: 0.4 });
      }
    });
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) nextImage();
    if (touchStartX.current - touchEndX.current < -50) prevImage();
  };

  // Idioma activo para etiquetas de sección
  const activeLabel = {
    proposito: i18n.language?.startsWith('en') ? 'PURPOSE' : 'PROPÓSITO',
    metodologia: i18n.language?.startsWith('en') ? 'METHODOLOGY' : 'METODOLOGÍA'
  };

  return (
    <section 
      id="quienes-somos"
      ref={sectionRef}
      className="min-h-dvh bg-[#F4F1ED] py-20 px-6 md:px-12 lg:px-24 flex items-center justify-center overflow-hidden selection:bg-[#E88973]/30 selection:text-[#13263F]"
    >
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 items-start">
        
        {/* COLUMNA IZQUIERDA: GALERÍA */}
        <div 
          ref={leftColumnRef} 
          className="md:col-span-5 flex flex-col items-center w-full relative"
        >
          <div 
            className="w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-xl bg-[#1F3A5F]/5 relative group touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <img 
              ref={imageRef}
              src={galeriaFotos[currentImg]} 
              alt={`Human Moovearts - Galería ${currentImg + 1}`}
              className="w-full h-full object-cover will-change-transform"
            />
            
            {/* Controles del Carrusel */}
            <button 
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#13263F]/40 hover:bg-[#13263F]/70 text-white flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
              aria-label="Anterior imagen"
            >
              &#10094;
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#13263F]/40 hover:bg-[#13263F]/70 text-white flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
              aria-label="Siguiente imagen"
            >
              &#10095;
            </button>

            {/* Contador de Fotos */}
            <div className="absolute bottom-4 right-4 bg-[#13263F]/60 backdrop-blur-md text-[#F4F1ED] px-3 py-1 rounded-full text-[10px] font-mono tracking-widest">
              {String(currentImg + 1).padStart(2, '0')} / {String(galeriaFotos.length).padStart(2, '0')}
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: TEXTOS DINÁMICOS CON HTML */}
        <div 
          ref={rightColumnRef}
          className="md:col-span-7 flex flex-col justify-start space-y-12 md:space-y-16 w-full"
        >
          {/* BLOQUE: PROPÓSITO */}
          <div className="border-t border-[#13263F]/10 pt-8 flex flex-col space-y-4">
            <h3 className="text-sm md:text-base font-black tracking-[0.2em] uppercase text-[#E88973]">
              {activeLabel.proposito}
            </h3>
            <p 
              className="text-base md:text-lg lg:text-xl leading-relaxed font-light text-[#13263F]/90 tracking-wide"
              dangerouslySetInnerHTML={{ __html: formatTranslationHtml(t('organizacion.proposito')) }}
            />
          </div>

          {/* BLOQUE: METODOLOGÍA */}
          <div className="border-t border-[#13263F]/10 pt-8 flex flex-col space-y-4">
            <h3 className="text-sm md:text-base font-black tracking-[0.2em] uppercase text-[#8B7AA8]">
              {activeLabel.metodologia}
            </h3>
            <p 
              className="text-base md:text-lg lg:text-xl leading-relaxed font-light text-[#13263F]/90 tracking-wide"
              dangerouslySetInnerHTML={{ __html: formatTranslationHtml(t('organizacion.metodologia')) }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}