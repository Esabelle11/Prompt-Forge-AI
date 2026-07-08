export interface ModelOption {
  id: string;
  label: string;
}

export const ANALYZE_MODELS: ModelOption[] = [
  { id: "gpt-4.1-mini", label: "GPT-4.1 Mini (fast)" },
  { id: "gpt-4.1", label: "GPT-4.1" },
  { id: "gpt-4o-mini", label: "GPT-4o Mini" },
  { id: "gpt-4o", label: "GPT-4o" },
];


export const GENERATE_MODELS: ModelOption[] = [
  {id: "gpt-5.5", label: "GPT-5.5 (Best Coding)"},
  {id: "gpt-5.4", label: "GPT-5.4"},
  {id: "gpt-5.4-mini", label: "GPT-5.4 Mini (Lower Cost)"},
  {id: "gpt-4.1", label: "GPT-4.1"},
  {id: "gpt-4.1-mini", label: "GPT-4.1 Mini"}
];

export const DEFAULT_ANALYZE_MODEL = ANALYZE_MODELS[0].id;
export const DEFAULT_GENERATE_MODEL = GENERATE_MODELS[0].id;
