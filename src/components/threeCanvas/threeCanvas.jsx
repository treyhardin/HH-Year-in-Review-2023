import { createSignal, onMount } from 'solid-js';
import * as THREE from 'three';
import styles from './threeCanvas.module.css'
import { lenisInstance } from '../../App'

export const [ scene, setScene ] = createSignal(null)
export const [ canvasScroll, setCanvasScroll ] = createSignal(window.scrollY)
export const [ scrollGroup, setScrollGroup ] = createSignal(new THREE.Group())

export default function ThreeCanvas() {

    let canvas

    setScene(new THREE.Scene())

    // Create Camera
    const cameraDistance = 600;
    let windowFOV = Math.atan( (window.innerHeight / 2) / cameraDistance) * 2 * ( 180 / Math.PI);
    const camera = new THREE.PerspectiveCamera( windowFOV, window.innerWidth / window.innerHeight, 10, 15000 );
    camera.position.z = cameraDistance;

    // Create Renderer
    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);

    // Create Group for Scrollable Objects
    scene().add(scrollGroup())

    lenisInstance().on('scroll', (e) => {
        setCanvasScroll(e.animatedScroll)
        scrollGroup().position.y = canvasScroll()
    })


    const resizeCanvas = () => {
        if (canvas) {
            // windowFOV = Math.atan( (window.innerHeight / 2) / cameraDistance) * 2 * ( 180 / Math.PI);
            // camera.fov = windowFOV;
            camera.aspect = window.innerWidth / window.innerHeight;
            renderer.setSize( canvas.offsetWidth, canvas.offsetHeight );
            camera.updateProjectionMatrix()
        }
    }

    const animate = () => {
        requestAnimationFrame( animate );
        renderer.render( scene(), camera );
    }

    onMount(() => {
        window.addEventListener("resize", resizeCanvas)
        resizeCanvas();
        canvas.appendChild( renderer.domElement );
        animate();
    })

    

    return (
        <div class={styles.canvas} ref={canvas}></div>
    )
}