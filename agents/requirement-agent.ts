import { InterviewResult } from "@/types/interview";
import { createOpenAIClient } from "@/lib/openai";



export async function requirementAgent(
  prompt: string,
  analysis: any,
  model: string,
  apiKey?: string,
): Promise<InterviewResult> {
  const openai =createOpenAIClient(apiKey);


  const response = await openai.responses.create({
    model,
    input: [
      {
        role: "system",
        content: `
You are an AI Product Manager and Senior Software Analyst.

Your job:
Determine whether a developer prompt contains enough
information to generate a production-ready software project.

If information is missing:
Create interview questions.

Check:

1. Product purpose
2. Target users
3. Core features
4. Platform
5. Technology constraints
6. Security requirements
7. Database requirements
8. Deployment requirements


Return ONLY JSON.

Format:

{
 "needsInterview": true,
 "questions":[
   {
    "id":"users",
    "question":"Who are the target users?",
    "reason":"Different users require different permissions.",
    "type":"choice",
    "options":[
      "Customer",
      "Admin",
      "Internal staff"
    ]
   }
 ]
}

If prompt is complete:

{
 "needsInterview":false,
 "questions":[]
}

`
      },

      {
        role:"user",
        content:`
Original Prompt:

${prompt}


Existing Analysis:

${JSON.stringify(
  analysis,
  null,
  2
)}
`
      }

    ]

  });


  const text = response.output_text;

  try {

    return JSON.parse(text);

  } catch(error){

    console.error( "Interview parsing failed:",text );

    return {
      needsInterview:false,
      questions:[]
    };
  }

}