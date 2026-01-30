import { Metadata } from "next"
import GalleryPage from "@modules/gallery/components/gallery-page"

export const metadata: Metadata = {
    title: "Galerie | Forge Elidor",
    description: "Découvrez nos créations artisanales de couteaux. Chaque pièce est unique et confectionnée avec passion.",
}

export default function Gallery() {
    return <GalleryPage />
}
