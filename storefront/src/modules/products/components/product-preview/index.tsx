import { Text, clx } from "@medusajs/ui"
import { listProducts } from "@lib/data/products"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
  isLight,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
  isLight?: boolean
}) {
  // const pricedProduct = await listProducts({
  //   regionId: region.id,
  //   queryParams: { id: [product.id!] },
  // }).then(({ response }) => response.products[0])

  // if (!pricedProduct) {
  //   return null
  // }

  const { cheapestPrice } = getProductPrice({
    product,
  })

  return (
    <LocalizedClientLink href={`/products/${product.handle}`} className="group">
      <div data-testid="product-wrapper">
        <Thumbnail
          thumbnail={product.thumbnail}
          images={product.images}
          size="large"
          isFeatured={isFeatured}
        >
          <div className="absolute bottom-1 left-0 right-0 px-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:bottom-[18px] transition-all duration-300 ease-in-out z-10">
            <div className="bg-brand-light text-brand-brown py-[6.5px] flex justify-center w-full text-lg font-normal font-lora shadow-md">
              <span className="font-serif">Voir les details</span>
            </div>
          </div>
        </Thumbnail>
        <div>
          <div className="flex mt-4 justify-between">
            <Text className={clx("font-sans text-lg font-medium", isLight ? "text-brand-light" : "text-brand-brown")} data-testid="product-title">
              {product.title}
            </Text>
            <div>
              {cheapestPrice && <PreviewPrice price={cheapestPrice} isLight={isLight} />}
            </div>
          </div>
          <div className="mt-1">
            <Text className={clx("font-sans text-lg font-normal", isLight ? "text-brand-light" : "text-brand-brown")} data-testid="product-title">
              {product.description}
            </Text>
            <Text className={clx("font-sans text-lg font-normal", isLight ? "text-brand-light" : "text-brand-brown")} data-testid="product-title">
              {product.subtitle}
            </Text>
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}
