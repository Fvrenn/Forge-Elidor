import { sanityClient } from '@lib/sanity'
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

export default async function GaleriePage({
    searchParams,
}: {
    searchParams: { categorie?: string }
}) {
    const [photos, categories] = await Promise.all([getGalerie(), getCategories()])
    const activeCategorie = searchParams?.categorie ?? null

    return (
        <div className="py-12 px-6 md:px-12 max-w-7xl mx-auto">
            <div className="mb-10">
                <h1 className="font-serif text-4xl text-brand-dark mb-2">Galerie</h1>
                <p className="text-ui-fg-subtle text-sm">Découvrez nos créations, filtrées par type de couteau.</p>
            </div>
            <GalerieFiltre photos={photos} categories={categories} activeCategorie={activeCategorie} />
        </div>
    )
}