import { useState } from "react"
import { Button, Input, Textarea, Label, toast, Heading } from "@medusajs/ui"

export const GalleryForm = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [file, setFile] = useState<File | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0])
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!file) {
            toast.error("Image is required")
            return
        }

        setIsLoading(true)

        try {
            // First, upload the file
            const formData = new FormData()
            formData.append("files", file)

            const uploadRes = await fetch("/admin/uploads", {
                method: "POST",
                body: formData,
                credentials: "include",
            })

            if (!uploadRes.ok) {
                const errorText = await uploadRes.text()
                console.error("Upload failed:", errorText)
                throw new Error("Failed to upload file")
            }

            const uploadData = await uploadRes.json()
            console.log("Upload response:", uploadData)

            // Handle different possible response formats
            let imageUrl: string
            if (uploadData.uploads && uploadData.uploads[0]) {
                imageUrl = uploadData.uploads[0].url
            } else if (uploadData.files && uploadData.files[0]) {
                imageUrl = uploadData.files[0].url
            } else if (uploadData.url) {
                imageUrl = uploadData.url
            } else if (Array.isArray(uploadData) && uploadData[0]) {
                imageUrl = uploadData[0].url
            } else {
                console.error("Unexpected upload response format:", uploadData)
                throw new Error("Upload response format not recognized")
            }

            console.log("Image URL:", imageUrl)

            // Then, create the gallery item with the image URL
            const createRes = await fetch("/admin/gallery", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    title,
                    description: description || null,
                    image_url: imageUrl,
                }),
            })

            if (!createRes.ok) {
                const errorText = await createRes.text()
                console.error("Create failed:", errorText)
                throw new Error("Failed to create gallery item")
            }

            toast.success("Gallery item created successfully")

            // Reset form
            setTitle("")
            setDescription("")
            setFile(null)

            // Trigger a refresh of the gallery list
            window.location.reload()
        } catch (error) {
            console.error("Error creating gallery item:", error)
            const errorMessage = error instanceof Error ? error.message : "Unknown error"
            toast.error(`Failed to create gallery item: ${errorMessage}`)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Heading level="h2">Add New Item</Heading>

            <div className="flex flex-col gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter title (optional)"
                />
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter description (optional)"
                    rows={3}
                />
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="image">Image *</Label>
                <Input
                    id="image"
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    required
                />
                {file && (
                    <p className="text-sm text-gray-600">
                        Selected: {file.name}
                    </p>
                )}
            </div>

            <Button type="submit" disabled={isLoading}>
                {isLoading ? "Adding..." : "Add to Gallery"}
            </Button>
        </form>
    )
}
