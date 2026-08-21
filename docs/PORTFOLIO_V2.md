# Portfolio v2 - Engineering Progress & Architecture

## Overview
This document tracks the ongoing transformation of Sagar Nepali's personal portfolio (https://sagar-nepali.com.np) from a template-based site into a premium, engineering console portfolio with Payload CMS backend, PostgreSQL database, server-side GitHub REST API integration, command palette navigation, and technical project case studies.

---

## Architecture Overview

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3 + CSS Variables custom design system (Geist / Geist Mono typography)
- **CMS / Backend**: Payload CMS 3.x (`/admin`) with PostgreSQL Database (`@payloadcms/db-postgres`)
- **GitHub Integration**: Server-side GitHub REST API client with ISR/caching (`lib/github`)
- **Command Palette**: `cmdk` modal trigger with `Ctrl+K` keybindings
- **Icons**: Lucide React / Tabler Icons

---

## Environment Variables Specs (`.env.example`)

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://sagar-nepali.com.np
NEXT_PUBLIC_GITHUB_USERNAME=alexsagar

# GitHub Server-Side Integration
GITHUB_TOKEN=your_github_personal_access_token_here
GITHUB_USERNAME=alexsagar

# Payload CMS & Database Configuration
DATABASE_URI=postgresql://user:password@localhost:5432/portfolio_v2
PAYLOAD_SECRET=your_super_secret_payload_key_here
```

---

## Routes Matrix

| Route | Description | Rendering Mode |
|---|---|---|
| `/` | Homepage with developer status hero, featured projects, live GitHub activity, tech stack, experience timeline | Server + Dynamic GitHub/CMS Data |
| `/projects` | Technical project explorer with category filtering and GitHub metadata | Server / Client Hybrid |
| `/projects/[slug]` | Deep-dive technical case study with architecture, challenges, and live/GitHub links | Server (Dynamic Metadata) |
| `/lab` | Interactive experiments & developer builds hub | Server / CMS-controlled |
| `/about` | Biography, background, approach, and resume links | Server |
| `/contact` | Rate-limited submission form persisted to Payload CMS contact messages | Client Form / Server Action |
| `/admin/*` | Payload CMS Admin Dashboard | Payload Engine |

---

## Implementation Progress

### Phase 1: Foundation & Design System Setup — COMPLETED
- [x] Switched repository to `portfolio-v2` branch.
- [x] Created `docs/PORTFOLIO_V2.md` master documentation.
- [x] Installed dependencies (`cmdk`, `geist`, `octokit`, Payload CMS prerequisites).
- [x] Set up visual design system (Geist typography, `#070809` background, `#67E8F9` cyan accents).
- [x] Built sticky header with `Ctrl+K` Command Palette navigation.
- [x] Built Developer Status Hero section.

### Phase 2: Server-Side GitHub Integration — COMPLETED
- [x] Created `lib/github` abstraction (`types.ts`, `normalize.ts`, `repositories.ts`).
- [x] Implemented revalidated fetching with fallback resilience for rate limits.
- [x] Built live GitHub activity UI components (`LiveGitHubSection.tsx`).

### Phase 3: Backend & Payload CMS Integration — IN PROGRESS
- [x] Initialized Payload CMS config (`payload.config.ts`).
- [ ] Configure Payload CMS collections (Projects, Experience, Skills, Messages).

---

## Current Status & Next Steps
- Fixed syntax/encoding issues across all TSX components.
- Verified TypeScript compilation (`tsc --noEmit`).
- Next step: Complete Phase 3 Payload CMS collections and Phase 4 Project case studies.
