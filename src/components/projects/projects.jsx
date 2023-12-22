import { For, Show, createEffect, createResource, createSignal } from 'solid-js'
import styles from './projects.module.css'
import { getProjects, urlFor } from '../../utils/sanity-client'
import Button from '../button/button'

export default function Projects() {

    const [ data ] = createResource(getProjects)

    let backgroundImage = []

    let options = {
        rootMargin: "-25%",
        threshold: 0.7,
    };

    let callback = (entries, observer) => {
        entries.forEach((entry) => {
            updateBackgroundImage(entry.target.id)
        });
    };

    const updateBackgroundImage = (index) => {

        for (let i = 0; i < backgroundImage.length; i++) {
            backgroundImage[i].classList.add('hidden')
        }
        document.querySelector(`#backgroundImage${index}`).classList.remove('hidden')
    }
      
    let observer = new IntersectionObserver(callback, options);

    return (
        <Show when={data()}>
            <section class={styles.projects} id="projects">
                {/* <h2>Projects</h2> */}
                <div class={styles.projectList}>
                    <For each={data()[0].projects}>{(project, i) =>
                        <>
                        <div class={styles.project}  key={i()}>
                            <div class={styles.projectCard} id={i()} ref={el => {
                                observer.observe(el);
                            }}>
                                <div class={styles.projectCardMedia}>
                                    <Switch>
                                        <Match when={project.videoURL}>
                                            <video 
                                                class={styles.video} 
                                                autoplay 
                                                loop 
                                                muted  
                                                defaultmuted 
                                                playsinline 
                                                src={ project.videoURL } 
                                                onloadedmetadata="this.muted = true" 
                                                alt="Video showcase of project feature."
                                            />
                                        </Match>
                                        <Match when={!project.videoURL && project.mainImage}>
                                            <img 
                                                class={styles.cardImage}
                                                src={urlFor(project.mainImage).width(600)} 
                                            />
                                        </Match>
                                    </Switch>
                                </div>
                                <div class={styles.projectCardInfo}>
                                    <h3 class="h4">{project.client}</h3>
                                    <p>{project.feature}</p>
                                    <Show when={project.buttonText && project.buttonURL}>
                                        <Button 
                                            style="tertiary" 
                                            text={project.buttonText}
                                            link={project.buttonURL}
                                        />
                                    </Show>
                                </div>
                            </div>
                        </div>
                    </>
                    }
                    </For>
                </div>
                <For each={data()[0].projects}>{(project, i) =>
                    <img 
                        class={styles.backgroundMedia}
                        src={urlFor(project.backgroundImage).width(1880)} 
                        ref={backgroundImage[i()]}
                        id={`backgroundImage${i()}`}
                        width="100vw"
                        height="100vh"
                    />
                }</For>
            </section>
        </Show>
    )

}