import { sanityClient } from '@lib/sanity'
import GalerieFiltre from './GalerieFiltre'
import Image from 'next/image'

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

export default async function GaleriePage({
  searchParams,
}: {
  searchParams: { categorie?: string }
}) {
  const photos = await getGalerie()
  const categories = await getCategories()
  const activeCategorie = searchParams?.categorie ?? null

  return (
    <div>
      <GalerieFiltre photos={photos} categories={categories} activeCategorie={activeCategorie} />
    </div>
  )
}