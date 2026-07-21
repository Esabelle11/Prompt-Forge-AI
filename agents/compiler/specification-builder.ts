import { createOpenAIClient } from "@/lib/openai";
import { DEFAULT_ANALYZE_MODEL } from "@/lib/models";

interface CompileInput {
  prompt: string;
  analysis: any;
  interviewAnswers: Record<string, string>;
  model?: string;
  apiKey?: string;
}

export async function buildSpecification({
  prompt,
  analysis,
  interviewAnswers,
  model,
  apiKey,
}: CompileInput) {
 
  // console.log(`In buildSpecification, model :${model}`);

  const openai = createOpenAIClient(apiKey);

  const response = await openai.responses.create({
    model: model?model:DEFAULT_ANALYZE_MODEL,

    input: `
You are a Principal Software Architect.

Your responsibility is NOT to write code.

Your job is to convert an initial software idea into a complete,
production-ready engineering specification that another AI coding
agent (such as Codex) can implement.

------------------------------------------------
Input
------------------------------------------------

Original Prompt

${prompt}

------------------------------------------------

Prompt Analysis

${JSON.stringify(analysis, null, 2)}

------------------------------------------------

Interview Answers

${JSON.stringify(interviewAnswers, null, 2)}

------------------------------------------------

Instructions

Generate a software engineering specification.

Preserve the user's intent.

Do not invent unnecessary features.

If interview answers contain additional information,
merge them naturally.

Think like a Senior Software Architect.

Organize the specification into sections.

Include only relevant sections.

------------------------------------------------

Required Sections

# Project Overview

# Target Users

# Functional Requirements

# Non-functional Requirements

# Recommended Technology Stack

# System Architecture

# Database Requirements

# External Integrations

# Security Requirements

# API Requirements

# Deployment

# Testing Strategy

# Acceptance Criteria

# Deliverables

Return Markdown only.

`,
  });

  return response.output_text;
}