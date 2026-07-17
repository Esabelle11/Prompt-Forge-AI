"use client";

import {
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Gauge,
} from "lucide-react";


interface Risk {

  category:string;

  severity:
    | "high"
    | "medium"
    | "low";

  description:string;

}



interface QualityReport {

  qualityScore:number;

  confidence:
    | "high"
    | "medium"
    | "low";

  risks:Risk[];

  recommendations:string[];

  readyForCodeGeneration:boolean;

}



interface Props {

  report:QualityReport;

}




function ScoreBadge({
  score
}:{
  score:number;
}){


let label="Needs Improvement";

let color=
"bg-red-100 text-red-700";



if(score>=90){

label="Production Ready";

color=
"bg-green-100 text-green-700";

}
else if(score>=70){

label="Mostly Ready";

color=
"bg-yellow-100 text-yellow-700";

}



return (

<span
className={`
rounded-full
px-3
py-1
text-sm
font-medium
${color}
`}
>

{label}

</span>

);

}





function SeverityBadge({
severity
}:{
severity:Risk["severity"]
}){


const styles={

high:
"bg-red-100 text-red-700",

medium:
"bg-yellow-100 text-yellow-700",

low:
"bg-blue-100 text-blue-700"

};



return (

<span
className={`
rounded-full
px-2
py-1
text-xs
font-medium
${styles[severity]}
`}
>

{severity}

</span>

);

}







export default function QualityScore({
report
}:Props){


console.log("[Quality Report]",report);



return (

<section
className="
rounded-xl
border
border-gray-200
bg-white
p-6
shadow-sm
"
>



<div
className="
flex
items-start
justify-between
"
>


<div>


<div
className="
flex
items-center
gap-2
"
>

<Gauge
className="
h-5
w-5
text-gray-700
"
/>


<h2
className="
text-lg
font-semibold
"
>

Production Readiness

</h2>


</div>



<p
className="
mt-1
text-sm
text-gray-500
"
>

AI prediction before sending specification
to Codex.

</p>


</div>




<ScoreBadge
score={report.qualityScore}
/>



</div>







<div
className="
mt-6
flex
items-center
gap-6
"
>



<div
className="
flex
h-28
w-28
items-center
justify-center
rounded-full
border-8
border-gray-900
"
>


<span
className="
text-3xl
font-bold
"
>

{report.qualityScore}

</span>


</div>






<div>


<p
className="
text-sm
text-gray-500
"
>
Confidence
</p>


<p
className="
font-semibold
capitalize
"
>
{report.confidence}
</p>




<div
className="
mt-3
flex
items-center
gap-2
"
>


{
report.readyForCodeGeneration
?

<>

<CheckCircle2
className="
h-5
w-5
text-green-600
"
/>

<span
className="
text-sm
text-green-700
"
>

Ready for Codex

</span>

</>


:

<>

<AlertTriangle
className="
h-5
w-5
text-yellow-600
"
/>

<span
className="
text-sm
text-yellow-700
"
>

Needs Improvement

</span>

</>

}


</div>


</div>


</div>










{
report.risks?.length > 0 && (

<div
className="
mt-8
"
>


<h3
className="
flex
items-center
gap-2
font-medium
"
>


<AlertTriangle
className="
h-5
w-5
text-yellow-600
"
/>


Risks

</h3>




<div
className="
mt-3
space-y-3
"
>


{
report.risks.map(
(risk,index)=>(


<div

key={index}

className="
rounded-lg
border
bg-yellow-50
p-3
"

>


<div
className="
flex
items-center
justify-between
"
>


<p
className="
font-medium
text-yellow-900
"
>

{risk.category}

</p>


<SeverityBadge
severity={risk.severity}
/>


</div>



<p
className="
mt-2
text-sm
text-yellow-800
"
>

{risk.description}

</p>



</div>


)

)

}


</div>


</div>

)

}









{
report.recommendations?.length > 0 && (

<div
className="
mt-8
"
>


<h3
className="
flex
items-center
gap-2
font-medium
"
>


<ShieldCheck
className="
h-5
w-5
text-green-600
"
/>


Recommendations

</h3>




<ul
className="
mt-3
space-y-2
"
>


{
report.recommendations.map(
(item,index)=>(


<li

key={index}

className="
rounded-lg
bg-green-50
px-3
py-2
text-sm
text-green-800
"

>

{item}

</li>


)

)

}


</ul>


</div>

)

}



</section>

);

}