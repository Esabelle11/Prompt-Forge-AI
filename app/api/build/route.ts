import { NextResponse } from "next/server";

import { createZip } from "@/lib/create-zip";
import { createOpenAIClient } from "@/lib/openai";
import { DEFAULT_GENERATE_MODEL } from "@/lib/models";
import { parseModelJson } from "@/lib/parse-json";
import type { ProjectFile } from "@/types/project";

import { buildAgent } from "@/agents/build";
import {runAgent} from "@/helper/run_agent";
import { mockGenerate } from "@/lib/mock/generate";


const USE_MOCK = false;



interface ModelProjectResponse {

  projectName: string;

  files: ProjectFile[];

}



export async function POST(
  req: Request
) {
  try {
    const {productionPrompt, model = DEFAULT_GENERATE_MODEL} = await req.json();

    const apiKey = req.headers.get( "x-openai-api-key") || undefined;


    if (!productionPrompt?.trim()) {
      return NextResponse.json(
        { error:"Production prompt is required"},
        { status: 400}
      );
    }

    let output:string;

    if(USE_MOCK){
      console.log("USING MOCK GENERATION");
      output =JSON.stringify( mockGenerate );
    }
    else {

      output =  await runAgent("build", () => buildAgent(productionPrompt,model, apiKey));

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

    const project = parseModelJson<ModelProjectResponse>(  output );

  

    if( !project.projectName ||!Array.isArray(project.files)){
      return NextResponse.json(
        { error:"Invalid project structure from model" },
        {status:500 }
      );
    }

    const zipBuffer = await createZip( project.projectName, project.files);

    return NextResponse.json({
      projectName: project.projectName,
      files: project.files,
      zipBase64: zipBuffer.toString( "base64" )
    });

  }
  catch(error){
    console.error( "BUILD ERROR:",error);
    const message = error instanceof Error ? error.message : "Failed to build project";
    
    return NextResponse.json(
      { error:message },
      {status:500 }
    );

  }

}