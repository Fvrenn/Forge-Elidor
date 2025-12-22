# Feature Specification: Elidor E-Commerce Site

**Feature Branch**: `001-elidor-ecommerce-site`  
**Created**: 2025-12-22  
**Status**: Draft  
**Input**: User description: "Je veux construire un site e-commerce minimaliste pour "Forge Elidor". Sur la Page d'Accueil, il faut une "Hero Section" immersive avec une photo macro haute qualité d'une lame damas, suivie d'une grille affichant les 3 dernières créations (image, nom, prix, statut) et un footer simple. La Page Boutique présentera tous les couteaux sous forme de cartes épurées avec des filtres (Disponible/Vendu/Type) et une indication claire de pièce unique. La Page Produit détaillera chaque couteau avec un carousel photo optimisé, une fiche technique (acier, manche, dimensions) et l'histoire de la pièce. Le bouton d'action sera "Ajouter au panier" (sticky sur mobile) ou "Vendu" avec une option "Me prévenir" si hors stock. Le Tunnel d'Achat utilisera le checkout standard de Medusa stylisé avec Stripe. Enfin, le Back-office utilisera simplement le dashboard natif de Medusa sans développement spécifique."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Visitor Browses Knives (Priority: P1)

A visitor lands on the homepage and is greeted by an immersive hero section. They can scroll down to see the latest three creations, then navigate to the "Boutique" page to view all products. On the boutique page, they can filter the knives to find one that interests them and clicks to view its detailed product page.

**Why this priority**: This journey is the primary path for user engagement and product discovery. Without it, no sales can occur.

**Independent Test**: Can be tested by navigating the site without adding any items to the cart. The test passes if the user can view all products and their details.

**Acceptance Scenarios**:

1. **Given** a visitor is on the Homepage, **When** they scroll down, **Then** they see a grid with the 3 most recent knife creations.
2. **Given** a visitor is on any page, **When** they click the "Boutique" navigation link, **Then** they are taken to a page displaying all knives.
3. **Given** a visitor is on the Boutique page, **When** they apply a filter (e.g., "Disponible"), **Then** the product grid updates to show only knives matching that filter.
4. **Given** a visitor is on the Boutique page, **When** they click on a product card, **Then** they are taken to the detailed Product Page for that item.

---

### User Story 2 - Customer Purchases a Knife (Priority: P2)

A customer has found a unique knife they wish to purchase. From the product page, they add the item to their cart and proceed through the checkout process to complete the payment.

**Why this priority**: This is the core conversion flow of the e-commerce site, directly generating revenue.

**Independent Test**: Can be tested by adding an available product to the cart and navigating to the checkout page.

**Acceptance Scenarios**:

1. **Given** a customer is viewing an available knife on the Product Page, **When** they click "Ajouter au panier", **Then** the item is added to their shopping cart.
2. **Given** an item is in the cart, **When** the customer proceeds to checkout, **Then** they are presented with the Medusa/Stripe checkout interface.
3. **Given** the customer successfully completes the payment form, **When** they submit their order, **Then** they see an order confirmation page.

---

### User Story 3 - Visitor Expresses Interest in a Sold-Out Knife (Priority: P3)

A visitor is interested in a knife that is already marked as "Vendu". They use the "Me prévenir" (Notify me) feature to leave their email address for future notifications.

**Why this priority**: This captures potential future sales and gauges interest in specific styles of work, providing valuable business intelligence.

**Independent Test**: Can be tested by navigating to a sold-out product and submitting an email address through the notification form.

**Acceptance Scenarios**:

1. **Given** a visitor is viewing a sold-out knife, **When** they click the "Me prévenir" button, **Then** a form appears asking for their email address.
2. **Given** the visitor enters a valid email and submits the form, **When** the submission is complete, **Then** they see a confirmation message and the email is stored for the administrator.

---

### Edge Cases

- How does the site appear on mobile devices, especially the sticky "Ajouter au panier" button and photo carousel?
- What message is displayed if a user tries to add an item to the cart that just became sold out?
- How are filtering results displayed when no products match the selected criteria?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The Homepage MUST display a hero section with a high-quality image.
- **FR-002**: The Homepage MUST display a grid of the 3 most recently added knife creations, showing each item's image, name, price, and status.
- **FR-003**: The Boutique page MUST display all knife products as a grid of cards.
- **FR-004**: The Boutique page MUST allow users to filter products by status (Disponible, Vendu) and by type.
- **FR-005**: The system MUST indicate clearly that each knife is a unique piece.
- **FR-006**: The Product page MUST feature an optimized photo carousel for the knife's images.
- **FR-007**: The Product page MUST display a technical sheet with details like steel, handle material, and dimensions.
- **FR-008**: The Product page MUST display the story behind the piece.
- **FR-009**: For available items, the Product page MUST have an "Ajouter au panier" button, which is sticky on mobile views.
- **FR-010**: For sold-out items, the Product page MUST display a "Vendu" status and provide a "Me prévenir" option to capture user interest (e.g., via an email form).
- **FR-011**: The checkout process MUST use the standard Medusa checkout flow, integrated with Stripe for payments.
- **FR-012**: The boutique filter for knife "Type" MUST allow users to narrow down products based on a list of categories (e.g., Pliant, Outdoor, Exception, Cuisine).
- **FR-013**: The list of knife "Type" categories MUST be dynamically manageable by an administrator via the Medusa Admin Dashboard (e.g., using Medusa's "Product Categories" or "Collections" feature).
- **FR-014**: The back-office MUST be the native Medusa admin dashboard for managing products, orders, and knife categories.

### Key Entities

- **Knife (Product)**: Represents a unique, sellable creation. Attributes include Name, Photos, Description (Story), Technical Details (Steel, Handle, Dimensions), Price, and Status (Available, Sold).
- **Order**: Represents a customer's purchase transaction. Contains information on the customer, the product purchased, and payment status, as managed by Medusa.
- **Interest Notification**: Represents a visitor's expressed interest in a sold-out item. Contains the Product ID and the visitor's email address.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A first-time visitor can navigate from the homepage to a product page in under 15 seconds.
- **SC-002**: The checkout process, from clicking "Ajouter au panier" to order confirmation, can be completed in under 90 seconds.
- **SC-003**: All pages (Homepage, Boutique, Product) MUST achieve a Google PageSpeed score of 85 or higher on mobile to ensure a good user experience.
- **SC-004**: The "Me prévenir" feature MUST have a 99.9% success rate for capturing email submissions.