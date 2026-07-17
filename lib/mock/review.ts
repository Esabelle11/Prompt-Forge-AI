export const mockArchitecture = {
    agent: "architect",
  
    score: 92,
  
    issues: [
      {
        title: "Monolithic AI Workflow",
        severity: "high",
        description:
          "The AI workflow is described as a single execution pipeline, making it difficult to extend, monitor, or replace individual stages.",
        recommendation:
          "Separate the pipeline into independent modules such as Analysis, Interview, Specification Generation, Review, and Code Generation.",
      },
      {
        title: "No Event-Driven Processing",
        severity: "medium",
        description:
          "The architecture relies solely on synchronous request-response communication.",
        recommendation:
          "Introduce asynchronous events or background workers for heavy processing tasks.",
      },
      {
        title: "Missing Observability",
        severity: "medium",
        description:
          "Logging, metrics, tracing, and monitoring are not included in the architecture.",
        recommendation:
          "Add centralized logging, distributed tracing, health checks, and metrics collection.",
      },
      {
        title: "Scalability Considerations",
        severity: "low",
        description:
          "The specification does not explain how services should scale horizontally.",
        recommendation:
          "Document stateless service design, load balancing, and autoscaling recommendations.",
      },
    ],
};

export const mockSecurity = {
agent: "security",

score: 90,

issues: [
    {
    title: "Authentication Token Security",
    severity: "medium",
    description:
        "The specification does not define token expiration, refresh strategy, session invalidation, or protection against token theft.",
    recommendation:
        "Use short-lived access tokens, secure refresh tokens, HTTP-only cookies, and session revocation mechanisms.",
    },
    {
    title: "Sensitive Data Exposure Risk",
    severity: "high",
    description:
        "The database requirements do not specify encryption requirements for personally identifiable information or confidential business data.",
    recommendation:
        "Encrypt sensitive data at rest and in transit. Apply field-level encryption where appropriate.",
    },
    {
    title: "Insufficient Input Validation",
    severity: "medium",
    description:
        "User-generated content and API inputs may introduce SQL injection, XSS, or malicious payload risks.",
    recommendation:
        "Apply schema validation, parameterized queries, output encoding, and strict API contracts.",
    },
    {
    title: "Dependency Security Management",
    severity: "low",
    description:
        "The specification does not mention dependency vulnerability scanning.",
    recommendation:
        "Integrate automated dependency scanning tools into CI/CD pipelines.",
    },
    {
    title: "Missing Security Monitoring",
    severity: "low",
    description:
        "The architecture lacks monitoring for suspicious activity and security events.",
    recommendation:
        "Add centralized security logging, alerts, and anomaly detection.",
    },
],
};


export const mockQA = {
    agent: "qa",
  
    score: 91,
  
    issues: [
      {
        title: "AI Feature Testing Strategy Missing",
        severity: "high",
        description:
          "The specification includes AI-powered functionality but does not define how AI output quality, reliability, and failure scenarios should be tested.",
        recommendation:
          "Create AI evaluation criteria including response accuracy, hallucination handling, prompt safety validation, and fallback behavior.",
      },
      {
        title: "Missing End-to-End Scenarios",
        severity:
          "medium",
        description:
          "Individual features are defined, but complete user journeys across multiple system components are not documented.",
        recommendation:
          "Create end-to-end scenarios covering authentication, core workflows, integrations, and recovery paths.",
      },
      {
        title: "No Performance Testing Requirements",
        severity:
          "medium",
        description:
          "The specification does not define expected performance thresholds for API response time, concurrent users, or system load.",
        recommendation:
          "Define performance benchmarks and load testing scenarios.",
      },
      {
        title: "Insufficient Regression Testing Plan",
        severity:
          "low",
        description:
          "The specification does not define how future changes should avoid breaking existing functionality.",
        recommendation:
          "Establish automated regression tests executed during CI/CD deployment.",
      },
    ],
};



