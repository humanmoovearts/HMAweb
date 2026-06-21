
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


  return  (
  <div className="w-full min-h-screen overflow-x-hidden bg-[#F4F1ED] relative">
  <NavBar />
    <Hero />
    <About />
    <Inversion />
    <Testimonios />
    <DiplomadoInfo />
    <Contenido />
    <MaestrosSection />
    <Proposito />
    <ContactoFooter />
  </div>
  )

   
  
}

export default App
