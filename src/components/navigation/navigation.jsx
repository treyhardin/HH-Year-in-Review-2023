import { lenis } from '../../App'
import styles from './navigation.module.css'

export default function Navigation() {

  return (
    <div class={styles.navigation}>
      <div class={styles.progressBar}>
        <div class={styles.progressHandle}></div>
      </div>
      <nav class={`${styles.navigationLinks}`}>
        <a class={`${styles.navigationLink} caption`} onClick={() => lenis.scrollTo("#news", options)}>News</a>
        <a class={`${styles.navigationLink} caption`} onClick={() => lenis.scrollTo("#launches", options)}>Launches</a>
        <a class={`${styles.navigationLink} caption`} onClick={() => lenis.scrollTo("#recognition", options)}>Recognition</a>
        <a class={`${styles.navigationLink} caption`} onClick={() => lenis.scrollTo("#events", options)}>Events</a>
        <a class={`${styles.navigationLink} caption`} onClick={() => lenis.scrollTo("#team", options)}>Team</a>
      </nav>
    </div>
  )
}