import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function CheckoutStatusModal() {
  const { t } = useTranslation();
  const [paymentType, setPaymentType] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // Enlaces directos a Stripe y contacto obtenidos del contexto del cliente
  const WHATSAPP_NUMBER = "+52 2228635691"; 
  const WHATSAPP_API_URL = "https://wa.me/5212228635691?text=Hola,%20ya%20realicé%20mi%20pago";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      {/* Contenedor optimizado (max-w-md) para no saturar la pantalla con fondo Hueso (#F4F1ED) */}
      <div className="bg-[#F4F1ED] text-[#13263F] max-w-md w-full rounded-2xl p-6 sm:p-7 shadow-2xl relative border border-[#E88973]/20 font-sans">
        
        {/* Botón Cerrar Superior */}
        <button 
          onClick={closeModal}
          className="absolute top-4 right-4 text-[#13263F]/50 hover:text-[#13263F] text-lg font-bold transition-colors"
          aria-label="Close modal"
        >
          ✕
        </button>

        <div className="text-center">
          {/* Logo optimizado a un tamaño más pequeño y elegante */}
          <div className="mx-auto mb-5 max-w-[90px] flex justify-center items-center">
            <img 
              src="/HMA.png" 
              alt="HMA Logo" 
              className="w-full h-auto object-contain drop-shadow-sm"
            />
          </div>

          {/* Título dinámico con Salto de Línea e impacto visual basado en traducción */}
          {paymentType === 'inscription' ? (
            <div className="mb-4">
              <h2 className="text-xl sm:text-2xl font-medium tracking-tight text-[#1F3A5F] leading-tight">
                {t('checkout.inscription.welcome')}
                <span className="block text-2xl sm:text-3xl font-black text-[#C46A4A] mt-1 tracking-normal uppercase">
                  Human Moove Arts!
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-[#13263F]/80 mt-3 leading-relaxed">
                {t('checkout.inscription.desc')}
              </p>
            </div>
          ) : (
            <div className="mb-4">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1F3A5F] leading-tight">
                {t('checkout.module.title')}
              </h2>
              <p className="text-xs sm:text-sm text-[#13263F]/80 mt-3 leading-relaxed">
                {t('checkout.module.desc')}
              </p>
            </div>
          )}

          {/* Bloque de Próximos Pasos Requeridos */}
          <div className="bg-white/80 rounded-xl p-4 mb-5 text-left border border-[#1F3A5F]/5 shadow-sm">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#1F3A5F]/70 mb-3">
              {t('checkout.stepsTitle')}
            </h4>
            
            <ul className="space-y-3.5 text-xs sm:text-sm text-[#13263F]/90">
              
              {/* Enlace de Google Forms obligatorio SÓLO si es inscripción ordinaria */}
              {paymentType === 'inscription' && (
                <li className="flex items-start gap-2.5">
                  <span className="text-[#C46A4A] font-bold mt-0.5">1.</span>
                  <div>
                    <a 
                      href="https://forms.gle/ngttR21vMH9xQAjc9" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#1F3A5F] font-semibold underline hover:text-[#C46A4A] transition-colors"
                    >
                      {t('checkout.formLink')}
                    </a>
                    <span className="text-[#13263F]/80"> {t('checkout.formDesc')}</span>
                  </div>
                </li>
              )}

              {/* Bloque de WhatsApp con número visible */}
              <li className="flex items-start gap-2.5">
                <span className="text-[#C46A4A] font-bold mt-0.5">
                  {paymentType === 'inscription' ? '2.' : '1.'}
                </span>
                <div className="space-y-2 w-full">
                  <p className="text-[#13263F]/80">{t('checkout.whatsappDesc')}</p>
                  
                  <div className="pt-0.5 flex flex-col gap-2">
                    <a 
                      href={WHATSAPP_API_URL}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[#C46A4A] font-bold underline hover:text-[#1F3A5F] transition-colors w-fit text-xs sm:text-sm"
                    >
                      {t('checkout.whatsappLink')}
                    </a>
                    
                    <div className="text-[11px] text-[#13263F]/70 bg-[#13263F]/5 px-2 py-1.5 rounded-lg border border-[#13263F]/10 w-fit">
                      <span className="font-medium mr-1">{t('checkout.whatsappManual')}</span>
                      <strong className="text-[#1F3A5F] font-bold tracking-wide select-all">{WHATSAPP_NUMBER}</strong>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          {/* Acción Principal */}
          <button
            onClick={closeModal}
            className="w-full py-2.5 px-4 bg-[#1F3A5F] hover:bg-[#13263F] text-[#F4F1ED] font-semibold rounded-xl shadow-md transition-all duration-200 uppercase tracking-widest text-[11px]"
          >
            {t('checkout.buttonClose')}
          </button>
        </div>
      </div>
    </div>
  );
}