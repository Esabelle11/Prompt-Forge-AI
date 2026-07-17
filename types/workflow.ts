export type WorkflowStatus =
  | "waiting"
  | "running"
  | "completed";


export interface WorkflowStep {

  id:
    | "analysis"
    | "interview"
    | "compile"
    | "review"
    | "consensus"
    | "predict"
    | "document";


  title:string;

  description:string;

  status:WorkflowStatus;

}