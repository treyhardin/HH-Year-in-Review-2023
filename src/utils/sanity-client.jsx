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
  const heroSettings = await client.fetch('*[_type == "heroSettings"]{ "heroVideoURL": heroVideo.asset->url, "backgroundVideoURL": backgroundVideo.asset->url }')
  return heroSettings
}

export async function getHeroImages() {
  const heroImages = await client.fetch('*[_type == "heroImage"]')
  return heroImages
}

export async function getQuoteSettings() {
  const quoteSettings = await client.fetch('*[_type == "quoteSettings"]')
  return quoteSettings
}

export async function getClients() {
  const clients = await client.fetch('*[_type == "client"]')
  return clients
}

export async function getProjects() {
  const projects = await client.fetch('*[_type == "project"]')
  return projects
}

export async function getTeam() {
  const teamMembers = await client.fetch('*[_type == "teamMember"]')
  return teamMembers
}

export async function getEvents() {
  const events = await client.fetch('*[_type == "event"]')
  return events
}

export async function getNews() {
  const news = await client.fetch('*[_type == "news"]')
  return news
}