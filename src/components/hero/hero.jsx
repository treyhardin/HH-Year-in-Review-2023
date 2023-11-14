import { scrollGroup } from '../threeCanvas/threeCanvas'
import styles from './hero.module.css'
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';
import * as THREE from 'three';
import fragment from '../../shaders/hero_frag.glsl'
import vertex from '../../shaders/hero_vert.glsl'

import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { fontLoader, textureLoader } from '../../loaders/loaders';

// import * as NODES from "three/examples/jsm/nodes/Nodes.js";


export default function Hero() {

    const clock = new THREE.Clock()
    // let elapsedTime = clock.getElapsedTime();

    // var textShape;
    // fontLoader.load('fonts/Teodor-Light.json', function (font) {
    //     var textGeometry = new TextGeometry('YourText', {
    //         font: font,
    //         size: 100,
    //         height: 1,
    //         curveSegments: 5,
    //         bevelEnabled: false,
    //     });
        

    //     textShape = new THREE.ShapeGeometry(textGeometry.toShapes()[0]);

    //     // Create line material
    //     var lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });

    //     // Create line mesh
    //     var textOutline = new THREE.LineSegments(textShape, lineMaterial);
    //     scrollGroup().add(textOutline);
    // });

    const customUniforms = {
        uTime: { value: 0 },
    }

    textureLoader.load('textures/HeroText.png',
    
        function ( texture ) {

            texture.flipY = true;
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping
            texture.format = THREE.RGBAFormat
            texture.needsUpdate = true

            const textGeometry = new THREE.PlaneGeometry(1200, 1200, 200, 200);
            const textMaterial = new THREE.MeshBasicMaterial({
                color: 0xFEFFD4,
                map: texture,
                transparent: true,
            })

            textMaterial.onBeforeCompile = (shader) => {

                shader.uniforms.uTime = customUniforms.uTime;

                // console.log(shader.vertexShader)

                // Add Uniforms
                shader.vertexShader = shader.vertexShader.replace('#include <common>',
                `
                    #include <common>
                    uniform float uTime;
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

                    wavesBig.x += sin(transformed.y * frequencyBig.x + uTime * speedBig) * amplitudeBig.x;
                    wavesBig.y += sin(transformed.x * frequencyBig.y + uTime * speedBig) * amplitudeBig.y;
                    wavesBig.z += sin(transformed.x * frequencyBig.z + uTime * speedBig) * amplitudeBig.z;

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

            
        },
        function ( err ) {
            console.error( 'An error happened.' );
        }
    );


    const animate = () => {
        const elapsedTime = clock.getElapsedTime();
        customUniforms.uTime.value = elapsedTime;
        requestAnimationFrame( animate );
    }

    animate()

    
    

    

    return (
        <section class={styles.hero}>
            <h1>Hero</h1>
        </section>
    )

}