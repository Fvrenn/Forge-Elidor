# Data Model

This document outlines the key data entities for the Forge Elidor e-commerce site. The model primarily relies on native Medusa.js entities, with the addition of one custom entity to fulfill a specific feature requirement.

## Medusa.js Native Entities

The implementation will use the following standard Medusa.js entities, configured via the Medusa Admin dashboard and interacted with via the Storefront API.

### 1. Product
Represents a unique knife available for sale. Given the "unique item" constraint, each product will have an inventory quantity of 1.
- **`title`**: (string) The name of the knife.
- **`description`**: (text) The story behind the piece.
- **`handle`**: (string) URL-friendly identifier.
- **`images`**: (Image[]) The photo carousel images, hosted on Cloudflare R2.
- **`variants`**: (ProductVariant[]) A single variant will exist for each knife.
  - **`title`**: (string) e.g., "Pièce Unique"
  - **`prices`**: (MoneyAmount[]) The price of the knife.
  - **`inventory_quantity`**: (number) Always `1`.
- **`metadata`**: (jsonb) A field to store the technical sheet details (e.g., `{ "acier": "Damas", "manche": "Ébène", "dimensions": "20cm" }`).
- **`categories`**: (ProductCategory[]) The association with knife types.

### 2. ProductCategory
A native Medusa entity used to dynamically manage knife "types". This allows administrators to create, edit, and delete categories without code changes.
- **`name`**: (string) The name of the category (e.g., "Pliant", "Outdoor", "Cuisine", "Exception").
- **`handle`**: (string) URL-friendly identifier.
- **`parent_category`**: (ProductCategory) Can be used for nesting, though not required for the initial design.

### 3. Order
A native Medusa entity representing a customer's completed purchase. Its management is handled entirely by Medusa's core logic and the admin dashboard.

## Custom Entities

A new entity will be added to the Medusa backend to support the "Notify Me" feature.

### 1. InterestNotification
Represents a user's request to be notified about a sold-out product.
- **`id`**: (string) Unique identifier.
- **`email`**: (string) The email address of the interested user.
- **`product_id`**: (string) A foreign key linking to the `Product` entity.
- **`created_at`**: (datetime) Timestamp of when the notification request was created.

This entity will be created through a custom Medusa endpoint and can be viewed by an administrator, though it will not have a dedicated UI in the admin dashboard in the initial MVP.
