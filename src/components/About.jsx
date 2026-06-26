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
          x: 100,      // Empieza 100px a la derecha
          scale: 0.95, // Ligeramente más pequeño
        },
        {
          opacity: 1,
          x: 0,        // Posición original
          scale: 1,
          duration: 1.6, // Movimiento suave y dancístico
          delay: 0.1,    // Espera mínima antes de iniciar
          ease: 'power3.out', // power3 es excelente para paradas elegantes
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 55%', // Calibrado para que se vea bien el inicio
            toggleActions: 'play reverse play reverse', // "Entra y sale"
          }
        }
      );

      // 2. Animación de los Textos (Entrada desde la IZQUIERDA + Stagger)
      // Seleccionamos los hijos directos (h2 y p)
      const textElements = textContainerRef.current.children;
      
      gsap.fromTo(textElements,
        { 
          opacity: 0, 
          x: -80,      // Empieza 80px a la izquierda
        },
        {
          opacity: 1,
          x: 0,        // Posición original
          duration: 1.4,
          delay: 0.3,    // Entra justo después del video para coordinar
          stagger: 0.35, // El h2 entra primero, luego el p
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 55%', // Sincronizado en el mismo punto de disparo
            toggleActions: 'play reverse play reverse',
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
      // He añadido overflow-x-hidden para evitar scrollbars horizontales durante la animación
      className="bg-[#F4F1ED] text-[#13263F] py-16 px-6 md:py-24 md:px-12 lg:px-20 min-h-dvh flex items-center overflow-x-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
        
        {/* COLUMNA IZQUIERDA: TEXTOS */}
        <div 
          ref={textContainerRef}
          className="flex flex-col justify-center order-2 md:order-1"
        >
          {/* Frase principal / Filosofía */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#13263F] to-[#C46A4A] leading-tight mb-8 md:mb-12">
            "{t('organizacion.filosofia.lema_fundamental')}"
          </h2>
          
          {/* Párrafo descriptivo */}
          <p className="text-base md:text-lg text-[#1F3A5F] font-light leading-relaxed max-w-xl">
            {t('organizacion.descripcion')}
          </p>
        </div>

        {/* COLUMNA DERECHA: REPRODUCTOR DE VIDEO */}
        <div 
          ref={videoContainerRef}
          className="w-full aspect-[4/3] bg-[#1F3A5F]/10 overflow-hidden shadow-2xl order-1 md:order-2 rounded-sm border border-[#13263F]/5"
        >
          <video
            src="/path-to-your-about-video.mp4" // <-- Reemplazar por el video real
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>

      </div>
    </section>
  );
}