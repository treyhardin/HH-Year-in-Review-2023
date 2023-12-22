import { For, Show, createResource } from 'solid-js'
import styles from './gallery.module.css'
import { getGallerySettings, urlFor } from '../../utils/sanity-client'

export default function Gallery() {

    const [ data ] = createResource(getGallerySettings)

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
            <section class={styles.events}>
                    <div class={styles.event}>
                        <div class={styles.sectionMain} ref={sectionMain}>
                            <img class={styles.mainImage} src={urlFor(data()[0].images[0]).height(1200)} />
                        </div>
                        <div class={styles.eventInfo}>
                                <h3>{data()[0].heading}</h3>
                                <p class="h6">{data()[0].subheading}</p>
                            </div>
                        <div class={styles.imageScroller} ref={el => {
                            initObserver(el, sectionMain)
                        }}>
                            <For each={data()[0].images}>{(image, i) =>
                                <Show when={i() !== 0}>
                                    <img class={styles.image} src={urlFor(image).height(1200)} />
                                </Show>
                            }</For>
                        </div>
                    </div>
        
            </section>
        </Show>
    )

}