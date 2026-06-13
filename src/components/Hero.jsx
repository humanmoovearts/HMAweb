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
<a 
  href="#inversion" 
  className="relative inline-block text-center px-10 py-3.5 rounded-full bg-white/[0.06] backdrop-blur-xl text-xs md:text-sm tracking-widest uppercase font-bold text-white transition-all duration-300 shadow-[inset_0_1.5px_3px_rgba(255,255,255,0.3),inset_0_-1px_2px_rgba(0,0,0,0.4),0_10px_25px_-5px_rgba(0,0,0,0.3)] hover:bg-white/[0.12] hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),0_15px_30px_-5px_rgba(62,74,100,0.4)] group overflow-hidden"
>
  {/* Borde exterior hiper-suave que imita el halo líquido de la tarjeta */}
  <span className="absolute inset-0 rounded-full border border-white/20 pointer-events-none opacity-80" />
  <span className="absolute inset-[-2px] rounded-full border-2 border-[#3e4a64]/30 blur-[1px] pointer-events-none" />
  
  {/* Reflejo de luz interno */}
  <span className="absolute top-0 left-1/2 -translate-x-1/2 w-[85%] h-[40%] bg-gradient-to-b from-white/[0.15] to-transparent rounded-full blur-[1px] pointer-events-none" />
  
  <span className="relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
    Inscribirme
  </span>
</a>
      </div>

      {/* AVAL BUAP (ESQUINA INFERIOR DERECHA) */}
      <div className="absolute bottom-8 right-6 md:right-12 z-20 flex items-center space-x-3 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/5">
        <span className="text-[10px] md:text-xs tracking-wider uppercase font-light text-gray-300">
          Avalado por la BUAP
        </span>
        <img 
          src="LogoBuap.png" 
          alt="Logo BUAP" 
          className="h-8 w-auto object-contain brightness-0 invert opacity-90"
        />
      </div>

    </section>
  );
}