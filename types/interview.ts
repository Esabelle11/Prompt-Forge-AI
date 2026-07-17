export interface InterviewQuestion {
    id: string;
    question: string;
    reason: string;
    type: "text" | "choice";
    options?: string[];
  }
  
  export interface InterviewResult {
    needsInterview: boolean;
    questions: InterviewQuestion[];
  }