import { For, createResource } from 'solid-js'
import styles from './recognition.module.css'
import { getAwards, urlFor } from '../../utils/sanity-client'

export default function Recognition() {

  let imageWrapper;

  const [ data ] = createResource(getAwards)

  return (
    <Show when={data()}>
      <section class={styles.recognition} ref={el => {
        el.addEventListener("mousemove", (e) => {
          if (imageWrapper) {
            imageWrapper.style.left = `${e.clientX}px`;
            imageWrapper.style.top = `${e.clientY}px`;
          }
        })
      }}>
        <p class="caption">Recognition</p>
        <For each={data()}>{(award, i) =>
          <div class={styles.awardItem} ref={el => {
              el.addEventListener("mouseenter", () => {
                console.log('done')

              if (imageWrapper) {
                imageWrapper.src = urlFor(award.images[0]).width(800)
                imageWrapper.style.rotate = `${Math.random() * 20 - 10}deg`
              }
            })
          }}>
            <div class={styles.awardInfo}>
              <p class={`${styles.client} h6`}>{award.clientName}</p>
              <p class={`${styles.award} h3`}>{award.awardName}</p>
              <p class={`${styles.source} caption`}>{award.sourceName}</p>
            </div>
          </div>
        }</For>
        <img src={urlFor(data()[0].images[0]).width(800)} class={styles.imageWrapper} ref={imageWrapper} />
      </section>
    </Show>
  )
}