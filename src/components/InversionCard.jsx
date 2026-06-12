import React from 'react';

export default function InversionCard({ title, inscription, items, isPolicy, buttonText }) {
  return (
    <div className="relative w-full max-w-[390px] min-h-[530px] rounded-[55px] p-9 flex flex-col justify-between text-white overflow-hidden bg-[#162744]/40 backdrop-blur-2xl border border-white/10 border-t-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_20px_40px_rgba(0,0,0,0.4)] transition-all duration-500 group">
      
      {/* Reflejo interno de cristal de la propia tarjeta */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.02] to-white/[0.05] pointer-events-none" />

      {/* CONTENIDO */}
      <div className="relative z-10">
        <h3 className="text-xl font-bold tracking-widest uppercase mb-7 text-gray-100">
          {title}
        </h3>
        
        {inscription && (
          <p className="text-xs md:text-[13px] font-bold tracking-wider mb-6 text-gray-200">
            Inscripción: <span className="font-sans font-normal">{inscription}</span>
          </p>
        )}
        
        <div className="space-y-6 text-[11px] md:text-[12px] tracking-wide text-gray-300 font-light">
          {items.map((group, index) => (
            <div key={index} className="space-y-2">
              {group.subtitle && (
                <h4 className="text-[11px] font-bold tracking-widest uppercase text-gray-400">
                  {group.subtitle}
                </h4>
              )}
              <ul className="space-y-1.5 opacity-90">
                {group.lines.map((line, lIndex) => {
                  const parts = line.split(':');
                  return (
                    <li key={lIndex} className={isPolicy ? "flex items-start" : "font-sans"}>
                      {isPolicy && <span className="mr-2 text-gray-400 select-none">•</span>}
                      <span>
                        {parts[0]}
                        {parts[1] && (
                          <>:<span className="text-gray-200 font-normal"> {parts[1]}</span></>
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

      {/* BOTONES */}
      <div className="relative z-10 flex items-center space-x-4 mt-8">
        <button className="border border-white/30 text-[11px] tracking-[0.15em] uppercase px-7 py-2.5 bg-transparent hover:bg-white hover:text-[#0b1b33] hover:border-white transition-all duration-300 font-medium">
          {buttonText || 'Comprar'}
        </button>
        
        {!isPolicy && (
          <div className="w-9 h-9 border border-white/30 rounded-full flex items-center justify-center opacity-80 shrink-0">
            <svg className="w-4 h-4 text-gray-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          </div>
        )}
      </div>

    </div>
  );
}