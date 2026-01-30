import { useEffect, useState } from "react"
import { Table, Button, toast, Heading } from "@medusajs/ui"
import { Trash } from "@medusajs/icons"

type GalleryItem = {
    id: string
    title: string
    description: string | null
    image_url: string
    created_at: string
}

export const GalleryList = () => {
    const [items, setItems] = useState<GalleryItem[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchItems = async () => {
        try {
            const res = await fetch("/admin/gallery", {
                credentials: "include",
            })

            if (!res.ok) {
                throw new Error("Failed to fetch gallery items")
            }

            const data = await res.json()
            setItems(data.gallery_items || [])
        } catch (error) {
            console.error("Error fetching gallery items:", error)
            toast.error("Failed to load gallery items")
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this item?")) {
            return
        }

        try {
            const res = await fetch(`/admin/gallery/${id}`, {
                method: "DELETE",
                credentials: "include",
            })

            if (!res.ok) {
                throw new Error("Failed to delete item")
            }

            toast.success("Item deleted successfully")

            // Refresh the list
            await fetchItems()
        } catch (error) {
            console.error("Error deleting item:", error)
            toast.error("Failed to delete item")
        }
    }

    useEffect(() => {
        fetchItems()
    }, [])

    if (isLoading) {
        return <p>Loading gallery items...</p>
    }

    if (items.length === 0) {
        return (
            <div>
                <Heading level="h2" className="mb-4">Gallery Items</Heading>
                <p className="text-gray-500">No items in the gallery yet.</p>
            </div>
        )
    }

    return (
        <div>
            <Heading level="h2" className="mb-4">Gallery Items</Heading>

            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Image</Table.HeaderCell>
                        <Table.HeaderCell>Title</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell>Created</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {items.map((item) => (
                        <Table.Row key={item.id}>
                            <Table.Cell>
                                <img
                                    src={item.image_url}
                                    alt={item.title}
                                    className="h-12 w-12 object-cover rounded"
                                />
                            </Table.Cell>
                            <Table.Cell>{item.title}</Table.Cell>
                            <Table.Cell>
                                {item.description || <span className="text-gray-400">-</span>}
                            </Table.Cell>
                            <Table.Cell>
                                {new Date(item.created_at).toLocaleDateString()}
                            </Table.Cell>
                            <Table.Cell>
                                <Button
                                    variant="danger"
                                    size="small"
                                    onClick={() => handleDelete(item.id)}
                                >
                                    <Trash />
                                </Button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    )
}
