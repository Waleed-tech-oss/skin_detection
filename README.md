# AI-Based Facial Skin Analysis and Personalized Beauty Product Recommendation System

## 1. Project Purpose
This project is an intelligent skincare advisory application designed to provide objective facial skin analysis and personalized cosmetic product recommendations. The system differentiates between AI-detected skin characteristics (skin type, skin tone, detected concerns, confidence score) and user-provided criteria (sensitivities, allergies, exclusions, budget) to offer tailored skincare routines without making clinical or medical claims.

---

## 2. Frontend Tech Stack
- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (configured with centralized theme tokens)
- **Design System:** Soft Clinical Sage (custom variables and tokens)
- **Icons:** Lucide React
- **Typography:** Manrope (Headings), Inter (Body)
- **Package Manager:** npm

---

## 3. How to Install
Clone the repository and install dependencies using npm:

```bash
npm install
```

---

## 4. How to Run Development Server
Start the local Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

To verify TypeScript and build correctness:
```bash
npm run build
```

---

## 5. Main Folder Structure
```
src/
├── app/                      # Next.js App Router routes & pages
│   ├── page.tsx              # Landing page placeholder
│   ├── layout.tsx            # Root layout with fonts & theme setup
│   ├── globals.css           # Soft Clinical Sage tokens & base styles
│   ├── login/                # Authentication - Sign In
│   ├── register/             # Authentication - Sign Up
│   ├── dashboard/            # Overview & user metrics
│   ├── analysis/             # New facial image analysis
│   ├── results/              # Detailed AI analysis results
│   ├── questionnaire/        # User-provided preferences & sensitivities
│   ├── skin-profile/         # Combined skin profile (My Analysis)
│   ├── recommendations/      # Recommended products list
│   │   └── [id]/             # Product detail & compatibility view
│   ├── routine/              # AM / PM skincare routine plan
│   ├── history/              # Past analysis timeline
│   ├── profile/              # User profile & account overview
│   └── settings/             # Application settings & privacy
│
├── components/               # Modular UI components
│   ├── layout/               # AppShell, AppSidebar, Topbar, PageHeader
│   ├── ui/                   # PrimaryButton, SecondaryButton, SectionCard, StatusBadge
│   ├── analysis/             # Domain components (Phase 2)
│   ├── recommendations/      # Domain components (Phase 2)
│   ├── routine/              # Domain components (Phase 2)
│   └── forms/                # Form components (Phase 2)
│
├── constants/                # Navigation routes, branding & app constants
├── data/                     # Domain mock data (AI analysis, preferences, products)
├── lib/                      # Helper utilities (cn, clsx, tailwind-merge)
├── services/                 # Service layer interfaces & mock services
└── types/                    # Domain TypeScript types & schemas

public/
└── images/                   # Static images & assets
```

---

## 6. Current Phase 1 Status
- **Status:** Phase 1 (Frontend Foundation) Completed.
- **Implemented:**
  - Standardized directory architecture and routing for all target screens.
  - Soft Clinical Sage centralized theme system and typography.
  - Reusable layout shell (`AppShell`, `AppSidebar`, `Topbar`, `PageHeader`) with mobile drawer support.
  - Base UI components (`PrimaryButton`, `SecondaryButton`, `SectionCard`, `StatusBadge`).
  - Separation of AI-generated vs. user-provided data models.
  - Clean placeholders for all 14 routes.
- **Note:** Backend APIs, AI model pipelines, databases, and comprehensive UI screens will be implemented in Phase 2.
