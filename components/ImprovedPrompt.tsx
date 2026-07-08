"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface Props {
  prompt: string;
}

export default function ImprovedPrompt({ prompt }: Props) {
  const [copied, setCopied] = useState(false);

  async function copyPrompt() {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-gray-900">Improved Prompt</h2>
        <button
          onClick={copyPrompt}
          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-green-600" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copy Prompt
            </>
          )}
        </button>
      </div>
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-800">
          {prompt}
        </p>
      </div>
    </section>
  );
}
