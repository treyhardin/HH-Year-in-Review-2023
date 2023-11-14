import { scrollGroup } from '../threeCanvas/threeCanvas'
import styles from './hero.module.css'
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';
import * as THREE from 'three';
import fragment from '../../shaders/hero_frag.glsl'
import vertex from '../../shaders/hero_vert.glsl'

import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { textureLoader } from '../../loaders/loaders';


export default function Hero() {

    const clock = new THREE.Clock()

    textureLoader.load('textures/HeroText.png',
    
        function ( texture ) {

            texture.flipY = true;
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping
            texture.format = THREE.RGBAFormat
            texture.needsUpdate = true

            const textGeometry = new THREE.PlaneGeometry(1200, 1200, 100, 100);

            const textMaterial = new THREE.ShaderMaterial({
                uniforms: {
                    color: {type: 'vec3', value: new THREE.Color('#FEFFD4')},
                    uTexture: {type: 'texture2D', value: texture},
                    uTime: {type: 'float', value: 0},
                },
                fragmentShader: fragment,
                vertexShader: vertex,
                transparent: true,
            })
            textMaterial.needsUpdate = true
            textMaterial.uniformsNeedUpdate = true
            textMaterial.wireframe = true
            const textMesh = new THREE.Mesh(textGeometry, textMaterial);
            scrollGroup().add( textMesh );

            const animate = () => {
                const elapsedTime = clock.getElapsedTime();
                textMaterial.uniforms.uTime.value = elapsedTime;
                requestAnimationFrame( animate );
            }
        
            animate()
        },
        function ( err ) {
            console.error( 'An error happened.' );
        }


    );

    
    

    

    return (
        <section class={styles.hero}>
            <h1>Hero</h1>
        </section>
    )

}