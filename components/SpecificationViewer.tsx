interface Props{

  specification:string;

}

export default function SpecificationViewer({

  specification

}:Props){

  console.log("[In SpecificationViewer]")

  return(

      <div className="rounded-xl border p-6">

          <h2 className="text-xl font-bold mb-4">

              Production Specification

          </h2>
          <div className="max-h-[400px] overflow-y-auto rounded-lg border bg-gray-50 p-4">
            <pre className="whitespace-pre-wrap break-words text-sm leading-6">
              {specification}
            </pre>
          </div>

          {/* <pre className="whitespace-pre-wrap">
              {specification}
          </pre> */}

      </div>

  )

}