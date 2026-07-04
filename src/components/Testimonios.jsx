import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const textosLocales = {
  es: {
    titulo: 'Testimonios',
    etiquetaEgresado: 'Egresadx HMA'
  },
  en: {
    titulo: 'Testimonials',
    etiquetaEgresado: 'HMA Alum'
  }
};

export default function Testimonios() {
  const { t, i18n } = useTranslation();
  const totalTestimonios = [0, 1, 2, 3, 4];
  const total = totalTestimonios.length;

  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState('next');

  const idiomaActual = i18n.language?.startsWith('en') ? 'en' : 'es';
  const textos = textosLocales[idiomaActual];

  const goTo = useCallback((index, dir = 'next') => {
    if (animating) return;
    setAnimating(true);
    setDirection(dir);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 300);
  }, [animating]);

  const next = useCallback(() => {
    goTo((current + 1) % total, 'next');
  }, [current, total, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [next]);

  const index = current;
  const rating = Math.round(parseFloat(t(`testimonios.${index}.calificacion`)) || 5);
  const autorName = t(`testimonios.${index}.autor`) || '';

  const getFotoUrl = (name) => {
    const nameClean = name.trim();
    if (nameClean.toUpperCase().includes('SADALI')) return '/testimonios/Sadali K.jpeg';
    if (nameClean.toLowerCase().includes('anel')) return '/testimonios/Anel De Rodrigo.jpeg';
    if (nameClean.toLowerCase().includes('brenda')) return '/testimonios/Brenda ArSa.jpeg';
    if (nameClean.toLowerCase().includes('finn')) return '/testimonios/Finn.jpeg';
    if (nameClean.toLowerCase().includes('pato')) return '/testimonios/Pato.jpeg';
    return '/HMA.png';
  };

  return (
    <section
      id="testimonios"
      className="relative block w-full min-h-screen bg-[#1F3A5F] text-[#F4F1ED] font-['Darker_Grotesque',_sans-serif] clear-both z-10"
    >
      {/* Contenedor principal con padding real para empujar layouts y evitar que se meta lo de arriba */}
      <div className="w-full max-w-4xl mx-auto px-6 pt-32 pb-20 md:pt-40 md:pb-28 flex flex-col justify-center min-h-screen">
        
        {/* TÍTULO */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wider uppercase mb-12 text-left font-['Helvetica',_sans-serif] block w-full border-b border-[#F4F1ED]/10 pb-4">
          {textos.titulo}
        </h2>

        {/* CONTENEDOR DEL SLIDE - Cambiado a bloque con altura mínima controlada para que el inspector lo lea perfecto */}
        <div className="relative block w-full min-h-[380px] sm:min-h-[260px] md:min-h-[220px]">
          
          <div
            className={`w-full flex flex-col sm:flex-row gap-6 md:gap-10 items-center sm:items-start transition-all duration-300 ease-in-out ${
              animating 
                ? 'opacity-0 translate-x-4 pointer-events-none' 
                : 'opacity-100 translate-x-0'
            }`}
          >
            {/* FOTO */}
            <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 shrink-0 bg-[#13263F] overflow-hidden border-2 border-[#F4F1ED]/20 rounded-full shadow-2xl flex items-center justify-center">
              <img
                src={getFotoUrl(autorName)}
                alt={autorName}
                className="w-full h-full object-cover brightness-110 contrast-105"
                onError={(e) => { e.target.src = '/HMA.png'; }}
              />
            </div>

            {/* CUERPO TEXTO */}
            <div className="flex flex-col flex-1 text-center sm:text-left w-full h-full justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-wide text-[#F4F1ED] font-['Helvetica',_sans-serif]">
                  {autorName}
                </h3>

                <p className="text-xs sm:text-sm text-[#E88973] font-semibold tracking-widest uppercase mt-1 mb-3">
                  {textos.etiquetaEgresado}
                </p>

                <p className="text-base sm:text-lg md:text-xl leading-relaxed text-[#F4F1ED]/90 font-light tracking-wide italic mb-4">
                  "{t(`testimonios.${index}.resumen`)}"
                </p>
              </div>

              {/* ESTRELLAS */}
              <div className="flex items-center justify-center sm:justify-start space-x-1 text-[#E88973] mt-2">
                {[...Array(rating)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* DOTS AFUERA DEL FLUJO ABSOLUTO PARA NO COLAPSAR EL ALTO */}
        <div className="flex items-center justify-center sm:justify-start mt-8 w-full">
          <div className="flex items-center gap-2.5">
            {totalTestimonios.map((i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > current ? 'next' : 'prev')}
                aria-label={`Ir al testimonio ${i + 1}`}
                className="transition-all duration-300 h-2 rounded-full"
                style={{
                  width: i === current ? '28px' : '9px',
                  background: i === current ? '#E88973' : 'rgba(244,241,237,0.25)',
                }}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}