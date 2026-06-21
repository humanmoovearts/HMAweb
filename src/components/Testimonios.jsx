import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

// Diccionario local para traducir los textos que no están en el JSON global
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

  // Detectamos el idioma actual (con fallback a 'es' si no se reconoce)
  const idiomaActual = i18n.language?.startsWith('en') ? 'en' : 'es';
  const textos = textosLocales[idiomaActual];

  const goTo = useCallback((index, dir = 'next') => {
    if (animating) return;
    setAnimating(true);
    setDirection(dir);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 400);
  }, [animating]);

  const next = useCallback(() => {
    goTo((current + 1) % total, 'next');
  }, [current, total, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const index = current;
  const rating = Math.round(parseFloat(t(`testimonios.${index}.calificacion`)) || 5);
  
  const autorName = t(`testimonios.${index}.autor`) || '';

  // Control manual estricto según tus archivos reales en disco (.jpeg)
  const getFotoUrl = (name) => {
    const nameClean = name.trim();
    if (nameClean.toUpperCase().includes('SADALI')) {
      return '/testimonios/SADALI K..jpeg'; // Doble punto exacto
    }
    if (nameClean.toLowerCase().includes('anel')) {
      return '/testimonios/Anel De Rodrigo.jpeg';
    }
    if (nameClean.toLowerCase().includes('brenda')) {
      return '/testimonios/Brenda ArSa.jpeg';
    }
    if (nameClean.toLowerCase().includes('finn')) {
      return '/testimonios/FINN.jpeg';
    }
    if (nameClean.toLowerCase().includes('pato')) {
      return '/testimonios/Pato.jpeg';
    }
    return '/HMA.png';
  };

  const slideStyle = {
    transition: animating ? 'none' : 'opacity 0.4s ease, transform 0.4s ease',
    opacity: animating ? 0 : 1,
    transform: animating
      ? `translateX(${direction === 'next' ? '30px' : '-30px'})`
      : 'translateX(0)',
  };

  return (
    <section
      id="testimonios"
      className="bg-[#1F3A5F] text-[#F4F1ED] py-20 px-6 md:py-28 md:px-12 lg:px-20 min-h-screen flex items-center font-['Darker_Grotesque',_sans-serif]"
    >
      <div className="max-w-4xl mx-auto w-full">

        {/* TÍTULO TRADUCIDO LOCALMENTE */}
        <h2 className="text-4xl md:text-5xl font-bold tracking-wider uppercase mb-16 pl-2 text-[#F4F1ED] font-['Helvetica',_sans-serif]">
          {textos.titulo}
        </h2>

        {/* CARRUSEL */}
        <div className="relative">

          {/* TARJETA TESTIMONIO */}
          <div
            style={slideStyle}
            className="flex flex-col sm:flex-row gap-8 items-center sm:items-start w-full min-h-[220px]"
          >
            {/* FOTO CIRCULAR */}
            <div className="w-32 h-32 md:w-40 md:h-40 shrink-0 bg-[#13263F] overflow-hidden border-2 border-[#F4F1ED]/20 rounded-full shadow-2xl flex items-center justify-center">
              <img
                src={getFotoUrl(autorName)}
                alt={autorName}
                className="w-full h-full object-cover grayscale brightness-110 contrast-105 transition-all duration-300 hover:grayscale-0"
                onError={(e) => { 
                  e.target.src = '/HMA.png'; 
                }}
              />
            </div>

            {/* TEXTO */}
            <div className="flex flex-col justify-between h-full pt-1 flex-1 text-center sm:text-left w-full">
              <div>
                <h3 className="text-2xl font-bold tracking-wide text-[#F4F1ED] mb-1 font-['Helvetica',_sans-serif]">
                  {autorName}
                </h3>

                {/* ETIQUETA TRADUCIDA LOCALMENTE */}
                <p className="text-sm text-[#E88973] font-semibold tracking-widest uppercase mb-4">
                  {textos.etiquetaEgresado}
                </p>

                <p className="text-lg leading-relaxed text-[#F4F1ED]/80 font-light tracking-wide mb-6 max-w-lg mx-auto sm:mx-0">
                  "{t(`testimonios.${index}.resumen`)}"
                </p>
              </div>

              {/* ESTRELLAS */}
              <div className="flex items-center justify-center sm:justify-start space-x-1 text-[#E88973]">
                {[...Array(rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>

          {/* CONTROLES (SÓLO DOTS CIRCULARES) */}
          <div className="flex items-center justify-center sm:justify-start mt-12 pl-2">
            <div className="flex items-center gap-3">
              {totalTestimonios.map((i) => (
                <button
                  key={i}
                  onClick={() => goTo(i, i > current ? 'next' : 'prev')}
                  aria-label={`Ir al testimonio ${i + 1}`}
                  className="transition-all duration-300 relative"
                  style={{
                    width: i === current ? '28px' : '10px',
                    height: '10px',
                    borderRadius: '5px',
                    background: i === current ? '#E88973' : 'rgba(244,241,237,0.25)',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  <span className="absolute -top-3 -bottom-3 -left-2 -right-2 bg-transparent block" />
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}