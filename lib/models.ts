export interface ModelOption {
  id: string;
  label: string;
}



export const ANALYZE_MODELS: ModelOption[] = [
  {
    id: "gpt-5-mini",
    label: "GPT-5 Mini (Fast + Cost Effective)"
  },
  {
    id: "gpt-5.4-mini",
    label: "GPT-5.4 Mini (Low Cost Reasoning)"
  },
  {
    id: "gpt-4.1-mini",
    label: "GPT-4.1 Mini (Very Fast + Budget)"
  },
  {
    id: "gpt-4o-mini",
    label: "GPT-4o Mini (Fast Multimodal)"
  },
  {
    id: "gpt-5.4",
    label: "GPT-5.4 (Balanced Reasoning)"
  },
  {
    id: "gpt-5.6",
    label: "GPT-5.6 (Highest Analysis Quality)"
  },

];




export const GENERATE_MODELS: ModelOption[] = [

  {
    id:"gpt-5.6",
    label:"GPT-5.6 (Best Coding & Reasoning)"
  },

  {
    id:"gpt-5.5",
    label:"GPT-5.5 (Advanced Coding)"
  },

  {
    id:"gpt-5.4",
    label:"GPT-5.4 (Balanced Reasoning + Coding)"
  },

  {
    id:"gpt-5.4-mini",
    label:"GPT-5.4 Mini (Cost Effective Coding)"
  },

  {
    id:"gpt-4.1",
    label:"GPT-4.1 (Reliable Software Engineering)"
  },

  {
    id:"gpt-4.1-mini",
    label:"GPT-4.1 Mini (Budget Friendly)"
  },
  {
    id:"gpt-4o",
    label:"GPT-4o (Multimodal + Coding)"
  },
  {
    id:"gpt-4o-mini",
    label:"GPT-4o Mini (Low Cost Generation)"
  },

];



export const DEFAULT_ANALYZE_MODEL = ANALYZE_MODELS[0].id;


export const DEFAULT_GENERATE_MODEL = GENERATE_MODELS[0].id;