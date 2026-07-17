"use client";

import { CheckCircle2, Circle, Loader2 } from "lucide-react";

export type WorkflowStatus =
  | "waiting"
  | "running"
  | "completed";

export interface WorkflowStep {
  id: string;
  title: string;
  description?: string;
  status: WorkflowStatus;
}

interface Props {
  steps: WorkflowStep[];
}

function StatusIcon({ status }: { status: WorkflowStatus }) {
  switch (status) {
    case "completed":
      return (
        <CheckCircle2 className="h-5 w-5 text-green-600" />
      );

    case "running":
      return (
        <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
      );

    default:
      return (
        <Circle className="h-5 w-5 text-gray-300" />
      );
  }
}

export default function WorkflowProgress({
  steps,
}: Props) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

      <div className="mb-5">
        <h2 className="text-lg font-semibold text-gray-900">
          AI Engineering Workflow
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Watch the AI engineering team transform your idea
          into a production-ready implementation document.
        </p>
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className="flex gap-4"
          >
            {/* Timeline */}

            <div className="flex flex-col items-center">

              <StatusIcon status={step.status} />

              {index !== steps.length - 1 && (
                <div
                  className={`mt-1 h-8 w-px ${
                    step.status === "completed"
                      ? "bg-green-500"
                      : "bg-gray-200"
                  }`}
                />
              )}
            </div>

            {/* Content */}

            <div className="flex-1 pb-2">

              <div className="flex items-center gap-2">

                <h3 className="font-medium text-gray-900">
                  {step.title}
                </h3>

                {step.status === "running" && (
                  <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
                    Running
                  </span>
                )}

                {step.status === "completed" && (
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">
                    Completed
                  </span>
                )}

              </div>

              {step.description && (
                <p className="mt-1 text-sm text-gray-500">
                  {step.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}