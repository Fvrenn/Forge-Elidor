'use client'

import { useState } from 'react'
import Image from 'next/image'
import { urlFor } from '@lib/sanity'

export default function GalerieFiltre({ photos, categories }: any) {
    const [filtre, setFiltre] = useState<string | null>(null)

    const photosFiltrees = filtre
        ? photos.filter((p: any) => p.categorie?.slug === filtre)
        : photos

    return (
        <div>
            {/* Boutons de filtre */}
            <div className="flex gap-3 mb-8 flex-wrap">
                <button
                    onClick={() => setFiltre(null)}
                    className={`px-4 py-2 rounded-full text-sm transition ${filtre === null
                        ? 'bg-black text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                >
                    Tout
                </button>
                {categories.map((cat: any) => (
                    <button
                        key={cat._id}
                        onClick={() => setFiltre(cat.slug)}
                        className={`px-4 py-2 rounded-full text-sm transition ${filtre === cat.slug
                            ? 'bg-black text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        {cat.nom}
                    </button>
                ))}
            </div>

            {/* Grille photos */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {photosFiltrees.map((photo: any) => (
                    <div key={photo._id} className="relative aspect-square overflow-hidden rounded-lg">
                        <Image
                            src={urlFor(photo.image).width(600).url()}
                            alt={photo.titre}
                            fill
                            className="object-cover hover:scale-105 transition-transform"
                        />
                        <p className="absolute bottom-2 left-2 text-white text-sm font-medium drop-shadow">
                            {photo.titre}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}