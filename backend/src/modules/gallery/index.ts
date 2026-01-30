import GalleryModuleService from "./service"
import { Module } from "@medusajs/framework/utils"

export const GALLERY_MODULE = "gallery"

export default Module(GALLERY_MODULE, {
  service: GalleryModuleService,
})
