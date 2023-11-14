import { For, createSignal } from 'solid-js'
import styles from './events.module.css'
import { getEvents } from '../../utils/sanity-client'

export default function Events() {

    const [ events, setEvents ] = createSignal()

    const fetchEvents = async () => {
        setEvents(await getEvents())
    }

    return (
        <section>
            <h2>Events</h2>
            <For each={events()}>{(event, i) =>
                <p>{event.name}</p>
            }
            </For>
        </section>
    )

}