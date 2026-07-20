import { createOpenAIClient } from "@/lib/openai";
import { DEFAULT_ANALYZE_MODEL } from "@/lib/models";


export async function architectAgent(
    specification:string,
    model?:string,
    apiKey?:string
){
console.log(`In architectAgent, model :${model}`);

const openai =  createOpenAIClient(apiKey);

const response = await openai.responses.create({
    model: model?model:DEFAULT_ANALYZE_MODEL,
    text:{format:{type:"json_object"}},
    input:`
    You are a Principal Software Architect.

    Review the following software specification.

    Analyze:

    - system architecture
    - scalability
    - maintainability
    - technology choices
    - missing components
    - architecture risks


    Return JSON:

    {
    "agent":"architect",

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


return JSON.parse(response.output_text);

}