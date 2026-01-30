import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { GALLERY_MODULE } from "../../../modules/gallery"

// GET - Public route to fetch gallery items (no auth required)
export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
) {
  const galleryModuleService = req.scope.resolve(GALLERY_MODULE)

  const items = await galleryModuleService.listGalleryItems()

  // Add CORS headers for frontend access
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  res.json({ gallery_items: items })
}
