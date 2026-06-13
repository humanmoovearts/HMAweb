import React from 'react';
import InversionCard from './InversionCard.jsx';

export default function Inversion() {
  const cardsData = [
    {
      id: "presencial",
      title: "Modalidad Presencial",
      inscription: "$1,500 MXN",
      isPolicy: false,
      buttonText: "Comprar",
      items: [
        { subtitle: "Pago Stripe (Tarjeta)", lines: ["9 meses (20% beca): $2,133/mes", "12 meses (15% beca): $1,700/mes"] },
        { subtitle: "Pago Mes a Mes", lines: ["Plan 30% beca: $2,100/mes", "Plan 35% beca: $1,950/mes"] }
      ]
    },
    {
      id: "online",
      title: "Modalidad Online",
      inscription: "$1,500 MXN",
      isPolicy: false,
      buttonText: "Comprar",
      items: [
        { subtitle: "Pago Stripe (Tarjeta)", lines: ["9 meses (20% beca): $1,849/mes", "12 meses (15% beca): $1,473/mes"] },
        { subtitle: "Pago Mes a Mes", lines: ["Plan 30% beca: $1,820/mes", "Plan 35% beca: $1,690/mes"] }
      ]
    },
    {
      id: "politicas",
      title: "Políticas de Pago",
      inscription: null,
      isPolicy: true,
      buttonText: "Read more",
      items: [
        { subtitle: "", lines: ["Periodo: Del 14 al 18 de cada mes para conservar beca.", "Recargo: 8% adicional a partir del día 19.", "Bajas: 3 pagos tardíos anulan la beca automáticamente."] }
      ]
    }
  ];

  return (
    /* Mantenemos h-screen para tus animaciones de GSAP y empujamos todo desde arriba con justify-start */
    <section id="inversion" className="relative bg-[#1F3A5F] w-full h-screen min-h-[660px] flex flex-col justify-start items-center overflow-hidden px-6 md:px-12 select-none pt-12 md:pt-16 lg:pt-20">
      
      {/* LUCES TRASERAS DE ESPEJO */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Contenedor principal que ocupa el alto de la pantalla disponible */}
      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col justify-start h-full pb-8">
        
        {/* TÍTULO - Fijo arriba */}
        <h2 className="text-white text-3xl md:text-5xl font-bold tracking-wider uppercase mb-4 pl-2 shrink-0">
          Inversión
        </h2>

        {/* CONTENEDOR CON SCROLL HORIZONTAL CENTRADO VERTICALMENTE
            - Usamos `flex-grow` para tomar todo el espacio restante abajo del título.
            - `items-center` se encarga de que las cards queden perfectamente centradas en vertical.
        */}
        <div className="w-full flex-grow flex items-center lg:grid lg:grid-cols-3 gap-6 overflow-x-auto lg:overflow-x-visible snap-x snap-mandatory scrollbar-none px-2 lg:px-0 justify-start">
          {cardsData.map((card) => (
            <div 
              key={card.id} 
              className="snap-center shrink-0 w-[85vw] sm:w-[360px] lg:w-full flex justify-center"
            >
              <InversionCard 
                title={card.title} 
                inscription={card.inscription} 
                items={card.items} 
                isPolicy={card.isPolicy} 
                buttonText={card.buttonText} 
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}