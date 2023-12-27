import { For, Show, createResource } from 'solid-js'
import styles from './quote.module.css'
import { getQuoteSettings, urlFor } from '../../utils/sanity-client'
import { navigationVisibilityObserver } from '../../utils/intersection-observer'

export default function Quote() {

    const [ data ] = createResource(getQuoteSettings)

    return (
        <Show when={data()}>
            <section data-show-navigation={true} class={styles.quote} ref={el => {
                navigationVisibilityObserver.observe(el)
            }}>
                <div class={styles.sectionTitle}>
                    <h3>{data()[0].heading}</h3>
                </div>
                <div class={styles.imageGrid}>
                    <For each={data()[0].images}>{(image, i) => 
                        <img 
                            class={styles.image} 
                            src={urlFor(image).width(400)}
                            width="30vw"
                            height="30vh" 
                            alt="Decorative images showing Half Helix events & culture."
                        />
                    }</For>
                </div>
            </section>
        </Show>
    )

}