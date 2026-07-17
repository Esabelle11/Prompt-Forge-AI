export const mockQualityPrediction = {
    qualityScore: 91,
  
    confidence: "high",
  
    risks: [
      {
        category: "Requirement Completeness",
        severity: "low",
        description:
          "The specification covers core functional requirements and user workflows. Some minor business rules may still require clarification during implementation.",
      },
      {
        category: "Architecture",
        severity: "low",
        description:
          "The architecture is well-defined with clear separation of responsibilities. Future microservice extraction requirements are not specified but are not required for the current scope.",
      },
      {
        category: "AI Integration Reliability",
        severity: "medium",
        description:
          "AI-powered features may produce inconsistent outputs without explicit evaluation metrics and fallback handling.",
      },
      {
        category: "Deployment Configuration",
        severity: "low",
        description:
          "Deployment requirements are defined, but infrastructure monitoring and disaster recovery strategies are not specified.",
      },
    ],
  
    recommendations: [
      "Define additional AI evaluation metrics including response accuracy and reliability thresholds.",
      "Add production monitoring requirements including logging, metrics, and alerting.",
      "Document environment configuration and secret management procedures.",
      "Include rollback and recovery procedures for production deployment.",
    ],
  
    readyForCodeGeneration: true,
};


export const mockQualityPredictionFail = {
    qualityScore: 54,
  
    confidence: "medium",
  
    risks: [
      {
        category: "Requirement Completeness",
        severity: "high",
        description:
          "The specification lacks detailed user workflows, feature priorities, and acceptance criteria.",
      },
      {
        category: "Architecture Clarity",
        severity: "high",
        description:
          "System boundaries, service responsibilities, and data flow are not clearly defined.",
      },
      {
        category: "Security Readiness",
        severity: "medium",
        description:
          "Authentication, authorization, and sensitive data protection requirements are incomplete.",
      },
      {
        category: "Database Clarity",
        severity: "high",
        description:
          "Database entities, relationships, indexing strategy, and data lifecycle rules are missing.",
      },
      {
        category: "Testing Requirements",
        severity: "medium",
        description:
          "Testing strategy does not define scenarios, coverage expectations, or acceptance validation.",
      },
    ],
  
    recommendations: [
      "Complete missing functional requirements before implementation.",
      "Define database schema and entity relationships.",
      "Add security requirements including authentication and authorization.",
      "Create measurable acceptance criteria.",
      "Specify deployment environment and operational requirements.",
    ],
  
    readyForCodeGeneration: false,
};




