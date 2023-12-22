import { For, Show, createResource } from 'solid-js'
import Button from '../button/button'
import styles from './footer.module.css'
import { getFooterData } from '../../utils/sanity-client'

export default function Footer() {

    const [ data ] = createResource(getFooterData) 

    return (
        <Show when={data()}>
            <footer class={styles.footer}>
                <div class={styles.content}>
                    <p class="h3">{data()[0].heading}</p>
                    <p class="h6">{data()[0].subheading}</p>
                    <Button style="primary" text="Learn More about Half Helix" link={data()[0].buttonURL} />
                </div>
                <div class={styles.footerLinks}>
                    <For each={data()[0].links}>{(link, i) => 
                        <a class={`${styles.footerLink} caption`} href={link.URL} target="_blank">{link.text}</a>
                    }</For>
                </div>
                <video 
                    class={styles.backgroundAsset} 
                    autoplay 
                    loop 
                    muted  
                    defaultmuted 
                    playsinline 
                    src={ data()[0].backgroundVideoURL } 
                    poster={ data()[0].fallbackImage } 
                    onloadedmetadata="this.muted = true" 
                />
            </footer>
        </Show>
    )

}