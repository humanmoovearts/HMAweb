import React from 'react';

export default function CardModulo({ year, title, text }) {
  return (
    /* Cambiamos min-h-[500px] por h-[65vh] (ocupará el 65% del alto de la pantalla) */
    <div className="relative w-full max-w-[370px] h-[60vh] max-h-[500px] rounded-[50px] p-8 flex flex-col text-white overflow-hidden bg-white/[0.06] backdrop-blur-2xl border border-white/10 border-t-white/20 shadow-[inset_0_1px_2px_rgba(255,255,255,0.2),0_15px_35px_rgba(0,0,0,0.15)] group transition-all duration-500">
      
      {/* Sutil reflejo interno */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.01] to-white/[0.03] pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full overflow-hidden">
        {/* ENCABEZADO: Fijo en la parte superior */}
        <div className="mb-6 select-none shrink-0">
          <span className="block text-xs md:text-sm font-light italic opacity-90 tracking-wide mb-0.5">
            {year}
          </span>
          <h3 className="text-lg md:text-xl font-black tracking-wider uppercase text-gray-100">
            {title}
          </h3>
        </div>

        {/* DESCRIPCIÓN CON SCROLL INTERNO INTELIGENTE */}
        {/* 'overflow-y-auto' permite deslizar el texto si es muy largo sin romper la tarjeta */}
        <div className="overflow-y-auto pr-2 scrollbar-thin text-[11px] md:text-[12px] leading-relaxed text-gray-200 font-light tracking-wide opacity-95 ">
          <p>{text}</p>
        </div>
      </div>

    </div>
  );
}