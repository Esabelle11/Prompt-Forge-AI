import { NextRequest, NextResponse } from "next/server";
import { predictCodeQuality } from "@/agents/predictor/quality-predictor";
import { mockQualityPrediction } from "@/lib/mock/predictor";
import {runAgent} from "@/helper/run_agent";

const USE_MOCK = false;

export async function POST(
  req: NextRequest
){
  try {
    const body = await req.json();
    const apiKey = req.headers.get( "x-openai-api-key") ?? undefined;

    if (USE_MOCK) {
      // console.log("IN MOCK : mockQualityPrediction");
      await new Promise((resolve) => setTimeout(resolve, 5000));

      return NextResponse.json({
        qualityReport: mockQualityPrediction,
      });
    }

    // const result = await predictCodeQuality(
    //     body.consensusSpecification,
    //     apiKey
    // );

    const result = await  runAgent("predict", () => predictCodeQuality(
      body.consensusSpecification,
      body.model,
      apiKey
    ));

    return NextResponse.json({ qualityReport: result });

  } catch(error){

    console.error(error);

    return NextResponse.json(
      { error:"Quality prediction failed" },
      { status:500 }
    );

  }

}