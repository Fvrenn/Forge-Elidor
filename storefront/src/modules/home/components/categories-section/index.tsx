import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ArrowRight } from "lucide-react"
import { listCategoriesGalerie } from "@lib/data/categories-galerie"
import { urlFor } from "@lib/sanity"

export default async function CategoriesSection() {
    const categories = await listCategoriesGalerie()

    if (!categories.length) {
        return null
    }

    return (
        <section className="bg-brand-green rounded-3xl mt-6">
            <div className="big-container py-12 small:py-24">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-14 gap-6 md:gap-0">
                    <div className="flex flex-col lg:max-w-2xl">
                        <h2 className="text-3xl font-black font-sans uppercase md:text-5xl text-brand-light">
                            Nos catégories de couteaux
                        </h2>
                        <p className="text-brand-light text-lg font-sans mt-3">
                            Chaque lame a sa forme et son usage. Survolez une catégorie pour découvrir le couteau, et trouvez celui fait pour votre cuisine.
                        </p>
                    </div>
                    <LocalizedClientLink
                        href="/galerie"
                        className="group bg-brand-light text-black text-lg font-sans font-medium rounded-full px-6 py-3 w-fit h-fit flex items-center gap-2 shrink-0 hover:gap-3 transition-all duration-300"
                    >
                        Voir la galerie
                        <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                    </LocalizedClientLink>
                </div>

                <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {categories.map((cat) => (
                        <li key={cat._id}>
                            <LocalizedClientLink
                                href={`/galerie?categorie=${cat.slug}`}
                                className="group/cat relative flex flex-col items-center justify-between bg-brand-light rounded-2xl p-6 h-44 md:h-56 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                            >
                                {/* Real knife photo revealed on hover */}
                                {cat.banniere && (
                                    <Image
                                        src={urlFor(cat.banniere).width(600).url()}
                                        alt={cat.nom}
                                        fill
                                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                        className="object-cover z-0 opacity-0 scale-110 transition-all duration-700 ease-out group-hover/cat:opacity-100 group-hover/cat:scale-100"
                                    />
                                )}
                                {/* Gradient for label legibility over the photo */}
                                <div className="absolute inset-0 z-[1] bg-gradient-to-t from-brand-dark/80 via-brand-dark/20 to-transparent opacity-0 transition-opacity duration-500 group-hover/cat:opacity-100" />

                                {/* Line icon, fades out to reveal the photo */}
                                <span className="relative z-10 flex-1 flex items-center justify-center w-28">
                                    {cat.icone && (
                                        <img
                                            src={cat.icone}
                                            alt=""
                                            className="w-28 h-14 object-contain transition-all duration-500 group-hover/cat:opacity-0 group-hover/cat:scale-90"
                                        />
                                    )}
                                </span>

                                {/* Label: recolors to light over the photo */}
                                <span className="relative z-10 font-serif text-lg md:text-xl text-brand-dark text-center transition-colors duration-500 group-hover/cat:text-brand-light">
                                    {cat.nom}
                                </span>

                                {/* Arrow appears on hover */}
                                <span className="absolute bottom-4 right-4 z-10 opacity-0 -translate-x-2 transition-all duration-500 group-hover/cat:opacity-100 group-hover/cat:translate-x-0">
                                    <ArrowRight className="w-5 h-5 text-brand-light" />
                                </span>
                            </LocalizedClientLink>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
