import React from 'react';

export default function Testimonios() {
  const reviews = [
    {
      name: "Margot Elsher",
      role: "Lead Actress in ",
      work: "Abyss of Deceptions",
      image: "/path-to-margot.jpg", // <-- Cambia por tu ruta de imagen
      text: "“Patty Moore's direction is a revelation. She effortlessly navigated the complexities of Abyss of Deceptions and brought a unique blend of serenity and suspense to life. Her vision and dedication to the thriller genre are truly exceptional.”",
      stars: 5,
    },
    {
      name: "John Smith",
      role: "Producer of ",
      work: "The Midnight Enigma",
      image: "/path-to-john.jpg", // <-- Cambia por tu ruta de imagen
      text: "“Patty Moore is a master of suspense. Her ability to create an atmosphere of mystery and tension is nothing short of remarkable. Collaborating with her on The Midnight Enigma was a thrilling experience, and her directorial skills are second to none.”",
      stars: 5,
    },
    {
      name: "Michael Brown",
      role: "Cinematographer on ",
      work: "Shadows of Deit",
      image: "/path-to-michael.jpg", // <-- Cambia por tu ruta de imagen
      text: "“Patty Moore's attention to detail and understanding of visual storytelling are exceptional. Shadows of Deit was a collaborative triumph, and Patty's ability to create the perfect noir atmosphere was both inspiring and captivating.”",
      stars: 5,
    },
  ];

  return (
    <section id="testimonios" className="bg-[#13263F] text-white py-20 px-6 md:py-28 md:px-12 lg:px-20 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* TÍTULO SECCIÓN */}
        <h2 className="text-4xl md:text-5xl font-bold tracking-wider uppercase mb-16 pl-2">
          Testimonios
        </h2>

        {/* CONTENEDOR GRID */}
        {/* En móvil se apilan en 1 columna; en md/lg se divide en 2 columnas perfectas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16 items-start">
          {reviews.map((review, index) => (
            <div 
              key={index} 
              className={`flex flex-col sm:flex-row gap-6 items-start ${
                index === 2 ? 'md:col-span-2 md:max-w-[calc(50%-2rem)]' : ''
              }`}
            >
              {/* CONTENEDOR FOTO (Bordes rectos e imagen cuadrada B&N) */}
              <div className="w-40 h-40 md:w-44 md:h-44 shrink-0 bg-neutral-800 overflow-hidden">
                <img 
                  src={review.image} 
                  alt={review.name} 
                  className="w-full h-full object-cover grayscale brightness-110 contrast-105" 
                />
              </div>

              {/* TEXTO Y CALIFICACIÓN */}
              <div className="flex flex-col justify-between h-full pt-1">
                <div>
                  {/* Nombre del autor */}
                  <h3 className="text-base font-bold tracking-wide text-gray-100">
                    {review.name}
                  </h3>
                  {/* Puesto / Obra con cursiva */}
                  <p className="text-xs text-gray-300 font-light tracking-wide mb-4">
                    {review.role}
                    <span className="italic">{review.work}</span>
                  </p>
                  {/* Cuerpo del testimonio */}
                  <p className="text-[11px] md:text-xs leading-relaxed text-gray-400 font-light tracking-wide mb-5 max-w-sm">
                    {review.text}
                  </p>
                </div>

                {/* ESTRELLAS (Renderizado dinámico de los vectores amarillos) */}
                <div className="flex items-center space-x-1 text-[#f3cc4a]">
                  {[...Array(review.stars)].map((_, i) => (
                    <svg 
                      key={i} 
                      className="w-5 h-5 fill-current" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}