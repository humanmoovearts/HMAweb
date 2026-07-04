import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

// Diccionario de textos localizado directamente en el archivo para evitar modificar el JSON externo
const TEXTS = {
  es: {
    inscription: {
      title: '¡Bienvenido a Human Moove Arts!',
      desc: 'Gracias por cumplir este paso obligatorio. Tu lugar en el diplomado está completamente asegurado. A partir de ahora, estás habilitado para adquirir tus módulos académicos.'
    },
    module: {
      title: '¡Muchas gracias por tu compra!',
      desc: 'Tu pago ha sido procesado de manera exitosa. Agradecemos tu constancia en este trayecto de formación interdisciplinaria.'
    },
    stepsTitle: 'Próximos pasos requeridos:',
    formLink: 'Llena el formulario de inscripción aquí',
    formDesc: 'para formalizar el registro del módulo seleccionado en tu expediente.',
    whatsappDesc: 'Envíanos un mensaje directo para validar tu comprobante e integrarte a las redes de comunicación interna: ',
    whatsappLink: 'Comunícate por WhatsApp',
    buttonClose: 'Entendido y Continuar'
  },
  en: {
    inscription: {
      title: 'Welcome to Human Moove Arts!',
      desc: 'Thank you for completing this mandatory step. Your spot in the program is completely secured. From now on, you are authorized to purchase your academic modules.'
    },
    module: {
      title: 'Thank you very much for your purchase!',
      desc: 'Your module payment has been successfully processed. We appreciate your dedication throughout this interdisciplinary training journey.'
    },
    stepsTitle: 'Next required steps:',
    formLink: 'Fill out the registration form here',
    formDesc: 'to formalize the registration of the selected module in your student file.',
    whatsappDesc: 'Send us a direct message to validate your receipt and join our internal communication networks: ',
    whatsappLink: 'Contact us via WhatsApp',
    buttonClose: 'Understood & Continue'
  }
};

export default function CheckoutStatusModal() {
  const { i18n } = useTranslation();
  const [paymentType, setPaymentType] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // Obtener el idioma actual activo en la web (por defecto 'es' si no se detecta)
  const currentLang = i18n.language?.startsWith('en') ? 'en' : 'es';
  const content = TEXTS[currentLang];

  useEffect(() => {
    // Leer los parámetros que envía Stripe en la URL tras el retorno a la web
    const searchParams = new URLSearchParams(window.location.search);
    const type = searchParams.get('type');
    const sessionId = searchParams.get('session_id');

    if (type && sessionId) {
      setPaymentType(type);
      setIsOpen(true);
    }
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    // Limpiar la URL eliminando los query params para evitar re-aperturas al recargar la página
    window.history.replaceState({}, document.title, window.location.pathname);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      {/* Contenedor principal alineado a la Identidad Visual: Fondo Hueso (#F4F1ED) y Texto Azul Oscuro (#13263F) */}
      <div className="bg-[#F4F1ED] text-[#13263F] max-w-lg w-full rounded-2xl p-8 shadow-2xl relative border border-[#E88973]/20 font-sans">
        
        {/* Botón Cerrar Superior */}
        <button 
          onClick={closeModal}
          className="absolute top-4 right-4 text-[#13263F]/60 hover:text-[#13263F] text-xl font-bold transition-colors"
          aria-label="Close modal"
        >
          ✕
        </button>

        <div className="text-center">
          {/* Icono de Confirmación Externa en color Coral/Terracota */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-[#E88973]/20 text-[#C46A4A] mb-6">
            <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* Renderizado Dinámico de Textos hardcodeados por idioma */}
          {paymentType === 'inscription' ? (
            <>
              <h2 className="text-3xl font-bold tracking-tight mb-4 text-[#1F3A5F]">
                {content.inscription.title}
              </h2>
              <p className="text-base text-[#13263F]/80 mb-6 leading-relaxed">
                {content.inscription.desc}
              </p>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold tracking-tight mb-4 text-[#1F3A5F]">
                {content.module.title}
              </h2>
              <p className="text-base text-[#13263F]/80 mb-6 leading-relaxed">
                {content.module.desc}
              </p>
            </>
          )}

          {/* Bloque de Seguimiento y Próximos Pasos Dinámicos */}
          <div className="bg-white/60 rounded-xl p-5 mb-6 text-left border border-[#1F3A5F]/10">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#1F3A5F] mb-3">
              {content.stepsTitle}
            </h4>
            <ul className="space-y-3 text-sm text-[#13263F]/90">
              
              {/* PASO DEL FORMULARIO: Exclusivo para compras de Módulos (se oculta en inscripción ordinaria) */}
              {paymentType !== 'inscription' && (
                <li className="flex items-start gap-2">
                  <span className="text-[#C46A4A] font-bold">1.</span>
                  <div>
                    {/* El cliente suministrará el enlace definitivo de Google Forms a la brevedad */}
                    <a 
                      href="https://forms.gle/ngttR21vMH9xQAjc9" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#1F3A5F] font-semibold underline hover:text-[#C46A4A] transition-colors"
                    >
                      {content.formLink}
                    </a>
                    <span> {content.formDesc}</span>
                  </div>
                </li>
              )}

              {/* PASO DE WHATSAPP: Común para todos los flujos de pago exitosos */}
              <li className="flex items-start gap-2">
                <span className="text-[#C46A4A] font-bold">
                  {paymentType === 'inscription' ? '1.' : '2.'}
                </span>
                <div>
                  <span>{content.whatsappDesc}</span>
                  <a 
                    href="https://wa.me/521XXXXXXXXXX?text=Hola,%20ya%20realicé%20mi%20pago" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#C46A4A] font-semibold underline hover:text-[#1F3A5F] transition-colors"
                  >
                    {content.whatsappLink}
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Acción Principal del Modal */}
          <button
            onClick={closeModal}
            className="w-full py-3 px-6 bg-[#1F3A5F] hover:bg-[#13263F] text-[#F4F1ED] font-semibold rounded-xl shadow-md transition-all duration-200 uppercase tracking-wider text-sm"
          >
            {content.buttonClose}
          </button>
        </div>
      </div>
    </div>
  );
}