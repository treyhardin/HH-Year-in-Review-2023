import solidLogo from './assets/solid.svg'
import viteLogo from '/vite.svg'
import './App.css'
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
import Navigation from './components/navigation/navigation'
import Launches from './components/launches/launches'
import Recognition from './components/recognition/recognition'

export const lenis =  new Lenis()

function App() {

  onMount(() => {
  
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
  
    requestAnimationFrame(raf)
  })



  return (
    <>
      <Header />
      <Navigation />
      <main>
          <Hero />
          <Launches />
          <Recognition />
          <Quote />
          {/* <Clients />
          <Projects />
          <Events />
          <Team />
          <News /> */}
      </main>
      {/* <Footer /> */}
      {/* <ThreeCanvas /> */}
    </>
  )
}

export default App
