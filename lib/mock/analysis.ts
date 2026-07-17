import type { AnalysisResult } from "@/types/analysis";


export const mockAnalysis: AnalysisResult = {
  score: 68,

  issues: [
    {
      title: "Missing Functional Requirements",
      severity: "high",
      description:
        "The prompt does not clearly describe the expected features, workflows, or business logic of the application.",
    },
    {
      title: "Unclear Technology Stack",
      severity: "medium",
      description:
        "No preferred programming language, framework, or deployment environment is specified.",
    },
    {
      title: "No Success Criteria",
      severity: "medium",
      description:
        "The prompt lacks measurable acceptance criteria, making it difficult to verify implementation quality.",
    },
    {
      title: "Limited Edge Case Coverage",
      severity: "low",
      description:
        "Potential error handling, validation rules, and exceptional scenarios are not mentioned.",
    },
  ],

  suggestions: [
    "Clearly define the application's primary objective and target users.",
    "List the core features in order of priority.",
    "Specify the preferred technology stack (e.g. Next.js, FastAPI, PostgreSQL).",
    "Describe user roles, permissions, and authentication requirements.",
    "Include validation rules and expected error handling behavior.",
    "Provide sample input/output or API examples where applicable.",
    "Define non-functional requirements such as performance, scalability, and security.",
    "Add acceptance criteria so the generated solution can be objectively evaluated.",
  ],

  needsInterview: true,

  interviewReason:
    "The prompt is missing several critical implementation details including functional requirements, technology preferences, user workflows, and acceptance criteria. Additional clarification is recommended before generating a software specification.",
};