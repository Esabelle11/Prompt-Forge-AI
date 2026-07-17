import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_ANALYZE_MODEL } from "@/lib/models";
import { requirementAgent } from "@/agents/requirement-agent";
import { mockInterview } from "@/lib/mock/interview";

const USE_MOCK = true;


export async function POST(
  req: NextRequest
){
  try {
    const body = await req.json();

    const { prompt, analysis, model = DEFAULT_ANALYZE_MODEL} = body;
    const apiKey = req.headers.get("x-openai-api-key") || undefined;
    

    if(!prompt){
      return NextResponse.json(
        { error:"Prompt required" },
        { status:400 }
      );
    }

    if (USE_MOCK) {
      console.log("IN MOCK : mockInterview");
      await new Promise((resolve) => setTimeout(resolve, 5000));

      return NextResponse.json({
        result: mockInterview,
      });
    }

    const result =  await requirementAgent( prompt, analysis, model, apiKey);

    return NextResponse.json( result );

  } catch(error){

    console.error(error);

    return NextResponse.json(
      { error:"Interview generation failed" },
      {status:500 }
    );

  }

}