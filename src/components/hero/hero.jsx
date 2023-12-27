import styles from './hero.module.css'
import { Show, createResource } from 'solid-js';
import { getHeroSettings, urlFor } from '../../utils/sanity-client';
import { createAnimation, navigationVisibilityObserver } from '../../utils/intersection-observer';
import { lenis } from '../../App';

export default function Hero() {

    const [ data ] = createResource(getHeroSettings);

    let heroVideo
    let tickerTextClones = 12

    const cloneTickerText = (e, parent, content) => {
        const clone = e.cloneNode(true)
        clone.innerHTML = content
        parent.appendChild(clone)
    }

    lenis.on('scroll', () => {
        if (heroVideo) {
            heroVideo.style.translate = `0 ${lenis.animatedScroll / 5}px`
        }
        console.log(lenis.animatedScroll)
    })


    return (
        <Show when={data()}>
            <section data-show-navigation={false} class={styles.hero} ref={el => {
                navigationVisibilityObserver.observe(el)
            }}>
                <div 
                    class={styles.content}
                    ref={el => {
                        createAnimation(el)
                    }}
                >
                    <h1>{data()[0].title}</h1>
                    <div class={`${styles.ticker} caption`} >
                        <p ref={el => {
                            for (let i = 0; i < tickerTextClones; i++) {
                                cloneTickerText(el, el.parentNode, data()[0].tickerText)
                            }
                        }}>{data()[0].tickerText}</p>
                    </div>
                </div>
                <div class={styles.heroMedia} ref={heroVideo}>
                    <video 
                        class={styles.heroAsset} 
                        autoplay 
                        loop 
                        muted  
                        defaultmuted 
                        playsinline 
                        src={ data()[0].heroVideoURL } 
                        onloadedmetadata="this.muted = true" 
                        loading="eager"
                        width="45vw"
                        height="100vh"
                        alt="Demo reel video of recent Half Helix design & development work."
                    />
                </div>
                <video 
                    class={styles.backgroundMedia} 
                    loop 
                    muted 
                    autoplay 
                    playsinline 
                    src={ data()[0].backgroundVideoURL } 
                    poster={urlFor(data()[0].backgroundFallback).width(1440)} 
                    onloadedmetadata="this.muted = true" 
                    loading="eager"
                    width="100vw"
                    height="100vh"
                    aria-hidden="true"
                />
            </section>
        </Show>
    )

}