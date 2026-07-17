import {createOpenAIClient}
from "@/lib/openai";



export async function predictCodeQuality(

specification:string,

apiKey?:string

){


const openai = createOpenAIClient(apiKey);



const response = await openai.responses.create({
model:"gpt-5-mini",
text:{format:{type:"json_object"}},
input:`
You are an AI Software Quality Analyst.

Predict the likelihood that a coding agent can generate
a production-ready application from this specification.

Evaluate:
1. Requirement completeness
2. Architecture clarity
3. Security readiness
4. Database clarity
5. Testing requirements
6. Deployment readiness


Return JSON:
{
 "qualityScore":number,
 "confidence":
 "high"|"medium"|"low",
 "risks":[
 {
  "category":string,
  "severity":
  "high"|"medium"|"low",
  "description":string
 }
 ],
 "recommendations":[
  "string"
 ],
 "readyForCodeGeneration":boolean

}

Specification:

${specification}

`
});


return JSON.parse(response.output_text);

}



// example output:
// {
//     "qualityScore":88,
   
//     "confidence":"high",
   
//     "risks":[
//      {
//       "category":"scalability",
//       "severity":"medium",
//       "description":"No caching strategy defined"
//      }
//     ],
   
//     "recommendations":[
//       "Add Redis caching",
//       "Define monitoring strategy"
//     ],
   
//     "readyForCodeGeneration":true
//    }