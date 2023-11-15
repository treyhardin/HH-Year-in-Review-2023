import { createSignal } from 'solid-js'
import { getQuoteSettings } from '../../utils/sanity-client'
import styles from './quote.module.css'

export default function Quote() {

    const [ quoteText, setQuoteText ] = createSignal("")
    const [ quoteAttribution, setQuoteAttribution ] = createSignal("")

    const fetchSettings = async () => {
        const settings = await getQuoteSettings()
        setQuoteText(settings[0].quote)
        setQuoteAttribution(settings[0].attribution)
    }

    fetchSettings()

    return (
        <section class={styles.quote}>
            <div class={styles.quoteText}>
                <h2 class={`${styles.pullquote} h1`}>{quoteText}</h2>
                <p class={styles.attribution}>{quoteAttribution}</p>
            </div>
        </section>
    )
}