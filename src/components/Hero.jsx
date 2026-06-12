import React from 'react';

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center text-white overflow-hidden">
      
      {/* VIDEO DE FONDO */}
      <div className="absolute inset-0 z-0">
        <video
          src="/path-to-your-video.mp4" // <-- Cambia esto por la ruta de tu video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        {/* Capa oscura (overlay) para que el texto resalte y tenga el look cinemático de la foto */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* CONTENIDO CENTRAL */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 select-none">
        <h1 className="text-4xl md:text-7xl lg:text-8xl font-light tracking-[0.2em] uppercase mb-8">
          Human Moovearts
        </h1>
        
        {/* BOTÓN DIFUMINADO (FROSTED GLASS EFFECT) */}
        <button className="px-10 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs md:text-sm tracking-widest uppercase hover:bg-white/20 transition-all duration-300 shadow-lg">
          Inscribirme
        </button>
      </div>

      {/* AVAL BUAP (ESQUINA INFERIOR DERECHA) */}
      <div className="absolute bottom-8 right-6 md:right-12 z-20 flex items-center space-x-3 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/5">
        <span className="text-[10px] md:text-xs tracking-wider uppercase font-light text-gray-300">
          Avalado por la BUAP
        </span>
        <img 
          src="/path-to-buap-logo.png" // <-- Cambia esto por la ruta del logo de la BUAP
          alt="Logo BUAP" 
          className="h-8 w-auto object-contain brightness-0 invert opacity-90"
        />
      </div>

    </section>
  );
}