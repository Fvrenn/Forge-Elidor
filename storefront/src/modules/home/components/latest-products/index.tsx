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
        <div className="bg-brand-green rounded-3xl">
            <div className="big-container py-12 small:py-24 ">
                <div className="flex justify-between mb-8">
                    <div className="flex items-center">
                        <h2 className="text-3xl font-black font-sans uppercase md:text-5xl text-brand-light">derniers couteaux</h2>
                        <p className="text-brand-light text-lg font-sans ml-10">Ces couteaux sont encore disponibles à la vente</p>
                    </div>
                    <a href="#" className="bg-brand-light text-black text-lg font-sans font-medium rounded-full px-6 flex items-center gap-2">Voir Plus <ArrowRight /></a>
                </div>
                <ul className="grid grid-cols-2 small:grid-cols-4 gap-x-6 gap-y-8 mt-24">
                    {products.slice(0, 4).map((product) => (
                        <li key={product.id} className="">
                            <ProductPreview product={product} region={region} isFeatured isLight={true} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
