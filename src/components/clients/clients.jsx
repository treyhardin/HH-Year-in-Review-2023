import { For, createEffect, createResource } from 'solid-js'
import styles from './clients.module.css'
import { getClientsSettings, urlFor } from '../../utils/sanity-client'
import { lenis } from '../../App'

export default function Clients() {

  const [ data ] = createResource(getClientsSettings)

  let imageGrid;

  lenis.on('scroll', () => {
    // Can improve performance by moving bounding box calc outside of scroll event
    if (imageGrid) {
      const boundingBox = imageGrid.getBoundingClientRect()
      const scrollProgress = Math.min(1, Math.min(0, boundingBox.top / boundingBox.height) * -1)
      imageGrid.style.setProperty('--scroll-progress', scrollProgress)
    }
  })

  return (
    <Show when={data()}>
      <section class={styles.launches} ref={imageGrid} id="launches">
        <div class={styles.launchesInner}>
          <div class={styles.sectionTitle}>
            <p class="h1">{data()[0].value}</p>
            <p class="h6">{data()[0].label}</p>
          </div>
          <div class={styles.imageGrid}>
            <For each={data()[0].logos}>{(client, i) =>
              <img key={i()} src={urlFor(client).width(600).height(300)} class={styles.logoImage} style={`--seed: ${Math.random()}`}/>
            }</For>
          </div>
        </div>
      </section>
    </Show>
  )
}