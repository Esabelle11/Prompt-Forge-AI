
import type { InterviewResult } from "@/types/interview";


export const mockInterview: InterviewResult = {
    needsInterview: true,
  
    questions: [
      {
        id: "target_users",
        question: "Who are the primary users of this application?",
        reason:
          "Different user roles require different permissions and workflows.",
        type: "choice",
        options: [
          "Customers",
          "Internal Staff",
          "Administrators",
          "Business Owners",
        ],
      },
      {
        id: "platform",
        question: "Which platform should this application support?",
        reason:
          "Platform selection affects architecture and technology decisions.",
        type: "choice",
        options: [
          "Web",
          "Mobile",
          "Desktop",
          "Web + Mobile",
        ],
      },
      {
        id: "authentication",
        question: "How should users authenticate?",
        reason:
          "Authentication determines security and user management implementation.",
        type: "choice",
        options: [
          "Email & Password",
          "Google Login",
          "Microsoft Login",
          "No Authentication",
        ],
      },
      {
        id: "database",
        question: "What database should be used?",
        reason:
          "The data model and infrastructure depend on database selection.",
        type: "choice",
        options: [
          "PostgreSQL",
          "MySQL",
          "MongoDB",
          "Supabase",
        ],
      },
      {
        id: "deployment",
        question: "Where will the application be deployed?",
        reason:
          "Deployment environment influences configuration and DevOps setup.",
        type: "choice",
        options: [
          "Vercel",
          "AWS",
          "Azure",
          "Docker Self-hosted",
        ],
      },
      {
        id: "core_features",
        question: "Describe the most important features your application should provide.",
        reason:
          "Core functionality is required before a software specification can be generated.",
        type: "text",
      },
    ],
};


export const mockInterviewResultSmall: InterviewResult = {
    needsInterview: true,
  
    questions: [
      {
        id: "deployment",
        question: "Where should the application be deployed?",
        reason: "Deployment affects infrastructure and CI/CD configuration.",
        type: "choice",
        options: [
          "Vercel",
          "AWS",
          "Azure",
        ],
      },
      {
        id: "security",
        question: "Are there any security or compliance requirements?",
        reason: "Security requirements influence architecture decisions.",
        type: "text",
      },
    ],
};


export const mockInterviewComplete: InterviewResult = {
    needsInterview: false,
    questions: [],
};



export const mockInterviewAdvanced: InterviewResult = {
    needsInterview: true,
  
    questions: [
      {
        id: "user_roles",
        question: "Which user roles should the system support?",
        reason:
          "Role definitions determine authorization, dashboards, and permissions.",
        type: "choice",
        options: [
          "Admin",
          "Manager",
          "Employee",
          "Customer",
        ],
      },
      {
        id: "integrations",
        question: "Should the system integrate with any external services or APIs?",
        reason:
          "External integrations affect architecture and implementation complexity.",
        type: "text",
      },
      {
        id: "performance",
        question: "Are there any performance or scalability requirements?",
        reason:
          "Performance goals influence system architecture and infrastructure decisions.",
        type: "text",
      },
      {
        id: "notifications",
        question: "Should users receive notifications?",
        reason:
          "Notification requirements determine messaging infrastructure.",
        type: "choice",
        options: [
          "Email",
          "SMS",
          "Push Notification",
          "None",
        ],
      },
      {
        id: "database",
        question: "Which database technology do you prefer?",
        reason:
          "Database selection impacts schema design and deployment.",
        type: "choice",
        options: [
          "PostgreSQL",
          "MySQL",
          "MongoDB",
          "SQLite",
          "Supabase",
        ],
      },
      {
        id: "deployment",
        question: "What is your preferred deployment target?",
        reason:
          "Deployment environment determines CI/CD and hosting configuration.",
        type: "choice",
        options: [
          "Vercel",
          "AWS",
          "Google Cloud",
          "Azure",
          "Docker",
        ],
      },
    ],
};
