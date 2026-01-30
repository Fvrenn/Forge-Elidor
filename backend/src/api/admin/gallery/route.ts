import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { GALLERY_MODULE } from "../../../modules/gallery"

interface CreateGalleryItemBody {
  title?: string | null
  description?: string | null
  image_url: string
}

// GET - List all gallery items
export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
) {
  const galleryModuleService = req.scope.resolve(GALLERY_MODULE)

  const items = await galleryModuleService.listGalleryItems()

  res.json({ gallery_items: items })
}

// POST - Create a new gallery item
export async function POST(
  req: MedusaRequest<CreateGalleryItemBody>,
  res: MedusaResponse
) {
  const galleryModuleService = req.scope.resolve(GALLERY_MODULE)

  const { title, description, image_url } = req.body

  const item = await galleryModuleService.createGalleryItems({
    title,
    description,
    image_url,
  })

  res.json({ gallery_item: item })
}

