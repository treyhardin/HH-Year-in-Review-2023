import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'



export const client = createClient({
  projectId: '48kogi03',
  dataset: 'production',
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: '2023-05-03', // use current date (YYYY-MM-DD) to target the latest API version
  // token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
})

const builder = imageUrlBuilder(client)

export const urlFor = (source) => {
  return builder.image(source)
}

export async function getHeroSettings() {
  const heroSettings = await client.fetch('*[_type == "heroSettings"]{ title, tickerText, "heroVideoURL": heroVideo.asset->url, "backgroundVideoURL": backgroundVideo.asset->url, backgroundFallback }')
  return heroSettings
}

export async function getNews() {
  const news = await client.fetch('*[_type == "newsSettings"]')
  return news
}

export async function getClientsSettings() {
  const clientSettings = await client.fetch('*[_type == "clientsSettings"]')
  return clientSettings
}

export async function getProjects() {
  const projects = await client.fetch('*[_type == "project"]')
  return projects
}

export async function getTeamSettings() {
  const teamSettings = await client.fetch('*[_type == "teamSettings"]')
  return teamSettings
}

export async function getQuoteSettings() {
  const quoteSettings = await client.fetch('*[_type == "quoteSettings"]')
  return quoteSettings
}

export async function getEvents() {
  const events = await client.fetch('*[_type == "eventSettings"]')
  return events
}

export async function getGallerySettings() {
  const gallerySettings = await client.fetch('*[_type == "gallerySettings"]')
  return gallerySettings
}

export async function getAwardsSettings() {
  const awardSettings = await client.fetch('*[_type == "awardSettings"]')
  return awardSettings
}

