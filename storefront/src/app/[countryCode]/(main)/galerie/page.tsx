import { sanityClient } from '@lib/sanity'
import { listCategoriesGalerie } from '@lib/data/categories-galerie'
import GalerieFiltre from './GalerieFiltre'

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
  const categories = await listCategoriesGalerie()
  const activeCategorie = searchParams?.categorie ?? null

  return (
    <div>
      <GalerieFiltre photos={photos} categories={categories} activeCategorie={activeCategorie} />
    </div>
  )
}
