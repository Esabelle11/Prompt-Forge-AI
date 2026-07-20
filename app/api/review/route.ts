import {NextRequest,NextResponse} from "next/server";

import {architectAgent} from "@/agents/architect-agent";
import {securityAgent} from "@/agents/security-agent";
import {qaAgent} from "@/agents/qa-agent";
import {runAgent} from "@/helper/run_agent";

import { mockArchitecture, mockSecurity, mockQA} from "@/lib/mock/review";

const USE_MOCK = false;

export async function POST(
    req:NextRequest
){
    try{

        const {specification,model}=await req.json();
        const apiKey =req.headers.get("x-openai-api-key" ) ??undefined;

        if (USE_MOCK) {
            console.log("IN MOCK : mockReview");
            await new Promise((resolve) => setTimeout(resolve, 10000));
      
            return NextResponse.json({
                reviews:{
                    architecture:mockArchitecture,
                    security:mockSecurity,
                    qa:mockQA
                },
            });
        }

        const [architecture, security, qa] = await Promise.all([
            runAgent("architecture", () => architectAgent(specification, model, apiKey)),
            runAgent("security",() => securityAgent(specification, model, apiKey)),
            runAgent("qa",() => qaAgent(specification, model, apiKey))
        ]);

        return NextResponse.json({
            reviews:{
                architecture,
                security,
                qa
            },
        });

    }catch(error){
        return NextResponse.json({error:"Review failed" },{status:500});
    }
    
}