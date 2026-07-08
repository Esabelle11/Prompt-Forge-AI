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
        input: `You are Codex, an expert software engineer.

Generate a production-ready Next.js project scaffold based on the following specification.

Requirements:
- Next.js 15 with App Router
- TypeScript
- Tailwind CSS
- Clean architecture with separated components
- Minimal but production-ready code

Return ONLY valid JSON with this exact schema:
{
  "projectName": "my-project",
  "files": [
    {
      "path": "package.json",
      "content": "full file contents as a string"
    },
    {
      path: "src/app/page.tsx",
      content: "full script as a string"
    }
  ]
}

User specification:
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
