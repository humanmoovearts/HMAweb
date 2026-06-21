import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// DICCIONARIO DE CUPONES (Fase 3 - Frontend Only)
const CUPONES_VALIDOS = {
  "REVOLUCION": {
    porcentaje: 35,
    stripeLinks: {
      mxn: {
        presencial_9: "https://stripe.com/mxn_presencial_9_desc35",
        presencial_12: "https://stripe.com/mxn_presencial_12_desc35",
        online_9: "https://stripe.com/mxn_online_9_desc35",
        online_12: "https://stripe.com/mxn_online_12_desc35",
      },
      usd: {
        presencial_9: "https://stripe.com/usd_presencial_9_desc35",
        presencial_12: "https://stripe.com/usd_presencial_12_desc35",
        online_9: "https://stripe.com/usd_online_9_desc35",
        online_12: "https://stripe.com/usd_online_12_desc35",
      }
    }
  }
};

export default function Inversion() {
  const { t, i18n } = useTranslation();
  
  // ESTADOS DE CONTROL
  const [esMexico, setEsMexico] = useState(true); 
  const [cargandoPais, setCargandoPais] = useState(true);
  const [codigoCupon, setCodigoCupon] = useState("");
  const [descuentoAplicado, setDescuentoAplicado] = useState(null); 
  const [errorCupon, setErrorCupon] = useState(false);

  // Estados para controlar el plazo de Stripe seleccionado mediante radio buttons
  const [plazoPresencial, setPlazoPresencial] = useState("9");
  const [plazoOnline, setPlazoOnline] = useState("9");

  const isEnglish = i18n.language === 'en';

  // 1. DETECCIÓN AUTOMÁTICA DE PAÍS
  useEffect(() => {
    let unmounted = false;
    fetch('https://ipapi.co/json/')
      .then((res) => res.json())
      .then((data) => {
        if (!unmounted && data.country_code !== 'MX') {
          setEsMexico(false);
        }
      })
      .catch((err) => console.error("Error al detectar IP:", err))
      .finally(() => {
        if (!unmounted) setCargandoPais(false);
      });
    return () => { unmounted = true; };
  }, []);

  // LINKS DE STRIPE BASE
  const linksOriginales = {
    mxn: {
      presencial_9: "https://stripe.com/link_mxn_presencial_9_base",
      presencial_12: "https://stripe.com/link_mxn_presencial_12_base",
      online_9: "https://stripe.com/link_mxn_online_9_base",
      online_12: "https://stripe.com/link_mxn_online_12_base",
    },
    usd: {
      presencial_9: "https://stripe.com/link_usd_presencial_9_base",
      presencial_12: "https://stripe.com/link_usd_presencial_12_base",
      online_9: "https://stripe.com/link_usd_online_9_base",
      online_12: "https://stripe.com/link_usd_online_12_base",
    }
  };

  // 2. EXTRAER DATA DEL JSON 
  const icData = t('costos_y_financiamiento.inscripcion', { returnObjects: true }) || {};
  const pols = t('costos_y_financiamiento.politicas', { returnObjects: true }) || [];

  // 3. VALIDACIÓN DE CUPÓN LOCAL
  const handleValidarCupon = (e) => {
    e.preventDefault();
    const codigoClean = codigoCupon.trim().toUpperCase();
    if (CUPONES_VALIDOS[codigoClean]) {
      setDescuentoAplicado(CUPONES_VALIDOS[codigoClean]);
      setErrorCupon(false);
    } else {
      setDescuentoAplicado(null);
      setErrorCupon(true);
    }
  };

  // 4. RESOLVER ENLACE DE PAGO
  const resolverStripeLink = (modalidadKey, plazoStr) => {
    const moneda = esMexico ? 'mxn' : 'usd';
    const llave = `${modalidadKey}_${plazoStr}`;
    if (descuentoAplicado?.stripeLinks[moneda]?.[llave]) {
      return descuentoAplicado.stripeLinks[moneda][llave];
    }
    return linksOriginales[moneda][llave] || "#";
  };

  // 5. APLICAR DESCUENTO VISUAL
  const calcularPrecioVisual = (precioBase) => {
    if (descuentoAplicado) {
      return precioBase * (1 - descuentoAplicado.porcentaje / 100);
    }
    return precioBase;
  };

  if (cargandoPais) {
    return (
      <div className="w-full h-screen bg-[#13263F] flex items-center justify-center text-[#F4F1ED]">
        <p className="text-xl font-light tracking-widest animate-pulse uppercase">
          {isEnglish ? 'LOADING...' : 'CARGANDO...'}
        </p>
      </div>
    );
  }

  return (
    <section id="inversion" className="w-full min-h-screen bg-[#13263F] py-20 px-6 md:px-12 text-[#F4F1ED] relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* TÍTULO PRINCIPAL */}
        <h2 className="text-5xl md:text-6xl font-bold uppercase tracking-tight mb-10 text-left pl-2">
          {isEnglish ? 'INVESTMENT' : 'INVERSIÓN'}
        </h2>

        {/* INPUT DE CUPONES */}
        <div className="mb-12 max-w-sm pl-2">
          <form onSubmit={handleValidarCupon} className="flex gap-2">
            <input 
              type="text"
              value={codigoCupon}
              onChange={(e) => setCodigoCupon(e.target.value)}
              placeholder={isEnglish ? "ENTER CODE" : "CÓDIGO DE DESCUENTO"}
              className="bg-white/5 border border-white/15 rounded-md px-4 py-2 text-xs uppercase tracking-wider focus:outline-none focus:border-[#E88973] w-full"
            />
            <button type="submit" className="bg-[#F4F1ED] text-[#13263F] text-xs font-bold uppercase px-5 py-2 rounded-md hover:bg-[#E88973] hover:text-white transition-colors shrink-0">
              {isEnglish ? 'APPLY' : 'APLICAR'}
            </button>
          </form>
          {descuentoAplicado && <p className="text-[11px] text-emerald-400 mt-1 font-medium">✓ {descuentoAplicado.porcentaje}% {isEnglish ? 'discount applied.' : 'de descuento aplicado a Stripe.'}</p>}
          {errorCupon && <p className="text-[11px] text-rose-400 mt-1 font-medium">✕ {isEnglish ? 'Invalid code.' : 'Código inválido.'}</p>}
        </div>

        {/* GRID DE CARTAS DIRECTAS DE INVERSIÓN */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* CARTA 1: INSCRIPCIÓN OBLIGATORIA */}
          <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-[40px] p-8 flex flex-col justify-between shadow-xl">
            <div>
              <h3 className="text-2xl font-bold uppercase tracking-wide mb-6 border-b border-white/5 pb-2 text-[#E88973]">
                1. INSCRIPCIÓN
              </h3>
              <p className="text-sm font-light text-white/70 leading-relaxed mb-6">
                {esMexico ? icData.descripcion : (isEnglish ? 'Initial mandatory admission fee to secure your place.' : 'Pago inicial obligatorio requerido para asegurar el lugar.')}
              </p>
              <div className="mt-2">
                <span className="text-xs text-white/40 uppercase tracking-wider block font-bold">Monto Único</span>
                <span className="text-3xl font-black text-[#F4F1ED]">${esMexico ? icData.monto : '90'} {esMexico ? 'MXN' : 'USD'}</span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-8 border-t border-white/5 pt-4">
              <a href="https://stripe.com/link_inscripcion_base" target="_blank" rel="noreferrer" className="border border-white/30 hover:border-white text-xs uppercase tracking-widest px-8 py-3 font-medium transition-colors">
                PAGAR
              </a>
              <div className="w-8 h-8 border border-white/20 rounded-full flex items-center justify-center text-xs opacity-50">$</div>
            </div>
          </div>

          {/* CARTA 2: MODALIDAD PRESENCIAL - TOTAL CURSO */}
          <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-[40px] p-8 flex flex-col justify-between shadow-xl">
            <div>
              <h3 className="text-2xl font-bold uppercase tracking-wide mb-6 border-b border-white/5 pb-2">
                2. PRESENCIAL TOTAL
              </h3>
              <p className="text-sm font-light text-white/70 leading-relaxed mb-6">
                Pago de contado único correspondiente a la totalidad del programa presencial de 8 meses de duración.
              </p>
              <div>
                <span className="text-xs text-white/40 uppercase tracking-wider block font-bold">Costo Total Sin Beca</span>
                <span className="text-3xl font-black text-[#F4F1ED]">${esMexico ? '24,000' : '1,200'} {esMexico ? 'MXN' : 'USD'}</span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-8 border-t border-white/5 pt-4">
              <a href="https://stripe.com/link_presencial_total" target="_blank" rel="noreferrer" className="border border-white/30 hover:border-white text-xs uppercase tracking-widest px-8 py-3 font-medium transition-colors">
                COMPRAR
              </a>
              <div className="w-8 h-8 border border-white/20 rounded-full flex items-center justify-center text-xs opacity-50">$</div>
            </div>
          </div>

          {/* CARTA 3: MODALIDAD PRESENCIAL - MENSUAL */}
          <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-[40px] p-8 flex flex-col justify-between shadow-xl">
            <div>
              <h3 className="text-2xl font-bold uppercase tracking-wide mb-6 border-b border-white/5 pb-2">
                3. PRESENCIAL MENSUAL
              </h3>
              
              <div className="space-y-2 mb-6">
                <p className="text-[11px] text-white/40 uppercase tracking-wider font-bold">Opción Tarjeta (Stripe)</p>
                <label className="flex items-center justify-between text-xs cursor-pointer py-1.5 bg-white/5 px-3 rounded-lg border border-white/5">
                  <span className="flex items-center gap-2">
                    <input type="radio" name="plazoPres" checked={plazoPresencial === "9"} onChange={() => setPlazoPresencial("9")} className="accent-[#E88973]" />
                    9 meses (20% beca):
                  </span>
                  <span className="font-bold">${Math.round(calcularPrecioVisual(2133))}/mes</span>
                </label>
                <label className="flex items-center justify-between text-xs cursor-pointer py-1.5 bg-white/5 px-3 rounded-lg border border-white/5">
                  <span className="flex items-center gap-2">
                    <input type="radio" name="plazoPres" checked={plazoPresencial === "12"} onChange={() => setPlazoPresencial("12")} className="accent-[#E88973]" />
                    12 meses (15% beca):
                  </span>
                  <span className="font-bold">${Math.round(calcularPrecioVisual(1700))}/mes</span>
                </label>
              </div>

              {esMexico && (
                <div className="space-y-1 pt-2 border-t border-white/5">
                  <p className="text-[11px] text-white/40 uppercase tracking-wider font-bold">Opción Efectivo / Transferencia</p>
                  <div className="flex justify-between text-xs text-white/80">
                    <span>Plan 30% beca:</span>
                    <span className="font-medium">$2,100/mes</span>
                  </div>
                  <div className="flex justify-between text-xs text-white/80">
                    <span>Plan 35% beca:</span>
                    <span className="font-medium">$1,950/mes</span>
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between mt-8 border-t border-white/5 pt-4">
              <a href={resolverStripeLink('presencial', plazoPresencial)} target="_blank" rel="noreferrer" className="border border-white/30 hover:border-white text-xs uppercase tracking-widest px-8 py-3 font-medium transition-colors">
                COMPRAR
              </a>
              <div className="w-8 h-8 border border-white/20 rounded-full flex items-center justify-center text-xs opacity-50">$</div>
            </div>
          </div>

          {/* CARTA 4: MODALIDAD ONLINE - MENSUAL */}
          <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-[40px] p-8 flex flex-col justify-between shadow-xl">
            <div>
              <h3 className="text-2xl font-bold uppercase tracking-wide mb-6 border-b border-white/5 pb-2">
                4. ONLINE MENSUAL
              </h3>
              
              <div className="space-y-2 mb-6">
                <p className="text-[11px] text-white/40 uppercase tracking-wider font-bold">Opción Tarjeta (Stripe)</p>
                <label className="flex items-center justify-between text-xs cursor-pointer py-1.5 bg-white/5 px-3 rounded-lg border border-white/5">
                  <span className="flex items-center gap-2">
                    <input type="radio" name="plazoOn" checked={plazoOnline === "9"} onChange={() => setPlazoOnline("9")} className="accent-[#E88973]" />
                    9 meses (20% beca):
                  </span>
                  <span className="font-bold">${Math.round(calcularPrecioVisual(1849))}/mes</span>
                </label>
                <label className="flex items-center justify-between text-xs cursor-pointer py-1.5 bg-white/5 px-3 rounded-lg border border-white/5">
                  <span className="flex items-center gap-2">
                    <input type="radio" name="plazoOn" checked={plazoOnline === "12"} onChange={() => setPlazoOnline("12")} className="accent-[#E88973]" />
                    12 meses (15% beca):
                  </span>
                  <span className="font-bold">${Math.round(calcularPrecioVisual(1473))}/mes</span>
                </label>
              </div>

              {esMexico && (
                <div className="space-y-1 pt-2 border-t border-white/5">
                  <p className="text-[11px] text-white/40 uppercase tracking-wider font-bold">Opción Efectivo / Transferencia</p>
                  <div className="flex justify-between text-xs text-white/80">
                    <span>Plan 30% beca:</span>
                    <span className="font-medium">$1,820/mes</span>
                  </div>
                  <div className="flex justify-between text-xs text-white/80">
                    <span>Plan 35% beca:</span>
                    <span className="font-medium">$1,690/mes</span>
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between mt-8 border-t border-white/5 pt-4">
              <a href={resolverStripeLink('online', plazoOnline)} target="_blank" rel="noreferrer" className="border border-white/30 hover:border-white text-xs uppercase tracking-widest px-8 py-3 font-medium transition-colors">
                COMPRAR
              </a>
              <div className="w-8 h-8 border border-white/20 rounded-full flex items-center justify-center text-xs opacity-50">$</div>
            </div>
          </div>

          {/* CARTA 5: POLÍTICAS DE PAGO */}
          <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-[40px] p-8 flex flex-col justify-between shadow-xl md:col-span-2 lg:col-span-1">
            <div>
              <h3 className="text-2xl font-bold uppercase tracking-wide mb-6 border-b border-white/5 pb-2 text-[#8B7AA8]">
                POLÍTICAS DE PAGO
              </h3>
              <ul className="space-y-3 text-xs font-light text-white/80 leading-relaxed list-disc list-inside">
                {pols.map((pol, i) => (
                  <li key={i}>
                    <strong>{pol.tipo}:</strong> {pol.regla}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center justify-between mt-8 border-t border-white/5 pt-4">
              <button 
                onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
                className="border border-white/30 hover:border-white text-xs uppercase tracking-widest px-8 py-3 font-medium transition-colors"
              >
                READ MORE
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}