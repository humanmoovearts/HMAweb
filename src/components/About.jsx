import React from 'react';
import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();

  return (
    <section 
      id="quienes-somos" 
      style={{ fontFamily: "var(--font-darker, 'Darker Grotesque', sans-serif)" }}
      className="bg-[#F4F1ED] text-[#13263F] py-16 px-6 md:py-24 md:px-12 lg:px-20 min-h-screen flex items-center"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* COLUMNA IZQUIERDA: TEXTOS */}
        <div className="flex flex-col justify-center order-2 md:order-1">
          {/* Frase principal / Filosofía de la organización */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#13263F] to-[#C46A4A] leading-tight mb-8 md:mb-12">
            "{t('organizacion.filosofia.lema_fundamental')}"
          </h2>
          
          {/* Párrafo descriptivo principal */}
          <p className="text-base md:text-lg text-[#1F3A5F] font-light leading-relaxed max-w-xl">
            {t('organizacion.descripcion')}
          </p>
        </div>

        {/* COLUMNA DERECHA: REPRODUCTOR DE VIDEO */}
        <div className="w-full aspect-[4/3] bg-[#1F3A5F]/10 overflow-hidden shadow-2xl order-1 md:order-2 rounded-sm border border-[#13263F]/5">
          <video
            src="/path-to-your-about-video.mp4" // <-- Recuerda colocar el video correcto en tu carpeta public o assets
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