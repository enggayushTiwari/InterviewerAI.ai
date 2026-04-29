const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require('@google/generative-ai');

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

// Allow model override via env: NEXT_PUBLIC_GEMINI_MODEL
// Fallback to a common chat model if not provided.
const modelId = process.env.NEXT_PUBLIC_GEMINI_MODEL || "gemini-2.0-flash";
const model = genAI.getGenerativeModel({ model: modelId });

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    // reduce tokens to a safer default; increase if your key supports larger outputs
    maxOutputTokens: 2048,
    responseMimeType: "text/plain",
};

const safetySettings = [
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
];


let _realChatSession;
try {
    _realChatSession = model.startChat({ generationConfig, safetySettings });
} catch (err) {
    // eslint-disable-next-line no-console
    console.error('Failed to start chat session for model', modelId, err?.message || err);
}

// Helper to list available models for debugging (async).
export async function listModels() {
    try {
        return await genAI.listModels();
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error('listModels() failed:', e?.message || e);
        throw e;
    }
}

// Create a wrapper that matches the minimal shape consumers expect:
//   await chatSession.sendMessage(prompt) -> { response: { text: async () => string }}
export const chatSession = {
    async sendMessage(prompt, options) {
        // Try the real chat session first
        if (_realChatSession && typeof _realChatSession.sendMessage === 'function') {
            try {
                return await _realChatSession.sendMessage(prompt, options);
            } catch (err) {
                // eslint-disable-next-line no-console
                console.error('AI sendMessage failed, falling back to local generator:', err?.message || err);
            }
        }

        // Fallback: generate simple placeholder questions locally so app can continue
        const fallbackCount = parseInt(process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT || '5', 10) || 5;
        const questions = [];
        for (let i = 1; i <= fallbackCount; i++) {
            questions.push({
                question: `Fallback question ${i}: Describe a relevant experience or concept for the role.`,
                answer: `This is a placeholder answer for fallback question ${i}. Replace with AI output when available.`
            });
        }

        // If prompt mentions DSA, add a DSA example
        if (/dsa|data structure|algorithm/i.test(prompt)) {
            questions.push({
                dsaQuestion: 'Fallback DSA: Given array of integers, find the maximum subarray sum (Kadane example).',
                dsaAnswer: 'Use Kadane\'s algorithm: iterate, maintain current and best sum; O(n) time.'
            });
        }

        return {
            response: {
                text: async () => JSON.stringify(questions)
            }
        };
    }
};


    