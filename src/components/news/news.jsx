import { For, createSignal, onMount } from 'solid-js'
import styles from './news.module.css'
import { getNews } from '../../utils/sanity-client'

export default function News() {

    const [news, setNews ] = createSignal(null)
    
    const fetchNews = async () => {
        setNews(await getNews())
    }

    fetchNews()

    return (
        <section>
            <h2>News</h2>
            <For each={news()} >{(news, i) => 
                <p key={i}>{news.name}</p>
            }
            </For>
        </section>
    )

}