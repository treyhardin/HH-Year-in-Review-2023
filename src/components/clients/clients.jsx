import { For, createSignal, onMount } from 'solid-js'
import styles from './clients.module.css'
import { getClients } from '../../utils/sanity-client'

export default function Clients() {

    const [clients, setClients ] = createSignal(null)
    
    const fetchClients = async () => {
        setClients(await getClients())
    }

    fetchClients()

    return (
        <section>
            <h2>Clients</h2>
            <For each={clients()} >{(client, i) => 
                <p key={i}>{client.name}</p>
            }
            </For>
        </section>
    )

}