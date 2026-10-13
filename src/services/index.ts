/**
 * Typed integration boundaries for future Supabase and FastAPI adapters.
 * This module performs no network, storage, authentication, or model calls.
 */
import type {
  AnalysisHistoryItem,
  Product,
  ProductRecommendation,
  QuestionnaireProfile,
  Routine,
  SkinAnalysis,
  UserProfile,
} from "@/types";

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface RegistrationInput extends AuthCredentials {
  name: string;
}

export interface AuthSession {
  accessToken: string;
  expiresAt: string;
  user: UserProfile;
}

export interface AnalysisRequest {
  image: Blob;
}

export interface ProductQuery {
  category?: Product["category"];
  search?: string;
  limit?: number;
  cursor?: string;
}

export interface PageResult<T> {
  items: T[];
  nextCursor?: string;
}

export interface AuthService {
  getCurrentUser(): Promise<UserProfile | null>;
  signIn(credentials: AuthCredentials): Promise<AuthSession>;
  register(input: RegistrationInput): Promise<AuthSession | null>;
  signOut(): Promise<void>;
  requestPasswordReset(email: string): Promise<void>;
  updateProfile(input: Pick<UserProfile, "name">): Promise<UserProfile>;
  changePassword(currentPassword: string, newPassword: string): Promise<void>;
  updateRecoveredPassword(newPassword: string): Promise<void>;
}

export interface AnalysisService {
  createAnalysis(input: AnalysisRequest): Promise<SkinAnalysis>;
  getAnalysis(id: string): Promise<SkinAnalysis | null>;
  getLatestAnalysis(): Promise<SkinAnalysis | null>;
}

export interface QuestionnaireService {
  getQuestionnaire(): Promise<QuestionnaireProfile | null>;
  saveQuestionnaire(profile: QuestionnaireProfile): Promise<QuestionnaireProfile>;
}

export interface ProductService {
  listProducts(query?: ProductQuery): Promise<PageResult<Product>>;
  getProduct(id: string): Promise<Product | null>;
}

export interface RecommendationService {
  getRecommendations(analysisId: string): Promise<ProductRecommendation[]>;
  getRecommendation(id: string): Promise<ProductRecommendation | null>;
  getRoutine(analysisId: string): Promise<Routine | null>;
}

export interface HistoryService {
  listHistory(cursor?: string): Promise<PageResult<AnalysisHistoryItem>>;
  getHistoryItem(id: string): Promise<SkinAnalysis | null>;
  deleteHistoryItem(id: string): Promise<void>;
  clearHistory(): Promise<void>;
}

export interface ServiceRegistry {
  auth: AuthService;
  analysis: AnalysisService;
  questionnaire: QuestionnaireService;
  products: ProductService;
  recommendations: RecommendationService;
  history: HistoryService;
}

export class ServiceNotConfiguredError extends Error {
  constructor(serviceName: keyof ServiceRegistry) {
    super(`${serviceName} service has not been configured.`);
    this.name = "ServiceNotConfiguredError";
  }
}
