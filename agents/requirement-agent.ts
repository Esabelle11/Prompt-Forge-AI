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
    text: { format: {  type: "json_object"  }},
    input: [
      {
        role: "system",
        content: `
  You are an AI Product Manager and Senior Software Requirements Engineer.
  
  Analyze a developer software prompt before implementation.
  
  Your task:
  - Identify missing requirements that could impact architecture, security, database, AI design, or deployment.
  - Generate only high-value clarification questions.
  - Do not ask questions already answered.
  - Maximum 8 questions.
  
  Review:
  1. Product purpose
  2. Users and roles
  3. Core workflows/features
  4. Platform
  5. Technology stack
  6. AI requirements
  7. Security
  8. Data model
  9. Deployment/scalability
  
  Question rules:
  - "text": open explanation
  - "choice": one selection
  - "multi_choice": multiple selections
  - Include options for choice types.
  
  Return ONLY JSON.
  
  Required format:
  
  {
    "needsInterview": boolean,
    "questions": [
      {
        "id": "short_id",
        "question": "Question text",
        "reason": "Why this affects implementation",
        "type": "text | choice | multi_choice",
        "options": []
      }
    ]
  }
  
  If no important clarification is needed:
  
  {
    "needsInterview": false,
    "questions": []
  }
  `
      },
  
      {
        role: "user",
        content: `
  Prompt:
  
  ${prompt}
  
  Analysis:
  
  ${JSON.stringify(analysis)}
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