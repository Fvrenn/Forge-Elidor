import { Metadata } from "next"

import About from "@modules/home/components/about"
import FeaturedProducts from "@modules/home/components/featured-products"
import FeaturedSection from "@modules/home/components/featured-section"
import Hero from "@modules/home/components/hero"
import LatestProducts from "@modules/home/components/latest-products"
import { listCollections } from "@lib/data/collections"
import { listProducts } from "@lib/data/products"
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

  // Fetch latest products
  const { response: { products: latestProducts } } = await listProducts({
    countryCode,
    queryParams: {
      limit: 4,
      order: "-created_at"
    }
  })

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero />
      <LatestProducts products={latestProducts} region={region} />
      <About />
      <FeaturedSection />
      <ul className="flex flex-col">
        <FeaturedProducts collections={collections} region={region} />
      </ul>
    </>
  )
}
