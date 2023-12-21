import { createResource } from 'solid-js'
import styles from './team.module.css'
import { getTeam, urlFor } from '../../utils/sanity-client'

export default function Team() {

    const [ data ] = createResource(getTeam)

    return (
        <Show when={data()}>
            <section class={styles.team}>
                <div class={styles.sectionTitle}>
                    <p class="h1">25</p>
                    <p class="h6">New Team Members</p>
                </div>
                <div class={styles.teamMembers}>
                    <For each={data()}>{(teamMember, i) =>
                        <Show when={teamMember.image}>
                            <div class={styles.teamMember} key={i()}>
                                <img class={styles.image} src={urlFor(teamMember.image).width(500).height(500)} />
                                <div class={styles.info}>
                                    <p class={`${styles.name} h6`}>{teamMember.name}</p>
                                    <p class={`${styles.title} caption`}>{teamMember.title}</p>
                                </div>
                            </div>
                        </Show>
                    }</For>
                </div>
            </section>
        </Show>
    )

}