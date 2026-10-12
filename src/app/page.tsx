import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Camera,
  ScanFace,
  Sliders,
  CheckCircle2,
  Lock,
  Layers,
  Sun,
  Eye,
  Activity,
} from "lucide-react";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { HeroAnalysisPreview } from "@/components/landing/HeroAnalysisPreview";
import { APP_CONFIG } from "@/constants";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-primary-text flex flex-col selection:bg-light-sage selection:text-dark-sage">
      {/* ============================================================ */}
      {/* 1. NAVBAR                                                   */}
      {/* ============================================================ */}
      <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-sage-border px-4 sm:px-8 lg:px-12 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-primary-sage/10 text-primary-sage flex items-center justify-center border border-light-sage group-hover:bg-primary-sage group-hover:text-white transition-colors duration-150">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-base tracking-tight text-primary-text leading-tight">
                {APP_CONFIG.shortName}
              </span>
              <span className="text-[10px] text-secondary-text font-normal tracking-wide leading-none">
                AI Skin Analysis
              </span>
            </div>
          </Link>

          {/* Nav Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-secondary-text">
            <a
              href="#how-it-works"
              className="hover:text-primary-text transition-colors"
            >
              How It Works
            </a>
            <a
              href="#features"
              className="hover:text-primary-text transition-colors"
            >
              Features
            </a>
            <a
              href="#about"
              className="hover:text-primary-text transition-colors"
            >
              About
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <Link href="/login">
              <SecondaryButton className="px-3.5 py-1.5 text-xs sm:text-sm">
                Login
              </SecondaryButton>
            </Link>
            <Link href="/analysis">
              <PrimaryButton className="px-4 py-1.5 text-xs sm:text-sm">
                Start Analysis
              </PrimaryButton>
            </Link>
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/* 2. HERO SECTION                                             */}
      {/* ============================================================ */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-12 border-b border-sage-border/60">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-very-light-sage text-dark-sage border border-light-sage/70 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-primary-sage shrink-0" />
              <span>AI-Powered Skin Intelligence</span>
            </div>

            <div className="space-y-3.5">
              <h1 className="text-3xl sm:text-4xl lg:text-[40px] xl:text-[44px] font-bold tracking-tight text-primary-text font-heading lg:leading-[1.22] max-w-xl mx-auto lg:mx-0">
                Understand Your Skin.
                <span className="block text-primary-sage mt-1">
                  Build a Routine That Fits You.
                </span>
              </h1>
              <p className="text-sm sm:text-base text-secondary-text max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Use AI-powered visual skin analysis combined with your preferences
                to understand visible skin characteristics and receive personalized
                skincare recommendations.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link href="/analysis" className="w-full sm:w-auto">
                <PrimaryButton
                  fullWidth
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                  className="px-6 py-3 text-base"
                >
                  Start Your Analysis
                </PrimaryButton>
              </Link>
              <a href="#how-it-works" className="w-full sm:w-auto">
                <SecondaryButton fullWidth className="px-6 py-3 text-base">
                  See How It Works
                </SecondaryButton>
              </a>
            </div>

            {/* Trust Statement */}
            <div className="pt-3 flex items-center justify-center lg:justify-start gap-2 text-xs text-secondary-text font-medium flex-wrap">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary-sage" />
                Personalized insights
              </span>
              <span className="text-sage-border">•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary-sage" />
                Transparent recommendations
              </span>
              <span className="text-sage-border">•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary-sage" />
                Privacy-aware
              </span>
            </div>
          </div>

          {/* Right Column: Original UI Visual */}
          <div className="lg:col-span-5 flex justify-center">
            <HeroAnalysisPreview />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. HOW IT WORKS                                             */}
      {/* ============================================================ */}
      <section
        id="how-it-works"
        className="py-16 sm:py-24 px-4 sm:px-8 lg:px-12 bg-surface/60 border-b border-sage-border/60"
      >
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-primary-sage">
              Step-by-Step Guidance
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-primary-text font-heading">
              How It Works
            </h2>
            <p className="text-sm sm:text-base text-secondary-text">
              A transparent four-step process designed to analyze visible skin
              concerns and curate matched skincare regimens.
            </p>
          </div>

          {/* 4 Connected Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 01 */}
            <div className="bg-surface rounded-[18px] border border-sage-border p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] space-y-4 relative hover:border-light-sage transition-colors">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-very-light-sage text-dark-sage flex items-center justify-center border border-light-sage/60">
                  <Camera className="w-5 h-5" />
                </div>
                <span className="text-xl font-bold font-heading text-secondary-text/40">
                  01
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold text-primary-text font-heading">
                  Upload a Photo
                </h3>
                <p className="text-xs sm:text-sm text-secondary-text mt-1.5 leading-relaxed">
                  Take a clear, front-facing photo or upload an image in even natural lighting without makeup.
                </p>
              </div>
            </div>

            {/* Step 02 */}
            <div className="bg-surface rounded-[18px] border border-sage-border p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] space-y-4 relative hover:border-light-sage transition-colors">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-very-light-sage text-dark-sage flex items-center justify-center border border-light-sage/60">
                  <ScanFace className="w-5 h-5" />
                </div>
                <span className="text-xl font-bold font-heading text-secondary-text/40">
                  02
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold text-primary-text font-heading">
                  AI Skin Analysis
                </h3>
                <p className="text-xs sm:text-sm text-secondary-text mt-1.5 leading-relaxed">
                  Computer vision models detect visible skin characteristics, surface concerns, and tone.
                </p>
              </div>
            </div>

            {/* Step 03 */}
            <div className="bg-surface rounded-[18px] border border-sage-border p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] space-y-4 relative hover:border-light-sage transition-colors">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-very-light-sage text-dark-sage flex items-center justify-center border border-light-sage/60">
                  <Sliders className="w-5 h-5" />
                </div>
                <span className="text-xl font-bold font-heading text-secondary-text/40">
                  03
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold text-primary-text font-heading">
                  Complete Your Profile
                </h3>
                <p className="text-xs sm:text-sm text-secondary-text mt-1.5 leading-relaxed">
                  Input personal sensitivities, known allergies, ingredient exclusions, and preferred budget.
                </p>
              </div>
            </div>

            {/* Step 04 */}
            <div className="bg-surface rounded-[18px] border border-sage-border p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] space-y-4 relative hover:border-light-sage transition-colors">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-very-light-sage text-dark-sage flex items-center justify-center border border-light-sage/60">
                  <Sparkles className="w-5 h-5 text-primary-sage" />
                </div>
                <span className="text-xl font-bold font-heading text-secondary-text/40">
                  04
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold text-primary-text font-heading">
                  Get Recommendations
                </h3>
                <p className="text-xs sm:text-sm text-secondary-text mt-1.5 leading-relaxed">
                  Receive personalized cosmetic product matches and an easy-to-follow daily AM/PM routine.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. WHAT WE ANALYZE                                          */}
      {/* ============================================================ */}
      <section
        id="features"
        className="py-16 sm:py-24 px-4 sm:px-8 lg:px-12 border-b border-sage-border/60"
      >
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-primary-sage">
              Detection Scope
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-primary-text font-heading">
              What We Analyze
            </h2>
            <p className="text-sm sm:text-base text-secondary-text">
              Objective visual assessments structured across three primary
              dimensions for cosmetic guidance without medical classification claims.
            </p>
          </div>

          {/* 3 Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Category 1: Skin Type */}
            <div className="bg-surface rounded-[18px] border border-sage-border p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-very-light-sage text-dark-sage flex items-center justify-center">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-primary-text font-heading">
                    Skin Type
                  </h3>
                  <p className="text-xs text-secondary-text">Sebum & moisture balance</p>
                </div>
              </div>
              <p className="text-xs text-secondary-text leading-relaxed">
                Classifies the visible skin type as Dry, Normal, or Oily.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <StatusBadge variant="sage" size="md">
                  Dry
                </StatusBadge>
                <StatusBadge variant="sage" size="md">
                  Normal
                </StatusBadge>
                <StatusBadge variant="sage" size="md">
                  Oily
                </StatusBadge>
              </div>
            </div>

            {/* Category 2: Skin Tone */}
            <div className="bg-surface rounded-[18px] border border-sage-border p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-warm-beige/60 text-[#7D6852] flex items-center justify-center">
                  <Sun className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-primary-text font-heading">
                    Skin Tone
                  </h3>
                  <p className="text-xs text-secondary-text">Visible tone classification</p>
                </div>
              </div>
              <p className="text-xs text-secondary-text leading-relaxed">
                Classifies visible tone using the four labels supported by the model.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <StatusBadge variant="beige" size="md">
                  Light
                </StatusBadge>
                <StatusBadge variant="beige" size="md">
                  Mid-Light
                </StatusBadge>
                <StatusBadge variant="beige" size="md">
                  Mid-Dark
                </StatusBadge>
                <StatusBadge variant="beige" size="md">
                  Dark
                </StatusBadge>
              </div>
            </div>

            {/* Category 3: Visible Concerns */}
            <div className="bg-surface rounded-[18px] border border-sage-border p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-very-light-sage text-dark-sage flex items-center justify-center">
                  <Eye className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-primary-text font-heading">
                    Visible Concerns
                  </h3>
                  <p className="text-xs text-secondary-text">Visible surface characteristics</p>
                </div>
              </div>
              <p className="text-xs text-secondary-text leading-relaxed">
                Localized detection with individual confidence percentages.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                <StatusBadge variant="neutral" size="sm">
                  Acne
                </StatusBadge>
                <StatusBadge variant="neutral" size="sm">
                  Blackheads
                </StatusBadge>
                <StatusBadge variant="neutral" size="sm">
                  Dark Spots
                </StatusBadge>
                <StatusBadge variant="neutral" size="sm">
                  Pores
                </StatusBadge>
                <StatusBadge variant="neutral" size="sm">
                  Wrinkles
                </StatusBadge>
                <StatusBadge variant="neutral" size="sm">
                  Redness
                </StatusBadge>
                <StatusBadge variant="neutral" size="sm">
                  Pigmentation
                </StatusBadge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. PERSONALIZED RECOMMENDATIONS SECTION                      */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-12 bg-surface/40 border-b border-sage-border/60">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-primary-sage">
              Intelligent Matching
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-primary-text font-heading">
              How Personalized Recommendations Work
            </h2>
            <p className="text-sm sm:text-base text-secondary-text">
              We combine automated visual analysis with your explicit preferences
              to generate tailored product recommendations and daily regimens.
            </p>
          </div>

          {/* Visual Architecture Diagram */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Input Group 1: AI Analysis */}
            <div className="lg:col-span-4 bg-surface rounded-[18px] border border-sage-border p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary-sage" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-primary-text font-heading">
                  1. AI Analysis Output
                </h3>
              </div>
              <p className="text-xs text-secondary-text">
                Extracted automatically from facial scan:
              </p>
              <ul className="space-y-2 text-xs font-medium text-primary-text/90">
                <li className="flex items-center gap-2 p-2 rounded-lg bg-very-light-sage/60 border border-light-sage/40">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary-sage" />
                  Skin Type Classification
                </li>
                <li className="flex items-center gap-2 p-2 rounded-lg bg-very-light-sage/60 border border-light-sage/40">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary-sage" />
                  Skin Tone Identification
                </li>
                <li className="flex items-center gap-2 p-2 rounded-lg bg-very-light-sage/60 border border-light-sage/40">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary-sage" />
                  Visible Skin Concerns & Severity
                </li>
                <li className="flex items-center gap-2 p-2 rounded-lg bg-very-light-sage/60 border border-light-sage/40">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary-sage" />
                  AI Confidence Metric
                </li>
              </ul>
            </div>

            {/* Input Group 2: User Preferences */}
            <div className="lg:col-span-4 bg-surface rounded-[18px] border border-sage-border p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#8E7963]" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-primary-text font-heading">
                  2. Your Preferences
                </h3>
              </div>
              <p className="text-xs text-secondary-text">
                Controlled directly by you:
              </p>
              <ul className="space-y-2 text-xs font-medium text-primary-text/90">
                <li className="flex items-center gap-2 p-2 rounded-lg bg-[#F7F2EB] border border-warm-beige">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#8E7963]" />
                  Sensitivity Level (Low/Med/High)
                </li>
                <li className="flex items-center gap-2 p-2 rounded-lg bg-[#F7F2EB] border border-warm-beige">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#8E7963]" />
                  Known Allergies & Exclusions
                </li>
                <li className="flex items-center gap-2 p-2 rounded-lg bg-[#F7F2EB] border border-warm-beige">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#8E7963]" />
                  Ingredients to Avoid
                </li>
                <li className="flex items-center gap-2 p-2 rounded-lg bg-[#F7F2EB] border border-warm-beige">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#8E7963]" />
                  Target Budget & Formats
                </li>
              </ul>
            </div>

            {/* Output Group: Recommendations */}
            <div className="lg:col-span-4 bg-primary-sage/10 rounded-[18px] border-2 border-primary-sage/30 p-6 space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary-sage" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-dark-sage font-heading">
                  3. Matched Output
                </h3>
              </div>
              <p className="text-xs text-secondary-text">
                Synthesized recommendation engine:
              </p>
              <div className="space-y-2.5">
                <div className="p-3 bg-surface rounded-xl border border-light-sage shadow-xs">
                  <div className="text-xs font-bold text-primary-text">
                    Personalized Products
                  </div>
                  <p className="text-[11px] text-secondary-text mt-0.5">
                    Ranked by ingredient compatibility score.
                  </p>
                </div>
                <div className="p-3 bg-surface rounded-xl border border-light-sage shadow-xs">
                  <div className="text-xs font-bold text-primary-text">
                    Structured AM / PM Routine
                  </div>
                  <p className="text-[11px] text-secondary-text mt-0.5">
                    Layered steps from cleanser to SPF.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. TRANSPARENCY & TRUST SECTION                             */}
      {/* ============================================================ */}
      <section
        id="about"
        className="py-16 sm:py-24 px-4 sm:px-8 lg:px-12 border-b border-sage-border/60"
      >
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-primary-sage">
              Responsible AI
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-primary-text font-heading">
              Transparency & Scientific Rigor
            </h2>
            <p className="text-sm sm:text-base text-secondary-text">
              We believe in open explanation, transparent scores, and ethical
              AI boundaries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface rounded-[18px] border border-sage-border p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] space-y-3">
              <div className="w-9 h-9 rounded-xl bg-very-light-sage text-dark-sage flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-primary-text font-heading">
                AI Confidence Metrics
              </h3>
              <p className="text-xs sm:text-sm text-secondary-text leading-relaxed">
                Every detected concern presents its individual confidence score,
                so you always know the certainty level of each detection.
              </p>
            </div>

            <div className="bg-surface rounded-[18px] border border-sage-border p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] space-y-3">
              <div className="w-9 h-9 rounded-xl bg-very-light-sage text-dark-sage flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-primary-text font-heading">
                Transparent Match Reasons
              </h3>
              <p className="text-xs sm:text-sm text-secondary-text leading-relaxed">
                Each match explains which AI Analysis and questionnaire inputs
                contributed to its Compatibility Score.
              </p>
            </div>

            <div className="bg-surface rounded-[18px] border border-sage-border p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] space-y-3">
              <div className="w-9 h-9 rounded-xl bg-very-light-sage text-dark-sage flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-primary-text font-heading">
                Clear Data Boundaries
              </h3>
              <p className="text-xs sm:text-sm text-secondary-text leading-relaxed">
                AI-generated outputs remain separate from user-provided
                sensitivities, allergies, exclusions, and budget preferences.
              </p>
            </div>
          </div>

          {/* Subtle Disclaimer Banner */}
          <div className="p-4 rounded-xl bg-very-light-sage/60 border border-light-sage/70 max-w-3xl mx-auto text-center">
            <p className="text-xs text-secondary-text leading-relaxed">
              <strong className="text-dark-sage">Notice:</strong> {APP_CONFIG.shortName} provides cosmetic skincare analysis and recommendation support, not medical advice. Consult a qualified clinician for medical concerns.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. FINAL CTA                                                */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 lg:px-12 bg-very-light-sage/40 border-b border-sage-border/60">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-primary-text font-heading">
            Ready to Understand Your Skin Better?
          </h2>
          <p className="text-sm sm:text-base text-secondary-text max-w-xl mx-auto">
            Start with a clear photo and build your personalized skincare profile today.
          </p>
          <div className="pt-2">
            <Link href="/analysis">
              <PrimaryButton
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
                className="px-8 py-3.5 text-base"
              >
                Start Analysis
              </PrimaryButton>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. FOOTER                                                   */}
      {/* ============================================================ */}
      <footer className="py-12 px-4 sm:px-8 lg:px-12 bg-surface text-secondary-text border-t border-sage-border/60">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-primary-sage/10 text-primary-sage flex items-center justify-center border border-light-sage">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="font-heading font-bold text-sm text-primary-text">
              {APP_CONFIG.shortName}
            </span>
          </div>

          <p className="text-[11px] text-secondary-text text-center md:text-right max-w-xs">
            For cosmetic skincare guidance and educational purposes. Not medical advice.
          </p>
        </div>
      </footer>
    </div>
  );
}
