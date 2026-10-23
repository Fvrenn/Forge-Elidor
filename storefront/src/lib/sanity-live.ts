import { defineLive } from "next-sanity/live"
import { sanityClient } from "@lib/sanity"

// Studio où ouvrir un champ quand on clique sur un texte dans l'aperçu
export const STUDIO_URL =
  process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || "https://forge-elidor.sanity.studio"

// Token lecture seule : nécessaire pour voir les brouillons dans l'aperçu
const token = process.env.SANITY_API_READ_TOKEN

/**
 * sanityFetch : comme sanityClient.fetch, mais
 * - le site se met à jour tout seul quand un document est publié (<SanityLive />)
 * - en mode aperçu (Presentation), il lit les brouillons et rend les textes cliquables
 */
export const { sanityFetch, SanityLive } = defineLive({
  client: sanityClient.withConfig({
    apiVersion: "2025-02-19",
    useCdn: true,
    stega: { studioUrl: STUDIO_URL },
  }),
  serverToken: token,
  browserToken: token,
})
