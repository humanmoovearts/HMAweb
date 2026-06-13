import React from 'react';

export default function InversionCard({ title, inscription, items, isPolicy, buttonText }) {
  return (
    <div className="relative w-full max-w-[390px] min-h-[530px] rounded-[55px] p-9 flex flex-col justify-between text-white overflow-hidden bg-gradient-to-br from-[#243553] to-[#0c182c] transition-all duration-500 group border-t border-t-white/20">
      
      {/* 
        Efecto Liquid Glass / Brillo exterior e interior:
        Simulamos el halo difuminado de la imagen de referencia con sombras múltiples y bordes difusos.
      */}
      <div className="absolute inset-[-1px] rounded-[55px] border-4 border-[#3e4a64] blur-[3px] opacity-90 pointer-events-none" />
      <div className="absolute inset-[-10px] rounded-[65px] border-[12px] border-[#3e4a64] blur-[10px] opacity-70 pointer-events-none" />
      <div className="absolute inset-[-1px] rounded-[55px] border-l-4 border-l-white/10 blur-[1px] pointer-events-none" />

      {/* CONTENIDO */}
      <div className="relative z-10">
        <h3 className="text-[26px] font-extrabold tracking-tight mb-7 text-white font-sans">
          {title}
        </h3>
        
        {inscription && (
          <p className="text-[15px] font-bold tracking-tight mb-8 text-white font-sans">
            Inscripción: <span className="font-normal">{inscription}</span>
          </p>
        )}
        
        <div className="space-y-7 text-[15px] tracking-tight text-white/90 font-sans">
          {items.map((group, index) => (
            <div key={index} className="space-y-2">
              {group.subtitle && (
                <h4 className="text-[13px] font-bold tracking-wider uppercase text-white/90">
                  {group.subtitle}
                </h4>
              )}
              <ul className="space-y-2 opacity-95">
                {group.lines.map((line, lIndex) => {
                  const parts = line.split(':');
                  return (
                    <li key={lIndex} className={isPolicy ? "flex items-start" : ""}>
                      {isPolicy && <span className="mr-2 text-white/70 select-none">•</span>}
                      <span>
                        {parts[0]}
                        {parts[1] && (
                          <>:<span className="font-normal text-white"> {parts[1]}</span></>
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* BOTONES (Recreando exactamente el estilo de la imagen) */}
      <div className="relative z-10 flex items-center space-x-6 mt-10">
        <button className="border-2 border-[#b5ccbd] text-[13px] tracking-[0.1em] uppercase px-10 py-3.5 bg-transparent text-white hover:bg-[#b5ccbd] hover:text-[#0b1b33] transition-all duration-300 font-bold font-sans">
          {buttonText || 'COMPRAR'}
        </button>
        
        {!isPolicy && (
          <div className="w-[50px] h-[50px] border-2 border-[#b5ccbd] rounded-full flex items-center justify-center shrink-0 opacity-100 hover:scale-105 transition-transform duration-300">
            {/* SVG del símbolo del dólar estilizado como en la referencia */}
            <svg className="w-8 h-8 text-white" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <text x="50" y="70" font-family="Arial, Helvetica, sans-serif" font-size="60" font-weight="bold" fill="white" text-anchor="middle">$</text>
            </svg>
          </div>
        )}
      </div>

    </div>
  );
}