import { For, createEffect, createResource } from 'solid-js'
import styles from './launches.module.css'
import { getClients, urlFor } from '../../utils/sanity-client'
import { lenis } from '../../App'

export default function Launches() {

  const [ data ] = createResource(getClients)

  let imageGrid;

  lenis.on('scroll', () => {
    // console.log(lenis)
    if (imageGrid) {
      const boundingBox = imageGrid.getBoundingClientRect()
      const scrollProgress = Math.min(1, Math.min(0, boundingBox.top / boundingBox.height) * -1)
      imageGrid.style.setProperty('--scroll-progress', scrollProgress)
    }
  })

  // let options = {
  //   rootMargin: "0px",
  //   threshold: 1.0,
  // };
  

  // let callback = (entries, observer) => {

  //   entries.forEach((entry) => {
  //     // const boundingBox = entry.boundingClientRect
  //     console.log(entry.intersectionRatio)
  //     // Each entry describes an intersection change for one observed
  //     // target element:
  //     //   entry.boundingClientRect
  //     //   entry.intersectionRatio
  //     //   entry.intersectionRect
  //     //   entry.isIntersecting
  //     //   entry.rootBounds
  //     //   entry.target
  //     //   entry.time
  //   });
  // };

  // let observer = new IntersectionObserver(callback, options);
  

  // const addIntersectionListener = (el) => {
  //   observer.observe(el)
  // }

  // createEffect(() => {
  //   console.log(data())
  // })

  return (
    <Show when={data()}>
      <section class={styles.launches} ref={imageGrid}>
        <div class={styles.launchesInner}>
          <div class={styles.sectionTitle}>
            {/* <p class="caption">We Launched</p> */}
            <p class="h1">23</p>
            <p class="h6">Site Launches</p>
          </div>
          <div class={styles.imageGrid}>
            <For each={data()}>{(client, i) =>
              <img key={i()} src={urlFor(client.image).width(600).height(300)} class={styles.logoImage} style={`--seed: ${Math.random()}`}/>
            }</For>
          </div>
        </div>
      </section>
    </Show>
  )
}