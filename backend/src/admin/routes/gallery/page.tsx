import { defineRouteConfig } from "@medusajs/admin-sdk"
import { Container, Heading } from "@medusajs/ui"
import { GalleryList } from "./components/gallery-list"
import { GalleryForm } from "./components/gallery-form"

const GalleryPage = () => {
    return (
        <Container className="divide-y p-0">
            <div className="flex items-center justify-between px-6 py-4">
                <Heading level="h1">Gallery</Heading>
            </div>

            <div className="px-6 py-4">
                <GalleryForm />
            </div>

            <div className="px-6 py-4">
                <GalleryList />
            </div>
        </Container>
    )
}

export const config = defineRouteConfig({
    label: "Gallery",
})

export default GalleryPage
