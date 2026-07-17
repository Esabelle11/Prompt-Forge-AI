import {createOpenAIClient} from "@/lib/openai";



export async function buildProductionPrompt(
    consensus:string,
    qualityReport:any,
    apiKey?:string
){
const openai = createOpenAIClient(apiKey);

const response = await openai.responses.create({
    model:"gpt-5-mini",
    input:`

    You are preparing an engineering handoff document
    for Codex, an AI software development agent.


    Convert the following engineering specification
    into an implementation instruction document.


    The document must help Codex understand:

    - what to build
    - architecture decisions
    - technical constraints
    - coding standards
    - testing expectations
    - deployment requirements


    Do NOT change requirements.

    Do NOT add features.

    Make instructions explicit.



    Consensus Specification:

    ${consensus}



    Quality Prediction:

    ${JSON.stringify(
    qualityReport,
    null,
    2
    )}



    Return Markdown:


    # Codex Implementation Brief


    ## Objective


    ## Required Features


    ## Architecture


    ## Technology Requirements


    ## Folder Structure


    ## Database Requirements


    ## API Requirements


    ## Security Rules


    ## Testing Requirements


    ## Definition of Done


    `
});


return response.output_text;
}