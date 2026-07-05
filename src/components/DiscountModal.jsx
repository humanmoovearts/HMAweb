import React from 'react';

export default function DiscountModal({ isOpen, onClose, couponCode, isEn }) {
  if (!isOpen) return null;

  // Configuración del mensaje dinámico para WhatsApp
  const whatsappNumber = "5212221234567"; // <-- Sustituye por el número real del cliente
  const textMsg = isEn
    ? `Hello! I verified my discount code "${couponCode}" on the website. I would like to follow up on my benefits for the Human Moove Arts Diploma.`
    : `¡Hola! Validé mi código de descuento "${couponCode}" en la página web. Me gustaría comunicarme para darle seguimiento a mi descuento para el Diplomado Human Moove Arts.`;
  
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(textMsg)}`;

  const txtSuccessTitle = isEn ? "Congratulations!" : "¡Felicidades!";
  const txtSuccessDesc = isEn 
    ? "Your discount code is valid. Get in touch with us via WhatsApp to apply it and track your benefit."
    : "Tu código de descuento es válido. Comunícate con nosotros por WhatsApp para hacerlo efectivo y darle seguimiento a tu descuento.";
  const txtBtnWhatsApp = isEn ? "Contact via WhatsApp" : "Comunícate por WhatsApp";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#13263F] border-2 border-[#E88973] rounded-2xl w-full max-w-md flex flex-col p-6 shadow-2xl relative text-center">
        
        {/* Botón Cerrar */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white font-bold font-mono text-base cursor-pointer"
        >
          ✕
        </button>

        {/* Icono decorativo */}
        <div className="text-4xl mb-2">🎉</div>

        <h3 className="text-xl font-bold uppercase tracking-wider text-[#E88973] mb-3">
          {txtSuccessTitle}
        </h3>

        <p className="text-xs text-gray-300 leading-relaxed mb-6 px-2">
          {txtSuccessDesc}
        </p>

        {/* Botón WhatsApp de seguimiento */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-bold uppercase tracking-wider bg-[#C46A4A] hover:bg-[#E88973] text-white transition-all text-xs shadow-md"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.4.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.413 9.863-9.847.001-2.633-1.019-5.101-2.872-6.957C16.548 1.944 14.09 1.193 11.5 1.193c-5.438 0-9.862 4.414-9.865 9.848-.001 1.77.47 3.5 1.361 5.01l.243.415-1.01 3.693 3.782-.992.399.237z"/>
          </svg>
          {txtBtnWhatsApp}
        </a>
      </div>
    </div>
  );
}