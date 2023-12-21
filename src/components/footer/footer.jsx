import Button from '../button/button'
import styles from './footer.module.css'

export default function Footer() {

    return (
        <footer class={styles.footer}>
            <div class={styles.content}>
                <p class="h3">Here's to another great year.</p>
                <p class="h6">We'll see you again soon, with a brand new name and some new faces.</p>
                <Button style="primary" text="Learn More about Half Helix" link="#" />
            </div>
            <div class={styles.footerLinks}>
                <a class={`${styles.footerLink} caption`} href="#">Half Helix</a>
                <a class={`${styles.footerLink} caption`} href="#">LinkedIn</a>
                <a class={`${styles.footerLink} caption`} href="#">Instagram</a>
                <a class={`${styles.footerLink} caption`} href="#">Twitter</a>
            </div>
        </footer>
    )

}