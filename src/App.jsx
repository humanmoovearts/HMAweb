import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Importación de todos tus componentes modulares
import NavBar from './components/NavBar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Inversion from './components/Inversion.jsx';
import Testimonios from './components/Testimonios.jsx';
import Contenido from './components/Contenido.jsx';
import Proposito from './components/Propósito.jsx';
import ContactoFooter from './components/ContactoFooter.jsx';
import MaestrosSection from './components/Maestros.jsx';
import DiplomadoInfo from './components/DiplomadoInfo.jsx';
import BotonContacto from './components/BotonContacto.jsx';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.card-panel');

      cards.forEach((card, i) => {
        // La última sección (ContactoFooter) no se congela, deja que el scroll termine de forma natural
        if (i === cards.length - 1) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top top",
            end: "+=100%", // MATEMÁTICA PERFECTA: Evita el efecto dominó y el auto-solapamiento
            pin: true,
            pinSpacing: false,
            scrub: 1, // Añade un ligero retraso de inercia (1s) para que el scroll se sienta más suave y pesado
            snap: {
              snapTo: 1,
              duration: 0.6,
              delay: 0.1, // Espera a que el usuario termine de mover el dedo antes de magnetizar
              ease: "power2.inOut"
            }
          }
        });

        // 🎯 LA ZONA SEGURA DE LECTURA:
        // Forzamos a que la tarjeta empiece totalmente limpia de 0% a 70% del scroll.
        // El efecto de Blur, escala y opacidad SOLO se ejecuta en el último 30% de la transición.
        tl.fromTo(card, 
          { filter: "blur(0px)", scale: 1, opacity: 1 },
          { 
            filter: "blur(12px)", 
            scale: 0.94, 
            opacity: 0.4, 
            ease: "power1.out" 
          },
          0.7 // <-- Clave: Comienza en el segundo 0.7 de una escala de 0 a 1
        );
      });

      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-[#F4F1ED] overflow-x-hidden relative antialiased block">
      <NavBar />
      
      {/* 1. HERO */}
      <section id="inicio" className="card-panel relative w-full h-dvh bg-[#F4F1ED] z-10 overflow-hidden">
        <Hero />
      </section>

      {/* 2. ABOUT */}
      <section id="quienes-somos" className="card-panel relative w-full h-dvh bg-[#1F3A5F] shadow-[0_-30px_40px_rgba(0,0,0,0.35)] z-20 overflow-hidden">
        <About />
      </section>

      {/* 3. DIPLOMADO INFO */}
      <section className="card-panel relative w-full h-dvh bg-[#F4F1ED] shadow-[0_-30px_40px_rgba(0,0,0,0.35)] z-30 overflow-y-auto custom-scrollbar">
        <DiplomadoInfo />
      </section>

      {/* 4. CONTENIDO */}
      <section id="contenido" className="card-panel relative w-full h-dvh bg-[#13263F] shadow-[0_-30px_40px_rgba(0,0,0,0.35)] z-40 overflow-hidden">
        <Contenido />
      </section>

      {/* 5. INVERSION (Comentada) */}
      {/* <section id="inversion" className="card-panel relative w-full h-dvh bg-[#F4F1ED] shadow-[0_-30px_40px_rgba(0,0,0,0.35)] z-50 overflow-hidden">
        <Inversion />
      </section> */}

      {/* 6. MAESTROS */}
      <section className="card-panel relative w-full h-dvh bg-[#F4F1ED] shadow-[0_-30px_40px_rgba(0,0,0,0.35)] z-60 overflow-y-auto custom-scrollbar">
        <MaestrosSection />
      </section>

      {/* 7. TESTIMONIOS */}
      <section id="testimonios-section" className="card-panel relative w-full h-dvh bg-[#1F3A5F] shadow-[0_-30px_40px_rgba(0,0,0,0.35)] z-70 overflow-hidden">
        <Testimonios />
      </section>

      {/* 8. PROPOSITO */}
      <section className="card-panel relative w-full h-dvh bg-[#E88973] shadow-[0_-30px_40px_rgba(0,0,0,0.35)] z-80 overflow-y-auto custom-scrollbar">
        <Proposito />
      </section>

      {/* 9. CONTACTO / FOOTER */}
      <section id="contacto" className="relative w-full h-dvh bg-[#F4F1ED] shadow-[0_-30px_40px_rgba(0,0,0,0.4)] z-90 overflow-y-auto">
        <ContactoFooter />
      </section>

      <BotonContacto />
    </div>
  );
}

export default App;