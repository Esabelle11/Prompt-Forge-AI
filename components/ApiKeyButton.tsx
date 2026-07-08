"use client";

import { Key, X } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  onApiKeyChange: (key: string) => void;
}

export default function ApiKeyButton({ onApiKeyChange }: Props) {
  const [open, setOpen] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("openai_api_key") || "";
    setApiKey(stored);
    onApiKeyChange(stored);
  }, [onApiKeyChange]);

  function saveKey() {
    localStorage.setItem("openai_api_key", apiKey.trim());
    onApiKeyChange(apiKey.trim());
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setOpen(false);
    }, 1000);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
      >
        <Key className="h-4 w-4" />
        API Key
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                OpenAI API Key
              </h3>
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg p-1 text-gray-500 hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="mb-4 text-sm text-gray-600">
              Enter your OpenAI API key. It is stored locally in your browser
              and sent only to this app&apos;s API routes.
            </p>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-..."
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={saveKey}
                className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
              >
                {saved ? "Saved!" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
