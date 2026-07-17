export const mockCodexBrief = `
# Codex Implementation Brief

## Objective

Build a production-ready AI-powered task management platform based on the approved engineering specification.

The implementation must prioritize:

- Maintainable architecture
- Secure authentication and authorization
- Scalable backend design
- Reliable AI integration
- Comprehensive automated testing

Do not introduce features outside the approved specification.

---

# Required Features

## Authentication

Implement:

- User registration
- User login
- User logout
- Password reset
- Session management

Requirements:

- Secure authentication flow
- Protected application routes
- Unauthorized access prevention


## User Management

Support:

- User profiles
- Role assignment
- Permission management


## Project Management

Users must be able to:

- Create projects
- Update projects
- View projects
- Archive projects


## Task Management

Implement:

- Create tasks
- Update tasks
- Delete tasks
- Assign tasks to users
- Set task priority
- Set deadlines
- Add comments


## AI Features

Implement AI-powered capabilities:

- Task prioritization
- Task summarization

AI failures must:

- Return meaningful errors
- Avoid breaking the main application workflow

---

# Architecture

Implement the application using a modular architecture.

## Frontend Layer

Responsibilities:

- User interface
- Client interactions
- Form validation
- State management


## API Layer

Responsibilities:

- Request validation
- Authentication checks
- Response formatting


## Service Layer

Responsibilities:

- Business logic
- AI orchestration
- Data processing


## Database Layer

Responsibilities:

- Data persistence
- Query optimization
- Data integrity


## Background Processing

Long-running operations such as AI processing should support asynchronous execution.

---

# Technology Requirements

## Frontend

Required:

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui


## Backend

Required:

- Next.js API Routes
- Node.js runtime


## Database

Required:

- PostgreSQL
- Supabase


## Authentication

Required:

- Supabase Auth
- JWT-based sessions


## AI Integration

Required:

- OpenAI Responses API


## Deployment

Required:

- Vercel deployment
- Environment variable configuration
- CI/CD pipeline support

---

# Folder Structure

Recommended structure:

\`\`\`
src/
|
├── app/
│   ├── api/
│   ├── dashboard/
│   └── auth/
|
├── components/
│   ├── ui/
│   └── features/
|
├── features/
│   ├── projects/
│   ├── tasks/
│   └── users/
|
├── services/
│   ├── ai/
│   ├── auth/
│   └── database/
|
├── lib/
│   ├── supabase/
│   └── utils/
|
├── types/
|
└── tests/
\`\`\`

---

# Database Requirements

Implement the following tables:

## users

Fields:

- id
- email
- password_hash
- role_id
- created_at


## organizations

Fields:

- id
- name
- created_at


## projects

Fields:

- id
- organization_id
- name
- description
- status
- created_at


## tasks

Fields:

- id
- project_id
- assigned_user_id
- title
- description
- priority
- status
- due_date


## audit_logs

Fields:

- id
- user_id
- action
- timestamp


Database requirements:

- Use foreign key constraints.
- Add required indexes.
- Validate relationships.
- Prevent orphan records.

---

# API Requirements

## Authentication APIs

### POST /api/auth/login

Purpose:

Authenticate users.


### POST /api/auth/logout

Purpose:

Invalidate sessions.


---

## Project APIs

### GET /api/projects

Return accessible projects.


### POST /api/projects

Create a project.


### PUT /api/projects/:id

Update project.


### DELETE /api/projects/:id

Delete project.


---

## Task APIs

### GET /api/tasks

Retrieve tasks.


### POST /api/tasks

Create task.


### PUT /api/tasks/:id

Update task.


### DELETE /api/tasks/:id

Delete task.


---

## AI APIs

### POST /api/ai/prioritize

Generate task priority recommendations.


### POST /api/ai/summarize

Generate task summaries.

---

# Security Rules

Implementation must include:

## Authentication Security

- Secure session handling
- Protected API routes
- Password security


## Authorization

Implement:

- Role-based access control
- Permission validation
- Resource ownership checks


## Data Protection

Required:

- HTTPS communication
- Secure environment variables
- No secrets in source code


## API Security

Implement:

- Input validation
- Rate limiting
- Error sanitization
- SQL injection prevention


## AI Security

Implement:

- Prompt injection protection
- User input sanitization
- AI output validation

---

# Testing Requirements

## Unit Testing

Test:

- Business logic
- Validation functions
- Utility modules


## Integration Testing

Test:

- API endpoints
- Authentication
- Database operations


## End-to-End Testing

Test workflows:

1. User authentication
2. Project creation
3. Task management
4. AI feature usage


## Security Testing

Verify:

- Unauthorized access prevention
- Invalid input handling
- Permission enforcement


---

# Definition of Done

The implementation is complete when:

- All required features are implemented.
- Architecture follows the approved design.
- Database schema is created successfully.
- APIs are documented and tested.
- Authentication and authorization are secure.
- Automated tests pass.
- Deployment configuration is complete.
- No critical security issues remain.
- Application can be deployed to production.
`;