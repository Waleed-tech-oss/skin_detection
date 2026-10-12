import type {
  AIAnalysisResult,
  ProductRecommendation,
  UserPreferences,
  UserProfile,
} from "@/types";

/**
 * Centralized UI fixtures. Product records are placeholders for layout and
 * integration work; they are not real brands, formulas, prices, or claims.
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
    { concern: "Acne", confidence: 94, region: "Cheeks & Forehead" },
    { concern: "Redness", confidence: 64, region: "Cheeks" },
    { concern: "Pigmentation", confidence: 42, region: "Temple & Forehead" },
  ],
  analysisSummary:
    "AI Analysis indicates an Oily skin type with Acne as the Primary Visible Concern. Redness and Pigmentation are separate detected signals.",
};

export const MOCK_ANALYSIS_HISTORY: AIAnalysisResult[] = [
  MOCK_AI_ANALYSIS,
  {
    id: "scan-2026-0828",
    createdAt: "2026-08-28T14:20:00Z",
    skinType: "Oily",
    skinTypeConfidence: 85,
    skinTone: "Mid-Light",
    skinToneConfidence: 88,
    primaryConcern: "Acne",
    primaryConcernConfidence: 85,
    aiConfidence: 85,
    detectedConcerns: [
      { concern: "Acne", confidence: 85 },
      { concern: "Redness", confidence: 48 },
    ],
  },
  {
    id: "scan-2026-0714",
    createdAt: "2026-07-14T09:15:00Z",
    skinType: "Oily",
    skinTypeConfidence: 82,
    skinTone: "Mid-Light",
    skinToneConfidence: 86,
    primaryConcern: "Pores",
    primaryConcernConfidence: 82,
    aiConfidence: 82,
    detectedConcerns: [
      { concern: "Pores", confidence: 82 },
      { concern: "Pigmentation", confidence: 40 },
    ],
  },
];

export const MOCK_USER_PREFERENCES: UserPreferences = {
  sensitivityLevel: "Medium",
  allergies: ["Fragrance", "Essential Oils"],
  ingredientsToAvoid: ["Fragrance", "Essential Oils"],
  budget: "PKR 2,000-5,000",
  preferredProductTypes: ["Gel Cleanser", "Serum", "Gel Moisturizer"],
  currentRoutine: ["Cleanser", "Moisturizer", "Sunscreen"],
  fragrancePreference: "Fragrance-Free",
  texturePreference: "Gel",
};

export interface ExtendedProduct extends ProductRecommendation {
  whyRecommend?: {
    skinTypeMatch: string;
    concernMatch: string;
    sensitivityMatch: string;
    ingredientMatch: string;
    budgetMatch: string;
  };
  suitableFor?: string[];
}

const placeholderRationale = {
  skinTypeMatch: "Matches the sample Oily skin-type catalog tag",
  sensitivityMatch: "Sensitivity attributes require catalog verification",
  ingredientMatch: "Ingredient data requires catalog verification",
  budgetMatch: "Placeholder price falls within the selected budget",
};

export const MOCK_RECOMMENDED_PRODUCTS: ExtendedProduct[] = [
  {
    id: "prod-001",
    recommendationId: "rec-001",
    analysisId: MOCK_AI_ANALYSIS.id,
    name: "Sample Cleanser A",
    brand: "Sample catalog item",
    category: "Cleanser",
    description: "Placeholder cleanser record for product-catalog integration and layout testing.",
    price: 2499,
    compatibilityScore: 94,
    targetConcerns: ["Acne"],
    keyIngredients: [],
    suitableForSkinTypes: ["Oily"],
    catalogStatus: "placeholder",
    isBestMatch: true,
    whyRecommend: {
      ...placeholderRationale,
      concernMatch: "Matches the sample Acne concern catalog tag",
    },
    suitableFor: ["Sample Oily skin-type tag", "Sample Acne concern tag"],
    preferencesConsidered: ["Selected sensitivity", "Selected exclusions", "Selected budget"],
  },
  {
    id: "prod-002",
    recommendationId: "rec-002",
    analysisId: MOCK_AI_ANALYSIS.id,
    name: "Sample Serum B",
    brand: "Sample catalog item",
    category: "Serum",
    description: "Placeholder serum record for product-catalog integration and layout testing.",
    price: 3200,
    compatibilityScore: 91,
    targetConcerns: ["Acne", "Redness"],
    keyIngredients: [],
    suitableForSkinTypes: ["Oily"],
    catalogStatus: "placeholder",
    whyRecommend: {
      ...placeholderRationale,
      concernMatch: "Matches sample Acne and Redness catalog tags",
    },
    suitableFor: ["Sample Acne concern tag", "Sample Redness signal tag"],
    preferencesConsidered: ["Selected sensitivity", "Selected exclusions", "Selected budget"],
  },
  {
    id: "prod-003",
    recommendationId: "rec-003",
    analysisId: MOCK_AI_ANALYSIS.id,
    name: "Sample Moisturizer C",
    brand: "Sample catalog item",
    category: "Moisturizer",
    description: "Placeholder moisturizer record for product-catalog integration and layout testing.",
    price: 2850,
    compatibilityScore: 88,
    targetConcerns: ["Redness"],
    keyIngredients: [],
    suitableForSkinTypes: ["Oily", "Normal"],
    catalogStatus: "placeholder",
    whyRecommend: {
      ...placeholderRationale,
      concernMatch: "Matches the sample Redness signal catalog tag",
    },
    suitableFor: ["Sample Oily skin-type tag", "Sample Redness signal tag"],
    preferencesConsidered: ["Selected sensitivity", "Selected texture", "Selected budget"],
  },
  {
    id: "prod-004",
    recommendationId: "rec-004",
    analysisId: MOCK_AI_ANALYSIS.id,
    name: "Sample Sunscreen D",
    brand: "Sample catalog item",
    category: "Sunscreen",
    description: "Placeholder sunscreen record for product-catalog integration and layout testing.",
    price: 3400,
    compatibilityScore: 92,
    targetConcerns: ["Pigmentation"],
    keyIngredients: [],
    suitableForSkinTypes: ["Oily"],
    catalogStatus: "placeholder",
    whyRecommend: {
      ...placeholderRationale,
      concernMatch: "Matches the sample Pigmentation signal catalog tag",
    },
    suitableFor: ["Sample Oily skin-type tag", "Sample Pigmentation signal tag"],
    preferencesConsidered: ["Selected sensitivity", "Selected exclusions", "Selected budget"],
  },
  {
    id: "prod-005",
    recommendationId: "rec-005",
    analysisId: MOCK_AI_ANALYSIS.id,
    name: "Sample Moisturizer E",
    brand: "Sample catalog item",
    category: "Moisturizer",
    description: "Placeholder evening moisturizer record for product-catalog integration and layout testing.",
    price: 3100,
    compatibilityScore: 86,
    targetConcerns: ["Redness"],
    keyIngredients: [],
    suitableForSkinTypes: ["Oily"],
    catalogStatus: "placeholder",
    whyRecommend: {
      ...placeholderRationale,
      concernMatch: "Matches the sample Redness signal catalog tag",
    },
    suitableFor: ["Sample Oily skin-type tag", "Sample Redness signal tag"],
    preferencesConsidered: ["Selected sensitivity", "Selected exclusions", "Selected budget"],
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
    { stepNumber: 1, stepName: "Cleanse", category: "Cleanser", product: MOCK_RECOMMENDED_PRODUCTS[0], recommendationReason: "Placeholder cleanser selected for the sample routine." },
    { stepNumber: 2, stepName: "Treat", category: "Serum", product: MOCK_RECOMMENDED_PRODUCTS[1], recommendationReason: "Placeholder serum selected for the sample routine." },
    { stepNumber: 3, stepName: "Hydrate", category: "Moisturizer", product: MOCK_RECOMMENDED_PRODUCTS[2], recommendationReason: "Placeholder moisturizer selected for the sample routine." },
    { stepNumber: 4, stepName: "Protect", category: "Sunscreen", product: MOCK_RECOMMENDED_PRODUCTS[3], recommendationReason: "Placeholder sunscreen selected for the sample routine." },
  ],
  evening: [
    { stepNumber: 1, stepName: "Cleanse", category: "Cleanser", product: MOCK_RECOMMENDED_PRODUCTS[0], recommendationReason: "Placeholder cleanser selected for the sample routine." },
    { stepNumber: 2, stepName: "Treat", category: "Serum", product: MOCK_RECOMMENDED_PRODUCTS[1], recommendationReason: "Placeholder serum selected for the sample routine." },
    { stepNumber: 3, stepName: "Moisturize", category: "Moisturizer", product: MOCK_RECOMMENDED_PRODUCTS[4], recommendationReason: "Placeholder moisturizer selected for the sample routine." },
  ],
};

export interface RoutineStepPreview {
  stepNumber: number;
  stepName: "Cleanse" | "Treat" | "Moisturize" | "Protect";
  productName: string;
  category: string;
  timing: "AM" | "PM" | "Both";
}

export const MOCK_MORNING_ROUTINE: RoutineStepPreview[] =
  MOCK_FULL_ROUTINE.morning.map((step) => ({
    stepNumber: step.stepNumber,
    stepName: step.stepName === "Hydrate" ? "Moisturize" : step.stepName,
    productName: step.product.name,
    category: step.category,
    timing: step.stepName === "Protect" ? "AM" : "Both",
  }));

export const MOCK_USER_PROFILE: UserProfile = {
  id: "user-001",
  name: "Alex",
  email: "alex@example.com",
  createdAt: "2026-07-01T09:00:00Z",
  questionnaire: MOCK_USER_PREFERENCES,
};
