import React, { useRef } from 'react';
import CardModulo from './CardModulo.jsx';

export default function Contenido() {
  const modulosData = [
    {
      year: "2026",
      title: "Modulo 1",
      text: "Bienestar Integral, Subjetividad y Pensamiento Crítico. Clases: Bienvenida e introducción; Bienestar integral; Identidad, género y desarrollo humano; Cuerpo, danza y arte."
    },
    {
      year: "2026",
      title: "Modulo 2",
      text: "Corporalidad, Producción de Subjetividad y Resistencia. Clases: Composición en la danza para procesos colectivos; Psicoanálisis del arte: movimiento, cuerpo, psique y subjetividad; Arte, cuerpo y memoria: la corporalidad como territorio de la memoria; Danza terapia y juego: el juego como camino a la sanación; Expresión corporal y biodanza."
    },
    {
      year: "2026",
      title: "Modulo 3",
      text: "Corporalidad y Subjetividades desde los Cuidados. Clases: Corporalidades y autocuidado: autocuidado, gozo y colectividad; Cuerpo y salud mental: el cuerpo como espejo de las emociones; Cuidado colectivo y redes de apoyo: tejiendo comunidad desde la empatía y la solidaridad; Expresión artística y resiliencia: el arte como medio de transformación; Movimiento y conciencia corporal: técnicas de respiración y relajación."
    },
    {
      year: "2026",
      title: "Modulo 4",
      text: "Gestión de Proyectos Artísticos y Comunitarios. Clases: Herramientas para la creación de proyectos interdisciplinarios; Vinculación social y territorio; Sostenibilidad, financiamiento y economías alternativas en las artes escénicas."
    },
    {
      year: "2026",
      title: "Modulo 5",
      text: "Laboratorio de Creación e Investigación Corporal. Clases: Integración de metodologías psicocorporales; Tutorías de proyectos finales; Presentación comunitaria, muestra colectiva, cierre y evaluación formativa de los egresados."
    }
  ];

  const scrollContainerRef = useRef(null);

  // Función para desplazar el contenedor con los botones de flecha
  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const cardWidth = 320; // Ancho base aproximado de la tarjeta + gap
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    /* Forzamos h-screen estricto y alineamos al inicio (justify-start) para empujar el título arriba */
    <section id="contenido" className="relative w-full h-screen min-h-[660px] flex flex-col justify-start items-center overflow-hidden bg-gradient-to-br from-[#776c95] via-[#a36872] to-[#b35e46] pt-12 md:pt-16 lg:pt-20 pb-8 select-none">
      
      {/* DESTELLO ORGÁNICO EN EL CENTRO */}
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[300px] bg-gradient-to-r from-red-600 via-orange-500 to-transparent rounded-full blur-[80px] opacity-70 mix-blend-color-dodge pointer-events-none" />

      {/* Contenedor limitador de Viewport (Previene desbordamientos y controla alturas) */}
      <div className="max-w-7xl mx-auto w-full h-full flex flex-col justify-start px-6 md:px-12 lg:px-20 relative z-10 max-h-[85vh]">
        
        {/* TÍTULO SECCIÓN - Fijado arriba a la derecha */}
        <div className="w-full flex justify-end mb-4 shrink-0">
          <h2 className="text-white text-4xl md:text-6xl font-black tracking-wide uppercase opacity-95">
            Contenido
          </h2>
        </div>

        {/* CONTENEDOR DE TARJETAS CENTRADAS VERTICALMENTE
            - flex-grow toma todo el espacio vertical sobrante.
            - items-center asegura que la fila completa de tarjetas flote justo al centro del viewport.
        */}
        <div 
          ref={scrollContainerRef}
          className="w-full flex-grow flex items-center overflow-x-auto space-x-6 snap-x snap-mandatory scrollbar-none px-2 justify-start"
        >
          {modulosData.map((modulo, index) => (
            <div key={index} className="snap-center shrink-0 w-[85vw] sm:w-[340px] flex justify-center">
              <CardModulo 
                year={modulo.year}
                title={modulo.title}
                text={modulo.text}
              />
            </div>
          ))}
        </div>

        {/* BOTONES DE NAVEGACIÓN (Estilo Liquid Frosted Glass) */}
        <div className="flex items-center justify-center space-x-4 mt-6 shrink-0">
          <button 
            onClick={() => handleScroll('left')}
            className="w-11 h-11 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/20 flex items-center justify-center text-white active:scale-95 transition-all shadow-[inset_0_1px_2px_rgba(255,255,255,0.3)] hover:bg-white/[0.12]"
            aria-label="Anterior"
          >
            <svg className="w-5 h-5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={() => handleScroll('right')}
            className="w-11 h-11 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/20 flex items-center justify-center text-white active:scale-95 transition-all shadow-[inset_0_1px_2px_rgba(255,255,255,0.3)] hover:bg-white/[0.12]"
            aria-label="Siguiente"
          >
            <svg className="w-5 h-5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}