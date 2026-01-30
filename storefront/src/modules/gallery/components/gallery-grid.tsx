"use client"

type GalleryItem = {
    id: string
    title: string | null
    description: string | null
    image_url: string
    created_at: string
}

type GalleryGridProps = {
    items: GalleryItem[]
    onItemClick: (index: number) => void
}

export default function GalleryGrid({ items, onItemClick }: GalleryGridProps) {
    if (items.length === 0) {
        return (
            <div className="text-center py-16">
                <p className="text-lg text-brand-dark/60">
                    Aucune réalisation pour le moment.
                </p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {items.map((item, index) => (
                <div
                    key={item.id}
                    onClick={() => onItemClick(index)}
                    className="group cursor-pointer overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-xl transition-all duration-300"
                >
                    {/* Image */}
                    <div className="relative aspect-square overflow-hidden bg-gray-100">
                        <img
                            src={item.image_url}
                            alt={item.title || "Réalisation"}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                            loading="lazy"
                        />

                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/20 transition-all duration-300" />
                    </div>

                    {/* Info */}
                    {(item.title || item.description) && (
                        <div className="p-4">
                            {item.title && (
                                <h3 className="font-semibold text-brand-dark mb-1 line-clamp-1">
                                    {item.title}
                                </h3>
                            )}
                            {item.description && (
                                <p className="text-sm text-brand-dark/70 line-clamp-2">
                                    {item.description}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}
