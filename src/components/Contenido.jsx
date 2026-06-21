import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Contenido() {
  const { t, i18n } = useTranslation();
  // Estado para el módulo activo (inicia en Índice 0)
  const [activeModulo, setActiveModulo] = useState(0);

  const totalModulos = [0, 1, 2, 3, 4];

  // Extraemos estrictamente los datos reales del JSON
  const clasesArray = t(`contenido_tematico.modulos.${activeModulo}.clases`, { returnObjects: true }) || [];
  const moduloTitulo = t(`contenido_tematico.modulos.${activeModulo}.titulo`);

  // Lógica dinámica para internacionalizar todos los textos base según el idioma activo
  const isEnglish = i18n.language === 'en';
  const seccionTitulo = isEnglish ? 'Content' : 'Contenido';
  const moduloLabel = isEnglish ? 'MODULE' : 'MÓDULO';
  const tabLabel = isEnglish ? 'MOD' : 'MÓD';

  return (
    <section 
      id="contenido" 
      style={{ fontFamily: "var(--font-darker, 'Darker Grotesque', sans-serif)" }}
      className="relative w-full h-screen max-h-screen flex flex-col justify-between items-center overflow-hidden bg-gradient-to-br from-[#13263F] via-[#8B7AA8] to-[#C46A4A] pt-24 pb-8 px-4 sm:px-6 md:px-12 lg:px-20 select-none"
    >
      {/* DESTELLO ORGÁNICO CORPORATIVO */}
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[300px] bg-gradient-to-r from-[#E88973] via-[#C46A4A] to-transparent rounded-full blur-[90px] opacity-40 mix-blend-color-dodge pointer-events-none" />

      {/* CONTENEDOR LIMITADOR A PANTALLA COMPLETA */}
      <div className="max-w-6xl mx-auto w-full h-full flex flex-col justify-between relative z-10 overflow-hidden">
        
        {/* ENCABEZADO DE LA SECCIÓN (Ahora cambia dinámicamente) */}
        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end mb-4 shrink-0 border-b border-[#F4F1ED]/10 pb-3">
          <div>
            <h2 className="text-[#F4F1ED] text-3xl md:text-5xl font-black tracking-wide uppercase opacity-95">
              {seccionTitulo}
            </h2>
          </div>

          {/* SELECTOR DE MÓDULOS */}
          <div className="flex flex-wrap gap-1.5 bg-[#13263F]/60 p-1 rounded-full border border-[#F4F1ED]/10 shadow-inner mt-2 md:mt-0">
            {totalModulos.map((index) => (
              <button
                key={index}
                onClick={() => setActiveModulo(index)}
                className={`px-3 py-1.5 text-xs font-bold tracking-widest uppercase rounded-full transition-all duration-300 ${
                  activeModulo === index
                    ? 'bg-[#E88973] text-white shadow-md scale-105'
                    : 'text-[#F4F1ED]/60 hover:text-[#F4F1ED] hover:bg-white/[0.05]'
                }`}
              >
                {tabLabel} 0{index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* TARJETA PRINCIPAL PREMIUM GLASSMORPHISM */}
        <div className="w-full flex-grow bg-[#13263F]/30 backdrop-blur-xl border border-[#F4F1ED]/15 p-6 md:p-8 rounded-2xl text-[#F4F1ED] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch mb-2">
          
          {/* DETALLES DEL MÓDULO (Izquierda - Info 100% real) */}
          <div className="md:col-span-5 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#F4F1ED]/10 pb-4 md:pb-0 md:pr-6 overflow-y-auto">
            <div>
              <h3 className="text-xl md:text-2xl font-black leading-none tracking-widest text-[#E88973] uppercase">
                {moduloLabel} {activeModulo + 1}
              </h3>
              
              <p className="text-base md:text-xl font-medium text-[#F4F1ED]/90 tracking-wide mt-4 leading-relaxed">
                {moduloTitulo}
              </p>
            </div>

            <div className="hidden md:block pt-4">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#8B7AA8] block">
                Human Moovearts
              </span>
            </div>
          </div>

          {/* LISTA DE CLASES NUMERADAS (Derecha - Scroll interno exclusivo) */}
          <div className="md:col-span-7 flex flex-col justify-start overflow-hidden h-full">
            <div className="flex-grow overflow-y-auto pr-1 space-y-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent max-h-full">
              {clasesArray.map((clase, i) => {
                const numeroClase = String(i + 1).padStart(2, '0');
                return (
                  <div 
                    key={i} 
                    className="flex items-start bg-white/[0.03] border border-white/[0.05] p-3 rounded-xl hover:bg-white/[0.07] hover:border-[#E88973]/20 transition-all duration-200"
                  >
                    {/* Número Identificador */}
                    <span className="text-sm font-black text-[#E88973] tracking-wider shrink-0 mt-0.5 w-6 text-center">
                      {numeroClase}
                    </span>
                    
                    {/* Separador */}
                    <div className="w-[1px] h-4 bg-[#F4F1ED]/20 mx-3 shrink-0 self-center" />
                    
                    {/* Texto de la lección */}
                    <span className="text-xs md:text-sm font-light leading-snug text-[#F4F1ED]/90 tracking-wide">
                      {clase}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}