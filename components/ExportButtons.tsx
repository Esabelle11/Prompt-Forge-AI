"use client";

import {
  Copy,
  Download,
  FileJson,
  FileText,
  Check,
} from "lucide-react";

import { useState } from "react";


interface Props {

  productionPrompt:string;

  projectName?:string;

}



export default function ExportButtons({

  productionPrompt,

  projectName="codex-implementation-brief"

}:Props){


const [copied,setCopied]
=
useState(false);



async function copyMarkdown(){

  await navigator.clipboard.writeText(
    productionPrompt
  );


  setCopied(true);


  setTimeout(
    ()=>setCopied(false),
    2000
  );

}



function downloadFile(
content:string,
filename:string,
type:string
){

const blob =
new Blob(
[
content
],
{
type
}
);


const url =
URL.createObjectURL(blob);


const link =
document.createElement("a");


link.href=url;

link.download=filename;


document.body.appendChild(link);

link.click();


document.body.removeChild(link);


URL.revokeObjectURL(url);

}





function downloadMarkdown(){

downloadFile(

productionPrompt,

`${projectName}.md`,

"text/markdown"

);

}





function downloadJson(){


const json =
JSON.stringify(
{
  type:
  "codex-implementation-brief",

  generatedAt:
  new Date().toISOString(),

  document:
  productionPrompt

},

null,

2

);



downloadFile(

json,

`${projectName}.json`,

"application/json"

);


}






function downloadPdf(){

/*
 Browser print to PDF.

 Better than generating PDF client side
 because it keeps markdown formatting.

 */

const printWindow =
window.open(
"",
"_blank"
);


if(!printWindow)
return;



printWindow.document.write(`

<html>

<head>

<title>
${projectName}
</title>


<style>

body{

font-family:
Arial,
sans-serif;

padding:
40px;

line-height:
1.6;

}


pre{

white-space:
pre-wrap;

}

</style>


</head>


<body>


<pre>

${productionPrompt}

</pre>


</body>


</html>

`);



printWindow.document.close();


printWindow.print();


}





return (

<div className="rounded-xl border border-gray-200 bg-white p-5">


<div className="mb-4">


<h3 className="text-lg font-semibold text-gray-900">

Export Engineering Document

</h3>


<p className="mt-1 text-sm text-gray-500">

Use this document with Codex,
Cursor, Claude Code or other
AI coding agents.

</p>


</div>





<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">





<button

onClick={copyMarkdown}

className="
inline-flex
items-center
justify-center
gap-2
rounded-lg
border
px-4
py-2.5
text-sm
font-medium
hover:bg-gray-50
"

>


{
copied
?

<>

<Check
className="h-4 w-4"
/>

Copied

</>


:

<>

<Copy
className="h-4 w-4"
/>

Copy Markdown

</>

}



</button>







<button

onClick={downloadMarkdown}

className="
inline-flex
items-center
justify-center
gap-2
rounded-lg
border
px-4
py-2.5
text-sm
font-medium
hover:bg-gray-50
"

>

<FileText
className="h-4 w-4"
/>


README.md


</button>







<button

onClick={downloadJson}

className="
inline-flex
items-center
justify-center
gap-2
rounded-lg
border
px-4
py-2.5
text-sm
font-medium
hover:bg-gray-50
"

>

<FileJson
className="h-4 w-4"
/>


JSON


</button>







<button

onClick={downloadPdf}

className="
inline-flex
items-center
justify-center
gap-2
rounded-lg
border
px-4
py-2.5
text-sm
font-medium
hover:bg-gray-50
"

>

<Download
className="h-4 w-4"
/>


PDF


</button>



</div>



<div className="mt-5 rounded-lg bg-gray-50 p-4">


<p className="text-xs text-gray-500">

Compatible workflow:

</p>


<div className="mt-2 flex flex-wrap gap-2">


<span className="rounded-full bg-white px-3 py-1 text-xs border">

Codex

</span>


<span className="rounded-full bg-white px-3 py-1 text-xs border">

Cursor

</span>


<span className="rounded-full bg-white px-3 py-1 text-xs border">

Claude Code

</span>


<span className="rounded-full bg-white px-3 py-1 text-xs border">

GitHub Copilot

</span>


</div>


</div>


</div>


);

}