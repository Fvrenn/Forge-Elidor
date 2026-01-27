"use client"

import { HttpTypes } from "@medusajs/types"
import { Container, clx } from "@medusajs/ui"
import Image from "next/image"
import { useState } from "react"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(images[0])
  const [zoomProps, setZoomProps] = useState({ x: 0, y: 0 })
  const [isZoomed, setIsZoomed] = useState(false)

  if (!images || images.length === 0) {
    return null
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100
    setZoomProps({ x, y })
  }

  return (
    <div className="flex items-start relative w-full">
      <div className="flex flex-col flex-1 small:mx-16 gap-y-4 w-full min-w-0">
        <Container
          className="relative aspect-[689/517] w-full overflow-hidden bg-ui-bg-subtle cursor-crosshair"
          id={selectedImage.id}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
        >
          {!!selectedImage.url && (
            <Image
              src={selectedImage.url}
              priority={true}
              className={clx(
                "absolute inset-0 rounded-rounded transition-transform duration-300 ease-in-out",
                {
                  "scale-[2]": isZoomed,
                  "scale-100": !isZoomed,
                }
              )}
              alt={`Product image`}
              fill
              sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
              style={{
                objectFit: "cover",
                transformOrigin: `${zoomProps.x}% ${zoomProps.y}%`,
              }}
            />
          )}
        </Container>

        <div className="flex gap-x-4 overflow-x-auto py-2 snap-x scrollbar-hide">
          {images.map((image, index) => {
            const isSelected = image.id === selectedImage.id
            return (
              <button
                key={image.id}
                onClick={() => setSelectedImage(image)}
                className={clx(
                  "relative aspect-[689/517] w-24 flex-shrink-0 overflow-hidden rounded-rounded border transition-all duration-200 snap-start scroll-ml-4",
                  {
                    "border-ui-border-interactive ring-1 ring-ui-border-interactive": isSelected,
                    "border-transparent hover:border-ui-border-strong": !isSelected,
                  }
                )}
              >
                <Image
                  src={image.url}
                  alt={`Product thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="100px"
                />
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ImageGallery
