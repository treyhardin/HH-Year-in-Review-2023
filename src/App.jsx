import solidLogo from './assets/solid.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ThreeCanvas, { setCanvasScroll } from './components/threeCanvas/threeCanvas'
import Hero from './components/hero/hero'
import Clients from './components/clients/clients'
import Projects from './components/projects/projects'
import Events from './components/events/events'
import Team from './components/team/team'
import Header from './components/header/header'
import Footer from './components/footer/footer'
import News from './components/news/news'
import Lenis from '@studio-freight/lenis'
import { createSignal, onMount } from 'solid-js'
import Quote from './components/quote/quote'

export const [ lenisInstance, setLenisInstance ] = createSignal(new Lenis())

function App() {

  onMount(() => {
  
    function raf(time) {
      lenisInstance().raf(time)
      requestAnimationFrame(raf)
    }
  
    requestAnimationFrame(raf)
  })



  return (
    <>
      <Header />
      <main>
          <Hero />
          <Quote />
          <Clients />
          <Projects />
          <Events />
          <Team />
          <News />
      </main>
      <Footer />
      <ThreeCanvas />
    </>
  )
}

export default App
