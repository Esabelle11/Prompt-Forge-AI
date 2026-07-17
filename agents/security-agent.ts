import { createOpenAIClient } from "@/lib/openai";


export async function securityAgent(
 specification:string,
 apiKey?:string
){


const openai =
 createOpenAIClient(apiKey);


const response =
await openai.responses.create({

model:"gpt-5-mini",

text:{
 format:{
  type:"json_object"
 }
},

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


return JSON.parse(
 response.output_text
);


}