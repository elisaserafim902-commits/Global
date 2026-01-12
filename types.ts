
export enum UserRole {
  USER = 'USER',
  NETWORK = 'NETWORK',
  INFRASTRUCTURE = 'INFRASTRUCTURE',
  PROTECTION = 'PROTECTION',
  STRATEGY = 'STRATEGY'
}

export enum ComplexityLevel {
  MINIMAL = 'MINIMAL',
  BALANCED = 'BALANCED',
  ADVANCED = 'ADVANCED'
}

export enum SystemMode {
  NORMAL = 'SUSTAINED',
  CRISIS = 'PROTECTION_ACTIVE',
  OFFLINE = 'RESILIENT_OFFLINE',
  HUMANITARIAN = 'HUMANITARIAN_PRESENCE'
}

/**
 * RUPTURE 1: Active Life States represent human transitions.
 */
export enum LifeState {
  STABLE = 'STABLE_COHERENCE',
  ISOLATION_RISK = 'FRAGILE_CONNECTION',
  COGNITIVE_TRANSITION = 'COGNITIVE_ORIENTATION',
  CAREGIVER_OVERLOAD = 'NETWORK_FATIGUE',
  GRIEF_SUPPORT = 'DIGNIFIED_LOSS',
  URBAN_VULNERABILITY = 'INFRASTRUCTURE_RISK',
  MASS_ALERT = 'SOCIETAL_URGENCY'
}

export enum DisasterType {
  INFRASTRUCTURE_FAILURE = 'INFRASTRUCTURE_FAILURE',
  CLIMATE_DISASTER = 'CLIMATE_DISASTER',
  PANDEMIC_ISOLATION = 'PANDEMIC_ISOLATION',
  SOCIETAL_COLLAPSE = 'SOCIETAL_COLLAPSE',
  TSUNAMI = 'TSUNAMI',
  EARTHQUAKE = 'EARTHQUAKE',
  CYCLONE = 'CYCLONE',
  FLOOD = 'FLOOD',
  WILDFIRE = 'WILDFIRE',
  VOLCANO = 'VOLCANO',
  BLIZZARD = 'BLIZZARD',
  HEATWAVE = 'HEATWAVE',
  EPIDEMIC = 'EPIDEMIC',
  HUMANITARIAN_ISOLATION = 'HUMANITARIAN_ISOLATION',
  OFFICIAL_ALERT = 'OFFICIAL_ALERT'
}

export enum ServiceCategory {
  VITAL_LOGISTICS = 'VITAL_LOGISTICS',
  HEALTH_REINFORCEMENT = 'HEALTH_REINFORCEMENT',
  DIGNIFIED_PRESENCE = 'DIGNIFIED_PRESENCE',
  ORIENTATION = 'ORIENTATION',
  MARKET = 'MARKET',
  PHARMACY = 'PHARMACY',
  COMPANIONSHIP = 'COMPANIONSHIP',
  PROFESSIONAL_CARE = 'PROFESSIONAL_CARE',
  HELP = 'HELP'
}

export enum OrderStatus {
  SYNCHRONIZING = 'SYNCHRONIZING',
  ORGANIZING = 'ORGANIZING',
  ACTIVE_CARE = 'ACTIVE_CARE',
  SUSTAINED = 'SUSTAINED',
  MATCHING = 'MATCHING',
  RECEIVED = 'RECEIVED',
  DELIVERED = 'DELIVERED',
  PREPARING = 'PREPARING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED'
}

// Risk levels for territory monitoring
export enum RiskLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

// Types of care providers in the ecosystem
export enum ProviderType {
  HEALTH = 'HEALTH',
  CARE = 'CARE',
  SUPPORT = 'SUPPORT',
  VOLUNTEER = 'VOLUNTEER'
}

// Verification status of providers
export enum ProviderStatus {
  VALIDATED = 'VALIDATED',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED'
}

export interface CareDigitalTwin {
  lastKnownMood: string;
  behavioralPattern: string;
  vitalCoherence: number; // 0-100
  socialDensity: number; // 0-100
  resilienceScore: number; // 0-100
}

export interface OrientationPath {
  primaryGoal: string;
  immediateSteps: string[];
  networkSignals: string[];
  ethicalJustification: string;
}

export interface Order {
  id: string;
  category: ServiceCategory;
  description: string;
  status: OrderStatus;
  timestamp: Date;
  patientName: string;
  familyApproved: boolean;
  urgency: 'routine' | 'urgent' | 'emotional';
  matchedProvider?: {
    name: string;
    type: string;
    rating: number;
    avatar: string;
  };
}

export interface AIActionResponse {
  detected_need: ServiceCategory;
  urgency_level: 'low' | 'medium' | 'high' | 'critical';
  recommended_action: string;
  service_type: string;
  notify_family: boolean;
  notify_provider: boolean;
  explanation: string;
}

export interface UserContext {
  language: 'pt-BR' | 'en-US' | 'es-ES' | 'ja-JP' | 'de-DE';
  country: string;
  complexity: ComplexityLevel;
  mode: SystemMode;
  lifeState: LifeState;
  twin: CareDigitalTwin;
  orientation?: OrientationPath;
  scores: {
    trust: number;
    stability: number;
    socialEngagement: number;
    vulnerability: number;
  };
}

export interface Alert {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'danger';
  timestamp: Date;
  isSilent?: boolean;
}

export interface DisasterEvent {
  type: DisasterType;
  location: string;
  guidance: string[];
  officialSource?: string;
  translatedBy?: 'guide';
}

export interface HumanitarianResponse {
  daily_routine: string[];
  ethical_justification: string;
  human_presence_mode: boolean;
}
