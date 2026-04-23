import { defineRouteConfig } from "@medusajs/admin-sdk"
import { Photo } from "@medusajs/icons"

const SanityPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full gap-6 p-8">
            <Photo className="text-ui-fg-subtle" style={{ width: 48, height: 48 }} />
            <div className="text-center">
                <h1 className="text-ui-fg-base text-2xl font-semibold mb-2">
                    Galerie & Contenu
                </h1>
                <p className="text-ui-fg-subtle">
                    Gérez vos images, actualités et salons depuis Sanity Studio
                </p>
            </div>
            <a
                href="https://forge-elidor.sanity.studio"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-ui-button-inverted text-ui-fg-on-inverted px-6 py-3 rounded-lg hover:opacity-90 transition text-sm font-medium"
            >
                Ouvrir Sanity Studio →
            </a>
        </div>
    )
}

export const config = defineRouteConfig({
    label: "Contenu",
    icon: Photo,
})

export default SanityPage