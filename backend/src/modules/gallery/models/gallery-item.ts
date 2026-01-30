import { model } from "@medusajs/framework/utils"

const GalleryItem = model.define("gallery_item", {
  id: model.id().primaryKey(),
  title: model.text().nullable(),
  description: model.text().nullable(),
  image_url: model.text(),
})

export default GalleryItem
