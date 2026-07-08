interface ScoreCardProps {
  score: number;
}

function getScoreColor(score: number) {
  if (score >= 80) return "text-green-600";
  if (score >= 50) return "text-orange-500";
  return "text-red-600";
}

function getProgressColor(score: number) {
  if (score >= 80) return "bg-green-500";
  if (score >= 50) return "bg-orange-500";
  return "bg-red-500";
}

export default function ScoreCard({ score }: ScoreCardProps) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">Prompt Score</h2>
      <div className="flex items-end gap-3">
        <span className={`text-5xl font-bold ${getScoreColor(score)}`}>
          {score}
        </span>
        <span className="mb-2 text-sm text-gray-500">/ 100</span>
      </div>
      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-gray-100">
        <div
          className={`h-full rounded-full transition-all ${getProgressColor(score)}`}
          style={{ width: `${score}%` }}
        />
      </div>
      <p className="mt-3 text-sm text-gray-500">
        {score >= 80
          ? "Strong prompt with clear requirements"
          : score >= 50
            ? "Decent prompt but needs more specificity"
            : "Prompt is too vague for reliable code generation"}
      </p>
    </section>
  );
}
