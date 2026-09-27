/**
 * Core Domain Types for AI-Based Facial Skin Analysis & Recommendation System
 *
 * IMPORTANT ARCHITECTURE RULE:
 * Maintain strict separation between AI-generated data and User-provided data.
 * Avoid medical terminology (Diagnosis, Cure, Guaranteed treatment).
 */

// ==========================================
// 1. AI-Generated Domain Types
// ==========================================

export type SkinType = "Oily" | "Dry" | "Combination" | "Normal" | "Sensitive";

export type SkinTone =
  | "Fair"
  | "Light"
  | "Mid-Light"
  | "Medium"
  | "Medium-Deep"
  | "Deep";

export type DetectedConcernType =
  | "Acne"
  | "Hyperpigmentation"
  | "Pigmentation"
  | "Redness"
  | "Fine Lines"
  | "Enlarged Pores"
  | "Pores"
  | "Dullness"
  | "Uneven Texture"
  | "Dry Patches"
  | "Oiliness";

export interface DetectedConcern {
  concern: DetectedConcernType;
  confidence: number; // 0 to 100 percentage
  region?: string; // e.g. "T-Zone", "Cheeks", "Forehead"
}

export interface AIAnalysisResult {
  id: string;
  createdAt: string;
  skinType: SkinType;
  skinTypeConfidence?: number; // e.g. 87 (%)
  skinTone: SkinTone;
  skinToneConfidence?: number; // e.g. 90 (%)
  primaryConcern: DetectedConcernType;
  primaryConcernConfidence?: number; // e.g. 94 (%)
  detectedConcerns: DetectedConcern[];
  aiConfidence: number; // overall model confidence e.g. 87 (%)
  analysisSummary?: string;
  imageUrl?: string;
}

// ==========================================
// 2. User-Provided Information Types
// ==========================================

export type SensitivityLevel = "Low" | "Medium" | "High";

export type BudgetRange = "Budget" | "Mid-Range" | "Premium" | "Luxury";

export interface UserPreferences {
  sensitivityLevel: SensitivityLevel;
  allergies: string[];
  ingredientsToAvoid: string[];
  budget: BudgetRange;
  preferredProductTypes: string[];
  lifestyleFactors?: {
    sunExposure?: "Low" | "Moderate" | "High";
    sleepHours?: number;
    stressLevel?: "Low" | "Moderate" | "High";
  };
}

// ==========================================
// 3. Skincare Product & Recommendation Types
// ==========================================

export type ProductCategory =
  | "Cleanser"
  | "Toner"
  | "Serum"
  | "Moisturizer"
  | "Sunscreen"
  | "Exfoliant"
  | "Eye Cream"
  | "Mask";

export interface SkincareProduct {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  description: string;
  price?: number;
  compatibilityScore: number; // e.g. 92 (%)
  targetConcerns: DetectedConcernType[];
  keyIngredients: string[];
  imageUrl?: string;
  suitableForSkinTypes: SkinType[];
}

export interface RecommendationSummary {
  id: string;
  analysisId: string;
  generatedAt: string;
  products: SkincareProduct[];
  morningRoutine: SkincareProduct[];
  eveningRoutine: SkincareProduct[];
}

// ==========================================
// 4. User Profile & Application State Types
// ==========================================

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  preferences?: UserPreferences;
}

export interface NavigationItem {
  name: string;
  href: string;
  iconName: string;
  badge?: string;
}
