import { createResource } from 'solid-js'
import styles from './recognition.module.css'
import { getAwards } from '../../utils/sanity-client'

export default function Recognition() {

  const [ data ] = createResource(getAwards)

  return (
    <Show when={data()}>
      <section class={styles.recognition}>
        <p class="caption">Recognition</p>
        <For each={data()}>{(award, i) =>
          <div class={styles.awardItem}>
            <p class={`${styles.client} h6`}>{award.clientName}</p>
            <p class={`${styles.award} h3`}>{award.awardName}</p>
            <p class={`${styles.source} caption`}>{award.sourceName}</p>
          </div>
        }</For>
      </section>
    </Show>
  )
}