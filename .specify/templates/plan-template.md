# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

[Extract from feature spec: primary requirement + technical approach from research]

## Technical Context

<!--
  ACTION REQUIRED: The content below is pre-filled based on the project constitution.
  Verify and complete any remaining "NEEDS CLARIFICATION" sections during planning.
-->

**Language/Version**: Next.js (App Router), Medusa.js (v2)
**Primary Dependencies**: React, Medusa.js, Tailwind CSS, shadcn/ui, SCSS
**Storage**: [if applicable, e.g., PostgreSQL, CoreData, files or NEEDS CLARIFICATION]
**Testing**: No automated tests (per MVP strategy in constitution)
**Target Platform**: Docker on Coolify (Hostinger)
**Project Type**: Web Application (Next.js Frontend + Medusa.js Backend)
**Performance Goals**: [domain-specific, e.g., 1000 req/s, 10k lines/sec, 60 fps or NEEDS CLARIFICATION]
**Constraints**: [domain-specific, e.g., <200ms p95, <100MB memory, offline-capable or NEEDS CLARIFICATION]
**Scale/Scope**: [domain-specific, e.g., 10k users, 1M LOC, 50 screens or NEEDS CLARIFICATION]

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

[Gates determined based on constitution file]

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: The structure below is the default based on the constitution.
  Expand it with real paths for the current feature.
-->

```text
# Project Structure: Web Application (per Constitution)
backend/  # Medusa.js v2
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── tests/  # (Currently unused per MVP strategy)

frontend/ # Next.js App Router
├── src/
│   ├── app/
│   ├── components/
│   ├── styles/ # For global SCSS
│   └── lib/
└── tests/  # (Currently unused per MVP strategy)
```

**Structure Decision**: The project follows the `frontend`/`backend` structure mandated by the constitution. New feature work should extend the directories shown above.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
