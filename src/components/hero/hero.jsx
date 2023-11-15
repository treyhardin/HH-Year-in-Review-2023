import { scrollGroup } from '../threeCanvas/threeCanvas'
import styles from './hero.module.css'
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';
import * as THREE from 'three';
import fragment from '../../shaders/hero_frag.glsl'
import vertex from '../../shaders/hero_vert.glsl'

import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { fontLoader, textureLoader } from '../../loaders/loaders';
import { For, createSignal } from 'solid-js';
import { getHeroImages, urlFor } from '../../utils/sanity-client';

// import * as NODES from "three/examples/jsm/nodes/Nodes.js";


export default function Hero() {

    const [ heroImages, setHeroImages ] = createSignal([])

    const fetchImages = async () => {
        const heroImages = await getHeroImages()
        console.log(heroImages)
        setHeroImages(heroImages);
    }

    fetchImages()

    const clock = new THREE.Clock();
    let windowWidth = window.innerWidth;

    const textWaveUniforms = {
        uTime: { value: 0 },
        uMousePosition: { value: new THREE.Vector2(0, 0)}
    }



    const createTextWave = (textSize, segments) => {

        // Load Hero Text Texture
        textureLoader.load('textures/HeroText.png',
        
            function ( texture ) {

                texture.flipY = true;
                texture.colorSpace = THREE.SRGBColorSpace;

                const textGeometry = new THREE.PlaneGeometry(textSize, textSize, segments, segments);
                const textMaterial = new THREE.MeshBasicMaterial({
                    color: 0xFEFFD4,
                    map: texture,
                    transparent: true,
                })

                // textMaterial.wireframe = true

                textMaterial.onBeforeCompile = (shader) => {

                    shader.uniforms.uTime = textWaveUniforms.uTime;
                    shader.uniforms.uMousePosition = textWaveUniforms.uMousePosition;

                    // Add Uniforms
                    shader.vertexShader = shader.vertexShader.replace('#include <common>',
                    `
                        #include <common>
                        uniform float uTime;
                        uniform vec2 uMousePosition;
                    `
                    )

                    // Update Position
                    shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>',
                    `
                        #include <begin_vertex>

                        vec3 amplitudeBig = vec3(10.0, 10.0, 50.0);
                        vec3 frequencyBig = vec3(0.02, 0.02, 0.01);
                        float speedBig = 0.2;

                        vec3 amplitudeSmall = vec3(2.0, 2.0, 2.0);
                        vec3 frequencySmall = vec3(2.0, 2.0, 2.0);
                        float speedSmall = 2.0;

                        vec3 wavesBig = vec3(0.0, 0.0, 0.0);
                        vec3 wavesSmall = vec3(0.0, 0.0, 0.0);

                        wavesBig.x += sin(transformed.y * frequencyBig.x + uTime * speedBig) * amplitudeBig.x * sin(uMousePosition.x);
                        wavesBig.y += sin(transformed.x * frequencyBig.y + uTime * speedBig) * amplitudeBig.y * sin(uMousePosition.y);
                        wavesBig.z += sin(transformed.x * frequencyBig.z + uTime * speedBig) * amplitudeBig.z * sin(uMousePosition.x);

                        wavesSmall.x += cos(transformed.y * frequencySmall.x + uTime * speedSmall) * amplitudeSmall.x * sin(uMousePosition.x);
                        wavesSmall.y += cos(transformed.x * frequencySmall.y + uTime * speedSmall) * amplitudeSmall.y * sin(uMousePosition.y);
                        wavesSmall.z += cos(transformed.x * frequencySmall.z + uTime * speedSmall) * amplitudeSmall.z * sin(uMousePosition.x);

                        transformed += wavesBig + wavesSmall;
                    `
                    )
                }
                // textMaterial.wireframe = true
                const textMesh = new THREE.Mesh(textGeometry, textMaterial);
                scrollGroup().add( textMesh );

                window.addEventListener("resize", (e) => {
                    const newWindowWidth = e.target.innerWidth;
                    const scaleFactor = newWindowWidth / windowWidth;

                    textMesh.scale.set(scaleFactor, scaleFactor, scaleFactor);
                    console.log(scaleFactor);
                    windowWidth = newWindowWidth;
                })

            },
            function ( err ) {
                console.error( 'An error happened.' );
            }
        );
    }
    
    

    const createImage = () => {
        const imageGeometry = new THREE.PlaneGeometry(100, 100, 10, 10);
        const imageMaterial = new THREE.MeshBasicMaterial({
            color: 0xff00ff,
            wireframe: true,
        })
        const imageMesh = new THREE.Mesh(imageGeometry, imageMaterial);
        // imageMesh.rotation.x = Math.PI / 2;
        scrollGroup().add(imageMesh)
    }

    window.addEventListener("mousemove", (e) => {
        const positionX = e.x / window.innerWidth
        const positionY = e.y / window.innerHeight
        textWaveUniforms.uMousePosition.value = new THREE.Vector2(positionX, positionY)
        console.log(textWaveUniforms.uMousePosition)
    })

    const animate = () => {
        const elapsedTime = clock.getElapsedTime();
        textWaveUniforms.uTime.value = elapsedTime;
        requestAnimationFrame( animate );
    }

    // createImage()

    createTextWave(window.innerWidth, 200)
    animate()

    
    const images = [0, 1, 2, 3]

    

    return (
        <section class={styles.hero}>
            {/* <h1>Hero</h1> */}
            {/* <div class={styles.imageGrid}>
                <For each={heroImages()}>{(heroImage, i) =>
                    <div class={styles.heroImageItem}>
                        <img 
                            src={urlFor(heroImage.image.asset).width(640).url()} 
                            alt={heroImage.name}
                            class={styles.heroImage}
                        />
                    </div>
                }</For>
            </div> */}
        </section>
    )

}