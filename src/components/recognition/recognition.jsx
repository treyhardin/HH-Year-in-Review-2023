import { For, createResource } from 'solid-js'
import styles from './recognition.module.css'
import { getAwards, urlFor } from '../../utils/sanity-client'

export default function Recognition() {

  const [ data ] = createResource(getAwards)

  const maxImageRotation = 10;

  return (
    <Show when={data()}>
      <section class={styles.recognition}>
        <p class={`${styles.sectionTitle} h3`}>Recognition</p>
        <For each={data()}>{(award, i) =>
          <div class={styles.awardItem}>
            <div class={styles.awardInfo}>
              <p class={`${styles.client} h6`}>{award.clientName}</p>
              <p class={`${styles.award} h4`}>{award.awardName}</p>
              <p class={`${styles.source} caption`}>{award.sourceName}</p>
            </div>
            <img src={urlFor(award.images[0]).width(800)} class={styles.imageWrapper} ref={el => {
              el.style.rotate = `${Math.random() * maxImageRotation * 2 - maxImageRotation}deg`
            }} />
          </div>
        }</For>
      </section>
    </Show>
  )
}