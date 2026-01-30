import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { GALLERY_MODULE } from "../../../modules/gallery"

// GET - List all gallery items (public route for storefront)
export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
) {
  const galleryModuleService = req.scope.resolve(GALLERY_MODULE)

  const items = await galleryModuleService.listGalleryItems()

  res.json({ gallery_items: items })
}
