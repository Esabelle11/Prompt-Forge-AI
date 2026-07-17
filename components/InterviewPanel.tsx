"use client";


import { useState } from "react";


interface Question {
  id:string;
  question:string;
  reason:string;
  type:"text"|"choice";
  options?:string[];
}


interface Props {
  questions:Question[];
  onComplete:(answers:any)=>void;
}



export default function InterviewPanel({
  questions,
  onComplete
}:Props){

  // console.log("[questions]:",questions)

  const [answers,setAnswers] = useState<Record<string,string>>({});

  function updateAnswer(
    id:string,
    value:string
  ){
    setAnswers(prev=>({
      ...prev,
      [id]:value
    }));

  }

  function submit(){
    onComplete( answers);
  }



  return (

    <div className="space-y-6 rounded-xl border p-6">

      <h2 className=" text-xl font-semibold ">
        Requirements Interview
      </h2>

      <p className=" text-sm text-gray-500 ">
        Help the AI understand your project
        before generating code.
      </p>

     



      {questions.map(question=>(
          
          <div key={question.id} className="space-y-2">

            <label className="font-medium">
              {question.question}
            </label>

            <p className=" text-xs text-gray-500">
              Why:
              {" "}
              {question.reason}
            </p>



            { question.type==="choice" ?

              (
                <select className="w-full rounded border p-2"
                  value={ answers[question.id] || "" }
                  onChange={
                    e=>
                    updateAnswer(
                      question.id,
                      e.target.value
                    )
                  }
                >

                  <option value="">
                    Select...
                  </option>

                  {
                    question.options?.map(
                      option=>(
                        <option key={option}>
                          {option}
                        </option>

                      )
                    )
                  }
                </select>
              )
              :
              (

                <textarea className=" w-full rounded border p-2" rows={3}
                  value={ answers[question.id] || "" }
                  onChange={
                    e=>
                    updateAnswer(
                      question.id,
                      e.target.value
                    )
                  }
                />
              )
            }
          </div>
        ))
      }



      <button onClick={submit} className="rounded bg-black px-4 py-2 text-white ">
        Continue to Specification
      </button>

    </div>

  );

}