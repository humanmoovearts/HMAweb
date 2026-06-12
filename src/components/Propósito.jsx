import React, { useState } from 'react';

export default function Proposito() {
  // 1. Estado local para controlar el índice de la galería de fotos
  const [currentImg, setCurrentImg] = useState(0);

  // Coloca aquí las rutas de tus imágenes para la galería
  const galeriaFotos = [
    "/path-to-your-photo1.jpg", // Foto inicial (la que se ve en la captura)
    "/path-to-your-photo2.jpg",
    "/path-to-your-photo3.jpg",
    "/path-to-your-photo4.jpg",
  ];

  // Funciones de navegación para la galería
  const nextSlide = () => {
    setCurrentImg((prev) => (prev === galeriaFotos.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentImg((prev) => (prev === 0 ? galeriaFotos.length - 1 : prev - 1));
  };

  return (
    <section id="perfil-egresado" className="bg-[#f4f0eb] text-[#1e2d3d] py-16 px-6 md:py-24 md:px-12 lg:px-20 min-h-screen flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-stretch w-full">
        
        {/* COLUMNA IZQUIERDA: GALERÍA DE FOTOS INTERACTIVA */}
        <div className="relative w-full aspect-[4/3] md:aspect-auto bg-neutral-200 overflow-hidden rounded-sm group min-h-[350px] md:min-h-[550px]">
          
          {/* Imagen Activa con transición suave */}
          <img 
            src={galeriaFotos[currentImg]} 
            alt={`Galería Human Mooveart ${currentImg + 1}`} 
            className="w-full h-full object-cover transition-all duration-700 ease-in-out"
          />

          {/* CAPA DE CONTROLADORES FLOTANTES (Se vuelven visibles al pasar el cursor) */}
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between px-4 pointer-events-none">
            
            {/* Flecha Izquierda */}
            <button 
              onClick={prevSlide}
              className="pointer-events-auto w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/40 transition-all shadow-md"
              aria-label="Anterior foto"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Flecha Derecha */}
            <button 
              onClick={nextSlide}
              className="pointer-events-auto w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/40 transition-all shadow-md"
              aria-label="Siguiente foto"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* INDICADOR DE POSICIÓN DE LA GALERÍA (Esquina inferior derecha) */}
          <div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-sm text-white px-3 py-1 rounded text-[10px] font-mono tracking-widest uppercase">
            {currentImg + 1} / {galeriaFotos.length}
          </div>
        </div>

        {/* COLUMNA DERECHA: TEXTOS (PROPÓSITO Y METODOLOGÍA) */}
        <div className="flex flex-col justify-center space-y-12 py-4">
          
          {/* LÍNEA DIVISORIA SUPERIOR */}
          <div className="border-t border-[#1e2d3d]/10 pt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <h3 className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[#1e2d3d]/80">
              Propósito
            </h3>
            <p className="sm:col-span-2 text-xs md:text-[13px] leading-relaxed font-light text-gray-700 tracking-wide">
              "Construimos comunidad a través del conocimiento compartido y tendemos un puente entre la teoría y la experiencia, convirtiendo la introspección en movimiento y el movimiento en conciencia social para generar un desarrollo humano profundo con impacto real."
            </p>
          </div>

          {/* LÍNEA DIVISORIA INTERMEDIA */}
          <div className="border-t border-[#1e2d3d]/10 pt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <h3 className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[#1e2d3d]/80">
              Metodología
            </h3>
            <p className="sm:col-span-2 text-xs md:text-[13px] leading-relaxed font-light text-gray-700 tracking-wide">
              "Apostamos por el pensamiento crítico, la investigación y el arte como herramientas reales de transformación humana y colectiva."
            </p>
          </div>

          {/* LÍNEA DIVISORIA INFERIOR (Para cerrar el bloque armónicamente) */}
          <div className="border-b border-[#1e2d3d]/10 pb-4" />

        </div>

      </div>
    </section>
  );
}