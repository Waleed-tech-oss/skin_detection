import {
  AIAnalysisResult,
  UserPreferences,
  SkincareProduct,
  UserProfile,
} from "@/types";

/**
 * Mock Data for DermaAI (Phase 2C Configuration)
 * Strict domain alignment:
 * - Clear distinction between AI-generated values and user preferences.
 * - Primary concern: Acne (highest confidence detected concern).
 * - Additional detected signals: Redness, Pigmentation (separate, lower confidence).
 * - No medical terminology.
 * - Localized pricing in PKR.
 */
export const MOCK_AI_ANALYSIS: AIAnalysisResult = {
  id: "scan-2026-0925",
  createdAt: "2026-09-25T18:45:00Z",
  skinType: "Oily",
  skinTypeConfidence: 87,
  skinTone: "Mid-Light",
  skinToneConfidence: 90,
  primaryConcern: "Acne",
  primaryConcernConfidence: 94,
  aiConfidence: 87,
  detectedConcerns: [
    {
      concern: "Acne",
      confidence: 94,
      region: "Cheeks & Forehead",
    },
    {
      concern: "Redness",
      confidence: 64,
      region: "Cheeks",
    },
    {
      concern: "Pigmentation",
      confidence: 42,
      region: "Temple & Forehead",
    },
  ],
  analysisSummary:
    "AI analysis detected an oily skin profile with visible acne as the primary concern, accompanied by surface redness and localized pigmentation signals.",
};

export const MOCK_ANALYSIS_HISTORY: AIAnalysisResult[] = [
  {
    id: "scan-2026-0925",
    createdAt: "2026-09-25T18:45:00Z",
    skinType: "Oily",
    skinTone: "Mid-Light",
    primaryConcern: "Acne",
    aiConfidence: 87,
    detectedConcerns: [
      { concern: "Acne", confidence: 94 },
      { concern: "Redness", confidence: 64 },
      { concern: "Pigmentation", confidence: 42 },
    ],
  },
  {
    id: "scan-2026-0828",
    createdAt: "2026-08-28T14:20:00Z",
    skinType: "Oily",
    skinTone: "Mid-Light",
    primaryConcern: "Acne",
    aiConfidence: 85,
    detectedConcerns: [
      { concern: "Acne", confidence: 85 },
      { concern: "Oiliness", confidence: 80 },
    ],
  },
  {
    id: "scan-2026-0714",
    createdAt: "2026-07-14T09:15:00Z",
    skinType: "Combination",
    skinTone: "Mid-Light",
    primaryConcern: "Redness",
    aiConfidence: 82,
    detectedConcerns: [
      { concern: "Redness", confidence: 82 },
      { concern: "Pigmentation", confidence: 40 },
    ],
  },
];

export const MOCK_USER_PREFERENCES: UserPreferences = {
  sensitivityLevel: "Medium",
  allergies: ["Fragrance", "Essential Oils"],
  ingredientsToAvoid: ["Fragrance", "Essential Oils"],
  budget: "Mid-Range",
  preferredProductTypes: ["Gel Cleanser", "Niacinamide Serum", "Lightweight Gel Moisturizer"],
  lifestyleFactors: {
    sunExposure: "Moderate",
    sleepHours: 7,
    stressLevel: "Moderate",
  },
};

export interface ExtendedProduct extends SkincareProduct {
  isBestMatch?: boolean;
  whyRecommend?: {
    skinTypeMatch: string;
    concernMatch: string;
    sensitivityMatch: string;
    ingredientMatch: string;
    budgetMatch: string;
  };
  suitableFor?: string[];
  preferencesConsidered?: string[];
}

