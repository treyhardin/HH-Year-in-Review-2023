import { For, Show, createResource } from 'solid-js'
import styles from './news.module.css'
import { getNews, urlFor } from '../../utils/sanity-client'
import Button from '../button/button'

export default function News() {

    const [ data ] = createResource(getNews)

    return (
        <Show when={data()}>
            <section class={styles.news} id="news">
                {/* <p class="h6">{data()[0].heading}</p> */}
                <div class={styles.newsPosts}>
                    <For each={data()[0].newsPosts} >{(newsPost, i) => 
                        <div class={styles.newsPost}>
                            <img class={styles.image} src={urlFor(newsPost.image).width(800).height(1000)} />
                            <div class={styles.content}>
                                <div class={styles.title}>
                                    <p class="caption" key={i}>{newsPost.date}</p>
                                    <p class="h4" key={i}>{newsPost.title}</p>
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