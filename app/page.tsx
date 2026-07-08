"use client";

import { useCallback, useState } from "react";
import ApiKeyButton from "@/components/ApiKeyButton";
import ImprovedPrompt from "@/components/ImprovedPrompt";
import IssueCard from "@/components/IssueCard";
import ProjectOutput from "@/components/ProjectOutput";
import PromptEditor from "@/components/PromptEditor";
import ScoreCard from "@/components/ScoreCard";
import SuggestionCard from "@/components/SuggestionCard";
import WhyBetter from "@/components/WhyBetter";
import {
  DEFAULT_ANALYZE_MODEL,
  DEFAULT_GENERATE_MODEL,
} from "@/lib/models";
import type { AnalysisResult } from "@/types/analysis";
import type { GeneratedProject } from "@/types/project";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [project, setProject] = useState<GeneratedProject | null>(null);
  const [apiKey, setApiKey] = useState("");
  const [analyzeModel, setAnalyzeModel] = useState(DEFAULT_ANALYZE_MODEL);
  const [generateModel, setGenerateModel] = useState(DEFAULT_GENERATE_MODEL);
  const [analyzing, setAnalyzing] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleApiKeyChange = useCallback((key: string) => {
    setApiKey(key);
  }, []);

  async function analyzePrompt() {
    setAnalyzing(true);
    setError(null);
    setAnalysis(null);
    setProject(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(apiKey ? { "x-openai-api-key": apiKey } : {}),
        },
        body: JSON.stringify({ prompt, model: analyzeModel }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to analyze prompt");
      }

      setAnalysis(data.result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setAnalyzing(false);
    }
  }

  async function generateProject() {
    if (!analysis?.improvedPrompt) return;

    setGenerating(true);
    setError(null);
    setProject(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(apiKey ? { "x-openai-api-key": apiKey } : {}),
        },
        body: JSON.stringify({
          prompt: analysis.improvedPrompt,
          model: generateModel,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to generate project");
      }

      setProject(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setGenerating(false);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Prompt Linter</h1>
            <p className="text-sm text-gray-500">
              Transform vague prompts into production-ready specifications
            </p>
          </div>
          <ApiKeyButton onApiKeyChange={handleApiKeyChange} />
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-6 py-8">
        <PromptEditor
          value={prompt}
          onChange={setPrompt}
          onAnalyze={analyzePrompt}
          loading={analyzing}
          model={analyzeModel}
          onModelChange={setAnalyzeModel}
        />

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {analysis && (
          <>
            <div className="grid gap-6 lg:grid-cols-2">
              <ScoreCard score={analysis.score} />
              <SuggestionCard suggestions={analysis.suggestions} />
            </div>

            <IssueCard issues={analysis.issues} />
            <ImprovedPrompt prompt={analysis.improvedPrompt} />
            <WhyBetter explanations={analysis.explanation} />
            <ProjectOutput
              project={project}
              loading={generating}
              onGenerate={generateProject}
              disabled={!analysis.improvedPrompt}
              model={generateModel}
              onModelChange={setGenerateModel}
            />
          </>
        )}
      </main>
    </div>
  );
}
