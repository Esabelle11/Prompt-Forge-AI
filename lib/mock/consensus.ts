export const mockConsensus = `
# Final Project Specification

## Project Overview

Develop a production-ready AI-powered task management platform that enables organizations to manage projects, assign work, collaborate efficiently, and leverage AI for task prioritization and productivity improvements.

The system should emphasize scalability, security, maintainability, and an excellent developer experience while remaining extensible for future AI capabilities.

---

## Final Architecture Decisions

### Architecture Style

Adopt a modular service-oriented architecture.

Application Layers:

- Presentation Layer
- API Layer
- Business Service Layer
- Data Access Layer
- AI Service Layer

This separation improves maintainability, testing, and long-term scalability.

### Scalability Decisions

The system must support:

- Stateless API services
- Horizontal scaling
- Background workers for AI processing
- Database indexing
- Pagination
- Redis caching for frequently accessed data

Long-running AI requests should never block HTTP requests.

### Maintainability

- Feature-based project structure
- Shared UI component library
- Strict TypeScript
- Dependency injection where appropriate
- Centralized configuration management

---

## Technology Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui

### Backend

- Next.js Route Handlers
- Node.js

### Database

- PostgreSQL
- Supabase

### Authentication

- Supabase Auth
- JWT Authentication

### AI

- OpenAI Responses API

### Infrastructure

- Vercel
- GitHub Actions
- Redis (Caching)
- Background Job Queue

---

## Database Design

Core Tables

- users
- organizations
- projects
- tasks
- task_comments
- attachments
- notifications
- audit_logs

Relationships

- Organization → Projects
- Project → Tasks
- Task → Comments
- User → Assigned Tasks

Requirements

- Foreign key constraints
- Proper indexing
- Soft delete support
- Automatic timestamps

---

## Security Requirements

Authentication

- Secure login
- OAuth support
- Password reset

Authorization

- Role-Based Access Control (RBAC)
- Resource-level permission checks

Data Protection

- HTTPS only
- Encryption at rest
- Encryption in transit

Secrets

- Environment variables only
- No secrets committed to source control

API Security

- Input validation
- Rate limiting
- CSRF protection (where applicable)
- SQL Injection prevention
- XSS protection

AI Security

- Prompt injection mitigation
- Input sanitization
- Output validation
- Fallback responses for AI failures

Audit

Record:

- Login events
- Administrative actions
- Permission changes
- Sensitive data access

---

## API Design

Authentication

- POST /api/auth/login
- POST /api/auth/logout

Projects

- GET /api/projects
- POST /api/projects
- PUT /api/projects/:id
- DELETE /api/projects/:id

Tasks

- GET /api/tasks
- POST /api/tasks
- PUT /api/tasks/:id
- DELETE /api/tasks/:id

AI

- POST /api/ai/prioritize
- POST /api/ai/summarize

General Requirements

- Consistent error responses
- Request validation
- Versioned APIs
- OpenAPI documentation

---

## Testing Strategy

Unit Tests

- Business services
- Utility functions
- Validation logic

Integration Tests

- API endpoints
- Database interactions
- Authentication

End-to-End Tests

- User registration
- Authentication
- Project lifecycle
- Task management
- AI workflows

Performance Tests

- Concurrent users
- API latency
- Database query performance

Security Tests

- Authorization checks
- Injection attacks
- Rate limiting
- Authentication failures

Regression Tests

Automatically execute during CI/CD before deployment.

---

## Acceptance Criteria

The implementation is complete when:

- Users can authenticate securely.
- Role permissions are enforced correctly.
- Projects and tasks can be managed successfully.
- AI-generated recommendations function correctly.
- APIs pass integration testing.
- Security validation passes.
- Performance targets are met.
- Automated tests pass successfully.
- Application is deployable without manual intervention.

---

## Implementation Constraints

- Use TypeScript strict mode.
- Follow clean architecture principles.
- Keep business logic independent of UI.
- Use reusable service modules.
- Maintain feature-based folder organization.
- Do not hardcode configuration values.
- Store secrets securely.
- Ensure all AI interactions include validation and fallback handling.
- All new functionality must include automated tests.
- All public APIs must be documented before release.
`;