import { For, createResource } from 'solid-js'
import styles from './clients.module.css'
import { getClientsSettings, urlFor } from '../../utils/sanity-client'
import { navigationVisibilityObserver } from '../../utils/intersection-observer';
import { getViewportVisibility } from '../../utils/helpers';
import { lenis } from '../../App';

export default function Clients() {

  const [ data ] = createResource(getClientsSettings)

  const initScrollAnimation = (element) => {

    // lenis.on('scroll', () => {
    //   var scrollProgress = getViewportVisibility(element, { mode: 'cover'})
    //   element.style.setProperty('--scroll-progress', scrollProgress)
    // })

    const animateScroll = () => {
      var scrollProgress = getViewportVisibility(element, { mode: 'cover'})
      element.style.setProperty('--scroll-progress', scrollProgress)
      requestAnimationFrame(animateScroll)
    }

    animateScroll()



  }

  return (
    <Show when={data()}>
      <section 
        data-show-navigation={true} 
        data-navigation-index={1}
        class={styles.launches} 
        id="launches"
        ref={el => {
          navigationVisibilityObserver.observe(el)
          initScrollAnimation(el)
        }} 
      >
        <div class={styles.launchesInner}>
          <div class={styles.sectionTitle}>
            <p class="h1">{data()[0].value}</p>
            <p class="h6">{data()[0].label}</p>
          </div>
          <div class={styles.imageGrid}>
            <For each={data()[0].logos}>{(client, i) =>
              <img 
                key={i()} 
                src={urlFor(client).width(600).height(300)} 
                class={styles.logoImage} style={`--seed: ${Math.random()}`}
                width="20vw"
                height="20vh"
                alt="Logo of a Half Helix client who launched in 2023."
              />
            }</For>
          </div>
        </div>
      </section>
    </Show>
  )
}