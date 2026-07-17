export const mockCompiler = `
# Project Overview

Build a modern AI-powered task management platform that helps teams organize projects, assign work, and track progress using intelligent automation.

The system should provide real-time collaboration, secure authentication, and AI-assisted task prioritization.

---

# Target Users

- Team Members
- Project Managers
- Organization Administrators

---

# Functional Requirements

## Authentication

- Email/password login
- Google OAuth
- Password reset
- Role-based access control

## Dashboard

- View assigned tasks
- View project statistics
- Recent activity feed

## Task Management

- Create tasks
- Edit tasks
- Delete tasks
- Assign members
- Set priorities
- Due dates
- Labels
- Comments
- File attachments

## Project Management

- Create projects
- Invite members
- Archive projects
- Configure project settings

## AI Features

- Automatically prioritize tasks
- Generate task summaries
- Suggest deadlines
- Detect overdue risks

---

# Non-functional Requirements

- Responsive UI
- Mobile friendly
- Fast page load
- Accessible (WCAG AA)
- Production-ready architecture
- Scalable backend

---

# Recommended Technology Stack

Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui

Backend

- Next.js Route Handlers
- OpenAI Responses API

Database

- PostgreSQL
- Supabase

Authentication

- Supabase Auth

Hosting

- Vercel

---

# System Architecture

Client

↓

API Layer

↓

Business Logic

↓

Database

↓

OpenAI Services

---

# Database Requirements

Tables

- users
- organizations
- projects
- tasks
- task_comments
- attachments
- activity_logs

Relationships

- One organization has many projects
- One project has many tasks
- One task has many comments

---

# External Integrations

- OpenAI Responses API
- Supabase
- Google OAuth

---

# Security Requirements

- JWT authentication
- Role-based authorization
- Input validation
- API rate limiting
- Secure environment variables
- HTTPS only

---

# API Requirements

Authentication

- POST /login
- POST /logout

Projects

- GET /projects
- POST /projects

Tasks

- GET /tasks
- POST /tasks
- PUT /tasks/:id
- DELETE /tasks/:id

AI

- POST /ai/prioritize
- POST /ai/summarize

---

# Deployment

- Deploy frontend on Vercel
- PostgreSQL hosted on Supabase
- Environment variable management
- CI/CD with GitHub Actions

---

# Testing Strategy

Unit Tests

- Business logic

Integration Tests

- API endpoints

End-to-End Tests

- Authentication
- Task workflows
- Project workflows

Performance Tests

- API response times
- Database queries

---

# Acceptance Criteria

- Users can authenticate securely.
- Users can manage projects and tasks.
- AI recommendations are generated successfully.
- API endpoints pass integration tests.
- Application is production-ready.

---

# Deliverables

- Complete Next.js application
- Backend API
- Database schema
- Authentication system
- AI integration
- Deployment configuration
- Documentation
`;