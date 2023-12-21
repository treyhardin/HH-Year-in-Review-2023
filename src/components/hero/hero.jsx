import styles from './hero.module.css'
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';
import { For, Show, createEffect, createResource, createSignal, onMount } from 'solid-js';
import { getHeroImages, getHeroSettings, urlFor } from '../../utils/sanity-client';

// import * as NODES from "three/examples/jsm/nodes/Nodes.js";


export default function Hero() {


    const [ data ] = createResource(getHeroSettings);

    let tickerTextClones = 12;

    const cloneTickerText = (e, parent, content) => {
        const clone = e.cloneNode(true)
        clone.innerHTML = content
        parent.appendChild(clone)
    }

    return (
        <Show when={data()}>
            <section class={styles.hero}>
                <div class={styles.content}>
                    <h1>{data()[0].title}</h1>
                    <div class={`${styles.ticker} caption`} >
                        <p ref={el => {
                            for (let i = 0; i < tickerTextClones; i++) {
                                cloneTickerText(el, el.parentNode, data()[0].tickerText)
                            }
                        }}>{data()[0].tickerText}</p>
                    </div>
                </div>
                <div class={styles.heroMedia} >
                    <video autoplay class={styles.heroAsset} loop muted  defaultmuted playsinline >
                        <source type="video/mp4" src={ data()[0].heroVideoURL } />
                    </video>
                </div>
                <video class={styles.backgroundMedia} loop muted defaultmuted autoplay playsinline poster={urlFor(data()[0].backgroundFallback).width(1440)} >
                    <source type="video/mp4" src={ data()[0].backgroundVideoURL } />
                    {/* <img src={urlFor(data()[0].backgroundFallback).width(1440)} title="Your browser does not support the <video> tag" /> */}
                </video>
            </section>
        </Show>
    )

}