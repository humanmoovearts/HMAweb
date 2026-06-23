import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';

export default function Hero() {
  const { t } = useTranslation();
  const heroRef = useRef(null);
  
  const word1 = "Human";
  const word2 = "Moovearts";

useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Bloqueamos el scroll de la página durante la intro cinemática
      gsap.set(document.body, { overflow: 'hidden' });

      // 1. Entrada Letra por Letra sobre el fondo blanco
      tl.fromTo('.hero-char', 
        { 
          opacity: 0, 
          y: 45,
          scale: 0.9
        }, 
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 1.1,
          stagger: 0.06,
        }
      )
      // 2. Fundido suave de la cortina blanca
      .to('.hero-white-loader', {
        opacity: 0,
        pointerEvents: 'none',
        duration: 1.4,
        ease: 'power2.inOut'
      }, '+=0.2')
      
      // 3. Restauramos el scroll del sitio
      .set(document.body, { overflow: 'auto' })

      // 4. Revelación escalonada de los elementos editoriales
      .fromTo('.anim-badge', 
        { opacity: 0, y: -25 }, 
        { opacity: 1, y: 0, duration: 0.8 },
        '-=1.2'
      )
      .fromTo('.anim-tagline', 
        { opacity: 0, y: 25 }, 
        { opacity: 1, y: 0, duration: 1.1 }, 
        '-=1.0'
      )
      .fromTo('.anim-cta', 
        { opacity: 0, scale: 0.93 }, 
        { opacity: 1, scale: 1, duration: 0.8 }, 
        '-=0.9'
      )
      // ENTRADA INICIAL DEL DIAGRAMA: Aparece y toma posición
      .fromTo('.anim-bg-diagram', 
        { opacity: 0, scale: 0.85, rotate: -15 }, 
        { 
          opacity: 0.15, 
          scale: 1, 
          rotate: 0, 
          duration: 1.8, 
          ease: 'power2.out',
          // TRUCO MAESTRO: Cuando termine de entrar, disparamos el giro infinito
          onComplete: () => {
            gsap.to('.anim-bg-diagram', {
              rotate: 360,          // Giro completo
              duration: 45,         // Súper suave (45 segundos por vuelta) para que sea hipnótico y elegante
              repeat: -1,           // Infinito
              ease: 'none'          // Velocidad constante sin tirones
            });
          }
        }, 
        '-=1.4'
      )
      .fromTo('.anim-footer', 
        { opacity: 0, x: 25 }, 
        { opacity: 1, x: 0, duration: 0.8 }, 
        '-=1.0'
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // RENDERIZADOR UNIFICADO: Ambas capas comparten exactamente el mismo layout, paddings y clases
  const renderLayoutContent = (isIntroLayer) => (
    <section className={`absolute inset-0 flex min-h-screen w-full flex-col items-center justify-between px-6 pt-16 pb-8 md:px-12 md:pt-24 md:pb-12 antialiased font-helvetica ${isIntroLayer ? 'hero-white-loader z-50 bg-[#F4F1ED]' : 'bg-fluid-art text-hueso z-10'}`}>
      
      <div className={isIntroLayer ? 'film-grain opacity-5' : 'film-grain'} />

      {/* DIAGRAMA GEOMÉTRICO (Solo en la capa real para evitar duplicidad visual) */}
      {!isIntroLayer && (
        <div className="anim-bg-diagram absolute top-1/2 left-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 opacity-0 md:h-[600px] md:w-[600px]">
          <svg viewBox="0 0 300 300" className="h-full w-full fill-none stroke-hueso" strokeWidth="0.5">
            <circle cx="150" cy="110" r="65" strokeDasharray="2 2" />
            <circle cx="105" cy="180" r="65" />
            <circle cx="195" cy="180" r="65" />
            <line x1="150" y1="20" x2="150" y2="280" />
            <line x1="20" y1="150" x2="280" y2="150" />
          </svg>
        </div>
      )}

      {/* BLOQUE SUPERIOR: Cápsula de Estado con colchón controlado */}
      <div className={`w-full flex justify-center pt-4 shrink-0 relative z-20 ${isIntroLayer ? 'opacity-0 invisible' : 'anim-badge opacity-0'}`}>
        <div className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-1.5 shadow-[0_4px_15px_rgba(0,0,0,0.1)] backdrop-blur-md">
          <span className="font-oswald text-[10px] font-medium uppercase tracking-wildest block whitespace-nowrap sm:text-xs md:tracking-[0.35em]">
            {t('hero.statusOpen', 'Inscripciones Abiertas')}
          </span>
        </div>
      </div>

      {/* BLOQUE CENTRAL: Título Máster y Lema Editorial */}
      <div className="w-full max-w-4xl flex flex-col items-center justify-center text-center my-auto py-4 relative z-10 select-none">
        <h1 className="font-helvetica text-3xl font-normal uppercase tracking-[0.35em] leading-none w-full pl-[0.35em] sm:text-5xl md:text-6xl lg:text-7xl flex flex-col items-center justify-center gap-y-3 sm:gap-y-6 mb-6 md:mb-8 text-white">
          
          {/* Renglón 1: Human */}
          <span className="h-9 sm:h-14 md:h-16 lg:h-20 flex items-center justify-center whitespace-nowrap">
            {word1.split("").map((char, charIndex) => (
              <span 
                key={charIndex} 
                className={`inline-block ${isIntroLayer ? 'hero-char opacity-0 bg-gradient-to-r from-[#1F3A5F] to-[#E88973] bg-clip-text text-transparent font-bold' : 'text-white font-normal'}`}
                style={isIntroLayer ? { WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' } : {}}
              >
                {char}
              </span>
            ))}
          </span>

          {/* Renglón 2: Moovearts */}
          <span className="h-9 sm:h-14 md:h-16 lg:h-20 flex items-center justify-center whitespace-nowrap">
            {word2.split("").map((char, charIndex) => (
              <span 
                key={charIndex} 
                className={`inline-block ${isIntroLayer ? 'hero-char opacity-0 bg-gradient-to-r from-[#E88973] to-[#C46A4A] bg-clip-text text-transparent font-bold' : 'text-white font-normal'}`}
                style={isIntroLayer ? { WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' } : {}}
              >
                {char}
              </span>
            ))}
          </span>

        </h1>

        {/* Lema Editorial Centrado */}
        <p className={`font-darker text-base sm:text-lg md:text-xl italic tracking-wide max-w-xl leading-relaxed text-center w-full block ${isIntroLayer ? 'text-transparent select-none' : 'anim-tagline text-hueso/90 opacity-0'}`}>
          {t('hero.tagline', '"Quédate con nosotros porque aquí seguimos en movimiento"')}
        </p>
      </div>

      {/* BLOQUE INFERIOR: Botón CTA y Aval BUAP */}
      <div className="w-full flex flex-col items-center gap-y-12 shrink-0 relative z-20 pb-4">
        
        {/* Botón CTA */}
        <a 
          href="#inversion" 
          className={`relative inline-block overflow-hidden rounded-full px-10 py-3.5 text-center text-xs font-bold uppercase tracking-widest shadow-[inset_0_1.5px_3px_rgba(255,255,255,0.3),inset_0_-1px_2px_rgba(0,0,0,0.4),0_10px_25px_-5px_rgba(0,0,0,0.3)] transition-all duration-300 backdrop-blur-xl md:text-sm ${isIntroLayer ? 'bg-transparent text-transparent border-transparent pointer-events-none shadow-none select-none' : 'anim-cta bg-white/[0.06] text-white hover:bg-white/12 opacity-0'}`}
        >
          <span className={`absolute inset-0 rounded-full border pointer-events-none ${isIntroLayer ? 'border-transparent' : 'border-white/20 opacity-80'}`} />
          <span className={isIntroLayer ? '' : 'relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]'}>
            {t('hero.cta', 'Inscribirme')}
          </span>
        </a>

        {/* Aval BUAP */}
        <div className="w-full flex justify-center md:justify-end">
          <div className={`border border-white/10 bg-black/20 shadow-[0_4px_12px_rgba(0,0,0,0.15)] flex items-center space-x-3 rounded-full px-5 py-2 backdrop-blur-md ${isIntroLayer ? 'opacity-0 invisible' : 'anim-footer opacity-0'}`}>
            <span className="font-helvetica text-[9px] font-light uppercase tracking-wider md:text-[10px]">
              {t('hero.certified', 'Avalado por la BUAP')}
            </span>
            <img 
              src="/LogoBuap.png" 
              alt="Logo BUAP" 
              className="h-7 w-auto object-contain brightness-0 invert opacity-90"
            />
          </div>
        </div>

      </div>

    </section>
  );

  return (
    <div ref={heroRef} className="relative w-full min-h-screen overflow-hidden select-none bg-fluid-art text-hueso">
      {/* Capa 1: Clon Superior de Intro (Fondo Blanco, Letras con Gradiente) */}
      {renderLayoutContent(true)}

      {/* Capa 2: Capa Inferior Definitiva (Fondo Oscuro, Elementos Blancos) */}
      {renderLayoutContent(false)}
    </div>
  );
}