export const MOCK_RECOMMENDED_PRODUCTS: ExtendedProduct[] = [
  {
    id: "prod-001",
    name: "Gentle Clarifying Cleanser",
    brand: "DermaPure Labs",
    category: "Cleanser",
    description: "Low-foaming gel cleanser with 0.5% salicylic acid and green tea to clear surface impurities without disrupting the lipid barrier.",
    compatibilityScore: 94,
    targetConcerns: ["Acne", "Oiliness"],
    keyIngredients: ["Salicylic Acid (0.5%)", "Green Tea Extract", "Zinc PCA"],
    suitableForSkinTypes: ["Oily", "Combination", "Sensitive"],
    price: 2499,
    isBestMatch: true,
    whyRecommend: {
      skinTypeMatch: "Formulated specifically for oily sebum control",
      concernMatch: "Contains 0.5% salicylic acid targeting visible acne",
      sensitivityMatch: "Fragrance-free & non-stripping for medium sensitivity",
      ingredientMatch: "Free of essential oils and denatured alcohol",
      budgetMatch: "Within target range (PKR 2,000–5,000)",
    },
    suitableFor: ["Oily & combination skin", "Breakout-prone skin", "Daily morning & evening use"],
    preferencesConsidered: ["Fragrance-Free", "Essential Oil Free", "Gel Texture", "PKR 2k–5k Budget"],
  },
  {
    id: "prod-002",
    name: "Barrier Support Serum",
    brand: "CeraBalance Labs",
    category: "Serum",
    description: "Lightweight, fragrance-free serum with 5% Niacinamide and Zinc to balance sebum production and calm visible surface redness.",
    compatibilityScore: 91,
    targetConcerns: ["Acne", "Redness", "Uneven Texture"],
    keyIngredients: ["Niacinamide (5%)", "Zinc PCA (1%)", "Centella Asiatica"],
    suitableForSkinTypes: ["Oily", "Combination", "Sensitive"],
    price: 3200,
    whyRecommend: {
      skinTypeMatch: "Lightweight water base suitable for oily skin",
      concernMatch: "Niacinamide calms redness and supports surface clarity",
      sensitivityMatch: "Gentle 5% concentration minimizes irritation risk",
      ingredientMatch: "100% free of synthetic fragrance and essential oils",
      budgetMatch: "Within target range (PKR 2,000–5,000)",
    },
    suitableFor: ["Redness & acne signals", "Sensitive & reactive skin", "Layering under moisturizer"],
    preferencesConsidered: ["Fragrance-Free", "Essential Oil Free", "Serum Format", "PKR 2k–5k Budget"],
  },
  {
    id: "prod-003",
    name: "Oil-Free Gel Moisturizer",
    brand: "AquaCalm Labs",
    category: "Moisturizer",
    description: "Ultra-lightweight soothing hydration gel infused with hyaluronic acid, madecassoside, and allantoin for clean all-day hydration.",
    compatibilityScore: 88,
    targetConcerns: ["Oiliness", "Redness"],
    keyIngredients: ["Hyaluronic Acid", "Madecassoside", "Allantoin"],
    suitableForSkinTypes: ["Oily", "Combination", "Normal"],
    price: 2850,
    whyRecommend: {
      skinTypeMatch: "Zero-oil gel base prevents pore congestion",
      concernMatch: "Madecassoside and allantoin soothe skin irritation",
      sensitivityMatch: "Calming botanical extracts without fragrance",
      ingredientMatch: "No drying alcohols, sulfates, or artificial dyes",
      budgetMatch: "Within target range (PKR 2,000–5,000)",
    },
    suitableFor: ["Oily & shiny complexion", "Daytime hydration under SPF", "Sensitive skin barriers"],
    preferencesConsidered: ["Fragrance-Free", "Gel Texture", "PKR 2k–5k Budget"],
  },
  {
    id: "prod-004",
    name: "Daily Mineral Sunscreen",
    brand: "SolarPure Labs",
    category: "Sunscreen",
    description: "Non-comedogenic, matte-finish mineral sunscreen with zinc oxide and niacinamide, ideal for breakout-prone skin under UV exposure.",
    compatibilityScore: 92,
    targetConcerns: ["Pigmentation", "Oiliness"],
    keyIngredients: ["Zinc Oxide (12%)", "Niacinamide", "Antioxidant Complex"],
    suitableForSkinTypes: ["Oily", "Combination", "Sensitive"],
    price: 3400,
    whyRecommend: {
      skinTypeMatch: "Matte-drying mineral formula reduces daytime shine",
      concernMatch: "Broad-spectrum UV shield protects pigmentation spots",
      sensitivityMatch: "Pure physical mineral filter suitable for sensitive skin",
      ingredientMatch: "Free of chemical UV filters and fragrance",
      budgetMatch: "Within target range (PKR 2,000–5,000)",
    },
    suitableFor: ["Daily morning UV protection", "Breakout-prone skin", "Mid-light skin tones"],
    preferencesConsidered: ["Fragrance-Free", "Non-Comedogenic", "PKR 2k–5k Budget"],
  },
  {
    id: "prod-005",
    name: "Calming Hydration Cream",
    brand: "DermaPure Labs",
    category: "Moisturizer",
    description: "Nourishing evening barrier cream enriched with ceramides and oat extract to replenish moisture during overnight skin rest.",
    compatibilityScore: 86,
    targetConcerns: ["Redness", "Uneven Texture"],
    keyIngredients: ["Ceramide NP", "Colloidal Oat Extract", "Panthenol"],
    suitableForSkinTypes: ["Combination", "Oily", "Sensitive"],
    price: 3100,
    whyRecommend: {
      skinTypeMatch: "Non-greasy barrier replenishment for nighttime use",
      concernMatch: "Colloidal oat reduces redness and calms irritation",
      sensitivityMatch: "Dermatologist-tested base for sensitive skin",
      ingredientMatch: "Free of irritants and essential oils",
      budgetMatch: "Within target range (PKR 2,000–5,000)",
    },
    suitableFor: ["Evening routine step", "Compromised skin barriers", "Overnight soothing"],
    preferencesConsidered: ["Fragrance-Free", "Ceramide Infused", "PKR 2k–5k Budget"],
  },
];

