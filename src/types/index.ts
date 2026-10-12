/**
 * Backend-facing domain contracts.
 *
 * AI-generated outputs and user-provided questionnaire data intentionally use
 * separate types so they cannot be confused at service boundaries.
 */

export type EntityId = string;
export type IsoDateTime = string;
export type Confidence = number;

export type SkinType = "Dry" | "Normal" | "Oily";
export type SkinTone = "Light" | "Mid-Light" | "Mid-Dark" | "Dark";
export type PrimaryVisibleConcern =
  | "Acne"
  | "Blackheads"
  | "Dark Spots"
  | "Pores"
  | "Wrinkles";
export type ConcernSignal = "Redness" | "Pigmentation";
export type DetectedConcernType = PrimaryVisibleConcern | ConcernSignal;

export interface SkinTypeResult {
  skinType: SkinType;
  skinTypeConfidence: Confidence;
}

export interface SkinToneResult {
  skinTone: SkinTone;
  skinToneConfidence: Confidence;
}

export interface DetectedConcern {
  concern: DetectedConcernType;
  confidence: Confidence;
  region?: string;
}

export interface ConcernResult {
  primaryConcern: PrimaryVisibleConcern;
  primaryConcernConfidence: Confidence;
  detectedConcerns: DetectedConcern[];
}

export interface SkinAnalysis
  extends SkinTypeResult,
    SkinToneResult,
    ConcernResult {
  id: EntityId;
  userId?: EntityId;
  createdAt: IsoDateTime;
  aiConfidence: Confidence;
  analysisSummary?: string;
  imageUrl?: string;
}

export type SensitivityLevel = "Low" | "Medium" | "High" | "Not Sure";
export type BudgetRange =
  | "Under PKR 2,000"
  | "PKR 2,000-5,000"
  | "PKR 5,000-10,000"
  | "PKR 10,000+"
  | "No specific budget";

export interface QuestionnaireProfile {
  sensitivityLevel: SensitivityLevel;
  allergies: string[];
  ingredientsToAvoid: string[];
  budget: BudgetRange;
  preferredProductTypes: string[];
  currentRoutine?: string[];
  fragrancePreference?: string;
  texturePreference?: string;
}

export interface UserProfile {
  id: EntityId;
  name: string;
  email: string;
  createdAt: IsoDateTime;
  questionnaire?: QuestionnaireProfile;
}

export type ProductCategory =
  | "Cleanser"
  | "Toner"
  | "Serum"
  | "Moisturizer"
  | "Sunscreen"
  | "Exfoliant"
  | "Eye Cream"
  | "Mask";

export interface Product {
  id: EntityId;
  name: string;
  category: ProductCategory;
  brand?: string;
  description?: string;
  price?: number;
  keyIngredients: string[];
  suitableForSkinTypes: SkinType[];
  targetConcerns: DetectedConcernType[];
  catalogStatus?: "placeholder" | "verified";
}

export interface ProductRecommendation extends Product {
  recommendationId: EntityId;
  analysisId: EntityId;
  compatibilityScore: number;
  rationale?: {
    skinType?: string;
    concern?: string;
    sensitivity?: string;
    exclusions?: string;
    budget?: string;
  };
  preferencesConsidered?: string[];
  isBestMatch?: boolean;
}

export type RoutinePeriod = "morning" | "evening";
export type RoutineStepName =
  | "Cleanse"
  | "Treat"
  | "Hydrate"
  | "Protect"
  | "Moisturize";

export interface RoutineStep {
  id: EntityId;
  order: number;
  name: RoutineStepName;
  category: ProductCategory;
  period: RoutinePeriod;
  product?: ProductRecommendation;
  recommendationReason?: string;
}

export interface Routine {
  id: EntityId;
  analysisId: EntityId;
  generatedAt: IsoDateTime;
  morning: RoutineStep[];
  evening: RoutineStep[];
}

export interface AnalysisHistoryItem {
  id: EntityId;
  createdAt: IsoDateTime;
  skinType: SkinType;
  skinTone: SkinTone;
  primaryConcern: PrimaryVisibleConcern;
  aiConfidence: Confidence;
  detectedConcerns: DetectedConcern[];
}

export interface NavigationItem {
  name: string;
  href: string;
  iconName: string;
  badge?: string;
}

// Temporary compatibility aliases while screens move from fixtures to services.
export type AIAnalysisResult = SkinAnalysis;
export type UserPreferences = QuestionnaireProfile;
export type SkincareProduct = ProductRecommendation;
