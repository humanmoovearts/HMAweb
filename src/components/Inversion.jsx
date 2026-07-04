import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function Inversion() {
  const { t, i18n } = useTranslation();
  const [db, setDb] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('completo'); 
  
  // Control de interfaz: plazo seleccionado, cupones y estado del Modal (Pop-up)
  const [selectedPlazo, setSelectedPlazo] = useState({});
  const [couponInputs, setCouponInputs] = useState({});
  const [appliedCoupons, setAppliedCoupons] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Textos e internacionalización hardcodeados localmente para no alterar el JSON global
  const isEn = i18n.language === 'en';
  
  const txtLoading = isEn ? "Loading investment options..." : "Cargando opciones de inversión...";
  const txtTitle = isEn ? "Investment" : "Inversión";
  const txtPaso1 = isEn ? "Step 1" : "Paso 1";
  const txtInscripcionTitle = isEn ? "Mandatory Initial Enrollment" : "Inscripción Inicial Obligatoria";
  const txtInscripcionDesc = isEn 
    ? "Mandatory initial payment required to secure your spot and enable access to financing and tuition schemes." 
    : "Pago inicial obligatorio requerido para asegurar el lugar y habilitar el acceso a los demás esquemas de financiamiento y colegiatura.";
  const txtBtnInscripcion = isEn ? "Secure my spot" : "Asegurar mi lugar";
  
  const txtViewCompleto = isEn ? "Full Diploma" : "Diplomado Completo";
  const txtViewModulos = isEn ? "Individual Modules" : "Módulos Individuales";
  
  const txtCompraTotal = isEn ? "Full Purchase" : "Compra Total";
  const txtPresencial = isEn ? "In-Person" : "Presencial";
  const txtOnline = isEn ? "Online" : "Online";
  const txtTarjeta = isEn ? "Card" : "Tarjeta";
  const txtSelectPlan = isEn 
    ? "Select the financing plan for the chosen modality." 
    : "Selecciona el plan de financiamiento para la modalidad.";
  
  const txtMeses = isEn ? "Months" : "Meses";
  const txtBeca = isEn ? "Scholarship" : "Beca";
  const txtMensualidadLabel = isEn ? "Monthly tuition:" : "Colegiatura mensual:";
  const txtCuponPlaceholder = isEn ? "HAVE A CODE?" : "¿TIENES UN CÓDIGO?";
  const txtBtnAplicar = isEn ? "Apply" : "Aplicar";
  const txtBtnPagar = isEn ? "Pay" : "Pagar";
  const txtConDescuento = isEn ? "with Discount" : "con Descuento";
  
  const txtModuloDefaultDesc = isEn 
    ? "Academic Specialization Module in Performing Arts and Psychology." 
    : "Módulo Académico de Especialización en Artes Escénicas y Psicología.";
  const txtBtnModulo = isEn ? "Acquire Module" : "Adquirir Módulo";
  
  const txtVerPoliticas = isEn ? "View Financing & Use Policies" : "Ver Políticas de Financiamiento y Uso";
  const txtPoliticasTituloModal = isEn ? "Financing Policies" : "Políticas de Financiamiento";
  const txtBtnEntendido = isEn ? "Understood" : "Entendido";

  useEffect(() => {
    const WORKER_URL = 'https://curly-wood-b6b1.mooveartshumanmoovearts.workers.dev';
    
    fetch(WORKER_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`Error en el Worker: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setDb(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error crítico leyendo datos desde producción:", err);
        setLoading(false);
      });
  }, []);

  const handleApplyCoupon = (progId, plazoKey) => {
    if (!db || !db.programas) return;

    const rawInput = couponInputs[progId] || '';
    const cleanCoupon = rawInput.toUpperCase().trim();
    
    const targetProgram = db.programas.find(p => p.id === progId);
    if (!targetProgram) return;

    const validCouponsForPlazo = targetProgram.detalles?.[plazoKey]?.cuponesValidos || [];

    if (cleanCoupon !== '' && validCouponsForPlazo.includes(cleanCoupon)) {
      setAppliedCoupons((prev) => ({ ...prev, [progId]: cleanCoupon }));
    } else {
      setAppliedCoupons((prev) => ({ ...prev, [progId]: '' }));
      alert(isEn ? "Invalid promotional code for this plan." : "Código promocional inválido para este plan.");
    }
  };

  const handleSelectPlazo = (progId, plazo) => {
    setSelectedPlazo(prev => ({ ...prev, [progId]: plazo }));
    setCouponInputs(prev => ({ ...prev, [progId]: '' }));
    setAppliedCoupons(prev => ({ ...prev, [progId]: '' }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-dvh bg-[#13263F] text-[#F4F1ED]">
        <p className="text-xs tracking-widest uppercase font-mono animate-pulse">
          {txtLoading}
        </p>
      </div>
    );
  }

  const { inscripcion, programas = [], modulos = [] } = db || {};
  // Las políticas se extraen del JSON de traducción lingüística para respetar el idioma dinámicamente
  const politicasTraducidas = t('costos_y_financiamiento.politicas', { returnObjects: true }) || [];

  return (
    
    <div 
      id="inversion" 
      className="w-full h-dvh max-h-dvh bg-[#13263F] text-[#F4F1ED] font-sans overflow-hidden relative flex flex-col pt-8 pb-12"
    >
      
      {/* CONTENEDOR CON SCROLL INTERNO */}
      <div 
      data-lenis-prevent
      className="w-full max-w-4xl mx-auto px-4 box-border overflow-y-auto flex-1 custom-scrollbar">
        
        {/* Cabecera Principal */}
        <div className="text-center mb-8 w-full">
          <h2 className="text-3xl md:text-4xl font-bold text-[#F4F1ED] mb-2 uppercase tracking-wider">
            {txtTitle}
          </h2>
          <div className="w-14 h-1 bg-[#E88973] mx-auto rounded-full"></div>
        </div>

        {/* Paso 1: Inscripción Inicial Obligatoria (Datos directo del Worker) */}
        {inscripcion?.disponible && (
          <div className="mb-8 p-5 rounded-2xl bg-[#1F3A5F]/40 backdrop-blur-md border border-[#8B7AA8]/30 max-w-md mx-auto text-center shadow-lg">
            <h3 className="text-[10px] uppercase font-bold tracking-widest text-[#E88973] mb-1">
              {txtPaso1}
            </h3>
            <h4 className="text-base font-bold text-[#F4F1ED] mb-1">
              {txtInscripcionTitle}
            </h4>
            <p className="text-[11px] text-gray-300 max-w-xs mx-auto mb-3 leading-normal">
              {txtInscripcionDesc}
            </p>
            <div className="text-2xl font-extrabold text-[#F4F1ED] mb-3 font-mono">
              ${inscripcion.monto} <span className="text-xs text-[#8B7AA8]">{inscripcion.moneda}</span>
            </div>
            <a 
              href={inscripcion.linkStripe}
              target="_blank"
              rel="noreferrer"
              className="block w-full py-2 px-4 rounded-xl font-bold uppercase tracking-wider bg-[#E88973] text-black hover:bg-[#C46A4A] hover:text-white transition-all text-[11px] shadow-sm text-center"
            >
              {txtBtnInscripcion}
            </a>
          </div>
        )}

        {/* Conmutador de Vistas */}
        <div className="flex justify-center gap-3 mb-8 w-full max-w-xs mx-auto">
          <button 
            type="button"
            onClick={() => setViewMode('completo')}
            className={`flex-1 px-4 py-2.5 rounded-xl font-bold uppercase text-[10px] tracking-wider border transition-all ${
              viewMode === 'completo' 
                ? 'bg-[#E88973] text-black border-[#E88973]' 
                : 'bg-[#1F3A5F]/40 text-[#F4F1ED] border-[#8B7AA8]/30'
            }`}
          >
            {txtViewCompleto}
          </button>
          <button 
            type="button"
            onClick={() => setViewMode('modulos')}
            className={`flex-1 px-4 py-2.5 rounded-xl font-bold uppercase text-[10px] tracking-wider border transition-all ${
              viewMode === 'modulos' 
                ? 'bg-[#E88973] text-black border-[#E88973]' 
                : 'bg-[#1F3A5F]/40 text-[#F4F1ED] border-[#8B7AA8]/30'
            }`}
          >
            {txtViewModulos}
          </button>
        </div>

        {/* FLUJO A: DIPLOMADO COMPLETO */}
        {viewMode === 'completo' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-6 box-border">
            {programas.map((prog) => {
              const esPresencial = prog.id === 'presencial_stripe';
              const currentPlazo = selectedPlazo[prog.id]; 
              const appliedCoupon = appliedCoupons[prog.id] || '';
              
              return (
                <div key={prog.id} className="p-5 rounded-2xl bg-[#1F3A5F]/30 backdrop-blur-md border border-[#8B7AA8]/30 flex flex-col justify-between shadow-md box-border w-full">
                  <div>
                    <div className="flex justify-between items-center mb-2 gap-2 w-full">
                      <h3 className="text-lg font-bold text-[#E88973] truncate">
                        {txtCompraTotal} ({esPresencial ? txtPresencial : txtOnline})
                      </h3>
                      <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#13263F]/90 text-gray-300 border border-[#8B7AA8]/20 shrink-0">
                        {txtTarjeta}
                      </span>
                    </div>

                    <p className="text-[11px] text-gray-300 leading-relaxed mb-4">
                      {txtSelectPlan}
                    </p>

                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <button
                        type="button"
                        onClick={() => handleSelectPlazo(prog.id, '9')}
                        className={`py-2 px-1 rounded-xl border text-center transition-all ${
                          currentPlazo === '9'
                            ? 'bg-[#8B7AA8] border-[#8B7AA8] text-white font-bold'
                            : 'bg-[#13263F]/50 border-[#8B7AA8]/20 text-gray-300'
                        }`}
                      >
                        <span className="block text-[11px] uppercase tracking-wider">9 {txtMeses}</span>
                        <span className="block text-[9px] opacity-75">{prog.detalles?.["9"]?.beca} {txtBeca}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSelectPlazo(prog.id, '12')}
                        className={`py-2 px-1 rounded-xl border text-center transition-all ${
                          currentPlazo === '12'
                            ? 'bg-[#8B7AA8] border-[#8B7AA8] text-white font-bold'
                            : 'bg-[#13263F]/50 border-[#8B7AA8]/20 text-gray-300'
                        }`}
                      >
                        <span className="block text-[11px] uppercase tracking-wider">12 {txtMeses}</span>
                        <span className="block text-[9px] opacity-75">{prog.detalles?.["12"]?.beca} {txtBeca}</span>
                      </button>
                    </div>

                    {currentPlazo && (
                      <div className="bg-[#13263F]/70 border border-[#8B7AA8]/20 rounded-xl p-3.5 space-y-3 mb-2">
                        <div className="flex justify-between items-center">
                          <span className="text-[11px] text-gray-400">{txtMensualidadLabel}</span>
                          <div className="font-mono text-right text-sm">
                            {appliedCoupon ? (
                              <div>
                                <span className="text-gray-500 line-through text-[10px] mr-2">${prog.detalles?.[currentPlazo]?.mensual}</span>
                                <span className="text-emerald-400 font-bold">${Math.round(prog.detalles?.[currentPlazo]?.mensual * 0.9)} MXN</span>
                              </div>
                            ) : (
                              <span className="text-[#F4F1ED] font-bold">${prog.detalles?.[currentPlazo]?.mensual} MXN</span>
                            )}
                          </div>
                        </div>

                        <div className="pt-2 border-t border-[#8B7AA8]/10">
                          <div className="flex gap-2">
                            <input 
                              type="text"
                              value={couponInputs[prog.id] || ''}
                              onChange={(e) => setCouponInputs(prev => ({ ...prev, [prog.id]: e.target.value }))}
                              placeholder={txtCuponPlaceholder}
                              className={`w-full bg-[#13263F] border rounded-xl px-2 py-1.5 uppercase text-[9px] tracking-wider focus:outline-none font-mono min-w-0 ${
                                appliedCoupon ? 'border-emerald-500 text-emerald-400 bg-emerald-950/20' : 'border-[#8B7AA8]/20 text-white focus:border-[#E88973]'
                              }`}
                            />
                            <button 
                              type="button"
                              onClick={() => handleApplyCoupon(prog.id, currentPlazo)}
                              className={`font-bold px-3 py-1.5 rounded-xl text-[9px] uppercase tracking-wider transition-colors shrink-0 ${
                                appliedCoupon ? 'bg-emerald-500 text-black' : 'bg-[#8B7AA8] hover:bg-[#a394c2] text-white'
                              }`}
                            >
                              {appliedCoupon ? 'OK' : txtBtnAplicar}
                            </button>
                          </div>
                        </div>

                        <div className="pt-1">
                          <a 
                            href={appliedCoupon ? `${currentPlazo === '9' ? prog.link9Meses : prog.link12Meses}?prefilled_promo_code=${appliedCoupon}` : (currentPlazo === '9' ? prog.link9Meses : prog.link12Meses)} 
                            target="_blank" 
                            rel="noreferrer" 
                            className={`block text-center text-[11px] font-bold uppercase tracking-wider py-2 rounded-xl transition-all shadow-md ${
                              appliedCoupon ? 'bg-emerald-400 text-black' : 'bg-[#E88973] text-black hover:bg-[#C46A4A] hover:text-white'
                            }`}
                          >
                            {txtBtnPagar} {currentPlazo} {txtMeses} {appliedCoupon && txtConDescuento}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* FLUJO B: MÓDULOS INDIVIDUALES */}
        {viewMode === 'modulos' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-6 box-border">
            {modulos.filter(mod => mod.disponible === true).map((mod) => {
              return (
                <div key={mod.numero} className="p-4 rounded-2xl bg-[#1F3A5F]/30 backdrop-blur-md border border-[#8B7AA8]/20 flex flex-col justify-between shadow-md box-border w-full">
                  <div className="mb-3 w-full">
                    <div className="flex justify-between items-center mb-1 gap-2 w-full">
                      <h3 className="text-sm font-bold text-[#F4F1ED] truncate">
                        Módulo {mod.numero}
                      </h3>
                      <span className="text-xs font-bold font-mono text-[#E88973] bg-[#13263F]/60 px-2 py-0.5 rounded-md border border-gray-800 shrink-0">
                        ${mod.monto} MXN
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-300 leading-snug">
                      {txtModuloDefaultDesc}
                    </p>
                  </div>

                  <div className="w-full">
                    <a 
                      href={mod.linkStripe}
                      target="_blank" 
                      rel="noreferrer"
                      className="block text-center w-full py-2.5 px-3 rounded-xl text-[10px] font-bold uppercase tracking-wider bg-[#F4F1ED] text-black hover:bg-white transition-all shadow-sm"
                    >
                      {txtBtnModulo} {mod.numero}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* BOTÓN DISPARADOR DEL POP-UP (POLÍTICAS) */}
        <div className="w-full text-center mt-4 mb-2">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="text-[11px] uppercase font-bold tracking-widest text-[#E88973] hover:text-[#C46A4A] underline transition-colors cursor-pointer"
          >
            {txtVerPoliticas}
          </button>
        </div>

      </div>

      {/* MODAL POP-UP DE POLÍTICAS FLOTANTE */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#13263F] border border-[#8B7AA8]/40 rounded-2xl w-full max-w-lg max-h-[80dvh] flex flex-col p-6 shadow-2xl relative">
            
            {/* Cabecera del Pop-up */}
            <div className="flex justify-between items-center border-b border-[#8B7AA8]/20 pb-3 mb-4 shrink-0">
              <h3 className="text-xs uppercase font-bold tracking-widest text-[#E88973]">
                {txtPoliticasTituloModal}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white font-bold font-mono text-base px-2 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Cuerpo del Pop-up con scroll interno independiente */}
            <div className="overflow-y-auto flex-1 pr-1 space-y-4 custom-scrollbar">
              {Array.isArray(politicasTraducidas) && politicasTraducidas.map((pol, idx) => (
                <div key={idx} className="text-[11px] leading-relaxed border-b border-gray-800/40 pb-3">
                  <span className="font-bold text-[#8B7AA8] uppercase tracking-wider block mb-1">
                    {pol.tipo}:
                  </span>
                  <p className="text-gray-300">
                    {pol.regla}
                  </p>
                </div>
              ))}
            </div>

            {/* Botón de Cierre Inferior */}
            <div className="pt-4 border-t border-[#8B7AA8]/20 mt-3 text-center shrink-0">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="py-2 px-6 rounded-xl font-bold uppercase tracking-wider bg-[#8B7AA8] text-white hover:bg-[#a394c2] transition-colors text-[10px]"
              >
                {txtBtnEntendido}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}