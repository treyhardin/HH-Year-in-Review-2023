import { For, Show, createResource } from 'solid-js'
import styles from './news.module.css'
import { getNews, urlFor } from '../../utils/sanity-client'
import Button from '../button/button'
import { createAnimation, loadInObserver, navigationVisibilityObserver } from '../../utils/intersection-observer'

export default function News() {

    const [ data ] = createResource(getNews)

    return (
        <Show when={data()}>
            <section 
                data-show-navigation={true} 
                data-navigation-index={0}
                class={styles.news} 
                id="news" 
                ref={el => {
                    navigationVisibilityObserver.observe(el)
                }}
            >
                {/* <p class="h6">{data()[0].heading}</p> */}
                <div class={styles.newsPosts}>
                    <For each={data()[0].newsPosts} >{(newsPost, i) => 
                        <div 
                            class={styles.newsPost}
                            ref={el => {
                                createAnimation(el)
                            }}
                        >
                            <img 
                                class={styles.image} 
                                src={urlFor(newsPost.image).width(800).height(600)} 
                                width="800" height="600" 
                                alt="Supporting image for news post."
                            />
                            <div class={styles.content}>
                                <div class={styles.title}>
                                    <p class="caption" key={i}>{newsPost.date}</p>
                                    <h4 class="h4" key={i}>{newsPost.title}</h4>
                                </div>
                                <div class={styles.info}>
                                    <p key={i}>{newsPost.description}</p>
                                    <Button
                                        style="tertiary"
                                        text={newsPost.linkText}
                                        link={newsPost.linkURL}
                                    />
                                </div>
                            </div>
                        </div>
                    }
                    </For>
                </div>
            </section>
        </Show>
    )

}