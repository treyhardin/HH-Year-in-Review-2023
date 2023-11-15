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
import { getHeroImages, getHeroSettings, urlFor } from '../../utils/sanity-client';

// import * as NODES from "three/examples/jsm/nodes/Nodes.js";


export default function Hero() {

    const [ heroSettings, setHeroSettings ] = createSignal([])
    const [ heroImages, setHeroImages ] = createSignal([])

    const fetchSettings = async () => {
        const settings = await getHeroSettings()
        setHeroSettings(settings[0]);
        createTextWave(window.innerWidth, 200)
    }

    const fetchImages = async () => {
        const heroImages = await getHeroImages()
        createImages(heroImages)
        setHeroImages(heroImages);
    }

    fetchSettings()
    fetchImages()

    const clock = new THREE.Clock();
    let windowWidth = window.innerWidth;

    const textWaveUniforms = {
        uTime: { value: 0 },
        uMousePosition: { value: new THREE.Vector2(0, 0)}
    }



    const createTextWave = (textSize, segments) => {

        const waveImage = urlFor(heroSettings().meshImage).url()

        // Load Hero Text Texture
        textureLoader.load(waveImage,
        
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

                        vec3 amplitudeSmall = vec3(1.0, 1.0, 1.0);
                        vec3 frequencySmall = vec3(2.0, 2.0, 2.0);
                        float speedSmall = 2.0;

                        vec3 wavesBig = vec3(0.0, 0.0, 0.0);
                        vec3 wavesSmall = vec3(0.0, 0.0, 0.0);

                        wavesBig.x += sin(transformed.y * frequencyBig.x + uTime * speedBig) * amplitudeBig.x * cos(uMousePosition.x);
                        wavesBig.y += sin(transformed.x * frequencyBig.y + uTime * speedBig) * amplitudeBig.y * cos(uMousePosition.y);
                        wavesBig.z += sin(transformed.x * frequencyBig.z + uTime * speedBig) * amplitudeBig.z * cos(uMousePosition.x);

                        wavesSmall.x += cos(transformed.y * frequencySmall.x + uTime * speedSmall) * amplitudeSmall.x;
                        wavesSmall.y += cos(transformed.x * frequencySmall.y + uTime * speedSmall) * amplitudeSmall.y;
                        wavesSmall.z += cos(transformed.x * frequencySmall.z + uTime * speedSmall) * amplitudeSmall.z;

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
    
    
    const currentImages = []

    const createImage = (image, width, height, positionX, positionY, positionZ) => {


        // Load Hero Text Texture
        textureLoader.load(image,
        
            function ( texture ) {

                texture.flipY = true;
                texture.colorSpace = THREE.SRGBColorSpace;

                const imageGeometry = new THREE.PlaneGeometry(width, height, 10, 10);
                const imageMaterial = new THREE.MeshBasicMaterial({
                    color: 0xFEFFD4,
                    map: texture,
                    // transparent: true,
                    // wireframe: true,
                })

                const imageMesh = new THREE.Mesh(imageGeometry, imageMaterial);
                // imageMesh.rotation.x = Math.PI / 2;
                imageMesh.position.x = positionX
                imageMesh.position.y = positionY
                imageMesh.position.z = positionZ
                currentImages.push(imageMesh)
                scrollGroup().add(imageMesh)

            },
            function ( err ) {
                console.error( 'An error happened.' );
            }
        );

    }

    const createImages = (images) => {

        const imageWidth = window.innerWidth / 3
        const imageHeight = window.innerHeight / 3

        const spreadX = 500
        const spreadY = window.innerHeight / 2
        const spreadZ = -1000

        let positionX = (window.innerWidth / 2) * -1

        images.forEach((image) =>{

            const imageUrl = urlFor(image.image).width(500).height(500).url()

            const positionY = (Math.random() * spreadY * 2) - spreadY
            const positionZ = (Math.random() * spreadZ)

            console.log(positionY)

            createImage( imageUrl, imageWidth, imageHeight, positionX, positionY, positionZ)

            positionX += spreadX
        })
    }

    const moveImages = () => {
        currentImages.forEach((image) => {
            image.position.x -= 0.6
        })
    }

    window.addEventListener("mousemove", (e) => {
        const positionX = e.x / window.innerWidth
        const positionY = e.y / window.innerHeight
        textWaveUniforms.uMousePosition.value = new THREE.Vector2(positionX, positionY)
        // console.log(textWaveUniforms.uMousePosition)
    })

    const animate = () => {
        const elapsedTime = clock.getElapsedTime();
        textWaveUniforms.uTime.value = elapsedTime;
        moveImages()
        requestAnimationFrame( animate );
    }

    // createImage()

    // createTextWave(window.innerWidth, 200)
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