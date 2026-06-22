import React from 'react';
import { useTranslation } from 'react-i18next';

export default function DiplomadoInfo() {
  const { t, i18n } = useTranslation();

  // Índices para recorrer los 3 enfoques del perfil de egreso en tu JSON[cite: 7]
  const enfoquesIndices = [0, 1, 2];

  // Lógica de internacionalización para la interfaz[cite: 7]
  const isEnglish = i18n.language === 'en';
  const seccionTitulo = isEnglish ? 'Diploma Program' : 'Diplomado';

  return (
    <section 
      id="diplomado-info" 
      className="w-full min-h-screen flex flex-col justify-center items-center bg-hueso py-16 md:py-24 px-6 md:px-12 lg:px-20 select-none text-azulOscuro font-darker"
    >
      {/* CONTENEDOR PRINCIPAL - Flexible para evitar cortes en desktop chico */}
      <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row justify-between items-start gap-12 md:gap-16 lg:gap-24">
        
        {/* COLUMNA IZQUIERDA: DIPLOMADO, DESCRIPCIÓN Y DETALLES */}
        <div className="w-full md:w-5/12 flex flex-col justify-start shrink-0">
          
          {/* Título de la sección con Gradiente Naranja/Coral Dinámico */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight uppercase mb-6 bg-gradient-to-r from-terracota via-coral to-terracota bg-clip-text text-transparent">
            {seccionTitulo}
          </h2>
          
          {/* Visión General del Perfil de Egreso */}
          <p className="text-base md:text-lg lg:text-xl leading-relaxed text-azulOscuro/90 font-light tracking-wide mb-6">
            {t('diplomado.perfil_egreso.vision_general')}
          </p>

          {/* INFORMACIÓN DEL CURSO */}
          <div className="space-y-2 mb-8 border-l border-azulOscuro/20 pl-4 py-1">
            <p className="text-xs md:text-sm font-light text-azulOscuro/80 tracking-wide">
              <span className="font-bold text-azulOscuro mr-1">{isEnglish ? 'Start Date:' : 'Inicio:'}</span>
              {t('diplomado.informacion_general.fecha_inicio')}
            </p>
            <p className="text-xs md:text-sm font-light text-azulOscuro/80 tracking-wide">
              <span className="font-bold text-azulOscuro mr-1">{isEnglish ? 'Schedule:' : 'Horarios:'}</span>
              {t('diplomado.informacion_general.horarios')}
            </p>
            <div className="text-xs md:text-sm font-light text-azulOscuro/80 tracking-wide">
              <span className="font-bold text-azulOscuro mr-1">{isEnglish ? 'Venues:' : 'Sedes:'}</span>
              <span className="text-azulOscuro/80">
                {t('diplomado.informacion_general.sedes.0')} • {t('diplomado.informacion_general.sedes.1')}
              </span>
            </div>
          </div>

          {/* CONTENEDOR DEL AVAL CON LOGO - Visible en todas las pantallas */}
          <div className="flex items-center space-x-4 mt-2 bg-white/50 border border-azulOscuro/5 p-3.5 rounded-2xl max-w-sm shadow-sm">
            <div className="w-14 h-14 shrink-0 flex items-center justify-center overflow-hidden rounded-xl bg-transparent">
              <img 
                src="/logo-buap-azul.jpeg"
                alt="Logo BUAP"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentNode.className = "w-14 h-14 shrink-0 border border-dashed border-coral/40 rounded-xl bg-azulOscuro/5 flex items-center justify-center text-[10px] font-bold text-coral";
                  e.currentTarget.parentNode.innerText = "BUAP LOGO";
                }}
              />
            </div>
            
            <p className="text-xs md:text-sm font-semibold text-coral tracking-wider uppercase leading-snug">
              {t('diplomado.aval')}
            </p>
          </div>
        </div>

        {/* COLUMNA DERECHA: ENFOQUES POR DISCIPLINA */}
        <div className="w-full md:w-7/12 flex flex-col justify-start space-y-6">
          {enfoquesIndices.map((index, i) => (
            <div key={index} className="w-full">
              {/* Línea divisoria sutil */}
              {i > 0 && <div className="w-full h-[1px] bg-azulOscuro/10 mb-6" />}
              
              <div className="flex flex-col space-y-2">
                <h3 className="text-base md:text-lg font-bold tracking-wide text-azulOscuro">
                  {t(`diplomado.perfil_egreso.enfoques_por_disciplina.${index}.disciplina`)}
                </h3>
                <p className="text-xs md:text-sm leading-relaxed text-azulOscuro/75 font-light tracking-wide">
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