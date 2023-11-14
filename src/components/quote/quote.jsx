import styles from './quote.module.css'

export default function Quote() {
    return (
        <section class={styles.quote}>
            <div class={styles.quoteText}>
                <h2 class={`${styles.pullquote} h1`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</h2>
                <p class={styles.attribution}>– The Half Helix Team</p>
            </div>
        </section>
    )
}