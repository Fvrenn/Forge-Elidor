import { Metadata } from "next"

import About from "@modules/home/components/about"
import FeaturedProducts from "@modules/home/components/featured-products"
import FeaturedSection from "@modules/home/components/featured-section"
import Hero from "@modules/home/components/hero"
import CategoriesSection from "@modules/home/components/categories-section"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "Forge Elidor | Coutelier artisanal dans la Vallée de Munster",
  description:
    "Forge Elidor — couteaux de cuisine artisanaux et pièces uniques forgés à la main par Joël Matter.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero />
      <CategoriesSection />
      <About />
      <FeaturedSection />
      <ul className="flex flex-col">
        <FeaturedProducts collections={collections} region={region} />
      </ul>
    </>
  )
}
