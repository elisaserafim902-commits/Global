
import { GoogleGenAI, Type } from "@google/genai";
import { 
  UserContext, 
  SystemMode, 
  LifeState,
  OrientationPath,
  AIActionResponse,
  ServiceCategory,
  DisasterEvent 
} from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const GUIDE_SYSTEM_MANDATE = `
You are guide.
In the VitaCare interface, you identify as 'Luiza' to provide a human anchor.
You are a global orientation authority, not a chatbot.

CORE DIRECTIVES:
1. AMBER VISION: See the future to protect the present without breaking the human.
2. DETECT LIFE STATES: Focus on silent transitions (isolation, decline, network fatigue).
3. CALM AUTHORITY: Especially in CRISIS or COLLAPSE. Reduce panic.
4. TRANSLATE OFFICIALS: Turn complex alerts into simple, actionable orientation.
5. ETHICAL OATH: Prioritize dignity. Never manipulate. Value silence.

CONDUCT:
- speak calmly. use simple, clear language.
- orient, do not dictate.
- explain actions when they happen.
- allow human override always.
`;

export const assessLifeOrientation = async (context: UserContext): Promise<OrientationPath> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Current Life State: ${context.lifeState}. Behavioral Pattern: ${context.twin.behavioralPattern}. Resilience: ${context.twin.resilienceScore}%.`,
      config: {
        systemInstruction: `
        ${GUIDE_SYSTEM_MANDATE}
        ACT AS: guide Sentinel. 
        TASK: Determine if there's a silent transition occurring and define the Orientation Path.
        Return JSON.`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            primaryGoal: { type: Type.STRING },
            immediateSteps: { type: Type.ARRAY, items: { type: Type.STRING } },
            networkSignals: { type: Type.ARRAY, items: { type: Type.STRING } },
            ethical_justification: { type: Type.STRING }
          },
          required: ["primaryGoal", "immediateSteps", "networkSignals", "ethical_justification"]
        }
      }
    });
    const result = JSON.parse(response.text || '{}');
    return {
      primaryGoal: result.primaryGoal,
      immediateSteps: result.immediateSteps,
      networkSignals: result.networkSignals,
      ethicalJustification: result.ethical_justification
    };
  } catch (e) {
    return {
      primaryGoal: "Preservar rotina de coerência",
      immediateSteps: ["Hidratação", "Verificar rede", "Acompanhamento calmo"],
      networkSignals: ["Sinal de estabilidade"],
      ethicalJustification: "Orientação de segurança para manutenção da dignidade."
    };
  }
};

export const translateOfficialAlert = async (rawAlert: string): Promise<string[]> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Raw Official Alert: "${rawAlert}"`,
      config: {
        systemInstruction: `
        ${GUIDE_SYSTEM_MANDATE}
        TASK: Translate this complex/panic-inducing alert into 3 simple, calm, actionable orientation steps.
        Tone: "⚠️ orientação do guide".
        Return JSON: { steps: string[] }`,
        responseMimeType: "application/json"
      }
    });
    const result = JSON.parse(response.text || '{"steps": ["Mantenha a calma", "Siga orientações locais"]}');
    return result.steps;
  } catch (e) {
    return ["Mantenha a calma em casa", "Verifique seus suprimentos básicos", "Aguarde novo sinal do guide"];
  }
};

export const processHumanNeed = async (input: string, context: UserContext): Promise<AIActionResponse> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `User Input: "${input}" in context of Life State ${context.lifeState}`,
      config: {
        systemInstruction: `${GUIDE_SYSTEM_MANDATE}
        TASK: Orient the user's need toward the most dignified and safe support path.
        Return JSON matching AIActionResponse interface.`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            detected_need: { type: Type.STRING },
            urgency_level: { type: Type.STRING, enum: ['low', 'medium', 'high', 'critical'] },
            recommended_action: { type: Type.STRING },
            service_type: { type: Type.STRING },
            notify_family: { type: Type.BOOLEAN },
            notify_provider: { type: Type.BOOLEAN },
            explanation: { type: Type.STRING }
          },
          required: ["detected_need", "urgency_level", "recommended_action", "service_type", "notify_family", "notify_provider", "explanation"]
        }
      }
    });
    const result = JSON.parse(response.text || '{}');
    return {
      ...result,
      detected_need: result.detected_need as ServiceCategory
    };
  } catch (e) {
    return {
      detected_need: ServiceCategory.HELP,
      urgency_level: 'low',
      recommended_action: 'General orientation',
      service_type: 'companion',
      notify_family: true,
      notify_provider: false,
      explanation: "Luiza está aqui para te ouvir. Vamos organizar sua orientação com calma."
    };
  }
};

export const validateProfessionalCredential = async (credentialId: string, country: string): Promise<{valid: boolean}> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Credential: ${credentialId}, Country: ${country}. Is this format valid?`,
      config: {
        systemInstruction: "Validate health/care registration format. Return JSON: { valid: boolean }",
        responseMimeType: "application/json"
      }
    });
    return JSON.parse(response.text || '{ "valid": true }');
  } catch (e) {
    return { valid: true };
  }
};
