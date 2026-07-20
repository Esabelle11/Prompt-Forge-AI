import { NextRequest, NextResponse } from "next/server";

import { buildProductionPrompt } from "@/agents/document/production-prompt-builder";
import { mockCodexBrief } from "@/lib/mock/document";
import {runAgent} from "@/helper/run_agent";

const USE_MOCK = false;

export async function POST(
req:NextRequest
){

    try {
    const body = await req.json();

    const apiKey =req.headers.get( "x-openai-api-key") ??undefined;

    if (USE_MOCK) {
        console.log("IN MOCK : mockCodexBrief");
        await new Promise((resolve) => setTimeout(resolve, 5000));
  
        return NextResponse.json({
            productionPrompt: mockCodexBrief,
        });
      }

    // const document =await buildProductionPrompt(
    //     body.consensusSpecification,
    //     body.qualityReport,
    //     apiKey
    // );

    const document =await  runAgent("document", () => buildProductionPrompt(
        body.consensusSpecification,
        body.qualityReport,
        body.model,
        apiKey
    ));

    return NextResponse.json({
      productionPrompt: document
    });

    }
    catch(error){
        console.error(error);

        return NextResponse.json(
            {error:"Document generation failed"},
            {status:500}
        );
    }
}