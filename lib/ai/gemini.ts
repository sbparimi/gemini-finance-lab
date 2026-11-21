import "server-only";

type GeminiPart = { text?: string };
type GeminiResponse = { candidates?: Array<{ content?: { parts?: GeminiPart[] }; finishReason?: string }>; error?: { message?: string } };

const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";

export async function generateJson<T>(system: string, input: string): Promise<T> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("AI_PROVIDER_NOT_CONFIGURED");
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-goog-api-key": key },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: system }] },
      contents: [{ role: "user", parts: [{ text: input }] }],
      generationConfig: { responseMimeType: "application/json", temperature: 0.2, maxOutputTokens: 5000 }
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(45000)
  });
  const payload = await response.json() as GeminiResponse;
  if (!response.ok) throw new Error(response.status === 429 ? "AI_PROVIDER_RATE_LIMITED" : "AI_PROVIDER_REQUEST_FAILED");
  const text = payload.candidates?.[0]?.content?.parts?.map(p => p.text || "").join("").trim();
  if (!text) throw new Error("AI_PROVIDER_EMPTY_RESPONSE");
  try { return JSON.parse(text) as T; } catch { throw new Error("AI_PROVIDER_INVALID_JSON"); }
}

export const activeModel = model;
