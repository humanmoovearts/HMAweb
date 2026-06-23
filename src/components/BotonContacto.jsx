import React from 'react';

const BotonContacto = () => {
  // Cuando te pasen la API o el número final, solo cambias esta URL
  const whatsappUrl = "https://wa.me/TU_NUMERO_AQUI"; 
  
  // Apunta directamente al archivo que descargaste en la carpeta public
  const logoName = "whatsapp.png"; 

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[9999] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-xl transition-transform duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 isolate"
      aria-label="Contactar por WhatsApp"
    >
      {/* Colocamos la imagen dentro del contenedor con rounded-full y object-cover 
        para obligar al navegador a recortar perfectamente cualquier borde raro 
      */}
      <img 
        src={`/${logoName}`} 
        alt="WhatsApp" 
        className="h-full w-full object-cover rounded-full select-none pointer-events-none"
        onError={(e) => {
          // Por si acaso el navegador llega a perder la ruta del archivo, no se rompa la app
          e.target.style.display = 'none';
        }}
      />
    </a>
  );
};

export default BotonContacto;