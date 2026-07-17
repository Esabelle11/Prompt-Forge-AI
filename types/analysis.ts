// export interface AnalysisResult {
//     score: number;

//     issues: {
//         title: string;
//         severity: "high" | "medium" | "low";
//         description: string;
//     }[];

//     suggestions: string[];

//     improvedPrompt: string;

//     explanation: {
//         change: string;
//         reason: string;
//     }[];
// }

export interface AnalysisResult {
    score: number;
  
    issues: {
      title: string;
      severity: "high" | "medium" | "low";
      description: string;
    }[];
  
    suggestions: string[];
  
    // NEW
    needsInterview: boolean;
  
    interviewReason: string;
}