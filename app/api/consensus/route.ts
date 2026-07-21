import {NextRequest,NextResponse} from "next/server";
import {buildConsensus} from "@/agents/consensus/consensus-builder";
import {mockConsensus } from "@/lib/mock/consensus"
import {runAgent} from "@/helper/run_agent";

const USE_MOCK = false;

export async function POST(
    req:NextRequest
){
    try{
        const body =await req.json();

        const apiKey = req.headers.get("x-openai-api-key") ??undefined;

        if (USE_MOCK) {
            // console.log("IN MOCK : mockConsensus");
            await new Promise((resolve) => setTimeout(resolve, 5000));
        
            return NextResponse.json({
                consensusSpecification: mockConsensus,
            });
        }

        // const result = await buildConsensus({
        //     specification:body.specification,
        //     reviews: body.reviews,
        //     apiKey
        // });

        const result = await runAgent("consensus", () => buildConsensus({
            specification:body.specification,
            reviews: body.reviews,
            model:body.model,
            apiKey
        }));

        return NextResponse.json({
            consensusSpecification:result
        });

    }catch(error){

        return NextResponse.json(
            { error:"Consensus generation failed"},
            { status:500}
        );

    }


}