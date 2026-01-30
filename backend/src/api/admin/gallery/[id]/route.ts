import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { GALLERY_MODULE } from "../../../../modules/gallery"

// DELETE - Delete a gallery item
export async function DELETE(
  req: MedusaRequest,
  res: MedusaResponse
) {
  const galleryModuleService = req.scope.resolve(GALLERY_MODULE)
  const { id } = req.params

  await galleryModuleService.deleteGalleryItems(id)

  res.json({ 
    id,
    deleted: true
  })
}
