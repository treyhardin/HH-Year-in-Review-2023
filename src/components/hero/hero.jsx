import styles from './hero.module.css'
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';
import { For, Show, createEffect, createResource, createSignal, onMount } from 'solid-js';
import { getHeroImages, getHeroSettings, urlFor } from '../../utils/sanity-client';

// import * as NODES from "three/examples/jsm/nodes/Nodes.js";


export default function Hero() {


    const [ data ] = createResource(getHeroSettings);

    let tickerTextClones = 12;

    const cloneTickerText = (e, parent) => {
        const clone = e.cloneNode(true)
        parent.appendChild(clone)
    }

    return (
        <Show when={data()}>
            <section class={styles.hero}>
                <div class={styles.content}>
                    <h1>Year in Review 2023</h1>
                    <div class={`${styles.ticker} caption`} >
                        <p ref={el => {
                            for (let i = 0; i < tickerTextClones; i++) {
                                cloneTickerText(el, el.parentNode)
                            }
                        }}>Lorem ipsum</p>
                    </div>
                </div>
                <div class={styles.heroMedia} >
                    <video class={styles.heroAsset} loop muted autoplay playsinline>
                        <source type="video/mp4" src={ data()[0].heroVideoURL } />
                    </video>
                </div>
                <video class={styles.backgroundMedia} loop muted autoplay playsinline>
                    <source type="video/mp4" src={ data()[0].backgroundVideoURL } />
                </video>
            </section>
        </Show>
    )

}