import { For, Show, createResource } from 'solid-js'
import styles from './quote.module.css'
import { getQuoteSettings, urlFor } from '../../utils/sanity-client'
import { createAnimation, navigationVisibilityObserver } from '../../utils/intersection-observer'
import { lenis } from '../../App'
import { getViewportVisibility } from '../../utils/helpers'

export default function Quote() {

    const [ data ] = createResource(getQuoteSettings)

    const setupScrollAnimation = (el) => {

        lenis.on('scroll', () => {
            var animationProgress = getViewportVisibility(el, {mode: 'contain'}) * 100
            el.style.setProperty('--scroll-progress', `${animationProgress}%`)
        })
    }

    

    return (
        <Show when={data()}>
            <section data-show-navigation={true} class={styles.quote} ref={el => {
                navigationVisibilityObserver.observe(el)
                setupScrollAnimation(el)
            }}>
                <div class={styles.sectionTitle} ref={el => createAnimation(el)}>
                    <h3 class={styles.textStroke} ref={el => {
                        // console.log(data()[0].heading)
                    }}>
                        <span ref={el => {
                            // setupScrollAnimation(el)
                        }}>{data()[0].heading}</span>
                    </h3>
                </div>
                <div class={styles.imageGrid}>
                    <For each={data()[0].images}>{(image, i) => 
                        <img 
                            class={styles.image} 
                            src={urlFor(image).width(400)}
                            width="30vw"
                            height="30vh" 
                            alt="Decorative images showing Half Helix events & culture."
                            ref={el => {
                                createAnimation(el)
                            }}
                        />
                    }</For>
                </div>
            </section>
        </Show>
    )

}