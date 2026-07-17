import { createOpenAIClient } from "@/lib/openai";


export async function architectAgent(
    specification:string,
    apiKey?:string
){

const openai =  createOpenAIClient(apiKey);


const response = await openai.responses.create({

model:"gpt-5-mini",

text:{
    format:{
        type:"json_object"
    }
},

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


return JSON.parse(
    response.output_text
);


}