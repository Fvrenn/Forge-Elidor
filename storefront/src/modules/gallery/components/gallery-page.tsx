"use client"

import { useState, useEffect } from "react"
import GalleryGrid from "@modules/gallery/components/gallery-grid"
import Lightbox from "@modules/gallery/components/lightbox"

type GalleryItem = {
    id: string
    title: string | null
    description: string | null
    image_url: string
    created_at: string
}

export default function GalleryPage() {
    const [items, setItems] = useState<GalleryItem[]>([])
    const [loading, setLoading] = useState(true)
    const [lightboxOpen, setLightboxOpen] = useState(false)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    useEffect(() => {
        fetchGalleryItems()
    }, [])

    const fetchGalleryItems = async () => {
        try {
            const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"
            const response = await fetch(`${backendUrl}/custom/gallery`)

            if (!response.ok) {
                throw new Error("Failed to fetch gallery items")
            }

            const data = await response.json()
            setItems(data.gallery_items || [])
        } catch (error) {
            console.error("Error fetching gallery:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleItemClick = (index: number) => {
        setCurrentImageIndex(index)
        setLightboxOpen(true)
    }

    const handleCloseLightbox = () => {
        setLightboxOpen(false)
    }

    const handleNavigateLightbox = (index: number) => {
        setCurrentImageIndex(index)
    }

    if (loading) {
        return (
            <div className="content-container py-12">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-brand-dark"></div>
                    <p className="mt-4 text-brand-dark/60">Chargement...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="content-container py-12">
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-4">
                    Galerie
                </h1>
                <p className="text-lg text-brand-dark/70 max-w-2xl mx-auto">
                    Découvrez nos créations artisanales. Chaque pièce est unique et confectionnée avec passion.
                </p>
            </div>

            {/* Gallery Grid */}
            <GalleryGrid items={items} onItemClick={handleItemClick} />

            {/* Lightbox */}
            {lightboxOpen && items.length > 0 && (
                <Lightbox
                    items={items}
                    currentIndex={currentImageIndex}
                    onClose={handleCloseLightbox}
                    onNavigate={handleNavigateLightbox}
                />
            )}
        </div>
    )
}
