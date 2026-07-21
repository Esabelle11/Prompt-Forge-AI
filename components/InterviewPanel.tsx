"use client";

import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";


interface Question {
  id: string;
  question: string;
  reason: string;
  type: "text" | "choice" | "multi_choice";
  options?: string[];
}


interface Props {
  questions: Question[];
  loading: boolean;
  onComplete: (answers: any) => void;
}


export default function InterviewPanel({
  questions,
  loading,
  onComplete
}: Props) {


  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});


  function updateAnswer(
    id: string,
    value: string
  ) {

    setAnswers(prev => ({
      ...prev,
      [id]: value
    }));

  }


  function updateMultiChoice(
    id: string,
    option: string
  ) {

    setAnswers(prev => {

      const current =
        Array.isArray(prev[id])
          ? prev[id] as string[]
          : [];


      return {
        ...prev,
        [id]: current.includes(option)
          ? current.filter(item => item !== option)
          : [...current, option]
      };

    });

  }


  function submit() {

    onComplete(answers);

  }



  return (

    <div className="space-y-6 rounded-xl border p-6">


      <h2 className="text-xl font-semibold">
        Requirements Interview
      </h2>


      <p className="text-sm text-gray-500">
        Help the AI understand your project
        before generating code.
      </p>



      {
        questions.map(question => (

          <div
            key={question.id}
            className="space-y-2"
          >


            <label className="font-medium">
              {question.question}
            </label>


            <p className="text-xs text-gray-500">
              Why:
              {" "}
              {question.reason}
            </p>



            {/* Single Choice */}
            {
              question.type === "choice" &&
              (

                <select
                  className="w-full rounded border p-2"
                  value={
                    typeof answers[question.id] === "string"
                      ? answers[question.id] as string
                      : ""
                  }
                  onChange={
                    e =>
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
                    question.options?.map(option => (

                      <option
                        key={option}
                        value={option}
                      >
                        {option}
                      </option>

                    ))
                  }

                </select>

              )
            }




            {/* Multiple Choice */}
            {
              question.type === "multi_choice" &&
              (

                <div className="space-y-2">

                  {
                    question.options?.map(option => (

                      <label
                        key={option}
                        className="flex items-center gap-2"
                      >

                        <input
                          type="checkbox"
                          checked={
                            Array.isArray(
                              answers[question.id]
                            ) &&
                            (
                              answers[question.id] as string[]
                            ).includes(option)
                          }
                          onChange={() =>
                            updateMultiChoice(
                              question.id,
                              option
                            )
                          }
                        />


                        <span>
                          {option}
                        </span>


                      </label>

                    ))
                  }

                </div>

              )
            }




            {/* Text Input */}
            {
              question.type === "text" &&
              (

                <textarea
                  className="w-full rounded border p-2"
                  rows={3}
                  value={
                    typeof answers[question.id] === "string"
                      ? answers[question.id] as string
                      : ""
                  }
                  onChange={
                    e =>
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




      <button
        onClick={submit}
        disabled={loading}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        
        {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Continue to Specification
            </>
          )}
      </button>


    </div>

  );

}