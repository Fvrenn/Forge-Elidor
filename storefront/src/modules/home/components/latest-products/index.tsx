import { HttpTypes } from "@medusajs/types"
import ProductPreview from "@modules/products/components/product-preview"
import { ArrowRight } from "lucide-react"
export default function LatestProducts({
    products,
    region,
}: {
    products: HttpTypes.StoreProduct[]
    region: HttpTypes.StoreRegion
}) {
    return (
        <div className="bg-brand-green rounded-3xl mt-6">
            <div className="big-container py-12 small:py-24">
                <div className="flex flex-col md:flex-row justify-between mb-8 gap-6 md:gap-0">
                    <div className="flex flex-col lg:flex-row lg:items-center">
                        <h2 className="text-3xl font-black font-sans uppercase md:text-5xl text-brand-light">derniers couteaux</h2>
                        <p className="text-brand-light text-lg font-sans lg:ml-10 mt-2 md:mt-0">Ces couteaux sont encore disponibles à la vente</p>
                    </div>
                    <a href="#" className="bg-brand-light text-black text-lg font-sans font-medium rounded-full px-6 py-3 md:py-0 w-fit flex items-center gap-2">Voir Plus <ArrowRight /></a>
                </div>
                <ul className="flex md:inline-flex flex-col md:flex-row gap-x-6 gap-y-8 mt-24">
                    {products.slice(0, 4).map((product) => (
                        <li key={product.id} className="w-full">
                            <ProductPreview product={product} region={region} isFeatured isLight={true} thumbnailSize="large" />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
