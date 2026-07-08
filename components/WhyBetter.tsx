import { ArrowDown } from "lucide-react";

interface Explanation {
  change: string;
  reason: string;
}

interface Props {
  explanations: Explanation[];
}

export default function WhyBetter({ explanations }: Props) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">
        Why This Prompt Is Better
      </h2>
      {explanations.length === 0 ? (
        <p className="text-sm text-gray-500">No explanations available.</p>
      ) : (
        <div className="space-y-4">
          {explanations.map((item, index) => (
            <div
              key={`${item.change}-${index}`}
              className="rounded-lg border border-gray-100 bg-gray-50 p-4"
            >
              <p className="font-medium text-gray-900">{item.change}</p>
              <div className="mt-2 flex items-start gap-2 text-sm text-gray-600">
                <ArrowDown className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                <span>{item.reason}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
