import type { WorkflowStep } from "@/types/workflow";
  
  
export const INITIAL_WORKFLOW_STEPS: WorkflowStep[] = [
  {
    id:"analysis",
    title:"Prompt Analysis",
    description: "Evaluate prompt quality",
    status:"waiting"
  },
  {
    id:"interview",
    title:"Requirement Interview",
    description: "Collect missing requirements",
    status:"waiting"
  },
  {
    id:"compile",
    title:"Specification Compiler",
    description: "Convert requirements into engineering specification",
    status:"waiting"
  },
  {
    id:"review",
    title:"AI Engineering Review",
    description: "Architecture, Security and QA review",
    status:"waiting"
  },
  {
    id:"consensus",
    title:"Consensus Specification",
    description: "Merge engineering decisions",
    status:"waiting"
  },
  {
    id:"predict",
    title:"Quality Prediction",
    description: "Estimate coding success probability",  
    status:"waiting"
  },
  {
    id:"document",
    title:"Production README",
    description: "Generate Codex implementation document",
    status:"waiting"
  }
  
  
];