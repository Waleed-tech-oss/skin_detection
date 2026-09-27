/**
 * Services Layer Interface (Phase 1 Stub)
 *
 * NOTE: As per Phase 1 scope rules, no backend APIs, AI models,
 * databases, or external integrations are connected here.
 * This file outlines the future service interfaces for Phase 2.
 */

import {
  AIAnalysisResult,
  SkincareProduct,
  UserPreferences,
  UserProfile,
} from "@/types";
import {
  MOCK_AI_ANALYSIS,
  MOCK_RECOMMENDED_PRODUCTS,
  MOCK_USER_PREFERENCES,
  MOCK_USER_PROFILE,
} from "@/data/mockData";

export interface AnalysisService {
  getLatestAnalysis(): Promise<AIAnalysisResult>;
  getAnalysisHistory(): Promise<AIAnalysisResult[]>;
}

export interface RecommendationService {
  getRecommendations(analysisId?: string): Promise<SkincareProduct[]>;
  getProductById(id: string): Promise<SkincareProduct | undefined>;
}

export interface UserService {
  getProfile(): Promise<UserProfile>;
  getPreferences(): Promise<UserPreferences>;
}

// Phase 1 Mock implementations for local static rendering
export const analysisService: AnalysisService = {
  async getLatestAnalysis() {
    return MOCK_AI_ANALYSIS;
  },
  async getAnalysisHistory() {
    return [MOCK_AI_ANALYSIS];
  },
};

export const recommendationService: RecommendationService = {
  async getRecommendations() {
    return MOCK_RECOMMENDED_PRODUCTS;
  },
  async getProductById(id: string) {
    return MOCK_RECOMMENDED_PRODUCTS.find((p) => p.id === id);
  },
};

export const userService: UserService = {
  async getProfile() {
    return MOCK_USER_PROFILE;
  },
  async getPreferences() {
    return MOCK_USER_PREFERENCES;
  },
};
