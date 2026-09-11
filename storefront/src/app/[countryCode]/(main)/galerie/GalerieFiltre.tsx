'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import { urlFor } from '@lib/sanity'
import type { CategorieGalerie } from '@lib/data/categories-galerie'

interface Photo {
    _id: string
    titre: string
    image: any
    categorie?: { _id: string; nom: string; slug: string }
}

interface GaleireFiltrePops {
    photos: Photo[]
    categories: CategorieGalerie[]
    activeCategorie: string | null
}

const DEFAULT_BANNER = { src: "/galerie-page/Bunka_1.webp", alt: "Galerie Forge Elidor" }
const DEFAULT_DESCRIPTION = "L'art de la forge au service de votre cuisine. Découvrez nos pièces uniques façonnées à la main."

export default function GalerieFiltre({ photos, categories, activeCategorie }: GaleireFiltrePops) {
    const router = useRouter()
    const pathname = usePathname()
    const [filtre, setFiltre] = useState<string | null>(activeCategorie)
    const [lightboxPhoto, setLightboxPhoto] = useState<Photo | null>(null)

    // Sync filtre with URL param when navigating via nav links
    useEffect(() => {
        setFiltre(activeCategorie)
    }, [activeCategorie])

    const handleFilterChange = (slug: string | null) => {
        setFiltre(slug)
        if (slug) {
            router.push(`${pathname}?categorie=${slug}`, { scroll: false })
        } else {
            router.push(pathname, { scroll: false })
        }
    }

    const photosFiltrees = filtre
        ? photos.filter((p) => p.categorie?.slug === filtre)
        : photos

    const categorieActive = categories.find((c) => c.slug === filtre)
    // Categories without a banner fall back to the default one, already rendered below
    const categoriesAvecBanniere = categories.filter((c) => c.banniere)
    const banniereActiveVisible = Boolean(categorieActive?.banniere)

    return (
        <div>
            {/* Instant Cross-fade Banner */}
            <div className="w-full h-60 relative md:mb-20 overflow-hidden group">
                {/* All banners stacked with opacity */}
                {categoriesAvecBanniere.map((cat) => (
                    <Image
                        key={cat._id}
                        src={urlFor(cat.banniere).width(1920).url()}
                        alt={cat.nom}
                        fill
                        priority
                        className={`object-cover transition-opacity duration-1000 ease-in-out ${filtre === cat.slug ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                    />
                ))}
                {/* Default banner for "Tout" and categories without a banner */}
                <Image
                    src={DEFAULT_BANNER.src}
                    alt={DEFAULT_BANNER.alt}
                    fill
                    priority
                    className={`object-cover transition-opacity duration-1000 ease-in-out ${banniereActiveVisible ? 'opacity-0 z-0' : 'opacity-100 z-10'}`}
                />

                {/* Gradient Overlay for legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />

                {/* Content Overlay */}
                <div className="absolute inset-0 z-20 flex flex-col p-6 max-w-[1400px] mx-auto w-full h-full">
                    {/* Top part: Breadcrumbs */}
                    <div className="transition-all duration-700 delay-100 transform translate-y-0 opacity-100">
                        <nav className="flex items-center text-brand-light/90 text-xs md:text-sm uppercase tracking-widest font-medium">
                            <span className="hover:text-white transition-colors cursor-pointer" onClick={() => handleFilterChange(null)}>Galerie</span>
                            <span className="mx-3 opacity-40">/</span>
                            <span className="text-white">
                                {categorieActive?.nom || "Toutes les créations"}
                            </span>
                        </nav>
                    </div>

                    {/* Bottom part: Title and Description */}
                    <div className="mt-9 flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-16 transition-all duration-1000 delay-300 transform translate-y-0 opacity-100">
                        <div className="flex-1">
                            <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-[1.1] drop-shadow-2xl">
                                {categorieActive?.nom || "Galerie Forge Elidor"}
                            </h2>
                        </div>

                        <div className="max-w-md lg:max-w-lg md:max-w-sm md:mb-2">
                            <p className="text-white/80 text-base md:text-lg lg:text-xl font-light leading-relaxed drop-shadow-lg italic md:not-italic">
                                {categorieActive?.description || DEFAULT_DESCRIPTION}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="content-container">
                {/* Filter buttons */}
                <div className="flex gap-2 mb-10 flex-wrap">
                    <button
                        onClick={() => handleFilterChange(null)}
                        className={`px-5 py-2 rounded-full text-sm font-serif transition-all duration-200 border ${filtre === null
                            ? 'bg-brand-dark text-brand-light border-brand-dark'
                            : 'bg-transparent text-brand-dark border-brand-accent hover:border-brand-dark'
                            }`}
                    >
                        Tout
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat._id}
                            onClick={() => handleFilterChange(cat.slug)}
                            className={`px-5 py-2 rounded-full text-sm font-serif transition-all duration-200 border ${filtre === cat.slug
                                ? 'bg-brand-dark text-brand-light border-brand-dark'
                                : 'bg-transparent text-brand-dark border-brand-accent hover:border-brand-dark'
                                }`}
                        >
                            {cat.nom}
                        </button>
                    ))}
                </div>

                {/* Photo grid */}
                {photosFiltrees.length === 0 ? (
                    <p className="text-ui-fg-subtle font-serif text-center py-20">
                        Aucune photo dans cette catégorie pour le moment.
                    </p>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {photosFiltrees.map((photo) => (
                            <button
                                key={photo._id}
                                onClick={() => setLightboxPhoto(photo)}
                                className="relative aspect-square overflow-hidden rounded-lg group focus:outline-none focus:ring-2 focus:ring-brand-dark"
                            >
                                <Image
                                    src={urlFor(photo.image).width(600).url()}
                                    alt={photo.titre}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-end">
                                    <p className="text-white text-sm font-serif px-3 pb-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                        {photo.titre}
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>
                )}

                {/* Lightbox */}
                {lightboxPhoto && (
                    <div
                        className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
                        onClick={() => setLightboxPhoto(null)}
                    >
                        <div
                            className="relative max-w-4xl w-full max-h-[90vh] rounded-xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative w-full" style={{ aspectRatio: '4/3' }}>
                                <Image
                                    src={urlFor(lightboxPhoto.image).width(1200).url()}
                                    alt={lightboxPhoto.titre}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                                <p className="text-white font-serif text-lg">{lightboxPhoto.titre}</p>
                                {lightboxPhoto.categorie && (
                                    <p className="text-white/70 text-sm mt-1">{lightboxPhoto.categorie.nom}</p>
                                )}
                            </div>
                            <button
                                onClick={() => setLightboxPhoto(null)}
                                className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-colors duration-200"
                                aria-label="Fermer"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
