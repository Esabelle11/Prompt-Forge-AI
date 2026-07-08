import { Check } from "lucide-react";

interface Props {
  suggestions: string[];
}

export default function SuggestionCard({ suggestions }: Props) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">Suggestions</h2>
      {suggestions.length === 0 ? (
        <p className="text-sm text-gray-500">No suggestions available.</p>
      ) : (
        <ul className="space-y-2">
          {suggestions.map((suggestion, index) => (
            <li
              key={`${suggestion}-${index}`}
              className="flex items-start gap-2 text-sm text-gray-700"
            >
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
              <span>{suggestion}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
