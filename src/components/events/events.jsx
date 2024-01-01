import { Show, createEffect, createResource, onMount } from 'solid-js'
import styles from './events.module.css'
import { getEvents, urlFor } from '../../utils/sanity-client'
import { createAnimation, loadInObserver, navigationVisibilityObserver } from '../../utils/intersection-observer'
import { getViewportVisibility } from '../../utils/helpers'

export default function Events() {

  const [ data ] = createResource(getEvents)

  let sectionContainer, animationFrameId

  let animatedRows = []

  const animateRows = (el) => {

    if (sectionContainer) {

      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      var scrollProgress = getViewportVisibility(sectionContainer, {mode: 'cover'})
 
      for (let i = 0; i < animatedRows.length; i++) {
        sectionContainer.style.setProperty('--scroll-progress', `${scrollProgress * (animatedRows[i].scrollWidth - window.innerWidth)}px`)
      }

      animationFrameId = requestAnimationFrame(animateRows)

    } 
  }

  const initScrollListener = (target) => {
    animatedRows.push(target)
    animateRows(target)
  }

  return (
    <Show when={data()}>
      <section 
        data-show-navigation={true} 
        data-navigation-index={3}
        id="events"
        class={styles.events} 
        ref={el => {
          sectionContainer = el
          navigationVisibilityObserver.observe(el)
        }} 
      >

        <div class={styles.eventsInner}>

          <div class={styles.sectionTitle}>
            <h2 class="h4">{data()[0].heading}</h2>
          </div>

          <div class={styles.eventRows} ref={el => createAnimation(el)}>

          <div class={styles.eventsRow} ref={el => {
            initScrollListener(el)
          }}>

              <For each={data()[0].events}>{(event, i) =>
                <Show when={i() < data()[0].events.length / 2}>
                  <div class={styles.event}>
                    <img 
                      class={styles.image} 
                      src={urlFor(event.image).width(600).height(800).saturation(-100)} 
                      width="300" 
                      height="400"
                      alt="Decorative image from a 2023 Half Helix event." 
                      ref={el => {
                        loadInObserver.observe(el)
                      }}
                    />
                    <div class={styles.info}>
                      <h4 class="h6">{event.name}</h4>
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
                      <p class="h6">{event.name}</p>
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