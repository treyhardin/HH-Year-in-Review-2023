import { createResource } from 'solid-js'
import styles from './team.module.css'
import { getTeamSettings, urlFor } from '../../utils/sanity-client'

export default function Team() {

    const [ data ] = createResource(getTeamSettings)

    return (
        <Show when={data()}>
            <section class={styles.team} id="team">
                <div class={styles.sectionTitle}>
                    <p class="h1">{data()[0].value}</p>
                    <p class="h6">{data()[0].label}</p>
                </div>
                <div class={styles.teamMembers}>
                    <For each={data()[0].teamMembers}>{(teamMember, i) =>
                        <Show when={teamMember.image}>
                            <div class={styles.teamMember} key={i()}>
                                <img 
                                    class={styles.image} 
                                    src={urlFor(teamMember.image).width(500).height(500)} 
                                    width="30vw"
                                    height="30vh"
                                    alt="Headshot image of a new Half Helix team member."
                                />
                                <div class={styles.info}>
                                    <h4 class={`${styles.name} h5`}>{teamMember.name}</h4>
                                    <p class={`${styles.role} caption`}>{teamMember.role}</p>
                                </div>
                            </div>
                        </Show>
                    }</For>
                </div>
            </section>
        </Show>
    )

}