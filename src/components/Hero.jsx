import React from 'react';
import { useTranslation } from 'react-i18next';

// Diccionario de textos local exclusivo para el Hero (Evita tocar archivos JSON externos)
const localTexts = {
  es: {
    statusUpcoming: "Próximamente",
    statusOpen: "Inscripciones Abiertas",
    title: "Human Moovearts",
    tagline: "\"Quédate con nosotros porque aquí seguimos en movimiento\"",
    cta: "Inscribirme",
    certified: "Avalado por la BUAP"
  },
  en: {
    statusUpcoming: "Coming Soon",
    statusOpen: "Enrollment Open",
    title: "Human Moovearts",
    tagline: "\"Stay with us because here we keep moving\"",
    cta: "Register Now",
    certified: "Certified by BUAP"
  }
};

export default function Hero() {
  const { i18n } = useTranslation();
  
  // Detecta el idioma actual (es / en) y cae en español por defecto si no se encuentra
  const currentLang = localTexts[i18n.language] ? i18n.language : 'es';
  const text = localTexts[currentLang];

  return (
    <section className="bg-fluid-art text-hueso relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden px-6 py-12 antialiased select-none font-helvetica md:px-8 md:py-16">
      
      {/* CAPA DE GRANO CINEMÁTICO */}
      <div className="film-grain" />

      {/* DIAGRAMA GEOMÉTRICO ABSTRACTO EN EL FONDO */}
      <div className="animate-diagram absolute top-1/2 left-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 opacity-15 md:h-[600px] md:w-[600px]">
        <svg viewBox="0 0 300 300" className="h-full w-full fill-none stroke-hueso" strokeWidth="0.5">
          <circle cx="150" cy="110" r="65" strokeDasharray="2 2" />
          <circle cx="105" cy="180" r="65" />
          <circle cx="195" cy="180" r="65" />
          <line x1="150" y1="20" x2="150" y2="280" />
          <line x1="20" y1="150" x2="280" y2="150" />
        </svg>
      </div>

      {/* CONTENIDO EDITORIAL CENTRAL (MATRIZ TIPOGRÁFICA) */}
      <div className="relative z-10 mx-auto my-auto flex w-full max-w-4xl flex-col items-center justify-center text-center pt-12">
        
        {/* Cápsula de Estado Dinámica */}
        <div className="mb-8 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 shadow-[0_4px_15px_rgba(0,0,0,0.1)] backdrop-blur-md">
          <span className="font-oswald text-[10px] font-medium uppercase tracking-widest text-hueso block whitespace-nowrap sm:text-xs md:tracking-[0.35em]">
            {text.statusUpcoming} <span className="text-coral mx-1 md:mx-2">•</span> {text.statusOpen}
          </span>
        </div>

        {/* Nombre de Marca: Helvetica con tracking amplio */}
        <h1 className="font-helvetica text-3xl font-normal uppercase tracking-[0.35em] text-white leading-none mb-8 w-full pl-[0.35em] sm:text-5xl md:text-6xl lg:text-7xl">
          {text.title}
        </h1>

        {/* Lema de Marca: Darker Grotesque limpio e itálico */}
        <p className="font-darker text-xl font-light italic tracking-wide text-hueso/90 max-w-2xl leading-relaxed mb-10 w-full block sm:text-3xl md:text-4xl">
          {text.tagline}
        </p>

        {/* Botón CTA Frosted Glass */}
        <a 
          href="#inversion" 
          className="relative inline-block overflow-hidden rounded-full bg-white/[0.06] px-10 py-3.5 text-center text-xs font-bold uppercase tracking-widest text-white shadow-[inset_0_1.5px_3px_rgba(255,255,255,0.3),inset_0_-1px_2px_rgba(0,0,0,0.4),0_10px_25px_-5px_rgba(0,0,0,0.3)] transition-all duration-300 hover:bg-white/[0.12] backdrop-blur-xl md:text-sm"
        >
          <span className="absolute inset-0 rounded-full border border-white/20 opacity-80 pointer-events-none" />
          <span className="relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
            {text.cta}
          </span>
        </a>
      </div>

      {/* AVAL DE LA INSTITUCIÓN */}
      <div className="relative z-10 mt-auto flex items-center space-x-3 rounded-full border border-white/10 bg-black/20 px-5 py-2 shadow-[0_4px_12px_rgba(0,0,0,0.15)] backdrop-blur-md">
        <span className="font-helvetica text-[9px] font-light uppercase tracking-wider text-hueso/80 md:text-[10px]">
          {text.certified}
        </span>
        <img 
          src="/LogoBuap.png" 
          alt="Logo BUAP" 
          className="h-7 w-auto object-contain brightness-0 invert opacity-90"
        />
      </div>

    </section>
  );
}