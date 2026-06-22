// Importación de todos tus componentes modulares
import NavBar from './components/NavBar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Inversion from './components/Inversion.jsx'
import Testimonios from './components/Testimonios.jsx'
import Contenido from './components/Contenido.jsx'
import Proposito from './components/Propósito.jsx'
import ContactoFooter from './components/ContactoFooter.jsx'
import MaestrosSection from './components/Maestros.jsx'
import DiplomadoInfo from './components/DiplomadoInfo.jsx'

function App() {

  return (
    <div className="w-full bg-hueso overflow-x-hidden relative antialiased flex flex-col">
      <NavBar />
      
      {/* 1. HERO */}
      <section id="inicio" className="relative w-full min-h-dvh bg-hueso">
        <Hero />
      </section>

      {/* 2. ABOUT */}
      <section id="quienes-somos" className="relative w-full min-h-dvh bg-[#1F3A5F] shadow-[0_-20px_40px_rgba(0,0,0,0.35)]">
        <About />
      </section>

      {/* 3. DIPLOMADO INFO (Sección larga h-auto) */}
      <section className="relative w-full h-auto bg-hueso shadow-[0_-20px_40px_rgba(0,0,0,0.35)]">
        <DiplomadoInfo />
      </section>

      {/* 4. CONTENIDO */}
      <section id="contenido" className="relative w-full min-h-dvh bg-azulOscuro shadow-[0_-20px_40px_rgba(0,0,0,0.35)]">
        <Contenido />
      </section>

      {/* 5. INVERSION */}
      <section id="inversion" className="relative w-full min-h-dvh bg-hueso shadow-[0_-20px_40px_rgba(0,0,0,0.35)]">
        <Inversion />
      </section>

      {/* 6. MAESTROS (Sección larga h-auto) */}
      <section className="relative w-full h-auto bg-hueso shadow-[0_-20px_40px_rgba(0,0,0,0.35)]">
        <MaestrosSection />
      </section>

      {/* 7. TESTIMONIOS */}
      <section className="relative w-full min-h-dvh bg-[#1F3A5F] shadow-[0_-20px_40px_rgba(0,0,0,0.35)]">
        <Testimonios />
      </section>

      {/* 8. PROPOSITO (Sección larga h-auto) */}
      <section className="relative w-full h-auto bg-coral shadow-[0_-20px_40px_rgba(0,0,0,0.35)]">
        <Proposito />
      </section>

      {/* 9. CONTACTO / FOOTER */}
      <section id="contacto" className="relative w-full h-auto bg-hueso shadow-[0_-20px_40px_rgba(0,0,0,0.4)]">
        <ContactoFooter />
      </section>
    </div>
  )
}

export default App;