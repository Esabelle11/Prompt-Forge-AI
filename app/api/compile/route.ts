import { NextRequest, NextResponse } from "next/server";
import { buildSpecification } from "@/compiler/specification-builder";
import { mockCompiler } from "@/lib/mock/compiler";
const USE_MOCK = true;


export async function POST(req: NextRequest) {

    try{

        const body = await req.json();

        const apiKey = req.headers.get("x-openai-api-key") ?? undefined;

        if (USE_MOCK) {
            console.log("IN MOCK : mockCompiler");
            await new Promise((resolve) => setTimeout(resolve, 5000));
      
            return NextResponse.json({
              result: mockCompiler,
            });
        }

        const specification =
            await buildSpecification({
                prompt: body.prompt,
                analysis: body.analysis,
                interviewAnswers: body.interviewAnswers,
                apiKey
            });

        return NextResponse.json({

            specification

        });

    }

    catch(error){

        return NextResponse.json({

            error:"Failed to compile specification"

        },{

            status:500

        });

    }

}