import { For, Show, createResource } from 'solid-js'
import styles from './quote.module.css'
import { getQuoteSettings, urlFor } from '../../utils/sanity-client'

export default function Quote() {

    const [ data ] = createResource(getQuoteSettings)

    return (
        <Show when={data()}>
            <section class={styles.quote}>
                <div class={styles.sectionTitle}>
                    <h3>{data()[0].heading}</h3>
                </div>
                <div class={styles.imageGrid}>
                    <For each={data()[0].images}>{(image, i) => 
                        <img class={styles.image} src={urlFor(image).width(400)} />
                    }</For>
                </div>
            </section>
        </Show>
    )

}