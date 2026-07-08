# Prompt Linter

A Developer Experience (DX) tool that improves the quality of developer prompts before AI-powered code generation.

Instead of immediately generating code from a vague prompt, Prompt Linter performs an intelligent review, identifies missing information, and produces a structured specification for higher-quality code generation.

## Features

- **Prompt Analysis** — Score, issues, and suggestions for your prompt
- **Improved Prompt** — Production-ready version of your original prompt
- **Why Better** — Educational explanations for each improvement
- **Generate with Codex** — Create a project scaffold from the refined prompt

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- OpenAI Responses API

## Workflow

1. Click the **API Key** button in the app header to enter OpenAI API key it
2. Write your initial prompt (e.g. "Build me a website")
3. Click **Analyze Prompt** to get a quality score, issues, and suggestions
4. Review the improved prompt and explanations
5. Click **Generate with Codex** to create a production-ready project scaffold
