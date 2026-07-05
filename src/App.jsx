// src/App.jsx
import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// IMPORTACIÓN EN TU ORDEN EXACTO SOLICITADO
import Navbar from './components/NavBar';
import Hero from './components/Hero';
import About from './components/About';
import Diplomado from './components/DiplomadoInfo.jsx'; 
import Contenido from './components/Contenido';
import Inversion from './components/Inversion';
import Maestros from './components/Maestros';
import Testimonios from './components/Testimonios';
import Proposito from './components/Propósito'; 
import ContactoFooter from './components/ContactoFooter';
import BotonContacto from './components/BotonContacto.jsx';
import CheckoutStatusModal from './components/CheckoutStatusModal.jsx';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function App() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 1. Inicializar Lenis para el scroll global de la Landing Page
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 0.8, 
    });

    // 2. Vincular con GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const handleTicker = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(handleTicker);
    gsap.ticker.lagSmoothing(0);

    // 3. EFECTO SNAP / IMÁN CONFIGURADO POR INTENCIÓN (DIRECCIONAL)
    let isSnapping = false;
    let snapTimeout = null;

    const handleSnap = () => {
      if (isSnapping) return;

      const sections = gsap.utils.toArray('.snap-section');
      const currentScroll = lenis.scroll;
      const windowHeight = window.innerHeight;

      // Detectar en qué sección se encuentra el scroll actualmente
      let currentSectionIndex = 0;
      for (let i = 0; i < sections.length; i++) {
        if (currentScroll >= sections[i].offsetTop - 10) {
          currentSectionIndex = i;
        }
      }

      const currentSection = sections[currentSectionIndex];
      const nextSection = sections[currentSectionIndex + 1];

      // Calcular el progreso del scroll dentro de la sección actual
      const distanceIntoCurrent = currentScroll - currentSection.offsetTop;
      const progressIntoCurrent = distanceIntoCurrent / windowHeight;

      const direction = lenis.direction; // 1 = Abajo, -1 = Arriba, 0 = Quieto
      let targetSection = currentSection;

      // Umbral de sensibilidad: Con superar el 12% del alto de pantalla, el imán te lleva
      const threshold = 0.12;

      if (direction === 1 && nextSection) {
        // Si el usuario scrolea hacia abajo y pasó el umbral, lo deslizamos a la siguiente sección
        if (progressIntoCurrent > threshold) {
          targetSection = nextSection;
        }
      } else if (direction === -1 && currentSectionIndex > 0) {
        // Si va hacia arriba y le falta más del 12% para rellenar la sección superior, regresamos
        if (progressIntoCurrent < (1 - threshold)) {
          targetSection = currentSection;
        } else if (sections[currentSectionIndex - 1]) {
          targetSection = sections[currentSectionIndex - 1];
        }
      } else {
        // Fallback: Si se detiene en seco sin dirección clara, busca el más cercano absoluto
        let minDistance = Infinity;
        sections.forEach((sec) => {
          const dist = Math.abs(sec.offsetTop - currentScroll);
          if (dist < minDistance) {
            minDistance = dist;
            targetSection = sec;
          }
        });
      }

      // Ejecutar la animación del imán de forma fluida
      if (Math.abs(targetSection.offsetTop - currentScroll) > 4) {
        isSnapping = true;
        lenis.scrollTo(targetSection, {
          duration: 0.7,
          lock: true, // Evita micro-interrupciones del dedo mientras viaja
          ease: (t) => t * (2 - t), // Curva suave power1.out
          onComplete: () => {
            isSnapping = false;
          },
        });
      }
    };

    // Escuchar el final del movimiento del scroll
    lenis.on('scroll', () => {
      if (isSnapping) return;
      clearTimeout(snapTimeout);
      // 150ms es el tiempo ideal para absorber la inercia del dedo en pantallas táctiles
      snapTimeout = setTimeout(handleSnap, 150);
    });

    // Limpieza estricta para React 19 Strict Mode
    return () => {
      lenis.destroy();
      gsap.ticker.remove(handleTicker);
      clearTimeout(snapTimeout);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="w-full text-hueso bg-azulOscuro selection:bg-coral selection:text-white overflow-x-hidden">
      {/* Menú de navegación global */}
      <Navbar />

      {/* FLUJO EN TU ORDEN EXACTO */}
      <section id="inicio" className="snap-section h-[100dvh] w-full overflow-hidden relative">
        <Hero />
      </section>

      <section id="quienes-somos" className="snap-section h-[100dvh] w-full overflow-hidden relative">
        <About />
      </section>

      <section id="diplomado" className="snap-section h-[100dvh] w-full overflow-y-auto relative">
        <Diplomado />
      </section>

      <section id="contenido" className="snap-section h-[100dvh] w-full overflow-hidden relative">
        <Contenido />
      </section>

      <section id="inversion" className="snap-section h-[100dvh] w-full overflow-hidden relative">
        <Inversion />
      </section>

      <section id="maestros" className="snap-section h-[100dvh] w-full overflow-hidden relative">
        <Maestros />
      </section>

      <section id="testimonios" className="snap-section h-[100dvh] w-full overflow-hidden relative">
        <Testimonios />
      </section>

      <section id="proposito" className="snap-section h-[100dvh] w-full overflow-hidden relative">
        <Proposito />
      </section>

      <section id="contacto" className="snap-section h-[100dvh] w-full overflow-hidden relative">
        <ContactoFooter />
      </section>
      
      <BotonContacto />
      <CheckoutStatusModal />
    </div>
  );
}

export default App;