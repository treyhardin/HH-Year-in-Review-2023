import { For, createResource } from 'solid-js'
import styles from './awards.module.css'
import { getAwardsSettings, urlFor } from '../../utils/sanity-client'
import { createAnimation, navigationVisibilityObserver } from '../../utils/intersection-observer';

export default function Awards() {

  const [ data ] = createResource(getAwardsSettings)

  const maxImageRotation = 10;

  return (
    <Show when={data()}>
      <section 
        data-show-navigation={true} 
        data-navigation-index={2}
        class={styles.recognition} 
        id="recognition" 
        ref={el => {
          navigationVisibilityObserver.observe(el)
        }}
      >
        <h2 class={`${styles.sectionTitle} h3`}>{data()[0].heading}</h2>
        <For each={data()[0].awards}>{(award, i) =>
          <div class={styles.awardItem} ref={el => createAnimation(el)}>
            <div class={styles.awardInfo}>
              <p class={`${styles.client} h6`}>{award.client}</p>
              <p class={`${styles.award} h4`}>{award.title}</p>
              <p class={`${styles.source} caption`}>{award.source}</p>
            </div>
            <Show when={award.images}>
              <img 
                src={urlFor(award.images[0]).width(800)} 
                class={styles.imageWrapper}
                alt="Decorative lifestyle image relating to the project awarded."
                ref={el => {
                  el.style.rotate = `${Math.random() * maxImageRotation * 2 - maxImageRotation}deg`
                }} 
              />
            </Show>
          </div>
        }</For>
      </section>
    </Show>
  )
}