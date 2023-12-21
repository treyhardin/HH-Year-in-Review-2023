import { For, Show, createEffect, createResource, createSignal } from 'solid-js'
import styles from './events.module.css'
import { getEvents, getEventsSettings, urlFor } from '../../utils/sanity-client'

export default function Events() {

    const [ data ] = createResource(getEvents)

    let sectionMain =  [];

    const options = {
        rootMargin: "0px",
        threshold: 1.0,
    };


    const initObserver = (el, target, options) => {

        let callback = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    target.classList.add('subdued')
                } else {
                    target.classList.remove('subdued')
                }
            });
        };

        let observer = new IntersectionObserver(callback, options);
        observer.observe(el)
    }
      

    // createEffect(() => {
    //     console.log(settingsData())
    // })

    return (
        <Show when={data()}> 
            <section class={styles.events} id="events">
                <For each={data()}>{(event, i) =>
                    <div class={styles.event}>
                        <div class={styles.sectionMain} ref={sectionMain[i()]}>
                            <img class={styles.mainImage} src={urlFor(event.images[0]).height(1200)} />
                        </div>
                        <div class={styles.eventInfo}>
                                <h3>{event.name}</h3>
                                <p>{event.location}</p>
                            </div>
                        <div class={styles.imageScroller} ref={el => {
                            initObserver(el, sectionMain[i()])
                        }}>
                            <For each={event.images}>{(image, j) =>
                                <Show when={j() !== 0}>
                                    <img class={styles.image} src={urlFor(image).height(1200)} />
                                </Show>
                            }</For>
                        </div>
                    </div>
                }
                </For>
            </section>
        </Show>
    )

}