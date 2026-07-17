import { createOpenAIClient } from "@/lib/openai";


export async function moderatorAgent(
    specification:string,
    reviews:any,
    apiKey?:string
){
    const openai = createOpenAIClient(apiKey);
    const response = await openai.responses.create({
        model:"gpt-5-mini",
        input:`

        You are the Engineering Lead.

        You received reviews from:

        1. Software Architect
        2. Security Engineer
        3. QA Engineer


        Your job:

        - Resolve disagreements
        - Prioritize important fixes
        - Update the engineering specification
        - Produce the final implementation document for Codex


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



        Return:

        A complete final engineering specification in Markdown.

        Include:

        # Overview

        # Architecture

        # Technology Stack

        # Database

        # Security

        # APIs

        # Testing

        # Acceptance Criteria

        # Implementation Notes

        `
    });


    return response.output_text;
    
}