import { NextResponse } from "next/server";
import { InterviewResult } from "@/types/interview";
import { createOpenAIClient } from "@/lib/openai";


export async function buildAgent(
  productionPrompt: string,
  model: string,
  apiKey?: string,
){
  const openai =createOpenAIClient(apiKey);

  const response = await openai.responses.create({
    model,
    text: { format: { type: "json_object" }, },
    input: `
        You are Codex, an expert AI software engineer.
        
        Your task is to implement a complete production-ready
        software project based on the engineering specification
        provided below.
        
        The specification has already passed:
        
        ✓ Requirement analysis
        ✓ Product requirement interview
        ✓ Architecture review
        ✓ Security review
        ✓ QA review
        ✓ Quality prediction
        
        
        Your responsibility:
        
        - Implement the approved architecture.
        - Generate complete runnable source code.
        - Follow engineering best practices.
        - Create maintainable project structure.
        - Include required configuration.
        - Include documentation.
        
        
        Implementation Rules:
        
        1. Generate all required project files.
        
        2. Every file must contain complete content.
        
        3. Do not use placeholders.
        
        4. Do not write:
           - TODO
           - "implement later"
           - pseudo code
        
        5. Keep dependencies minimal.
        
        6. Follow the requested technology stack.
        
        7. If technology stack is not specified:
           Default to:
        
           - Next.js 15
           - App Router
           - TypeScript
           - Tailwind CSS
        
        
        8. Include:
        
        - package.json
        - configuration files
        - source files
        - README.md
        
        
        README.md must include:
        
        - Project overview
        - Installation steps
        - Environment variables
        - Development commands
        - Deployment instructions
        
        
        
        Return ONLY valid JSON.
        
        
        Required JSON schema:
        
        
        {
          "projectName": "string",
        
          "files":[
        
            {
              "path":"relative/file/path",
        
              "content":"complete file content"
        
            }
          ]
        
        }
        
        Important:
        
        - No markdown outside JSON.
        - Escape special characters.
        - File paths must be relative.
        - Do not include binary files.
        
        Engineering Specification:

        ${productionPrompt}
  
        `
  });

  return JSON.parse(response.output_text);

 

}