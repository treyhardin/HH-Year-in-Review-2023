import './App.css'
import Preloader from './components/preloader/preloader'
import Hero from './components/hero/hero'
import Header from './components/header/header'
import Navigation from './components/navigation/navigation'
import Footer from './components/footer/footer'
import Lenis from '@studio-freight/lenis'
import { createSignal, lazy } from 'solid-js'


const News = lazy(() => import("./components/news/news"));
const Quote = lazy(() => import("./components/quote/quote"));
const Clients = lazy(() => import("./components/clients/clients"));
const Projects = lazy(() => import("./components/projects/projects"));
const Awards = lazy(() => import("./components/awards/awards"));
const Events = lazy(() => import("./components/events/events"));
const Gallery = lazy(() => import("./components/gallery/gallery"));
const Team = lazy(() => import("./components/team/team"));


export const lenis =  new Lenis()
export const [ loaded, setLoaded ] = createSignal(false)

function App() {

  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)

  addEventListener("load", (event) => {
    setLoaded(true)
  });
  

  return (
    <>
        <Preloader />
        <Header />
        <Navigation />
        <main>
            <Hero />
            <News />
            <Quote />
            <Clients />
            <Projects />
            <Awards />
            <Events />
            <Gallery />
            <Team />
        </main>
        <Footer />
    </>
  )
}

export default App
