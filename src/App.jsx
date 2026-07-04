// src/App.jsx
import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// IMPORTACIÓN EN TU ORDEN EXACTO SOLICITADO
import Navbar from './components/NavBar';
import Hero from './components/Hero';
import About from './components/About';
import Diplomado from './components/DiplomadoInfo.jsx'; // Tu componente de información del diplomado
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
      touchMultiplier: 0.8, // Evita saltos bruscos en móviles
    });

    // 2. Vincular con GSAP ScrollTrigger para que tus cartas aparezcan perfectamente
    lenis.on('scroll', ScrollTrigger.update);

    const handleTicker = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(handleTicker);
    gsap.ticker.lagSmoothing(0);

    // 3. EFECTO IMPLEMENTACIÓN DE SLIDER / SWIPER SUAVE
    let isSnapping = false;

    const handleSnap = () => {
      if (isSnapping) return;

      const sections = gsap.utils.toArray('.snap-section');
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      let closestSection = sections[0];
      let minDistance = Infinity;

      // Calculamos de forma matemática cuál sección está más cerca del tope
      sections.forEach((section) => {
        const distance = Math.abs(section.offsetTop - scrollY);
        if (distance < minDistance) {
          minDistance = distance;
          closestSection = section;
        }
      });

      // Si el usuario soltó el scroll a mitad de camino, lo atraemos como imán
      if (minDistance > 10 && minDistance < windowHeight * 0.4) {
        isSnapping = true;
        lenis.scrollTo(closestSection, {
          duration: 0.7,
          lock: true, // Evita interferencias mientras viaja a la sección
          onComplete: () => {
            isSnapping = false;
          },
        });
      }
    };

    // Escuchamos cuando el scroll se detiene para hacer el efecto de imán/swiper
    lenis.on('scroll', () => {
      clearTimeout(window.snapTimeout);
      window.snapTimeout = setTimeout(handleSnap, 120);
    });

    // Limpieza estricta para evitar fugas de memoria en React 19 Strict Mode
    return () => {
      lenis.destroy();
      gsap.ticker.remove(handleTicker);
      clearTimeout(window.snapTimeout);
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

      <section id="diplomado" className="snap-section h-[100dvh] w-full overflow-hidden relative">
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
