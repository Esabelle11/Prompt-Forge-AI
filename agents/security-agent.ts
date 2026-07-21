import { createOpenAIClient } from "@/lib/openai";
import { DEFAULT_ANALYZE_MODEL } from "@/lib/models";


export async function securityAgent(
 specification:string,
 model?: string,
 apiKey?:string
){

// console.log(`In securityAgent, model :${model}`);

const openai = createOpenAIClient(apiKey);

const response = await openai.responses.create({
    model: model?model:DEFAULT_ANALYZE_MODEL,
    text:{ format:{ type:"json_object"}},
    input:`

    You are a Security Engineer.

    Review this software specification.

    Check:

    - authentication
    - authorization
    - data protection
    - privacy
    - API security
    - OWASP risks
    - secrets management


    Return JSON:

    {
    "agent":"security",

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


return JSON.parse( response.output_text);

}