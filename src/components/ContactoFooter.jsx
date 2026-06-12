import React from 'react';

export default function ContactoFooter() {
  return (
    <footer id="contacto" className="w-full bg-[#c96e4e] text-white overflow-hidden flex flex-col">
      
      {/* 📸 FOTO PANORÁMICA SUPERIOR */}
      <div className="w-full h-[25vh] min-h-[150px] md:h-[35vh] overflow-hidden">
        <img 
          src="/path-to-your-footer-photo.jpg" // <-- Cambia esto por la ruta de tu foto de bailarines
          alt="Human Mooveart Colectivo" 
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* 🧱 CONTENEDOR DE TEXTO Y REDES SOCIALES */}
      <div className="px-6 py-16 md:py-20 flex flex-col items-center justify-center text-center max-w-5xl mx-auto w-full select-none">
        
        {/* TEXTO MANIFIESTO CENTRAL */}
        <p className="text-[11px] md:text-xs lg:text-[13px] leading-relaxed tracking-wider font-light text-white/95 max-w-4xl mb-14 md:mb-16">
          La danza no es para los que ya saben bailar, es para los que tienen el coraje de intentarlo. 
          En HUMAN MOOVEART te damos el espacio, la música y la confianza; tú solo pon las ganas.
          <br className="hidden md:block" />
          No lo pienses más. El momento de transformar tu energía, liberar el estrés y divertirte es ahora.
        </p>

        {/* ETIQUETA DE CONTACTO */}
        <h3 className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-white/90 mb-6 font-sans">
          Contact
        </h3>

        {/* 📱 ICONOS DE REDES SOCIALES (SVG puros lineales idénticos) */}
        <div className="flex items-center justify-center space-x-6 md:space-x-8">
          
          {/* INSTAGRAM */}
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="opacity-90 hover:opacity-100 hover:scale-110 transition-all duration-300">
            <svg className="w-7 h-7 stroke-current fill-none" strokeWidth="1.5" viewBox="0 0 24 24">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>

          {/* X (TWITTER) */}
          <a href="https://x.com" target="_blank" rel="noreferrer" className="opacity-90 hover:opacity-100 hover:scale-110 transition-all duration-300">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>

          {/* FACEBOOK */}
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="opacity-90 hover:opacity-100 hover:scale-110 transition-all duration-300">
            <svg className="w-7 h-7 stroke-current fill-none" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
          </a>

          {/* EMAIL */}
          <a href="mailto:info@humanmooveart.com" className="opacity-90 hover:opacity-100 hover:scale-110 transition-all duration-300">
            <svg className="w-7 h-7 stroke-current fill-none" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </a>

          {/* WHATSAPP */}
          <a href="https://wa.me/" target="_blank" rel="noreferrer" className="opacity-90 hover:opacity-100 hover:scale-110 transition-all duration-300">
            <svg className="w-7 h-7 stroke-current fill-none" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
          </a>

        </div>

      </div>
    </footer>
  );
}