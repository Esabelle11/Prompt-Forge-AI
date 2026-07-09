"use client";

import { Download, FileCode, Loader2, Rocket } from "lucide-react";
import { useMemo, useState } from "react";
import ModelSelector from "@/components/ModelSelector";
import { GENERATE_MODELS } from "@/lib/models";
import type { GeneratedProject } from "@/types/project";

interface Props {
  project: GeneratedProject | null;
  loading: boolean;
  onGenerate: () => void;
  disabled: boolean;
  model: string;
  onModelChange: (model: string) => void;
}

function downloadZip(project: GeneratedProject) {
  const bytes = Uint8Array.from(atob(project.zipBase64), (c) => c.charCodeAt(0));
  const blob = new Blob([bytes], { type: "application/zip" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${project.projectName}.zip`;
  link.click();
  URL.revokeObjectURL(url);
}

export default function ProjectOutput({
  project,
  loading,
  onGenerate,
  disabled,
  model,
  onModelChange,
}: Props) {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  const selectedFile = useMemo(() => {
    if (!project) return null;
    const path = selectedPath ?? project.files[0]?.path;
    return project.files.find((file) => file.path === path) ?? null;
  }, [project, selectedPath]);

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Generate Project
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Create a downloadable project scaffold from the improved prompt.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <ModelSelector
            label="Generation model"
            value={model}
            models={GENERATE_MODELS}
            onChange={onModelChange}
            disabled={loading}
          />
          <button
            onClick={onGenerate}
            disabled={disabled || loading}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Rocket className="h-4 w-4" />
                Generate Project
              </>
            )}
          </button>
        </div>
      </div>

      {!project ? (
        <p className="text-sm text-gray-500">
          Analyze and refine your prompt first, then generate a production-ready
          project scaffold.
        </p>
      ) : (
        <div className="space-y-4">
          <div className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-medium text-gray-900">{project.projectName}</p>
              <p className="text-sm text-gray-500">
                {project.files.length} files ready to download
              </p>
            </div>
            <button
              onClick={() => downloadZip(project)}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
            >
              <Download className="h-4 w-4" />
              Download ZIP
            </button>
          </div>

          <div className="grid gap-4 lg:grid-cols-[240px_1fr]">
            <div className="max-h-[420px] overflow-auto rounded-lg border border-gray-200">
              <ul className="divide-y divide-gray-100">
                {project.files.map((file) => (
                  <li key={file.path}>
                    <button
                      onClick={() => setSelectedPath(file.path)}
                      className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition hover:bg-gray-50 ${
                        selectedFile?.path === file.path
                          ? "bg-gray-100 font-medium text-gray-900"
                          : "text-gray-600"
                      }`}
                    >
                      <FileCode className="h-4 w-4 shrink-0 text-gray-400" />
                      <span className="truncate">{file.path}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="max-h-[420px] overflow-auto rounded-lg border border-gray-200 bg-gray-50">
              {selectedFile ? (
                <pre className="p-4 text-xs leading-relaxed text-gray-800">
                  {selectedFile.content}
                </pre>
              ) : (
                <p className="p-4 text-sm text-gray-500">
                  Select a file to preview its contents.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
