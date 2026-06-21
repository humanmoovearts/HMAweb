import React from 'react';
import { useTranslation } from 'react-i18next';

export default function DiplomadoInfo() {
  const { t, i18n } = useTranslation();

  // Índices para recorrer los 3 enfoques del perfil de egreso en tu JSON
  const enfoquesIndices = [0, 1, 2];

  // Lógica de internacionalización para la interfaz
  const isEnglish = i18n.language === 'en';
  const seccionTitulo = isEnglish ? 'Diploma Program' : 'Diplomado';

  return (
    <section 
      id="diplomado-info" 
      style={{ fontFamily: "var(--font-darker, 'Darker Grotesque', sans-serif)" }}
      className="w-full min-h-screen md:h-screen md:max-h-screen flex flex-col justify-center items-center bg-[#F4F1ED] py-16 md:py-24 px-6 md:px-12 lg:px-20 select-none text-[#13263F]"
    >
      {/* CONTENEDOR PRINCIPAL */}
      <div className="max-w-6xl mx-auto w-full h-full flex flex-col md:flex-row justify-between items-start gap-12 md:gap-16 lg:gap-24 overflow-y-auto md:overflow-hidden">
        
        {/* COLUMNA IZQUIERDA: DIPLOMADO, DESCRIPCIÓN Y DETALLES */}
        <div className="w-full md:w-5/12 flex flex-col justify-start shrink-0">
          {/* Título de la sección */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight uppercase text-[#13263F] mb-6">
            {seccionTitulo}
          </h2>
          
          {/* Visión General del Perfil de Egreso */}
          <p className="text-base md:text-lg lg:text-xl leading-relaxed text-[#13263F]/90 font-light tracking-wide mb-6">
            {t('diplomado.perfil_egreso.vision_general')}
          </p>

          {/* INFORMACIÓN DEL CURSO (Elegante, integrada y bilingüe) */}
          <div className="space-y-2 mb-8 border-l border-[#13263F]/20 pl-4 py-1">
            <p className="text-xs md:text-sm font-light text-[#13263F]/80 tracking-wide">
              <span className="font-bold text-[#13263F] mr-1">{isEnglish ? 'Start Date:' : 'Inicio:'}</span>
              {t('diplomado.informacion_general.fecha_inicio')}
            </p>
            <p className="text-xs md:text-sm font-light text-[#13263F]/80 tracking-wide">
              <span className="font-bold text-[#13263F] mr-1">{isEnglish ? 'Schedule:' : 'Horarios:'}</span>
              {t('diplomado.informacion_general.horarios')}
            </p>
            <div className="text-xs md:text-sm font-light text-[#13263F]/80 tracking-wide">
              <span className="font-bold text-[#13263F] mr-1">{isEnglish ? 'Venues:' : 'Sedes:'}</span>
              <span className="text-[#13263F]/80">{t('diplomado.informacion_general.sedes.0')} • {t('diplomado.informacion_general.sedes.1')}</span>
            </div>
          </div>

          {/* CONTENEDOR DEL AVAL CON TU LOGO */}
          <div className="flex items-center space-x-4 mt-2 bg-white/40 border border-[#13263F]/5 p-3.5 rounded-2xl max-w-sm shadow-sm">
            <div className="w-14 h-14 shrink-0 flex items-center justify-center overflow-hidden rounded-xl bg-transparent">
              <img 
                src="/logo-buap-azul.jpeg"
                alt="Logo BUAP"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentNode.className = "w-14 h-14 shrink-0 border border-dashed border-[#E88973]/40 rounded-xl bg-[#13263F]/5 flex items-center justify-center text-[10px] font-bold text-[#E88973]";
                  e.target.parentNode.innerText = "BUAP LOGO";
                }}
              />
            </div>
            
            <p className="text-xs md:text-sm font-semibold text-[#E88973] tracking-wider uppercase leading-snug">
              {t('diplomado.aval')}
            </p>
          </div>
        </div>

        {/* COLUMNA DERECHA: ENFOQUES POR DISCIPLINA */}
        <div className="w-full md:w-7/12 flex flex-col justify-start space-y-6 md:overflow-y-auto md:max-h-[75vh] pr-2 scrollbar-none">
          {enfoquesIndices.map((index, i) => (
            <div key={index} className="w-full">
              {/* Línea divisoria sutil */}
              {i > 0 && <div className="w-full h-[1px] bg-[#13263F]/10 mb-6" />}
              
              <div className="flex flex-col space-y-2">
                <h3 className="text-base md:text-lg font-bold tracking-wide text-[#13263F]">
                  {t(`diplomado.perfil_egreso.enfoques_por_disciplina.${index}.disciplina`)}
                </h3>
                <p className="text-xs md:text-sm leading-relaxed text-[#13263F]/75 font-light tracking-wide">
                  {t(`diplomado.perfil_egreso.enfoques_por_disciplina.${index}.resumen`)}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}