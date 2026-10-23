import { defineEnableDraftMode } from "next-sanity/draft-mode"
import { sanityClient } from "@lib/sanity"

// Appelée par l'outil Presentation du Studio pour activer l'aperçu des brouillons
export const { GET } = defineEnableDraftMode({
  client: sanityClient.withConfig({ token: process.env.SANITY_API_READ_TOKEN }),
})
