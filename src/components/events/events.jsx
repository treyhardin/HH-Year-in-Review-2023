import { Show, createEffect, createResource, onMount } from 'solid-js'
import styles from './events.module.css'
import { getEvents, urlFor } from '../../utils/sanity-client'
import { lenis } from '../../App'
import { throttle } from '../../utils/helpers'

export default function Events() {

  const [ data ] = createResource(getEvents)

  let sectionContainer

  const setScroll = (target, parent) => {
    const scrollParentBounds = parent.getBoundingClientRect()
    const scrollProgress = Math.min(1, Math.min(0, scrollParentBounds.top / scrollParentBounds.height) * -1)
    parent.style.setProperty('--scroll-progress', `${scrollProgress * (target.scrollWidth)}px`)
  }

  const initScrollListener = (target) => {

    lenis.on('scroll', () => {
      if (sectionContainer) {
        // Can improve performance by moving bounding box & scrollWidth calc outside of scroll event
        throttle(setScroll(target, sectionContainer), 500)
      }
    })

  }

  return (
    <Show when={data()}>
      <section class={styles.events} ref={sectionContainer}>

        <div class={styles.eventsInner}>

        <div class={styles.sectionTitle}>
          <p class="h3">{data()[0].heading}</p>
        </div>

        <div class={styles.eventsRow} ref={el => {
          initScrollListener(el)
        }}>

            <For each={data()[0].events}>{(event, i) =>
              <Show when={i() < data()[0].events.length / 2}>
                <div class={styles.event}>
                  <img class={styles.image} src={urlFor(event.image).width(600).height(800)} width="300" height="400"  />
                  <div class={styles.info}>
                    <p class="h5">{event.name}</p>
                    <div class={styles.badge}>
                      <p class="caption">{event.location}</p>
                    </div>
                  </div>
                </div>
              </Show>
          }</For>

        </div>
        <div class={styles.eventsRow} ref={el => {
          initScrollListener(el)
        }}>

          <For each={data()[0].events}>{(event, i) =>
            <Show when={i() >= data()[0].events.length / 2}>
                <div class={styles.event}>
                  <img class={styles.image} src={urlFor(event.image).width(600).height(800)} width="300" height="400" />
                  <div class={styles.info}>
                    <p class="h5">{event.name}</p>
                    <div class={styles.badge}>
                      <p class="caption">{event.location}</p>
                    </div>
                  </div>
                </div>
              </Show>
          }</For>

        </div>

      </div>

      </section>
    </Show>
  )
}