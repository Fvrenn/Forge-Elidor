# Tasks: Elidor E-Commerce Site

**Input**: Design documents from `/specs/001-elidor-ecommerce-site/`
**Prerequisites**: plan.md, spec.md, data-model.md, contracts/

**Tests**: Per the constitution's MVP strategy, automated tests are DEFERRED.

**Organization**: Tasks are grouped by implementation phase, which corresponds to the user stories from the specification, enabling independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Backend**: `backend/` (Medusa.js)
- **Frontend**: `frontend/` (Next.js)

---

## Phase 1: Project Scaffolding & Setup

**Purpose**: Initialize the backend and frontend projects and configure the containerized development environment.

- [x] T001 Create root-level directories: `backend/` and `frontend/`
- [ ] T002 [P] Initialize Medusa project in `backend/` using `npx create-medusa-app@latest`
- [ ] T003 [P] Initialize Next.js project in `frontend/` using `npx create-next-app@latest --app`
- [ ] T004 [P] Create `backend/Dockerfile` for the Medusa service, ensuring it's compatible with Coolify deployment.
- [ ] T005 [P] Create `frontend/Dockerfile` for the Next.js service, ensuring it's compatible with Coolify deployment.
- [ ] T006 Create `docker-compose.yml` at the root to orchestrate the `backend`, `frontend`, and `postgres` services.
- [ ] T007 Configure environment variables for all services in `.env` files as described in `quickstart.md`.

---

## Phase 2: Core Backend Configuration

**Purpose**: Extend the base Medusa backend with required plugins and custom functionality. This phase is foundational for all user stories.

- [ ] T008 [P] Install `@medusajs/payment-stripe` plugin in `backend/`
- [ ] T009 [P] Install a generic S3 file service plugin (e.g., `medusa-file-s3`) in `backend/`
- [ ] T010 Configure the Stripe plugin with API keys in `backend/medusa-config.js`
- [ ] T011 Configure the S3 file service for Cloudflare R2 in `backend/medusa-config.js`
- [ ] T012 Create the custom `InterestNotification` entity in `backend/src/models/interest-notification.ts`
- [ ] T013 Create a migration for the `InterestNotification` entity using `medusa migrations create` in `backend/`
- [ ] T014 Implement a custom API endpoint `POST /store/interest-notifications` in `backend/src/api/store/interest-notifications/route.ts`
- [ ] T015 Run database migrations to apply all changes using `docker-compose exec backend medusa migrations run`

---

## Phase 3: User Story 1 - Visitor Browses Knives (Priority: P1) 🎯 MVP

**Goal**: A visitor can discover products by navigating the homepage, boutique, and product detail pages.
**Independent Test**: A user can navigate from the homepage to a product page, apply filters on the boutique page, and view all product details without needing to log in or add items to a cart.

- [ ] T016 [US1] Install `@medusajs/js-sdk`, `tailwindcss`, and `shadcn/ui` dependencies in `frontend/`
- [ ] T017 [US1] Configure Tailwind CSS and `shadcn/ui` in `frontend/tailwind.config.js` and `frontend/postcss.config.js`
- [ ] T018 [P] [US1] Create the main site layout, including header and footer, in `frontend/src/app/layout.tsx` and `frontend/src/components/layout/`
- [ ] T019 [P] [US1] Implement the immersive Hero Section using SCSS Modules in `frontend/src/app/page.tsx` and `frontend/src/styles/hero.module.scss`
- [ ] T020 [US1] Implement the "Latest Creations" grid on the homepage, fetching data using the Medusa SDK in `frontend/src/app/page.tsx`
- [ ] T021 [P] [US1] Create the Boutique page at `frontend/src/app/boutique/page.tsx` to display all products in a grid.
- [ ] T022 [US1] Implement filtering logic on the Boutique page for "Status" and "ProductCategory" in `frontend/src/app/boutique/page.tsx`
- [ ] T023 [P] [US1] Create the dynamic Product Detail page at `frontend/src/app/produits/[handle]/page.tsx`
- [ ] T024 [US1] Implement the optimized photo carousel on the Product Detail page.
- [ ] T025 [US1] Implement the technical data sheet and product story sections (using SCSS Modules for the story) on the Product Detail page.

---

## Phase 4: User Story 2 - Customer Purchases a Knife (Priority: P2)

**Goal**: A customer can add an available knife to their cart and complete a purchase.
**Independent Test**: A user can click "Add to Cart" on an available product, navigate through the checkout process, and simulate a successful payment.

- [ ] T026 [P] [US2] Implement the Medusa provider to wrap the application in `frontend/src/app/layout.tsx` for cart management.
- [ ] T027 [US2] Implement the "Add to Cart" button functionality on the Product Detail page, making it sticky on mobile.
- [ ] T028 [P] [US2] Create the Cart page at `frontend/src/app/panier/page.tsx` to display cart contents.
- [ ] T029 [P] [US2] Create the Checkout page at `frontend/src/app/checkout/page.tsx`.
- [ ] T030 [US2] Style the Medusa-driven checkout flow using `shadcn/ui` and Tailwind to match the site's aesthetic.
- [ ] T031 [US2] Verify the Stripe payment flow is correctly integrated and can process test payments.

---

## Phase 5: User Story 3 - Visitor Expresses Interest in a Sold-Out Knife (Priority: P3)

**Goal**: A visitor can request to be notified about a sold-out item.
**Independent Test**: A user can navigate to a sold-out product, submit their email via the "Me prévenir" form, and the data is successfully received by the backend.

- [ ] T032 [P] [US3] Implement the conditional UI on the Product Detail page to show "Vendu" and "Me prévenir" for sold-out items.
- [ ] T033 [US3] Create the "Me prévenir" form as a client component in `frontend/src/components/notify-form.tsx`
- [ ] T034 [US3] Connect the form to the `POST /store/interest-notifications` backend endpoint, handling loading and success/error states.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final improvements and validation before considering the feature complete.

- [ ] T035 [P] Review and finalize all environment variable documentation in `README.md`.
- [ ] T036 [P] Ensure all UI text is in French as per the constitution.
- [ ] T037 Validate the entire user flow by following the steps in `quickstart.md`.
- [ ] T038 Review mobile responsiveness across all pages, particularly the sticky "Add to Cart" button.

---

## Dependencies & Execution Order

- **Setup (Phase 1)** -> **Foundational (Phase 2)** -> **User Stories (Phases 3-5)** -> **Polish (Phase 6)**
- All User Story phases (3, 4, 5) depend on Phase 2 completion and can technically be worked on in parallel if staffed.
- The recommended MVP path is to complete Phase 3 first.

## Implementation Strategy

- **MVP First**: Complete Phases 1, 2, and 3 to deliver the core browsing experience.
- **Incremental Delivery**: Add Phase 4 (Checkout) and Phase 5 (Notify Me) sequentially after the MVP is validated.
