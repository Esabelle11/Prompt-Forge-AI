import { NextResponse } from "next/server";

import { createZip } from "@/lib/create-zip";
import { createOpenAIClient } from "@/lib/openai";
import { DEFAULT_GENERATE_MODEL } from "@/lib/models";
import { parseModelJson } from "@/lib/parse-json";

import type { ProjectFile } from "@/types/project";

import { mockGenerate } from "@/lib/mock/generate";


const USE_MOCK = true;



interface ModelProjectResponse {

  projectName: string;

  files: ProjectFile[];

}



export async function POST(
  req: Request
) {

  try {


    const {
      productionPrompt,
      model = DEFAULT_GENERATE_MODEL

    } = await req.json();



    const apiKey =
      req.headers.get(
        "x-openai-api-key"
      ) || undefined;



    if (!productionPrompt?.trim()) {

      return NextResponse.json(
        {
          error:
          "Production prompt is required"
        },
        {
          status: 400
        }
      );

    }



    let output:string;



    if(USE_MOCK){


      console.log(
        "USING MOCK GENERATION"
      );


      output =
        JSON.stringify(
          mockGenerate
        );


    }
    else {


      const openai =
        createOpenAIClient(
          apiKey
        );



      const response =
        await openai.responses.create({

          model,


          text:{
            format:{
              type:"json_object"
            }
          },


          input:`

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



      output =
        response.output_text;

    }



    if(!output){

      return NextResponse.json(
        {
          error:
          "No response from model"
        },
        {
          status:500
        }
      );

    }



    const project =
      parseModelJson<ModelProjectResponse>(
        output
      );



    if(
      !project.projectName ||
      !Array.isArray(project.files)
    ){

      return NextResponse.json(
        {
          error:
          "Invalid project structure from model"
        },
        {
          status:500
        }
      );

    }



    const zipBuffer =
      await createZip(
        project.projectName,
        project.files
      );



    return NextResponse.json({

      projectName:
        project.projectName,


      files:
        project.files,


      zipBase64:
        zipBuffer.toString(
          "base64"
        )

    });



  }
  catch(error){


    console.error(
      "BUILD ERROR:",
      error
    );


    const message =
      error instanceof Error
      ? error.message
      : "Failed to build project";



    return NextResponse.json(
      {
        error:message
      },
      {
        status:500
      }
    );


  }

}