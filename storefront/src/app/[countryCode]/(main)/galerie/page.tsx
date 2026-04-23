import { sanityClient, urlFor } from '@lib/sanity'
import Image from 'next/image'
import GalerieFiltre from './GalerieFiltre'

async function getCategories() {
    return sanityClient.fetch(`
    *[_type == "categorieGalerie"] | order(nom asc) {
      _id, nom, "slug": slug.current
    }
  `)
}

async function getGalerie() {
    return sanityClient.fetch(`
    *[_type == "galerie"] | order(ordre asc) {
      _id, titre, image,
      "categorie": categorie->{ _id, nom, "slug": slug.current }
    }
  `)
}

export default async function GaleriePage() {
    const [photos, categories] = await Promise.all([getGalerie(), getCategories()])

    return (
        <div className="p-8">
            <GalerieFiltre photos={photos} categories={categories} />
        </div>
    )
}