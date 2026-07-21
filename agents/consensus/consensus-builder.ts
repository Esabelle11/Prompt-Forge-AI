import { createOpenAIClient } from "@/lib/openai";
import { DEFAULT_ANALYZE_MODEL } from "@/lib/models";


interface ConsensusInput {
    specification:string;
    reviews:{
        architecture:any;
        security:any;
        qa:any;
    };
    model?:string;
    apiKey?:string;
}



export async function buildConsensus({
    specification,
    reviews,
    model,
    apiKey
}:ConsensusInput){

    // console.log(`In buildConsensus, model :${model}`);

    const openai =createOpenAIClient(apiKey);

    const response =await openai.responses.create({
    model: model?model:DEFAULT_ANALYZE_MODEL,

    input:`

    You are the Engineering Lead of a software team.

    You received:

    1. Original Engineering Specification

    2. Architecture Review

    3. Security Review

    4. QA Review


    Your responsibility:

    Create a final consensus specification.

    Resolve conflicts between reviewers.

    Prioritize:

    - Production reliability
    - Security
    - Maintainability
    - Developer experience


    Do NOT generate code.

    Produce a final engineering blueprint.



    Original Specification:

    ${specification}



    Architecture Review:

    ${JSON.stringify(
    reviews.architecture,
    null,
    2
    )}



    Security Review:

    ${JSON.stringify(
    reviews.security,
    null,
    2
    )}



    QA Review:

    ${JSON.stringify(
    reviews.qa,
    null,
    2
    )}



    Return Markdown:



    # Final Project Specification


    ## Project Overview


    ## Final Architecture Decisions


    ## Technology Stack


    ## Database Design


    ## Security Requirements


    ## API Design


    ## Testing Strategy


    ## Acceptance Criteria


    ## Implementation Constraints


    `

    });

    return response.output_text;
}