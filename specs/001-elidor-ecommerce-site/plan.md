# Implementation Plan: Elidor E-Commerce Site

**Feature Branch**: `001-elidor-ecommerce-site`  
**Feature Spec**: [spec.md](./spec.md)  
**Created**: 2025-12-22  
**Status**: Draft  

## 1. Technical Context

This plan outlines the implementation of a minimalist e-commerce site for "Forge Elidor". The solution will be a decoupled architecture composed of a Medusa.js backend and a Next.js frontend.

| Component      | Technology / Stack                                                                                                                              | Justification                                                                                                |
|----------------|-------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------|
| **Backend**    | Medusa.js v2                                                                                                                                    | A modern, headless e-commerce platform that is highly extensible and fits the decoupled architecture requirement. |
| **Frontend**   | Next.js (App Router)                                                                                                                            | A powerful React framework that enables server-side rendering and static site generation for optimal performance. |
| **Styling**    | Hybrid: Tailwind CSS + shadcn/ui for layouts; SCSS Modules for artistic sections.                                                              | Balances rapid development for standard UI with fine-grained creative control for unique, branded components.      |
| **Database**   | PostgreSQL                                                                                                                                      | Default and recommended database for Medusa.js, providing robust and reliable data persistence.             |
| **Deployment** | Docker (for both services), managed via Coolify                                                                                                 | Ensures a consistent and reproducible environment from local development to production on Hostinger.            |
| **Payments**   | `@medusajs/payment-stripe`                                                                                                                      | Official Stripe integration for Medusa, providing a secure and reliable payment processing solution.            |
| **File Storage** | Generic S3 Plugin configured for Cloudflare R2                                                                                                | Provides scalable, cost-effective object storage for product images, offloading assets from the web server.    |
| **Data Fetching**| `@medusajs/js-sdk`                                                                                                                              | Official JavaScript SDK for interacting with the Medusa API, simplifying frontend data management.             |

## 2. Constitution Check

The proposed technical plan has been reviewed against the `constitution.md` document.

| Principle                     | Status    | Justification                                                                                                                                                             |
|-------------------------------|-----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **I. Technical Architecture** | `[PASS]`  | The plan adheres strictly to the mandated stack: Next.js (App Router), Medusa.js v2, and Docker for deployment via Coolify.                                                   |
| **II. Styling & UI**          | `[PASS]`  | The plan specifies the required hybrid styling strategy, using `shadcn/ui` and Tailwind for standard UI and SCSS for artistic sections.                                       |
| **III. Code & Language**      | `[PASS]`  | This plan will be executed with all code and commits in English, while UI-facing text will be managed to support the French language requirement.                                |
| **IV. E-commerce & Data**     | `[PASS]`  | The plan uses Medusa's inventory management to enforce the "unique item" model. Image hosting is offloaded to an S3-compatible service (Cloudflare R2).                         |
| **V. Development Strategy**   | `[PASS]`  | The phased implementation approach aligns with the MVP strategy, prioritizing the delivery of core user stories sequentially. Automated testing is correctly deferred.          |

**Result**: The plan is in full compliance with all constitutional principles.

## 3. Phase 0: Outline & Research

The technical direction provided in the prompt was comprehensive and specific, leaving no major unknowns. No formal research was required. The selected technologies are well-established, and best practices will be followed during implementation.

**Output**: [research.md](./research.md)

## 4. Phase 1: Design & Contracts

This phase defines the core data structures and API contracts needed for the feature.

### Data Model
The data model will leverage standard Medusa.js entities and introduce one custom entity to support the "Notify Me" feature. The key entities are:
- **Product**: A core Medusa entity to represent each unique knife.
- **ProductCategory**: A native Medusa entity to dynamically manage knife types (`Pliant`, `Outdoor`, etc.).
- **Order**: A core Medusa entity for handling customer purchases.
- **InterestNotification**: A new custom entity to store user emails for sold-out products.

**Output**: [data-model.md](./data-model.md)

### API Contracts
The frontend will interact with the standard Medusa Storefront API. A custom endpoint will be created to handle the "Interest Notification" feature.

- `POST /store/interest-notifications`: Creates a new interest notification entry.

**Output**: [contracts/interest-notification.openapi.yml](./contracts/interest-notification.openapi.yml)

### Quick Start Guide
A `quickstart.md` document will be created to provide developers with simple, clear instructions for setting up and running the project locally.

**Output**: [quickstart.md](./quickstart.md)

## 5. Phase 2: Implementation Phasing

The project will be developed in five distinct phases, corresponding to the user stories defined in the specification.

- **Phase 1: Project Scaffolding & Setup**:
  - Initialize Medusa v2 backend project.
  - Initialize Next.js App Router frontend project.
  - Create `Dockerfile` and `docker-compose.yml` for local development.

- **Phase 2: Core Backend Configuration**:
  - Integrate and configure the `@medusajs/payment-stripe` plugin.
  - Integrate and configure the S3 file storage plugin for Cloudflare R2.
  - Implement the `InterestNotification` custom entity and associated subscriber/API route.
  - Use Medusa Admin to set up initial `ProductCategory` values.

- **Phase 3: Storefront Presentation (User Story 1)**:
  - Implement the Homepage: Hero section (SCSS), latest products grid (`shadcn/ui`).
  - Implement the Boutique page: Product grid, filtering by status and `ProductCategory`.
  - Implement the Product Detail page: Image carousel, technical data, story section (SCSS).

- **Phase 4: Checkout Flow (User Story 2)**:
  - Implement "Add to Cart" functionality.
  - Style the Medusa-driven checkout flow to match the site's aesthetic.
  - Ensure the Stripe integration is functional for test payments.

- **Phase 5: Sold-Out Product Flow (User Story 3)**:
  - Implement the "Vendu" / "Me prévenir" UI on the Product Detail page for sold-out items.
  - Connect the "Me prévenir" form to the custom `POST /store/interest-notifications` endpoint.

## 6. Agent Context Update

The agent context will be updated with the key technologies from this plan to ensure future interactions are context-aware.