import { Metadata } from "next"

import About from "@modules/home/components/about"
import FeaturedProducts from "@modules/home/components/featured-products"
import FeaturedSection from "@modules/home/components/featured-section"
import Hero from "@modules/home/components/hero"
import CategoriesSection from "@modules/home/components/categories-section"
import ActualitesSection from "@modules/home/components/actualites-section"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import { getPageAccueil } from "@lib/data/page-accueil"

export const metadata: Metadata = {
  title: {
    absolute: "Forge Elidor | Coutelier artisanal dans la Vallée de Munster",
  },
  description:
    "Forge Elidor — couteaux de cuisine artisanaux et pièces uniques forgés à la main par Joël Matter.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  const [{ collections }, contenu] = await Promise.all([
    listCollections({ fields: "id, handle, title" }),
    getPageAccueil(),
  ])

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero contenu={contenu.hero} />
      <CategoriesSection contenu={contenu.categories} />
      <About contenu={contenu.aPropos} />
      <FeaturedSection contenu={contenu.banniere} />
      <ActualitesSection contenu={contenu.actualites} />
      <ul className="flex flex-col">
        <FeaturedProducts collections={collections} region={region} />
      </ul>
    </>
  )
}
