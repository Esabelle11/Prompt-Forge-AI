import OpenAI from "openai";

export function createOpenAIClient(apiKey?: string) {
  const key = apiKey;

  if (!key) {
    throw new Error("OpenAI API key is required");
  }

  return new OpenAI({ apiKey: key });
}
