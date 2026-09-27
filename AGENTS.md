# AI-Based Facial Skin Analysis & Personalized Recommendation System

## Engineering & Development Guidelines for AI Agents

- **Tech Stack:** Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui patterns, Lucide React icons.
- **Component Reuse:** Always inspect and reuse existing components from `src/components/ui/` and `src/components/layout/` before creating new ones. Prefer editing existing reusable components over duplicating them.
- **Design System & Theme:** The active theme is **Soft Clinical Sage**. Do NOT alter theme variables, color tokens, or font definitions in `src/app/globals.css` without explicit user instruction.
- **Dependencies:** Do NOT add external packages or competing UI libraries (e.g., MUI, Chakra, Bootstrap) unless explicitly requested.
- **Scope Discipline:** 
  - Do NOT modify unrelated files. Inspect only files relevant to the requested task.
  - Do NOT implement backend or API logic (e.g., FastAPI, Supabase, direct DB connections) unless explicitly instructed.
- **Domain & Medical Terminology Rules:**
  - Strict distinction must be maintained between **AI-generated data** (Skin Type, Skin Tone, Detected Concerns, AI Confidence) and **user-provided data** (Sensitivities, Allergies, Exclusions, Budget).
  - Do NOT invent medical claims or use clinical diagnostic terminology such as *Diagnosis*, *Cure*, or *Guaranteed treatment*.
  - Preferred terminology: *AI Analysis*, *Detected Concern*, *AI Confidence*, *Compatibility Score*, *Skincare Recommendation*.
  - Do NOT invent or display ungrounded "skin-health scores".
- **Modularity:** Keep all components modular, typed with strict TypeScript, and organized within the defined `src/` directory structure.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
