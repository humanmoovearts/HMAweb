import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const { t } = useTranslation();
  
  const sectionRef = useRef(null);
  const textContainerRef = useRef(null);
  const videoContainerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      // 1. Animación del contenedor de Video (Entrada desde la DERECHA)
      gsap.fromTo(videoContainerRef.current,
        { 
          opacity: 0, 
          x: 100,      
          scale: 0.95, 
        },
        {
          opacity: 1,
          x: 0,        
          scale: 1,
          duration: 1.6, 
          delay: 0.1,    
          ease: 'power3.out', 
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%', 
            toggleActions: 'play none play reverse',
          }
        }
      );

      // 2. Animación de los Textos (Entrada desde la IZQUIERDA + Stagger)
      const textElements = textContainerRef.current.children;
      
      gsap.fromTo(textElements,
        { 
          opacity: 0, 
          x: -80,      
        },
        {
          opacity: 1,
          x: 0,        
          duration: 1.4,
          delay: 0.3,    
          stagger: 0.35, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%', 
            toggleActions: 'play none play reverse',
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="quienes-somos" 
      ref={sectionRef}
      style={{ fontFamily: "var(--font-darker, 'Darker Grotesque', sans-serif)" }}
      className="bg-[#F4F1ED] text-[#13263F] py-16 px-6 md:py-24 md:px-12 lg:px-20 min-h-dvh flex items-center overflow-x-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
        
        {/* COLUMNA IZQUIERDA: TEXTOS */}
        <div 
          ref={textContainerRef}
          className="flex flex-col justify-center order-2 md:order-1"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#13263F] to-[#C46A4A] leading-tight mb-8 md:mb-12">
            "{t('organizacion.filosofia.lema_fundamental')}"
          </h2>
          
          <p className="text-base md:text-lg text-[#1F3A5F] font-light leading-relaxed max-w-xl">
            {t('organizacion.descripcion')}
          </p>
        </div>

        {/* COLUMNA DERECHA: REPRODUCTOR NATIVO DE YOUTUBE */}
        <div 
          ref={videoContainerRef}
          className="w-full aspect-[4/3] bg-[#1F3A5F]/10 overflow-hidden shadow-2xl order-1 md:order-2 rounded-sm border border-[#13263F]/5"
        >
          <iframe
            src="https://www.youtube.com/embed/ty94mMsn2AA?controls=1&rel=0"
            className="w-full h-full object-cover"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="YouTube video player"
          />
        </div>

      </div>
    </section>
  );

}