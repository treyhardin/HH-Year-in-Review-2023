import { createResource } from 'solid-js'
import styles from './team.module.css'
import { getTeam, urlFor } from '../../utils/sanity-client'

export default function Team() {

    const [ data ] = createResource(getTeam)

    return (
        <Show when={data()}>
            <section class={styles.team}>
                <For each={data()}>{(teamMember, i) =>
                    <div class={styles.teamMember}>
                        <p class={`h6`}>{teamMember.name}</p>
                        <p>{teamMember.title}</p>
                        {/* <img src={urlFor(teamMember.image).width(400)} /> */}
                    </div>
                }</For>
            </section>
        </Show>
    )

}