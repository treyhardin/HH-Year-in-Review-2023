import { For, Show, createResource } from 'solid-js'
import styles from './gallery.module.css'
import { getGallerySettings, urlFor } from '../../utils/sanity-client'
import { createAnimation, navigationVisibilityObserver } from '../../utils/intersection-observer';

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

    return (
        <Show when={data()}> 
            <section data-show-navigation={true} class={styles.events} ref={el => {
                navigationVisibilityObserver.observe(el)
            }}>
                    <div class={styles.event}>
                        <div class={styles.sectionMain} ref={sectionMain}>
                            <img 
                                class={styles.mainImage} 
                                src={urlFor(data()[0].images[0]).height(1200)} 
                                width="100vw" 
                                height="100vh"
                                alt="Photo taken at a Half Helix social event."
                            />
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
                                    <img 
                                        class={styles.image} 
                                        src={urlFor(image).height(1200)} 
                                        width="60vw"
                                        alt="Photo taken at a Half Helix social event."
                                        ref={el => {
                                            createAnimation(el)
                                        }}
                                    />
                                </Show>
                            }</For>
                        </div>
                    </div>
        
            </section>
        </Show>
    )

}