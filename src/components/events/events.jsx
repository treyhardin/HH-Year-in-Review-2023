import { For, Show, createEffect, createResource, createSignal } from 'solid-js'
import styles from './events.module.css'
import { getEvents, getEventsSettings, urlFor } from '../../utils/sanity-client'

export default function Events() {

    const [ data ] = createResource(getEvents)

    let mainImage = [];

    // createEffect(() => {
    //     console.log(settingsData())
    // })

    return (
        <Show when={data()}>
            <section class={styles.events}>
                <For each={data()}>{(event, i) =>
                    <div class={styles.event}>
                        <div class={styles.sectionMain}>
                            <div class={styles.eventInfo}>
                                <h3>{event.name}</h3>
                                <p>{event.location}</p>
                            </div>
                            <img class={styles.mainImage} src={urlFor(event.images[0]).height(1200)} ref={mainImage[i()]} />
                        </div>
                        <div class={styles.imageScroller}>
                            <For each={event.images}>{(image, j) =>
                                <img class={styles.image} src={urlFor(image).height(1200)} onClick={() => {
                                    if (mainImage) {
                                        mainImage[i()].src = urlFor(image).height(1200);
                                    }
                                }} />
                            }</For>
                        </div>
                    </div>
                }
                </For>
            </section>
        </Show>
    )

}