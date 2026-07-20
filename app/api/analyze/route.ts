import { NextResponse } from "next/server";
import { createOpenAIClient } from "@/lib/openai";
import { DEFAULT_ANALYZE_MODEL } from "@/lib/models";
import { parseModelJson } from "@/lib/parse-json";
import type { AnalysisResult } from "@/types/analysis";
import { mockAnalysis } from "@/lib/mock/analysis";
import { analysisAgent } from "@/agents/analysis-agent";
import {runAgent} from "@/helper/run_agent";

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
      console.log("IN MOCK : mockAnalysis");
      await new Promise((resolve) => setTimeout(resolve, 5000));

      return NextResponse.json({
        result: mockAnalysis,
      });
    }

    // const result =  await analysisAgent( prompt, model, apiKey);
    const result =  await runAgent("analysis", () => analysisAgent(prompt,model, apiKey));
    // console.log("result: ", result)

    
    if (!result) {
      return NextResponse.json(
        { error: "No response from model" },
        { status: 500 }
      );
    }

    // const final_result = parseModelJson<AnalysisResult>(result);
    return NextResponse.json({ result });

  } catch (error) {
    console.log("error: ", error)
    const message = error instanceof Error ? error.message : "Failed to analyze prompt";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
