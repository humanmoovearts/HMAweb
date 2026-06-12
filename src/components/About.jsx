import React from 'react';

export default function About() {
  return (
    <section id="quienes-somos" className="bg-[#f4f0eb] text-[#2c2c2c] py-16 px-6 md:py-24 md:px-12 lg:px-20 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* COLUMNA IZQUIERDA: TEXTOS */}
        <div className="flex flex-col justify-center order-2 md:order-1">
          {/* Frase principal con gradiente sutil y tipografía destacada */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#5a3d5c] to-[#bc6c58] leading-tight mb-8 md:mb-12">
            "Creemos que el cuerpo, la mente y el entorno social no pueden entenderse por separado.".
          </h2>
          
          {/* Párrafo descriptivo secundario */}
          <p className="text-sm md:text-base text-gray-700 font-light leading-relaxed max-w-xl">
            Soy una organización educativa interdisciplinaria que integra psicología, 
            artes escénicas y ciencias sociales para generar experiencias formativas que 
            conectan cuerpo, mente y sociedad. Más que cursos, creo espacios de 
            investigación, comunidad y transformación humana.
          </p>
        </div>

        {/* COLUMNA DERECHA: REPRODUCTOR DE VIDEO */}
        <div className="w-full aspect-[4/3] bg-neutral-200 overflow-hidden shadow-2xl order-1 md:order-2 rounded-sm">
          <video
            src="/path-to-your-about-video.mp4" // <-- Reemplaza con la ruta de tu video
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