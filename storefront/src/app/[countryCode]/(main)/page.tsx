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
  title: "Medusa Next.js Starter Template",
  description:
    "A performant frontend ecommerce starter template with Next.js 15 and Medusa.",
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
      <div className="py-12">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>
    </>
  )
}
