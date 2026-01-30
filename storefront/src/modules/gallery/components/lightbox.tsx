"use client"

import { useState, useEffect } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

type GalleryItem = {
    id: string
    title: string | null
    description: string | null
    image_url: string
    created_at: string
}

type LightboxProps = {
    items: GalleryItem[]
    currentIndex: number
    onClose: () => void
    onNavigate: (index: number) => void
}

export default function Lightbox({ items, currentIndex, onClose, onNavigate }: LightboxProps) {
    const currentItem = items[currentIndex]

    // Close on ESC key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose()
            if (e.key === "ArrowLeft") handlePrevious()
            if (e.key === "ArrowRight") handleNext()
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [currentIndex])

    // Prevent body scroll when lightbox is open
    useEffect(() => {
        document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = "unset"
        }
    }, [])

    const handlePrevious = () => {
        if (currentIndex > 0) {
            onNavigate(currentIndex - 1)
        }
    }

    const handleNext = () => {
        if (currentIndex < items.length - 1) {
            onNavigate(currentIndex + 1)
        }
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 animate-enter"
            onClick={onClose}
        >
            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 md:top-8 md:right-8 text-white hover:text-brand-accent transition-colors z-10"
                aria-label="Close lightbox"
            >
                <X size={32} />
            </button>

            {/* Previous button */}
            {currentIndex > 0 && (
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        handlePrevious()
                    }}
                    className="absolute left-4 md:left-8 text-white hover:text-brand-accent transition-colors z-10"
                    aria-label="Previous image"
                >
                    <ChevronLeft size={48} />
                </button>
            )}

            {/* Next button */}
            {currentIndex < items.length - 1 && (
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        handleNext()
                    }}
                    className="absolute right-4 md:right-8 text-white hover:text-brand-accent transition-colors z-10"
                    aria-label="Next image"
                >
                    <ChevronRight size={48} />
                </button>
            )}

            {/* Image container */}
            <div
                className="max-w-7xl max-h-[90vh] w-full mx-4 md:mx-8"
            >
                <img
                    src={currentItem.image_url}
                    alt={currentItem.title || "Gallery image"}
                    className="max-w-full max-h-[75vh] w-auto h-auto object-contain mx-auto"
                    onClick={(e) => e.stopPropagation()}
                />

                {/* Image info */}
                {(currentItem.title || currentItem.description) && (
                    <div className="mt-4 text-center">
                        {currentItem.title && (
                            <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
                                {currentItem.title}
                            </h3>
                        )}
                        {currentItem.description && (
                            <p className="text-sm md:text-base text-gray-300">
                                {currentItem.description}
                            </p>
                        )}
                    </div>
                )}

                {/* Counter */}
                <div className="mt-4 text-center text-sm text-gray-400">
                    {currentIndex + 1} / {items.length}
                </div>
            </div>
        </div>
    )
}
