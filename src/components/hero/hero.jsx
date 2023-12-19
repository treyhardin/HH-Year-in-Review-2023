import { scrollGroup } from '../threeCanvas/threeCanvas'
import styles from './hero.module.css'
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';
import * as THREE from 'three';
import fragment from '../../shaders/hero_frag.glsl'
import vertex from '../../shaders/hero_vert.glsl'

import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { fontLoader, textureLoader } from '../../loaders/loaders';
import { For, Show, createEffect, createResource, createSignal } from 'solid-js';
import { getHeroImages, getHeroSettings, urlFor } from '../../utils/sanity-client';

// import * as NODES from "three/examples/jsm/nodes/Nodes.js";


export default function Hero() {


    const [ data ] = createResource(getHeroSettings);

    createEffect(() => {
        console.log(data()[0])
    })

    return (
        <Show when={data()}>
            <section class={styles.hero}>
                <div class={styles.content}>
                    <h1>Year in Review 2023</h1>
                    <div class={styles.ticker}>
                        <p class={`${styles.tickerText} caption`}>Lorem ipsum</p>
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