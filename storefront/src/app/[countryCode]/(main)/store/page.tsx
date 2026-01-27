import { Metadata } from "next"

import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreTemplate from "@modules/store/templates"
import { getCategoryByHandle } from "@lib/data/categories"

export const metadata: Metadata = {
  title: "Store",
  description: "Explore all of our products.",
}

type Params = {
  searchParams: Promise<{
    sortBy?: SortOptions
    page?: string
    category?: string
  }>
  params: Promise<{
    countryCode: string
  }>
}

export default async function StorePage(props: Params) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { sortBy, page, category } = searchParams

  // Convert category handle to ID if provided
  let categoryId: string | undefined = undefined
  if (category) {
    try {
      const productCategory = await getCategoryByHandle([category])
      if (productCategory) {
        categoryId = productCategory.id
      }
    } catch (error) {
      // Category not found, will show all products
      console.error('Category not found:', category)
    }
  }

  return (
    <StoreTemplate
      sortBy={sortBy}
      page={page}
      categoryId={categoryId}
      countryCode={params.countryCode}
    />
  )
}
