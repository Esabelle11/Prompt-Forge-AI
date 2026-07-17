import { createOpenAIClient } from "@/lib/openai";


export async function qaAgent(
    specification:string,
    apiKey?:string
){
    const openai = createOpenAIClient(apiKey);
    const response = await openai.responses.create({
        model:"gpt-5-mini",
        text:{ format:{ type:"json_object" } },
        input:`

        You are a Senior QA Engineer.

        Review this software specification.

        Analyze:

        - missing requirements
        - missing acceptance criteria
        - test coverage
        - edge cases
        - user workflows


        Return JSON:

        {
        "agent":"qa",

        "score":number,

        "issues":[
        {
        "title":string,
        "severity":"critical|high|medium|low",
        "description":string,
        "recommendation":string
        }
        ]
        }

        Specification:

        ${specification}

        `
    });


    return JSON.parse(
    response.output_text
    );


}