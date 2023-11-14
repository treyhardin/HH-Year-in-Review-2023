import { For, createSignal } from 'solid-js'
import { getProjects } from '../../utils/sanity-client'
import styles from './projects.module.css'

export default function Projects() {

    const [projects, setProjects ] = createSignal(null)
    
    const fetchProjects = async () => {
        setProjects(await getProjects())
    }

    fetchProjects()

    return (
        <section>
            <h2>Projects</h2>
            <For each={projects()}>{(project, i) =>
                <p>{project.name}</p>
            }</For>
        </section>
    )

}