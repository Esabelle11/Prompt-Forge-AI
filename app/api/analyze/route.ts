import { NextResponse } from "next/server";
import { createOpenAIClient } from "@/lib/openai";
import { DEFAULT_ANALYZE_MODEL } from "@/lib/models";
import { parseModelJson } from "@/lib/parse-json";
import type { AnalysisResult } from "@/types/analysis";
import { mockAnalysis } from "@/lib/mock/analysis";

const USE_MOCK = false;

export async function POST(req: Request) {
  try {
    const { prompt, model = DEFAULT_ANALYZE_MODEL } = await req.json();
    const apiKey = req.headers.get("x-openai-api-key") || undefined;

    if (!prompt?.trim()) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    if (USE_MOCK) {
      console.log("IN MOCK");
      return NextResponse.json({
        result: mockAnalysis,
      });
    }

    const openai = createOpenAIClient(apiKey);

    const response = await openai.responses.create({
      model,
      text: {
        format: { type: "json_object" },
      },
      input: `You are a Prompt Linter — a developer experience tool that reviews prompts before AI code generation.

Analyze the following developer prompt and return ONLY valid JSON matching this schema:
{
  "score": number (0-100, based on clarity, specificity, constraints, context, output format, and technical requirements),
  "issues": [
    {
      "title": string,
      "severity": "high" | "medium" | "low",
      "description": string
    }
  ],
  "suggestions": string[],
  "improvedPrompt": string,
  "explanation": [
    {
      "change": string,
      "reason": string
    }
  ]
}

Developer prompt:
${prompt}`,
    });

    const text = response.output_text;

    if (!text) {
      return NextResponse.json(
        { error: "No response from model" },
        { status: 500 }
      );
    }

    const result = parseModelJson<AnalysisResult>(text);

    return NextResponse.json({ result });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to analyze prompt";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
