import { NextResponse } from "next/server";
import { createZip } from "@/lib/create-zip";
import { createOpenAIClient } from "@/lib/openai";
import { DEFAULT_GENERATE_MODEL } from "@/lib/models";
import { parseModelJson } from "@/lib/parse-json";
import type { ProjectFile } from "@/types/project";
import { mockGenerate } from "@/lib/mock/generate";

const USE_MOCK = false;

interface ModelProjectResponse {
  projectName: string;
  files: ProjectFile[];
}

export async function POST(req: Request) {
  try {
    const { prompt, model = DEFAULT_GENERATE_MODEL } = await req.json();
    const apiKey = req.headers.get("x-openai-api-key") || undefined;

    if (!prompt?.trim()) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    let output: string;

    if (USE_MOCK) {
      console.log("IN MOCK")

      output= JSON.stringify(mockGenerate)
    
    }else{
      const openai = createOpenAIClient(apiKey);

      const response = await openai.responses.create({
        model,
        text: {
          format: { type: "json_object" },
        },
        input: `You are an expert AI software engineer.

Your task is to generate a complete production-ready application based on the user's requirements.

Responsibilities:
- Understand the user's intent.
- Choose an appropriate architecture.
- Generate complete runnable project files.
- Follow software engineering best practices.

Technical guidelines:
- Default to Next.js 15 + App Router + TypeScript for web applications unless another stack is explicitly requested.
- Generate reusable, maintainable code.
- Include all required configuration files.
- Keep simple projects lightweight.
- Design enterprise projects with scalable modules, authentication, services, and proper separation of concerns.

Return ONLY valid JSON.

Schema:

{
  "projectName": "string",
  "files": [
    {
      "path": "relative/file/path",
      "content": "complete file contents"
    }
  ]
}

Rules:
- Every file must be complete.
- No placeholders.
- No explanations.
- No markdown outside JSON.
- Escape all special characters inside strings.
- README.md should contain installation, usage, project structure, and deployment instructions.

User request:
${prompt}`,
      });

      // console.log("response",response)
      output = response.output_text;
      // console.log("output",output)
    }


    if (!output) {
      return NextResponse.json(
        { error: "No response from model" },
        { status: 500 }
      );
    }

    const project = parseModelJson<ModelProjectResponse>(output);

    if (!project.projectName || !Array.isArray(project.files)) {
      return NextResponse.json(
        { error: "Invalid project structure from model" },
        { status: 500 }
      );
    }

    const zipBuffer = await createZip(project.projectName, project.files);

    return NextResponse.json({
      projectName: project.projectName,
      files: project.files,
      zipBase64: zipBuffer.toString("base64"),
    });
  } catch (error) {
    console.error("GENERATE ERROR:", error);
    const message =
      error instanceof Error ? error.message : "Failed to generate project";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
