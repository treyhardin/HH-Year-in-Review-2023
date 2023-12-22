import { Show, createEffect, createResource, onMount } from 'solid-js'
import styles from './events.module.css'
import { getEvents, urlFor } from '../../utils/sanity-client'
import { lenis } from '../../App'
import { throttle } from '../../utils/helpers'

export default function Events() {

  const [ data ] = createResource(getEvents)

  let sectionContainer, scrollBounds, animationFrameId

  let animatedRows = []

  const animateRows = () => {

    if (sectionContainer) {

      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      const scrollParentBounds = sectionContainer.getBoundingClientRect()
      const scrollProgress = Math.min(1, Math.min(0, scrollParentBounds.top / scrollParentBounds.height) * -1)

      for (let i = 0; i < animatedRows.length; i++) {
        sectionContainer.style.setProperty('--scroll-progress', `${scrollProgress * (animatedRows[i].scrollWidth - window.innerWidth)}px`)
        // animatedRows[i].style.translate = `${scrollProgress * animatedRows[i].scrollWidth}px 0%`
      }

      animationFrameId = requestAnimationFrame(animateRows)

    } 
  }

  const setScroll = (target, parent) => {
    const scrollParentBounds = parent.getBoundingClientRect()
    const scrollProgress = Math.min(1, Math.min(0, scrollParentBounds.bottom / scrollParentBounds.height) * -1)
    parent.style.setProperty('--scroll-progress', `${scrollProgress * (target.scrollWidth)}px`)
    requestAnimationFrame(setScroll(target, parent))
  }

  const initScrollListener = (target) => {
    animatedRows.push(target)
    animateRows()
  }


  return (
    <Show when={data()}>
      <section class={styles.events} ref={sectionContainer} id="events">

        <div class={styles.eventsInner}>

          <div class={styles.sectionTitle}>
            <p class="h3">{data()[0].heading}</p>
          </div>

          <div class={styles.eventRows}>

          <div class={styles.eventsRow} ref={el => {
            initScrollListener(el)
          }}>

              <For each={data()[0].events}>{(event, i) =>
                <Show when={i() < data()[0].events.length / 2}>
                  <div class={styles.event}>
                    <img class={styles.image} src={urlFor(event.image).width(600).height(800).saturation(-100)} width="300" height="400"  />
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
                    <img class={styles.image} src={urlFor(event.image).width(600).height(800).saturation(-100)} width="300" height="400" />
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

      </div>

      </section>
    </Show>
  )
}