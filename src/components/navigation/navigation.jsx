import styles from './navigation.module.css'

export default function Navigation() {
  return (
    <div class={styles.navigation}>
      <div class={styles.progressBar}>
        <div class={styles.progressHandle}></div>
      </div>
      <nav class={`${styles.navigationLinks}`}>
        <a class={`${styles.navigationLink} caption`} href="#">Work</a>
        <a class={`${styles.navigationLink} caption`} href="#">Awards</a>
        <a class={`${styles.navigationLink} caption`} href="#">Events</a>
        <a class={`${styles.navigationLink} caption`} href="#">Team</a>
        <a class={`${styles.navigationLink} caption`} href="#">News</a>
      </nav>
    </div>
  )
}