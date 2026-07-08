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
      input: `You are a Prompt Linter — a developer experience tool that helps developers write better prompts for AI coding agents.
    
    Your goal is to analyze a developer's request before code generation and identify whether the prompt contains enough information for an AI coding agent to produce a reliable production-ready application.
    
    Evaluate the prompt based on:
    
    - Product intent and purpose
    - Target users or audience
    - Required features and functionality
    - Technical requirements and technology choices
    - Application architecture requirements
    - Data models or integrations needed
    - UI/UX expectations
    - Security and authentication requirements
    - Scalability considerations
    - Expected output format
    
    Return ONLY valid JSON matching this schema:
    
    {
      "score": number,
      "issues": [
        {
          "title": string,
          "severity": "high" | "medium" | "low",
          "description": string
        }
      ],
      "suggestions": [
        "string"
      ],
      "improvedPrompt": "string",
      "explanation": [
        {
          "change": "string",
          "reason": "string"
        }
      ]
    }
    
    Scoring rules:
    
    90-100:
    The prompt contains enough details for reliable production implementation.
    
    70-89:
    The prompt is usable but requires some clarification.
    
    40-69:
    The prompt lacks important requirements and may produce inconsistent results.
    
    0-39:
    The prompt is too vague for reliable code generation.
    
    
    For improvedPrompt:
    - Rewrite the original request into a structured software specification.
    - Preserve the user's original intent.
    - Add missing details where appropriate.
    - Do not invent unnecessary features.
    - Make it suitable as input for an AI coding agent.
    
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
