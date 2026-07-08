"use client";

import { Loader2, Sparkles } from "lucide-react";
import ModelSelector from "@/components/ModelSelector";
import { ANALYZE_MODELS } from "@/lib/models";

interface PromptEditorProps {
  value: string;
  onChange: (value: string) => void;
  onAnalyze: () => void;
  loading: boolean;
  model: string;
  onModelChange: (model: string) => void;
}

export default function PromptEditor({
  value,
  onChange,
  onAnalyze,
  loading,
  model,
  onModelChange,
}: PromptEditorProps) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">Prompt Editor</h2>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder='e.g. "Build me a website"'
        rows={6}
        className="w-full resize-y rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
      />
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <ModelSelector
          label="Analysis model"
          value={model}
          models={ANALYZE_MODELS}
          onChange={onModelChange}
          disabled={loading}
        />
        <button
          onClick={onAnalyze}
          disabled={loading || !value.trim()}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Analyze Prompt
            </>
          )}
        </button>
      </div>
    </section>
  );
}
