import { MetadataRoute } from "next"

import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { listProducts } from "@lib/data/products"
import { getBaseURL } from "@lib/util/env"

const DEFAULT_REGION = process.env.NEXT_PUBLIC_DEFAULT_REGION || "fr"

const STATIC_PATHS = ["", "/store", "/atelier", "/actualite", "/galerie"]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseURL()
  const prefix = `${baseUrl}/${DEFAULT_REGION}`
  const lastModified = new Date()

  const entries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: `${prefix}${path}`,
    lastModified,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }))

  // Le backend peut être injoignable au moment du build : on ne casse pas la génération.
  try {
    const { response } = await listProducts({
      countryCode: DEFAULT_REGION,
      queryParams: { limit: 100, fields: "handle,updated_at" },
    })

    entries.push(
      ...response.products.map((product) => ({
        url: `${prefix}/products/${product.handle}`,
        lastModified: product.updated_at
          ? new Date(product.updated_at)
          : lastModified,
        changeFrequency: "weekly" as const,
        priority: 0.9,
      }))
    )
  } catch (e) {
    console.error("sitemap: impossible de lister les produits", e)
  }

  try {
    const { collections } = await listCollections({ fields: "handle" })

    entries.push(
      ...collections.map((collection) => ({
        url: `${prefix}/collections/${collection.handle}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }))
    )
  } catch (e) {
    console.error("sitemap: impossible de lister les collections", e)
  }

  try {
    const categories = await listCategories()

    entries.push(
      ...(categories ?? []).map((category: { handle: string }) => ({
        url: `${prefix}/categories/${category.handle}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }))
    )
  } catch (e) {
    console.error("sitemap: impossible de lister les catégories", e)
  }

  return entries
}