export const mockFinalSpecification = `
# Overview

## Project Name

AI Task Management Platform

## Purpose

Build a production-ready AI-powered task management platform that enables teams to organize projects, manage tasks, collaborate efficiently, and leverage AI assistance for prioritization and productivity improvements.

The platform should support secure authentication, role-based access control, scalable architecture, and reliable AI integrations.

## Target Users

- Organization Administrators
- Project Managers
- Team Members

---

# Architecture

## System Architecture

The application follows a modular full-stack architecture.

High-level flow:

Client Application

↓

API Layer

↓

Business Service Layer

↓

Database Layer

↓

External Services (AI APIs, Authentication)

---

## Frontend Architecture

Technology:

- Next.js
- React
- TypeScript
- Tailwind CSS

Structure:

- Feature-based modules
- Reusable UI components
- Client/server component separation
- Centralized API communication layer

---

## Backend Architecture

The backend follows a service-oriented approach.

Responsibilities:

API Layer:
- Request validation
- Authentication verification
- Response formatting

Service Layer:
- Business logic
- AI workflow orchestration
- Data processing

Database Layer:
- Persistent storage
- Query optimization
- Data integrity

---

## Scalability Considerations

The system should support:

- Horizontal API scaling
- Stateless backend services
- Database indexing
- Caching for frequently accessed data
- Background processing for long-running AI tasks

AI processing should support asynchronous execution using background jobs.

---

# Technology Stack

## Frontend

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui

## Backend

- Next.js API Routes
- Node.js runtime

## Database

- PostgreSQL
- Supabase

## Authentication

- Supabase Auth
- JWT-based authentication

## AI Integration

- OpenAI Responses API

## Deployment

- Vercel
- Supabase Cloud

---

# Database

## Tables

### users

Stores user identity information.

Fields:

- id
- email
- password_hash
- role_id
- created_at


### organizations

Stores company or team information.

Fields:

- id
- name
- created_at


### projects

Stores project information.

Fields:

- id
- organization_id
- name
- description
- status
- created_at


### tasks

Stores user tasks.

Fields:

- id
- project_id
- assigned_user_id
- title
- description
- priority
- status
- due_date


### audit_logs

Stores security and activity records.

Fields:

- id
- user_id
- action
- timestamp

---

# Security

## Authentication

Requirements:

- Secure login
- Session management
- Password reset
- OAuth support

---

## Authorization

Implement:

- Role-based access control
- API permission validation
- Resource-level authorization

Roles:

- Admin
- Manager
- Member

---

## Data Protection

Requirements:

- Encrypt sensitive data
- HTTPS communication
- Secure database credentials
- Environment-based secrets management

---

## API Security

Implement:

- Request validation
- Rate limiting
- Authentication middleware
- Input sanitization
- SQL injection prevention
- XSS protection

---

## AI Security

AI workflows must include:

- Prompt injection protection
- Input filtering
- Output validation
- Sensitive information protection

---

# APIs

## Authentication APIs

### POST /api/auth/login

Purpose:

Authenticate users.

---

### POST /api/auth/logout

Purpose:

Terminate user sessions.

---

## Project APIs

### GET /api/projects

Retrieve user projects.

---

### POST /api/projects

Create new project.

---

## Task APIs

### GET /api/tasks

Retrieve tasks.

---

### POST /api/tasks

Create task.

---

### PUT /api/tasks/:id

Update task.

---

### DELETE /api/tasks/:id

Delete task.

---

## AI APIs

### POST /api/ai/prioritize

Analyze tasks and generate priority recommendations.

---

### POST /api/ai/summarize

Generate AI summaries.

---

# Testing

## Unit Testing

Cover:

- Business logic
- Validation rules
- Utility functions

---

## Integration Testing

Cover:

- API endpoints
- Database operations
- Authentication flows

---

## End-to-End Testing

Required scenarios:

1. User registration and login
2. Creating projects
3. Creating and assigning tasks
4. AI recommendation workflow
5. Permission validation

---

## Security Testing

Validate:

- Authentication bypass attempts
- Unauthorized access
- Input injection
- API abuse scenarios

---

## AI Testing

Validate:

- Response quality
- Invalid input handling
- Prompt injection resistance
- Output consistency

---

# Acceptance Criteria

The system is considered complete when:

## Authentication

- Users can securely login and logout.
- Unauthorized users cannot access protected resources.

## Project Management

- Users can create and manage projects.
- Users can create, update, and delete tasks.

## AI Features

- AI recommendations are generated successfully.
- AI failures return meaningful fallback responses.

## Security

- APIs enforce authorization rules.
- Sensitive information is protected.

## Quality

- Automated tests pass.
- Application can be deployed successfully.

---

# Implementation Notes

## Development Guidelines

- Follow clean architecture principles.
- Use TypeScript strict mode.
- Keep business logic independent from UI components.
- Implement reusable services.

## Required Improvements From Review Board

Architect:

- Add service layer separation.
- Support asynchronous AI processing.
- Define scalability strategy.

Security:

- Implement RBAC.
- Add API rate limiting.
- Protect AI workflows against prompt injection.
- Implement audit logging.

QA:

- Add acceptance criteria.
- Define edge cases.
- Create automated regression tests.

---

# Deliverables

The final implementation should include:

- Complete Next.js application
- Database schema
- Authentication system
- API documentation
- AI integration layer
- Automated test suite
- Deployment configuration
- Developer documentation
`;