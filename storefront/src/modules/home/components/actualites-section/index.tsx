import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ArrowRight } from "lucide-react"
import { sanityClient, urlFor } from "@lib/sanity"
import type { PageAccueil } from "@lib/data/page-accueil"

type Actualite = {
    _id: string
    titre: string
    date: string
    image?: any
    texte?: string
}

async function getDernieresActualites(): Promise<Actualite[]> {
    try {
        return await sanityClient.fetch(`
            *[_type == "actualite"] | order(date desc)[0...4] {
                _id, titre, date, image, texte
            }
        `)
    } catch (e) {
        console.error("Sanity: impossible de récupérer les actualités", e)
        return []
    }
}

// Badge court façon "30.03"
function formatDateCourte(date: string) {
    try {
        return new Date(date).toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "2-digit",
        }).replace("/", ".")
    } catch {
        return date
    }
}

export default async function ActualitesSection({
    contenu,
}: {
    contenu: PageAccueil["actualites"]
}) {
    const actualites = await getDernieresActualites()

    if (!actualites.length) {
        return null
    }

    return (
        <section className="big-container py-12 small:py-24">
            <div className="flex flex-col md:flex-row md:items-start justify-between mb-10 md:mb-14 gap-6 md:gap-10">
                <h2 className="text-3xl font-black font-sans uppercase md:text-5xl lg:text-6xl text-brand-darkGray leading-none">
                    {contenu.titre}
                </h2>

                <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8 shrink-0">
                    <p className="font-sans text-brand-brown text-sm md:max-w-[220px]">
                        {contenu.texte}
                    </p>
                    <LocalizedClientLink
                        href="/actualite"
                        className="group bg-brand-green text-brand-light text-base font-sans font-medium rounded-full px-6 py-3 w-fit h-fit flex items-center gap-2 shrink-0 hover:gap-3 transition-all duration-300"
                    >
                        Voir plus
                        <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </LocalizedClientLink>
                </div>
            </div>

            <ul className="grid md:grid-cols-2 gap-x-10 lg:gap-x-16 gap-y-10 md:gap-y-14">
                {actualites.map((item, index) => (
                    <li key={item._id} className="flex gap-5 lg:gap-8">
                        {/* Visuel + pastille date */}
                        <div className="relative w-[42%] shrink-0 aspect-square overflow-hidden rounded-2xl bg-brand-accent">
                            {item.image && (
                                <Image
                                    src={urlFor(item.image).width(600).url()}
                                    alt={item.titre}
                                    fill
                                    sizes="(max-width: 768px) 42vw, 21vw"
                                    className="object-cover"
                                />
                            )}
                            <span className="absolute top-3 right-3 bg-brand-green/90 text-brand-light font-sans text-sm px-3 py-1 rounded-full backdrop-blur-sm">
                                {formatDateCourte(item.date)}
                            </span>
                        </div>

                        {/* Contenu */}
                        <div className="flex flex-col flex-1 min-w-0">
                            <h3 className="font-sans font-bold text-brand-darkGray text-base lg:text-lg leading-snug line-clamp-3">
                                {item.titre}
                            </h3>
                            {item.texte && (
                                <p className="mt-4 font-sans text-brand-brown text-sm lg:text-base leading-relaxed line-clamp-3">
                                    {item.texte}
                                </p>
                            )}
                            <LocalizedClientLink
                                href={`/actualite#${item._id}`}
                                className={`mt-auto pt-5 w-fit ${index % 2 === 0
                                    ? "text-brand-light"
                                    : "text-brand-brown"
                                    }`}
                            >
                                <span
                                    className={`block font-sans text-base rounded-full px-8 py-2.5 border transition-colors duration-300 ${index % 2 === 0
                                        ? "bg-brand-green border-brand-green hover:bg-brand-brown hover:border-brand-brown"
                                        : "bg-transparent border-brand-accent hover:border-brand-brown"
                                        }`}
                                >
                                    Lire
                                </span>
                            </LocalizedClientLink>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    )
}
