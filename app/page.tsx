"use client";

import { useCallback, useState } from "react";

import ApiKeyButton from "@/components/ApiKeyButton";
import PromptEditor from "@/components/PromptEditor";
import ScoreCard from "@/components/ScoreCard";
import IssueCard from "@/components/IssueCard";
import SuggestionCard from "@/components/SuggestionCard";
import InterviewPanel from "@/components/InterviewPanel";
import WorkflowProgress from "@/components/WorkflowProgress";

import SpecificationViewer from "@/components/SpecificationViewer";
import AgentReviews from "@/components/AgentReview";
import QualityScore from "@/components/QualityScore";

import ExportButtons from "@/components/ExportButtons";
import ProjectOutput from "@/components/ProjectOutput";

import {DEFAULT_ANALYZE_MODEL,DEFAULT_GENERATE_MODEL,} from "@/lib/models";
import {runAISoftwareWorkflow} from "@/lib/workflow";
import { INITIAL_WORKFLOW_STEPS } from "@/lib/workflow-steps";

import type {AnalysisResult} from "@/types/analysis";
import type {GeneratedProject} from "@/types/project";


export default function Home(){

  const [prompt,setPrompt] = useState("");
  const [analysis,setAnalysis] = useState<AnalysisResult|null>(null);
  const [interview,setInterview] = useState<any>(null);
  const [specification,setSpecification] = useState("");
  const [reviews,setReviews] = useState<any>(null);
  const [consensus,setConsensus] = useState("");
  const [quality,setQuality] = useState<any>(null);
  const [productionPrompt,setProductionPrompt] = useState("");
  const [project,setProject] = useState<GeneratedProject|null>(null);
  const [apiKey,setApiKey] = useState("");
  const [analyzeModel,setAnalyzeModel] = useState(DEFAULT_ANALYZE_MODEL);
  const [generateModel,setGenerateModel] = useState(DEFAULT_GENERATE_MODEL);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState<string|null>(null);
  const [workflowSteps,setWorkflowSteps] = useState( () => INITIAL_WORKFLOW_STEPS.map(step=>({ ...step})));
  
  const handleApiKeyChange = useCallback( (key:string)=>{
     setApiKey(key);},[]);


  function updateStep( stepId:string, status:any){
    setWorkflowSteps(prev=> prev.map(step=> step.id===stepId ? { ...step, status } : step ));
  }



  async function startWorkflow(
    analysisResult:AnalysisResult,
    answers:any=null
  ){

    const workflow = await runAISoftwareWorkflow({
      prompt,
      analysis:analysisResult,
      interviewAnswers:answers,
      apiKey,
      onStepChange(stepId,status){
        updateStep(stepId,status);
      }
    });

  setSpecification(workflow.specification);
  setReviews(workflow.reviews);
  setConsensus(workflow.consensus);
  setQuality(workflow.quality);
  setProductionPrompt(workflow.productionPrompt);

  }

  function resetWorkflow() {
    setAnalysis(null);
    setInterview(null);
    setSpecification("");
    setReviews(null);
    setConsensus("");
    setQuality(null);
    setProductionPrompt("");
    setProject(null);
    setError(null);
   
    // Reset workflow progress
    setWorkflowSteps(
      INITIAL_WORKFLOW_STEPS.map((step) => ({
        ...step,
      }))
    );
  }

  async function analyzePrompt(){

    setLoading(true);
    setError(null);
    resetWorkflow();

    try{
      const res = await fetch("/api/analyze",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          ...(apiKey?{ "x-openai-api-key":apiKey} :{})
        },
        body:JSON.stringify({
          prompt,
          model:analyzeModel
        })
      });

      const data = await res.json();

      if(!res.ok){
        throw new Error(data.error ||"Analysis failed");
      }

      const result = data.result;

      console.log("[analysis result]: ",result)

      setAnalysis(result);
      updateStep("analysis","completed");


      if(result.needsInterview){
        updateStep("interview", "running");
        
        const interviewRes =await fetch( "/api/interview",{
          method:"POST",
          headers:{
            "Content-Type":"application/json",
            ...(apiKey?{"x-openai-api-key":apiKey}:{})
          },
          body:JSON.stringify({
            prompt,
            analysis:result,
            model:analyzeModel
          })
        });

        const interviewData = await interviewRes.json();
        console.log("[interviewData result]: ",interviewData)

        setInterview(interviewData);
      }
      else{
        updateStep("interview","completed");
        await startWorkflow(result);
      }

    }
    catch(err){
      setError(err instanceof Error?err.message:"Something went wrong");
    }

    finally{
      setLoading(false);
    }
  }




  async function generateProject(){
    if(!productionPrompt) return;
    setLoading(true);

    try{
      const res =await fetch("/api/build",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          ...(apiKey?{"x-openai-api-key":apiKey}:{})
        },
        body:JSON.stringify({
          productionPrompt,
          model:generateModel
        })
      });

      const data = await res.json();

      if(!res.ok){
       throw new Error(data.error ||"Build failed");
      }

      setProject(data);

    }
    catch(err){
      setError(err instanceof Error?err.message: "Generation failed");
    }

    finally{ 
      setLoading(false);
    }
  }


  return (

    <div className="min-h-screen bg-white">
      <header className="border-b p-6">
        <h1 className="text-xl font-bold">Prompt Linter AI Engineering System</h1>
        <p className="text-sm text-gray-500">From human idea → production specification → AI coding agent</p>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 p-6">

        <ApiKeyButton onApiKeyChange={handleApiKeyChange}/>

        <PromptEditor
          value={prompt}
          onChange={setPrompt}
          onAnalyze={analyzePrompt}
          loading={loading}
          model={analyzeModel}
          onModelChange={setAnalyzeModel}
        />

        <WorkflowProgress steps={workflowSteps}/>

        { error &&
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        }


        { analysis &&
          <>
          <div className="grid gap-6 lg:grid-cols-2">
            <ScoreCard score={analysis.score} />
            <SuggestionCard suggestions={analysis.suggestions} />
          </div>
          <IssueCard issues={analysis.issues}/>
          </>
        }


        { interview &&
          <InterviewPanel
            questions={ interview.result.questions }
            onComplete={ async answers=>{
              updateStep(
                "interview",
                "completed"
              );
              await startWorkflow(analysis!, answers);
            }}
          />
        }


        { specification && <SpecificationViewer specification={specification }  /> }


        { reviews &&
          <AgentReviews
            reviews={ reviews}
            finalSpecification={consensus}
          />
        }

        { quality && <QualityScore report={ quality } />}

        { productionPrompt &&
          <>
          <SpecificationViewer specification={productionPrompt} />
          <ExportButtons
            productionPrompt={ productionPrompt}
            projectName="my-ai-project"
          />
          <ProjectOutput
            project={project}
            loading={loading}
            onGenerate={generateProject}
            disabled={false}
            model={generateModel}
            onModelChange={setGenerateModel}
          />
          </>
        }

      </main>

    </div>

  );

}