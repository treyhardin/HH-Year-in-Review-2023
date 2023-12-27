import { createEffect, createSignal } from 'solid-js'
import { lenis } from '../../App'
import styles from './navigation.module.css'

export const [ showNavigation, setShowNavigation ] = createSignal(false)
// export const [ activeSection, setActiveSection ] = createSignal(null)
export const [ scrollProgress, setScrollProgress ] = createSignal(0)

export default function Navigation() {

  let progressHandle

  const lenisOptions = {
    // lerp: 1,
    // duration: 1,
    // easing: 
  };

  createEffect(() => {
    if (progressHandle) {
      progressHandle.style.setProperty('--scroll-progress', scrollProgress())
    }
  })

  return (
    <div class={`${styles.navigation} ${showNavigation() ? '' : styles.hidden}`}>
      <div class={styles.progressBar}>
        <div class={styles.progressHandle} ref={progressHandle}></div>
      </div>
      <nav class={`${styles.navigationLinks}`}>
        <a class={`${styles.navigationLink} caption`} onClick={() => lenis.scrollTo("#news", lenisOptions)}>News</a>
        <a class={`${styles.navigationLink} caption`} onClick={() => lenis.scrollTo("#launches", lenisOptions)}>Launches</a>
        <a class={`${styles.navigationLink} caption`} onClick={() => lenis.scrollTo("#recognition", lenisOptions)}>Recognition</a>
        <a class={`${styles.navigationLink} caption`} onClick={() => lenis.scrollTo("#events", lenisOptions)}>Events</a>
        <a class={`${styles.navigationLink} caption`} onClick={() => lenis.scrollTo("#team", lenisOptions)}>Team</a>
      </nav>
    </div>
  )
}