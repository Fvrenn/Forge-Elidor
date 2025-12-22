<!--
Sync Impact Report:
- Version change: none -> 1.0.0
- Added principles:
  - I. Technical Architecture
  - II. Styling & UI Implementation
  - III. Code & Language Conventions
  - IV. E-commerce & Data Integrity
  - V. Development Strategy & Quality
- Removed sections: SECTION_2_NAME, SECTION_3_NAME from template.
- Templates requiring review:
  - [?] .specify/templates/plan-template.md
  - [?] .specify/templates/spec-template.md
  - [?] .specify/templates/tasks-template.md
  - [?] .gemini/commands/*.toml
-->
# Forge Elidor Constitution

## Core Principles

### I. Technical Architecture
The project MUST use Next.js with the App Router for the frontend and Medusa.js (v2) for the e-commerce backend. The entire application stack MUST be containerized with Docker to ensure consistent deployment via Coolify on Hostinger infrastructure.

### II. Styling & UI Implementation
A hybrid styling approach is MANDATORY. Core UI development WILL use Tailwind CSS and shadcn/ui for rapid construction of standard components. Project-specific artistic designs, including fluid typography and `clamp()` functions from the legacy project, MUST be implemented using SCSS.

### III. Code & Language Conventions
All code, including variable names, functions, comments, and commit messages, MUST be written in English. The user-facing interface (UI) text and content MUST be exclusively in French.

### IV. E-commerce & Data Integrity
The system MUST enforce a "unique item" model where every product has a stock of exactly one. A strict locking mechanism is REQUIRED during checkout to prevent concurrent sales of the same item. All product images and visual assets MUST be hosted on an external storage service to optimize site performance.

### V. Development Strategy & Quality
The project follows a Minimum Viable Product (MVP) strategy, prioritizing development velocity and high-fidelity visual presentation. Automated testing is INTENTIONALLY deferred at this stage to accelerate initial delivery.

## Governance
All development activities must align with the principles outlined in this constitution. Any deviation requires a formal amendment to this document. The development strategy prioritizes MVP delivery; this supersedes requirements for comprehensive testing or auxiliary features not defined herein.

**Version**: 1.0.0 | **Ratified**: 2025-12-21 | **Last Amended**: 2025-12-21