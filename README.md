# DermaAI Frontend

Next.js frontend for the **AI-Based Facial Skin Analysis and Personalized Beauty Product Recommendation System**. The application presents cosmetic AI Analysis results and combines them with user-provided questionnaire criteria without making medical claims.

## Stack

- Next.js 16 App Router and React 19
- TypeScript with strict checking
- Tailwind CSS 4
- shadcn/ui-style local components
- Lucide React icons
- Soft Clinical Sage design tokens

## Local development

```bash
npm install
npm run dev
```

Quality checks:

```bash
npm run type-check
npm run lint
npm run build
```

`next/font` downloads Manrope and Inter during a production build, so the build environment needs access to Google Fonts. No new fonts or theme tokens were introduced during integration preparation.

## Architecture

```text
src/
|-- app/             App Router pages and the root layout
|-- components/
|   |-- analysis/    Upload, guidance, progress, and confidence UI
|   |-- dashboard/   Dashboard summaries
|   |-- layout/      AppShell, sidebar, topbar, and page header
|   `-- ui/          Reusable buttons, cards, and badges
|-- constants/       Branding and navigation constants
|-- data/            Centralized, explicitly placeholder UI fixtures
|-- lib/             Shared utilities
|-- services/        Typed backend integration boundaries
`-- types/           Domain contracts shared by UI and services
```

All authenticated screens use `AppShell`. The shell owns the persistent desktop sidebar, mobile drawer, sticky topbar, and consistent content spacing. The root layout owns metadata, fonts, and the approved Soft Clinical Sage theme.

## Domain model

AI-generated and user-provided data are deliberately separated.

AI Analysis outputs:

- Skin Type: `Dry | Normal | Oily`
- Skin Tone: `Light | Mid-Light | Mid-Dark | Dark`
- Primary Visible Concern: one of `Acne | Blackheads | Dark Spots | Pores | Wrinkles`
- Separate multi-label signals: `Redness | Pigmentation`
- AI Confidence values accompany model outputs

User-provided questionnaire data includes sensitivity, allergies, exclusions, budget, routine, and product preferences.

The reusable domain contracts in `src/types/index.ts` include:

- `UserProfile`
- `SkinAnalysis`
- `SkinTypeResult`
- `SkinToneResult`
- `ConcernResult`
- `QuestionnaireProfile`
- `Product`
- `ProductRecommendation`
- `Routine`
- `RoutineStep`
- `AnalysisHistoryItem`

## Service boundaries

`src/services/index.ts` defines typed interfaces for:

- authentication and user profile operations
- image analysis
- questionnaire persistence
- product catalog queries
- recommendations and routines
- analysis history

These interfaces are placeholders for future Supabase and FastAPI adapters. This phase does not install clients, configure credentials, call APIs, persist data, upload files, or invoke models.

## Current implementation status

Implemented:

- All existing routes and approved responsive UI
- Shared authenticated layout and navigation
- Centralized domain fixtures for screen rendering
- Model-aligned output labels and normalized terminology
- Typed service contracts for backend integration
- Questionnaire, analysis, recommendation, routine, history, profile, and authentication screens

Not implemented yet:

- Supabase Auth, PostgreSQL, or Storage adapters
- FastAPI transport or PyTorch ConvNeXt inference
- Real product catalog data or verified product attributes
- Persistent form, account, privacy, or notification settings
- Authorization guards, loading/error boundaries, and live pagination

Product records currently displayed by the UI are clearly labeled sample catalog data. Their names, prices, Compatibility Scores, and rationale exist only to exercise layouts and future response mapping; brands, ingredients, and product attributes are not represented as verified facts.
