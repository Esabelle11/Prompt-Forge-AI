# PromptForge AI

> Transform human ideas into production-ready engineering specifications before AI writes a single line of code.

PromptForge AI is an AI-powered software engineering workflow that sits between a human idea and an AI coding agent such as Codex. Instead of sending vague prompts directly to an LLM, PromptForge AI performs requirements engineering, specification compilation, multi-agent engineering review, production-readiness prediction, and finally generates a production-grade implementation brief that AI coding agents can reliably execute.

The goal is simple:

> **Better specifications produce better software.**
> [Try it out](https://prompt-forge-ai-delta.vercel.app)
>  [![Watch Demo](https://img.youtube.com/vi/3kM00AKnHXY/maxresdefault.jpg)](https://youtu.be/3kM00AKnHXY)

---
# Table of Contents
- [Why I Built This](#why-i-built-this)
- [The Problem](#the-problem)
- [The Solution](#the-solution)
- [Features](#features)
  - [Prompt Analysis](#prompt-analysis)
  - [Requirement Interview Agent](#requirement-interview-agent)
  - [Specification Compiler](#specification-compiler)
  - [AI Engineering Council](#ai-engineering-council)
  - [Consensus Engineering Specification](#consensus-engineering-specification)
  - [Code Generation Quality Predictor](#code-generation-quality-predictor)
  - [Production README Generator](#production-readme-generator)
  - [Codex Integration](#codex-integration)
- [Workflow](#workflow)
- [Getting Started](#getting-started)
- [Technology Stack](#technology-stack)
- [Built with OpenAI Codex & GPT-5.6](#built-with-openai-codex--gpt-56)
- [Why This Matters](#why-this-matters)
- [Future Roadmap](#future-roadmap)
- [Vision](#vision)
---

# Why I Built This

The recent generation of AI coding agents—including Codex, Cursor, Claude Code, Gemini CLI, and similar tools—are remarkably capable at implementing software.

However, they all share the same limitation:

**They can only build what the prompt describes.**

In practice, many developers submit prompts such as:

> "Build me an e-commerce website."

or

> "Create a CRM."

The AI then makes dozens of assumptions:

* Which users?
* Authentication?
* Database?
* Folder structure?
* API design?
* Security model?
* Deployment?
* Testing strategy?

Every missing requirement forces the coding agent to guess.

The result is often:

* inconsistent architectures
* security issues
* missing features
* repeated prompting
* wasted tokens
* unnecessary regeneration

The real bottleneck is no longer code generation.

The bottleneck is **requirements engineering.**

PromptForge AI was built to solve that problem.

---

# The Problem

Today's AI coding workflow typically looks like this:

```
Human Idea
      │
      ▼
AI Coding Agent
      │
      ▼
Generated Code
```

Unfortunately, AI receives incomplete requirements and fills the gaps using assumptions.

Those assumptions frequently lead to:

* incorrect architectures
* weak security
* inconsistent APIs
* missing business requirements
* additional prompting cycles
* expensive regeneration

---

# The Solution

PromptForge AI introduces an AI Software Engineering workflow before code generation.

```
Human Idea
      │
      ▼
Prompt Analysis
      │
      ▼
Requirement Interview
      │
      ▼
Specification Compiler
      │
      ▼
AI Engineering Council
      │
      ▼
Consensus Engineering Specification
      │
      ▼
Quality Predictor
      │
      ▼
Production README
      │
      ▼
Codex
      │
      ▼
Production Project
```

Instead of prompting an AI coder directly, PromptForge AI first behaves like an experienced engineering team.

---

# Features

## Prompt Analysis

Evaluates the prompt for engineering completeness.

Produces:

* Prompt quality score
* Missing requirements
* Engineering suggestions
* Interview decision

---

## Requirement Interview Agent

If critical information is missing, PromptForge AI dynamically interviews the developer.

Examples include:

* Target users
* Authentication
* Database
* Technology stack
* Deployment platform
* Security requirements
* Core functionality

The interview continues until enough information exists to build reliable software.

---

## Specification Compiler

All collected information is transformed into a structured software engineering specification.

Rather than sending a natural language prompt into an AI coding agent, PromptForge AI produces an implementation-ready specification.

---

## AI Engineering Council

PromptForge AI simulates an engineering review board composed of multiple specialist agents.

### Architect AI

Reviews:

* scalability
* modularity
* maintainability
* system architecture

---

### Security AI

Reviews:

* authentication
* authorization
* secrets
* API security
* vulnerabilities

---

### QA AI

Reviews:

* testing strategy
* edge cases
* validation
* production readiness

---

## Consensus Engineering Specification

Instead of trusting a single model response, PromptForge AI merges feedback from multiple engineering specialists into one unified implementation specification.

---

## Code Generation Quality Predictor

Before code generation, PromptForge AI estimates implementation readiness.

Evaluation includes:

* requirement completeness
* architectural consistency
* implementation risk
* maintainability
* production readiness

This allows developers to identify specification issues before spending tokens on code generation.

---

## Production README Generator

PromptForge AI produces a production-ready implementation document.

The README contains:

* Project Objective
* Functional Requirements
* Architecture
* Folder Structure
* Database Design
* API Requirements
* Security Requirements
* Testing Strategy
* Definition of Done

The document can be:

* reviewed by humans
* shared with engineering teams
* committed into repositories
* exported as Markdown
* supplied directly to AI coding agents

---

## Codex Integration

Once the specification reaches production quality, PromptForge AI sends the implementation brief to Codex to generate the software project.

This greatly reduces hallucination and improves implementation consistency.

---

# Workflow

```
Human Idea
      │
      ▼
Prompt Analysis
      │
      ▼
Requirement Interview
      │
      ▼
Specification Compiler
      │
      ▼
Architecture Review
      │
      ▼
Security Review
      │
      ▼
QA Review
      │
      ▼
Consensus Specification
      │
      ▼
Production Readiness Prediction
      │
      ▼
Production README
      │
      ▼
Codex Project Generation
```

---

# Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

# Technology Stack

* Next.js 15
* React
* TypeScript
* Tailwind CSS
* OpenAI Responses API
* GPT-5.6
* Codex

---


# Built with OpenAI Codex & GPT-5.6

PromptForge AI was built around the idea that AI coding agents produce better software when they receive better engineering context.

## How GPT-5.6 Was Used

GPT-5.6 powers the core intelligence layer of PromptForge AI.

It is used for:

### Prompt Analysis Agent
GPT-5.6 analyzes raw developer ideas and identifies:
- missing requirements
- ambiguous specifications
- potential implementation risks
- areas requiring clarification

### Requirement Engineering Agent
GPT-5.6 acts as a software analyst by conducting requirement interviews and converting incomplete ideas into structured requirements.

### Engineering Review Council
Multiple GPT-5.6-powered agents simulate different engineering roles:

- Architect Agent:
  Reviews architecture decisions, scalability, and maintainability.

- Security Agent:
  Reviews authentication, authorization, API security, and potential vulnerabilities.

- QA Agent:
  Reviews testing strategy, edge cases, and production readiness.

### Specification Compiler
GPT-5.6 transforms the collected requirements and engineering feedback into a structured implementation specification designed for AI coding agents.

---

## How Codex Was Used

Codex is the final implementation agent in the PromptForge workflow.

Instead of sending Codex an ambiguous user prompt:

---

# Why This Matters

PromptForge AI shifts AI-assisted software development from **prompt engineering** to **requirements engineering**.

Instead of asking developers to become experts at prompting AI, PromptForge AI applies software engineering methodology to produce specifications that AI coding agents can reliably execute.

This reduces ambiguity, improves code quality, and enables AI coding agents to behave more like production software teams rather than autocomplete systems.

---

# Future Roadmap

* Persistent project memory
* Multi-round engineering debate
* Cost estimation
* Timeline prediction
* Architecture diagrams
* Database schema generation
* API contract generation
* CI/CD planning
* Infrastructure planning
* GitHub integration
* Jira export
* Figma requirement import
* Human approval checkpoints
* Multi-agent planning for large software projects

---

# Vision

PromptForge AI is not another AI coding assistant.

It is an AI Software Engineering System that transforms incomplete ideas into production-ready engineering specifications before code generation begins.

The long-term vision is to enable AI coding agents to work from the same level of engineering documentation that experienced software teams rely on today.
