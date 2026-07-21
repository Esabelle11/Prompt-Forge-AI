import { createOpenAIClient } from "@/lib/openai";
import { DEFAULT_ANALYZE_MODEL } from "@/lib/models";


export async function qaAgent(
    specification:string,
    model?: string,
    apiKey?:string
){
    // console.log(`In qaAgent, model :${model}`);

    const openai = createOpenAIClient(apiKey);

    const response = await openai.responses.create({
        model: model?model:DEFAULT_ANALYZE_MODEL,
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

    return JSON.parse( response.output_text );
}