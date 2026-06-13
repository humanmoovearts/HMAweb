import React, { useRef } from 'react';

// 1. COMPONENTE INDIVIDUAL: MaestroCard (Proporciones idénticas a tu captura de pantalla móvil)
export function MaestroCard({ name, role, image, bio }) {
  return (
    <div className="gsap-maestro-card relative w-[82vw] sm:w-[320px] h-[510px] md:h-[550px] rounded-[45px] p-7 flex flex-col items-center justify-start text-white overflow-hidden bg-white/[0.04] backdrop-blur-2xl border border-white/10 shadow-[inset_0_1.5px_3px_rgba(255,255,255,0.2),0_20px_40px_rgba(0,0,0,0.2)] hover:scale-[1.01] transition-all duration-500 group shrink-0">
      
      {/* Destellos internos de color "Aura" */}
      <div className="absolute -top-16 -right-16 w-44 h-44 bg-[#E88973]/10 rounded-full blur-2xl pointer-events-none transition-transform duration-700 group-hover:translate-x-3" />
      <div className="absolute -bottom-16 -left-16 w-44 h-44 bg-[#9FB7A7]/10 rounded-full blur-2xl pointer-events-none transition-transform duration-700 group-hover:-translate-x-3" />

      {/* Contenedor de Foto - Proporcionado al nuevo alto esbelto */}
      <div className="relative z-10 w-28 h-28 md:w-32 md:h-32 mt-4 mb-2 flex items-center justify-center shrink-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#8B7AA8]/40 to-[#E88973]/30 rounded-full blur-md opacity-80 group-hover:scale-110 transition-transform duration-500" />
        <div className="relative w-[100px] h-[100px] md:w-[115px] md:h-[115px] rounded-full overflow-hidden border border-white/20 shadow-inner bg-[#13263F]/20">
          <img 
            src={image || "/api/placeholder/150/150"} 
            alt={name} 
            className="w-full h-full object-cover grayscale contrast-125 mix-blend-luminosity group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
          />
        </div>
      </div>

      {/* Textos y Semblanza - Organizados de arriba hacia abajo con espaciados limpios */}
      <div className="relative z-10 text-center w-full flex flex-col pt-4 space-y-4 overflow-hidden">
        <div>
          <h4 className="text-base md:text-lg font-bold tracking-wide font-sans text-[#F4F1ED]">
            {name}
          </h4>
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-[#E88973] font-medium mt-1">
            {role}
          </p>
        </div>
        
        {/* Texto largo con line-clamp extendido aprovechando la altura de la tarjeta */}
        <p className="text-[12px] leading-relaxed text-white/70 font-light tracking-wide px-2 overflow-y-auto scrollbar-none line-clamp-[9] md:line-clamp-[10] group-hover:text-white/90 transition-colors duration-300">
          {bio}
        </p>
      </div>
    </div>
  );
}

// 2. COMPONENTE PRINCIPAL: Sección de Maestros
export default function MaestrosSection() {
  const scrollContainerRef = useRef(null);

  const listaMaestros = [
    {
      name: "Valeria Mendiola",
      role: "Expresión Corporal",
      image: "", 
      bio: "Especialista en danza contemporánea enfocada en la reconexión motriz y la consciencia del espacio. Su práctica fusiona el movimiento orgánico con el desbloqueo emocional a través del cuerpo."
    },
    {
      name: "Adrián Sotelo",
      role: "Movimiento Fluido",
      image: "", 
      bio: "Investigador del movimiento humano y la biomecánica aplicada al arte escénico. Dedicado a guiar a las personas hacia un estado de equilibrio dinámico utilizando técnicas de improvisación."
    },
    {
      name: "Elena Rostova",
      role: "Consciencia Plena",
      image: "", 
      bio: "Creadora de metodologías que entrelazan el control mental con la flexibilidad de la columna. Cree fielmente que la energía corporal es el puente directo hacia la calma interior."
    }
  ];

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const cardWidth = 300; 
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="maestros" className="relative w-full h-screen min-h-[680px] bg-[#8B7AA8] flex flex-col justify-start items-center overflow-hidden px-6 md:px-12 lg:px-20 pt-12 md:pt-16 lg:pt-20 pb-8 select-none">
      
      {/* Auras gigantes de fondo */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#C46A4A]/20 blur-[120px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#1F3A5F]/30 blur-[140px] mix-blend-multiply pointer-events-none" />

      {/* Contenedor estructural idéntico al de Contenido */}
      <div className="max-w-7xl mx-auto w-full h-full flex flex-col justify-start relative z-10 max-h-[85vh]">
        
        {/* TÍTULO SECCIÓN - Estilo idéntico a Contenido */}
        <div className="w-full flex justify-end mb-4 shrink-0">
          <h2 className="text-white text-4xl md:text-6xl font-black tracking-wide uppercase opacity-95">
            Nuestros Maestros
          </h2>
        </div>

        {/* CONTENEDOR DE TARJETAS CENTRADAS VERTICALMENTE 
            Ahora con las nuevas dimensiones estilizadas y esbeltas heredadas de la captura
        */}
        <div 
          ref={scrollContainerRef}
          className="w-full flex-grow flex items-center overflow-x-auto space-x-6 snap-x snap-mandatory scrollbar-none px-2 justify-start"
        >
          {listaMaestros.map((maestro, index) => (
            <div key={index} className="snap-center shrink-0 flex justify-center">
              <MaestroCard
                name={maestro.name}
                role={maestro.role}
                image={maestro.image}
                bio={maestro.bio}
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