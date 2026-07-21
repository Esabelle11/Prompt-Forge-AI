"use client";

import { ShieldCheck, Server, TestTube2, AlertTriangle, Lightbulb,} from "lucide-react";

import { FinalReview, AgentReview, ReviewIssue,} from "@/types/review";


interface Props {
  reviews: FinalReview;
  finalSpecification?: string;
}


const agents = [
  {
    key: "architecture",
    title: "Architecture AI",
    icon: Server,
  },

  {
    key: "security",
    title: "Security AI",
    icon: ShieldCheck,
  },

  {
    key: "qa",
    title: "QA AI",
    icon: TestTube2,
  },
];



function Score({ score}:{score:number}){
  let style = "bg-red-100 text-red-700";
  if(score >= 90){
    style ="bg-green-100 text-green-700";
  }
  else if(score >= 70){
    style = "bg-yellow-100 text-yellow-700";
  }

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${style}`}>
      {score}/100
    </span>
  );
}



function SeverityBadge({severity}:{ severity:ReviewIssue["severity"]}){

  const styles = {
    critical: "bg-red-200 text-red-800",
    high: "bg-orange-100 text-orange-700",
    medium: "bg-yellow-100 text-yellow-700",
    low: "bg-blue-100 text-blue-700"
  };


  return (
    <span className={`rounded-full px-2 py-1 text-xs font-medium ${styles[severity]}`}>
      {severity}
    </span>
  );
}




function IssueCard({issue}:{issue:ReviewIssue}){
 return (

  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
    <div className="flex items-start justify-between gap-3">
      <h4 className="font-medium text-gray-900">
        {issue.title}
      </h4>
      <SeverityBadge severity={issue.severity}/>
    </div>
    <p className="mt-3 text-sm text-gray-600">
      {issue.description}
    </p>

    <div className="mt-3 flex gap-2">
      <Lightbulb className="h-4 w-4 text-green-600 mt-0.5"/>
      <p className="text-sm text-gray-700">
        <span className="font-medium">
          Recommendation:
        </span>{" "}
        {issue.recommendation}
      </p>
    </div>
  </div>

 );

}






function ReviewCard({
 title,
 icon:Icon,
 review
}:{
 title:string;
 icon:any;
 review:AgentReview;
}){


  return (

    <div className="rounded-xl border border-gray-200 bg-white  p-5 shadow-sm  " >


    <div className="flex items-center justify-between">


    <div className="flex items-center gap-2">

    <Icon className="h-5 w-5 text-gray-700"/>

    <h3 className="font-semibold">
    {title}
    </h3>

    </div>


    <Score score={review.score}/>


    </div>



    <div className="mt-5">


    <div className="flex items-center gap-2 text-sm font-medium text-gray-800">

    <AlertTriangle
    className="h-4 w-4"
    />

    Detected Issues
    ({review.issues.length})

    </div>



    <div className="mt-3 space-y-3">


    {
    review.issues.map(
    (issue,index)=>(

    <IssueCard
    key={index}
    issue={issue}
    />

    )

    )
    }


    </div>


    </div>


    </div>

  );

}







export default function AgentReviews({
reviews,
finalSpecification

}:Props){

 

return (

<section
className="space-y-6"
>


<div>

<h2
className="text-lg font-semibold text-gray-900"
>
AI Engineering Review Council
</h2>


<p
className="mt-1 text-sm text-gray-500"
>
Architecture, Security, and QA agents review
the engineering specification before code generation.
</p>


</div>


<div className=" grid gap-6 lg:grid-cols-3">
  {agents.map((agent)=>{
    const Icon = agent.icon;
    const review =reviews[agent.key as keyof FinalReview];

    return (
      <ReviewCard
        key={agent.key}
        title={agent.title}
        icon={Icon}
        review={review}
      />
    );
  })}
</div>





{finalSpecification && (
  <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
    <h3 className="font-semibold text-blue-900">
      Consensus Engineering Specification
    </h3>

    <div className="mt-4 max-h-[300px] overflow-y-auto rounded-lg border border-blue-200 bg-white/50 p-4">
      <pre className="whitespace-pre-wrap break-words text-sm leading-6 text-blue-900">
        {finalSpecification}
      </pre>
    </div>
  </div>
)}


</section>

);

}