type WorkflowStatus =
  | "waiting"
  | "running"
  | "completed";

interface WorkflowOptions {
  prompt:string;
  analysis:any;
  interviewAnswers:any;
  analyzeModel?:string;
  apiKey?:string;
  onStepChange?:(
    stepId:string,
    status:WorkflowStatus
  )=>void;
}


async function callAPI(
  url:string,
  body:any,
  headers:any
){
  const res = await fetch( url,
      {
        method:"POST",
        headers,
        body:JSON.stringify(body)
      }
    );

  const data = await res.json();

  if(!res.ok){ 
    throw new Error(data.error ||`${url} failed`);
  }

  return data;

}



export async function runAISoftwareWorkflow({
    prompt,
    analysis,
    interviewAnswers,
    analyzeModel,
    apiKey,
    onStepChange,
}:WorkflowOptions){

    const headers = {
        "Content-Type":"application/json",
        ...(apiKey?{"x-openai-api-key":apiKey}:{})
    };


    /*
    ----------------------------------
    1. Specification Compiler
    ----------------------------------
    */
    onStepChange?.( "compile", "running" );

    const compile = await callAPI(
        "/api/compile",
        {
            prompt,
            analysis,
            interviewAnswers,
            model: analyzeModel,
        },
        headers
    );

    onStepChange?.( "compile", "completed" );


    /*
    ----------------------------------
    2. AI Engineering Review
    ----------------------------------
    */
    onStepChange?.( "review", "running" );

    const review = await callAPI(
        "/api/review",
        {
            specification:compile.specification,
            model: analyzeModel,
        },
        headers
    );

    onStepChange?.( "review", "completed");

    /*
    ----------------------------------
    3. Consensus Specification
    ----------------------------------
    */
    onStepChange?.( "consensus","running");

    const consensus = await callAPI(
        "/api/consensus",
        {
            specification: compile.specification,
            reviews: review.reviews,
            model: analyzeModel,
        },
        headers
    );

    onStepChange?.( "consensus", "completed" );


    /*
    ----------------------------------
    4. Quality Prediction
    ----------------------------------
    */
    onStepChange?.( "predict", "running" );

    const quality = await callAPI(
        "/api/predict",
        {
            consensusSpecification: consensus.consensusSpecification,
            model: analyzeModel,
        },
        headers
    );

    onStepChange?.( "predict", "completed" );


    /*
    ----------------------------------
    5. Production README Generator
    ----------------------------------
    */
    onStepChange?.( "document", "running");

    const document = await callAPI(
        "/api/document",
        {
            consensusSpecification: consensus.consensusSpecification,
            qualityReport: quality.qualityReport,
            model: analyzeModel,
        },
        headers
    );

    onStepChange?.( "document", "completed" );


    return {
        specification: compile.specification,
        reviews: review.reviews,
        consensus: consensus.consensusSpecification,
        quality: quality.qualityReport,
        productionPrompt: document.productionPrompt
    };

}