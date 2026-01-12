
import { ComplexityLevel, SystemMode, LifeState, DisasterType, RiskLevel } from './types';

export const COLORS = {
  guide: '#0B3C5D',      // Global Authority
  amber: '#F59E0B',      // Amber Vision / Orientation
  emerald: '#2E8B57',    // Dignity / Coherence
  obsidian: '#111827',   // Resilience
  silver: '#F2F4F6',     // Clarity
  danger: '#C62828'      // Survival
};

export const UI_STRINGS = {
  'pt-BR': {
    appName: 'VitaCare Global',
    presence: 'Luiza está acompanhando.',
    orientation: 'Orientação de Vida',
    survival: 'Segurança Prioritária Ativa',
    coherence: 'Coerência Humana Sustentada',
    infrastructure: 'Infraestrutura de Apoio',
    askGuide: 'Consultar Luiza',
    needSupport: 'Necessidade Imediata',
    privacy: 'Proteção Ética GUIDE Ativa',
    aiWarning: 'Este sistema é uma infraestrutura de orientação ética. Luiza (orientada por guide) acompanha sua autonomia, nunca a substitui.',
    consentRequest: 'Pacto de Confiança',
    consentExplain: 'Para que Luiza possa te orientar com segurança e dignidade, precisamos monitorar seu contexto de vida de forma ética.',
    crisisTitle: 'ORIENTAÇÃO DO GUIDE',
    crisisDesc: 'Siga estes passos com calma. Sua proteção é nossa prioridade absoluta.',
    massAlert: 'URGÊNCIA SOCIETAL DETECTADA'
  },
  'en-US': {
    appName: 'VitaCare Global',
    presence: 'Luiza is accompanying.',
    orientation: 'Life Orientation',
    survival: 'Priority Safety Active',
    coherence: 'Sustained Human Coherence',
    infrastructure: 'Support Infrastructure',
    askGuide: 'Consult Luiza',
    needSupport: 'Immediate Need',
    privacy: 'GUIDE Ethical Protection Active',
    aiWarning: 'This system is an ethical orientation infrastructure. Luiza (powered by guide) accompanies your autonomy, never replaces it.',
    consentRequest: 'Trust Pact',
    consentExplain: 'For Luiza to guide you with safety and dignity, we need to ethically monitor your life context.',
    crisisTitle: 'GUIDE ORIENTATION',
    crisisDesc: 'Follow these steps calmly. Your protection is our absolute priority.',
    massAlert: 'SOCIETAL URGENCY DETECTED'
  }
};

export const MOCK_ELDERLY_USER = {
  name: "Maria Silva",
  id: "VITA-G-001",
  country: "Brasil",
  language: "pt-BR",
  complexity: ComplexityLevel.BALANCED,
  lifeState: LifeState.STABLE
};

export const INITIAL_ALERTS = [];

export const MOCK_PROVIDER = {
  name: "Dra. Helena",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Helena",
  status: "Certificada",
  ethicalScore: 99
};

export const MOCK_TERRITORY = [
  { id: 'VITA-G-001', name: 'Maria Silva', risk: RiskLevel.LOW },
  { id: 'VITA-G-002', name: 'João Souza', risk: RiskLevel.MEDIUM },
  { id: 'VITA-G-003', name: 'Ana Oliveira', risk: RiskLevel.CRITICAL }
];

export const DISASTER_META: Record<string, { label: string; color: string; icon: string }> = {
  [DisasterType.TSUNAMI]: { label: 'Alerta de Tsunami', color: 'bg-[#0B3C5D]', icon: 'Waves' },
  [DisasterType.EARTHQUAKE]: { label: 'Evento Sísmico', color: 'bg-stone-900', icon: 'Mountain' },
  [DisasterType.CYCLONE]: { label: 'Tempestade Severa', color: 'bg-slate-700', icon: 'Wind' },
  [DisasterType.FLOOD]: { label: 'Inundação na Área', color: 'bg-cyan-900', icon: 'Droplets' },
  [DisasterType.WILDFIRE]: { label: 'Incêndio em Proximidade', color: 'bg-orange-900', icon: 'Flame' },
  [DisasterType.VOLCANO]: { label: 'Atividade Vulcânica', color: 'bg-red-950', icon: 'LandPlot' },
  [DisasterType.BLIZZARD]: { label: 'Condição de Nevasca', color: 'bg-sky-100 text-sky-900', icon: 'Snowflake' },
  [DisasterType.HEATWAVE]: { label: 'Onda de Calor Extremo', color: 'bg-amber-700', icon: 'Sun' },
  [DisasterType.EPIDEMIC]: { label: 'Protocolo Sanitário', color: 'bg-emerald-950', icon: 'Biohazard' },
  [DisasterType.HUMANITARIAN_ISOLATION]: { label: 'Apoio em Isolamento', color: 'bg-indigo-900', icon: 'Heart' },
  [DisasterType.INFRASTRUCTURE_FAILURE]: { label: 'Falha de Infraestrutura', color: 'bg-gray-950', icon: 'ShieldAlert' },
  [DisasterType.OFFICIAL_ALERT]: { label: 'ORIENTAÇÃO OFICIAL', color: 'bg-[#0B3C5D]', icon: 'ShieldAlert' }
};
