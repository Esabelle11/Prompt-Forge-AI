import {NextRequest,NextResponse} from "next/server";

import {architectAgent} from "@/agents/architect-agent";
import {securityAgent} from "@/agents/security-agent";
import {qaAgent} from "@/agents/qa-agent";

// import {moderatorAgent} from "@/agents/moderator-agent";

import { mockArchitecture, mockSecurity, mockQA, mockFinalSpecification} from "@/lib/mock/review";

const USE_MOCK = true;

export async function POST(
    req:NextRequest
){
    try{

        const {specification}=await req.json();
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



        const [architecture, security, qa ]=await Promise.all([
            architectAgent(specification, apiKey ),
            securityAgent(specification,apiKey ),
            qaAgent(specification, apiKey )
        ]);



        // const finalSpecification =  await moderatorAgent(
        //     specification,
        //     {
        //         architecture,
        //         security,
        //         qa
        //     },
        //     apiKey
        // );


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