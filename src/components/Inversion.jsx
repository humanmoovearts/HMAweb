import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function Inversion() {
  const { t, i18n } = useTranslation();
  const [db, setDb] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [viewMode, setViewMode] = useState('completo'); 
  
  // Estado para cupones del Diplomado Completo (por programa ID)
  const [progCoupons, setProgCoupons] = useState({});
  const [appliedProgCoupons, setAppliedProgCoupons] = useState({});

  useEffect(() => {
    // Origen de los datos de Stripe / Cloudflare Worker
    const origin = window.location.hostname === 'localhost' ? '' : 'https://tu-worker.workers.dev';
    fetch(`${origin}/api/checkout-data.json`)
      .then((res) => res.json())
      .then((data) => {
        setDb(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error cargando base de datos desde Cloudflare:", err);
        setLoading(false);
      });
  }, []);

  // Validación de cupones para el Diplomado Completo (Presencial / Online)
  const handleApplyCouponToProgram = (progId) => {
    const cleanCoupon = (progCoupons[progId] || '').toUpperCase().trim();
    
    // Mapeamos los cupones válidos globalmente desde los módulos del JSON para validación en la compra completa
    const todosLosCuponesValidos = db?.modulos?.flatMap(m => m.cuponesValidos) || [];
    
    if (todosLosCuponesValidos.includes(cleanCoupon) && cleanCoupon !== '') {
      setAppliedProgCoupons((prev) => ({ ...prev, [progId]: cleanCoupon }));
    } else {
      setAppliedProgCoupons((prev) => ({ ...prev, [progId]: '' }));
      alert(i18n.language === 'en' ? "Invalid promotional code." : "Código promocional inválido.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] bg-[#13263F] text-[#F4F1ED]">
        <p className="text-xs tracking-widest uppercase font-mono animate-pulse">
          {t('costos_y_financiamiento.ui.cargando', 'Cargando opciones de inversión...')}
        </p>
      </div>
    );
  }

  const programasTraducidos = t('costos_y_financiamiento.programas', { returnObjects: true }) || [];

  return (
    <div 
      id="inversion" 
      className="w-full relative bg-gradient-to-b from-[#13263F] to-[#0d1b2d] text-[#F4F1ED] font-sans block clear-both overflow-x-hidden pt-12 pb-24"
    >
      <div className="w-full max-w-6xl mx-auto px-4 box-border block static">
        
        {/* Cabecera Principal */}
        <div className="text-center mb-10 block w-full">
          <h2 className="text-3xl md:text-5xl font-bold text-[#F4F1ED] mb-3 uppercase tracking-wider block">
            {t('navegacion.2.etiqueta', 'Inversión')}
          </h2>
          <div className="w-16 h-1 bg-[#E88973] mx-auto rounded-full block"></div>
        </div>

        {/* Paso 1: Inscripción Inicial Obligatoria */}
        {db?.inscripcion?.disponible && (
          <div className="mb-10 p-5 md:p-6 rounded-2xl bg-[#1F3A5F]/40 backdrop-blur-md border border-[#8B7AA8]/40 max-w-md mx-auto text-center shadow-xl block">
            <h3 className="text-[10px] uppercase font-bold tracking-widest text-[#E88973] mb-1 block">
              {t('costos_y_financiamiento.ui.paso1', 'Paso 1')}
            </h3>
            <h4 className="text-lg font-bold text-[#F4F1ED] mb-2 block">
              Inscripción Inicial Obligatoria
            </h4>
            <p className="text-[11px] text-gray-300 max-w-xs mx-auto mb-4 leading-normal block">
              {db.inscripcion.descripcion || t('costos_y_financiamiento.inscripcion.descripcion')}
            </p>
            <div className="text-3xl font-extrabold text-[#F4F1ED] mb-4 font-mono block">
              ${db.inscripcion.monto} <span className="text-sm text-[#8B7AA8]">{db.inscripcion.moneda}</span>
            </div>
            <a 
              href={db.inscripcion.linkStripe}
              target="_blank"
              rel="noreferrer"
              className="block w-full py-2.5 px-4 rounded-xl font-bold uppercase tracking-wider bg-[#E88973] text-black hover:bg-[#C46A4A] hover:text-white transition-all text-[11px] shadow-md"
            >
              {t('costos_y_financiamiento.ui.asegurar_lugar', 'Asegurar mi lugar')}
            </a>
          </div>
        )}

        {/* Conmutador de Vistas */}
        <div className="flex justify-center gap-3 mb-10 w-full max-w-xs mx-auto sm:max-w-none">
          <button 
            onClick={() => setViewMode('completo')}
            className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl font-bold uppercase text-[11px] tracking-wider border transition-all ${
              viewMode === 'completo' 
                ? 'bg-[#E88973] text-black border-[#E88973] shadow-[0_0_12px_rgba(232,137,115,0.2)]' 
                : 'bg-[#1F3A5F]/40 text-[#F4F1ED] border-[#8B7AA8]/30'
            }`}
          >
            Diplomado Completo
          </button>
          <button 
            onClick={() => setViewMode('modulos')}
            className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl font-bold uppercase text-[11px] tracking-wider border transition-all ${
              viewMode === 'modulos' 
                ? 'bg-[#E88973] text-black border-[#E88973] shadow-[0_0_12px_rgba(232,137,115,0.2)]' 
                : 'bg-[#1F3A5F]/40 text-[#F4F1ED] border-[#8B7AA8]/30'
            }`}
          >
            Módulos Individuales
          </button>
        </div>

        {/* FLUJO A: DIPLOMADO COMPLETO (Con validación de cupones) */}
        {viewMode === 'completo' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12 w-full box-border">
            {db?.programas?.map((prog) => {
              const infoTraducida = programasTraducidos.find(p => p.id === (prog.id === 'presencial_stripe' ? 1 : 3)) || {};
              const hasAppliedProgCoupon = appliedProgCoupons[prog.id];
              
              return (
                <div key={prog.id} className="p-5 md:p-6 rounded-2xl bg-[#1F3A5F]/30 backdrop-blur-md border border-[#8B7AA8]/30 flex flex-col justify-between shadow-lg box-border w-full">
                  <div>
                    <div className="flex justify-between items-center mb-3 gap-2 w-full">
                      <h3 className="text-xl font-bold text-[#E88973] truncate">
                        Compra Total ({infoTraducida.modalidad || prog.modalidad})
                      </h3>
                      <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#13263F]/90 text-gray-300 border border-[#8B7AA8]/20 shrink-0">
                        {infoTraducida.metodo_pago || 'Tarjeta'}
                      </span>
                    </div>

                    <p className="text-[11px] text-gray-300 leading-relaxed mb-4 block">
                      Adquiere el acceso completo al diplomado bajo la modalidad {(infoTraducida.modalidad || prog.modalidad).toLowerCase()}.
                    </p>

                    <div className="space-y-2 text-xs bg-[#13263F]/50 p-3 rounded-xl border border-[#8B7AA8]/10 shadow-inner block w-full box-border mb-4">
                      {infoTraducida.opciones_financiamiento?.map((opc, oIdx) => {
                        const detallesPlazo = prog.detalles?.[opc.plazo_mensualidades.toString()];
                        return (
                          <div key={oIdx} className={`flex justify-between items-center w-full ${oIdx > 0 ? 'border-t border-gray-800/40 pt-2' : ''}`}>
                            <span className="text-gray-400 text-[11px]">
                              {opc.plazo_mensualidades} Meses ({opc.porcentaje_beca || detallesPlazo?.beca} Beca):
                            </span>
                            <span className="font-bold font-mono text-[#F4F1ED]">
                              ${opc.pago_mensual || detallesPlazo?.mensual} {prog.moneda || 'MXN'}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Input de cupón exclusivo para el Diplomado Completo */}
                    <div className="mb-4 pt-2 border-t border-[#8B7AA8]/10 block w-full">
                      <div className="flex gap-2 w-full">
                        <input 
                          type="text"
                          value={progCoupons[prog.id] || ''}
                          onChange={(e) => setProgCoupons(prev => ({ ...prev, [prog.id]: e.target.value }))}
                          placeholder={t('costos_y_financiamiento.ui.codigo', 'CÓDIGO')}
                          className="w-full bg-[#13263F] border border-[#8B7AA8]/20 rounded-xl px-2.5 py-1.5 uppercase text-[10px] tracking-wider focus:outline-none focus:border-[#E88973] text-white font-mono min-w-0"
                        />
                        <button 
                          onClick={() => handleApplyCouponToProgram(prog.id)}
                          className="bg-[#8B7AA8] hover:bg-[#a394c2] text-white font-bold px-3 py-1.5 rounded-xl text-[10px] uppercase tracking-wider transition-colors shrink-0"
                        >
                          {t('costos_y_financiamiento.ui.aplicar', 'Aplicar')}
                        </button>
                      </div>
                      {hasAppliedProgCoupon && (
                        <p className="text-[10px] text-emerald-400 mt-1 font-medium block">✓ {t('costos_y_financiamiento.ui.cupon_ok', 'Cupón aplicado')}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-2 w-full">
                    {prog.disponible ? (
                      <>
                        <a 
                          href={hasAppliedProgCoupon ? `${prog.link9Meses}?prefilled_promo_code=${hasAppliedProgCoupon}` : prog.link9Meses} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="block text-center text-[10px] font-bold uppercase tracking-wider bg-[#F4F1ED] text-black py-2.5 rounded-xl hover:bg-white transition-all shadow-sm"
                        >
                          Plan 9 Meses
                        </a>
                        <a 
                          href={hasAppliedProgCoupon ? `${prog.link12Meses}?prefilled_promo_code=${hasAppliedProgCoupon}` : prog.link12Meses} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="block text-center text-[10px] font-bold uppercase tracking-wider bg-[#8B7AA8] text-white py-2.5 rounded-xl hover:bg-[#a394c2] transition-all"
                        >
                          Plan 12 Meses
                        </a>
                      </>
                    ) : (
                      <button 
                        disabled 
                        className="col-span-2 text-center text-xs font-bold uppercase bg-gray-700 text-gray-500 py-2.5 rounded-xl cursor-not-allowed"
                      >
                        No disponible
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* FLUJO B: POR MÓDULOS INDIVIDUALES (Sin inputs de códigos promocionales) */}
        {viewMode === 'modulos' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12 w-full box-border">
            {db?.modulos?.map((mod) => {
              const displayTitle = t(`contenido_tematico.modulos.${mod.numero - 1}.titulo`, "Módulo Académico");
              
              return (
                <div key={mod.numero} className="p-5 rounded-2xl bg-[#1F3A5F]/30 backdrop-blur-md border border-[#8B7AA8]/20 flex flex-col justify-between shadow-lg box-border w-full">
                  <div className="mb-4 w-full">
                    <div className="flex justify-between items-center mb-2 gap-2 w-full">
                      <h3 className="text-base font-bold text-[#F4F1ED] truncate">
                        Módulo {mod.numero}
                      </h3>
                      {mod.disponible && (
                        <span className="text-xs font-bold font-mono text-[#E88973] bg-[#13263F]/60 px-2 py-0.5 rounded-md border border-gray-800 shrink-0">
                          ${mod.monto} MXN
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-gray-300 leading-snug line-clamp-2 block">
                      {displayTitle}
                    </p>
                  </div>

                  <div className="w-full">
                    {mod.disponible ? (
                      <a 
                        href={mod.linkStripe}
                        target="_blank" 
                        rel="noreferrer"
                        className="block text-center w-full py-2.5 px-3 rounded-xl text-[11px] font-bold uppercase tracking-wider bg-[#F4F1ED] text-black hover:bg-white transition-all shadow-sm"
                      >
                        {t('costos_y_financiamiento.ui.comprar_modulo', 'Adquirir Módulo')} {mod.numero}
                      </a>
                    ) : (
                      <button 
                        disabled 
                        className="w-full text-center text-[11px] font-bold uppercase bg-gray-800 text-gray-500 py-2.5 rounded-xl cursor-not-allowed"
                      >
                        {t('costos_y_financiamiento.ui.proximamente', 'Próximamente')}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* SECCIÓN DE POLÍTICAS DE USO DINÁMICAS */}
        <div className="max-w-3xl mx-auto pt-6 border-t border-[#8B7AA8]/20 block w-full box-border">
          <h3 className="text-[11px] uppercase font-bold tracking-widest text-[#E88973] text-center mb-4 block">
            {t('costos_y_financiamiento.ui.politicas_titulo', 'Políticas de Financiamiento y Uso')}
          </h3>
          <div className="bg-[#1A2E4C]/40 border border-[#8B7AA8]/20 rounded-xl p-4 space-y-3 shadow-inner backdrop-blur-sm block w-full box-border">
            {(() => {
              const politicasArray = t('costos_y_financiamiento.politicas', { returnObjects: true });
              if (Array.isArray(politicasArray) && politicasArray.length > 0) {
                return politicasArray.map((pol, idx) => (
                  <div key={idx} className="text-[11px] flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 leading-relaxed w-full">
                    <span className="font-bold min-w-[160px] sm:text-right text-[#8B7AA8] uppercase tracking-wider block shrink-0">
                      {pol.tipo}:
                    </span>
                    <p className="text-gray-300 flex-1">
                      {pol.regla}
                    </p>
                  </div>
                ));
              }
              return null;
            })()}
          </div>
        </div>

      </div>
    </div>
  );
}
