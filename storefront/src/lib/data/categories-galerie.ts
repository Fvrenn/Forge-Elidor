import { sanityClient } from "@lib/sanity"

export type CategorieGalerie = {
  _id: string
  nom: string
  slug: string
  description?: string
  banniere?: any
  icone?: string
  iconeHover?: string
}

const CATEGORIES_QUERY = `
  *[_type == "categorieGalerie" && defined(slug.current)] | order(coalesce(ordre, 9999) asc, nom asc) {
    _id,
    nom,
    "slug": slug.current,
    description,
    banniere,
    "icone": icone.asset->url,
    "iconeHover": coalesce(iconeHover.asset->url, icone.asset->url)
  }
`

export async function listCategoriesGalerie(): Promise<CategorieGalerie[]> {
  try {
    return await sanityClient.fetch(CATEGORIES_QUERY)
  } catch (e) {
    console.error("Sanity: impossible de récupérer les catégories galerie", e)
    return []
  }
}
