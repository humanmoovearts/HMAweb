import React from 'react';
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

  return (
    /* Forzamos h-screen estricto y overflow-y-hidden para bloquear cualquier scroll hacia abajo */
    <section id="contenido" className="relative w-full h-screen max-h-screen flex items-center overflow-y-hidden overflow-x-hidden bg-gradient-to-br from-[#776c95] via-[#a36872] to-[#b35e46] py-6 md:py-12">
      
      {/* DESTELLO ORGÁNICO EN EL CENTRO */}
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[300px] bg-gradient-to-r from-red-600 via-orange-500 to-transparent rounded-full blur-[80px] opacity-70 mix-blend-color-dodge pointer-events-none" />

      {/* Cambiamos a un layout flex vertical para distribuir título y tarjetas matemáticamente */}
      <div className="max-w-7xl mx-auto w-full h-full flex flex-col justify-center px-6 md:px-12 lg:px-20 relative z-10 overflow-hidden">
        
        {/* TÍTULO SECCIÓN (Reducimos margen inferior para ganar espacio) */}
        <div className="w-full flex justify-end mb-6 md:mb-10 shrink-0">
          <h2 className="text-white text-4xl md:text-6xl font-black tracking-wide uppercase opacity-95 select-none">
            Contenido
          </h2>
        </div>

        {/* CONTENEDOR FLUIDO CON SCROLL HORIZONTAL */}
        <div className="flex overflow-x-auto pb-4 pt-2 space-x-6 snap-x snap-mandatory scrollbar-none shrink-0 lg:space-x-8">
          {modulosData.map((modulo, index) => (
            <div key={index} className="snap-center shrink-0 w-[85vw] sm:w-[340px]">
              <CardModulo 
                year={modulo.year}
                title={modulo.title}
                text={modulo.text}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}