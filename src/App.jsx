import './App.css'
import Hero from './components/hero/hero'
import News from './components/news/news'
import Gallery from './components/gallery/gallery'
import Team from './components/team/team'
import Header from './components/header/header'
import Footer from './components/footer/footer'
import Lenis from '@studio-freight/lenis'
import Quote from './components/quote/quote'
import Navigation from './components/navigation/navigation'
import Clients from './components/clients/clients'
import Awards from './components/awards/awards'

export const lenis =  new Lenis()

function App() {

  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)

  return (
    <>
      <Header />
      <Navigation />
      <main>
          <Hero />
          <News />
          <Clients />
          <Awards />
          <Quote />
          <Gallery />
          <Team />
      </main>
      <Footer />
    </>
  )
}

export default App