export interface DetailedRoutineStep {
  stepNumber: number;
  stepName: "Cleanse" | "Treat" | "Hydrate" | "Protect" | "Moisturize";
  category: "Cleanser" | "Serum" | "Moisturizer" | "Sunscreen";
  product: ExtendedProduct;
  recommendationReason: string;
}

export const MOCK_FULL_ROUTINE: {
  morning: DetailedRoutineStep[];
  evening: DetailedRoutineStep[];
} = {
  morning: [
    {
      stepNumber: 1,
      stepName: "Cleanse",
      category: "Cleanser",
      product: MOCK_RECOMMENDED_PRODUCTS[0], // Gentle Clarifying Cleanser
      recommendationReason: "Gently removes overnight sebum without stripping the natural barrier.",
    },
    {
      stepNumber: 2,
      stepName: "Treat",
      category: "Serum",
      product: MOCK_RECOMMENDED_PRODUCTS[1], // Barrier Support Serum
      recommendationReason: "5% Niacinamide targets visible acne activity and soothes redness.",
    },
    {
      stepNumber: 3,
      stepName: "Hydrate",
      category: "Moisturizer",
      product: MOCK_RECOMMENDED_PRODUCTS[2], // Oil-Free Gel Moisturizer
      recommendationReason: "Provides lightweight hydration with zero pore-clogging heavy oils.",
    },
    {
      stepNumber: 4,
      stepName: "Protect",
      category: "Sunscreen",
      product: MOCK_RECOMMENDED_PRODUCTS[3], // Daily Mineral Sunscreen
      recommendationReason: "Matte mineral shield prevents UV darkening of pigmentation marks.",
    },
  ],
  evening: [
    {
      stepNumber: 1,
      stepName: "Cleanse",
      category: "Cleanser",
      product: MOCK_RECOMMENDED_PRODUCTS[0], // Gentle Clarifying Cleanser
      recommendationReason: "Clears daily pollution, sebum, and sunscreen residue cleanly.",
    },
    {
      stepNumber: 2,
      stepName: "Treat",
      category: "Serum",
      product: MOCK_RECOMMENDED_PRODUCTS[1], // Barrier Support Serum
      recommendationReason: "Overnight cellular balance to regulate excess sebum production.",
    },
    {
      stepNumber: 3,
      stepName: "Moisturize",
      category: "Moisturizer",
      product: MOCK_RECOMMENDED_PRODUCTS[4], // Calming Hydration Cream
      recommendationReason: "Ceramides and colloidal oat reinforce the moisture barrier overnight.",
    },
  ],
};

export interface RoutineStepPreview {
  stepNumber: number;
  stepName: "Cleanse" | "Treat" | "Moisturize" | "Protect";
  productName: string;
  category: string;
  timing: "AM" | "PM" | "Both";
}

export const MOCK_MORNING_ROUTINE: RoutineStepPreview[] = [
  {
    stepNumber: 1,
    stepName: "Cleanse",
    productName: "Gentle Clarifying Cleanser",
    category: "Cleanser",
    timing: "Both",
  },
  {
    stepNumber: 2,
    stepName: "Treat",
    productName: "Barrier Support Serum",
    category: "Serum",
    timing: "Both",
  },
  {
    stepNumber: 3,
    stepName: "Moisturize",
    productName: "Oil-Free Gel Moisturizer",
    category: "Moisturizer",
    timing: "Both",
  },
  {
    stepNumber: 4,
    stepName: "Protect",
    productName: "Daily Mineral Sunscreen",
    category: "Sunscreen",
    timing: "AM",
  },
];

export const MOCK_USER_PROFILE: UserProfile = {
  id: "user-001",
  name: "Alex",
  email: "alex@example.com",
  createdAt: "2026-07-01T09:00:00Z",
  preferences: MOCK_USER_PREFERENCES,
};
