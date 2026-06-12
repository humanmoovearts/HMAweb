import React from 'react';
import InversionCard from './InversionCard.jsx';

export default function Inversion() {
  const presencialData = [
    { subtitle: "Pago Stripe (Tarjeta)", lines: ["9 meses (20% beca): $2,133/mes", "12 meses (15% beca): $1,700/mes"] },
    { subtitle: "Pago Mes a Mes", lines: ["Plan 30% beca: $2,100/mes", "Plan 35% beca: $1,950/mes"] }
  ];

  const onlineData = [
    { subtitle: "Pago Stripe (Tarjeta)", lines: ["9 meses (20% beca): $1,849/mes", "12 meses (15% beca): $1,473/mes"] },
    { subtitle: "Pago Mes a Mes", lines: ["Plan 30% beca: $1,820/mes", "Plan 35% beca: $1,690/mes"] }
  ];

  const politicasData = [
    { subtitle: "", lines: ["Periodo: Del 14 al 18 de cada mes para conservar beca.", "Recargo: 8% adicional a partir del día 19.", "Bajas: 3 pagos tardíos anulan la beca automáticamente."] }
  ];

  return (
    <section id="inversion" className="relative bg-[#0b1b33] py-20 px-6 md:py-28 md:px-12 lg:px-20 min-h-screen flex items-center overflow-hidden">
      
      {/* LUCES TRASERAS DE ESPEJO */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-indigo-500/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* TÍTULO */}
        <h2 className="text-white text-4xl md:text-5xl font-bold tracking-wider uppercase mb-12 pl-2 md:pl-4">
          Inversión
        </h2>

        {/* CONTENEDOR CON SCROLL HORIZONTAL RESPONSIVO */}
        {/* - En móviles/tablets: flex, scroll horizontal fluido (overflow-x-auto) y alineación magnética (snap-x).
          - Ocultamos la barra de scroll por defecto con `scrollbar-none`.
          - En pantallas de escritorio (lg): vuelve a ser un grid estático de 3 columnas sin scroll.
        */}
        <div className="flex overflow-x-auto pb-8 pt-2 space-x-6 snap-x snap-mandatory scrollbar-none lg:grid lg:grid-cols-3 lg:gap-8 lg:space-x-0 lg:overflow-x-visible lg:pb-0">
          
          <div className="snap-center shrink-0 w-[85vw] sm:w-[360px] lg:w-full">
            <InversionCard 
              title="Modalidad Presencial" 
              inscription="$1,500 MXN" 
              items={presencialData} 
              isPolicy={false} 
              buttonText="Comprar" 
            />
          </div>

          <div className="snap-center shrink-0 w-[85vw] sm:w-[360px] lg:w-full">
            <InversionCard 
              title="Modalidad Online" 
              inscription="$1,500 MXN" 
              items={onlineData} 
              isPolicy={false} 
              buttonText="Comprar" 
            />
          </div>

          <div className="snap-center shrink-0 w-[85vw] sm:w-[360px] lg:w-full">
            <InversionCard 
              title="Políticas de Pago" 
              items={politicasData} 
              isPolicy={true} 
              buttonText="Read more" 
            />
          </div>

        </div>
      </div>
    </section>
  );
}