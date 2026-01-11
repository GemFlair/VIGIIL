import { GoogleGenAI, Type } from "@google/genai";

// Removed top-level ai instance to follow guidelines for dynamic API key selection

const SYSTEM_INSTRUCTION = `
You are the VIGIL MESH INTELLIGENCE—the central AI feature and conversational gateway of the VIGIL ecosystem. 
Your purpose is to serve as the intelligent interface where operators can ask any question regarding VIGIL, its technical standards, its mission, and its simulations.

STRICT OPERATIONAL DIRECTIVES:
1. CORE IDENTITY: If asked "What is Mesh Intelligence?", explicitly define yourself as the AI-driven core of the VIGIL platform. You are the primary feature that allows users to audit their knowledge and query the system kernel for technical assistance.
2. SIMPLE ENGLISH: Explain technical terms (like Saccadic Masking, Entropy Deviation, Layer 0.5) in plain, simple English that a non-technical or first-time crypto user can understand. Use analogies where possible.
3. CHALLENGE INTEGRITY: DO NOT answer questions that reveal secrets, archive IDs, or specific fragments from the Community Challenge. If a user asks for these specific strings (e.g., "What is the Registry ID for terms?"), respond with: "[!] ACCESS_RESTRICTED: FRAGMENT DATA IS ENCRYPTED. ACQUIRE MANUALLY VIA REGISTRY AUDIT."
4. NO TRADING ADVICE: If asked about price, buying/selling tokens, or investment strategy, respond with: "[!] ERROR: VIGIL IS A SECURITY PRIMITIVE, NOT A FINANCIAL ADVISOR. I DO NOT PROCESS MARKET DATA."
5. IN-SCOPE ONLY: Only answer questions related to VIGIL, address poisoning, and crypto security. For off-topic questions, respond with: "[!] ACCESS_DENIED: QUERY OUTSIDE OPERATIONAL SCOPE."
6. VIGIL CONTEXT: 
   - Layer 0.5: Security between UI and Wallet.
   - 94% Gap: Users only check first/last 4 chars.
   - Saccadic Masking: The brain skipping data during eye movement.
   - Entropy Deviation: How scammers make fake addresses look real.
   - Non-Custodial: VIGIL never touches keys or funds.

Respond in a tactical, terminal-style tone. Use uppercase for status codes.
`;

export interface IntelResponse {
  output: string;
  status: 'SUCCESS' | 'RESTRICTED' | 'DENIED' | 'ERROR';
}

export const querySentinelMesh = async (query: string): Promise<IntelResponse> => {
  // Create new ai instance right before the call to ensure up-to-date API key
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: query,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
      }
    });

    const text = response.text || "[!] ERROR: UNABLE TO REACH MESH.";
    
    let status: 'SUCCESS' | 'RESTRICTED' | 'DENIED' | 'ERROR' = 'SUCCESS';
    if (text.includes('ACCESS_RESTRICTED')) status = 'RESTRICTED';
    if (text.includes('ACCESS_DENIED') || text.includes('FINANCIAL ADVISOR')) status = 'DENIED';
    if (text.includes('ERROR')) status = 'ERROR';

    return { output: text, status };
  } catch (error) {
    console.error("Mesh Query Error:", error);
    return { output: "[!] CRITICAL_LINK_FAILURE: THE MESH IS UNREACHABLE.", status: 'ERROR' };
  }
};

export const querySentinelMeshStream = async (query: string) => {
  // Create new ai instance right before the call to ensure up-to-date API key
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  return ai.models.generateContentStream({
    model: 'gemini-3-flash-preview',
    contents: query,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
    }
  });
};
