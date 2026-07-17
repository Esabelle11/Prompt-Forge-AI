export interface ReviewIssue {

    title:string;

    severity:
      | "critical"
      | "high"
      | "medium"
      | "low";

    description:string;

    recommendation:string;

}


export interface AgentReview {

    agent:string;

    issues:ReviewIssue[];

    score:number;

}


export interface FinalReview {

    architecture:AgentReview;

    security:AgentReview;

    qa:AgentReview;

}